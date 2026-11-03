'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
require('../curriculum-data.js');require('../dialogues-data.js');
const C=require('../learning-core.js');
class Storage {
 constructor(values={}){this.map=new Map(Object.entries(values));}
 getItem(k){return this.map.has(k)?this.map.get(k):null;}
 setItem(k,v){this.map.set(k,String(v));}
 removeItem(k){this.map.delete(k);}
}
const recall=(day,correct=true,assisted=false,target='entry:verbs-core-01')=>({kind:'recall',target,correct,assisted,at:new Date(2026,10,Number(day),12).toISOString()});
const state=(...events)=>({version:1,events:Object.fromEntries(events.map((e,i)=>[`test-${i}`,e]))});
test('303 usage entries and all dialogue links are coherent',()=>{
 assert.equal(Curriculum.units.length,17);assert.equal(Curriculum.entries.length,303);assert.equal(Dialogues.length,40);
 assert.equal(new Set(Curriculum.entries.map(e=>e.id)).size,303);
 assert.equal(new Set(Dialogues.map(d=>d.id)).size,40);
 const units=new Set(Curriculum.units.map(u=>u.id));
 for(const e of Curriculum.entries){for(const key of ['head','pos','meaning','example','zh','usage','prompt'])assert.ok(e[key],`${e.id}: ${key}`);assert.equal((e.prompt.match(/____/g)||[]).length,1);assert.ok(e.example.includes(e.answers[0]));assert.equal(e.example,e.prompt.replace('____',e.answers[0]));}
 for(const d of Dialogues){assert.equal(d.turns.length,8);assert.equal(d.tasks.length,2);assert.ok(d.units.every(id=>units.has(id)));assert.ok(d.turns.every(t=>['A','B'].includes(t.role)&&t.en&&t.zh));assert.ok(d.tasks.every(t=>t.prompt&&t.sample));assert.equal(d.points.length,3);}
});
test('matching tolerates punctuation and smart apostrophes but not wrong numbers or negatives',()=>{
 assert.ok(C.matches('  I’m READY! ',["I'm ready."]));assert.ok(!C.matches('thirteen',['thirty']));assert.ok(!C.matches('I can go',['I cannot go']));assert.ok(!C.matches('I went',['I go']));assert.ok(C.matches('three point five',['three point five']));
});
test('schedule uses calendar dates, prevents same-day jumps and resets assisted or failed recall',()=>{
 const s=state(recall('02'),recall('02'));
 assert.equal(C.schedule(s,'entry:verbs-core-01',new Date(2026,10,2,23)).stage,1);
 assert.equal(C.dayKey(C.schedule(s,'entry:verbs-core-01',new Date(2026,10,2,23)).due),'2026-11-03');
 assert.ok(!C.schedule(s,'entry:verbs-core-01',new Date(2026,10,2,23)).dueNow);
 assert.ok(C.schedule(s,'entry:verbs-core-01',new Date(2026,10,3,23)).dueNow);
 const advanced=state(recall('02'),recall('03'));
 assert.equal(C.schedule(advanced,'entry:verbs-core-01',new Date(2026,10,3,23)).stage,2);
 assert.equal(C.dayKey(C.schedule(advanced,'entry:verbs-core-01',new Date(2026,10,3,23)).due),'2026-11-06');
 for(const event of [recall('03',false),recall('03',true,true)]){const r=C.schedule(state(recall('02'),event),'entry:verbs-core-01',new Date(2026,10,3,23));assert.equal(r.stage,0);assert.ok(r.dueNow);}
 assert.equal(C.schedule(state(recall('02')),'entry:verbs-core-02').attempts,0);
});
test('listening and self-assessment never create recall evidence',()=>{
 const s=state({kind:'listen',target:'entry:verbs-core-01',at:new Date().toISOString()},{kind:'output',target:'entry:verbs-core-01',text:'I can do it.',rating:'independent',at:new Date().toISOString()});
 assert.equal(C.schedule(s,'entry:verbs-core-01').correctDays,0);assert.equal(C.schedule(s,'entry:verbs-core-01').due,null);
});
test('legacy backups merge without dropping original article indexes, paragraph marks or word statuses',()=>{
 const storage=new Storage({sr_wordStatus:'{"take":"mastered"}',sr_completed:'[0,19]',sr_practiced:'{"0":[3]}'});
 C.importBackup(storage,{version:'1.0',wordStatuses:{take:'review',get:'unknown'},completedArticles:[0,2]});
 assert.deepEqual(JSON.parse(storage.getItem('sr_wordStatus')),{take:'mastered',get:'unknown'});
 assert.deepEqual(JSON.parse(storage.getItem('sr_completed')),[0,19,2]);
 C.importBackup(storage,{version:'3.0',practicedMap:{0:[1,3],19:[0]},streak:4,lastStudy:'2026-11-01'});
 assert.deepEqual(JSON.parse(storage.getItem('sr_practiced')),{'0':[3,1],'19':[0]});
 assert.equal(storage.getItem('sr_lastStudy'),'2026-11-01');
});
test('new backup round trip and duplicate imports are idempotent',()=>{
 const original=new Storage({[C.KEY]:JSON.stringify(state(recall('02'))),sr_wordStatus:'{"take":"mastered"}',sr_completed:'[19]',sr_lastStudy:'2026-11-02'});
 const data=C.backup(original),destination=new Storage();
 C.importBackup(destination,data);const first=[...destination.map];C.importBackup(destination,data);
 assert.deepEqual([...destination.map],first);assert.deepEqual(C.backup(destination).learning,data.learning);
 assert.equal(destination.getItem('sr_lastStudy'),'2026-11-02');
});
test('malformed, conflicting, oversized and prototype-bearing imports cause no writes',()=>{
 const storage=new Storage({[C.KEY]:JSON.stringify(state(recall('02'))),sr_wordStatus:'{"take":"review"}'});
 const before=[...storage.map];
 const invalid=[null,[],{}, {version:'9.0',wordStatuses:{}},{completedArticles:[-1],wordStatuses:{go:'mastered'}},{learning:{version:1,events:{bad:{kind:'recall',target:'x',correct:true,assisted:false,at:'invalid'}}},wordStatuses:{go:'mastered'}},JSON.parse('{"wordStatuses":{"__proto__":"mastered"}}'),{learning:state(recall('03'))}, {version:'4.0',format:'shadow-reading'}];
 for(const data of invalid){assert.throws(()=>C.importBackup(storage,data));assert.deepEqual([...storage.map],before);}
 const giant={version:1,events:Object.fromEntries(Array.from({length:50001},(_,i)=>[`e-${i}`,recall('02')]))};assert.throws(()=>C.validState(giant));
});
test('storage quota failure rolls back the multi-key import',()=>{
 const storage=new Storage({sr_wordStatus:'{"take":"review"}'}),originalSet=storage.setItem.bind(storage);let fail=true;
 storage.setItem=(k,v)=>{if(k==='sr_wordStatus'&&fail){fail=false;throw Error('quota');}originalSet(k,v);};
 const before=[...storage.map];assert.throws(()=>C.importBackup(storage,{wordStatuses:{go:'review'},completedArticles:[2]}));assert.deepEqual([...storage.map],before);
});
test('record merges current persisted state and keeps earlier attempts',async()=>{
 const storage=new Storage({[C.KEY]:JSON.stringify(state(recall('02')))});
 await Promise.all([C.record(storage,{kind:'listen',target:'dialogue:meet-01'}),C.record(storage,{kind:'recall',target:'entry:verbs-core-02',correct:false,assisted:false})]);
 assert.equal(Object.keys(C.read(storage).events).length,3);
});
test('local calendar arithmetic survives month, year and daylight saving boundaries',()=>{
 assert.equal(C.dayKey(C.addDays(new Date(2026,11,31,23,59),1)),'2027-01-01');
 assert.equal(C.dayKey(C.addDays(new Date(2026,10,1,23,59),1)),'2026-11-02');
});
