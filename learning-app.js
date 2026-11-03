/* Static learning workspace. No account, microphone upload, or remote scoring. */
(() => {
'use strict';
const C = LearningCore, units = Curriculum.units, entries = Curriculum.entries, dialogues = Dialogues;
const main = document.getElementById('main');
const byUnit = new Map(units.map(u=>[u.id,u])), byEntry = new Map(entries.map(e=>[e.id,e])), byDialogue = new Map(dialogues.map(d=>[d.id,d]));
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state = C.empty(), storageOK = true, route = {}, session = null, dialogueMode = 'read', translation = false;
let filters = {query:'',level:'',category:''}, speakingToken = 0, activeUtterance = null, repeatLine = false;
let recorder = null, micStream = null, recordingURL = null, recordingTimer = null, recordingRequest = 0, recordingActive = false;
let toastTimer, activeTarget = null, cancelSpeech = null;
function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3800); }
function storageError() {
  storageOK=false; $('#storageWarning').hidden=false;
  $('#storageWarning').innerHTML='学习记录暂时无法读取或保存，练习仍可使用。请先<a href="#progress"><u>导出记录</u></a>，检查浏览器是否允许本地存储；未保存的操作不会显示为已记录。';
}
function loadState() { try {state=C.read(localStorage); storageOK=true; $('#storageWarning').hidden=true;} catch {storageError();} }
async function record(event) {
  try {state=await C.record(localStorage,event); storageOK=true; $('#storageWarning').hidden=true; updateDue(); if(!session){if(route.page==='home')home();else if(route.page==='progress')progressPage();else if(route.page==='review')reviewPage();} return true;}
  catch {storageError();toast('这次练习未保存，请先备份并检查浏览器存储。');return false;}
}
function dueItems() {
  const wordItems=entries.map(e=>({id:`entry:${e.id}`,type:'entry',entry:e,answers:e.answers,prompt:e.prompt,title:e.head}));
  const lines=dialogues.flatMap(d=>d.turns.flatMap((t,i)=>d.id==='learn-02'&&i===2?[]:[{id:`line:${d.id}:${i}`,type:'line',dialogue:d,line:t,index:i,answers:[t.en],title:d.title,prompt:'听音频，写出这一句。'}]));
  return [...wordItems,...lines].filter(item=>C.schedule(state,item.id).dueNow).sort((a,b)=>C.schedule(state,a.id).due-C.schedule(state,b.id).due);
}
function updateDue() { $('#navDue').textContent=dueItems().length; }
function pageTop(kicker,title,subtitle,extra='') { return `<div class="page-top"><div><div class="overline">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></div>${extra}</div>`; }
function countIndependent(u) {return u.entries.filter(e=>C.schedule(state,`entry:${e.id}`).correctDays>0).length;}
function metric(n,label) {return `<div class="metric"><strong>${n}</strong><span>${label}</span></div>`;}
function dialogueCard(d,i) {
 const listened=C.eventsFor(state,`dialogue:${d.id}`,'listen').length>0;
 const spoken=Object.values(state.events).some(e=>e.kind==='output'&&e.target.startsWith(`transfer:${d.id}:`));
 return `<a class="card link" href="#dialogue/${d.id}"><div class="card-top"><span class="tag">${esc(d.scene)} · ${d.level}</span><span class="card-number">${String(i+1).padStart(2,'0')}</span></div><h3>${d.title}</h3><p>${d.goal}</p><div class="card-foot"><span>${d.turns.length} 轮台词 · ${d.tasks.length} 个迁移任务</span><b>${spoken?'有表达自评':listened?'已听完':'开始练习'} ↗</b></div></a>`;
}
function unitCard(u,i) {const n=countIndependent(u);return `<a class="card link" href="#unit/${u.id}"><div class="card-top"><span class="tag">${u.family} · ${u.level}</span><span class="card-number">${String(i+1).padStart(2,'0')}</span></div><h3>${u.title}</h3><p>${u.intro}</p><div class="card-foot"><span>${u.entries.length} 个用法条目</span><b>独立填空 ${n}/${u.entries.length} ↗</b></div><div class="progress-track"><span style="width:${n/u.entries.length*100}%"></span></div></a>`;}
function articleProgress() {
 try {return {completed:new Set(JSON.parse(localStorage.getItem('sr_completed')||'[]')),practiced:JSON.parse(localStorage.getItem('sr_practiced')||'{}'),last:Number(localStorage.getItem('sr_article'))};}
 catch {return {completed:new Set(),practiced:{},last:-1};}
}
function articleCard(a) {
 const words=(a.content.match(/\b[a-z]+\b/gi)||[]).length;
 const progress=articleProgress(),done=(progress.practiced[a.id-1]||[]).length;
 const category=a.category||articles.find(x=>x.revisionOf===a.id)?.category||'原有主题';
 return `<a class="card link article-card" href="reading.html?article=${a.id}">${UIAssets.cover(category,'article-thumb')}<div class="article-card-body"><div class="card-top"><span class="reading-meta">${esc(category)}<span>·</span>${{beginner:'基础',intermediate:'中级',advanced:'进阶'}[a.level]}</span><span class="article-index">${String(a.id).padStart(2,'0')}</span></div><h3>${esc(a.subtitle)}</h3><div class="article-en-title">${esc(a.title)}</div><p class="article-goal">${esc(a.goal||'原版主题阅读，保留原文与历史标记。')}</p><div class="card-foot"><span>${a.format||'历史原稿'} · ${words} 词 · 约 ${Math.ceil(words/180)} 分钟</span><b>${done?`已练 ${done}/${a.content.split('\n\n').length} 段`:progress.completed.has(a.id-1)?'已有播放标记':'阅读'} ${UIAssets.icon('arrow')}</b></div></div></a>`;
}
function home() {
 const progress=articleProgress(),edited=articles.filter(a=>a.edition),due=dueItems();
 const saved=articles[progress.last];
 const recommended=saved?.edition&&(progress.practiced[progress.last]||[]).length<saved.content.split('\n\n').length?saved:edited.find(a=>!progress.completed.has(a.id-1))||edited[0];
 const paras=progress.practiced[recommended.id-1]||[],nextPara=recommended.content.split('\n\n').findIndex((_,i)=>!paras.includes(i));
 const link=`reading.html?article=${recommended.id}${nextPara>=0?'&paragraph='+(nextPara+1):''}`;
 const started=edited.filter(a=>(progress.practiced[a.id-1]||[]).length>0).length;
 const practiced=edited.reduce((n,a)=>n+(progress.practiced[a.id-1]||[]).length,0);
 const date=new Date().toLocaleDateString('zh-CN',{month:'long',day:'numeric',weekday:'long'});
 const preview=recommended.content.split('\n\n')[0];
 main.innerHTML=pageTop('YOUR READING SPACE','读懂一篇文章。','听清、读懂、跟读，再用自己的话讲一遍。',`<div class="date-note">${UIAssets.icon('clock')}${esc(date)}</div>`)+`
 <div class="home-reading-grid"><section class="hero featured-reading"><div class="featured-top"><span class="eyebrow">${paras.length?'接着上次，继续读':'今天，从这篇开始'}</span><span class="reading-status">${paras.length?`已练 ${paras.length} / 6 段`:'还未开始练习'}</span></div><div class="featured-main">${UIAssets.cover(recommended.category,'featured-cover')}<div class="hero-copy"><div class="reading-meta">${esc(recommended.category)}<span>·</span>${{beginner:'基础',intermediate:'中级',advanced:'进阶'}[recommended.level]}<span>·</span>约 ${Math.ceil((recommended.content.match(/\b[a-z]+\b/gi)||[]).length/180)} 分钟阅读</div><h2>${esc(recommended.subtitle)}</h2><div class="article-en-title">${esc(recommended.title)}</div><p>${esc(recommended.goal)}</p></div></div><div class="article-preview"><span>OPENING LINES</span><p>${esc(preview)}</p></div><div class="featured-actions"><a class="btn primary" href="${link}">${UIAssets.icon('book')}${paras.length?'继续阅读':'开始阅读与听读'} ${UIAssets.icon('arrow')}</a><a class="text-btn" href="#articles">换一篇文章 →</a></div></section>
 <aside class="home-companion"><section class="quiet-panel"><div class="panel-label">你的阅读足迹</div><div class="reading-numbers"><div><strong>${started}</strong><span>篇文章有段落练习</span></div><div><strong>${practiced}</strong><span>段已标记练习</span></div></div><p>${started?'保持自己的节奏。同一篇文章可以练几天，再换下一篇。':'从一篇开始就好。读完一个段落，试着关掉译文再说一遍。'}</p><a href="#progress" class="quiet-link">查看学习记录 ${UIAssets.icon('arrow')}</a></section><a class="review-compact" href="#review"><span class="review-symbol">${UIAssets.icon('review')}</span><div><strong>${due.length?`${due.length} 条内容到期`:'复习，等你积累之后'}</strong><span>${due.length?'先回忆，再看答案':'练过的词汇会按间隔安排复习'}</span></div>${UIAssets.icon('chevron')}</a><section class="reading-tip"><span class="panel-label">读的时候，可以这样练</span><ol><li>先听一遍，不急着查词。</li><li>逐段读懂，跟着节奏读。</li><li>合上原文，讲清事情经过。</li></ol><button class="text-btn" data-action="guide">查看完整练习指南 →</button></section></aside></div>
 <div class="section-head"><div><h2>选一个，今天想读的题材</h2><p class="section-description">从日常生活读起，也可以看看工作、旅行和更广的世界。</p></div><a href="#articles">浏览 40 篇文章 ${UIAssets.icon('arrow')}</a></div><div class="topic-shelf">${[['日常生活','life'],['工作协作','work'],['旅行出行','travel'],['文化与艺术','culture']].map(([cat])=>`<a href="#articles?topic=${encodeURIComponent(cat)}" class="topic-tile">${UIAssets.cover(cat)}<span>${cat}</span>${UIAssets.icon('arrow')}</a>`).join('')}</div>
 <div class="section-head"><div><h2>值得慢慢读的几篇</h2><p class="section-description">每篇配逐段译文、表达讲解和复述任务。</p></div><a href="#articles">全部文章 ${UIAssets.icon('arrow')}</a></div><div class="cards reading-list">${[edited[2],edited[12],edited[20],edited[34]].map(articleCard).join('')}</div>
 <div class="subtle-note">文章是学习主线。<a href="#units">词汇专题</a>、<a href="#review">间隔复习</a>与<a href="#dialogues">对话补充</a>，在需要时帮助你再练一遍。</div>`;
}
function catalog(type) {
 const isD=type==='dialogues', cats=[...new Set((isD?dialogues:units).map(x=>isD?x.scene:x.family))];
 main.innerHTML=pageTop(isD?'CONVERSATIONS':'VOCABULARY, IN CONTEXT',isD?'在场景里，练会一句话。':'有体系地学，也有场景地用。',isD?'40 个原创短对话。选一个与你生活有关的情境，完成听写、跟读、接话与迁移表达。':`${entries.length} 个用法条目，覆盖动词、数字数量、时间、形容词和基础表达。每条都附搭配、例句和语境回忆题。`)+`
 <div class="toolbar"><label class="search-wrap"><span class="hidden">搜索</span><input type="search" id="catalogSearch" placeholder="${isD?'搜索场景、句子、语言点…':'搜索单元、词汇、用法…'}" value="${esc(filters.query)}"></label><label><span class="hidden">难度</span><select id="levelFilter"><option value="">全部难度</option><option ${filters.level==='基础'?'selected':''}>基础</option><option ${filters.level==='进阶'?'selected':''}>进阶</option></select></label></div>
 <div class="filter-row">${['',...cats].map(c=>`<button class="btn small ${filters.category===c?'selected':''}" data-action="category" data-value="${c}">${c||'全部'}</button>`).join('')}</div><div id="catalogResults"></div>`;
 renderCatalogResults(type);
}
function renderCatalogResults(type) {
 const isD=type==='dialogues', source=isD?dialogues:units;
 const query=filters.query.trim().toLocaleLowerCase();
 const found=source.filter(x=>(!filters.level||x.level===filters.level)&&(!filters.category||(isD?x.scene:x.family)===filters.category)&&JSON.stringify(x).toLocaleLowerCase().includes(query));
 $('#catalogResults').innerHTML=`<p class="result-count">${found.length} ${isD?'个对话':'个单元'} · 难度为编写提示，不是等级测评</p><div class="cards">${found.map(x=>isD?dialogueCard(x,source.indexOf(x)):unitCard(x,source.indexOf(x))).join('')}</div>${found.length?'':'<div class="empty">没有符合条件的内容。试试其他关键词，或选择“全部”。</div>'}`;
}
function wordDirectory() {
 main.innerHTML=pageTop('FIND AN EXPRESSION','查一个词，学会一种用法。','课程词条支持按词性、主题检索。一词多义按不同用法展示，时间类词汇也能单独查找。')+`
 <div class="toolbar"><label class="search-wrap"><span class="hidden">查找单词或中文</span><input type="search" id="wordSearch" placeholder="试试 take、时间、比较级…" value="${esc(filters.query)}"></label><label><span class="hidden">词汇主题</span><select id="wordFamily"><option value="">全部主题</option>${[...new Set(units.map(u=>u.family))].map(f=>`<option ${filters.category===f?'selected':''}>${f}</option>`).join('')}</select></label><label><span class="hidden">词性</span><select id="wordPos"><option value="">全部词性</option>${['v.','phr.v.','modal','num.','adj.','adv.','prep.','n.','det.','pron.','conj.','phr.'].map(p=>`<option ${filters.level===p?'selected':''}>${p}</option>`).join('')}</select></label></div><div id="wordResults"></div><p class="help-line">想查看文章正文提取的单词与历史自评？<a href="words.html"><u>打开文章单词本 ↗</u></a></p>`;
 renderWordResults();
}
function renderWordResults() {
 const q=filters.query.trim().toLowerCase();
 const found=entries.filter(e=>(!filters.category||byUnit.get(e.unit).family===filters.category)&&(!filters.level||e.pos.split('/').includes(filters.level)||e.pos===filters.level)&&[e.head,e.meaning,e.usage,e.example].join(' ').toLowerCase().includes(q));
 $('#wordResults').innerHTML=`<p class="result-count">找到 ${found.length} 个用法条目 · 相同拼写可在不同语境出现</p><div class="word-directory">${found.map(e=>`<article class="card"><div class="card-top"><a class="unit-mini" href="#unit/${e.unit}">${byUnit.get(e.unit).title} ↗</a><button class="play-icon" data-action="speak-word" data-id="${e.id}" aria-label="朗读 ${esc(e.head)}">▶</button></div><h2 class="word-head">${esc(e.head)} <span class="pos">${e.pos}</span></h2><div class="meaning">${e.meaning}</div><p class="word-example">${esc(e.example)}</p><div class="zh">${e.zh}</div><div class="usage">${e.usage}</div><div class="actions" style="margin-top:15px"><button class="btn small" data-action="single-recall" data-id="${e.id}">练这个用法 ↗</button></div></article>`).join('')}</div>${found.length?'':'<div class="empty">没有找到匹配条目。可以尝试英文原形或较短的中文关键词。</div>'}`;
}
function unitDetail(id) {
 const u=byUnit.get(id); if(!u) return notFound();
 main.innerHTML=`<a class="back" href="#units">← 全部词汇课程</a><div class="detail-heading"><span class="overline">UNIT ${String(units.indexOf(u)+1).padStart(2,'0')} / ${u.family}</span><h1>${u.title}</h1><p>${u.intro}</p><div class="actions"><button class="btn primary" data-action="unit-practice" data-id="${u.id}">开始语境回忆 · ${u.entries.length} 题 ↗</button><span class="muted">独立填空 ${countIndependent(u)}/${u.entries.length}，不代表全部用法已掌握</span></div></div><div class="detail-layout"><section class="study-panel"><div class="word-rows">${u.entries.map(e=>{
 const s=C.schedule(state,`entry:${e.id}`);
 return `<article class="word-row"><div><span class="word-head">${esc(e.head)}</span><span class="pos">${e.pos}</span><div class="meaning">${e.meaning}</div></div><div><p class="word-example">${esc(e.example)}</p><div class="zh">${e.zh}</div><div class="usage">${e.usage}</div></div><div class="word-action"><button class="play-icon" data-action="speak-word" data-id="${e.id}" aria-label="朗读 ${esc(e.head)}">▶</button><button class="text-btn" data-action="single-recall" data-id="${e.id}">回忆 ↗</button><span class="word-state">${s.correctDays?`曾独立答对<br>${s.correctDays} 天`:s.attempts?'继续练习':'未练习'}</span></div></article>`;
 }).join('')}</div></section><aside class="panel-aside study-panel"><h3>这一课，留意这些区别</h3><ul>${u.rules.map(r=>`<li>${r}</li>`).join('')}</ul><h3>在对话里用一用</h3><div class="aside-links">${dialogues.filter(d=>d.units.includes(id)).slice(0,6).map(d=>`<a class="btn small" href="#dialogue/${d.id}">${d.title} ↗</a>`).join('')}</div><p class="help-line">词条示例帮助理解；回忆练习会重新隐藏答案。每个已练条目会进入间隔复习。</p></aside></div>`;
}
function dialogueDetail(id,mode='read') {
 const d=byDialogue.get(id);if(!d)return notFound();
 dialogueMode=['read','dictation','shadow','role','transfer'].includes(mode)?mode:'read';
 main.innerHTML=`<a class="back" href="#dialogues">← 全部场景对话</a><div class="detail-heading"><span class="overline">CONVERSATION ${String(dialogues.indexOf(d)+1).padStart(2,'0')} / ${d.scene} · ${d.level}</span><h1>${d.title}</h1><p>${d.goal}</p></div><div class="detail-layout"><section class="study-panel"><div class="practice-tabs" role="tablist" aria-label="练习方式">${[['read','双语听读'],['dictation','盲听听写'],['shadow','逐句跟读'],['role','角色接话'],['transfer','迁移表达']].map(([m,t])=>`<button class="btn small ${m===dialogueMode?'selected':''}" role="tab" aria-selected="${m===dialogueMode}" data-action="dialogue-mode" data-mode="${m}" data-id="${id}">${t}</button>`).join('')}</div>${audioControls()}<div id="dialoguePractice"></div><div class="record-controls"><div class="actions"><button class="btn small" data-action="record" id="recordButton">录下自己的表达</button><button class="text-btn" data-action="stop-audio">停止朗读</button></div><p class="help-line" id="recordNote">录音仅在本页暂存，离开本练习即清除，不上传、不自动评分。最长两分钟。</p><div id="recordingPlayback"></div></div></section><aside class="panel-aside study-panel"><h3>这段对话的语言点</h3><ul>${d.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><h3>关联词汇课程</h3><div class="aside-links">${d.units.map(id=>`<a class="btn small" href="#unit/${id}">${byUnit.get(id).title} ↗</a>`).join('')}</div><p class="help-line">原创教学对话。朗读由浏览器合成，音色取决于设备；可用于练习，不是真人原声。</p></aside></div>`;
 if(dialogueMode==='dictation') startRecall(d.turns.flatMap((t,i)=>d.id==='learn-02'&&i===2?[]:[{id:`line:${d.id}:${i}`,type:'line',dialogue:d,line:t,index:i,answers:[t.en],title:d.title,prompt:'听音频，写出这一句。'}]),'dictation',d.title,false);
 else if(dialogueMode==='role'||dialogueMode==='shadow') {session={type:dialogueMode,dialogue:d,index:0,role:'A',hint:false,started:false};renderRole();}
 else if(dialogueMode==='transfer') {session={type:'transfer',dialogue:d,index:0,hint:false,saved:false};renderTransfer();}
 else renderRead(d);
 loadVoices();
}
function audioControls() {return `<div class="audio-controls"><span class="muted">浏览器合成朗读 · 支持时可选英音/美音</span><div class="actions"><label>语速 <select id="speechRate"><option value="0.7">0.7×</option><option value="0.85" selected>0.85×</option><option value="1">1.0×</option><option value="1.15">1.15×</option></select></label><label>音色 <select id="voiceSelect" aria-label="英文朗读音色"><option value="">设备默认英文</option></select></label></div></div>`;}
function renderRead(d) {
 $('#dialoguePractice').innerHTML=`<div class="actions" style="margin:18px 0"><button class="btn primary" data-action="play-dialogue" data-id="${d.id}">▶ 播放完整对话</button><button class="btn small" data-action="repeat-toggle" aria-pressed="${repeatLine}">${repeatLine?'取消单句循环':'单句循环：关'}</button><label class="trans-toggle"><input type="checkbox" id="translationToggle" ${translation?'checked':''}> 显示中文</label></div><div>${d.turns.map((t,i)=>`<div class="turn" id="turn-${i}"><span class="speaker">${t.role}</span><div><p class="en">${esc(t.en)}</p><p class="zh ${translation?'':'hidden'}">${esc(t.zh)}</p>${d.id==='learn-02'&&i===2?'<p class="help-line">此句为有意设置的错误，正确表达见后文。</p>':''}</div><button class="play-icon" data-action="play-turn" data-id="${d.id}" data-index="${i}" aria-label="播放第 ${i+1} 句">▶</button></div>`).join('')}</div><p class="help-line">${C.eventsFor(state,`dialogue:${d.id}`,'listen').length?'已记录听完；继续试试盲听听写和迁移表达。':'播放结束仅记录“听完”，不会标记掌握。'}</p>`;
}
function loadVoices() {
 const select=$('#voiceSelect');if(!select||!window.speechSynthesis)return;
 const previous=select.value;const voices=speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith('en'));
 select.innerHTML='<option value="">设备默认英文</option>'+voices.map(v=>`<option value="${esc(v.voiceURI)}">${esc(v.name)} · ${esc(v.lang)}</option>`).join('');
 if(voices.some(v=>v.voiceURI===previous))select.value=previous;
}
function stopAudio() {
 speakingToken++; activeTarget=null;
 if(cancelSpeech){cancelSpeech();cancelSpeech=null;}
 if(window.speechSynthesis)speechSynthesis.cancel(); activeUtterance=null;
 document.querySelectorAll('.speaking').forEach(el=>el.classList.remove('speaking'));
}
function say(text, token, highlight) {
 return new Promise(resolve=>{
  if(token!==speakingToken)return resolve(false);
  if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){toast('当前浏览器没有语音朗读功能，可继续阅读和文字练习。');return resolve(false);}
  const utterance=new SpeechSynthesisUtterance(text);activeUtterance=utterance;
  const voices=speechSynthesis.getVoices(), selected=$('#voiceSelect')?.value;
  utterance.voice=voices.find(v=>v.voiceURI===selected)||voices.find(v=>v.lang==='en-US')||voices.find(v=>v.lang.startsWith('en'))||null;
  utterance.lang=utterance.voice?.lang||'en-US';utterance.rate=Number($('#speechRate')?.value)||.85;
  const el=highlight?document.getElementById(highlight):null;el?.classList.add('speaking');
  let finished=false;const done=ok=>{if(finished)return;finished=true;clearTimeout(timeout);if(cancelSpeech===cancel)cancelSpeech=null;el?.classList.remove('speaking');resolve(ok&&token===speakingToken);};
  const cancel=()=>done(false);cancelSpeech=cancel;
  const timeout=setTimeout(()=>{if(token===speakingToken){speechSynthesis.cancel();toast('朗读未能完成，请换一个音色后重试。');}done(false);},Math.max(20000,text.length*220));
  utterance.onend=()=>done(true);utterance.onerror=()=>{if(token===speakingToken)toast('朗读未完成，请检查设备音色或重试。');done(false);};
  try{speechSynthesis.speak(utterance);}catch{done(false);}
 });
}
async function play(text, highlight) {stopAudio();return say(text,speakingToken,highlight);}
async function playDialogue(id) {
 stopAudio();const token=speakingToken,d=byDialogue.get(id);activeTarget=id;
 for(let i=0;i<d.turns.length;i++) {if(!await say(d.turns[i].en,token,`turn-${i}`))return;}
 if(token===speakingToken) {await record({kind:'listen',target:`dialogue:${id}`});toast('已听完这段对话。试试不看原文接话。');}
}
async function playTurn(id,index) {
 stopAudio();const token=speakingToken;
 do {if(!await say(byDialogue.get(id).turns[index].en,token,`turn-${index}`))return;
 if(!repeatLine||token!==speakingToken)return;
 await new Promise(r=>setTimeout(r,1000));
 }while(repeatLine&&token===speakingToken);
}
function entryItem(e) {return {id:`entry:${e.id}`,type:'entry',entry:e,answers:e.answers,prompt:e.prompt,title:e.head};}
function startRecall(items,source,title,navigate=true) {
 stopAudio();if(navigate)cleanupRecording();
 session={type:'recall',items,index:0,source,title,assisted:false,checked:false,correct:0,saved:false};
 if(navigate) {
 main.innerHTML=`<a href="${source==='review'?'#review':'#units'}" class="back">← 返回${source==='review'?'复习列表':'词汇课程'}</a>${pageTop('RETRIEVAL PRACTICE',esc(title),'先自己回忆，再核对。标点、大小写和多余空格不会影响结果；参考答案以外的表达可在迁移练习中自评。')}<section class="study-panel" style="max-width:800px">${audioControls()}<div id="recallPanel"></div></section>`;loadVoices();
 }
 renderRecall();
}
function recallContainer() {return session?.source==='dictation'?$('#dialoguePractice'):$('#recallPanel');}
function renderRecall() {
 const s=session,container=recallContainer();if(!container)return;
 if(s.index>=s.items.length){container.innerHTML=`<div class="session-finish"><p class="overline">PRACTICE, COMPLETED</p><h2>这一轮，练到了。</h2><p>共 ${s.items.length} 题，${s.correct} 题在未看提示时答对。</p><p class="muted">结果代表本轮回忆表现。看过答案或未答对的条目仍需复习。</p><div class="actions" style="justify-content:center"><a class="btn primary" href="#review">查看复习安排 ↗</a><a class="btn" href="#home">回到今日阅读</a></div></div>`;return;}
 const item=s.items[s.index];
 container.innerHTML=`<div class="prompt-box"><div class="prompt-number">${s.source==='review'?'到期复习':item.type==='line'?'盲听听写':'语境回忆'} / ${String(s.index+1).padStart(2,'0')} OF ${s.items.length}</div>${item.type==='line'?`<p class="muted">${esc(item.title)} · 第 ${item.index+1} 句（${item.line.role}）</p><button class="btn primary" data-action="recall-audio">▶ 听这一句</button><p class="help-line">可以重复听。核对原句时会显示中文；提前看提示则记录为辅助练习。</p>`:`<p class="en">${esc(item.prompt)}</p><p class="zh">中文情境：${esc(item.entry.zh)}</p><p class="muted">根据中文情境填入合适的词或短语，注意词形。</p>`}<form id="recallForm"><label class="inline-label" for="recallAnswer">${item.type==='line'?'写下听到的英文':'你的答案'}</label><input class="answer" id="recallAnswer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="先试着自己回忆…" required><div class="actions"><button type="submit" class="btn primary">核对答案</button><button type="button" class="text-btn" data-action="recall-hint">查看提示 / 答案</button></div></form><div id="recallHint"></div><div id="recallFeedback" aria-live="polite"></div><button class="btn hidden" id="recallNext" data-action="recall-next">${s.index===s.items.length-1?'完成本轮':'下一题 →'}</button></div>`;
 if(s.source!=='dictation')$('#recallAnswer')?.focus({preventScroll:true});
}
function revealRecall() {
 if(!session||session.type!=='recall')return;
 session.assisted=true;const item=session.items[session.index];
 $('#recallHint').innerHTML=`<div class="sample"><span class="muted">提示已使用，本题不会记为独立答对</span><p class="en">${esc(item.answers[0])}</p><p class="zh">${esc(item.type==='entry'?item.entry.zh:item.line.zh)}</p></div>`;
}
async function checkRecall(event) {
 event.preventDefault();const s=session;if(!s||s.type!=='recall'||s.checked)return;
 const value=$('#recallAnswer').value;if(!value.trim())return;const item=s.items[s.index];
 s.checked=true;const ok=C.matches(value,item.answers),independent=ok&&!s.assisted;
 if(independent)s.correct++;
 $('#recallForm button[type=submit]').disabled=true;$('#recallAnswer').readOnly=true;
 const saved=await record({kind:'recall',target:item.id,correct:ok,assisted:s.assisted});
 if(session!==s)return;
 s.saved=saved;
 $('#recallFeedback').innerHTML=`<div class="feedback ${independent?'':'incorrect'}"><strong>${independent?'本次独立回忆正确':ok?'提示后答对，继续巩固':'与本题参考答案不同'}</strong><p class="en">${esc(item.type==='entry'?item.entry.example:item.line.en)}</p><p>${esc(item.type==='entry'?item.entry.zh:item.line.zh)}</p>${item.type==='entry'?`<p>${esc(item.entry.usage)}</p>`:''}<small>${saved?'本次已记录。'+(independent?'下次复习日期见学习记录。':'此条目仍在待复习中。'):'本次未保存，请先导出并检查存储。'}</small></div>`;
 $('#recallNext').classList.remove('hidden');$('#recallNext').focus({preventScroll:true});
}
function nextRecall() {if(!session?.checked)return;session.index++;session.checked=false;session.assisted=false;stopAudio();renderRecall();}
function renderRole() {
 const s=session,d=s.dialogue,shadow=s.type==='shadow';
 const container=$('#dialoguePractice');
 if(s.index>=d.turns.length){container.innerHTML=`<div class="session-finish"><span class="overline">YOUR OWN CHECK-IN</span><h2>${shadow?'逐句跟读':'角色接话'}完成</h2><p class="muted">请选择真实感受。这里保存的是自评，不自动判断发音或表达是否正确。</p>${ratingButtons('save-shadow')}</div>`;return;}
 const t=d.turns[s.index],own=shadow||t.role===s.role;
 container.innerHTML=`${!shadow?`<div class="actions" style="margin:18px 0"><span class="muted">你扮演</span>${['A','B'].map(r=>`<button class="btn small ${s.role===r?'selected':''}" data-action="choose-role" data-value="${r}">角色 ${r}</button>`).join('')}</div>`:''}<div class="prompt-box"><div class="prompt-number">${shadow?'逐句跟读':'角色接话'} / ${s.index+1} OF ${d.turns.length}</div>${own?`<div class="role-line"><span class="overline">${shadow?'LISTEN, THEN SAY IT':'YOUR TURN'}</span><h3>${shadow?'听一遍，再模仿重音和节奏。':'轮到你了，先试着说。'}</h3><p class="zh">${esc(t.zh)}</p>${shadow?`<p class="en">${esc(t.en)}</p>`:s.hint?`<p class="en">${esc(t.en)}</p><p class="help-line">已看提示，可继续尝试。</p>`:''}<div class="actions" style="justify-content:center;margin-top:18px">${shadow?'<button class="btn" data-action="role-audio">▶ 听这一句</button>':'<button class="btn" data-action="role-hint">显示英文提示</button>'}</div></div>`:`<div class="role-line"><span class="overline">LISTEN TO ROLE ${t.role}</span><h3>先听对方，再接话。</h3><button class="btn primary" data-action="role-audio">▶ 听对方这一句</button><p class="en ${s.hint?'':'hidden'}">${esc(t.en)}</p><button class="text-btn" data-action="role-hint">显示原句</button></div>`}<div class="actions"><button class="btn primary" data-action="role-next">${s.index===d.turns.length-1?'完成，进行自评':'我已练习，下一句 →'}</button><button class="text-btn" data-action="role-restart">从头再来</button></div><p class="help-line">练习由你控制节奏。按钮表示自报练习完成；不会将此标为客观掌握。</p></div>`;
}
function ratingButtons(action) {return `<div class="confidence"><button class="btn small" data-action="${action}" data-rating="again">还需再练</button><button class="btn small" data-action="${action}" data-rating="with-help">借助提示完成</button><button class="btn small" data-action="${action}" data-rating="independent">自评独立完成</button></div>`;}
function renderTransfer() {
 const s=session,d=s.dialogue,task=d.tasks[s.index];
 $('#dialoguePractice').innerHTML=`<div class="prompt-box"><div class="prompt-number">迁移表达 / ${s.index+1} OF ${d.tasks.length}</div><h2 style="font-size:20px;font-weight:500">${esc(task.prompt)}</h2><p class="muted">先说一遍，也可以写下来。改变条件后表达完整意思，参考答案不是唯一正确说法。</p><label class="inline-label" for="transferAnswer">你的表达（可选）</label><textarea class="answer" id="transferAnswer" placeholder="写下自己的版本，或使用下面的录音按钮…" maxlength="10000"></textarea><button class="text-btn" data-action="transfer-hint">显示参考表达</button><div id="transferSample"></div><p class="inline-label">完成后，记录一次真实自评</p>${ratingButtons('save-output')}<div id="transferStatus" aria-live="polite"></div><button class="btn ${s.saved?'':'hidden'}" id="transferNext" data-action="transfer-next">${s.index===d.tasks.length-1?'完成本轮':'下一个任务 →'}</button></div>`;
}
function reviewPage() {
 const due=dueItems(),pending=Object.values(state.events).filter(e=>e.kind==='recall').length;
 main.innerHTML=pageTop('SPACED RETRIEVAL','再想起来一次。','复习包含练过的词汇填空与对话听写。未看提示答对后，逐步延长间隔；未答对或看过提示则继续巩固。')+`
 <div class="metrics">${metric(due.length,'现在到期')}${metric(entries.filter(e=>C.schedule(state,`entry:${e.id}`).attempts).length,'已练词汇用法')}${metric(pending,'累计回忆练习')}${metric(Object.values(state.events).filter(e=>e.kind==='output').length,'表达自评记录')}</div>
 ${due.length?`<div class="actions"><button class="btn primary" data-action="review-start">开始复习 · 本轮最多 20 题 ↗</button></div><div class="section-head"><h2>这次先找回这些表达</h2><span class="muted">按到期时间排列</span></div><div class="path-list">${due.slice(0,20).map((x,i)=>`<div class="path-item"><span class="path-n">${String(i+1).padStart(2,'0')}</span><div><strong>${esc(x.title)}</strong><small>${x.type==='entry'?byUnit.get(x.entry.unit).title:`对话听写 · 第 ${x.index+1} 句`}</small></div><span class="arrow muted">${x.type==='entry'?'词汇':'听写'}</span></div>`).join('')}</div>`:`<div class="empty"><span class="overline">A LITTLE SPACE HELPS</span><h2>${pending?'现在没有到期条目。':'先开始一次练习。'}</h2><p>${pending?'你可以等到下次到期，或选择新内容。':'完成词汇填空或对话听写后，系统会安排复习。'}</p><a class="btn primary" href="#units">去词汇课程 ↗</a></div>`}
 <div class="notice">独立答对后的复习间隔依次为 1、3、7、14、30 天。同一天反复答对不会连续跳级。答错或提前看答案会回到需要巩固的状态；这是一套练习安排，不是能力认证。</div>`;
}
function progressPage() {
 const all=Object.values(state.events),ind=all.filter(e=>e.kind==='recall'&&e.correct&&!e.assisted),outputs=all.filter(e=>e.kind==='output');
 let legacyWords=0,legacyArticles=0;try{legacyWords=Object.keys(JSON.parse(localStorage.getItem('sr_wordStatus')||'{}')).length;legacyArticles=JSON.parse(localStorage.getItem('sr_completed')||'[]').length;}catch{}
 const recent=Object.values(state.events).sort((a,b)=>Date.parse(b.at)-Date.parse(a.at)).slice(0,12);
 main.innerHTML=pageTop('YOUR LEARNING RECORD','记录练过什么，也看清还缺什么。','独立填空、听完和表达自评分开显示。原有文章与单词记录保留，课程进度以用法条目为单位。')+`
 <div class="metrics">${metric(ind.length,'未看提示答对次数')}${metric(all.filter(e=>e.kind==='listen').length,'完整听完次数')}${metric(outputs.length,'迁移表达自评')}${metric(legacyWords,'原单词本自评条目')}</div>
 <section class="study-panel"><div class="section-head" style="margin-top:0"><h2>课程覆盖与回忆情况</h2><span class="muted">已列出的 ${entries.length} 个用法</span></div><div class="table-scroll"><table class="coverage"><thead><tr><th>学习单元</th><th>已练 / 总数</th><th>曾独立填空答对</th><th>到期复习</th></tr></thead><tbody>${units.map(u=>`<tr><td><a href="#unit/${u.id}">${u.title} ↗</a></td><td>${u.entries.filter(e=>C.schedule(state,`entry:${e.id}`).attempts).length} / ${u.entries.length}</td><td>${countIndependent(u)}</td><td>${u.entries.filter(e=>C.schedule(state,`entry:${e.id}`).dueNow).length}</td></tr>`).join('')}</tbody></table></div><p class="help-line">“曾独立答对”仅代表至少一次未看提示的语境填空正确；一个拼写可能对应多个用法，不能当作词汇量或全面掌握率。</p></section>
 <div class="two-col"><section class="study-panel" style="margin-top:23px"><h2 style="font-size:20px;font-weight:400">把记录留好。</h2><p class="muted">记录保存在当前浏览器。换设备或清理浏览器前请导出。完整备份含新版练习记录及原单词、文章、段落记录，录音不包含在内。</p><div class="actions"><button class="btn primary" data-action="export">导出完整备份 ↓</button><button class="btn" data-action="import">导入并合并备份 ↑</button><button class="text-btn" data-action="raw-backup">导出存储原件</button></div><p class="help-line">支持 v1–v4 备份。导入不会删除已有记录；重复导入不重复累计。旧版 ${legacyArticles} 篇文章记录保留原有含义。</p><p class="help-line">存储异常时可先导出“存储原件”留存，再排查。原件是恢复资料，不能作为普通学习备份直接导入。</p></section><section class="study-panel" style="margin-top:23px"><h2 style="font-size:20px;font-weight:400">最近的练习</h2>${recent.map(e=>`<div class="history-item"><div>${eventLabel(e)}${e.kind==='output'&&e.text?`<p class="muted">${esc(e.text)}</p>`:''}</div><small>${new Date(e.at).toLocaleDateString('zh-CN',{month:'numeric',day:'numeric'})}</small></div>`).join('')||'<p class="muted">还没有新版记录。选一篇文章开始阅读与复述。</p>'}</section></div>`;
}
function eventLabel(e) {
 const parts=e.target.split(':'),item=byEntry.get(parts[1]),d=byDialogue.get(parts[1]);
 const article=parts[0]==='article'?articles.find(a=>a.id===Number(parts[1])):null;
 const title=esc(item?.head||d?.title||article?.subtitle||'练习');
 if(e.kind==='recall')return `${title} · ${e.correct&&!e.assisted?'独立回忆正确':e.assisted?'辅助回忆练习':'待巩固'}`;
 if(e.kind==='listen')return `${title} · 听完`;
 const rating={again:'还需再练','with-help':'借助提示','independent':'自评独立完成'};
 return `${title} · ${e.kind==='output'?'表达':'跟读/接话'}自评：${rating[e.rating]}`;
}
let articleFilters={query:'',level:'',category:'',format:'',collection:'edited'};
function articlesPage() {
 articleFilters={query:'',level:'',category:route.query.get('topic')||'',format:'',collection:route.query.get('collection')==='archive'?'archive':'edited'};
 main.innerHTML=pageTop('THE READING LIBRARY','选一篇，认真读进去。','40 篇精编文章：20 个原主题重写、10 篇长访谈、10 篇新增叙事。每篇含双语正文、4 个表达讲解、理解检查与复述任务。')+`
 <div class="toolbar"><label class="search-wrap"><span class="hidden">搜索文章</span><input type="search" id="articleSearch" placeholder="搜索题材、文章标题或正文…"></label><label><span class="hidden">难度</span><select id="articleLevel"><option value="">全部难度</option><option value="beginner">基础</option><option value="intermediate">中级</option><option value="advanced">进阶</option></select></label><label><span class="hidden">文体</span><select id="articleFormat"><option value="">全部文体</option>${[...new Set(articles.filter(a=>a.edition).map(a=>a.format))].map(f=>`<option>${f}</option>`).join('')}</select></label><label><span class="hidden">文章版本</span><select id="articleCollection"><option value="edited" ${articleFilters.collection==='edited'?'selected':''}>精编文章 · 40</option><option value="archive" ${articleFilters.collection==='archive'?'selected':''}>历史原稿 · 20</option></select></label></div>
 <div class="filter-row">${['',...[...new Set(articles.filter(a=>a.edition).map(a=>a.category))]].map(c=>`<button class="btn small ${articleFilters.category===c?'selected':''}" data-action="article-category" data-value="${esc(c)}">${c||'全部题材'}</button>`).join('')}</div><div id="articleResults"></div><p class="help-line">原创教学文本，人物与情境为虚构；基础、中级、进阶为编辑难度提示。重写稿使用独立编号，原稿的完成与段落标记不会套用到新文字。</p>`;
 renderArticleResults();
}
function renderArticleResults() {
 const f=articleFilters,q=f.query.trim().toLowerCase();
 const found=articles.filter(a=>(f.collection==='archive'?!a.edition:!!a.edition)&&(!f.level||a.level===f.level)&&(!f.category||(a.category||articles.find(x=>x.revisionOf===a.id)?.category)===f.category)&&(!f.format||a.format===f.format)&&[a.title,a.subtitle,a.content,a.category,a.goal].join(' ').toLowerCase().includes(q));
 $('#articleResults').innerHTML=`<p class="result-count">${found.length} 篇${f.collection==='archive'?'历史原稿':'精编文章'}${f.collection==='archive'?' · 保留原有文字与记录':' · 先选一个有兴趣的题材，再反复练同一篇'}</p><div class="cards reading-list">${found.map(articleCard).join('')}</div>${found.length?'':'<div class="empty"><p>没有符合条件的文章。</p><p>试试更短的关键词，或清除筛选重新选择。</p><button class="btn" data-action="clear-article-filters">清除筛选</button></div>'}`;
}
function notFound() {main.innerHTML='<div class="empty"><h2>这个内容暂时找不到。</h2><p>链接可能不完整，可以回目录重新选择。</p><a class="btn" href="#home">回到今日阅读</a></div>';}
function cleanupRecording() {
 recordingRequest++;recordingActive=false;
 if(recorder&&recorder.state!=='inactive'){recorder.onstop=null;recorder.stop();}
 micStream?.getTracks().forEach(t=>t.stop());micStream=null;recorder=null;
 clearTimeout(recordingTimer);if(recordingURL)URL.revokeObjectURL(recordingURL);recordingURL=null;
}
async function toggleRecording() {
 if(recordingActive){recorder?.stop();return;}
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('当前环境不支持录音。可通过本机服务或 HTTPS 打开，或直接口头练习。');return;}
 const button=$('#recordButton');if(!button)return;
 const request=++recordingRequest;button.disabled=true;
 try {
 const stream=await navigator.mediaDevices.getUserMedia({audio:true});
 if(request!==recordingRequest){stream.getTracks().forEach(t=>t.stop());return;}
 micStream=stream;const chunks=[];recorder=new MediaRecorder(stream);recordingActive=true;
 recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 recorder.onstop=()=>{
 stream.getTracks().forEach(t=>t.stop());recordingActive=false;clearTimeout(recordingTimer);
 if(request!==recordingRequest)return;
 if(recordingURL)URL.revokeObjectURL(recordingURL);
 recordingURL=URL.createObjectURL(new Blob(chunks,{type:recorder.mimeType||'audio/webm'}));
 $('#recordingPlayback').innerHTML=`<audio controls src="${recordingURL}"></audio><a class="text-btn" href="${recordingURL}" download="my-practice.${recorder.mimeType.includes('mp4')?'m4a':'webm'}">保存本段录音 ↓</a>`;
 $('#recordButton').textContent='重新录音';$('#recordNote').textContent='录音已在本页暂存。可以回放比较，也可以先下载保留。';
 };
 recorder.onerror=()=>{stream.getTracks().forEach(t=>t.stop());recordingActive=false;clearTimeout(recordingTimer);button.textContent='重新录音';toast('录音中断，请重试。');};
 recorder.start();button.textContent='■ 停止录音';$('#recordNote').textContent='正在录音，最长两分钟。声音仅保存在本页，不上传。';
 recordingTimer=setTimeout(()=>{if(recordingActive)recorder.stop();},120000);
 }catch{if(request===recordingRequest){micStream?.getTracks().forEach(t=>t.stop());micStream=null;recorder=null;recordingActive=false;}toast('未能使用麦克风。请检查权限，或直接进行文字/口头练习。');}
 finally{if(request===recordingRequest)button.disabled=false;}
}
function routePage() {
 stopAudio();cleanupRecording();session=null;
 const [path,query='']=location.hash.replace(/^#/,'').split('?');const [page='home',id]=path.split('/');
 route={page:page||'home',id,query:new URLSearchParams(query)};filters={query:'',level:'',category:''};
 const nav={dialogue:'dialogues',unit:'units'}[route.page]||route.page;
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===nav));
 document.querySelectorAll('[data-mobile-nav]').forEach(a=>a.classList.toggle('active',a.dataset.mobileNav===nav));
 $('#breadcrumb').textContent={home:'今日阅读',dialogues:'场景对话',dialogue:'场景对话 / 练习',units:'系统词汇',unit:'系统词汇 / 用法',words:'词汇检索',review:'到期复习',progress:'学习记录',articles:'文章库'}[route.page]||'学习工作台';
 if(route.page==='home')home();else if(['dialogues','units'].includes(route.page))catalog(route.page);else if(route.page==='words')wordDirectory();else if(route.page==='unit')unitDetail(id);else if(route.page==='dialogue')dialogueDetail(id,route.query.get('mode')||'read');else if(route.page==='review')reviewPage();else if(route.page==='progress')progressPage();else if(route.page==='articles')articlesPage();else notFound();
 updateDue();main.dataset.route=location.hash||'#home';window.scrollTo({top:0});document.title=`${$('#breadcrumb').textContent} · Shadow Reading`;
}
function download(data,name) {
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function handleImport(file) {
 if(!file)return;if(file.size>10*1024*1024)return toast('备份文件过大，请选择 10MB 以内的学习备份。');
 try {const data=JSON.parse(await file.text());await C.locked(()=>{state=C.importBackup(localStorage,data);});storageOK=true;$('#storageWarning').hidden=true;routePage();toast('备份已合并，现有记录与重复条目均已保留。');}
 catch(e){toast(`未导入：${e.message||'文件格式错误'}`);}
}
document.addEventListener('click',async event=>{
 const button=event.target.closest('[data-action]');if(!button)return;
 const action=button.dataset.action,id=button.dataset.id,index=Number(button.dataset.index);
 if(action==='guide')$('#guideDialog').showModal();
 else if(action==='clear-article-filters'){articleFilters={query:'',level:'',category:'',format:'',collection:articleFilters.collection};$('#articleSearch').value='';$('#articleLevel').value='';$('#articleFormat').value='';document.querySelectorAll('[data-action=article-category]').forEach(b=>b.classList.toggle('selected',b.dataset.value===''));renderArticleResults();}
 else if(action==='article-category'){articleFilters.category=button.dataset.value;document.querySelectorAll('[data-action=article-category]').forEach(b=>b.classList.toggle('selected',b===button));renderArticleResults();}
 else if(action==='category'){filters.category=button.dataset.value;document.querySelectorAll('[data-action=category]').forEach(b=>b.classList.toggle('selected',b===button));renderCatalogResults(route.page);}
 else if(action==='speak-word'){const e=byEntry.get(id);await play(`${e.head}. ${e.example}`);}
 else if(action==='single-recall')startRecall([entryItem(byEntry.get(id))],'unit','用法回忆');
 else if(action==='unit-practice'){const u=byUnit.get(id);startRecall(u.entries.map(entryItem),'unit',u.title);}
 else if(action==='review-start')startRecall(dueItems().slice(0,20),'review','到期复习');
 else if(action==='dialogue-mode'){location.hash=`dialogue/${id}?mode=${button.dataset.mode}`;}
 else if(action==='play-dialogue')await playDialogue(id);
 else if(action==='play-turn')await playTurn(id,index);
 else if(action==='repeat-toggle'){repeatLine=!repeatLine;button.setAttribute('aria-pressed',repeatLine);button.textContent=repeatLine?'单句循环：开':'单句循环：关';if(!repeatLine)stopAudio();}
 else if(action==='stop-audio')stopAudio();
 else if(action==='recall-audio'){const item=session?.items[session.index];if(item)await play(item.type==='line'?item.line.en:item.entry.prompt.replace('____','…'));}
 else if(action==='recall-hint')revealRecall();
 else if(action==='recall-next')nextRecall();
 else if(action==='choose-role'){stopAudio();session.role=button.dataset.value;session.index=0;session.hint=false;renderRole();}
 else if(action==='role-hint'){session.hint=true;session.usedHint=true;renderRole();}
 else if(action==='role-audio')await play(session.dialogue.turns[session.index].en);
 else if(action==='role-next'){stopAudio();session.index++;session.hint=false;renderRole();}
 else if(action==='role-restart'){stopAudio();session.index=0;session.hint=false;renderRole();}
 else if(action==='save-shadow'){
  if(button.disabled)return;const s=session;document.querySelectorAll('[data-action=save-shadow]').forEach(b=>b.disabled=true);
  const rating=s.type==='role'&&s.usedHint&&button.dataset.rating==='independent'?'with-help':button.dataset.rating;
  const saved=await record({kind:'shadow',target:`dialogue:${s.dialogue.id}:${s.type}`,rating});
  if(saved)toast('跟读/接话自评已保存。可继续迁移表达。');
  else if(session===s)document.querySelectorAll('[data-action=save-shadow]').forEach(b=>b.disabled=false);
 }
 else if(action==='transfer-hint'){session.hint=true;$('#transferSample').innerHTML=`<div class="sample"><p class="muted">参考表达，可有其他正确说法</p><p class="en">${esc(session.dialogue.tasks[session.index].sample)}</p></div>`;}
 else if(action==='save-output'){
  const s=session;if(s.saved||s.saving)return;s.saving=true;
  const rating=button.dataset.rating==='independent'&&s.hint?'with-help':button.dataset.rating;
  const saved=await record({kind:'output',target:`transfer:${s.dialogue.id}:${s.index}`,rating,text:$('#transferAnswer').value});
  s.saving=false;if(session!==s)return;
  if(saved){s.saved=true;document.querySelectorAll('[data-action=save-output]').forEach(b=>b.disabled=true);$('#transferAnswer').readOnly=true;$('#transferNext').classList.remove('hidden');$('#transferStatus').innerHTML=`<p class="feedback">已保存${s.hint?'（看过参考，记为借助提示）':'自评'}。这不是自动评分结果。</p>`;}
 }
 else if(action==='transfer-next'){if(!session.saved)return;if(session.index===session.dialogue.tasks.length-1){$('#dialoguePractice').innerHTML='<div class="session-finish"><span class="overline">PUT IT INTO YOUR WORLD</span><h2>再遇到这个场景，试着用出来。</h2><p class="muted">迁移表达自评已保存到学习记录。</p><a class="btn primary" href="#progress">查看记录 ↗</a></div>';}else{session.index++;session.hint=false;session.saved=false;renderTransfer();}}
 else if(action==='record')await toggleRecording();
 else if(action==='export'){try{download(C.backup(localStorage),`shadow-reading-full-${C.dayKey()}.json`);toast('完整学习备份已导出。');}catch{toast('记录存在异常，请先导出存储原件留存。');}}
 else if(action==='raw-backup'){try{download(Object.fromEntries([C.KEY,...C.LEGACY].map(k=>[k,localStorage.getItem(k)])),`shadow-reading-recovery-${C.dayKey()}.json`);}catch{toast('浏览器当前不允许访问本地存储。');}}
 else if(action==='import')$('#backupInput').click();
});
document.addEventListener('submit',e=>{if(e.target.id==='recallForm')checkRecall(e);});
document.addEventListener('input',e=>{
 if(e.target.id==='articleSearch'){articleFilters.query=e.target.value;renderArticleResults();}
 if(e.target.id==='catalogSearch'){filters.query=e.target.value;renderCatalogResults(route.page);}
 if(e.target.id==='wordSearch'){filters.query=e.target.value;renderWordResults();}
});
document.addEventListener('change',e=>{
 if(['articleLevel','articleFormat','articleCollection'].includes(e.target.id)){const key={articleLevel:'level',articleFormat:'format',articleCollection:'collection'}[e.target.id];articleFilters[key]=e.target.value;if(key==='collection'){articleFilters.category='';articleFilters.format='';$('#articleFormat').value='';document.querySelectorAll('[data-action=article-category]').forEach(b=>b.classList.toggle('selected',b.dataset.value===''));}renderArticleResults();}
 if(e.target.id==='levelFilter'){filters.level=e.target.value;renderCatalogResults(route.page);}
 if(e.target.id==='wordFamily'){filters.category=e.target.value;renderWordResults();}
 if(e.target.id==='wordPos'){filters.level=e.target.value;renderWordResults();}
 if(e.target.id==='translationToggle'){translation=e.target.checked;$('#dialoguePractice').querySelectorAll('.turn .zh').forEach(el=>el.classList.toggle('hidden',!translation));}
});
$('#backupInput').addEventListener('change',e=>{handleImport(e.target.files[0]);e.target.value='';});
$('#helpButton').addEventListener('click',()=>$('#guideDialog').showModal());
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));
function applyTheme(theme){document.documentElement.dataset.theme=theme;$('#themeToggle').textContent=theme==='dark'?'切换浅色':'切换深色';$('#themeToggleMobile').textContent=theme==='dark'?'浅色':'深色';}
function toggleTheme(){const next=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(next);try{localStorage.setItem('sr_theme',next);}catch{toast('主题已切换，但浏览器未允许保存。');}}
$('#themeToggle').addEventListener('click',toggleTheme);
$('#themeToggleMobile').addEventListener('click',toggleTheme);
try {applyTheme(localStorage.getItem('sr_theme')==='dark'?'dark':'light');} catch {applyTheme('light');}
if(window.speechSynthesis)speechSynthesis.addEventListener('voiceschanged',loadVoices);
window.addEventListener('hashchange',routePage);
window.addEventListener('pagehide',()=>{stopAudio();cleanupRecording();});
window.addEventListener('storage',e=>{if(e.key===C.KEY){loadState();updateDue();if(['home','progress','review','units'].includes(route.page)&&!session)routePage();}});
// Old bookmarks and article wordbook links continue to select the same article/paragraph.
if(new URLSearchParams(location.search).has('article')){location.replace(`reading.html${location.search}${location.hash}`);return;}
const navIcons={home:'home',articles:'book',words:'words',units:'layers',review:'review',progress:'chart',dialogues:'chat'};
 document.querySelectorAll('[data-nav]').forEach(a=>{a.querySelector('span').innerHTML=UIAssets.icon(navIcons[a.dataset.nav]);});
 document.querySelectorAll('[data-mobile-nav]').forEach(a=>a.insertAdjacentHTML('afterbegin',UIAssets.icon(navIcons[a.dataset.mobileNav])));
 loadState();routePage();
})();
