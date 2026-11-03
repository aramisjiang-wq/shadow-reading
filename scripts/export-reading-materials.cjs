'use strict';
const fs=require('node:fs'),vm=require('node:vm');
const context={};vm.createContext(context);
vm.runInContext(fs.readFileSync('articles-data.js','utf8')+'\n'+fs.readFileSync('editorial-data.js','utf8')+'\nthis.all=articles;',context);
const all=context.all,edited=all.filter(a=>a.edition),original=all.filter(a=>!a.edition);
const wc=a=>(a.content.match(/\b[a-z]+\b/gi)||[]).length,level={beginner:'基础',intermediate:'中级',advanced:'进阶'};
const total=edited.reduce((n,a)=>n+wc(a),0);
const out=['# Shadow Reading 双语文章与练习','',
'以文章为学习主线：精听 → 逐段理解 → 跟读 → 学词汇用法 → 理解检查 → 复述与迁移。词汇专题和短对话为补充。','',
`**精编内容**：${edited.length} 篇、${total.toLocaleString('en-US')} 个英文词次、240 组中英对齐段落、160 个文章表达讲解、80 道理解题，以及每篇各 1 个复述与迁移任务。另保留原 20 篇历史原稿。词次不是独立单词数，也不是掌握词汇量。`,'',
'精编稿为原创教学材料，人物、机构、访谈与事件均为虚构。难度为编辑提示；音频由浏览器合成，不是真人原声。原稿编号与文字保持不变，重写稿使用独立学习记录。','',
'## 精编文章目录','','| 编号 | 中文标题 / English title | 题材 | 难度 | 词次 |','| --- | --- | --- | --- | --- |',
...edited.map(a=>`| ${a.id} | ${a.subtitle} / ${a.title} | ${a.category} · ${a.format} | ${level[a.level]} | ${wc(a)} |`),''];
for(const a of edited){
 out.push(`## 精编 ${a.id}：${a.title}`,`### ${a.subtitle}`,'',`**${a.category} · ${a.format} · ${level[a.level]} · 约 ${wc(a)} 词**`,'',`**学习目标**：${a.goal}`,'');
 if(a.revisionOf)out.push(`原主题对应历史原稿 ${a.revisionOf}；本篇为独立重写稿。`,'');
 const zh=a.translation.split('\n\n');a.content.split('\n\n').forEach((p,i)=>out.push(p,'',`> ${zh[i]}`,''));
 out.push('#### 文章表达','','| 表达 | 中文 | 用法 |','| --- | --- | --- |',...a.phrases.map(p=>`| ${p.en}${p.quote!==p.en?`（原文：${p.quote}）`:''} | ${p.zh} | ${p.note} |`),'','#### 理解检查','');
 a.checks.forEach((q,i)=>out.push(`${i+1}. ${q.q}`,...q.options.map((o,j)=>`   - ${String.fromCharCode(65+j)}. ${o}`),''));
 out.push('**参考答案**：'+a.checks.map((q,i)=>`${i+1}. ${String.fromCharCode(65+q.answer)} — ${q.why}`).join('；'),'','#### 复述',a.retell,'','#### 换条件表达',a.transfer.prompt,'',`参考表达（不唯一）：${a.transfer.sample}`,'','---','');
}
out.push('## 历史原稿档案','','下列文字为原有 20 篇文章，保留其原始学习对象。精编阅读以此前 40 篇为主。','');
for(const a of original){out.push(`## 历史原稿 ${a.id}：${a.title}`,`### ${a.subtitle}`,'');const zh=a.translation.split('\n\n');a.content.split('\n\n').forEach((p,i)=>out.push(p,'',`> ${zh[i]||'（历史原稿缺少此段对应译文。）'}`,''));}
out.push('## 方法说明与来源','',
'本项目的文章练习流程是学习设计建议，不整体归因为“尚雯婕影子阅读法”。她工作室的公开说明包括课文、新闻、专业谈话，强调听、背、写结合；本项目不据此承诺固定篇数或固定天数即可掌握一种语言。','',
'- [尚雯婕工作室公开说明](https://www.sina.cn/news/detail/5175282183181395.html)',
'- [新华网相关报道](https://www.xinhuanet.com/ent/20230707/d6e8c851a52b4e12b279716e11061caf/c.html)','',
'此文件由 `scripts/export-reading-materials.cjs` 从文章数据生成。更新文章后重新导出，以免正文、译文、答案与网页分叉。','');
fs.writeFileSync('Shadow-Reading-English-Materials.md',out.join('\n'));
console.log(JSON.stringify({edited:edited.length,original:original.length,englishTokens:total,paragraphs:edited.length*6,expressions:edited.length*4,questions:edited.length*2}));
