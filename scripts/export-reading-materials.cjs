'use strict';
const fs=require('node:fs'),vm=require('node:vm');
const context={};vm.createContext(context);
vm.runInContext(['articles-data.js','editorial-data.js','serial-data.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+'\nthis.all=articles;',context);
const all=context.all,episodes=all.filter(a=>a.series),archive=all.filter(a=>!a.series);
const vocabulary=require('../vocabulary-data.js');
const sceneGroups=require('../scene-data.js'),sceneArticles=require('../scene-articles.js');
const wc=a=>(a.content.match(/\b[a-z]+\b/gi)||[]).length;
const out=['# Shadow Reading · 枫树街的夏天','',
`${episodes.length} 集完整双语连载 + ${sceneArticles.size} 篇生活场景短文 + 5200 词拓展练习。`,'',
'前情回顾 → 听读本集 → 理解与搭配 → 不看原文复述 → 换生活场景表达 → 隔天再回忆。','',
`连载共 ${episodes.length} 集、${episodes.reduce((n,a)=>n+wc(a),0)} 个英文词次、${episodes.length*4} 组对齐段落、${episodes.length*4} 个搭配、${episodes.length*2} 道理解题。另保留 60 篇旧独立文章与原稿。`,'',
'连载是原创虚构教学文本，难度为编辑提示。5200 词库另配用法例句，包含正文以外的拓展词；词次、唯一词条数与已掌握词汇量分开计算，不承诺读完自动获得 5200 主动词汇。','',
'## 连载目录','','| 集数 | 章节 | 标题 | 词次 |','| --- | --- | --- | --- |',
...episodes.map(a=>`| ${a.series.episode} | ${a.series.seasonTitle} | ${a.subtitle} / ${a.title} | ${wc(a)} |`),''];
function body(a){const zh=a.translation.split('\n\n');a.content.split('\n\n').forEach((p,i)=>out.push(p,'',`> ${zh[i]||'（历史原稿缺少此段对应译文。）'}`,''));}
for(const a of episodes){
 out.push(`## 第 ${a.series.episode} 集：${a.title}`,`### ${a.subtitle}`,'',`**第 ${a.series.season} 章 · ${a.series.seasonTitle}**`,'',`**前情**：${a.series.recap}`,'',`**学习目标**：${a.goal}`,'');body(a);
 if(a.series.reviewGroup){
  const again=episodes.filter(x=>x!==a&&x.series.reviewGroup===a.series.reviewGroup).map(x=>x.subtitle);
  out.push(`**用同一组表达再读**：${again.join('、')}`,'');
 }
 out.push('#### 本集搭配','','| 表达 | 中文 | 用法 |','| --- | --- | --- |',...a.phrases.map(p=>`| ${p.en}${p.quote!==p.en?`（原文：${p.quote}）`:''} | ${p.zh} | ${p.note} |`),'','#### 理解检查','');
 a.checks.forEach((q,i)=>out.push(`${i+1}. ${q.q}`,...q.options.map((o,j)=>`   - ${String.fromCharCode(65+j)}. ${o}`),''));
 out.push('**参考答案**：'+a.checks.map((q,i)=>`${i+1}. ${String.fromCharCode(65+q.answer)} — ${q.why}`).join('；'),'','#### 复述',a.retell,'','#### 换条件表达',a.transfer.prompt,'',`参考表达（不唯一）：${a.transfer.sample}`,'','---','');
}
out.push('## 生活场景短文','',`${sceneGroups.length} 类生活领域，${sceneArticles.size} 篇原创双语短文。`,'',
'先读英语正文，需要时对照中文。读完后用自己的话复述，再把表达用在自己的情境。','');
for(const group of sceneGroups){
 out.push(`### ${group.title}`,'');
 for(const scene of group.situations){
  const story=sceneArticles.get(scene.title);
  out.push(`#### ${scene.title} / ${story.title}`,'');
  for(const {en,zh} of story.paragraphs)out.push(en,'',`> ${zh}`,'');
  out.push(`**脱稿复述**　${story.retell}`,'');
  out.push(`**换情境表达**　${scene.prompt}`,'',scene.sample,'');
 }
}
out.push('## 5200 词拓展：从看懂到会用','',vocabulary.counting,'',
'每次最多 10 个词，先做已到期复习，再学新词。每词先理解例句，隔天不看答案回忆词形，再换生活情境表达。当前连续回忆阶段至少三级，且首末独立回忆跨至少七天；另有至少两天、两个场景的独立表达自评，才记入“回忆 + 迁移自评达标”。看例句当天按辅助练习记录，辅助或失败回忆重置阶段。同日重复不连续升级。','',
'系统未评判语义、语法或口语；表达保存的是自评。每词有一种实际例句用法，不代表掌握全部词义。语料经自动筛选，未逐句人工审校；部分例句无中文整句译文，词条释义不是整句翻译。','',
'词义：[ECDICT / MIT](https://github.com/skywind3000/ECDICT)。例句：[Tatoeba，经 ManyThings](https://www.manythings.org/anki/)，[CC BY 2.0 FR](https://creativecommons.org/licenses/by/2.0/fr/)。原句未改写，逐句署名保留如下；来源文件哈希见 vocabulary-data.js。','');
for(const w of vocabulary.words)out.push(`### ${w.head}`,'',w.meaning,'',w.example,'',w.exampleZh||'（此例句只提供英文原文，上方为词条释义。）','',`来源署名：${w.attribution}`,'',`练习：不看例句，用 ${w.head} 在家庭邻里、出门办事或工作朋友中选择一个场景，先说一句具体的话，再把它写下来。隔天换场景再试。`,'');
out.push('## 旧独立文章与历史原稿','','以下保留原文与编号，网页默认学习主线为连载。旧稿若中英段落不一致，仍按原稿保留，不将其作为新连载的进度。','');
for(const a of archive){out.push(`## 旧稿 ${a.id}：${a.title}`,`### ${a.subtitle}`,'');body(a);}
out.push('此文件由 scripts/export-reading-materials.cjs 从运行数据导出。更新正文或词库后重新导出。','');
fs.writeFileSync('Shadow-Reading-English-Materials.md',out.join('\n'));
console.log(JSON.stringify({episodes:episodes.length,archived:archive.length,englishTokens:episodes.reduce((n,a)=>n+wc(a),0),targetHeadwords:vocabulary.count}));
