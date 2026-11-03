'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
require('../curriculum-data.js');
const context={};vm.createContext(context);
vm.runInContext(fs.readFileSync('articles-data.js','utf8')+'\n'+fs.readFileSync('editorial-data.js','utf8')+'\nthis.allArticles=articles;',context);
const all=JSON.parse(JSON.stringify(context.allArticles)),edited=all.filter(a=>a.edition);
const fingerprints=JSON.parse(fs.readFileSync('tests/original-articles-fingerprints.json','utf8'));
test('original twenty manuscripts and paragraph anchors are unchanged',()=>{
 for(let i=0;i<20;i++){const a=all[i],original=fingerprints[i];assert.equal(a.id,original.id);assert.equal(a.title,original.title);assert.equal(a.content.split('\n\n').length,original.paragraphs);assert.equal(crypto.createHash('sha256').update(JSON.stringify(a)).digest('hex'),original.sha256);}
});
test('forty independently indexed edited articles include twenty rewrites, ten interviews and ten new narratives',()=>{
 assert.equal(all.length,60);assert.equal(edited.length,40);assert.deepEqual(all.map(a=>a.id),Array.from({length:60},(_,i)=>i+1));
 assert.deepEqual(edited.filter(a=>a.revisionOf).map(a=>a.revisionOf),Array.from({length:20},(_,i)=>i+1));
 assert.equal(edited.filter(a=>a.format==='访谈').length,10);assert.equal(edited.filter(a=>!a.revisionOf&&a.format!=='访谈').length,10);
 assert.equal(new Set(all.map(a=>a.title)).size,60);assert.equal(new Set(all.map(a=>a.content)).size,60);
});
test('bilingual article paragraphs are complete and the reading level has an editorial length bound',()=>{
 for(const a of edited){const en=a.content.split('\n\n'),zh=a.translation.split('\n\n');assert.equal(en.length,6,`${a.id} English`);assert.equal(zh.length,6,`${a.id} Chinese`);assert.ok(en.every(p=>p.trim().length>120));assert.ok(zh.every(p=>/[\u4e00-\u9fff]/.test(p)&&p.length>30));const wc=(a.content.match(/\b[a-z]+\b/gi)||[]).length;assert.ok(wc>=300&&wc<=410,`${a.id}: ${wc}`);assert.ok(!/undefined|\[object Object\]|TODO|TBD|§/.test(a.content+a.translation));}
});
test('all 160 teaching expressions occur in their own articles, including inflected forms',()=>{
 for(const a of edited){assert.equal(a.phrases.length,4);assert.equal(new Set(a.phrases.map(p=>p.en)).size,4);for(const p of a.phrases){assert.ok(p.en&&p.zh&&p.note&&p.quote);assert.ok(a.content.toLowerCase().includes(p.quote.toLowerCase()),`${a.id}: ${p.en}`);}}
});
test('article questions, production tasks and vocabulary-unit references are valid',()=>{
 const ids=new Set(Curriculum.units.map(u=>u.id));
 for(const a of edited){assert.ok(a.units.every(id=>ids.has(id)),a.id);assert.ok(a.goal&&a.retell&&a.transfer.prompt&&a.transfer.sample);assert.equal(a.checks.length,2);for(const q of a.checks){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);assert.ok(q.q&&q.why);assert.ok(q.options.every(Boolean));}}
});
test('new manuscripts do not reuse full long paragraphs or generic conclusions',()=>{
 const paragraphs=edited.flatMap(a=>a.content.split('\n\n'));assert.equal(new Set(paragraphs).size,240);
 const endings=edited.map(a=>a.content.split('\n\n').at(-1));assert.equal(new Set(endings).size,40);
});
