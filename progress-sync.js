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
 const repo=String(raw.repo||'').trim().toLowerCase(),token=String(raw.token||'').trim();
 if(!/^[a-z0-9-]+\/[a-z0-9._-]+$/.test(repo)||!/^github_pat_[A-Za-z0-9_]+$/.test(token))throw Error('请输入 owner/repo，以及仅授权该仓库的 GitHub 细粒度令牌。');
 return {repo,token};
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

let pending=null,lastSuccess='',lastError='',ready=false,timer=null,seen='';
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
 <p>同步练习段落、词汇、自评和续学位置。录音不随进度上传。</p>
 ${c?'<div class="actions"><button class="btn primary" id="syncNow" type="button">立即同步</button><button class="btn" id="syncDisconnect" type="button">断开本机</button></div>':
 `<details><summary>连接电脑和手机</summary><p>在 GitHub 创建一个<strong>私有仓库</strong>并勾选添加 README。生成仅授权该仓库的细粒度令牌，仓库权限 Contents 设为 Read and write。</p><p><a href="https://github.com/new" target="_blank" rel="noopener noreferrer">创建私有仓库 ↗</a> · <a href="https://github.com/settings/personal-access-tokens/new?name=Shadow%20Reading&contents=write" target="_blank" rel="noopener noreferrer">生成令牌 ↗</a></p><p>电脑和手机各设置一次。令牌像密码一样保管，只保存在本机浏览器。你写的学习记录会保存在指定私有仓库及其历史中。</p><form id="syncForm"><label>私有仓库<input name="repo" placeholder="owner/repo" autocapitalize="off" required></label><label>细粒度令牌<input name="token" type="password" autocomplete="off" required></label><button class="btn primary">连接并同步</button></form></details>`}</section>`;
}
root.ProgressSync.panel=panel;
root.ProgressSync.updateStatus=updateStatus;
document.addEventListener('submit',async e=>{
 if(e.target.id!=='syncForm')return;
 e.preventDefault();
 if(pending)return;
 const button=e.target.querySelector('button');
 button.disabled=true;
 try{
  const candidate=config(Object.fromEntries(new FormData(e.target)));
  await client(candidate).verify();
  localStorage.removeItem(baselineKey);
  localStorage.setItem(configKey,JSON.stringify(candidate));
  e.target.reset();
  const panelNode=document.getElementById('sync');
  if(panelNode)panelNode.outerHTML=panel();
  synchronize();
 }catch(error){lastError=error.message;updateStatus();}
 finally{button.disabled=false;}
});
document.addEventListener('click',e=>{
 if(e.target.id==='syncNow')synchronize();
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
