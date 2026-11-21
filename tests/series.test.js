'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const C=require('../learning-core.js'),S=require('../series-core.js'),V=require('../vocabulary-data.js'),serial=require('../serial-data.js');
const state=(events=[])=>({version:1,events:Object.fromEntries(events.map((e,i)=>[`e-${i}`,e]))});
const at=d=>new Date(2026,10,d,12).toISOString();
const recall=(d,correct=true,assisted=false)=>({kind:'recall',target:'serial-word:book',correct,assisted,at:at(d)});
const output=(d,context='home',rating='independent',text=context==='work'?'I left the book in our meeting room.':'Could you bring my book tomorrow morning?')=>({kind:'output',target:`serial-use:book:${context}`,rating,text,at:at(d)});
const word=V.words.find(w=>w.id==='book');
class Storage{constructor(){this.data=new Map();}getItem(k){return this.data.get(k)??null;}setItem(k,v){this.data.set(k,String(v));}removeItem(k){this.data.delete(k);}}
test('every life situation has one distinct bilingual article',()=>{
 const groups=require('../scene-data.js'),stories=require('../scene-articles.js');
 const titles=groups.flatMap(group=>group.situations.map(scene=>scene.title));
 assert.equal(groups.length,24);
 assert.equal(titles.length,120);
 assert.equal(new Set(titles).size,titles.length);
 assert.equal(new Set(groups.flatMap(group=>group.situations.map(scene=>scene.id))).size,titles.length);
 assert.deepEqual(new Set(stories.keys()),new Set(titles));
 assert.equal(new Set([...stories.values()].map(story=>story.title)).size,titles.length);
 for(const [title,{paragraphs,retell}] of stories){
  assert.match(retell,/[？]/,title);
  assert.equal(paragraphs.length,2,title);
  for(const {en,zh} of paragraphs){
   assert.ok(S.tokens(en).length>=20,title);
   assert.match(zh,/[\u4e00-\u9fff]/,title);
  }
 }
});
test('55 complete episodes append after the 60 previous manuscripts, with valid two-way navigation',()=>{
 const context={};vm.createContext(context);vm.runInContext(['articles-data.js','editorial-data.js','serial-data.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+'\nthis.all=articles;',context);
 assert.equal(context.all.length,115);assert.equal(serial.episodes.length,55);assert.equal(serial.seasons.length,11);
 assert.deepEqual(Array.from(context.all,a=>a.id),Array.from({length:115},(_,i)=>i+1));
 const endings=new Set();
 for(const [i,a] of serial.episodes.entries()){
  assert.equal(a.series.episode,i+1);assert.equal(a.series.previousId,i===0?null:a.id-1);assert.equal(a.series.nextId,i===54?null:a.id+1);
  assert.ok(a.series.recap&&a.series.seasonTitle&&a.goal&&a.transfer.prompt&&a.transfer.sample);
  const en=a.content.split('\n\n'),zh=a.translation.split('\n\n');assert.equal(en.length,4);assert.equal(zh.length,4);
  assert.ok(en.every(p=>p.length>100));assert.ok(zh.every(p=>/[\u4e00-\u9fff]/.test(p)));
  const count=S.tokens(a.content).length;assert.ok(count>=130&&count<=220,`${a.id}: ${count}`);
  assert.equal(a.phrases.length,4);for(const p of a.phrases)assert.ok(a.content.toLowerCase().includes(p.quote.toLowerCase()),`${a.id}: ${p.quote}`);
  assert.equal(a.checks.length,2);for(const q of a.checks){assert.equal(q.options.length,3);assert.ok(q.options[q.answer]&&q.why);}
  endings.add(en.at(-1));
 }
 assert.equal(endings.size,55);
 assert.equal(new Set(serial.episodes.flatMap(a=>a.checks.map(q=>q.answer))).size,3);
});
test('5200 distinct dictionary headwords all have an attested example form and contributor attribution',()=>{
 assert.equal(V.words.length,5200);assert.equal(new Set(V.words.map(w=>w.id)).size,5200);
 const ids=new Set(V.words.map(w=>w.id));assert.ok(ids.has('i')&&ids.has('be')&&ids.has('have'));
 for(const inflection of ['is','are','am','was','went','gone','did','does','has','written'])assert.ok(!ids.has(inflection),inflection);
 for(const w of V.words){assert.match(w.id,/^[a-z]+$/);assert.match(w.meaning,/[\u4e00-\u9fff]/);assert.ok(S.containsWord(w,w.example));assert.ok(S.tokens(w.example).includes(w.surface));assert.match(w.attribution,/#\d+ \([^)]+\)/);assert.ok(S.tokens(w.example).length>=5);assert.ok(w.rank>0&&w.rank<7000);}
});
test('work and daily-life episodes reuse each of twelve target expressions four times across subjects',()=>{
 const worklife=serial.episodes.filter(a=>a.series.reviewGroup);
 assert.equal(worklife.length,12);
 const heads=new Set();
 for(let group=1;group<=3;group++){
  const related=worklife.filter(a=>a.series.reviewGroup===group);
  assert.equal(related.length,4);
  assert.ok(new Set(related.map(a=>a.category)).size>1);
  const sequence=related[0].phrases.map(p=>p.en);
  for(const a of related){
   assert.deepEqual(a.phrases.map(p=>p.en),sequence);
   for(const phrase of sequence)assert.ok(a.content.toLowerCase().includes(phrase));
  }
  sequence.forEach(head=>heads.add(head));
 }
 assert.equal(heads.size,12);
});
test('reading, listening, seeing an answer and legacy self-ratings create no vocabulary mastery',()=>{
 const s=state([{kind:'exposure',target:'serial-word:book',at:at(1)},{kind:'listen',target:'article:61',at:at(1)},output(1)]);
 const e=S.evidence(s,word,new Date(2026,10,20));assert.equal(e.recall,false);assert.equal(e.retained,false);assert.equal(e.ready,false);
 assert.equal(S.summary(C.empty(),V.words).ready,0);
});
test('retention requires successful tests spanning seven days, not merely waiting seven days',()=>{
 const early=state([recall(1),recall(2),recall(3),output(2),output(3,'work')]);
 assert.equal(S.evidence(early,word,new Date(2026,10,20)).ready,false);
 const complete=state([recall(1),recall(4),recall(11),output(4),output(11,'work')]);
 assert.equal(S.evidence(complete,word,new Date(2026,10,12)).ready,true);
 const sameDay=state([recall(1),recall(4),recall(11),output(11),output(11,'work')]);assert.equal(S.evidence(sameDay,word,new Date(2026,10,12)).ready,false);
 const sameContext=state([recall(1),recall(4),recall(11),output(4),output(11)]);assert.equal(S.evidence(sameContext,word,new Date(2026,10,12)).ready,false);
 const sameSentence=state([recall(1),recall(4),recall(11),output(4),output(11,'work','independent',output(4).text)]);assert.equal(S.evidence(sameSentence,word,new Date(2026,10,12)).ready,false);
});
test('a failed or assisted retrieval resets retention and an assisted output resets the output run',()=>{
 const events=[recall(1),recall(4),recall(11),output(4),output(11,'work')];
 for(const e of [recall(12,false),recall(12,true,true),output(12,'out','with-help')])assert.equal(S.evidence(state([...events,e]),word,new Date(2026,10,13)).ready,false);
 const future=state([recall(1),recall(4),recall(20),output(4),output(20,'work')]);assert.equal(S.evidence(future,word,new Date(2026,10,12)).ready,false);
});
test('production rejects empty, copied and substring-only responses, without pretending to grade semantics',()=>{
 assert.ok(S.outputError(word,''));assert.ok(S.outputError(word,word.example));assert.ok(S.outputError(word,'I put this bookcase near the window.'));
 assert.equal(S.outputError(word,'Could you bring my book tomorrow morning?'),'');
});
test('daily batches put due words before unseen words; episode completion needs nonempty production',()=>{
 const s=state([recall(1)]),batch=S.nextBatch(s,V.words);assert.equal(batch.length,10);assert.equal(batch[0].id,'book');
 const a=serial.episodes[0];assert.equal(S.episodeDone(state([{kind:'output',target:'article:61:retell',rating:'independent',text:'',at:at(1)}]),a),false);
 assert.equal(S.nextEpisode(C.empty(),serial.episodes).id,61);
});
test('large learning journals compress losslessly, fit the 5200-word goal, and remain portable in JSON backups',()=>{
 const events=[];for(const w of V.words){for(const d of [1,4,11])events.push({...recall(d),target:`serial-word:${w.id}`});for(const [d,c] of [[4,'home'],[11,'work']])events.push({...output(d,c),target:`serial-use:${w.id}:${c}`,text:`I can use ${w.head} in this example today.`});}
 const s=state(events),packed=C.serialize(s);assert.ok(packed.startsWith('srz1:'));assert.ok(packed.length*2<4*1024*1024,`Packed UTF-16 bytes ${packed.length*2}`);
 const storage=new Storage();storage.setItem(C.KEY,packed);assert.deepEqual(C.read(storage),s);
 const backup=C.backup(storage),destination=new Storage();C.importBackup(destination,backup);assert.deepEqual(C.read(destination),s);
 assert.equal(Object.keys(backup.learning.events).length,26000);
 const old=new Storage();old.setItem(C.KEY,JSON.stringify(state([recall(1)])));assert.equal(C.read(old).events['e-0'].correct,true);
});
