(function(root){
'use strict';
const core=root.LearningCore;
const configKey='sr_sync_config_v1';
const baselineKey='sr_sync_base_v1';
const file='shadow-reading-progress.json';
const fields={wordStatuses:'sr_wordStatus',completedArticles:'sr_completed',practicedMap:'sr_practiced',streak:'sr_streak',lastStudy:'sr_lastStudy'};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const owns=(a,k)=>Object.hasOwn(a,k);

function editable(data){
 const marks={};
 for(const [article,paragraphs] of Object.entries(data.practicedMap||{})){
  for(const paragraph of paragraphs)marks[article+':'+paragraph]=true;
 }
 return {marks,words:data.wordStatuses||{},last:data.last??null};
}
function overlay(remote,local,base){
 const merged={...remote};
 for(const key of new Set([...Object.keys(local),...Object.keys(base||{})])){
  if(base&&same(local[key],base[key]))continue;
  if(owns(local,key))merged[key]=local[key];
  else delete merged[key];
 }
 return merged;
}
function combine(remote,local,base){
 const r=editable(remote),l=editable(local);
 const marks=overlay(r.marks,l.marks,base?.marks);
 const practicedMap={};
 for(const key of Object.keys(marks)){
  const [article,paragraph]=key.split(':');
  (practicedMap[article]??=[]).push(Number(paragraph));
 }
 const data={
  format:'shadow-reading',version:'4.0',
  learning:core.merge(remote.learning,local.learning),
  practicedMap,wordStatuses:overlay(r.words,l.words,base?.words),
  completedArticles:[...new Set([...(remote.completedArticles||[]),...(local.completedArticles||[])])].sort((a,b)=>a-b),
  streak:Math.max(remote.streak||0,local.streak||0),
  last:base ? (l.last===base.last?r.last:l.last) : (r.last??l.last)
 };
 const lastStudy=[remote.lastStudy,local.lastStudy].filter(Boolean).sort().at(-1);
 if(lastStudy)data.lastStudy=lastStudy;
 return data;
}
function snapshot(storage){
 const {exportDate,...data}=core.backup(storage);
 const raw=storage.getItem('sr_article');
 data.last=raw!==null&&/^\d+$/.test(raw)?Number(raw):null;
 return data;
}
function apply(storage,data){
 const writes={[core.KEY]:core.serialize(data.learning)};
 for(const [field,key] of Object.entries(fields))if(data[field]!==undefined){
  writes[key]=['streak','lastStudy'].includes(field)?String(data[field]):JSON.stringify(data[field]);
 }
 if(data.last!==null)writes.sr_article=String(data.last);
 const changed=Object.keys(writes).filter(k=>storage.getItem(k)!==writes[k]);
 const before=changed.map(k=>[k,storage.getItem(k)]);
 try{for(const k of changed)storage.setItem(k,writes[k]);}
 catch(error){
  for(const [k,v] of before){try{v===null?storage.removeItem(k):storage.setItem(k,v);}catch{}}
  throw error;
 }
 return changed.length>0;
}
function config(raw){
 const repo=normalizeRepo(raw.repo),token=String(raw.token||'').trim();
 if(!repo||!/^github_pat_[A-Za-z0-9_]{1,240}$/.test(token))throw Error('请填写 GitHub 仓库地址，以及仅授权该仓库的细粒度令牌。');
 return {repo,token};
}
function normalizeRepo(value){
 const repo=String(value||'').trim().toLowerCase().replace(/^https:\/\/github\.com\//,'').replace(/\/$/,'');
 return /^[a-z0-9-]{1,39}\/[a-z0-9_.-]{1,100}$/.test(repo)&&!/(?:\/\.|\/\.\.)$/.test(repo)?repo:'';
}
function client(settings,fetcher=root.fetch.bind(root)){
 const url='https://api.github.com/repos/'+settings.repo;
 const content=url+'/contents/'+file;
 const request=(url,options={})=>fetcher(url,{...options,redirect:'error',cache:'no-store',signal:AbortSignal.timeout(12000),headers:{
  Authorization:'Bearer '+settings.token,Accept:'application/vnd.github.object+json',
  'X-GitHub-Api-Version':'2022-11-28',...options.headers
 }});
 function fail(response){
  if([401,403,404].includes(response.status))throw Error('无法访问私有仓库。请检查仓库名称、令牌有效期和 Contents 读写权限。');
  throw Error('GitHub 同步暂不可用（'+response.status+'）。');
 }
 return {
  async verify(){
   const response=await request(url);
   if(!response.ok)fail(response);
   const repo=await response.json();
   if(!repo.private||repo.visibility!=='private')throw Error('请选择专用的 GitHub 私有仓库。');
  },
  async read(){
   const response=await request(content);
   if(response.status===404)return null;
   if(!response.ok)fail(response);
   const blob=await response.json();
   if(blob.type!=='file'||!blob.sha)throw Error('同步文件格式不正确。');
   let encoded;
   if(blob.encoding==='base64')encoded=root.atob(blob.content.replace(/\s/g,''));
   else {
    const raw=await request(content,{headers:{Accept:'application/vnd.github.raw+json'}});
    if(!raw.ok)fail(raw);
    encoded=await raw.text();
   }
   const envelope=JSON.parse(encoded);
   if(envelope.version!==1||typeof envelope.data!=='string')throw Error('无法识别云端进度文件。');
   const data=JSON.parse(root.LZString.decompressFromBase64(envelope.data));
   core.validState(data.learning);
   core.validateLegacy(data);
   if(data.last!==null&&(!Number.isInteger(data.last)||data.last<0||data.last>10000))throw Error('云端续学位置不正确。');
   return {data,sha:blob.sha};
  },
  async write(data,sha){
   const payload=JSON.stringify({version:1,data:root.LZString.compressToBase64(JSON.stringify(data))});
   const response=await request(content,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    message:'Sync Shadow Reading progress',content:root.btoa(payload),...(sha?{sha}:{})
   })});
   if(response.status===409||response.status===422)return false;
   if(!response.ok)fail(response);
   return true;
  }
 };
}
async function exchange(storage,remote,baseline){
 await remote.verify();
 for(let attempt=0;attempt<4;attempt++){
  const incoming=await remote.read();
  const local=snapshot(storage);
  const merged=combine(incoming?.data||{learning:core.empty()},local,baseline);
  if((!incoming||!same(merged,incoming.data))&&!await remote.write(merged,incoming?.sha))continue;
  return core.locked(()=>{
   const updated=combine(merged,snapshot(storage),editable(local));
   const changed=apply(storage,updated);
   return {changed,base:editable(merged)};
  });
 }
 throw Error('另一台设备正在同步，请稍后再试。');
}
root.ProgressSync={combine,editable,snapshot,apply,exchange,client,config};
if(typeof module!=='undefined'){module.exports=root.ProgressSync;return;}

