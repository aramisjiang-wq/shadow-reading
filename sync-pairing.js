(function(root){
'use strict';
const ttl=5*60*1000;
const encoder=new TextEncoder();
const decoder=new TextDecoder();
function encode(bytes){
 return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function decode(text){
 return Uint8Array.from(atob(text.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
}
async function keyFor(code,salt){
 const material=await root.crypto.subtle.importKey('raw',encoder.encode(code),'PBKDF2',false,['deriveKey']);
 return root.crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:210000,hash:'SHA-256'},material,
  {name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
async function create(settings,now=Date.now()){
 const code=Array.from(root.crypto.getRandomValues(new Uint32Array(2)),n=>String(Math.floor(n/2**32*100000)).padStart(5,'0')).join('');
 const salt=root.crypto.getRandomValues(new Uint8Array(16));
 const nonce=root.crypto.getRandomValues(new Uint8Array(12));
 const expires=now+ttl;
 const key=await keyFor(code,salt);
 const data=encoder.encode(JSON.stringify({settings,expires}));
 const encrypted=new Uint8Array(await root.crypto.subtle.encrypt({name:'AES-GCM',iv:nonce},key,data));
 return {code,expires,payload:[encode(salt),encode(nonce),encode(encrypted)].join('.')};
}
async function open(payload,entered,now=Date.now()){
 const code=entered.replace(/\s/g,'');
 if(!/^\d{10}$/.test(code))throw Error('请填写电脑上显示的 10 位验证码。');
 if(!/^[\w-]{22}\.[\w-]{16}\.[\w-]{24,1800}$/.test(payload))throw Error('配对链接无效，请重新扫码。');
 const [salt,nonce,encrypted]=payload.split('.').map(decode);
 let data;
 try{
  const key=await keyFor(code,salt);
  const decrypted=await root.crypto.subtle.decrypt({name:'AES-GCM',iv:nonce},key,encrypted);
  data=JSON.parse(decoder.decode(decrypted));
 }catch{
  throw Error('验证码不匹配。请核对电脑上显示的号码。');
 }
 if(!Number.isFinite(data.expires)||data.expires<=now||data.expires>now+ttl+60000)throw Error('二维码已过期，请在电脑上重新生成。');
 return data.settings;
}
root.SyncPairing={create,open};
if(typeof module!=='undefined')module.exports=root.SyncPairing;
})(globalThis);
