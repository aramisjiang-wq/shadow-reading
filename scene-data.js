/* Original speaking prompts, organized by the situation that brings the learner here. */
(function (root) {
'use strict';
const groups = [
  ['home', '居家与家务', [
    ['早晨出门', '告诉室友你几点出门，提醒他离开时锁门。', 'I’m leaving at eight. Could you lock the door when you leave?', 'daily-01'],
    ['分配家务', '你负责洗碗，问对方今天能不能倒垃圾。', 'I’ll do the dishes. Could you take out the trash today?', 'daily-02'],
    ['借用工具', '向邻居借螺丝刀，承诺今晚归还。', 'Could I borrow your screwdriver? I’ll bring it back this evening.', 'daily-03'],
    ['家里来客人', '告诉客人怎么进楼，到了按哪个门铃。', 'Use the side entrance and buzz apartment six. I’ll let you in.']
  ]],
  ['housing', '租房与社区', [
    ['看房问租金', '问月租和押金，并确认水电费是否包含在内。', 'What’s the monthly rent, and how much is the deposit? Are utilities included?'],
    ['搬家交接', '约交钥匙，确认在哪里见面。', 'Could we meet at the apartment at five so I can pick up the keys?', 61],
    ['联系物业报修', '告诉物业厨房水管从昨晚开始漏水，问什么时候能来。', 'The kitchen pipe has been leaking since last night. When can someone come by?', 66],
    ['跟邻居说噪音', '说明昨晚听到音乐，请邻居晚上十点后调小。', 'I could hear the music last night. Could you turn it down after ten?']
  ]],
  ['food', '吃饭与做饭', [
    ['咖啡店打包', '点一杯小杯燕麦奶拿铁，说明要带走。', 'Could I get a small latte with oat milk to go?', 'food-01'],
    ['点餐确认过敏原', '说明你对花生过敏，问厨房能否确认酱料成分。', 'I’m allergic to peanuts. Could you check with the kitchen whether the sauce contains any?', 'food-02'],
    ['市场买菜', '买半公斤番茄，确认按公斤还是按盒计价。', 'Could I get half a kilo of tomatoes? Is that price per kilo or per box?', 'food-03'],
    ['外卖送错', '说明你点的是鸡肉饭，请对方补送正确餐品。', 'I ordered the chicken and rice, but I got noodles. Could you send the correct order?']
  ]],
  ['shopping', '购物、快递与售后', [
    ['试穿换尺码', '说明这件太紧，问大一码能否试穿。', 'This one is a little tight. Could I try the next size up?', 'food-04'],
    ['退货或换货', '说明产品打不开，出示小票并问能不能退款。', 'This won’t turn on. I have the receipt. Could I get a refund?', 67],
    ['网购少送一件', '用订单号说明缺件，请客服补发。', 'Order 4821 is missing a water bottle. Could you send it separately?', 88],
    ['快递显示签收却没收到', '请客服核对签收地址和放置地点。', 'It says my package was delivered, but I can’t find it. Could you check the address and where it was left?', 87]
  ]],
  ['transport', '通勤与本地交通', [
    ['问路和换乘', '问这班公交是否到市中心，确认在哪站换乘。', 'Does this bus go downtown, or do I need to change? Which stop should I get off at?', 'travel-01'],
    ['买票核对时间', '买一张九点的车票，问是否需要换乘。', 'I’d like a ticket for the nine o’clock train. Is it direct?', 'travel-02'],
    ['坐反方向了', '问下一站能不能坐回去，再给同事发消息说明迟到。', 'Can I catch a bus back the other way at the next stop? I’ll be about ten minutes late.', 63],
    ['叫车找不到司机', '告诉司机你在车站东门，问他停在哪里。', 'I’m at the east entrance of the station. Where are you parked?', 'travel-04']
  ]],
  ['driving', '开车、停车与租车', [
    ['确认停车规则', '问能停多久、在哪里付费。', 'How long can I park here, and where do I pay?'],
    ['租车取车', '确认还车地点和时间，问是否需要加满油。', 'Where and when do I return the car? Does it need to have a full tank?'],
    ['开车途中故障', '向道路救援说明情况、道路方向和最近的出口。', 'My car won’t start. I’m on the northbound side, just past exit twelve.'],
    ['轻微碰撞后交换信息', '确认对方是否受伤，提出交换联系方式和保险信息。', 'Are you hurt? Could we exchange contact and insurance information?']
  ]],
  ['travel', '旅行与住宿', [
    ['机场改签', '说明航班取消了，问今天是否还能到目的地。', 'My flight was canceled. Is there another flight that gets me there today?', 'travel-03'],
    ['行李没到', '说明航班号、行李颜色，并出示行李牌。', 'My black suitcase didn’t arrive on flight 218. Here’s my baggage tag.'],
    ['酒店入住与退房', '报名字办理入住，确认退房时间。', 'I have a reservation under Chen. What time is checkout?', 'stay-02'],
    ['酒店换房', '说明房间烟味重，问能否换一间。', 'There’s a strong smell of smoke in my room. Could I move to another room?', 'stay-04']
  ]],
  ['health', '就医与健康管理', [
    ['预约或改约就诊', '把周二的预约改到周四下午，复述新时间。', 'Could I move my Tuesday appointment to Thursday afternoon? Just to confirm, that’s Thursday at three?', 'health-02'],
    ['当面描述症状', '说明喉咙痛从周一开始，今天吞咽更疼。', 'My throat has been sore since Monday, and it hurts more when I swallow today.', 'health-01'],
    ['药房核对说明', '请药师把用量和频率写下来。', 'Could you write down how much to take and how often?'],
    ['看牙后问复诊', '问牙医何时复诊，以及怎样联系诊所。', 'When should I come back for a follow-up? What’s the best number to call?']
  ]],
  ['fitness', '运动与户外', [
    ['约朋友跑步', '约周六早上跑三公里，说明集合点。', 'Want to run three kilometers on Saturday morning? Let’s meet by the park gate.', 'health-03'],
    ['下雨改去室内', '提出八点看天气，大雨就改去健身房。', 'Let’s check the weather at eight. If it’s raining hard, we can go to the gym instead.', 109],
    ['健身房问器械', '问对方还有几组，能否轮流使用。', 'How many sets do you have left? Do you mind if we take turns?'],
    ['队友走散了', '发送你最后经过的地点，确认新的集合点。', 'I just passed the bridge. Can we meet at the trail entrance?']
  ]],
  ['relationships', '家人、伴侣与朋友', [
    ['邀请朋友吃饭', '发出邀请，确认时间和人数。', 'Would you like to come over for dinner on Saturday? How many of you can make it?', 'social-01'],
    ['婉拒并改约', '拒绝今晚邀约，提议周五见。', 'I can’t make it tonight, but I’d love to catch up on Friday.', 'social-02'],
    ['协调照护安排', '你今天无法接家人，请对方先去，告知到达位置。', 'I can’t pick Dad up today. Could you meet him at the main entrance at four?'],
    ['倾听与安慰', '回应家人的担忧，问他想聊聊还是想有人陪。', 'That sounds hard. Do you want to talk about it, or would you rather just have some company?', 'health-04']
  ]],
  ['parenting', '育儿与照护', [
    ['了解托育安排', '问托育时间、费用和最早入托日期。', 'What are your hours and fees, and what’s the earliest date my child could start?'],
    ['通知学校换人接孩子', '告诉老师今天由孩子的姑姑来接，问接人需要出示什么。', 'My child’s aunt is picking him up today. What does she need to show when she arrives?'],
    ['和老师聊孩子近况', '问孩子最近在课堂上怎么样，自己能在家做什么。', 'How has she been doing in class lately? Is there anything we can do at home to help?'],
    ['交接长辈陪诊', '告知几点接人、去哪家诊所、需要带什么。', 'Could you pick Mom up at two and take her to the clinic on Oak Street? Please bring her appointment letter.']
  ]],
  ['social', '认识人、社交与休闲', [
    ['第一次见面', '介绍自己，问对方怎么认识活动组织者。', 'Hi, I’m Wei. How do you know the organizer?', 'meet-01'],
    ['没听清名字或数字', '请对方重复，确认是十三还是三十。', 'Sorry, did you say thirteen or thirty? Could you say that again?', 'meet-02'],
    ['活动报名和候补', '询问活动是否满员，能否加入候补名单。', 'Is the workshop full? If it is, could you put me on the waiting list?', 70],
    ['讲一段自己的经历', '向朋友讲一件旅行插曲，交代发生了什么和结果。', 'We missed the last train, so we shared a taxi with another couple and got back just before midnight.', 'social-03']
  ]],
  ['culture', '看演出、逛展与参加活动', [
    ['买演出票选座', '问有没有两张连座，说明预算。', 'Do you have two seats together for tonight? We’d like to spend no more than forty each.'],
    ['在展馆租导览', '问有没有英文导览、从哪里开始。', 'Do you have an audio guide in English? Where should I start?'],
    ['活动取消申请退款', '说明活动取消，核对退款方式和到账时间。', 'Since the event was canceled, how will I get my refund? When should I expect it?'],
    ['报名做志愿者', '告知周六上午有空，问需要做什么、几点到。', 'I’m available on Saturday morning. What would I be doing, and what time should I arrive?']
  ]],
  ['milestones', '庆祝、道歉与人生变化', [
    ['祝贺朋友的新进展', '祝贺朋友找到新工作，问何时入职。', 'Congratulations on the new job! When do you start?'],
    ['忘了约定后道歉', '为错过约定道歉，提出新的时间。', 'I’m sorry I missed our meetup. Could I make it up to you on Saturday?'],
    ['给丧亲的朋友发消息', '表达关心，提出一项具体的帮忙。', 'I’m so sorry for your loss. I can bring dinner over this week if that would help.'],
    ['告知即将搬走', '告诉朋友下个月搬走，提议离开前见一面。', 'I’m moving next month. Could we get together before I leave?']
  ]],
  ['work', '上班与团队协作', [
    ['约会议、改时间、核对时区', '给异地同事两个时段，说明所用时区。', 'Could we meet at ten or two tomorrow, Shanghai time?', 'work-01'],
    ['汇报进展和阻塞', '说清已完成什么、卡在哪里、需要谁帮忙。', 'The draft is ready, but I’m still waiting for the numbers. Could you send them by noon?', 'work-02'],
    ['协商范围和截止时间', '解释今天能完成什么，提议剩余部分周一处理。', 'I can finish the checkout copy today. Can we leave the reminder feature for Monday?', 108],
    ['上线异常和交接', '让同事先暂停扩大上线，并确认谁负责排查。', 'Let’s hold off on rolling this out to more shops. Can you check the error logs?', 112]
  ]],
  ['customers', '客户、业务与产品沟通', [
    ['追问用户反馈', '请用户复述最后一次操作，确认问题出现前点了哪里。', 'What were you trying to do the last time this happened, and what did you tap right before it?', 104],
    ['处理投诉', '复述客户的问题，承诺一个明确的回复时间。', 'So you were billed twice for the same order. I’ll check what happened and get back to you by four.', 80],
    ['报价和交付', '确认报价是否含税，交付日期是否写进报价。', 'Does the quote include tax, and does it specify the delivery date?', 'money-04'],
    ['汇报结果与下一步', '用两句话告诉客户试用结果和下一步。', 'Two shops tried the new screen and both could find old bookings. Next, we’ll test it with five more shops.', 114]
  ]],
  ['career', '求职与职业变化', [
    ['投递后跟进', '向招聘方确认是否收到材料，并问下一步。', 'I’m following up on my application. Could you confirm you received it and let me know what happens next?'],
    ['安排或改期面试', '说明时间冲突，给两个替代时段。', 'I have a conflict at that time. Would Tuesday at ten or Wednesday at two work instead?'],
    ['面试讲项目经历', '说清遇到的问题、你采取的行动和结果。', 'Customers couldn’t find past orders, so I worked with support to identify where people got stuck. We changed the labels and tested them with two stores.'],
    ['核对录用条件', '确认工作地点、开始日期、是否有试用期。', 'Could you confirm the work location, the start date, and whether there’s a probation period?', 100]
  ]],
  ['study', '上学、培训与自学', [
    ['报名课程', '问先修要求、上课时间和补课安排。', 'Are there any prerequisites? What time does class start, and what happens if I miss one?'],
    ['跟老师请假', '告诉老师孩子今天缺课，问作业怎么补。', 'My child won’t be in class today. Could you let me know what work they should make up?'],
    ['请求具体反馈', '请老师指出哪里说不清楚，给你一次重说机会。', 'Could you point out where I lost you? I’d like to try explaining it again.', 'learn-02'],
    ['制定学习安排', '告诉搭档每周能学几次，约定如何互相检查。', 'I can practice twice a week. Can we meet on Fridays to go over what we learned?', 'learn-01']
  ]],
  ['payments', '付款、银行与保险', [
    ['核对账单与重复收费', '指出同一笔收费出现两次，请对方核对。', 'This charge appears twice on my bill. Could you check whether I was charged twice?', 111],
    ['和朋友分账', '说明总额六十、三人平摊、每人二十。', 'The total came to sixty. If we split it three ways, that’s twenty each.', 64],
    ['银行卡遗失', '向银行说明卡找不到了，请冻结并询问补卡流程。', 'I’ve lost my card. Could you freeze it and tell me how to get a replacement?'],
    ['询问保险理赔材料', '问需要哪些文件、提交期限和查询方式。', 'What documents do I need to submit, what’s the deadline, and how can I track my claim?']
  ]],
  ['digital', '数码、网络与客服', [
    ['登录失败', '说明已重置密码却仍无法登录，报出页面提示。', 'I reset my password, but I still can’t sign in. The page says my account is locked.', 'learn-03'],
    ['停网报修', '告知什么时候断网、重启过路由器，并问恢复时间。', 'My internet has been down since noon. I restarted the router. Do you know when service will be back?'],
    ['取消订阅或降档', '确认什么时候生效、下个月是否还收费。', 'If I switch to the cheaper plan today, when does it start? Will I still be charged the old rate next month?', 113],
    ['收到可疑链接', '通过原有联系方式询问对方是否真的发过消息。', 'I got a text claiming to be from you. Can you confirm whether you sent it?', 'learn-04']
  ]],
  ['appointments', '理发、维修与本地服务', [
    ['理发确认长度', '请理发师只修剪一点，动手前先比一下长度。', 'Just a trim, please. Could you show me how much you’re going to take off?'],
    ['修手机拿报价', '问更换屏幕要多少钱、多久能取。', 'How much would it cost to replace the screen, and when could I pick it up?'],
    ['洗衣店说明污渍', '指出衣服上的咖啡渍，问周五之前能否取。', 'There’s a coffee stain on the sleeve. Could I pick this up by Friday?'],
    ['改约上门服务', '说明上午不在家，问能否改到两点以后。', 'I won’t be home in the morning. Could the technician come after two?']
  ]],
  ['pets', '养宠与动物照护', [
    ['预约宠物看诊', '说明猫从昨天开始不吃东西，问最早何时能看。', 'My cat hasn’t eaten since yesterday. What’s the earliest appointment available?'],
    ['交接宠物照护', '告诉朋友狗几点吃饭，牵引绳放在哪里。', 'He eats at six. His leash is on the hook next to the door.'],
    ['询问宠物能否入内', '问能不能带狗进入，是否必须用牵引绳。', 'Are dogs allowed inside? Do they need to be on a leash?'],
    ['宠物走失求助', '描述走失宠物的外观和最后出现的位置。', 'My dog is missing. She’s small and brown, with a blue collar. I last saw her near the park gate.']
  ]],
  ['services', '公共办事、证件与搬迁', [
    ['预约办理证件', '问最早的预约、要带的文件和是否需要复印件。', 'When is the earliest appointment? What documents should I bring, and do I need copies?'],
    ['登记新地址', '给出搬家日期和新地址，确认何时更新。', 'I moved on the first of June. Could you update my address and tell me when the change will take effect?'],
    ['邮寄文件并查询', '问送达时间、追踪号和签收证明。', 'When should this arrive? Can I get a tracking number and proof of delivery?'],
    ['机场入境沟通', '说明旅行目的、停留时间和第一晚住宿地点。', 'I’m here on vacation for a week. I’m staying at the Riverside Hotel tonight.']
  ]],
  ['emergency', '紧急求助与无障碍', [
    ['请求急救', '向接线员报准确地址，说明有人倒地且没有回应。', 'Please send an ambulance. We’re at 27 River Road. Someone collapsed and isn’t responding.'],
    ['发现烟或火情', '说清从哪里看到烟，说明楼号和入口。', 'There’s smoke coming from the second floor at 12 Park Street. The building entrance is on Pine Lane.'],
    ['证件遗失求助', '向工作人员说明最后一次见到护照的时间与地点。', 'I can’t find my passport. I last had it at the ticket counter around noon.'],
    ['询问无障碍入口', '说明你需要无台阶入口，问如何走到电梯。', 'Is there a step-free entrance? What’s the easiest way to get to the elevator?', 78]
  ]]
];
// IDs follow the authoring order within each group. Append new situations to keep saved practice linked.
const additions = {
  home: ['洗衣前核对洗标', '毛衣不确定能否机洗，问室友上次用的洗法。', 'Do you remember how you washed this sweater last time? The label is hard to read.'],
  housing: ['退租核对押金扣款', '请房东列出清洁费和维修费，并确认剩余押金什么时候退。', 'Could you send me a breakdown of the deductions and tell me when I’ll get the rest of my deposit back?'],
  food: ['餐厅预订迟到', '告诉餐厅你们要晚十五分钟，问能不能保留座位。', 'We’re running about fifteen minutes late. Could you hold our table?'],
  shopping: ['询问补货和替代款', '需要周五拿到一双鞋，询问什么时候补货及可替代尺码。', 'Will this size be back in stock by Friday? If not, is there a similar pair I can try?'],
  transport: ['末班车取消后找替代路线', '询问还能坐哪班车，现有车票能否使用。', 'What’s the last bus I can take from here? Can I use my train ticket on it?'],
  driving: ['加油站预付与退款', '想预付三十元，问没加完的余额如何退回。', 'Could I put thirty on pump four? What happens if I use less than that?'],
  travel: ['两段机票，第一班晚点', '告诉柜台第二段航班几点关舱，问赶不上时谁能帮忙改签。', 'My connecting flight closes at seven twenty. Who should I speak to if I miss it?'],
  health: ['体检前确认准备事项', '说明预约是周四早上，问是否要空腹并请对方发书面说明。', 'My checkup is on Thursday morning. Do I need to fast? Could you send me the instructions in writing?'],
  fitness: ['新会员试课和取消规则', '问有没有单次试课，报名后最晚多久可以取消。', 'Can I try one class first? How much notice do I need to give if I have to cancel?'],
  relationships: ['室友临时留客过夜', '说明自己明早要早起，约定客人留宿的时间和安静时段。', 'I’m up early tomorrow. Is it just for one night, and could we keep it quiet after ten?'],
  parenting: ['孩子忘带午餐', '联系学校，问能否送到办公室，谁会转交给孩子。', 'My child left her lunch at home. Can I drop it off at the office? Who can get it to her?'],
  social: ['加入已经开始的聊天', '走进休息区，问能否加入，并请对方简单说说在聊什么。', 'Mind if I join you? What were you talking about?'],
  culture: ['演出迟到怎么入场', '说明演出已经开始，问什么时候可以进、是否会错过座位。', 'I’m late for the show. When can I go in, and will I still be able to sit in my seat?'],
  milestones: ['聚会上提前告别', '感谢主人邀请，解释需要早走，并约下一次见面。', 'Thanks for having me. I need to head out early tonight. Could we catch up next weekend?'],
  work: ['会议中核对决定和负责人', '说出你对决定的理解，核对负责人和交付时间。', 'Just to confirm, we’re testing the change before release. Who’s running the test, and when do we need the results?'],
  customers: ['答复客户暂时没有解决办法', '说明已经确认的问题，给临时办法和下次进展更新时间。', 'We’ve confirmed the issue. For now, you can export the list manually. I’ll send you an update by three tomorrow.'],
  career: ['询问面试形式和准备内容', '确认面试多久、有没有动手任务、需要准备什么。', 'How long will the interview take? Will there be a practical task, and is there anything I should prepare?'],
  study: ['小组作业有人无法到场', '给缺席同学一项可远程完成的任务，并确定交稿时间。', 'Could you review the slides from home and send your comments by Thursday evening?'],
  payments: ['刷卡失败但银行显示处理中', '给店员看待入账的扣款，问能否先核对交易再重刷。', 'My bank shows a pending charge. Could you check your terminal before we try the card again?'],
  digital: ['旧手机号收不到验证码', '说明旧号码停用，问官方账号恢复还有什么验证方式。', 'I don’t have access to my old number. Is there another way to verify my account?'],
  appointments: ['维修发现额外问题', '请师傅分开报价，说明没得到同意前先不做额外项目。', 'Could you price the extra work separately? Please check with me before you do anything beyond the original repair.'],
  pets: ['和邻居沟通狗叫', '说明自己听到狗叫的时段，问是否也注意到并约好反馈。', 'I’ve been hearing barking around six in the morning. Have you noticed it? Can I text you if it happens again?'],
  services: ['表格姓名和证件写法不一致', '指出表格漏了中间名，询问在哪一栏更正及是否需重新提交。', 'My middle name is missing from the form. Which field should I correct, and do I need to submit it again?'],
  emergency: ['在商场联系失散的家人', '向服务台说清最后见到的位置、衣着和你的联系方式。', 'I last saw my father by the bookstore. He’s wearing a blue jacket. Where should I wait, and can I leave you my number?']
};
root.LifeScenes = groups.map(([id, title, situations]) => ({
  id, title, situations: [...situations, additions[id]].map(([title, prompt, sample, lesson], index) => ({
    id: id + "-" + (index + 1), title, prompt, sample, lesson
  }))
}));
if (typeof module !== 'undefined' && module.exports) module.exports = root.LifeScenes;
})(typeof window !== 'undefined' ? window : globalThis);
