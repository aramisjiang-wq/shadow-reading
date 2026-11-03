/* 原创场景短对话，使用浏览器合成朗读。迁移题参考答案不是唯一正确表达。 */
(function (root) {
'use strict';
const dialogues = [];
function d(id, title, scene, level, unitIds, goal, points, tasks, lines) {
  dialogues.push({id, title, scene, level, units: unitIds.split(','), goal,
    points: points.split('~'), tasks: tasks.split('~').map(t => {const [prompt, sample] = t.split('=>'); return {prompt, sample};}),
    turns: lines.trim().split('\n').map(line => { const [role, en, zh] = line.split('|'); return {role, en, zh}; })});
}
d('meet-01','第一次见面','认识与交流','基础','verbs-core,verbs-thinking,connections','介绍自己，并问出对方的工作和兴趣。','What do you do? 问职业，不等于 What are you doing?~work in + 行业；work for + 公司~How about you? 把话题自然交还对方','把自己的职业改成产品经理，并补充在科技公司工作。=>I’m a product manager. I work for a technology company.~询问对方是否也喜欢做饭。=>Do you enjoy cooking too?',`
A|Hi, I’m Lin. Is this your first time here?|你好，我是林。你第一次来这里吗？
B|Yes, it is. I’m Alex. Nice to meet you.|是的。我是亚历克斯，很高兴认识你。
A|Nice to meet you too. What do you do?|我也很高兴认识你。你做什么工作？
B|I work in education. How about you?|我从事教育工作。你呢？
A|I work for a small technology company.|我在一家小科技公司工作。
B|That sounds interesting. What do you do outside work?|听起来很有趣。工作之外你喜欢做什么？
A|I enjoy cooking and going for walks.|我喜欢做饭和散步。
B|Me too. Do you know any good walking routes nearby?|我也是。你知道附近有什么好的散步路线吗？
`);
d('meet-02','没听清，继续聊','认识与交流','基础','numbers,connections,clock','听不清数字和时间时，请求重复并核对。','Could you repeat that? 礼貌请求重复~Do you mean A or B? 明确核对~数字有歧义时可逐位确认，不靠猜','确认房间是十四号还是四十号。=>Do you mean room fourteen or room forty?~请对方慢一点再说一次。=>Could you repeat that more slowly, please?',`
A|Which room is the workshop in?|工作坊在哪个房间？
B|Room thirty, on the third floor.|三楼三十号房间。
A|Sorry, did you say thirteen or thirty?|不好意思，你说十三还是三十？
B|Thirty. Three zero.|三十。三、零。
A|Thanks. And what time does it start?|谢谢。那几点开始？
B|At a quarter past two.|两点一刻。
A|So that’s two fifteen, in room thirty. Is that right?|也就是两点十五分，三十号房间，对吗？
B|Exactly. You still have ten minutes.|完全正确。你还有十分钟。
`);
d('meet-03','表达兴趣并追问','认识与交流','基础','feelings,calendar,verbs-thinking','表达兴趣，问频率和开始时间。','be interested in + 名词/doing~How often...? 问频率~How long have you...? 问持续时间','把摄影改成游泳，并说每周两次。=>I’m interested in swimming. I go twice a week.~问对方学了多长时间。=>How long have you been learning?',`
A|Those photos are beautiful. Did you take them?|这些照片很漂亮，是你拍的吗？
B|Yes. I’m interested in photography.|是的，我对摄影感兴趣。
A|How often do you go out to take pictures?|你多久出去拍一次照？
B|Usually once a week, sometimes twice.|通常每周一次，有时两次。
A|How long have you been doing it?|你做这件事多久了？
B|For about two years. I started with my phone.|大约两年了。我一开始用手机拍。
A|I’d like to try. Is there a beginner’s class?|我想试试。有初学者课程吗？
B|Yes. I can send you the information tonight.|有的。我今晚可以把信息发给你。
`);
d('meet-04','礼貌表达不同意见','认识与交流','进阶','connections,comparison,modals','解释不同意见，提出可行替代方案。','I see your point, but... 先回应再表达不同意见~less expensive / more convenient 比较不同维度~Could we...? 提出共同方案','认为出租车太贵，建议坐地铁。=>I see your point, but a taxi is too expensive. Could we take the subway?~说明虽然更慢，但至少便宜十美元。=>Although it’s slower, it’s at least ten dollars cheaper.',`
A|I think we should book the restaurant near the station.|我觉得我们应该订车站旁边的餐厅。
B|I see your point, but it can be quite noisy.|我理解你的想法，但那里可能很吵。
A|That’s true. It’s convenient for everyone, though.|确实。不过对大家都方便。
B|How about the café across the street? It’s quieter.|街对面的咖啡馆怎么样？那里更安静。
A|Isn’t it more expensive?|那里不是更贵吗？
B|A little, but the lunch menu is within our budget.|贵一点，不过午餐菜单在我们的预算内。
A|All right. Could you check whether they have a table for six?|好的。你能问问有没有六人桌吗？
B|Of course. I’ll call and confirm the price too.|当然。我也会打电话确认价格。
`);
d('daily-01','早晨出门','日常与居家','基础','verbs-daily,clock,calendar','安排起床、出发和随身物品。','wake up 醒来；get up 起床~leave at + 时刻~remember to do 提醒尚未做的事','说自己七点起床，八点一刻出门。=>I get up at seven and leave home at eight fifteen.~提醒对方带钥匙并关灯。=>Remember to bring your keys and turn off the lights.',`
A|Are you awake? It’s half past seven.|你醒了吗？现在七点半了。
B|I’m getting up now. What time do we need to leave?|我正起床。我们几点要出门？
A|By eight fifteen. The bus comes at eight twenty.|最晚八点一刻。公交车八点二十分来。
B|Do we have time for breakfast?|我们有时间吃早饭吗？
A|Yes, but only a quick one. I’ve made some toast.|有，不过只能快点吃。我烤了些面包。
B|Great. Could you pass me my bag?|太好了。能把我的包递给我吗？
A|Here it is. Remember to take your keys.|给你。记得拿钥匙。
B|Thanks. I’ll turn off the lights before we leave.|谢谢。走之前我会关灯。
`);
d('daily-02','家务如何分工','日常与居家','基础','verbs-core,verbs-daily,connections','分配家务、说明先后和完成时间。','do the dishes 洗碗；do the laundry 洗衣服~while 连接同时进行的动作~finish doing 完成某事','提出自己洗碗，对方倒垃圾。=>I’ll do the dishes. Could you take out the rubbish?~说完成清洁后再做晚饭。=>Let’s make dinner after we finish cleaning.',`
A|Could you give me a hand with the housework?|你能帮我一起做家务吗？
B|Sure. What needs doing?|当然。需要做什么？
A|The dishes and the laundry. I also need to tidy the living room.|洗碗、洗衣服，还需要整理客厅。
B|I’ll do the dishes while you start the laundry.|你开始洗衣服的时候，我来洗碗。
A|Thanks. Then we can tidy the living room together.|谢谢。然后我们可以一起整理客厅。
B|Do we need to finish everything before lunch?|我们需要午饭前做完所有事情吗？
A|No, but I’d like to finish cleaning by two.|不用，不过我想两点前打扫完。
B|That works. Let’s start with the kitchen.|可以。我们从厨房开始吧。
`);
d('daily-03','借东西与归还','日常与居家','基础','verbs-work,modals,duration','借用物品，说明期限和归还方式。','borrow from 借入；lend to 借出~by Friday 截止；until Friday 持续~return something，不说 return back something','借用对方的充电器两小时。=>Could I borrow your charger for two hours?~答应明天上午九点前归还。=>I’ll return it by nine tomorrow morning.',`
A|Could I borrow your ladder this weekend?|这周末我能借用你的梯子吗？
B|Of course. What do you need it for?|当然。你要用它做什么？
A|I need to change a light in the hallway.|我需要换走廊里的灯。
B|No problem. I won’t need it until Monday.|没问题。我周一前都不用。
A|I’ll return it by Sunday evening.|我会在周日晚上前还给你。
B|Thanks. Please be careful; it’s quite heavy.|谢谢。请小心，它挺重的。
A|Could you help me carry it downstairs?|你能帮我把它搬到楼下吗？
B|Sure. Let me get my shoes.|可以。等我穿上鞋。
`);
d('daily-04','房间出了问题','日常与居家','进阶','adjectives,verbs-work,duration','清楚描述问题，约定处理时间。','has stopped working 已停止工作~since + 问题起点~within + 处理期限','说明空调从昨晚开始不工作。=>The air conditioner hasn’t worked since last night.~请求明天下午三点前修好。=>Could you repair it by three tomorrow afternoon?',`
A|Hello. The heater in my flat has stopped working.|你好，我公寓里的暖气不工作了。
B|I’m sorry to hear that. When did it stop?|很抱歉听到这个消息。什么时候停的？
A|Last night. The room is really cold now.|昨晚。房间现在很冷。
B|Can someone come and check it this afternoon?|今天下午可以安排人来检查吗？
A|Yes. I’ll be home from two to five.|可以。我两点到五点在家。
B|We’ll send someone within that time window.|我们会在那个时间段派人过去。
A|Could you ask them to call before they arrive?|你能请他们到之前打电话吗？
B|Certainly. I’ll confirm the appointment by text.|当然。我会用短信确认预约。
`);
d('food-01','咖啡店点单','餐饮与购物','基础','quantity,modals,numbers','说清饮品、规格、价格和打包需求。','would like 礼貌点单~without + 不需要的配料~How much is it? 确认价格','点一杯小杯、不加糖的拿铁，外带。=>I’d like a small latte without sugar, to take away.~确认两杯总共是否十美元。=>Is that ten dollars for both coffees?',`
A|Hi. I’d like a coffee, please.|你好，我想要一杯咖啡。
B|Of course. What size would you like?|当然。你要什么杯型？
A|A medium latte, without sugar.|中杯拿铁，不加糖。
B|Is that to drink here or to take away?|在这里喝还是带走？
A|To take away. How much is it?|带走。多少钱？
B|Four dollars fifty.|四美元五十分。
A|Can I pay by card?|我能刷卡吗？
B|Yes. Please tap your card here.|可以。请在这里感应你的卡。
`);
d('food-02','餐厅点餐与忌口','餐饮与购物','基础','adjectives,modals,prepositions','询问食材，说明忌口并确认替换。','Does it contain...? 询问成分~be allergic to 对……过敏~Could I have...instead? 请求替换','询问汤里是否含牛奶。=>Does the soup contain milk?~说明自己对花生过敏，请服务员与厨房确认。=>I’m allergic to peanuts. Could you check with the kitchen?',`
A|Are you ready to order?|你准备好点餐了吗？
B|Almost. Does the vegetable curry contain nuts?|差不多了。蔬菜咖喱里有坚果吗？
A|Let me check with the kitchen. Do you have an allergy?|我和厨房确认一下。你有过敏情况吗？
B|Yes, I’m allergic to peanuts.|是的，我对花生过敏。
A|The curry contains peanuts. The grilled fish doesn’t, but I’ll confirm how it’s prepared.|咖喱有花生。烤鱼没有，不过我会确认制作方式。
B|Thank you. Could I have rice instead of chips with the fish?|谢谢。鱼的配餐能把薯条换成米饭吗？
A|Of course. Would you like anything to drink?|当然。需要喝点什么吗？
B|Just some water, please.|给我一些水就好，谢谢。
`);
d('food-03','买菜与核对数量','餐饮与购物','基础','quantity,numbers,determiners','按重量购买，核对单价和总额。','a kilo / half a kilo 重量~a few + 可数；a little + 不可数~each / per kilo 标明单价基准','买半公斤苹果和三个橙子。=>I’d like half a kilo of apples and three oranges.~确认标价是每公斤还是每袋。=>Is that price per kilo or per bag?',`
A|How much are the tomatoes?|番茄多少钱？
B|Three dollars a kilo, or five dollars for two kilos.|每公斤三美元，两公斤五美元。
A|I’ll take half a kilo, please.|我买半公斤。
B|Anything else?|还要别的吗？
A|A few apples. Are these sold by weight or by number?|几个苹果。这些是按重量还是按个卖？
B|By number. They’re fifty cents each.|按个卖，每个五十分。
A|I’ll have four. So the total is three dollars fifty?|我要四个。所以一共三美元五十分？
B|That’s right. Would you like a bag?|是的。你要袋子吗？
`);
d('food-04','试穿、比较与退货','餐饮与购物','进阶','comparison,adjectives,verbs-work','比较尺寸价格，问清退换条件。','a larger size / a cheaper option 比较~too small / large enough 描述合适程度~keep the receipt 保留凭证','说这双鞋太紧，想试大一码。=>These shoes are too tight. Could I try a larger size?~询问是否能在七天内退货。=>Can I return it within seven days?',`
A|Could I try this jacket in a larger size?|我能试试这件夹克大一号的吗？
B|Certainly. Here’s a medium. Is that more comfortable?|当然。这是中号。舒服一些吗？
A|Yes, but it’s more expensive than I expected.|是的，但比我预期的贵。
B|This blue one is twenty dollars cheaper.|这件蓝色的便宜二十美元。
A|I prefer the blue one. Can I return it if it doesn’t fit?|我更喜欢蓝色的。如果不合身能退吗？
B|Yes, within thirty days, as long as it’s unworn and you have the receipt.|可以，三十天内，衣服未穿过并且有收据。
A|Does that include sale items?|促销商品也包括在内吗？
B|Not all of them. Let me check this item’s return policy before you pay.|不是所有都包括。付款前我来核对这件商品的退货政策。
`);
d('travel-01','问路与确认方向','出行与交通','基础','prepositions,numbers,connections','理解位置和方向，复述路线确认。','go straight / turn left 路线指令~next to / opposite 位置~second crossing 序数用在路线中','问最近的地铁站在哪里。=>Excuse me, where is the nearest subway station?~确认在第二个路口右转。=>So I turn right at the second crossing, correct?',`
A|Excuse me, how do I get to the station?|打扰一下，去车站怎么走？
B|Go straight, then turn left at the second crossing.|直走，然后在第二个路口左转。
A|Is it far from here?|离这里远吗？
B|About ten minutes on foot. It’s opposite the library.|走路大约十分钟，在图书馆对面。
A|Do I need to cross the bridge?|我需要过桥吗？
B|No. The station is just before the bridge.|不用。车站就在桥前面。
A|So, second left, then opposite the library?|也就是第二个路口左转，然后在图书馆对面？
B|Exactly. You’ll see a blue sign.|对。你会看到一块蓝色标牌。
`);
d('travel-02','买车票与时间核对','出行与交通','基础','numbers,clock,comparison','核对出发、到达、换乘和票价。','single / return 单程/往返（英式常用）~direct 直达；change trains 换乘~离开时间与到达时间分开确认','买明天上午十点的单程票。=>I’d like a single ticket for the ten a.m. train tomorrow.~询问是否需要换乘以及在哪换。=>Do I need to change trains? If so, where?',`
A|I’d like a return ticket to Brighton, please.|我想买一张去布莱顿的往返票。
B|When would you like to leave?|你想什么时候出发？
A|Tomorrow morning, around nine.|明天早上九点左右。
B|There’s a direct train at nine fifteen. It arrives at ten twenty.|九点十五分有直达车，十点二十分到。
A|And how much is the return ticket?|往返票多少钱？
B|Thirty-eight pounds. A later train is six pounds cheaper.|三十八英镑。晚一班便宜六英镑。
A|I’ll take the earlier one. Which platform does it leave from?|我选早一班。从哪个站台出发？
B|Platform four, but please check the departure board tomorrow.|四号站台，不过请明天查看发车显示屏。
`);
d('travel-03','航班变更与时区','出行与交通','进阶','duration,calendar,clock','确认变更后的日期、当地时间和接送。','has been delayed 已延误~local time / time zone 时区~by + 截止；until + 持续','通知航班延误两小时。=>My flight has been delayed by two hours.~确认到达时间是周二当地晚上九点。=>Is the arrival time nine p.m. local time on Tuesday?',`
A|My flight has been delayed. Could we change the pickup time?|我的航班延误了，我们能改接机时间吗？
B|Of course. What’s the new arrival time?|当然。新的到达时间是什么？
A|Eleven thirty on Tuesday night.|周二晚上十一点半。
B|Is that local time at the destination?|那是目的地的当地时间吗？
A|Yes. The flight leaves on Monday, but arrives on Tuesday.|是的。航班周一出发，但周二到。
B|Thanks for checking. I’ll tell the driver to arrive at midnight.|谢谢确认。我会告诉司机午夜到。
A|Could you send me the updated details by email?|你能把更新后的信息通过邮件发给我吗？
B|Certainly. Please let us know if the arrival time changes again.|当然。如果到达时间再次变化，请告诉我们。
`);
d('travel-04','出租车路线与费用','出行与交通','进阶','comparison,quantity,modals','核对目的地，比较路线并确认计费。','How long will it take? 问时长~faster than / less expensive 比较~Does that include...? 核对附加费','告诉司机去中央车站的北入口。=>Please take me to the north entrance of Central Station.~询问总价是否包括过路费。=>Does the total include tolls?',`
A|Could you take me to the Riverside Hotel?|你能送我去河畔酒店吗？
B|The one on Park Road or the one near the airport?|公园路那家，还是机场附近那家？
A|Park Road. How long will it take?|公园路那家。要多久？
B|About thirty minutes, or twenty if we take the toll road.|大约三十分钟，走收费路的话二十分钟。
A|How much extra is the toll?|过路费另外要多少？
B|Five dollars. The normal fare is about twenty-five.|五美元。平常车费大约二十五美元。
A|Let’s take the faster route. Please give me a receipt.|我们走快一点的路线吧。请给我收据。
B|Of course. Please put on your seat belt.|当然。请系好安全带。
`);
d('stay-01','预订房间','住宿与服务','基础','calendar,adjectives,numbers','说清入住日期、晚数、房型和费用。','for two nights 住两晚~from 日期 to 日期~per night / total 分开核对','订六月十日到十二日两晚的双人房。=>I’d like a double room for two nights, from June tenth to June twelfth.~询问早餐是否包含在房价内。=>Is breakfast included in the room rate?',`
A|I’d like to book a room for two nights.|我想订一个房间，住两晚。
B|What dates would you like?|你想订哪几天？
A|From the fifth to the seventh of May.|五月五日到七日。
B|We have a quiet double room available.|我们有一间安静的双人房。
A|How much is it per night?|每晚多少钱？
B|Ninety dollars, including breakfast.|九十美元，含早餐。
A|So that’s one hundred and eighty dollars in total. Can I cancel?|所以总共一百八十美元。能取消吗？
B|You can cancel free of charge until noon two days before arrival.|抵达前两天中午之前可以免费取消。
`);
d('stay-02','入住与额外请求','住宿与服务','基础','modals,clock,prepositions','办理入住，询问设施和退房时间。','under the name... 预订姓名~Could I have...? 提出请求~check in / check out 入住/退房','说自己用 Lin 的名字订了房。=>I have a reservation under the name Lin.~请求一间远离电梯的房间。=>Could I have a room away from the lift?',`
A|Hello. I have a reservation under the name Lin.|你好，我用林这个名字预订了房间。
B|Welcome. May I see your passport, please?|欢迎。请出示护照好吗？
A|Here you are. Could I have a room on a higher floor?|给你。我能要一间高楼层的房间吗？
B|Let me check. Yes, room five hundred and twelve is available.|我查一下。可以，五一二房间有空。
A|Great. What time is checkout?|太好了。几点退房？
B|By eleven a.m. Breakfast is from seven to ten.|上午十一点前。早餐是七点到十点。
A|Is the restaurant next to the reception desk?|餐厅在前台旁边吗？
B|Yes, just through those doors on your left.|是的，穿过左边那几扇门就是。
`);
d('stay-03','更改预约','住宿与服务','进阶','verbs-work,duration,clock','改约而不丢失日期、时刻和确认信息。','move something from A to B~instead 替代原安排~confirm + 变更后的完整信息','把周四两点十五分改到周五三点半。=>Could we move the appointment from two fifteen on Thursday to three thirty on Friday?~询问改约是否产生费用。=>Is there a fee for changing the appointment?',`
A|I have an appointment on Thursday at two fifteen.|我周四两点一刻有个预约。
B|Yes, I can see your booking. How can I help?|是的，我看到了。有什么可以帮你？
A|Could we move it to Friday afternoon instead?|我们能改到周五下午吗？
B|We have a space at three thirty. Would that work?|三点半有空。可以吗？
A|Yes. How long does the appointment take?|可以。预约大约需要多久？
B|About forty-five minutes.|大约四十五分钟。
A|Please confirm Friday at three thirty by text.|请通过短信确认周五三点半。
B|Certainly. Your Thursday appointment is now cancelled.|当然。你周四的预约已经取消了。
`);
d('stay-04','反馈问题与跟进','住宿与服务','进阶','verbs-thinking,verbs-work,modals','说明实际问题和希望的处理方式，确认下一步。','ordered A but received B 说明差异~Could you check...? 请求核查~when to expect... 询问结果时间','说明订了安静房间，但房间靠近施工区。=>I booked a quiet room, but this one is next to a construction site.~请求换房，并确认不额外收费。=>Could I move to another room at no extra charge?',`
A|I ordered a desk, but the chair arrived instead.|我订了书桌，但送来的是椅子。
B|I’m sorry about that. Could you give me your order number?|抱歉。能提供订单号吗？
A|It’s six three zero one. I placed the order last Monday.|六三零一。我上周一订的。
B|Thank you. Could you send us a photo of the package label?|谢谢。你能发包裹标签的照片给我们吗？
A|Yes. Will you collect the wrong item?|可以。你们会取走发错的商品吗？
B|Yes, at no extra charge. We’ll also arrange the correct delivery.|会的，不额外收费。我们也会安排正确商品的配送。
A|When should I expect an update?|我什么时候能收到进展通知？
B|Within two working days. I’ll send you a case number now.|两个工作日内。我现在把处理编号发给你。
`);
d('work-01','约一个会议','工作与协作','基础','clock,calendar,modals','提出时段、协商选择、确认时区与时长。','Are you available...? 问是否有空~either A or B 两个都可选~for thirty minutes 会议时长','提出下周二十点或周三两点两个选项。=>Are you available next Tuesday at ten or Wednesday at two?~确认按北京时间开四十五分钟。=>Shall we meet for forty-five minutes, Beijing time?',`
A|Are you available for a short meeting next Tuesday?|你下周二有空开个短会吗？
B|Possibly. What time did you have in mind?|可能有。你想几点？
A|Either ten a.m. or two p.m.|上午十点或者下午两点。
B|Two works better for me. Is that Beijing time?|两点对我更合适。是北京时间吗？
A|Yes. We only need thirty minutes.|是的。我们只需要三十分钟。
B|Great. Could you send me the agenda beforehand?|很好。你能提前把议程发给我吗？
A|Of course. I’ll send it by Monday afternoon.|当然。我会在周一下午前发给你。
B|Thanks. I’ll accept the invitation when it arrives.|谢谢。收到邀请后我会接受。
`);
d('work-02','说明工作进度','工作与协作','进阶','verb-forms,verbs-work,duration','区分已完成、进行中和下一步，说明风险。','have finished 已完成且与现在相关~am working on 正在处理~need another two days 还需要两天','说已完成设计，正在检查数据。=>I’ve finished the design, and I’m checking the data now.~说明还需要两个工作日并提出周五交付。=>I need another two working days. Could I send it by Friday?',`
A|How’s the report coming along?|报告进展怎么样？
B|I’ve finished the first draft. I’m checking the numbers now.|初稿已完成。我正在核对数字。
A|Do you think you can send it by Thursday?|你觉得周四前能发给我吗？
B|I might need another day. We’re still waiting for the sales data.|我可能还需要一天。我们还在等销售数据。
A|Which part is blocked?|哪一部分受阻了？
B|The regional comparison. The rest is ready for review.|地区比较部分。其余部分可以审阅了。
A|Please send the completed sections today and flag the missing data.|请今天发已完成的部分，并标注缺失数据。
B|Will do. I’ll confirm the final deadline tomorrow morning.|好的。我会在明天上午确认最终期限。
`);
d('work-03','澄清需求与范围','工作与协作','进阶','connections,verbs-thinking,determiners','把模糊需求变成可以确认的动作与条件。','When you say..., do you mean...? 核对含义~both / either / neither 明确选择~before / after 说明依赖','确认“本周完成”是周五提交初稿还是正式发布。=>When you say finish this week, do you mean send a draft by Friday or release the final version?~复述只需桌面版，本次不做手机版。=>So we only need the desktop version for now, correct?',`
A|We need a simpler booking page.|我们需要一个更简单的预订页面。
B|When you say simpler, do you mean fewer fields or fewer steps?|你说更简单，是字段更少还是步骤更少？
A|Fewer steps. We still need all the contact information.|步骤更少。联系方式仍然都要。
B|Should users be able to pay before they create an account?|用户应该能在注册账号之前付款吗？
A|Yes, but they should receive a confirmation email afterwards.|是的，不过之后应收到确认邮件。
B|Do we need both card payments and bank transfers?|刷卡和银行转账都需要吗？
A|Only card payments for now. We’ll discuss transfers separately.|目前只需刷卡。转账另行讨论。
B|Understood. I’ll write down the scope and send it for confirmation.|明白。我会记下范围，发给你确认。
`);
d('work-04','委婉拒绝与调整期限','工作与协作','进阶','modals,comparison,verbs-work','解释限制、提出取舍，约定可兑现的结果。',"I’m afraid... 委婉说明不利消息~could...if... 带条件提出方案~prioritise 说明优先处理的对象",'说明今天不能完成全部，但可以先交摘要。=>I’m afraid I can’t finish everything today, but I can send the summary first.~询问质量和速度哪个更重要。=>Which is more important for this task, quality or speed?',`
A|Could you finish both presentations by tomorrow morning?|你能明早前完成两份演示吗？
B|I’m afraid I can’t finish both to a good standard by then.|恐怕我无法在那之前高质量完成两份。
A|What would be realistic?|什么安排比较实际？
B|I could finish the customer presentation tomorrow and the internal one on Friday.|我可以明天完成客户演示，周五完成内部演示。
A|The customer presentation is more urgent. Could you send an outline today?|客户演示更紧急。今天能发个提纲吗？
B|Yes, by five. I’ll need your feedback before I make the slides.|可以，五点前。制作幻灯片前我需要你的反馈。
A|That’s fine. I’ll review it as soon as it arrives.|可以。收到后我会尽快审阅。
B|Thanks. I’ll confirm those dates in writing.|谢谢。我会书面确认这些日期。
`);
d('money-01','核对账单','金钱与数字','基础','numbers,quantity,connections','核对数量、单价、服务费和总额。','each / in total 区分单价和总价~Does that include...? 核对包含项~I think there may be... 委婉指出疑问','指出账单算了三杯咖啡，实际只点了两杯。=>The bill shows three coffees, but we only ordered two.~询问服务费是否已经包括在总额里。=>Is the service charge already included in the total?',`
A|Could we have the bill, please?|能给我们账单吗？
B|Of course. The total is sixty-eight dollars.|当然。总共六十八美元。
A|Could you check this? We ordered two desserts, not three.|能核对一下吗？我们点了两份甜点，不是三份。
B|You’re right. I’m sorry. That should be eight dollars less.|你说得对，抱歉。应该少八美元。
A|So the new total is sixty dollars?|所以新总额是六十美元？
B|Yes, including the service charge.|是的，包含服务费。
A|Can we split it equally between two cards?|我们能用两张卡平分付款吗？
B|Certainly. That’s thirty dollars on each card.|当然。每张卡付三十美元。
`);
d('money-02','预算与大数换算','金钱与数字','进阶','numbers,quantity,comparison','准确表达预算、大数和差额。','million 是百万，不是万~over / under budget 超出/低于预算~double-check 重要金额再次核对','把350万元换成英文数值表达。=>Three point five million yuan.~说明当前方案比预算高二十万元。=>The current proposal is two hundred thousand yuan over budget.',`
A|What’s the budget for the project?|项目预算是多少？
B|Three point five million yuan.|三百五十万元。
A|Just to confirm, that’s three million five hundred thousand?|确认一下，是三百五十万？
B|Exactly. It includes equipment and support.|正是。包括设备和支持服务。
A|The current proposal is three point eight million.|目前的方案是三百八十万元。
B|So we’re three hundred thousand over budget.|所以我们超预算三十万元。
A|Yes. We could reduce the first order and add more later.|是的。我们可以减少首批订单，之后再增加。
B|Please show both options with the total annual cost.|请列出两个选项以及各自年度总成本。
`);
d('money-03','百分比与百分点','金钱与数字','进阶','quantity,numbers,comparison','说明比例变化，明确分母和比较口径。','from 20 percent to 25 percent 增加5个百分点~five percentage points 与 five percent 不同~relative increase 需要用原值作分母','说明合格率从80%升到90%，提高10个百分点。=>The pass rate rose from eighty to ninety percent, an increase of ten percentage points.~询问增长率以哪一期为基准。=>Which period are we using as the baseline for the growth rate?',`
A|The conversion rate rose from twenty percent to twenty-five percent.|转化率从百分之二十升到百分之二十五。
B|So it increased by five percent?|所以增长了百分之五？
A|By five percentage points. The relative increase is twenty-five percent.|增加了五个百分点。相对增长是百分之二十五。
B|Right, because five divided by twenty is a quarter.|对，因为五除以二十是四分之一。
A|Exactly. We should label both measures clearly.|正是。我们应该把两个指标都标清楚。
B|Are we comparing the same number of days?|比较的天数相同吗？
A|Yes, two full weeks in each period.|是的，每期都是完整的两周。
B|Great. Please include the sample size in the report too.|很好。也请把样本量写进报告。
`);
d('money-04','报价与合同金额','金钱与数字','进阶','verbs-work,duration,quantity','确认单价、数量、税费、有效期和付款节点。','per user per month 计费维度不能遗漏~excluding / including tax 税费范围~valid until 报价有效期','确认报价是每人每月十五美元，还是整年十五美元。=>Is that fifteen dollars per user per month, or per year?~询问是否另有一次性安装费。=>Is there a separate one-time setup fee?',`
A|Your quote says fifteen dollars. Is that per user or for the whole team?|报价写十五美元，是每人还是整个团队？
B|Per user per month, with an annual commitment.|每人每月，需要签一年。
A|For ten users, that’s one thousand eight hundred dollars a year?|十个用户，一年就是一千八百美元？
B|Correct, excluding tax. There’s no setup fee.|正确，不含税。没有安装费。
A|Can we pay monthly, or do we need to pay in advance?|可以按月付，还是需要预付？
B|This price requires annual payment in advance.|这个价格需要按年预付。
A|How long is the quote valid?|报价有效到什么时候？
B|Until the end of this month. I’ll send all the terms in writing.|到本月底。我会书面发送全部条款。
`);
d('health-01','描述身体不舒服','健康与运动','基础','feelings,duration,verbs-thinking','说明症状和持续时间，安排求助。','have a headache / feel tired 描述状态~since last night / for two days 说明时间~这里练语言表达，不提供诊断','说明自己从昨晚开始头痛。=>I’ve had a headache since last night.~问今天下午是否能预约医生。=>Can I make an appointment with a doctor this afternoon?',`
A|You look tired. Are you feeling all right?|你看起来很累，还好吗？
B|Not really. I’ve had a headache since last night.|不太好。我从昨晚开始头痛。
A|Have you had any water or food today?|你今天喝水或吃东西了吗？
B|Some water, but I haven’t had lunch yet.|喝了一些水，但还没吃午饭。
A|Would you like me to help you make an appointment?|需要我帮你预约吗？
B|Yes, please. I’d like to speak to a doctor.|好的，谢谢。我想咨询医生。
A|I’ll call the clinic and ask what times are available.|我打电话给诊所问问有哪些时段。
B|Thank you. Could you ask whether they have an appointment today?|谢谢。你能问问今天是否有预约空位吗？
`);
d('health-02','预约就诊与听清指示','健康与运动','进阶','duration,calendar,connections','核对时间地点，把不清楚的指示再问明白。','How long have you had...? 问持续~Could you write that down? 请求文字信息~关键指示要复述确认，避免猜测','确认预约是周四上午九点半。=>Could you confirm that my appointment is at nine thirty on Thursday morning?~请对方把准备要求发短信给自己。=>Could you send me the preparation instructions by text?',`
A|I’d like to make an appointment, please.|我想预约，谢谢。
B|Is this your first visit to our clinic?|这是你第一次来我们诊所吗？
A|Yes. I’ve had a cough for three days.|是的。我咳嗽三天了。
B|We have an appointment tomorrow at nine thirty.|明天九点半有空位。
A|That works. What should I bring?|可以。我应该带什么？
B|Please bring your identification and a list of any medicines you take.|请带身份证明和你正在服用的药物清单。
A|Could you send the address and those details by text?|你能把地址和这些要求发短信给我吗？
B|Certainly. Please arrive ten minutes early to register.|当然。请提前十分钟来登记。
`);
d('health-03','安排运动计划','健康与运动','基础','calendar,comparison,modals','安排频率和时长，提出能执行的计划。','twice a week 每周两次~start with... 从适合自己的量开始~too...to / enough 程度表达','说每周游泳两次，每次半小时。=>I swim twice a week for half an hour each time.~提议先从十分钟散步开始。=>Let’s start with a ten-minute walk.',`
A|I’d like to be more active, but I’m busy during the week.|我想多活动，但工作日很忙。
B|What do you enjoy doing?|你喜欢什么运动？
A|Swimming, though the pool is far from my office.|游泳，不过泳池离办公室很远。
B|Could you go twice a week at the weekend?|能在周末去两次吗？
A|Maybe Saturday morning and Sunday afternoon.|也许周六上午和周日下午。
B|That sounds realistic. How long would you swim each time?|听起来可行。每次游多久？
A|About half an hour. I don’t want to start with too much.|大约半小时。我不想一开始就太多。
B|Good idea. Choose a pace that feels comfortable for you.|好主意。选一个你感觉舒适的节奏。
`);
d('health-04','感受与倾听','健康与运动','进阶','feelings,verbs-thinking,modals','表达担忧、倾听对方、询问想要何种帮助。','worried about / tired from 固定搭配~Would you like...? 先询问~I can listen 表达支持，不替对方下结论','说自己担心明天的演示。=>I’m worried about tomorrow’s presentation.~问对方想一起想办法还是只需要倾听。=>Would you like to think through some options, or would you prefer me to listen?',`
A|You seem a little quiet today. Is everything okay?|你今天好像有点沉默，还好吗？
B|I’m worried about the presentation on Friday.|我在担心周五的演示。
A|Is it the content or speaking in front of people?|是内容让你担心，还是当众讲话？
B|Mostly speaking. I know the material, but I get nervous.|主要是讲话。内容我熟悉，但我会紧张。
A|Would it help to practise with me, or would you prefer to talk first?|和我练习会有帮助吗，还是你想先聊聊？
B|Could we do a short practice? Just the first five minutes.|能做个短练习吗？就前五分钟。
A|Of course. We can pause whenever you need to.|当然。你需要时我们随时可以暂停。
B|Thanks. That makes it feel more manageable.|谢谢。这让我感觉更能应对了。
`);
d('social-01','邀请与回应','社交与休闲','基础','modals,calendar,clock','发出邀请，确认时间地点和参加人数。','Would you like to...? 邀请~bring someone along 带人一起~at + 时刻，on + 星期','邀请朋友周六下午三点喝咖啡。=>Would you like to have coffee at three on Saturday afternoon?~询问是否可以带一个朋友。=>Would it be okay if I brought a friend?',`
A|Would you like to have dinner with us on Saturday?|你周六想和我们一起吃晚饭吗？
B|I’d love to. What time?|我很愿意。几点？
A|Around seven, at our place.|七点左右，在我们家。
B|Great. Should I bring anything?|很好。我需要带什么吗？
A|You don’t have to, but a dessert would be lovely.|不必带，不过带甜点也很好。
B|I can make a cake. Is anyone allergic to nuts?|我可以做个蛋糕。有人对坚果过敏吗？
A|Yes, one guest is. Thanks for checking.|有一位客人过敏。谢谢你确认。
B|Then I’ll make a nut-free one and bring the ingredients list.|那我做一个不含坚果的，并带上配料清单。
`);
d('social-02','婉拒与重新安排','社交与休闲','基础','connections,calendar,modals','拒绝具体安排，同时保持关系并提出替代时间。','I’d love to, but... 友善拒绝~already have plans 已有安排~How about...? 给出替代','婉拒周日晚餐，因为要陪家人。=>I’d love to, but I’m spending Sunday evening with my family.~提出下周六午饭作为替代。=>How about lunch next Saturday instead?',`
A|Are you free to see a film on Friday night?|你周五晚上有空看电影吗？
B|I’d love to, but I already have plans.|我很想去，不过已经有安排了。
A|No problem. Would Saturday work?|没问题。周六可以吗？
B|Saturday afternoon would be better. I’m busy in the morning.|周六下午更好。我上午忙。
A|There’s a showing at three forty-five.|三点四十五有一场。
B|That works. Shall we meet outside at half past three?|可以。我们三点半在外面见好吗？
A|Perfect. I’ll send you the cinema address.|好。我把电影院地址发给你。
B|Thanks. Let me know how much I owe you for the ticket.|谢谢。告诉我票钱该给你多少。
`);
d('social-03','讲述一次经历','社交与休闲','进阶','verb-forms,verbs-daily,connections','用过去时讲事情，用连接词交代转折和结果。','have you ever...? 问经历~具体过去事件用过去时~although / because / so 建立逻辑','说去年第一次独自旅行，虽然紧张但很享受。=>I travelled alone for the first time last year. Although I was nervous, I enjoyed it.~问对方旅途中遇到什么问题。=>Did you have any problems during the trip?',`
A|Have you ever travelled alone?|你独自旅行过吗？
B|Yes. I went to Lisbon last year.|有。我去年去了里斯本。
A|How was it?|感觉怎么样？
B|At first I felt nervous because I didn’t know anyone.|一开始很紧张，因为谁也不认识。
A|Did that change?|后来有变化吗？
B|Yes. I joined a walking tour and met some friendly people.|有。我参加了步行游，认识了一些友好的人。
A|Would you do it again?|你还会再去独自旅行吗？
B|Definitely. Although I got lost once, I really enjoyed the freedom.|当然。虽然迷路过一次，但我很享受那种自由。
`);
d('social-04','比较选项并达成共识','社交与休闲','进阶','comparison,connections,adjectives','同时比较价格、距离、舒适度，作共同决定。','closer / quieter / less expensive 比较维度~not as...as 表达差异~both / neither 汇总选择','比较两个酒店：A更近，B更便宜。=>Hotel A is closer, but Hotel B is cheaper.~提出如果差价不大就选更安静的。=>If the price difference is small, let’s choose the quieter one.',`
A|Should we go to the beach or the mountains this weekend?|周末我们去海边还是山区？
B|The beach is closer, but it might be crowded.|海边近一些，但可能人很多。
A|The mountains would be quieter. Are they much more expensive?|山区会安静些。会贵很多吗？
B|Not really. The accommodation costs about the same.|不算。住宿费用差不多。
A|What about the journey?|路程呢？
B|It’s an hour longer, and there are fewer trains.|多一小时，而且火车班次更少。
A|I don’t mind that. I’d prefer somewhere peaceful.|我不介意。我更想去安静的地方。
B|Me too. Let’s check the weather before we book.|我也是。订之前我们先查天气吧。
`);
d('learn-01','制定学习安排','学习与数码','基础','calendar,duration,verbs-work','确定可执行的学习时间、材料与复习安排。','for twenty minutes 练习时长~every day / twice a week 频率~review before adding new material 复习后再加新内容','说每天练二十分钟，每周复习两次。=>I practise for twenty minutes every day and review twice a week.~提出先掌握一个对话再增加新材料。=>Let’s practise one dialogue well before adding new material.',`
A|How much time can you spend on English each day?|你每天能花多少时间学英语？
B|About twenty minutes, usually after dinner.|大约二十分钟，通常在晚饭后。
A|Would you rather practise listening or speaking first?|你更想先练听力还是口语？
B|Both, but I want to use what I learn in conversations.|都想，不过我想在对话里用上学到的内容。
A|Let’s start with one short dialogue and a few useful expressions.|我们先从一个短对话和几个实用表达开始。
B|Should I learn a new one every day?|我应该每天学一个新的吗？
A|Not necessarily. Review first, then try changing the details yourself.|不一定。先复习，再试着自己更换细节。
B|Good idea. I’ll practise the same situation with different times and numbers.|好主意。我会用不同的时间和数字练同一个场景。
`);
d('learn-02','请求反馈与纠正','学习与数码','基础','verbs-thinking,connections,verb-forms','主动请求具体反馈，理解并应用修改。','Could you tell me which part...? 要求具体反馈~say it again with... 带修改重说~did 后用原形','请求对方指出时态错误。=>Could you tell me where I used the wrong tense?~改正 I didn’t went 为正确句子。=>I didn’t go.',`
A|Could you listen to this sentence and give me some feedback?|你能听听这个句子并给我反馈吗？
B|Of course. Go ahead.|当然。说吧。
A|I didn’t went to the office yesterday.|我昨天没去办公室。（此句故意保留练习错误）
B|The meaning is clear. After didn’t, use go, not went.|意思很清楚。didn’t 后面用 go，不用 went。
A|So, I didn’t go to the office yesterday.|所以是：I didn’t go to the office yesterday。
B|Exactly. Can you make a question with the same idea?|对。你能用同一个意思造个疑问句吗？
A|Did you go to the office yesterday?|你昨天去办公室了吗？
B|That’s right. Now try it with last Friday.|正确。现在换成上周五试试。
`);
d('learn-03','设备故障与技术求助','学习与数码','进阶','verbs-daily,verbs-work,duration','描述故障、说明试过的操作，约定后续。','has stopped working 故障状态~have already tried 已尝试操作~turn it off and on again 代词放中间','说明无法连接网络，但已经重启过。=>I can’t connect to the internet, and I’ve already restarted the device.~询问下一步应该检查什么。=>What should I check next?',`
A|My laptop won’t connect to the office Wi-Fi.|我的笔记本连不上办公室无线网络。
B|Has it worked here before?|以前在这里能用吗？
A|Yes. It stopped connecting this morning.|能。今天早上开始连不上了。
B|Have you tried turning the Wi-Fi off and on again?|你试过关闭再打开无线网络吗？
A|Yes, and I’ve restarted the laptop. Neither helped.|试过，也重启了电脑。两个办法都没用。
B|Can your phone connect to the same network?|你的手机能连同一个网络吗？
A|It can. So the problem may be with the laptop.|能。所以问题可能在笔记本上。
B|Let’s check the network settings before changing anything else.|我们先检查网络设置，再改其他东西。
`);
d('learn-04','信息核对与安全操作','学习与数码','进阶','modals,connections,verbs-work','遇到不确定信息时暂停，核实来源与行动。','mustn’t 与 don’t have to 区分~before + 动作 确认先后~use a known contact 通过已知渠道核实','说明在核实前不要打开附件。=>Don’t open the attachment before you verify the sender.~询问是否必须今天完成更新。=>Do we have to finish the update today?',`
A|I received an email asking me to reset my password today.|我收到一封邮件，要求今天重置密码。
B|Were you expecting it?|你之前预期会收到这封邮件吗？
A|No. It says my account will close unless I click the link.|没有。邮件说如果不点链接，账号就会关闭。
B|Let’s check with support through the contact details we already have.|我们通过已有的联系方式向支持团队核实吧。
A|So I shouldn’t click the link yet?|所以我暂时不应该点链接？
B|Right. You don’t have to act before we’ve verified the request.|对。核实请求之前，你不必采取行动。
A|I’ll open the official site myself and check for notifications.|我自己打开官方网站，检查有没有通知。
B|Good. If the request is genuine, support can explain the next step.|好的。如果请求属实，支持团队能说明下一步。
`);
root.Dialogues = dialogues;
})(typeof window !== 'undefined' ? window : globalThis);
