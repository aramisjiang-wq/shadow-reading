/* Article-centred teaching layer. Original article/paragraph indexes remain intact. */
(function(root){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let active=null,usedReference=false,writing=false,serial=0;
function savedText(target){try{return LearningCore.eventsFor(LearningCore.read(localStorage),target,'output').at(-1)?.text||'';}catch{return '';}}
root.renderArticleStudy=function(a){
 serial++;active=a;usedReference=false;writing=false;
 const guide=document.getElementById('articleGuide'),lesson=document.getElementById('articleLesson');
 if(!a.edition){
  const edited=articles.find(x=>x.revisionOf===a.id);
  const mismatch=a.content.split('\n\n').length!==a.translation.split('\n\n').length;
  guide.innerHTML=`<div class="ag-meta">历史原稿 · 保留原文与原学习标记</div>${mismatch?'<p>这份历史原稿的中英段落数不一致，译文可能错位；建议使用同主题精编稿。</p>':''}<p>此篇保留你原先阅读的文字。${edited?`同主题已精编为「${esc(edited.subtitle)}」，新稿使用独立进度。`:''}</p>${edited?`<a href="reading.html?article=${edited.id}">阅读同主题精编稿 ↗</a>`:''}`;
  lesson.innerHTML='';lesson.hidden=true;return;
 }
 const count=(a.content.match(/\b[a-z]+\b/gi)||[]).length;
 const series=a.series;
 const journey=series?`<div class="series-journey">${series.previousId?`<a href="reading.html?article=${series.previousId}">← 上一集</a>`:'<span>故事从这里开始</span>'}${series.nextId?`<a href="reading.html?article=${series.nextId}">接着看第 ${series.episode+1} 集 →</a>`:'<a href="index.html#vocabulary">故事完结，继续把词用出来 →</a>'}</div>`:'';
 guide.innerHTML=`${series?`<div class="ag-meta">${esc(series.title)} · 第 ${series.season} 章「${esc(series.seasonTitle)}」· 第 ${series.episode} / ${SerialReading.episodes.length} 集</div><p><strong>${series.episode===1?'故事开始':'前情回顾'}</strong>${esc(series.recap)}</p>`:''}<div class="ag-meta">${esc(a.category)} / ${esc(a.format)} · 约 ${count} 词 · ${a.content.split('\n\n').length} 个段落 · ${esc(a.source)}</div><p><strong>这一集练什么</strong> ${esc(a.goal)}</p><div class="ag-links"><a href="#articleContent">① 读正文与跟读 ↓</a><a href="#articleExpressions">② 学文章表达 ↓</a><a href="#articleQuestions">③ 检查理解 ↓</a><a href="#articleRetell">④ 复述与迁移 ↓</a>${a.revisionOf?`<a href="reading.html?article=${a.revisionOf}">查看历史原稿 ↗</a>`:''}</div>${journey}`;
 const retellText=savedText(`article:${a.id}:retell`),transferText=savedText(`article:${a.id}:transfer`);
 lesson.hidden=false;
 lesson.innerHTML=`<div class="as-heading"><span>AFTER READING</span><h2>读过之后，把这篇用起来。</h2><p>先理解具体内容，再不看原文复述。可以多次练同一篇文章。</p></div>
 <section id="articleExpressions"><h3>文章里的 4 个实用表达</h3><div class="as-phrases">${a.phrases.map(p=>`<article><strong>${esc(p.en)}</strong><span>${esc(p.zh)}</span><p>${esc(p.note)}</p>${p.quote!==p.en?`<small>原文形式：${esc(p.quote)}</small>`:''}</article>`).join('')}</div><div class="as-unit-links">${a.units.map(id=>{const u=typeof Curriculum!=='undefined'?Curriculum.units.find(u=>u.id===id):null;return `<a href="index.html#unit/${id}">${esc(u?.title||id)} ↗</a>`;}).join('')}</div></section>
 <section id="articleQuestions"><h3>理解检查 · 根据文章回答</h3><form id="articleCheckForm">${a.checks.map((q,i)=>`<fieldset><legend>${i+1}. ${esc(q.q)}</legend>${q.options.map((o,j)=>`<label><input type="radio" name="article-check-${i}" value="${j}" required> <span>${esc(o)}</span></label>`).join('')}<div class="as-answer" id="articleCheckAnswer-${i}" aria-live="polite"></div></fieldset>`).join('')}<button class="btn btn-primary" type="submit">核对理解</button></form><p class="as-note">只显示本轮检查结果，不将答对两题记为掌握整篇文章。</p></section>
 <section id="articleRetell"><h3>合上原文，用自己的话复述</h3><p>${esc(a.retell)}</p><label class="as-label" for="articleRetellText">你的复述笔记（也可在下方录音后回放比较）</label><textarea id="articleRetellText" maxlength="10000" placeholder="先试着说明人物、事情经过、原因与结果…">${esc(retellText)}</textarea>${ratingButtons('retell')}<div id="articleRetellStatus" class="as-answer" aria-live="polite"></div></section>
 <section id="articleTransfer"><h3>换个条件，再表达一次</h3><p>${esc(a.transfer.prompt)}</p><label class="as-label" for="articleTransferText">你的新表达</label><textarea id="articleTransferText" maxlength="10000" placeholder="把文章里的搭配用到新的人物、时间或数字中…">${esc(transferText)}</textarea><button class="as-text-btn" data-study-action="show-reference">需要时看参考表达</button><div id="articleReference" hidden><p class="as-note">参考表达不是唯一正确答案。</p><p class="as-reference">${esc(a.transfer.sample)}</p></div>${ratingButtons('transfer')}<div id="articleTransferStatus" class="as-answer" aria-live="polite"></div></section>
 <p class="as-note">复述与迁移保存的是自评，未自动评判发音或语法。录音可使用下面的原文练习面板。</p>`;
 if(series){
  if(series.reviewGroup){
   const related=SerialReading.episodes.filter(episode=>episode.id!==a.id&&episode.series.reviewGroup===series.reviewGroup);
   document.getElementById('articleExpressions').insertAdjacentHTML('beforeend',`<div class="series-repeat"><h3>同一组表达，换个场景再练</h3><p class="as-note">下面三集都用到了本集的四个搭配。选一个场景，不看原句先试着说一遍。</p><ul>${related.map(episode=>`<li><a href="reading.html?article=${episode.id}">${esc(episode.subtitle)}</a></li>`).join('')}</ul></div>`);
  }
  const words=SeriesCore.inEpisode(a,SeriesVocabulary.words).filter(w=>w.rank>150&&w.id.length>=4).slice(0,12);
  document.getElementById('articleExpressions').insertAdjacentHTML('beforeend',`<h3 style="margin-top:24px">本集语境里的目标词</h3><p class="as-note">以下词或其已记录词形实际出现在正文。点开后先试着开口，再听示范、换个细节重说；5200 词库包含额外拓展词，并非本集新词数量。</p><div class="series-word-chips">${words.map(w=>`<a href="index.html#vocabulary?word=${w.id}&mode=say">${esc(w.head)} ↗</a>`).join('')}</div><a href="index.html#vocabulary">进入今日 10 词与到期复习 →</a>`);
  lesson.insertAdjacentHTML('beforeend',`<section class="series-episode-end"><h3>${series.nextId?'这一件事，解决了。下一件呢？':'故事完结，生活里的练习继续。'}</h3><p>先不看原文复述，再改变一个条件表达。你可以随时接着读；看完一集不会把词汇标记为掌握。</p>${journey}</section>`);
 }
 if(location.hash&&['#articleGuide','#articleLesson','#articleExpressions','#articleQuestions','#articleRetell'].includes(location.hash))setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView({block:'start'}),180);
};
function ratingButtons(type){return `<div class="as-ratings">${[['again','还需再练'],['with-help','借助提示完成'],['independent','自评独立完成']].map(([r,label])=>`<button class="btn" data-study-action="save-expression" data-kind="${type}" data-rating="${r}">${label}</button>`).join('')}</div>`;}
document.addEventListener('submit',event=>{
 if(event.target.id!=='articleCheckForm')return;event.preventDefault();if(!active?.edition)return;
 const form=event.target,data=new FormData(form);let correct=0;
 active.checks.forEach((q,i)=>{const ok=Number(data.get(`article-check-${i}`))===q.answer;if(ok)correct++;const box=document.getElementById(`articleCheckAnswer-${i}`);box.textContent=`${ok?'本题答对。':'请再核对原文。'} ${q.options[q.answer]} — ${q.why}`;box.classList.toggle('as-incorrect',!ok);});
 const button=form.querySelector('button[type=submit]');button.textContent=`本轮 ${correct}/${active.checks.length} · 可修改后再核对`;
});
document.addEventListener('click',async event=>{
 const button=event.target.closest('[data-study-action]');if(!button||!active?.edition)return;
 if(button.dataset.studyAction==='show-reference'){usedReference=true;document.getElementById('articleReference').hidden=false;return;}
 if(button.dataset.studyAction!=='save-expression'||writing)return;
 writing=true;const a=active,version=serial,kind=button.dataset.kind,input=document.getElementById(kind==='retell'?'articleRetellText':'articleTransferText');
 const text=input.value,rating=kind==='transfer'&&usedReference&&button.dataset.rating==='independent'?'with-help':button.dataset.rating;
 if(!text.trim()||(rating==='independent'&&(text.match(/\b[a-z]+\b/gi)||[]).length<5)){
  document.getElementById(kind==='retell'?'articleRetellStatus':'articleTransferStatus').textContent='先写下你的尝试；独立完成至少需要 5 个英文词。空白内容不会记为完成。';writing=false;return;
 }
 const buttons=[...document.querySelectorAll(`[data-study-action=save-expression][data-kind=${kind}]`)];buttons.forEach(b=>b.disabled=true);
 try{
  await LearningCore.record(localStorage,{kind:'output',target:`article:${a.id}:${kind}`,text,rating});
  window.dispatchEvent(new Event('reader-expression-saved'));
  if(version!==serial)return;
  document.getElementById(kind==='retell'?'articleRetellStatus':'articleTransferStatus').textContent=`已保存本次${kind==='retell'?'复述':'迁移'}自评${kind==='transfer'&&usedReference?'（看过参考，按借助提示记录）':''}。`;
 }catch{if(version===serial){buttons.forEach(b=>b.disabled=false);document.getElementById(kind==='retell'?'articleRetellStatus':'articleTransferStatus').textContent='这次未能保存，请先导出现有记录并检查浏览器存储。';}}
 finally{if(version===serial)writing=false;}
});
})(window);