let pending=null,lastSuccess='',lastError='',ready=false,timer=null,seen='',connecting=false;
let incomingPair='';
if(location.hash.startsWith('#pair=')){
 incomingPair=location.hash.slice(6);
 history.replaceState(history.state,'',`${location.pathname}${location.search}#progress`);
}
function settings(){
 try{return JSON.parse(localStorage.getItem(configKey))||null;}catch{return null;}
}
function fingerprint(){
 return JSON.stringify([core.KEY,...core.LEGACY,'sr_article'].map(key=>localStorage.getItem(key)));
}
function updateStatus(){
 const c=settings(),area=document.getElementById('syncStatus'),button=document.getElementById('syncNow');
 if(area)area.textContent=pending?'正在同步…':lastError|| (c?(lastSuccess?'最近同步 '+lastSuccess:'已连接，等待同步'):'进度已保存在当前浏览器。');
 if(button)button.disabled=!!pending;
 const status=document.querySelector('[data-sync-link]');
 if(status)status.textContent=c?'跨端同步':'保存与同步';
}
function synchronize(){
 const c=settings();
 if(!c||pending||!ready)return pending;
 lastError='';
 pending=(async()=>{
  try{
   const raw=JSON.parse(localStorage.getItem(baselineKey)||'null');
   const result=await exchange(localStorage,client(c),raw?.repo===c.repo?raw.base:null);
   localStorage.setItem(baselineKey,JSON.stringify({repo:c.repo,base:result.base}));
   lastSuccess=new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
   if(result.changed)root.dispatchEvent(new Event('learning-synced'));
  }catch(e){lastError=e instanceof TypeError?'连接失败。进度仍保存在本机，联网后可重试。':e.message;}
  finally{pending=null;updateStatus();}
 })();
 updateStatus();
 return pending;
}
function checkChanges(){
 if(!settings()||pending)return;
 let current;
 try{current=fingerprint();}catch{return;}
 if(current===seen)return;
 seen=current;
 clearTimeout(timer);
 timer=setTimeout(synchronize,1500);
}
function panel(){
 const c=settings();
 return `<section class="study-panel sync-panel" id="sync"><h2>保存与同步</h2><p id="syncStatus" role="status"></p>
 ${c?`<p>联网打开网页或完成练习后，会自动同步。</p><div class="actions">
 <button class="btn primary" id="syncPair" type="button">添加手机或其他设备</button><button class="btn" id="syncNow" type="button">立即同步</button></div>
 <details><summary>连接管理</summary><p>断开连接后，本机进度仍会自动保存。</p><button class="btn" id="syncDisconnect" type="button">断开本机</button></details>`:
 `<p>第一台设备连接一次。其他设备扫码接入。</p><details><summary>设置跨端同步</summary>
 <ol class="sync-steps"><li><a href="https://github.com/new" target="_blank" rel="noopener noreferrer">创建 GitHub 私有仓库</a>，勾选「Add a README file」。已有专用仓库可以直接使用。</li>
 <li>粘贴仓库地址，点「生成令牌」。在 GitHub 选择刚才的仓库，确认 Contents 为 Read and write。</li></ol>
 <form id="syncForm"><label>私有仓库地址<input name="repo" placeholder="https://github.com/用户名/仓库名" autocapitalize="off" required></label>
 <label class="sync-token-label">细粒度令牌 <a id="syncTokenLink" href="https://github.com/settings/personal-access-tokens/new?name=Shadow%20Reading&contents=write" target="_blank" rel="noopener noreferrer">生成令牌 ↗</a><input name="token" type="password" autocomplete="off" required></label><button class="btn primary">连接并同步</button></form>
 <p class="help-line">学习记录保存在你的私有仓库。请像保护密码一样保管令牌。</p></details>`}</section>`;
}
root.ProgressSync.panel=panel;
root.ProgressSync.updateStatus=updateStatus;
async function connect(candidate){
 if(connecting||pending)throw Error('正在连接，请稍候。');
 if(settings())throw Error('本机已连接。更换同步仓库前，请先在「连接管理」中断开本机。');
 connecting=true;
 try{
  await client(candidate).verify();
  localStorage.removeItem(baselineKey);
  localStorage.setItem(configKey,JSON.stringify(candidate));
  const panelNode=document.getElementById('sync');
  if(panelNode)panelNode.outerHTML=panel();
  synchronize();
 }finally{connecting=false;}
}
document.addEventListener('input',e=>{
 if(e.target.name!=='repo'||e.target.form?.id!=='syncForm')return;
 const link=document.getElementById('syncTokenLink');
 const url=new URL(link.href);
 const repo=normalizeRepo(e.target.value);
 if(repo)url.searchParams.set('target_name',repo.split('/')[0]);
 else url.searchParams.delete('target_name');
 link.href=url.href;
});
document.addEventListener('submit',async e=>{
 if(e.target.id!=='syncForm')return;
 e.preventDefault();
 if(pending)return;
 const button=e.target.querySelector('button');
 button.disabled=true;
 try{
  await connect(config(Object.fromEntries(new FormData(e.target))));
  e.target.reset();
 }catch(error){lastError=error.message;updateStatus();}
 finally{button.disabled=false;}
});
function showPairDialog(title,body){
 const dialog=document.createElement('dialog');
 dialog.className='sync-pair-dialog';
 dialog.setAttribute('aria-label',title);
 dialog.innerHTML=`<h2>${title}</h2>${body}<button class="btn" type="button" data-pair-close>关闭</button>`;
 dialog.addEventListener('click',e=>{if(e.target.hasAttribute('data-pair-close'))dialog.close();});
 dialog.addEventListener('close',()=>dialog.remove(),{once:true});
 document.body.append(dialog);
 dialog.showModal();
 return dialog;
}
function drawQR(canvas,url){
 const matrix=root.encodePairingQR(url),scale=5,margin=4;
 canvas.width=canvas.height=(matrix.length+margin*2)*scale;
 const ctx=canvas.getContext('2d');
 ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle='#111';
 matrix.forEach((row,y)=>row.forEach((dark,x)=>{
  if(dark)ctx.fillRect((x+margin)*scale,(y+margin)*scale,scale,scale);
 }));
}
async function offerPair(button){
 const current=settings();
 if(!current)return;
 button.disabled=true;
 try{
  if(!root.crypto?.subtle)throw Error('请在 HTTPS 页面上添加设备。');
  const pair=await root.SyncPairing.create(current);
  if(!same(current,settings()))return;
  const url=new URL('./index.html',location.href);
  url.hash='pair='+pair.payload;
  const dialog=showPairDialog('添加一台设备',`<p>用手机相机扫码。在手机网页输入下面的验证码。</p>
  <canvas class="sync-pair-qr" aria-label="设备配对二维码" role="img"></canvas>
  <p><strong id="syncPairCode">${pair.code.slice(0,5)} ${pair.code.slice(5)}</strong></p>
  <p>5 分钟内使用。二维码和验证码仅供自己的设备使用。</p>
  <button class="btn" type="button" id="syncPairCopy">复制配对链接</button><p id="syncPairFeedback" role="status"></p>`);
  drawQR(dialog.querySelector('canvas'),url.href);
  const feedback=dialog.querySelector('#syncPairFeedback');
  dialog.querySelector('#syncPairCopy').addEventListener('click',async()=>{
   if(Date.now()>=pair.expires)return;
   try{await navigator.clipboard.writeText(url.href);feedback.textContent='已复制。在另一台设备打开链接，再输入验证码。';}
   catch{feedback.textContent='无法访问剪贴板，请用手机相机扫码。';}
  });
  const expiration=setTimeout(()=>{
   dialog.querySelector('canvas').remove();
   dialog.querySelector('#syncPairCode').remove();
   dialog.querySelector('#syncPairCopy').disabled=true;
   feedback.textContent='二维码已过期。关闭后重新点击「添加手机或其他设备」。';
  },Math.max(0,pair.expires-Date.now()));
  dialog.addEventListener('close',()=>clearTimeout(expiration),{once:true});
 }catch(error){lastError=error.message;updateStatus();}
 finally{button.disabled=false;}
}
function receivePair(payload){
 if(settings()){
  showPairDialog('本机已连接','<p>已连接的设备会自动同步。如需更换仓库，请在「连接管理」中断开本机后重新扫码。</p>');
  return;
 }
 const dialog=showPairDialog('接收学习进度',`<p>输入电脑上显示的 10 位验证码，即可合并这台设备和云端的进度。</p>
 <form id="syncPairForm"><label>配对验证码<input name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="11" placeholder="00000 00000" required></label>
 <button class="btn primary">连接并同步</button></form><p id="syncPairFeedback" role="status"></p>`);
 const form=dialog.querySelector('form'),button=form.querySelector('button'),feedback=dialog.querySelector('#syncPairFeedback');
 form.addEventListener('submit',async e=>{
  e.preventDefault();button.disabled=true;
  try{
   const candidate=config(await root.SyncPairing.open(payload,form.elements.code.value));
   if(!dialog.open)return;
   await connect(candidate);
   dialog.close();
  }catch(error){feedback.textContent=error.message;}
  finally{button.disabled=false;}
 });
}
document.addEventListener('click',e=>{
 if(e.target.id==='syncNow')synchronize();
 if(e.target.id==='syncPair')offerPair(e.target);
 if(e.target.id==='syncDisconnect'&&!pending){
  localStorage.removeItem(configKey);localStorage.removeItem(baselineKey);
  lastSuccess='';lastError='';seen='';
  document.getElementById('sync').outerHTML=panel();updateStatus();
 }
});
document.addEventListener('DOMContentLoaded',()=>{
 ready=true;
 updateStatus();
 if(settings())synchronize();
 if(incomingPair){receivePair(incomingPair);incomingPair='';}
 setInterval(checkChanges,1500);
 setInterval(()=>{if(document.visibilityState==='visible')synchronize();},60000);
});
root.addEventListener('focus',synchronize);
root.addEventListener('online',synchronize);
root.addEventListener('learning-local-change',checkChanges);
root.addEventListener('storage',e=>{
 if([core.KEY,...core.LEGACY,'sr_article'].includes(e.key)){
  root.dispatchEvent(new Event('learning-synced'));
  checkChanges();
 }
});
})(typeof window==='undefined'?globalThis:window);
