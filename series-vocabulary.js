(function(root){
'use strict';
const C=root.LearningCore,S=root.SeriesCore,V=root.SeriesVocabulary;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=new Map(V.words.map(w=>[w.id,w]));
let session=null,routeVersion=0,bankPage=0,bankQuery='',bankFilter='all',writing=false;
const $=id=>document.getElementById(id);
function batchMode(state,w){if(!w)return 'say';
 const e=S.evidence(state,w);
 return e.schedule.dueNow||(e.started&&!e.schedule.attempts)?'recall':'say';}
function read(){return C.read(localStorage);}
function isCurrent(version,s){return version===routeVersion&&session===s&&!!document.getElementById('seriesVocabBody');}
function exposed(state,w){return C.eventsFor(state,`serial-word:${w.id}`,'exposure').some(e=>C.dayKey(e.at)===C.dayKey());}
function label(e){return e.ready?'多日回忆 + 迁移自评达标':e.retained?'已有多日回忆证据':e.produced?'已有独立迁移自评':e.recall?'曾独立回忆正确':e.started?'继续巩固':'尚未测试';}
function metrics(state){const n=S.summary(state,V.words);return `<div class="series-metrics"><div><strong>${n.total.toLocaleString()}</strong><span>唯一目标词条</span></div><div><strong>${n.recall}</strong><span>曾独立回忆</span></div><div><strong>${n.retained}</strong><span>多日回忆保留</span></div><div><strong>${n.ready}</strong><span>回忆 + 迁移自评达标</span></div></div>`;}
function explanation(){return `<details class="series-rules"><summary>5200 怎么数，“会用”怎么验证？</summary><p>${esc(V.counting)}</p><p>第一层：不看答案填回例句中的词形。第二层：跨至少 7 天、当前连续阶段达到 3 次独立回忆。第三层：至少两个不同日期、两个生活场景，保存两句不同的独立表达自评。</p><p>看例句当天的回忆与表达按借助提示记录；失败或辅助回忆会重置当前回忆阶段。同日反复答题不会升级。迁移保存的是你的自评，系统只检查目标词、基本长度和是否照抄，未自动判断语法、语义或口语能力。后续借助提示的迁移会重新开始积累独立表达证据。</p><p>连载正文提供连续故事和重点搭配；5200 词库另配实际用法例句，属于拓展学习目标，并非声称全部出现在这 43 集中。精选词有具体情境和搭配说明，其余词使用语料例句或中文释义。每词至少一种例句用法，不代表掌握全部词义。建议每天最多 10 个新词，先复习；学习周期随基础和复习情况变化。</p><p>词义：<a href="https://github.com/skywind3000/ECDICT" target="_blank" rel="noopener">ECDICT / MIT</a>；例句：<a href="https://www.manythings.org/anki/" target="_blank" rel="noopener">Tatoeba，经 ManyThings 筛选 / CC BY 2.0 FR</a>。按原作者保留署名；语料经自动筛选，未逐句人工审校。</p></details>`;}
root.renderSeriesVocabulary=function(main,query){
 routeVersion++;writing=false;bankPage=0;bankQuery=query.get('q')||'';bankFilter=query.get('filter')||'all';
 let state;try{state=read();}catch{main.innerHTML='<div class="notice danger">词汇记录暂时无法读取。请到学习记录导出存储原件后检查；未重置现有数据。</div>';return;}
 main.innerHTML=`<div class="page-top"><div><div class="overline">FROM UNDERSTANDING TO USING</div><h1>把认识的词，变成能用的话。</h1><p>5200 个唯一基础词条 · 每次 10 个 · 先想你要说什么，再开口，最后对照用法。</p></div><a class="btn" href="#articles">回到连载 →</a></div>${metrics(state)}<div class="series-vocab-nav"><a class="btn ${query.get('view')==='bank'?'':'primary'}" href="#vocabulary">今日 10 词</a><a class="btn" href="#vocabulary?filter=due&view=bank">到期复习 · ${S.summary(state,V.words).due.length}</a><a class="btn ${query.get('view')==='bank'?'primary':''}" href="#vocabulary?view=bank">查看全部 5200 词</a></div><div id="seriesVocabBody"></div>${explanation()}`;
 if(query.get('view')==='bank'){session=null;renderBank(state);return;}
 const selected=byId.get(query.get('word'));
 if(query.has('word')&&!selected){$('seriesVocabBody').innerHTML='<p class="notice">没有找到这个目标词。<a href="#vocabulary?view=bank">回词库检索</a></p>';return;}
 const queue=selected?[selected]:query.get('review')==='1'?S.summary(state,V.words).due.slice(0,10):S.nextBatch(state,V.words,10);
 session={queue,index:0,mode:query.get('mode')==='say'?'say':query.get('mode')==='output'?'output':selected?'recall':batchMode(state,queue[0]),hint:false,checked:false,drafts:{},context:S.contexts.find(c=>c.id===query.get('context'))?.id||'home'};
 renderPractice(state);
};
function renderBank(state){
 $('seriesVocabBody').innerHTML=`<section class="study-panel"><div class="toolbar"><label class="search-wrap" for="seriesWordSearch"><span class="hidden">搜索 5200 词</span><input id="seriesWordSearch" type="search" placeholder="英文词、中文释义或例句…" value="${esc(bankQuery)}"></label><label for="seriesWordFilter"><span class="hidden">练习状态</span><select id="seriesWordFilter">${[['all','全部状态'],['new','尚未测试'],['due','到期复习'],['ready','回忆 + 迁移自评达标']].map(([id,t])=>`<option value="${id}" ${id===bankFilter?'selected':''}>${t}</option>`).join('')}</select></label></div><div id="seriesBankResults"></div></section>`;
 renderBankResults(state);
}
function renderBankResults(state){
 const q=bankQuery.trim().toLowerCase();
 const words=V.words.filter(w=>{
  if(q&&![w.head,w.meaning,w.example].join(' ').toLowerCase().includes(q))return false;
  if(bankFilter==='all')return true;const e=S.evidence(state,w);
  return bankFilter==='due'?e.schedule.dueNow:bankFilter==='ready'?e.ready:!e.started;
 });
 const pages=Math.max(1,Math.ceil(words.length/40));bankPage=Math.min(bankPage,pages-1);
 $('seriesBankResults').innerHTML=`<p class="result-count">${words.length} 个唯一词条 · 第 ${bankPage+1} / ${pages} 页 · 按来源词频优先排列</p><div class="series-bank">${words.slice(bankPage*40,(bankPage+1)*40).map(w=>`<article><div><strong>${esc(w.head)}</strong><span class="pos">${esc(w.phonetic)}</span><p>${esc(w.meaning)}</p><small>${label(S.evidence(state,w))}</small></div><div><a class="btn small" href="#vocabulary?word=${w.id}">回忆用法</a><a class="text-btn" href="#vocabulary?word=${w.id}&mode=output">生活表达</a></div></article>`).join('')||'<p class="empty">暂无匹配词条，试试更短的关键词或其他状态。</p>'}</div><div class="actions"><button class="btn" data-sv-action="page" data-step="-1" ${bankPage===0?'disabled':''}>上一页</button><button class="btn" data-sv-action="page" data-step="1" ${bankPage>=pages-1?'disabled':''}>下一页</button></div>`;
}
function current(){return session?.queue[session.index];}
function reference(w){return `<div class="series-reference"><strong>${esc(w.head)}</strong> <span>${esc(w.phonetic)}</span><p>${esc(w.meaning)}</p><p class="en">${esc(w.example)}</p><p>${w.exampleZh?esc(w.exampleZh):'此例句只提供英文原文；上方为词条释义，并非整句翻译。'}</p><small>${esc(w.attribution)} · <a href="https://creativecommons.org/licenses/by/2.0/fr/" target="_blank" rel="noopener">CC BY 2.0 FR</a> · 未改写</small></div>`;}
function renderPractice(state){
 const w=current();if(!w){$('seriesVocabBody').innerHTML='<section class="study-panel"><h2>本批练习已结束。</h2><p>答过一次不等于会用。下次先做到期复习，再换一个情境表达。</p><a href="#vocabulary?view=bank" class="btn primary">看词库与记录</a></section>';return;}
 const s=session,e=S.evidence(state,w),seen=exposed(state,w);
 const card=S.speakingCard(w,s.context);
 const blank=w.example.replace(new RegExp(`\\b${w.surface}\\b`,'gi'),'____');
 let content;
 if(s.mode==='recall')content=`<div class="overline">RECALL THE FORM IN THIS SENTENCE</div><h2>先回忆，再看答案。</h2><p>${esc(w.meaning)}</p><p class="series-cloze en">${esc(blank)}</p>${w.exampleZh?`<p class="muted">${esc(w.exampleZh)}</p>`:''}<form id="seriesRecallForm"><label for="seriesRecallInput">填入原句需要的英文词形（${w.surface.length} 个字母）</label><div class="actions"><input id="seriesRecallInput" autocomplete="off" autocapitalize="off" spellcheck="false" required maxlength="80"><button class="btn primary" type="submit">核对并保存</button></div></form><button class="text-btn" data-sv-action="reference">看例句与答案 · 本日记辅助练习</button><div id="seriesReference" ${s.hint?'':'hidden'}>${s.hint?reference(w):''}</div><p class="help-line">按语料原句核对词形；其他语义合理的答案可能无法自动识别，可查看例句后继续辅助练习。</p>`;
 else if(s.mode==='say'){
  const scene=S.contexts.find(c=>c.id===s.context);
  const previous=C.eventsFor(state,`serial-use:${w.id}:${s.context}`,'output').length;
  const cue=card?.prompt||(s.context==='home'&&w.exampleZh
   ? `想象你需要向对方表达这个意思：“${w.exampleZh}” 用一句英文说出来。`
   : `${scene.prompt.replace('用这个词，','').replace('，用这个词','')} 这一轮要表达的意思参考：${w.meaning}`);
  content=`<h2>这个时候，你会怎么说？</h2><div class="practice-tabs">${S.contexts.map(c=>`<button class="btn small ${c.id===s.context?'selected':''}" data-sv-action="context" data-context="${c.id}">${c.label}</button>`).join('')}</div><p class="series-speaking-cue">${esc(cue)}</p><p>先想清楚你在跟谁说、想让对方知道什么。开口说一次，再记下你说的句子。</p><label for="seriesOutput">我刚才说的是</label><textarea id="seriesOutput" maxlength="2000" placeholder="把刚才说的英文写下来…"></textarea><div class="actions"><button class="btn primary" data-sv-action="save-output" data-rating="independent">记录我的表达</button><button class="btn" data-sv-action="reference">${previous?'复习示范':'卡住了，看怎么说'}</button></div><div id="seriesReference" ${s.hint?'':'hidden'}></div>`;
 } else content=`<div class="overline">USE IT IN YOUR OWN LIFE</div><h2>用 ${esc(w.head)}，说一句你会说的话。</h2><div class="practice-tabs">${S.contexts.map(c=>`<button class="btn small ${c.id===s.context?'selected':''}" data-sv-action="context" data-context="${c.id}">${c.label}</button>`).join('')}</div><p>${esc(S.contexts.find(c=>c.id===s.context).prompt)}</p><p class="muted">写下你说的完整英文，包含目标词或所列词形；表达你的实际意思。你需要自行核对用法，系统不作语义评分。</p><label for="seriesOutput">你的表达</label><textarea id="seriesOutput" maxlength="2000" placeholder="先不看例句，试着把具体意思说出来…">${esc(C.eventsFor(state,`serial-use:${w.id}:${s.context}`,'output').at(-1)?.text||'')}</textarea><button class="text-btn" data-sv-action="reference">需要时看释义与例句 · 本日记辅助练习</button><div id="seriesReference" ${s.hint?'':'hidden'}>${s.hint?reference(w):''}</div><div class="actions">${[['again','还需再练'],['with-help','借助提示完成'],['independent','自评独立完成']].map(([r,t])=>`<button class="btn ${r==='independent'?'primary':''}" data-sv-action="save-output" data-rating="${r}">${t}</button>`).join('')}</div>`;
 $('seriesVocabBody').innerHTML=`<section class="study-panel series-practice"><div class="series-practice-top"><span>本批 ${s.index+1} / ${s.queue.length} · ${label(e)}</span><div><button class="text-btn" data-sv-action="mode" data-mode="say">场景开口</button><button class="text-btn" data-sv-action="mode" data-mode="recall">语境回忆</button><button class="text-btn" data-sv-action="mode" data-mode="output">换场景表达</button></div></div>${seen?'<p class="notice">今天已看过本词参考；本日记录按借助提示保存。隔天不看参考再测。</p>':''}${content}<p id="seriesPracticeStatus" role="status" aria-live="polite"></p><div class="actions series-next"><button class="btn" data-sv-action="next">${s.index+1===s.queue.length?'结束本批':'先放下，下一词 →'}</button><a class="text-btn" href="#vocabulary?view=bank">查看 5200 词库</a></div></section>`;
}
async function save(event){const next=await C.record(localStorage,event);root.dispatchEvent(new Event('series-recorded'));return next;}
document.addEventListener('submit',async event=>{
 if(event.target.id!=='seriesRecallForm')return;event.preventDefault();if(!session||writing||session.checked)return;
 const version=routeVersion,s=session,w=current(),text=$('seriesRecallInput').value;
 if(!text.trim())return;
 writing=true;const button=event.target.querySelector('button');button.disabled=true;
 try{const state=read(),correct=C.matches(text,[w.surface]),assisted=s.hint||exposed(state,w);
  const next=await save({kind:'recall',target:`serial-word:${w.id}`,correct,assisted});
  if(!isCurrent(version,s))return;s.checked=true;
  $('seriesPracticeStatus').textContent=`${correct?'词形正确':'与原句词形不同'}：${w.surface}。已保存${assisted?'辅助练习':correct?'独立回忆':'待巩固'}。${correct?'接下来可切换到场景开口。':'看例句核对具体用法，隔天再试。'}`;
  if(!correct){
   $('seriesReference').innerHTML=reference(w);$('seriesReference').hidden=false;s.hint=true;
   await save({kind:'exposure',target:`serial-word:${w.id}`});
  }
  root.dispatchEvent(new Event('series-recorded'));
 }catch{if(isCurrent(version,s)){$('seriesPracticeStatus').textContent='保存未完成，请检查学习记录并导出备份；未写入的练习不会算作已保存。';button.disabled=false;s.checked=false;}}
 finally{if(version===routeVersion)writing=false;}
});
document.addEventListener('click',async event=>{
 const button=event.target.closest('[data-sv-action]');if(!button||writing)return;
 const action=button.dataset.svAction,version=routeVersion;
 if(action==='page'){bankPage+=Number(button.dataset.step);renderBankResults(read());return;}
 if(!session)return;const s=session,w=current();if(!w)return;
 if(action==='next'){s.index++;s.hint=false;s.checked=false;const state=read();s.mode=batchMode(state,current());renderPractice(state);return;}
 if(action==='mode'){if($('seriesOutput'))s.drafts[`${w.id}:${s.context}`]=$('seriesOutput').value;s.mode=button.dataset.mode;s.checked=false;renderPractice(read());if($('seriesOutput')&&s.drafts[`${w.id}:${s.context}`]!==undefined)$('seriesOutput').value=s.drafts[`${w.id}:${s.context}`];return;}
 if(action==='context'){s.drafts[`${w.id}:${s.context}`]=$('seriesOutput')?.value||'';s.context=button.dataset.context;s.hint=false;renderPractice(read());$('seriesOutput').value=s.drafts[`${w.id}:${s.context}`]??$('seriesOutput').value;return;}
 if(action==='listen'){
  if(!root.speechSynthesis)return;
  root.speechSynthesis.cancel();
  const example=s.mode==='say'?S.speakingCard(w,s.context)?.example:w.example;
  const line=new SpeechSynthesisUtterance(example||w.example);
  line.lang='en-US';line.rate=0.85;root.speechSynthesis.speak(line);
  return;
 }
 if(action==='reference'){
  writing=true;button.disabled=true;
  try{if(!exposed(read(),w))await save({kind:'exposure',target:`serial-word:${w.id}`});if(!isCurrent(version,s))return;s.hint=true;
   const card=S.speakingCard(w,s.context);
   const demonstration=s.mode==='say'&&card?`<div class="series-reference"><strong>一种说法</strong><p class="en">${esc(card.example)}</p><p>${esc(card.note)}</p></div>`:reference(w);
   $('seriesReference').innerHTML=demonstration+`<button class="btn small" data-sv-action="listen">听示范</button><p>听一遍，遮住示范，换一个人、时间或物品，再开口说一遍。</p><button class="text-btn" data-sv-action="hide-reference">遮住示范</button>`;
   $('seriesReference').hidden=false;}
  catch{if(isCurrent(version,s)){$('seriesPracticeStatus').textContent='无法保存提示使用记录，请先检查存储。';button.disabled=false;}}
  finally{if(version===routeVersion)writing=false;}return;
 }
 if(action==='hide-reference'){$('seriesReference').hidden=true;$('seriesOutput')?.focus();return;}
 if(action==='save-output'){
  const text=$('seriesOutput').value.trim(),error=S.outputError(w,text);
  const card=S.speakingCard(w,s.context);
  if(error||(s.mode==='say'&&card&&C.normalize(text)===C.normalize(card.example)&&(s.hint||exposed(read(),w)))){
   $('seriesPracticeStatus').textContent=s.mode==='say'&&text&&!S.containsWord(w,text)
    ? '你可能已经用另一种说法表达了意思。点开示范，比较目标词能用在哪里，再换一个细节重说。'
    : error||'请换一个细节再说一次。';
   return;
  }
  writing=true;const controls=[...document.querySelectorAll('[data-sv-action=save-output]')];controls.forEach(b=>b.disabled=true);
  try{const assisted=s.hint||exposed(read(),w),rating=button.dataset.rating==='independent'&&assisted?'with-help':button.dataset.rating;
   await save({kind:'output',target:`serial-use:${w.id}:${s.context}`,rating,text});if(!isCurrent(version,s))return;
   $('seriesPracticeStatus').textContent=`已保存${rating==='independent'?'独立表达自评':rating==='with-help'?'借助提示的表达自评':'待巩固的表达自评'}。尚未自动判断语法、语义或发音；请隔天换场景再试。`;
   root.dispatchEvent(new Event('series-recorded'));
  }catch{if(isCurrent(version,s)){$('seriesPracticeStatus').textContent='这次表达未能保存，请检查存储并备份记录。';controls.forEach(b=>b.disabled=false);}}
  finally{if(version===routeVersion)writing=false;}
 }
});
document.addEventListener('input',event=>{if(event.target.id==='seriesWordSearch'){bankQuery=event.target.value;bankPage=0;renderBankResults(read());}});
document.addEventListener('change',event=>{if(event.target.id==='seriesWordFilter'){bankFilter=event.target.value;bankPage=0;renderBankResults(read());}});
root.SeriesVocabularyUI={metrics,explanation};
})(window);
