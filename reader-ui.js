(function(root){
'use strict';
let active=null,selected=0,observer=null,view='read',explicitSelection=null;
const $=id=>document.getElementById(id);
const views={read:'articleContent',expressions:'articleExpressions',practice:'articleQuestions'};
function setView(next,anchor,remember=true){
 if(!['read','expressions','practice'].includes(next))return;
 if(!active?.edition&&next!=='read')next='read';
 if(view==='practice'&&next!=='practice')stopRecording();
 view=next;document.body.dataset.readerView=next;
 document.querySelectorAll('.reader-view-tabs [data-reader-view]').forEach(b=>{const yes=b.dataset.readerView===next;b.classList.toggle('active',yes);b.setAttribute('aria-selected',String(yes));});
 if(remember){history.replaceState(null,'',`#${anchor||views[next]}`);requestAnimationFrame(()=>$(anchor||views[next])?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));}
}
function toggleSettings(show){
 const panel=$('readerSettings'),button=$('readerSettingsToggle');if(!panel||!button)return;
 const open=show===undefined?panel.hidden:show;panel.hidden=!open;button.setAttribute('aria-expanded',String(open));
 $('readerFontSize').textContent=`${FONT_STEPS[fontSizeIdx]} px`;
 if(open)panel.querySelector('select')?.focus({preventScroll:true});else button.focus({preventScroll:true});
}
function filterSidebar(){
 const q=$('readerArticleSearch')?.value.trim().toLowerCase()||'',collection=$('readerCollectionFilter')?.value||'edited';let count=0;
 document.querySelectorAll('#articleList .article-item').forEach(el=>{
  const index=Number(el.dataset.articleIndex),a=articles[index];if(!a)return;
  const show=(!q||`${a.title} ${a.subtitle}`.toLowerCase().includes(q))&&(collection==='all'||(collection==='edited'?!!a.edition:!a.edition));el.hidden=!show;if(show)count++;
 });
 if($('readerListCount'))$('readerListCount').textContent=count?`${count} 篇文章`:'没有匹配文章，试试其他关键词';
}
function syncAudio(){
 if(!active||!$('readerPlaybackState'))return;
 const total=active.content.split('\n\n').length;
 if(currentParaIdx>=0)selected=currentParaIdx;
 selected=Math.max(0,Math.min(total-1,selected));
 $('readerAudioLabel').textContent=isPlaying?'正在听读':'文章听读';
 $('readerPlaybackState').textContent=isPlaying?'逐段朗读 · 可随时暂停':speechSynthesis.paused&&currentUtterance?'已暂停 · 点击播放继续':`设备合成朗读 · 从第 ${selected+1} 段开始`;
 $('readerSegmentLabel').textContent=`第 ${selected+1} / ${total} 段`;
 document.querySelectorAll('[data-reader-paragraph]').forEach((b,i)=>{b.classList.toggle('active',i===selected);b.classList.toggle('past',i<selected);b.setAttribute('aria-current',i===selected?'step':'false');});
 $('playBtn')?.setAttribute('aria-label',isPlaying?'暂停文章朗读':'播放文章朗读');
 $('loopBtn')?.setAttribute('aria-pressed',String(loopMode));
}
function onArticle(article,index){
 active=article;selected=0;explicitSelection=null;
 $('readerArticleMeta').textContent=`${article.category||'历史原稿'} · ${{beginner:'基础',intermediate:'中级',advanced:'进阶'}[article.level]} · ${(article.content.match(/\b[a-z]+\b/gi)||[]).length} 词`;
 $('readerSegments').innerHTML=article.content.split('\n\n').map((_,i)=>`<button type="button" data-reader-paragraph="${i}" aria-label="定位第 ${i+1} 段"></button>`).join('');
 $('readerCollectionFilter').value=article.edition?'edited':'archive';
 document.querySelectorAll('#articleContent .word').forEach(el=>el.tabIndex=-1);
 document.querySelectorAll('#articleContent .paragraph-wrapper').forEach(el=>{const word=el.querySelector('.word');if(word)word.tabIndex=0;});
 observer?.disconnect();
 observer=new IntersectionObserver(entries=>{if(view!=='read'||isPlaying||explicitSelection!==null)return;const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0]){selected=Number(visible[0].target.dataset.index);syncAudio();}},{rootMargin:'-80px 0px -40% 0px',threshold:[0,.2,.5,.8]});
 document.querySelectorAll('#articleContent .paragraph-wrapper').forEach(el=>observer.observe(el));
 const hash=location.hash;const next=['#articleExpressions'].includes(hash)?'expressions':['#articleLesson','#articleQuestions','#articleRetell','#articleTransfer'].includes(hash)?'practice':'read';setView(next,null,false);filterSidebar();syncAudio();
 document.querySelectorAll('.reader-view-tabs [data-reader-view]:not([data-reader-view=read])').forEach(b=>b.disabled=!article.edition);
}
function playAt(index){
 const total=active?.content.split('\n\n').length||0;selected=Math.max(0,Math.min(total-1,index));explicitSelection=selected;
 const playing=isPlaying;setView('read',null,false);$('articleContent')?.querySelector(`[data-index="${selected}"]`)?.scrollIntoView({block:'center',behavior:'smooth'});
 if(playing){const target=selected;stopReading();selected=target;playParagraph(target,true);}else syncAudio();
}
root.ReaderUI={onArticle,syncAudio,setView,filterSidebar,getParagraph:()=>selected};
// Programmatic scrolling must not overwrite an explicitly selected paragraph.
// Reading-position tracking resumes when the reader deliberately scrolls.
function resumePositionTracking(event){
 if(event.target.closest?.('.sidebar,.reader-player,#readerSettings'))return;
 explicitSelection=null;
}
document.addEventListener('wheel',resumePositionTracking,{passive:true});
document.addEventListener('touchmove',resumePositionTracking,{passive:true});
document.addEventListener('DOMContentLoaded',()=>{
 if(!active&&articles[currentArticle])onArticle(articles[currentArticle],currentArticle);
 $('readerArticleSearch')?.addEventListener('input',filterSidebar);$('readerCollectionFilter')?.addEventListener('change',filterSidebar);
 document.querySelectorAll('[data-reader-action]').forEach(b=>{if(b.dataset.readerAction==='previous-paragraph')b.innerHTML=UIAssets.icon('chevron');else if(b.dataset.readerAction==='next-paragraph')b.innerHTML=UIAssets.icon('chevron');});
 document.querySelector('.reader-track-icon').innerHTML=UIAssets.icon('volume');
 document.querySelectorAll('.article-item').forEach(el=>el.setAttribute('tabindex','0'));
});
document.addEventListener('click',event=>{
 if(event.target.closest('.mobile-hamburger'))requestAnimationFrame(()=>document.querySelector('.reader-drawer-close')?.focus({preventScroll:true}));
 if(event.target.id==='sidebarOverlay'||event.target.closest('.reader-drawer-close'))document.querySelector('.mobile-hamburger')?.focus({preventScroll:true});
 const tab=event.target.closest('button[data-reader-view]');if(tab){setView(tab.dataset.readerView);return;}
 const segment=event.target.closest('[data-reader-paragraph]');if(segment){playAt(Number(segment.dataset.readerParagraph));return;}
 const action=event.target.closest('[data-reader-action]')?.dataset.readerAction;
 if(action==='settings')toggleSettings();else if(action==='close-settings')toggleSettings(false);else if(action==='theme')toggleTheme();else if(action==='previous-paragraph')playAt(selected-1);else if(action==='next-paragraph')playAt(selected+1);
 const link=event.target.closest('.ag-links a[href^="#"]');
 if(link){event.preventDefault();const id=link.getAttribute('href').slice(1),next=id==='articleContent'?'read':id==='articleExpressions'?'expressions':'practice';setView(next,id);}
 if(!$('readerSettings').hidden&&!event.target.closest('#readerSettings, #readerSettingsToggle')&&!action)toggleSettings(false);
 if(event.target.closest('#readerSettings'))$('readerFontSize').textContent=`${FONT_STEPS[fontSizeIdx]} px`;
 if(event.target.closest('#loopBtn'))syncAudio();
 if(event.target.closest('#focusBtn'))$('focusBtn').setAttribute('aria-pressed',String(document.body.classList.contains('focus-mode')));
});
document.addEventListener('keydown',event=>{
 if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)&&!event.target.closest('input,textarea,select,button,a,.word'))resumePositionTracking(event);
 if(event.key==='Escape'&&$('wordPopup')?.classList.contains('show')){closePopup();return;}
 if(document.querySelector('.sidebar.drawer-open')&&event.key==='Escape'){closeSidebar();document.querySelector('.mobile-hamburger')?.focus({preventScroll:true});return;}
 if(document.querySelector('.sidebar.drawer-open')&&event.key==='Tab'){const items=[...document.querySelector('.sidebar').querySelectorAll('button,input,select,a,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length&&!el.closest('[hidden]'));const first=items[0],last=items.at(-1);if(event.shiftKey&&event.target===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&event.target===last){event.preventDefault();first?.focus();}}
 if(event.key==='Escape'&&!$('readerSettings').hidden){toggleSettings(false);return;}
 const word=event.target.closest('.word');
 if(word){
  if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();const words=[...word.closest('.paragraph-wrapper').querySelectorAll('.word')],i=words.indexOf(word),next=words[i+(event.key==='ArrowRight'?1:-1)];if(next){word.tabIndex=-1;next.tabIndex=0;next.focus({preventScroll:true});}}
  if(event.key==='Enter'||event.key===' '){event.preventDefault();const rect=word.getBoundingClientRect();showWordPopup({target:word,clientX:rect.left,clientY:rect.bottom,stopPropagation(){}},word.dataset.word);}
 }
 const tab=event.target.closest('button[data-reader-view]');if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const list=[...document.querySelectorAll('.reader-view-tabs [data-reader-view]')].filter(b=>!b.disabled);let i=list.indexOf(tab);i=event.key==='Home'?0:event.key==='End'?list.length-1:(i+(event.key==='ArrowRight'?1:-1)+list.length)%list.length;list[i].focus();setView(list[i].dataset.readerView);}
 const item=event.target.closest('.article-item');if(item&&event.key==='Enter'){event.preventDefault();loadArticle(Number(item.dataset.articleIndex));}
});
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(['articleContent','articleExpressions','articleLesson','articleQuestions','articleRetell','articleTransfer'].includes(id))setView(id==='articleContent'?'read':id==='articleExpressions'?'expressions':'practice',null,false);});
})(window);
