'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
require('../learning-core.js');
globalThis.LZString=require('../vendor/lz-string.js');
const sync=require('../progress-sync.js');
const pairing=require('../sync-pairing.js');
require('../vendor/qr-encoder.js');
const storage=()=>new class{
 constructor(){this.data=new Map();}
 getItem(k){return this.data.get(k)??null;}
 setItem(k,v){this.data.set(k,String(v));}
 removeItem(k){this.data.delete(k);}
};
const repo=()=>({
 value:null,revision:0,rejectNext:false,
 async verify(){},
 async read(){return this.value&&{data:structuredClone(this.value),sha:this.revision};},
 async write(data,sha){
  if(this.rejectNext){this.rejectNext=false;return false;}
  if(this.value&&sha!==this.revision)return false;
  this.value=structuredClone(data);this.revision++;return true;
 }
});

test('two independent devices share two completed lessons, writing and the resume location',async()=>{
 const desktop=storage(),phone=storage(),remote=repo();
 desktop.setItem('sr_practiced','{"60":[0,1,2,3],"61":[0,1,2,3]}');
 desktop.setItem('sr_article','61');
 await LearningCore.record(desktop,{kind:'output',target:'article:61:retell',text:'I asked my neighbor for help.',rating:'independent'});
 const first=await sync.exchange(desktop,remote,null);
 phone.setItem('sr_article','60');
 const second=await sync.exchange(phone,remote,null);
 assert.equal(second.changed,true);
 assert.deepEqual(sync.snapshot(phone),sync.snapshot(desktop));
 assert.equal(phone.getItem('sr_article'),'61');
 assert.equal(remote.revision,1);
 phone.setItem('sr_practiced','{"60":[0,1,2],"61":[0,1,2,3]}');
 desktop.setItem('sr_practiced','{"60":[0,1,2,3],"61":[0,1,2,3],"62":[0]}');
 await sync.exchange(phone,remote,second.base);
 remote.rejectNext=true;
 await sync.exchange(desktop,remote,first.base);
 assert.deepEqual(sync.snapshot(desktop).practicedMap,{60:[0,1,2],61:[0,1,2,3],62:[0]});
});

test('edits made during a network write stay local and sync on the next request',async()=>{
 const device=storage(),remote=repo();
 device.setItem('sr_practiced','{"60":[0]}');
 const original=remote.write;
 remote.write=async function(data,sha){
  device.setItem('sr_practiced','{"60":[0,1]}');
  return original.call(this,data,sha);
 };
 const first=await sync.exchange(device,remote,null);
 assert.deepEqual(sync.snapshot(device).practicedMap,{60:[0,1]});
 remote.write=original;
 await sync.exchange(device,remote,first.base);
 assert.deepEqual(remote.value.practicedMap,{60:[0,1]});
});

test('client refuses public repositories and uses authenticated repository-scoped requests',async()=>{
 const settings=sync.config({repo:'owner/Progress',token:'github_pat_test'});
 assert.deepEqual(settings,{repo:'owner/progress',token:'github_pat_test'});
 const remote=sync.client(settings,async(url,options)=>{
  assert.equal(url,'https://api.github.com/repos/owner/progress');
  assert.equal(options.headers.Authorization,'Bearer github_pat_test');
  assert.equal(options.redirect,'error');
  return Response.json({private:false,visibility:'public'});
 });
 await assert.rejects(()=>remote.verify(),/私有仓库/);
});

test('pairing links do not carry a readable token and reject wrong codes or expired links',async()=>{
 const settings=sync.config({repo:'https://github.com/Owner/Progress/',token:'github_pat_test_token'});
 const now=Date.now(),pair=await pairing.create(settings,now);
 assert.equal(pair.payload.includes(settings.token),false);
 assert.match(pair.code,/^\d{10}$/);
 assert.deepEqual(await pairing.open(pair.payload,pair.code,now),settings);
 const wrong=pair.code==='0000000000'?'1111111111':'0000000000';
 await assert.rejects(()=>pairing.open(pair.payload,wrong,now),/不匹配/);
 await assert.rejects(()=>pairing.open(pair.payload,pair.code,pair.expires),/过期/);
 const qr=encodePairingQR('https://example.com/shadow-reading/index.html#pair='+pair.payload);
 assert.ok(qr.length>21&&qr.every(row=>row.length===qr.length));
});
