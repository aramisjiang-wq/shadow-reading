/* Evidence rules shared by the serial reader, vocabulary practice and tests. */
(function(root){
'use strict';
const contexts=[{id:'home',label:'在家与邻里',prompt:'用这个词，写一句你会对室友、家人或邻居说的话，包含一个具体行动或问题。'},
{id:'out',label:'出门办事',prompt:'换到购物、出行或预约场景，用这个词向工作人员提出一个具体请求或解释。'},
{id:'work',label:'工作与朋友',prompt:'换到工作或朋友计划中，用这个词说明进度、感受或一个选择。'}];
function tokens(text){return String(text).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g)||[];}
function forms(word){return new Set([word.id,...word.forms,word.surface]);}
function containsWord(word,text){const set=forms(word);return tokens(text).some(t=>set.has(t));}
function outputError(word,text){
 if(tokens(text).length<2)return '请写下一句你刚才说的话。';
 if(!containsWord(word,text))return '这句还没有包含目标词或词库中已记录的词形，请检查后再保存。';
 if(root.LearningCore.normalize(text)===root.LearningCore.normalize(word.example))return '请换人物、时间或条件，用自己的话表达，不要直接复制例句。';
 return '';
}
// Each row uses one meaning in three different situations and supplies a model for each.
const speakingCards={
 book:[['朋友问你要带什么出门。告诉他你想带一本书。','你在书店里，想问店员这本书多少钱。','你把一本书落在会议室了。请同事帮你带回来。'],['I want to take a book with me.', 'How much is this book?', 'Could you bring my book back?'],'这里的 book 指书。bring a book（带一本书来）；read a book（读书）。'],
 key:[['你出了门，发现钥匙还在屋里。请和室友说明情况。','你退房时，想问前台钥匙该交到哪里。','同事要打开会议室，你告诉他钥匙在桌上。'],['I left my key inside.', 'Where should I leave the key?', 'The key is on the table.'],'leave my key inside（把钥匙落在里面）；the key to the room（房间的钥匙）。'],
 address:[['邻居给你寄东西。你想问他有没有你的新地址。','司机要确认目的地。你想请他核对地址。','同事要去新办公室。请他发给你准确地址。'],['Do you have my new address?', 'Could you check the address for me?', 'Could you send me the exact address?'],'send / check / confirm the address。'],
 borrow:[['你想借邻居的锅，今晚就还。','在柜台填表时没带笔，想借一支。','明天开会要用设备，想借同事的充电器。'],['Could I borrow your pot? I’ll bring it back tonight.', 'Could I borrow a pen?', 'Could I borrow your charger?'],'borrow something from someone 表示借入。把东西借给别人用 lend。'],
 confirm:[['邻居答应周六来帮忙。你想再确认具体时间。','你改了预订，想请店员确认新日期。','你想请同事邮件确认最终人数。'],['Could you confirm what time you’ll come on Saturday?', 'Could you confirm the new date?', 'Could you confirm the final headcount by email?'],'confirm the date / details；confirm by email。'],
 receipt:[['家人之后可能要退货。请他留好小票。','你在收银台付完款，想索要小票。','你要报销，但找不到那张收据。向同事说明。'],['Please keep the receipt in case we need to return it.', 'Could I have a receipt, please?', 'I can’t find the receipt for this expense.'],'ask for a receipt（要收据）；keep the receipt（留好小票）。'],
 refund:[['朋友替你买了票，活动取消了，你提议申请退款。','网购少发一件。请客服退还缺件的钱。','客户多付了一次。告诉同事你会退回重复付款。'],['We should ask for a refund for the tickets.', 'Could I get a refund for the missing item?', 'I’ll refund the duplicate payment.'],'get / ask for a refund；refund the payment。'],
 available:[['邻居想约时间。告诉他你周五晚上有空。','你想问店员明天早上有没有空位。','同事在排班。问他下午两点是否有空。'],['I’m available on Friday evening.', 'Is there a table available tomorrow morning?', 'Are you available at two?'],'人有空或物品可用都可用 available。时间常用 at / on / for 接在后面。'],
 help:[['邻居正搬一个重箱子。你想主动问需不需要帮忙。','你在车站找不到站台。请工作人员帮你。','同事卡在报表上。你想问要不要帮他核对数字。'],['Would you like some help with that box?', 'Could you help me find the platform?', 'Do you want me to help you check the numbers?'],'help someone do something；也可以说 help someone with something。'],
 order:[['朋友怕太晚没饭。告诉他你打算先点些吃的。','在餐厅里，你想点一份汤。','午餐会上你负责餐食。告诉同事你已经给大家点餐了。'],['I’ll order some food now.', 'I’d like to order some soup.', 'I’ve already ordered lunch for everyone.'],'order food / a drink；order something for someone。']
};
function speakingCard(word,context){
 if(!Object.hasOwn(speakingCards,word.id))return null;
 const card=speakingCards[word.id];
 const [prompts,examples,note]=card;
 const index=contexts.findIndex(c=>c.id===context);
 return {prompt:prompts[index],example:examples[index],note};
}
function evidence(state,word,now=new Date()){
 const C=root.LearningCore,target=`serial-word:${word.id}`,s=C.schedule(state,target,now);
 const outputs=contexts.flatMap(c=>C.eventsFor(state,`serial-use:${word.id}:${c.id}`,'output').map(e=>({...e,context:c.id}))).filter(e=>Date.parse(e.at)<=+new Date(now)).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
 const lastReset=outputs.filter(e=>e.rating!=='independent').at(-1)?.at;
 const independent=outputs.filter(e=>e.rating==='independent'&&(!lastReset||Date.parse(e.at)>Date.parse(lastReset))&&!outputError(word,e.text));
 const days=new Set(independent.map(e=>C.dayKey(e.at))),usedContexts=new Set(independent.map(e=>e.context));
 const recall=C.eventsFor(state,target,'recall').filter(e=>Date.parse(e.at)<=+new Date(now));
 // A reset removes previous recall evidence from the retained run.
 const reset=recall.findLastIndex(e=>!e.correct||e.assisted);
 const run=recall.slice(reset+1).filter(e=>e.correct&&!e.assisted);
 const span=run.length?(Date.parse(run.at(-1).at)-Date.parse(run[0].at))/86400000:0;
 const retained=s.stage>=3&&span>=7;
 return {started:s.attempts>0||outputs.length>0||C.eventsFor(state,target,'exposure').length>0,recall:s.correctDays>0,retained,produced:independent.length>0,
  ready:retained&&days.size>=2&&usedContexts.size>=2&&new Set(independent.map(e=>C.normalize(e.text))).size>=2,outputDays:days.size,contexts:usedContexts.size,schedule:s};
}
const cache=new WeakMap();
function summary(state,words,now=new Date()){
 const day=root.LearningCore.dayKey(now);const saved=cache.get(state);
 if(saved?.day===day&&saved.words===words)return saved.result;
 const result={total:words.length,started:0,recall:0,retained:0,produced:0,ready:0,due:[]};
 for(const word of words){const e=evidence(state,word,now);for(const key of ['started','recall','retained','produced','ready'])if(e[key])result[key]++;if(e.schedule.dueNow)result.due.push(word);}
 result.due.sort((a,b)=>+evidence(state,a,now).schedule.due-+evidence(state,b,now).schedule.due);
 cache.set(state,{day,words,result});return result;
}
function nextBatch(state,words,size=10){
 const due=summary(state,words).due;
 const C=root.LearningCore;
 const today=C.dayKey();
 const unseen=words.filter(w=>!evidence(state,w).started&&!C.eventsFor(state,`serial-word:${w.id}`,'exposure').some(e=>C.dayKey(e.at)===today));
 const dueIds=new Set(due.map(w=>w.id));
 const needsRecall=words.filter(w=>{
  const e=evidence(state,w);
  return e.started&&!e.schedule.attempts&&!C.eventsFor(state,`serial-word:${w.id}`,'exposure').some(x=>C.dayKey(x.at)===today);
 });
 const needsOutput=words.filter(w=>{const e=evidence(state,w);return e.recall&&!e.ready&&!dueIds.has(w.id);});
 unseen.sort((a,b)=>Number(Object.hasOwn(speakingCards,b.id))-Number(Object.hasOwn(speakingCards,a.id)));
 return [...due,...needsRecall,...unseen,...needsOutput].slice(0,size);
}
function inEpisode(article,words){return words.filter(w=>containsWord(w,article.content));}
function episodeDone(state,article){
 return ['retell','transfer'].every(k=>root.LearningCore.eventsFor(state,`article:${article.id}:${k}`,'output').some(e=>e.rating==='independent'&&tokens(e.text).length>=5));
}
function nextEpisode(state,episodes){return episodes.find(a=>!episodeDone(state,a))||episodes.at(-1);}
root.SeriesCore={contexts,tokens,forms,containsWord,outputError,speakingCard,evidence,summary,nextBatch,inEpisode,episodeDone,nextEpisode};
if(typeof module!=='undefined')module.exports=root.SeriesCore;
})(typeof window!=='undefined'?window:globalThis);
