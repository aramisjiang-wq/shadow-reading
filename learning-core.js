(function (root) {
'use strict';
const KEY = 'sr_learning_v1';
const LEGACY = ['sr_wordStatus','sr_completed','sr_practiced','sr_streak','sr_lastStudy'];
const KINDS = new Set(['recall','listen','shadow','output']);
const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
const empty = () => ({version: 1, events: {}});
const eventIndexes = new WeakMap();
function validState(value) {
  if (!plain(value) || value.version !== 1 || !plain(value.events) || Object.keys(value.events).length > 50000) throw Error('学习记录格式不正确。');
  for (const [id, e] of Object.entries(value.events)) {
    if (!/^[\w-]{1,100}$/.test(id) || !plain(e) || !KINDS.has(e.kind) || typeof e.target !== 'string' || !/^[\w:-]{1,140}$/.test(e.target) || typeof e.at !== 'string' || !Number.isFinite(Date.parse(e.at))) throw Error('学习记录包含无效条目。');
    if (e.kind === 'recall' && (typeof e.correct !== 'boolean' || typeof e.assisted !== 'boolean')) throw Error('回忆记录格式不正确。');
    if (e.kind === 'output' && (!['again','with-help','independent'].includes(e.rating) || typeof e.text !== 'string' || e.text.length > 10000)) throw Error('表达记录格式不正确。');
    if (e.kind === 'shadow' && !['again','with-help','independent'].includes(e.rating)) throw Error('跟读记录格式不正确。');
  }
  return value;
}
function read(storage) {
  const raw = storage.getItem(KEY);
  return raw === null ? empty() : validState(JSON.parse(raw));
}
function merge(a, b) {
  validState(a); validState(b);
  const events = {...a.events};
  for (const [id,e] of Object.entries(b.events)) {
    if (events[id] && JSON.stringify(events[id]) !== JSON.stringify(e)) throw Error('备份中有冲突记录，未修改现有数据。');
    events[id] = e;
  }
  return validState({version: 1, events});
}
function dayKey(date = new Date()) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function addDays(date, n) {
  const d = new Date(date); d.setDate(d.getDate()+n); d.setHours(0,0,0,0); return d;
}
function eventsFor(state, target, kind) {
  if (!eventIndexes.has(state)) {
    const index = new Map();
    for (const e of Object.values(state.events)) {
      for (const key of [e.target,`${e.target}|${e.kind}`]) {
        if (!index.has(key)) index.set(key,[]);
        index.get(key).push(e);
      }
    }
    for (const events of index.values()) events.sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
    eventIndexes.set(state,index);
  }
  return eventIndexes.get(state).get(kind ? `${target}|${kind}` : target) || [];
}
function schedule(state, target, now = new Date()) {
  const events = eventsFor(state,target,'recall').filter(e => Date.parse(e.at)<=+new Date(now));
  let stage = 0, due = null, advancedDay = null, correctDays = new Set();
  for (const e of events) {
    const day = dayKey(e.at);
    if (e.correct && !e.assisted) {
      correctDays.add(day);
      if (advancedDay !== day) { stage = Math.min(5, stage+1); advancedDay = day; }
      due = addDays(e.at,[0,1,3,7,14,30][stage]);
    } else {
      stage = 0; due = new Date(e.at); advancedDay = day;
    }
  }
  return {stage, due, dueNow: due !== null && +due <= +new Date(now), attempts: events.length, correctDays: correctDays.size};
}
function normalize(s) {
  return String(s).normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?,;:"“”]/g,'').replace(/\s+/g,' ').trim();
}
function matches(input, answers) { return answers.some(a => normalize(input) === normalize(a)); }
function validateLegacy(data) {
  if (!plain(data)) throw Error('请选择有效的学习备份。');
  if (data.wordStatuses !== undefined && (!plain(data.wordStatuses) || Object.entries(data.wordStatuses).some(([k,v])=> !/^[a-z'-]{1,80}$/.test(k) || !['mastered','review','new','unknown'].includes(v)))) throw Error('旧单词记录格式不正确。');
  if (data.completedArticles !== undefined && (!Array.isArray(data.completedArticles) || data.completedArticles.some(n=>!Number.isInteger(n)||n<0||n>10000))) throw Error('旧文章记录格式不正确。');
  if (data.practicedMap !== undefined && (!plain(data.practicedMap) || Object.entries(data.practicedMap).some(([k,v])=>!/^\d+$/.test(k)||!Array.isArray(v)||v.some(n=>!Number.isInteger(n)||n<0||n>10000)))) throw Error('旧段落记录格式不正确。');
  if (data.streak !== undefined && (!Number.isInteger(data.streak)||data.streak<0)) throw Error('连续学习记录格式不正确。');
  if (data.lastStudy !== undefined && (typeof data.lastStudy !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.lastStudy) || !Number.isFinite(Date.parse(data.lastStudy)))) throw Error('学习日期格式不正确。');
  return data;
}
function backup(storage) {
  const data = {format:'shadow-reading', version:'4.0', learning:read(storage), exportDate:new Date().toISOString()};
  const map = {sr_wordStatus:'wordStatuses',sr_completed:'completedArticles',sr_practiced:'practicedMap',sr_streak:'streak'};
  for (const [key, field] of Object.entries(map)) {
    const raw = storage.getItem(key); if (raw !== null) data[field] = JSON.parse(raw);
  }
  const last = storage.getItem('sr_lastStudy'); if (last !== null) data.lastStudy = last;
  validateLegacy(data); return data;
}
function importBackup(storage, data) {
  validateLegacy(data);
  if (data.version && !['1.0','2.0','3.0','4.0'].includes(data.version)) throw Error('此备份版本暂不支持。');
  if (!data.learning && !data.wordStatuses && !data.completedArticles && !data.practicedMap) throw Error('备份中没有可识别的学习记录。');
  if (data.version === '4.0' && (data.format !== 'shadow-reading' || !data.learning)) throw Error('新版备份内容不完整。');
  const next = data.learning ? merge(read(storage),validState(data.learning)) : read(storage);
  const writes = {[KEY]:JSON.stringify(next)};
  if (data.wordStatuses) {
    const old = JSON.parse(storage.getItem('sr_wordStatus')||'{}');
    validateLegacy({wordStatuses:old});
    // Existing self-assessments win; importing an old backup never downgrades them.
    writes.sr_wordStatus = JSON.stringify({...data.wordStatuses,...old});
  }
  if (data.completedArticles) {
    const old = JSON.parse(storage.getItem('sr_completed')||'[]'); validateLegacy({completedArticles:old});
    writes.sr_completed = JSON.stringify([...new Set([...old,...data.completedArticles])]);
  }
  if (data.practicedMap) {
    const old = JSON.parse(storage.getItem('sr_practiced')||'{}'); validateLegacy({practicedMap:old});
    const combined = {...old};
    for (const [k,v] of Object.entries(data.practicedMap)) combined[k]=[...new Set([...(old[k]||[]),...v])];
    writes.sr_practiced = JSON.stringify(combined);
  }
  if (data.streak !== undefined) writes.sr_streak = String(Math.max(Number(storage.getItem('sr_streak'))||0,data.streak));
  if (data.lastStudy !== undefined) writes.sr_lastStudy = [storage.getItem('sr_lastStudy')||'',data.lastStudy].sort().at(-1);
  const previous = Object.fromEntries(Object.keys(writes).map(k=>[k,storage.getItem(k)]));
  try { for (const [k,v] of Object.entries(writes)) storage.setItem(k,v); }
  catch (e) { for (const [k,v] of Object.entries(previous)) { try { v===null?storage.removeItem(k):storage.setItem(k,v); } catch {} } throw Error('保存失败，可能是浏览器存储已满。请先导出现有记录。'); }
  return next;
}
async function locked(fn) {
  if (root.navigator?.locks) return root.navigator.locks.request('sr-learning-write',fn);
  return fn();
}
async function record(storage, e) {
  return locked(() => {
    const state = read(storage);
    const id = root.crypto?.randomUUID ? root.crypto.randomUUID() : `e-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const next = validState({version:1,events:{...state.events,[id]:{...e,at:new Date().toISOString()}}});
    storage.setItem(KEY,JSON.stringify(next)); return next;
  });
}
root.LearningCore = {KEY,LEGACY,empty,validState,read,merge,dayKey,addDays,eventsFor,schedule,normalize,matches,backup,importBackup,locked,record};
if (typeof module !== 'undefined') module.exports = root.LearningCore;
})(typeof window !== 'undefined' ? window : globalThis);
