/* Original bilingual serial. Append-only IDs preserve every previous learning record. */
(function(root){
'use strict';
const episodes=[];
const seasons=['搬到枫树街','三十天的约定','把小店开起来','第一次真正营业','一起解决麻烦','街区节的倒计时','真正上场','学会放手','留下来的理由'];
function episode(meta,expressions,questions,text){
 const [title,subtitle,category,goal,recap,task,sample]=meta.split('|');
 const pairs=text.trim().split('\n\n').map(p=>p.split('§'));
 const number=episodes.length+1,id=60+number;
 const phrases=expressions.split('~').map(row=>{const[en,zh,note]=row.split('|');return{en,quote:en,zh,note};});
 const checks=questions.split('~').map(row=>{const[q,a,b,c,why]=row.split('|');return{q,options:[a,b,c],answer:0,why};});
 episodes.push({id,title,subtitle:`第 ${number} 集 · ${subtitle}`,category,goal,edition:'serial-2026-11',format:'生活连载',level:number<=15?'beginner':number<=30?'intermediate':'advanced',source:'原创双语连载（虚构人物与事件）',units:['verbs-daily','verbs-work','connections'],series:{id:'maple-street',title:'枫树街的夏天',episode:number,season:Math.ceil(number/5),seasonTitle:seasons[Math.floor((number-1)/5)],recap,previousId:number===1?null:id-1,nextId:number===40?null:id+1},phrases,checks,retell:`不看原文，用 4–6 句讲清「${subtitle}」：人物想做什么、遇到什么麻烦、如何选择、结尾发生什么。尽量用本集两个表达。`,transfer:{prompt:task,sample},content:pairs.map(p=>p[0].trim()).join('\n\n'),translation:pairs.map(p=>p[1].trim()).join('\n\n')});
}
episode('The Wrong Door|敲错的门|日常生活|自我介绍、确认地址、向邻居求助。|Maya 为一份新工作搬到枫树街，故事从一个错误的门牌开始。|你刚搬家，向邻居说明名字、正确房号，并问哪里能买晚饭。|Hi, I’m new here. My name is Maya, and I live in flat four. Is there a place nearby where I can get dinner?',
'move in|搬进来|move in 描述入住；搬出去用 move out。~next door|隔壁|live next door 表示住在隔壁。~give me a hand|帮我一下|礼貌请求可用 Could you give me a hand?~come back|回来|come back to a place；come back home 不加 to。',
'Why does Maya knock on the wrong door?|She reads the number upside down.|She is visiting Leo.|She has lost her address.|她把钥匙牌上的 6 看成了 9。~What does Leo find under the counter?|A letter for all the residents.|Maya’s train ticket.|A new menu.|信封上写着致所有住户。',`
Maya stood outside number nine with two bags and a cold pizza. Her key did not work. A man opened the door. "I’m Leo. Do you live next door?" Maya looked at her key tag again. Six, not nine. "I move in today," she said. "Bad start."§玛雅提着两个包和一份冷披萨，站在九号门外。钥匙打不开门。一个男人开了门：“我是里奥。你住隔壁吗？”玛雅重新看钥匙牌。是六，不是九。“我今天搬进来，”她说，“开头就出错了。”

Leo smiled. "Could you give me a hand with this box first? Then I’ll show you." They carried cups down to his small café. A woman at the counter waved. "Rosa, your new tenant is here!"§里奥笑了：“先帮我搬一下这个箱子行吗？然后我带你去。”他们把杯子搬到楼下他的小咖啡馆。柜台旁的女士招手：“罗莎，你的新租客来了！”

Rosa took Maya upstairs. "Hot water is on the left. The rubbish bins are outside. Come back downstairs when you’re ready. We have soup." For the first time that day, Maya put down both bags. She had a room and someone to eat with.§罗莎带玛雅上楼：“热水在左边，垃圾桶在外面。收拾好再下来，我们有汤。”那天玛雅终于第一次放下了两个包。她有了住处，也有人陪她吃饭。

Downstairs, Leo picked up a letter from under the counter. It was not a bill for the café. On the front were four words: "To all the residents." Rosa stopped smiling.§楼下，里奥从柜台下面拿出一封信。它不是咖啡馆的账单。信封上写着几个字：“致所有住户。”罗莎收起了笑容。
`);
episode('Thirty Days|三十天|家庭关系|读懂期限、询问后果、约定讨论时间。|玛雅刚认识里奥和房东罗莎，一封写给全体住户的信让晚饭安静下来。|向室友说明公共房间可能关闭，约定周五七点讨论两个备选办法。|The shared room may close next month. Could we meet at seven on Friday and talk about two options?',
'by Friday|最迟周五|by 表示截止时间；until 表示持续到。~pay for|支付……的费用|pay for a room；pay someone 是付钱给某人。~find out|查明|find out what happened；强调获得信息。~write down|写下来|代词置中：write it down。',
'What may close in thirty days?|The shared room behind the café.|Maya’s bedroom.|The whole street.|信里说的是咖啡馆后面的公共房间。~What do they decide to do first?|Ask what the room costs.|Collect money immediately.|Cancel dinner.|他们先查明费用，再讨论怎么办。',`
"The shared room may close in thirty days," Rosa read. "We must answer by Friday." Maya looked through the glass door behind the café. Inside were a table, a broken chair and shelves of books. It seemed too small to matter.§“公共房间可能三十天后关闭，”罗莎读道，“我们必须最迟周五回复。”玛雅望向咖啡馆后面的玻璃门。里面有一张桌子、一把坏椅子，还有几架书。它小得似乎无关紧要。

"People come here when they need somewhere to meet," Leo said. "Ella edits her photos there. Ben helps children fix their bikes. I can’t pay for everything with coffee sales."§“人们需要地方见面时会来这里，”里奥说，“埃拉在里面处理照片，本帮孩子修自行车。我不能只靠卖咖啡支付所有费用。”

Maya pulled out a notebook. "Let’s find out how much it actually costs. Then we can make a choice." Rosa asked her to write down the questions. They agreed to meet the next evening. Nobody promised money yet.§玛雅拿出笔记本：“先查明实际费用，再作选择。”罗莎让她把问题写下来。他们约好第二天晚上见面。还没有人承诺出钱。

Before bed, Maya checked her phone. Her new manager had sent an address for Monday. The office was across town, and the meeting started at eight. Her first morning would need a better plan than her arrival.§睡前，玛雅查看手机。新经理发来了周一的地址。办公室在城市另一边，会议八点开始。她的第一个早晨可得比搬来时计划得更好。
`);
episode('The Bus That Went East|坐反方向的公交车|旅行出行|问路、确认方向、通知迟到。|公共房间有关闭风险；玛雅还得先应付周一的新工作。|你坐错车，问司机最近哪里换乘，并给同事说明预计迟到十分钟。|I’m going the wrong way. Where can I change buses? I’m sorry, I’ll be about ten minutes late.',
'wrong way|错误的方向|go the wrong way；问路先确认方向。~get off|下车|get off the bus；小汽车通常用 get out of。~on time|准时|on time 指按约定时间；in time 指来得及。~instead of|而不是|后接名词或 doing。',
'Why does Maya get off the bus?|It is going east, away from the office.|She wants breakfast.|The bus breaks down.|司机说明办公室在西边。~How does Maya help the team?|She asks which decision the meeting needs.|She promises a new app.|She cancels all future meetings.|她先确认会议需要作出的决定。',`
Maya caught the seven o’clock bus. Twenty minutes later, the river was still on her left. "Does this go to West Square?" she asked. The driver shook his head. "You’re going the wrong way. Get off at the next stop."§玛雅赶上了七点的公交车。二十分钟后，河还在她左边。“这车到西广场吗？”她问。司机摇头：“你坐反方向了，下一站下车吧。”

She called her manager, Nina. "I’m sorry. I won’t be on time. I can join by phone for ten minutes." Nina sent a link. Maya stood beside a bakery, listening through one earphone while warm air came through the open door.§她给经理妮娜打电话：“抱歉，我没法准时到。我可以先用手机加入十分钟。”妮娜发来链接。玛雅站在面包店旁，用一只耳机听会，暖空气从敞开的店门里飘出来。

People were arguing about a long list of customer complaints. Maya asked, "Which decision do we need today?" Instead of discussing every complaint, they chose the three they needed to understand first. Nina asked Maya to organise the interviews.§大家正为一长串客户投诉争论。玛雅问：“我们今天需要作出什么决定？”他们没有逐条讨论，而是选出最需要先了解的三条。妮娜让玛雅安排访谈。

That evening, Maya brought bread to the café meeting. Ben was already there with a calculator. On his paper was a number much larger than she expected.§当晚，玛雅带着面包来咖啡馆开会。本已经拿着计算器坐在那里。他纸上的数字比她预想的大得多。
`);
episode('A Number Nobody Liked|没人喜欢的数字|购物消费|询问费用、区分总额与每人分摊。|玛雅坐错车但顺利接上工作；晚上，本带来了公共房间的费用清单。|向朋友解释月租是六百，总预算八百；不要把预算说成每人的费用。|The rent is six hundred a month. Our total budget is eight hundred, not eight hundred each.',
'add up|加总|add up the costs；add them up。~at least|至少|at least 表示下限；at most 表示上限。~share the cost|分摊费用|share the cost with someone。~for now|暂时|说明当前安排，保留之后调整的可能。',
'How much do they need each month?|Eight hundred pounds in total.|Eight hundred pounds each.|Thirty pounds in total.|六百房租加两百其他支出，总共八百。~What does Ella suggest?|Ask people how they would use the room.|Buy a new coffee machine.|Close the café.|她建议先问实际使用者。',`
Ben put the paper in the middle of the table. "Six hundred for rent. About two hundred for power, cleaning and insurance. Add up everything, and we need at least eight hundred a month." Maya checked the total twice. It did not change.§本把纸放到桌子中间：“房租六百。电费、清洁和保险大约两百。加起来，我们每月至少需要八百。”玛雅把总数核对了两遍。结果没有变化。

"We could share the cost," Rosa said. Leo shook his head. "We’ve done that before. The same three people always pay." Nobody wanted another promise that would last only a month. They needed a way for the room to support itself.§“我们可以分摊，”罗莎说。里奥摇头：“以前试过，总是同三个人付钱。”没人想要一个只能维持一个月的承诺。他们需要让房间能够自行维持开支。

A woman carrying a camera came in. "Ella," she said to Maya. "Before you sell anything, ask people what they’d actually come for." For now, they would keep their money and collect answers. Maya recognised a familiar problem from work.§一位背着相机的女士走进来，向玛雅介绍自己叫埃拉。“先别卖东西，问问大家究竟会为了什么来。”暂时，他们先不出钱，而是收集回答。玛雅发现这与工作里的问题很相似。

Ella opened a folder of old photographs. In one picture, the room was full of people. "I know where we should start," she said. A small boy in the photograph was holding a bicycle wheel.§埃拉打开旧照片文件夹。其中一张里，房间挤满了人。“我知道该从哪里问起，”她说。照片上，一个小男孩拿着自行车轮。
`);
episode('The Boy with the Wheel|拿着车轮的男孩|家庭关系|问需求、追问具体经历、提出邀请。|团队决定先问人们需要什么；埃拉找到了一张修车活动的旧照片。|邀请一个朋友参加周六活动，并追问他上次遇到问题时是怎么解决的。|Would you come on Saturday? Tell me about the last time you had this problem. What did you do?',
'used to|过去常常|used to do；与 be used to doing 区分。~look after|照看|look after someone；不可拆开。~once a week|每周一次|twice a week 每周两次。~sign up|报名|sign up for an activity。',
'Why did Sam stop coming?|The repair sessions stopped.|He moved abroad.|He no longer had a bike.|修车活动停办，所以他没有再来。~What do twelve people do?|Sign up for a trial Saturday.|Buy annual membership.|Donate bicycles.|十二个人报名参加试办活动。',`
The boy in Ella’s photograph was now taller than Ben. His name was Sam. "I used to come every Saturday," he said. "Ben showed me how to fix a flat tyre. Then the sessions stopped." He still rode the same blue bike.§照片里的男孩现在比本还高。他叫山姆。“以前我每周六都来，”他说，“本教我修漏气的轮胎。后来活动停了。”他还骑着那辆蓝色自行车。

His mother worked weekends. The room had been somewhere safe to go while his grandfather helped look after him. "I didn’t come for coffee," Sam said. "I came because I could make something work again."§他妈妈周末要工作。爷爷帮忙照看他时，这个房间曾是一个安全的去处。“我不是为了咖啡来的，”山姆说，“我是因为能在这里把东西修好才来。”

They spoke to eleven more neighbours. Several wanted help with small repairs. Others wanted somewhere to practise English once a week. Maya made two lists, then invited people to sign up for one trial Saturday. Twelve names appeared before dinner.§他们又问了十一个邻居。有几个人希望有人帮忙做小修理，另一些人想每周找个地方练英语。玛雅列出两张清单，邀请大家报名参加一个周六的试办活动。晚饭前就有了十二个名字。

Leo counted his chairs. Eight. Rosa counted the working lamps. Two. "A trial Saturday," Ben said, looking around, "still needs a room people can sit in." Something dripped into the bucket behind him.§里奥数了数椅子，八把。罗莎数了数能用的灯，两盏。“试办一个周六，”本环顾四周，“也得先有个能让大家坐下的地方。”他身后的水桶里，水滴落了下来。
`);
episode('The Bucket in the Corner|角落里的水桶|日常生活|报告维修问题、确认处理范围。|十二人报名了试办活动，但公共房间的角落正在滴水。|给房东描述漏水的位置、开始时间和已经采取的措施。|Water is dripping near the window. It started this morning. I’ve put a bucket underneath it. Could someone check it today?',
'turn off|关闭|turn off the power；turn it off。~deal with|处理|deal with a problem；过去式 dealt。~in the meantime|与此同时；在此期间|等待主要事情解决时说明可做的事。~as soon as|一……就……|表示将来时，从句通常用现在时。',
'What is causing the drip?|A loose connection on a water pipe.|A broken coffee cup.|Rain through the roof.|维修人员查出是水管接头松动。~What must they buy?|A replacement part and safer chairs.|A new roof.|A large television.|维修零件与安全椅子成为下一步。',`
The next morning, Rosa called a repair service. "Water is dripping beside the back window. We noticed it last night." Ben moved the lamp and turned the power off in that corner. They would not guess whether a wet plug was safe.§第二天早上，罗莎打电话给维修公司：“后窗旁在滴水，昨晚发现的。”本移开台灯，关掉了那个角落的电源。他们不打算凭猜测判断湿插头是否安全。

The plumber found a loose connection on a pipe. It was not the roof. "I can deal with this tomorrow, as soon as the part arrives," she said. Rosa asked for the price in writing before agreeing. The repair was smaller than they feared.§水管工发现是水管接头松动，不是屋顶漏水。“零件一到，明天就能处理，”她说。罗莎同意之前，请她先给一份书面报价。维修规模比大家担心的小。

In the meantime, Maya and Sam cleaned the shelves. They found three chairs with loose legs. Ben put a red label on each one. Nobody would use them until he had checked them. The trial was now six days away.§等待期间，玛雅和山姆清理了书架。他们发现三把椅子的腿松了。本给每把都贴上红标签，检查之前谁都不能坐。距离试办活动只剩六天。

Leo handed Maya a shopping list. "Can you help me compare prices? We need the pipe part, four chairs and enough food for twelve people." The money in the jar would not cover all three.§里奥递给玛雅一张采购清单：“能帮我比比价吗？需要水管零件、四把椅子，还有十二个人的食物。”罐子里的钱不够同时买这三样。
`);
episode('Four Chairs, One Receipt|四把椅子，一张小票|购物消费|比较价格、确认成色与退货条件。|水管可以修好，但活动的椅子与食物都还没有着落。|购买二手桌子时询问尺寸、损坏处、运输费和是否能退。|What are the dimensions? Is anything damaged? Does the price include delivery, and can I return it if it doesn’t fit?',
'second-hand|二手的|second-hand furniture；furniture 不可数。~fit in|放得下|fit in the room；也可表示融入群体。~on sale|促销中|与 for sale（待售）区分。~keep the receipt|保留小票|退换前先确认商家的具体条件。',
'Why do they choose the used chairs?|They are sturdy and fit the room.|They match the wall colour.|They are the cheapest without inspection.|他们检查了椅子，并测量了房间。~What is wrong with the food order?|It is booked for Sunday.|It has no receipt.|It includes chairs.|取餐单写的是周日。',`
At the furniture shop, Maya saw four bright chairs on sale. Leo checked the price and stepped back. "We still need food." Across the road, a second-hand shop had four plain wooden chairs for less than half as much.§家具店里有四把鲜艳的促销椅子。里奥看完价格退了一步：“还得留钱买食物。”街对面，一家二手店有四把普通木椅，价格不到一半。

They checked each leg and measured the seats. Would they fit in the room without blocking the door? Leo called Ben with the measurements. The chairs were sturdy, and Ben could collect them in his van. They did not need to pay for delivery.§他们检查椅腿、测量座位。放进房间会不会挡门？里奥打电话把尺寸告诉本。椅子很结实，本可以开货车来取，不需要付运费。

"Keep the receipt," the assistant said. "You have seven days to bring them back if there’s a problem." Maya photographed it as well. With the money left, they ordered soup and bread from a nearby kitchen.§“保留小票，”店员说，“有问题可以在七天内拿回来。”玛雅还拍了照片。用剩下的钱，他们在附近的厨房订了汤和面包。

That evening, Leo read the order confirmation aloud. Twelve portions. Collection at eleven. Sunday. They looked at each other. Their guests were coming on Saturday.§当晚，里奥大声读订单确认：十二份，十一点取餐，星期日。两人互相看了一眼。客人可是星期六来。
`);
episode('Saturday, Not Sunday|是周六，不是周日|工作协作|纠正预订、核对时间、达成明确确认。|椅子买好了，但活动餐食订错了日期。|打电话把预约从周日改到周六，重复确认日期、时间与人数。|Could we move our booking from Sunday to Saturday? That’s Saturday the twelfth, at eleven, for twelve people. Could you confirm that by email?',
'mix up|弄混|mix up two dates；mix them up。~make sure|确保；核实|make sure that...；make sure to do。~in writing|书面地|ask for confirmation in writing。~work out|想出；安排妥当|work out a plan；具体含义取决于语境。',
'What can the kitchen provide on Saturday?|Bread, but not soup.|All twelve meals.|Nothing at all.|厨房能提前准备面包，但做不了汤。~Who offers to help cook?|Rosa.|Nina.|The furniture assistant.|罗莎愿意用自己的食谱做汤。',`
Leo called the kitchen before it opened. "I think we mixed up the dates. Could you change our order to Saturday?" The woman checked. "I can do the bread. I can’t do twelve portions of soup that morning." The mistake was theirs, not hers.§厨房还没营业，里奥就打了电话：“我们可能把日期弄混了，能改到周六吗？”对方查了订单：“面包可以，那天早上做不了十二份汤。”错在他们自己，不在对方。

Maya asked for the new bread order in writing. "Let’s make sure we all mean the same Saturday." She put the date, time and collection address in one message. Leo replied to confirm, then printed it. A vague "see you then" had cost them enough.§玛雅请对方书面确认新的面包订单：“确保大家说的是同一个周六。”她把日期、时间和取餐地址放进一条消息。里奥回复确认后打印了下来。含糊的“到时见”已经让他们吃过亏。

"We can work out the soup," Rosa said. She had a recipe for six people. Maya opened a calculator. "We need twice that, but let’s check the pot before buying twice everything." It held only eight portions.§“汤的事可以想办法，”罗莎说。她有一个六人份食谱。玛雅打开计算器：“得做双倍，但买双倍食材之前先看看锅。”那口锅只能装八份。

They borrowed a second pot from Ella. Attached to its handle was a note: "One guest has a food allergy. Did anyone ask which one?"§他们向埃拉借了第二口锅。锅柄上贴着便签：“有位客人食物过敏。有人问过具体对什么过敏吗？”
`);
episode('What Is in the Soup?|汤里有什么|购物消费|询问饮食限制、读配料、说明不确定性。|餐食日期已纠正，埃拉提醒团队有位客人食物过敏。|订餐时说明过敏原，询问配料与制作条件；不知道时明确说需要确认。|I have a nut allergy. Could you check the ingredients and ask the kitchen about preparation? I need to confirm it before ordering.',
'be allergic to|对……过敏|allergic 后用 to；具体过敏原须核实。~leave out|省去；不放|leave out an ingredient；leave it out。~check with|向……核实|check with the guest / kitchen。~just in case|以防万一|描述预备措施，不代表已消除风险。',
'What do they do before deciding on the meal?|Check with the guest about her needs.|Guess from the recipe.|Remove the label.|他们直接联系客人确认具体需求。~What arrives during cooking?|A request for six more places.|A new table.|A refund for every chair.|有人询问能否再多来六个人。',`
Ella called the guest, Priya. "What do we need to know about your food allergy?" Priya explained that she was allergic to nuts. Removing visible nuts would not be enough. They needed to check how the food was prepared too.§埃拉给客人普莉娅打电话：“你的食物过敏有哪些需要我们了解的？”普莉娅解释自己对坚果过敏。只挑出看得见的坚果还不够，也要确认制作过程。

Rosa read every ingredient label. "We can leave out the cream, but that doesn’t answer the nut question," she said. They would check with Priya before deciding what they could safely offer. Nobody wanted a friendly guess to sound like a promise.§罗莎逐一看配料表：“我们可以不加奶油，但这没有回答坚果的问题。”他们决定先与普莉娅确认，再判断能提供什么。没人希望善意的猜测听起来像保证。

Priya preferred to bring her own lunch this time and join the repair activity. They agreed on a separate place for her food. Maya wrote down the arrangement just in case someone else served lunch. The plan now matched what the guest had actually asked for.§这次普莉娅更愿意自己带午饭，来参加修理活动。他们约好单独放她食物的位置。玛雅把安排写下来，防止换人分餐时不清楚。计划终于对应上客人实际提出的需要。

While the soup cooled, Sam checked the booking messages. "Someone wants to bring six more people," he said. Twelve guests, six extra, twelve chairs. Maya reached for the calculator again.§汤冷却时，山姆查看报名消息：“有人还想多带六个人。”十二位客人，再多六位，只有十二把椅子。玛雅又拿起了计算器。
`);
episode('Twelve Seats|十二个座位|工作协作|说明容量、礼貌拒绝、提供替代安排。|食物安排已与客人确认，但试办活动突然多了六个报名者。|活动已满，向朋友说明原因，并提供候补或下一场两个选择。|We’re full this Saturday, and we can’t add chairs safely. I can put you on the waiting list or reserve a place next week.',
'run out of|用完|run out of seats / time。~take turns|轮流|take turns doing something。~waiting list|候补名单|put someone on the waiting list。~rather than|而不是|说明在两种做法之间的选择。',
'How do they handle the extra guests?|Offer a later session.|Put chairs in the doorway.|Ignore their messages.|他们提供下午第二场。~What does Rosa receive after the trial?|An offer to rent the room to someone else.|A free holiday.|A new recipe.|另一位租户希望租下房间。',`
"We can’t put chairs in the doorway," Ben said. "And we’ll run out of time if eighteen people bring broken things at once." Maya wrote to the new guests. Rather than squeeze everyone in, they would offer another session at two.§“不能把椅子摆在门口，”本说，“十八个人同时拿东西来修，时间也不够。”玛雅给新客人回消息。他们不打算硬挤，而是在下午两点再开一场。

Two guests chose the afternoon. Four joined a waiting list for next week. Sam made a sign asking people to take turns at the repair table. Nobody had to explain the same rule every ten minutes. The first Saturday began with a kettle that would not switch on.§两位客人选了下午，四位加入下周候补名单。山姆做了一张告示，请大家轮流使用维修桌。这样就不用每十分钟重复规则。第一个周六以一只打不开的水壶开始了。

By four, they had checked six items and shared lunch. They had not fixed everything, but people knew what to try next. Leo counted the payments. Enough for ingredients and a little towards rent. It was a beginning, not a business yet.§下午四点，他们检查了六件物品，还一起吃了午饭。虽然没有全部修好，但大家知道接下来能尝试什么。里奥清点费用：够食材钱，还能补一点房租。这是起步，还称不上能维持经营。

Rosa’s phone rang as they cleaned up. Someone else wanted to rent the room, starting next month. Their quiet trial now had competition.§收拾时，罗莎的电话响了。另一个人想从下个月开始租这个房间。他们低调的试办，现在遇到了竞争。
`);
episode('The Other Offer|另一份报价|工作协作|了解条件、区分报价与承诺。|第一场活动顺利结束，另一位租户却提出租下公共房间。|询问合作提议的期限、付款方式和退出条件，再约定答复时间。|Before we decide, could you explain the payment schedule and cancellation terms? We’ll give you an answer by Friday.',
'take over|接手|take over a room / responsibility。~give up|放弃|give up doing；give it up。~depend on|取决于|depend on attendance / payment。~in advance|提前|pay in advance；说明具体提前多久。',
'What does the other renter want?|A private office with no public sessions.|To join the repair class.|To buy Leo’s café.|新报价把房间用于私人办公室。~What must the team prepare?|A realistic one-month proposal.|A promise of permanent free access.|A new rental building.|团队争取一个月的试行机会。',`
The other offer was simple: a private office, paid in advance. No evening groups, no weekend repairs. Rosa could stop worrying about bills. "I haven’t agreed," she told the others. "But I can’t keep losing money."§另一份报价很简单：私人办公室，提前付租金。没有晚间小组，也没有周末维修。罗莎可以不用再担心账单。“我还没答应，”她说，“但不能一直亏钱。”

Maya wanted to say they would take over everything. She stopped. Their income would depend on people returning, and they had run only one Saturday. A large promise would not make eight hundred pounds appear every month.§玛雅很想说他们会接手一切，但忍住了。他们的收入取决于客人是否再来，而目前只办过一个周六。承诺说得再大，也不会让每月八百镑自动出现。

"Don’t give up yet," Ella said. "Ask for one month, with a limit on the loss. If it doesn’t work, we stop." Rosa agreed to read a proposal on Friday. She needed numbers, responsibilities and a clear end date.§“先别放弃，”埃拉说，“争取试一个月，规定亏损上限。行不通就停止。”罗莎答应周五看方案。她需要数字、分工，以及明确的结束日期。

Maya opened a blank document. Before she wrote a title, her manager called. The customer interviews were due the same Friday. She had said yes to two jobs with one deadline.§玛雅打开空白文档。标题还没写，经理就打来电话。客户访谈报告也要同一个周五交。她接下了两件截止时间相同的工作。
`);
episode('Two Deadlines|两个截止日期|工作协作|说明工作量、协商分工、避免过度承诺。|团队要提交一个月试行方案；玛雅的工作报告也在周五到期。|向同事说明两项工作冲突，提出先完成核心结论、另请人核对数据的安排。|I can finish the main findings by Friday. Could you check the figures? If I take both parts, I’ll need another day.',
'set aside|留出|set aside time for something。~focus on|专注于|focus on doing / a task。~hand over|交接|hand over the notes to someone。~let someone know|告知某人|know 用原形；let me know。',
'What does Maya ask the team to do?|Share the proposal work.|Wait until she does everything.|Cancel the interviews.|她分配了费用、照片和报名统计。~What is missing from the draft budget?|The value and limits of volunteer time.|All food costs.|The rent figure.|本提醒志愿者时间也有限。',`
Maya tried writing both documents after work. At midnight, each was half finished. In the morning, Nina asked why the interview summary had no conclusion. Maya explained the conflict. "I should have let you know earlier," she said.§玛雅想下班后把两份文档都写完。午夜时，两份都只完成一半。早上，妮娜问为什么访谈总结没有结论。玛雅说明了冲突：“我应该早点告诉你。”

Nina helped her set aside two quiet hours to focus on the customer findings. The café proposal was not company work. Maya needed to do it in her own time and share the tasks. Being helpful did not mean being available for everything.§妮娜帮她留出两小时专注整理客户结论。咖啡馆方案不属于公司工作，玛雅得用自己的时间，并把任务分给大家。愿意帮忙，并不意味着所有事都随时能接。

That evening, Maya asked Leo for sales figures, Ella for booking numbers and Ben for repair costs. She would hand over the draft for them to check together. Three people immediately corrected things she would have guessed wrong.§当晚，玛雅向里奥要销售数据，向埃拉要报名人数，向本要维修费用。她会把草稿交给大家一起核对。三个人立刻纠正了她原本可能猜错的内容。

Ben tapped the volunteer column. "You’ve priced the soup," he said. "But whose Saturday are we spending?" He had another job, and two Saturdays were all he could offer.§本点了点志愿者那一栏：“汤的价格你算了，但我们花的是谁的周六？”他还有另一份工作，只能拿出两个周六。
`);
episode('The Cost of a Saturday|一个周六的成本|工作协作|协商排班、表达边界、确认可用时间。|玛雅开始分工，本提醒大家：志愿者的时间也有限。|说明自己每月能参与两次、每次两小时，并询问谁能接替其余班次。|I can help twice a month, for two hours each time. Who could cover the other sessions?',
'be available|有空；可参与|be available on Saturday / for two hours。~cover a shift|代一个班|cover someone’s shift。~burn out|精疲力竭|避免用持续加班弥补长期缺人。~cut back|减少|cut back on hours / spending。',
'What changes in the proposal?|Fewer sessions with named people for each shift.|Every volunteer works daily.|Ben works without a break.|排班按实际可用时间缩减。~What does the poster accidentally promise?|Free repairs for everyone.|A two-hour session.|A small booking fee.|海报写了人人免费维修。',`
"I’m available on the first and third Saturdays," Ben said. "I can teach, but I can’t promise to fix every item." Ella could cover a shift on Wednesday evenings. Leo already worked six days a week. His spare time was not an unlimited resource.§“我第一个和第三个周六有空，”本说，“可以教，但不能保证每件东西都修好。”埃拉能负责周三晚上。里奥本来就每周工作六天，他的空闲时间不是无限的。

They decided to cut back the schedule. Two repair Saturdays and four conversation evenings would be the first month’s offer. Sam would help with bookings, accompanied by an adult. Every shift had a name and a backup contact.§他们决定缩减安排：第一个月开两场周六维修活动、四场晚间会话。山姆在成年人陪同下协助报名。每个班次都有负责人和备用联系人。

"If we burn out in a month, we haven’t saved anything," Rosa said. The revised budget earned less, but the team could actually deliver it. They added a stopping rule: review after four weeks, with no automatic promise to continue.§“一个月就累垮，什么也没保住，”罗莎说。修改后的预算收入少了，但团队确实能做到。他们加了停止条件：四周后复盘，不自动承诺继续。

Ella designed a poster using an old file. At the top, in very large letters, were the words "FREE REPAIRS FOR EVERYONE." She had already sent it to the neighbourhood group.§埃拉用旧文件做了一张海报。最上方用大字写着：“人人免费维修。”她已经把它发到了邻里群。
`);
episode('A Promise on a Poster|海报上的承诺|科技与信息|纠正公开信息、说明服务范围。|团队刚明确排班，埃拉却误发了写着“人人免费维修”的海报。|更正活动通知：有报名费、提供检查指导、不能保证全部修复。|Correction: there’s a small booking fee. We offer checks and guidance, but we can’t guarantee every item can be repaired.',
'point out|指出|point out a mistake；point it out。~take down|撤下|take down a poster / online notice。~make it clear|明确说明|make it clear that...。~on behalf of|代表|on behalf of the team。',
'What does Ella do after noticing the mistake?|Posts a correction and contacts those who booked.|Quietly deletes the image only.|Blames the guests.|她撤下旧版，并主动联系报名者。~What does Rosa agree to?|A four-week trial with a loss limit.|Free use forever.|Selling the café.|罗莎接受有亏损上限的四周试行。',`
Leo pointed out the headline before breakfast. Ella felt her face go hot. "I used last year’s poster." Twelve people had already shared it. Taking down the original would not take down their copies. They needed a correction people could recognise.§早饭前，里奥指出了海报标题。埃拉脸一下热了：“我用了去年的海报。”已经有十二个人转发。撤下原图不会让别人的副本消失，需要发一条让人认得出的更正。

On behalf of the team, Ella posted the corrected date, fee and service limits. She contacted everyone who had booked. "We’ll check items and explain options. We can’t guarantee a repair." Two people cancelled. She returned their payments without arguing.§埃拉代表团队发出正确的日期、费用和服务范围，并联系每位报名者：“我们会检查物品、说明可选办法，但不能保证修好。”两个人取消，她没有争辩，退回了费用。

Rosa read the proposal that evening. "You’ve made it clear what you can do," she said. She agreed to four weeks, with a fixed loss limit. The private office offer would wait until the review. Everyone signed beside their own responsibility.§当晚，罗莎看了方案：“你们把能做什么说清楚了。”她同意试行四周，设定固定的亏损上限。私人办公室的报价等复盘后再考虑。每个人在自己的职责旁签了字。

To celebrate, Leo made tea. His card machine flashed an error just as a customer tried to pay the booking fee. "Not today," he whispered. The screen went dark.§为了庆祝，里奥泡了茶。一位客人正要付报名费时，刷卡机显示报错。“别偏偏今天出事啊，”他低声说。屏幕黑了。
`);
episode('When the Screen Goes Dark|屏幕黑掉的时候|科技与信息|报告设备故障、提供替代付款方式。|罗莎批准四周试行；庆祝时，刷卡机突然坏了。|向顾客解释刷卡暂不可用，提供现金或稍后付款，并确认不会重复扣费。|Our card machine is down. You can pay cash or wait until it’s working. Let’s check whether the first payment went through before trying again.',
'go through|成功完成|a payment goes through；也可指仔细检查。~charge twice|重复收费|charge someone twice for something。~keep a record|留存记录|keep a record of payments。~back up|备份|back up the file；名词 backup。',
'What do they check before retrying a payment?|Whether the first payment went through.|The customer’s photo album.|The poster colour.|避免对顾客重复扣费。~What does the lost booking reveal?|They need a usable backup.|They need more advertisements.|The chairs are too large.|一笔报名没有同步，暴露备份问题。',`
The customer held up her phone. "It says the payment is pending." Leo did not ask her to try again. They checked whether it had gone through before doing anything that might charge her twice. Maya wrote down the time and amount, not the customer’s full card details.§顾客举起手机：“上面写着付款处理中。”里奥没有让她再刷一次。他们先核实交易是否成功，防止重复扣费。玛雅只记录时间和金额，没有记录顾客完整卡号。

They offered cash or payment later. For bookings, Leo used a numbered paper list and gave each customer a receipt. He would keep a record and match it with the machine’s report when service returned. Nobody had to buy something immediately to keep a place.§他们提供现金或稍后付款两种选择。报名时，里奥使用有编号的纸质名单，给每位客人收据。设备恢复后，再用记录核对交易报告。客人不必当场付款才能保留名额。

The machine worked again after lunch. One online booking was missing from their tablet. Sam found it in an email. "Do we back up this list?" he asked. The last exported copy was three weeks old. A system was only useful if they could recover it.§午饭后，刷卡机恢复了。平板上少了一笔线上报名，山姆在邮件里找到了。“这份名单备份过吗？”他问。最近一次导出已经是三周前。系统得能恢复，才算真正有用。

Maya suggested a simple backup routine. Then her own phone vibrated: her first customer interview would be face to face, and the customer was already waiting.§玛雅提出一套简单的备份习惯。接着，她自己的手机响了：第一场客户访谈要当面进行，而客户已经到了。
`);
episode('Tell Me About Yesterday|说说昨天发生了什么|工作协作|通过具体经历了解问题，避免诱导提问。|支付问题解决后，玛雅赶去做客户访谈。|朋友抱怨某个工具不好用，先请他描述最近一次使用经过，再问影响。|Tell me about the last time you used it. What were you trying to do? Where did you get stuck, and what happened next?',
'walk me through|带我逐步了解|walk someone through a process。~get stuck|卡住|get stuck on a step / in traffic。~follow up|追问；跟进|follow up on a request。~jump to conclusions|过早下结论|证据不足时避免直接推断原因。',
'What does Maya ask the customer to describe?|The last time an order went missing.|An imaginary perfect product.|How to design every screen.|她围绕上一次具体经历提问。~What does Maya bring back to the café?|A way to ask about actual experiences.|A new payment machine.|A list of famous companies.|她把访谈提问方式带回团队。',`
Maya almost began with, "Would a better dashboard help?" Instead, she asked the customer to walk her through yesterday. He had been trying to find a missing order. He opened three pages, copied a number and called a colleague. The dashboard was not where he got stuck.§玛雅差点以“更好的仪表盘有帮助吗”开头。她改为请客户逐步讲讲昨天。他想找一笔丢失的订单，打开三个页面，复制一个编号，然后打电话给同事。卡住的地方并不在仪表盘。

"What happened after the call?" she asked. The order had arrived, but nobody had updated its status. Maya followed up with the warehouse worker. The problem was a missing handover between two teams. A prettier chart would not repair that.§“打完电话后发生了什么？”她问。订单其实到了，只是没人更新状态。玛雅又去向仓库员工追问，发现问题出在两个团队之间的交接。图表再漂亮也补不上这个环节。

At the café, she asked the others not to jump to conclusions about quiet evening bookings. "Let’s ask people what happened the last time they tried to come." Ella sent messages to three neighbours who had cancelled. Two replied immediately.§回到咖啡馆，她请大家先别急着判断晚间报名少的原因：“问问大家上次想来时实际发生了什么。”埃拉给三位取消过的邻居发消息，两个人马上回了。

Both wanted to attend. Neither could leave work before six thirty. Their conversation session started at six. The empty chairs suddenly had an explanation.§两个人都想来，但都没法在六点半前下班，而会话活动六点就开始。空着的椅子，忽然有了具体原因。
`);
episode('Half an Hour Later|晚半小时|日常生活|协商时间、表达限制、确认变更。|访谈发现，晚间活动开始太早，让想来的人赶不上。|把朋友聚会推迟半小时，同时确认末班车和每个人能待多久。|Could we start half an hour later? I can stay until nine, but I need to catch the last bus. Would that work for everyone?',
'get there|到达那里|get there 不加 to。~work for you|对你合适|Would seven work for you?~last bus|末班车|catch / miss the last bus。~from now on|从现在起|用于明确新规则的生效时间。',
'Why not start at eight?|Ella would miss the last bus home.|Nobody likes evenings.|The café has no lights.|埃拉还需赶回家的末班车。~What schedule do they agree on?|Half past six to eight.|Six to ten.|Eight to midnight.|团队兼顾到达时间与返程限制。',`
"Start at eight," Sam suggested. "Everyone can get there by then." Ella checked her bus timetable. "I can help, but I can’t miss the last bus home." Moving the time for one group could quietly make another group disappear.§“八点开始，”山姆提议，“那时大家都能到。”埃拉查看公交时刻表：“我可以帮忙，但不能错过回家的末班车。”为了照顾一群人而改时间，可能会让另一群人悄悄消失。

They asked about the earliest arrival and latest departure people could manage. Half past six to eight worked for most. "Would that work for you?" Maya asked Ella. She nodded. Rosa could close the room after the session, so Ella could leave on time.§他们询问大家最早能几点到、最晚几点走。六点半到八点对多数人可行。玛雅问埃拉：“这个安排对你合适吗？”她点头。活动结束后由罗莎锁门，埃拉就能准时离开。

From now on, every confirmation would show a start and finish time. They updated the sign, the booking page and the message template. Changing one place would not be enough. Ben put the new schedule beside the door.§从现在起，每条确认信息都写明开始和结束时间。他们更新了告示、报名页面和消息模板。只改一个地方不够。本把新时间表贴在门边。

At the next session, eight people arrived. A ninth stood outside looking at the entrance step. She was using a wheelchair. The room had a time that worked, but not yet an entrance that worked for everyone.§下一次活动来了八个人。第九个人站在外面，看着入口台阶。她坐着轮椅。时间已经合适了，入口却还没对每个人都方便。
`);
episode('The Step at the Door|门口那一级台阶|家庭关系|询问实际需要、协调无障碍参与方式。|调整后的晚间活动有人来参加，但门口的台阶挡住了一位客人。|邀请行动不便的朋友时，先确认入口、洗手间和他希望获得的帮助。|Could you tell me what would make the visit easier? I’ll check the entrance and toilet access before confirming the venue.',
'get in|进入|get in / get out；说明实际通行条件。~ask first|先询问|提供帮助前先问对方需要什么。~make room|腾出空间|make room for a person / wheelchair。~take into account|考虑到|take someone’s needs into account。',
'How does the group include Priya this evening?|Moves the session to the accessible front café.|Carries her without asking.|Asks her to wait outside.|他们先询问，再移到无台阶的前厅。~What do they need before changing the entrance?|Permission and a proper access assessment.|Only a wooden board.|A bigger poster.|长期调整需要许可与专业评估。',`
The guest was Priya, who had brought her own lunch to the trial. Ben stepped forward, then stopped. "How can we help you get in?" he asked. "Ask first," Priya said with a smile. "That’s a good start. Is the front café step-free?"§客人是试办时自带午饭的普莉娅。本走上前，又停下来：“我们能怎样帮你进去？”“先问一声，”她笑着说，“这就是个好开头。前面的咖啡馆没有台阶吗？”

It was. Leo moved two tables to make room, and the group met there that evening. Priya joined the conversation without anyone trying to lift her chair. She pointed out that the toilet and the route through the room mattered too, not just the door.§前厅确实没有台阶。里奥挪开两张桌子腾出空间，当晚小组就在前面活动。没人擅自抬轮椅，普莉娅参加了交流。她提醒大家，洗手间和室内通道也很重要，不只是门。

Rosa would ask for a proper access assessment before making permanent changes. They needed to take into account the building rules and different visitors’ needs. For now, booking messages clearly described the entrance and offered the front space when available.§罗莎决定在永久改动前先咨询专业的通行评估。他们需要考虑建筑要求和不同访客的需要。暂时，报名信息明确说明入口条件，并在前厅可用时提供那里作为替代空间。

Priya stayed after the others left. "I can help with the accounts," she said. "But first, why do these two totals disagree?" She turned Leo’s notebook towards him.§大家走后，普莉娅留了下来：“账务我可以帮忙。不过先说说，这两个合计为什么不一样？”她把里奥的本子转向他。
`);
episode('Money That Was Not Profit|收到的钱不都是利润|购物消费|区分收入、成本、预收款与可用余额。|团队开始改善参与条件，普莉娅检查账本时发现两个总额对不上。|向合伙人解释收款中有下月预订款，扣掉成本后才能算本月结余。|Some of this money is for next month’s bookings. After costs, this month’s balance is much smaller than the amount in the account.',
'set apart|单独分开|set apart money for a specific purpose。~belong to|属于|belong to someone；通常不用进行时。~break even|收支平衡|收入与成本相抵，不等于盈利。~so far|到目前为止|常与现在完成时搭配。',
'Why is the bank balance misleading?|It includes money for future sessions.|The bank has doubled it.|All costs are zero.|余额中含未来活动的预收款。~What is still needed to break even?|More repeat bookings.|A larger bank account.|A different notebook colour.|本月仍需要更多回头报名。',`
Leo showed Priya the bank balance. "We’re nearly there." She showed him the booking dates. Some payments belonged to next month. They could not spend that money on this month’s rent and still provide the sessions people had paid for.§里奥把银行余额给普莉娅看：“快够了。”她指着报名日期。有些款项属于下个月。不能把这笔钱用于本月房租，又指望还能兑现大家已经付费的活动。

Together, they set apart future payments and listed costs beside the right dates. Food, parts, rent and refunds all needed a place. Maya watched the apparent surplus shrink. The new total was disappointing, but at least it described the same month.§他们把未来收款分开，在对应日期列出成本。食物、零件、租金和退款，都要有位置。玛雅看着账面盈余缩小。新结果令人失望，但至少它统计的是同一个月份。

So far, Saturday repairs covered their direct costs. To break even overall, they needed more repeat bookings for evening sessions. Priya suggested asking past guests before spending money on more advertising. A returning guest was better evidence than a shared poster.§目前，周六维修活动能覆盖直接成本。整体要收支平衡，还需要晚间活动有更多回头报名。普莉娅建议，花钱宣传之前先问来过的客人。客人再次报名，比海报被转发更能说明问题。

Leo opened the feedback messages. One review had only two stars. "Friendly people," it began, "but I paid for something I didn’t get."§里奥打开反馈消息。一条评价只有两颗星。“人很友好，”开头写道，“但我付了钱，却没得到想要的服务。”
`);
episode('Two Stars|两颗星的评价|工作协作|处理投诉、复述诉求、提出补救。|账本显示仍需回头客；一条两星评价说服务与期待不符。|顾客投诉等待太久，先复述具体问题，再提出退款或重约的选择。|You expected help with your lamp, but waited an hour without an update. I’m sorry. Would you prefer a refund or a new appointment?',
'hear someone out|听某人把话说完|hear the guest out，不急着反驳。~look into|调查；了解|look into a complaint。~make up for|弥补|make up for lost time / a mistake。~get back to|回复|get back to someone by a stated time。',
'What disappointed the guest?|Nobody explained the wait or the service limits.|The soup was cold.|The room was too bright.|他等了一小时，却不清楚进度和维修范围。~What does the team change?|Checks the item at booking and gives wait updates.|Deletes the review.|Guarantees all future repairs.|他们增加预约前确认与等待更新。',`
The review was from a man with a lamp. Ben remembered explaining that its wiring needed specialist attention. The guest remembered waiting an hour and leaving with the same broken lamp. Both descriptions could be true. Maya called and asked to hear him out.§评价来自一位带灯来的先生。本记得解释过灯的线路需要专业处理。客人记得自己等了一小时，又带着同一盏坏灯离开。两种描述都可能真实。玛雅打电话，请他完整讲完。

She did not promise a repair. "I’ll look into why you weren’t given an update and get back to you tomorrow." He wanted the fee returned, not another appointment. Leo made the refund. Money could not make up for the wasted morning, but they could acknowledge it.§她没有承诺修好：“我会了解为什么没人告诉你进度，明天回复。”他想退费，不想重约。里奥退了钱。退款补不回浪费的上午，但他们可以承认问题。

They added two steps: ask about the item before accepting a booking, and tell waiting guests what was happening. Ben wrote examples of work they could not accept. Clear limits belonged at the beginning, not only after someone had paid and waited.§他们增加两步：接受预约前先问清物品情况；等待期间说明进展。本写出他们无法承接的工作示例。明确的边界应该放在最前面，而不是等人付钱、排队之后才说。

At the end of the call, the guest mentioned a street festival. "You should have a stall," he said. "Applications close tomorrow." Maya looked at the calendar. The review meeting was ten days away.§通话结束时，客人提到街区节：“你们该设个摊位，明天截止报名。”玛雅看向日历。距离复盘会议还有十天。
`);
episode('One Small Stall|一个小摊位|文化与艺术|说明活动目标、申请条件与成本。|团队改进投诉处理后，得知街区节摊位即将截止申请。|向朋友解释你们准备摆摊的目的、费用上限与需要提前确认的条件。|We want people to try a short session and book another visit. We can spend up to fifty pounds, but we need to check the stall rules first.',
'apply for|申请|apply for a stall / permission。~up to|最多；上限为|up to fifty pounds，不代表恰好五十。~draw people in|吸引人进来|draw someone in；过去式 drew。~come along|一起来；参加|邀请可用 Would you like to come along?。',
'What is the stall’s main goal?|Let people try a session and book a return visit.|Sell the café building.|Collect the most followers.|摊位要帮助人们体验并再次报名。~What threatens their preparation?|A forecast of heavy rain.|A shortage of posters only.|An office move.|预报中的大雨让准备面临变化。',`
The stall fee was thirty pounds. They could spend up to fifty including materials. Maya asked what success would look like. "A crowd," Sam said. "Ten people who actually come back," Priya replied. They decided to offer a short demonstration and take bookings, not repair everything outdoors.§摊位费三十镑，连材料最多花五十。玛雅问，怎样才算成功。“人多，”山姆说。“十个真正再来的人，”普莉娅回答。他们决定做短演示、接受报名，不在户外什么都修。

Ella applied for the stall after checking the organiser’s rules. No hot food without separate approval. No loose electrical leads across the walkway. Ben chose a mechanical bicycle demonstration. Leo would keep food inside the café rather than add another task.§埃拉核实主办方规则后提交了申请。热食需要另行许可，过道不能随意铺电线。本选择演示自行车的机械部件。里奥把食物留在咖啡馆里，不再另加一项任务。

Sam designed a game to draw people in: identify which bike part made a strange sound. Priya invited the disappointed lamp owner to come along. He replied with a thumbs-up. They had a reason to meet again that was not another argument about the review.§山姆设计了一个吸引人的游戏：辨认自行车哪个部件发出异响。普莉娅邀请那位不满意的灯具客人一起来，他回了一个赞。他们终于有了一个再次见面的理由，不必继续争论评价。

That night, Rosa checked the weather. Heavy rain was expected before the festival. Ben looked up at the repaired pipe, then towards the window.§那晚，罗莎查看天气。预报说街区节前会有大雨。本抬头看了看修好的水管，又望向窗户。
`);
episode('Rain at Three in the Morning|凌晨三点的雨|日常生活|描述突发情况、确认安全、联系负责人员。|街区节报名完成；暴雨在准备期间到来。|发现积水时说明地点、目前状况与谁已被联系，不猜测电气是否安全。|There’s water near the back entrance. We’ve kept people away and contacted the building manager. Could you tell us where to wait?',
'wake up|醒来|wake someone up 表示叫醒某人。~stay away from|远离|stay away from a wet electrical area。~get hold of|联系上|get hold of someone by phone。~until further notice|直到另行通知|表示当前限制持续有效。',
'Where does this water come from?|An overflowing drain outside.|The repaired pipe.|A soup pot.|积水来自外部排水口，不是之前的水管。~What do they do with the room?|Keep it closed pending a safety check.|Open it as usual.|Dry sockets with a hairdryer.|他们等待专业检查后再决定开放。',`
At three in the morning, water woke Rosa up. It was running under the back door. She called Leo and told him to stay away from the wet electrical area. He brought a torch, not a plug-in lamp. They got hold of the building manager.§凌晨三点，水声惊醒罗莎。水正从后门下面流进来。她给里奥打电话，让他远离潮湿的电气区域。他拿来手电筒，没有拿插电台灯。他们联系上了楼宇负责人。

The drain outside had overflowed. It was not the pipe repaired last week. Rainwater spread across the floor while the manager arranged professional help. Maya carried dry booking papers upstairs. Furniture could wait if moving it meant entering an unsafe area.§外面的排水口溢水了，不是上周修过的水管。负责人联系专业人员时，雨水漫过地板。玛雅把还干着的报名文件搬上楼。如果挪家具需要进入不安全的区域，就先不挪。

By daylight, the rain had slowed. The shared room stayed closed until further notice, pending a safety check. Leo put a notice on the front door and contacted that evening’s guests. He offered a refund or a later date, without promising when reopening would be possible.§天亮时，雨小了。公共房间等待安全检查，另行通知前保持关闭。里奥在前门贴告示，联系当晚客人，提供退款或改期，但没有承诺具体何时恢复。

Ella arrived with her camera bag. Her laptop had been on the lowest shelf. She stared at the wet case without opening it. The photos for the festival were on that machine.§埃拉背着相机包赶来。她的电脑原本放在最底层书架上。她盯着湿电脑包，没有打开。街区节用的照片都在那台电脑里。
`);
episode('The Only Copy|唯一的一份|科技与信息|说明数据损失、核查备份、调整交付。|公共房间因积水关闭；埃拉的电脑和街区节照片都受到影响。|文件丢失后，向同事说明已核实的备份、缺失部分和可以交付的替代版本。|The latest file is missing, but I have yesterday’s backup. I can deliver that version today and recreate the missing section tomorrow.',
'switch on|开机；打开|switch it on；潮湿设备交由专业人员处理。~recover from|从……恢复|recover files from a backup。~start over|重新开始|start over with an earlier version。~lose track of|忘了跟踪；搞不清|lose track of which copy is current。',
'What is safely recoverable?|Most photos from an online backup.|Every file, guaranteed.|Nothing at all.|她查到大部分照片有在线备份。~Which photos must be replaced?|Yesterday’s new portraits.|All photos from last year.|Every customer interview.|昨天新拍的人像没有同步。',`
Ella wanted to switch on the laptop to check her files. Ben asked her to leave the wet device alone and speak to a repair professional. They could check her online account from another computer. Trying one more button was not a recovery plan.§埃拉想开机检查文件。本请她先别动湿设备，交给专业维修人员。他们可以用另一台电脑查看在线账户。多按一次按钮，不等于有了恢复方案。

Most photographs could be recovered from an online backup. Yesterday’s portraits had not uploaded. Ella had lost track of which folder was synchronising. She listed the missing images before contacting anyone. It was a smaller problem than losing everything, but still real work.§大部分照片能从在线备份恢复。昨天的人像还没上传。埃拉搞不清究竟哪个文件夹在同步。她先列出缺失图片，再联系大家。虽然比全部丢失小得多，但仍需要重新做。

They would use older photos with permission and start over on three portraits. Sam offered his phone for the new pictures. Ella explained the change to the people photographed. An earlier photo was not automatically approved for a new poster.§他们会经许可使用旧照片，并重拍三张人像。山姆愿意用手机帮忙。埃拉向照片里的人解释用途变化。以前拍过的照片，并不自动意味着可以放到新海报上。

When Maya asked Sam to take a break, he said he was fine. Then he missed the chair as he sat down. Rosa put a hand on the table. "When did you last eat?"§玛雅让山姆休息，他说没事。可坐下时，他一下坐偏了。罗莎扶住桌子：“你上次吃东西是什么时候？”
`);
episode('Before Anyone Is a Hero|先照顾好自己|日常生活|说明不适、请求休息、重新安排任务。|埃拉找回大部分照片，忙着帮忙的山姆却没有按时吃饭。|身体不舒服时说明症状和开始时间，请同伴接替任务并联系合适帮助。|I’m feeling unwell, and it started this afternoon. I need to stop and sit down. Could you take over and help me contact someone?',
'feel unwell|身体不舒服|描述感受，不自行推断病因。~take a break|休息一下|take a break from doing something。~take care of|照顾；处理|take care of someone；具体含义取决于宾语。~ask for help|求助|ask someone for help。',
'How does the team respond to Sam?|Stops his work and contacts his mother.|Asks him to finish first.|Diagnoses him immediately.|他们让他停下，由家长处理后续。~What does the incident change?|They plan breaks and shorter shifts.|Sam must work alone.|Everyone skips lunch.|之后排班包含休息与缩短的班次。',`
Sam said he felt unwell and needed to sit down. Rosa stayed with him while Leo contacted his mother. Nobody tried to diagnose him from a skipped meal. His mother took care of what help he needed. The cleanup could wait.§山姆说自己不舒服，得坐下来。罗莎陪着他，里奥联系他妈妈。大家没有仅凭他没吃饭就判断病因。由他妈妈处理需要什么帮助，清理工作可以先等等。

Maya looked at the day’s plan. There were names beside jobs, but no breaks. She had treated every available hour as a working hour. "I should have asked when people could stop, not only when they could start," she said.§玛雅看向当天计划。任务旁写了人名，却没有休息时间。她把每个可用小时都当成能工作的时间。“我该问大家什么时候得停下来，而不只是几点能开始。”

They shortened the shifts and arranged someone to cover each break. Ben went home to sleep before returning. Ella bought lunch rather than taking on another cooking job. Asking for help was now part of the plan, not proof that someone had failed.§他们缩短班次，安排人接替休息时段。本先回家睡觉，之后再来。埃拉去买午饭，没有又接下做饭任务。求助现在成了计划的一部分，不再被视为谁没做好。

That afternoon, the inspector sent a report. The room needed several days to dry. The festival was in four days. They had to choose what could move, what could wait and what had to be cancelled.§下午，检查人员发来报告。房间还需要几天才能干。街区节四天后开始。他们必须决定：什么可以搬，什么能等，什么得取消。
`);
episode('The Parts We Could Keep|还能继续的部分|工作协作|调整范围、解释取消、提供选择。|公共房间还需晾干，街区节与已报名活动都临近了。|活动场地不可用，分别告诉朋友哪些保留、哪些改期、哪些退款。|The outdoor demonstration will go ahead. The indoor workshop is postponed. If the new date doesn’t work for you, we’ll refund your booking.',
'go ahead|继续进行|an event goes ahead；也可表示允许。~put off|推迟|put off a workshop；put it off。~call off|取消|call off the event；call it off。~make a difference|产生影响|说明具体对谁、在哪方面有影响。',
'What can go ahead?|The outdoor bicycle demonstration.|All indoor repairs immediately.|A hot-food stall without approval.|户外机械演示不依赖湿房间。~What worries Leo?|He thinks Maya is changing his café without listening.|He has too many holidays.|He dislikes all demonstrations.|里奥觉得咖啡馆正被他人安排。',`
Maya divided the bookings into three groups. The outdoor bicycle demonstration could go ahead. The indoor repair workshop would be put off. One private room booking had to be called off. Each group needed a different message, not the same vague apology.§玛雅把预约分成三组：户外自行车演示能继续；室内维修课改期；一场私人房间预订必须取消。三组需要不同的通知，不能都发同一句模糊道歉。

Guests could choose a new date or a refund. Maya listed who had answered and who still needed a call. A message marked "sent" did not mean a guest had read it. Ella helped reach two people who did not use the neighbourhood chat group.§客人可以选择新日期或退款。玛雅记录谁已经回复、谁还需要电话联系。显示“已发送”，不代表客人已经读到。埃拉帮忙联系两位不用邻里群的人。

Ben said the smaller plan would still make a difference. They could demonstrate the repair process without a full workshop. Leo stayed quiet as Maya moved café tables on her drawing. Finally he asked, "Did anyone ask whether I can run the café like that?"§本说缩小后的计划仍有价值，不开完整维修课，也能演示修理过程。玛雅在图上移动咖啡馆桌子时，里奥一直没说话。最后他问：“有人问过我，这样还能不能正常营业吗？”

Maya put down her pen. She had asked customers about their needs all week. She had not asked the man whose café they were rearranging.§玛雅放下笔。一周里，她一直在问客户需要什么，却没有问那个正被他们重新安排咖啡馆的人。
`);
episode('Whose Café Is It?|这是谁的咖啡馆|家庭关系|表达分歧、复述对方顾虑、重新协商。|玛雅忙着调整场地，却忽略了里奥正常经营的需要。|你和朋友对活动安排有分歧，先复述对方损失，再提出双方能接受的范围。|You’re worried this will disrupt your work. Have I understood correctly? Could we use only the back two tables and keep the counter clear?',
'speak up|说出想法|speak up about a concern；不只指提高音量。~leave room for|为……留出空间|leave room for normal customers。~meet halfway|各让一步|meet someone halfway。~on the same page|理解一致|确认各方知道同一安排。',
'What does Leo need to protect?|Normal café service and his own income.|Maya’s office meetings.|A private parking space.|他需要正常营业来支付自己的开支。~What compromise do they reach?|Use two back tables while keeping the counter clear.|Close the café for a month.|Give all tables away.|两张后桌用于活动，柜台和普通客区保留。',`
"I want to help," Leo said. "But coffee pays my bills. If people can’t reach the counter, I lose a day’s sales." Maya asked him to speak up about everything her drawing missed. He pointed to deliveries, cleaning and the route to the kitchen.§“我想帮忙，”里奥说，“但卖咖啡才能付我的账单。如果顾客走不到柜台，我就损失一天营业额。”玛雅请他说出图里遗漏的问题。他指出送货、清洁和通往厨房的路线。

"You need us to leave room for normal customers," she said. "And you need a finish time you can rely on." Leo nodded. Restating his concern slowed the conversation down enough for them to stop defending their first ideas.§“你需要我们为普通顾客留空间，”她说，“还需要一个可信的结束时间。”里奥点头。把他的顾虑复述出来，让谈话慢了下来，大家终于不再一味捍卫各自的最初想法。

They met halfway: two back tables, no work near the counter, and all equipment cleared by five. Maya sent a sketch and asked everyone to confirm. Being on the same page meant agreeing on the actual space and time, not merely saying they supported the room.§他们各退一步：只用后面两张桌子，不在柜台附近操作，五点前清走设备。玛雅发出示意图，请大家确认。理解一致，意味着说清空间和时间，而不只是口头支持公共房间。

Leo made her a coffee. "Can we get the replacement parts before Saturday?" he asked. Ben checked the delivery message. The parcel was at a station on the other side of town.§里奥给她做了杯咖啡：“周六前能拿到替换零件吗？”本查看物流消息。包裹在城市另一头的一个车站。
`);
episode('The Station with Two Entrances|两个入口的车站|旅行出行|确认取件信息、比较路线、留出余量。|团队协调好咖啡馆空间，街区节的零件却送到了城另一头。|安排取件，确认具体入口、关门时间、取件证件与两条路线。|Which entrance should I use? What time does the desk close, and what identification do I need? I’ll allow extra time in case I miss the first train.',
'allow for|考虑并预留|allow for delays / extra time。~pick up|取；接|pick up a parcel；pick it up。~change trains|换乘火车|change at a station。~in time|来得及|in time for collection；与 on time 区分。',
'Why do Maya and Ben take the slower direct train?|It gives them a safer margin before the collection deadline.|It is free.|It has no station stops.|他们选择不必紧张换乘的路线并提前出发。~What is missing from the parcel?|Half the ordered parts.|The whole bicycle.|The collection code.|包裹只装了一半零件。',`
Maya remembered the bus that had gone east. This time she asked for the exact entrance, collection code and closing time. The station had two entrances, but only one led to the parcel desk. She sent Ben a map with a pin, not just the station name.§玛雅想起坐反方向的那次公交。这次，她问清具体入口、取件码和关门时间。车站有两个入口，但只有一个通往取件处。她给本发了带定位点的地图，不只是站名。

They could change trains and save ten minutes, or leave earlier on a direct service. They chose the direct train and allowed for delays. Ben used the journey to check the parts list. Saving ten minutes would not help if they arrived at the wrong desk.§他们可以换乘省十分钟，也可以提前出发坐直达车。他们选了直达，并为延误留出余量。本在路上核对零件清单。如果到了错误的取件处，省十分钟也没意义。

They reached the desk in time to pick up the parcel. Maya checked the address on the box before signing. Back at a table near the station, Ben opened it and counted the parts against the order. His finger stopped halfway down the list.§他们来得及赶到取件处。签收前，玛雅核对了箱上地址。在车站附近的桌边，本打开包裹，对照订单清点零件。他的手指停在清单中间。

"Half is missing," he said. The supplier’s line would close in fifteen minutes. Maya took a photograph of the contents while Ben found the order number.§“少了一半，”他说。供应商热线十五分钟后下班。玛雅拍下包裹内容，本去找订单编号。
`);
episode('Half an Order|少了一半的订单|购物消费|说明缺件、提供证据、协商补发或退款。|玛雅和本取到包裹，发现只收到一半零件。|联系客服说明订单号、实收数量与缺件，要求明确补发时间或退款。|My order number is 418. We ordered eight parts but received four. Could you confirm when the rest will arrive, or refund the missing items?',
'short of|缺少|be four parts short of the order。~send out|寄出|send out a replacement；sent 是过去式。~at no extra cost|不另收费|确认运费与补发费是否都包含。~by the time|到……的时候|连接两件事的时间关系。',
'What can the supplier guarantee?|A refund for the missing items.|Delivery before the festival.|A free new bicycle.|供应商能保证退款，不能保证节前到货。~What do they choose for the demonstration?|A simpler version using the parts available.|An untested substitute.|No check of the parts.|他们按现有零件缩小演示范围。',`
"We’re four parts short of the order," Ben told the supplier. He gave the order number, listed what arrived and sent Maya’s photograph. He did not begin with a long account of the festival. The person on the phone first needed to identify the missing items.§“这笔订单少了四个零件，”本告诉供应商。他给出订单号，列明实收物品，发去玛雅的照片。他没有先长篇解释街区节，对方首先需要确认缺的是什么。

The supplier could send out replacements at no extra cost, but could not guarantee arrival before Saturday. Ben asked for the delivery estimate in writing. "By the time they arrive, the demonstration may be over," he said. They chose a refund for the missing items.§供应商可以免费补发，但不能保证周六前到。本要求书面确认预计时间：“到货时，演示可能已经结束了。”他们选择把缺件退款。

Using the parts they had, Ben designed a smaller demonstration. No untested substitute would go on a bicycle someone might ride. Sam would explain what they had changed and why. A clear demonstration was more useful than a larger one that did not work.§本用现有零件设计了一个更小的演示。未经测试的替代件不会装到有人可能骑的车上。山姆会解释改动及原因。清楚有效的小演示，比做不成的大演示更有用。

On the train home, Ella sent the final poster. Sam loved it. Priya sent one question: "Did everyone in these photographs agree to this?"§回程火车上，埃拉发来最终海报。山姆很喜欢。普莉娅发来一个问题：“照片里的每个人都同意这样使用了吗？”
`);
episode('A Face on a Poster|海报里的那张脸|科技与信息|询问照片使用意愿、说明范围、尊重拒绝。|演示改为小版本；最终海报又引出照片使用的问题。|发布朋友照片前，说明发布渠道和用途，并提供拒绝或撤下的选择。|May I use this photo on our event page and printed poster? It’s fine to say no. If you change your mind, please tell me and we’ll remove it where we can.',
'give permission|给予许可|give permission for a specific use。~change your mind|改变主意|change one’s mind；说明如何联系撤回。~leave someone out|不把某人放进去|leave someone out of a photograph。~blur out|模糊处理|blur out a face / identifying detail。',
'Why does Ella replace one photograph?|The person agrees to the group album but not public advertising.|The colours are too bright.|The person has moved abroad.|原先同意的用途不包含公开宣传。~What is the organiser’s concern?|The stall position blocks an access route.|The poster has no pictures.|There are too few chairs indoors.|摊位位置影响通行。',`
One photograph showed a guest who had agreed to the private group album, not a public poster. Ella contacted her and explained the channels. "I’d rather not be in the advert," the guest said. Ella replaced the picture. She did not ask the guest to justify saying no.§一张照片里的客人同意放进私人群相册，却没同意公开海报。埃拉联系她说明渠道。“我不太想出现在广告里，”客人说。埃拉换掉了照片，没有要求对方解释为什么拒绝。

For the new pictures, she asked people to give permission for the event page and printed poster separately. Sam’s mother checked his participation too. Ella kept contact details so people could change their mind. She also explained that shared copies might be harder to retrieve.§新照片分别询问是否同意活动页面和印刷海报使用。山姆的妈妈也确认了他的参与。埃拉留下联系渠道，方便大家改变主意，同时说明转发副本可能更难收回。

In a background shot, she could leave one person out by cropping the edge. Another image needed a face blurred out. The final poster had fewer faces but a clearer purpose. Sam added the start time and a description of the demonstration.§一张背景照可以裁掉边缘的人，另一张需要模糊处理一张脸。最终海报人物少了，用途却更清楚。山姆补上开始时间和演示说明。

The festival organiser replied with the stall map. "We need to move you," she wrote. "Your original position blocks an access route." The new position was far from the main gate.§主办方发来摊位地图：“得给你们挪位置，原位置挡了通行路线。”新位置离主入口很远。
`);
episode('Far from the Gate|离入口最远的摊位|文化与艺术|协调场地、解释限制、寻找替代办法。|海报已核实使用意愿；摊位因通行要求被挪到远处。|活动位置变差时，向主办方确认指示牌、通行与演示时段的可调整范围。|We understand the access route must stay clear. Could we add signs at the entrance and list our demonstration time on the programme?',
'keep clear|保持畅通|keep the entrance clear。~make the most of|充分利用|make the most of the available space。~stand out|显眼；突出|用明确内容吸引注意，而非阻塞路线。~set up|布置；搭建|set up a stall；set it up。',
'What do they ask the organiser for?|Signs and a programme listing.|Permission to block the gate.|A guaranteed number of customers.|他们争取指示牌与节目单上的时段。~Who cancels a shift?|Ben.|Priya.|The organiser.|本因家中临时情况不能到场。',`
Sam looked at the map. "Nobody will find us." Maya asked the organiser which parts were fixed. The access route had to stay clear. A sign at the main entrance and a demonstration time in the programme were possible. They asked for those instead of arguing about the blocked spot.§山姆看着地图：“没人能找到我们。”玛雅询问哪些安排不能变。通行路线必须保持畅通，但可以在主入口放指示牌，也能把演示时间放进节目单。他们争取这两项，不再为挡路的位置争论。

To make the most of the new space, Ella designed one clear sign: "Why does your bicycle click?" It was easier to read than their list of six services. Ben planned to set up the table so visitors could see from the side without crowding the walkway.§为充分利用新位置，埃拉设计了一块清楚的牌子：“你的自行车为什么咔哒响？”比列六项服务更容易读。本计划把桌子摆成侧面也能看见的方向，避免人群挤在通道。

Their stall could stand out by answering one real question. They rehearsed a five-minute version and a two-minute version. Sam timed both. Leo packed a notebook, receipt book and printed booking list. The smaller plan was ready.§摊位可以靠回答一个具体问题被记住。他们排练了五分钟版和两分钟版，山姆计时。里奥装好笔记本、收据本和纸质报名表。这个缩小后的计划准备好了。

At nine that night, Ben called. A family problem meant he could not come on Saturday. He could help prepare, but someone else would have to lead the demonstration.§当晚九点，本打来电话。家里临时有事，周六来不了。他可以帮忙准备，但演示得换个人带。
`);
episode('Someone Else’s Turn|换一个人上场|工作协作|交接任务、说明能力边界、安排备用。|摊位准备完毕，本却因家事无法出席。|你要临时接替同事，说明会做的部分、不会做的部分和需要保留的支持。|I can lead the introduction and show the basic steps. I’m not qualified to inspect customers’ bikes. Could you leave a checklist and a contact for questions?',
'step in|临时接替|step in for someone。~talk someone through|向某人逐步讲解|talk someone through the steps。~stick to|坚持；遵循|stick to the agreed scope。~be in charge of|负责|明确负责哪一项，而非笼统“全部”。',
'What can Sam safely lead?|The rehearsed demonstration on their own display bike.|All customer repairs.|Electrical testing.|山姆只带领已排练的展示，不检查顾客车辆。~What happens at the final rehearsal?|Sam freezes when someone asks an unexpected question.|Every customer pays.|Ben cancels the whole festival.|意外提问让山姆一下说不下去。',`
"I can step in," Sam said, then looked at his mother. Ben agreed to teach him the planned demonstration, not certify him as a mechanic. Nobody would inspect visitors’ bikes in Ben’s absence. Maya would be in charge of explaining that limit and taking bookings.§“我可以顶上，”山姆说，然后看向妈妈。本同意教他带领既定演示，不是让他成为专业技师。本不在时，没人检查访客车辆。玛雅负责说明这个限制和登记报名。

Ben talked him through each step using their display bike. Sam repeated it, then explained it back without the notes. When he was unsure, he stopped and asked. They added a card: "I don’t know. Let me find the right person to ask."§本用展示车逐步讲解。山姆重复操作，再不看笔记讲回来。不确定时就停下来问。他们加了一张提示卡：“我不知道，让我找合适的人问一下。”

They would stick to the prepared task. Priya handled money, Leo managed the café and Ella greeted people at the stall. Maya wrote down who would close each part. Ben could answer a call if free, but nobody would depend on him being available all day.§大家只做准备好的任务。普莉娅管钱，里奥负责咖啡馆，埃拉在摊位接待。玛雅写下各部分由谁收尾。本有空可以接电话，但计划不会依赖他一整天随时在线。

During the last rehearsal, Rosa asked a question that was not on Sam’s card. His hands stopped moving. He knew the steps, but the words suddenly disappeared.§最后一次排练时，罗莎问了一个卡片上没有的问题。山姆的手停住了。他知道操作步骤，但话忽然说不出来。
`);
episode('The Words That Disappeared|话到嘴边说不出|日常生活|请求重复、争取思考时间、用简单话解释。|山姆接手了限定范围的演示，排练时却被意外提问卡住。|对话时没听明白，先请对方重复，再用简单话确认问题并承认不确定。|Could you say that again more slowly? Do you mean the noise near the wheel? I’m not sure of the cause, but I can show you our demonstration.',
'bear with me|请稍等我一下|用于争取一点处理时间。~in other words|换句话说|用更简单的说法重述。~mean by|用……是什么意思|What do you mean by that?~have a go|试一试|have a go at doing something。',
'What helps Sam recover?|Asking for repetition and using simpler words.|Memorising a longer speech.|Pretending he knows every answer.|他练习澄清问题与简单表达。~What is missing on festival morning?|The printed sign.|The display bike.|All the volunteers.|开场前发现印好的指示牌不见了。',`
"Bear with me," Sam said at last. "Could you ask that again?" Rosa repeated the question more slowly. He understood it this time. He did not need a better memory of the speech. He needed a way to keep talking when the speech stopped helping.§“请等我一下，”山姆终于说，“能再问一遍吗？”罗莎放慢速度重复。这次他听懂了。他需要的并不是把演讲背得更牢，而是在稿子帮不上忙时仍能继续交流。

Ella gave him three cards: ask for repetition, check what the person means, and explain in other words. "What do you mean by the back part?" he practised. Then he pointed to the wheel. The conversation became a shared task rather than a test he had to pass alone.§埃拉给他三张卡：请求重复、确认意思、换个说法解释。他练着说：“你说后面的部分，具体指哪里？”随后指向车轮。谈话成了共同解决的事情，不再像必须独自通过的考试。

Maya had a go at his role. She forgot a word too. Sam helped her describe the shape instead. They both laughed. Knowing a word in a list and finding it during a conversation were different kinds of work. Tomorrow they would practise with real visitors.§玛雅也试着扮演他的角色，结果同样忘了一个词。山姆帮她改为描述形状。两个人都笑了。单词表里认识一个词，与谈话时调得出来，需要不同的练习。明天就要与真实访客交流了。

On festival morning, Leo loaded the table and bicycle. Ella looked in the van, then in the café. "Where’s the printed sign?" Nobody had seen it since the rehearsal.§街区节当天早上，里奥装好桌子和自行车。埃拉先找货车，又找咖啡馆：“印好的牌子呢？”排练之后，没人再见过它。
`);
episode('A Sign Made in Ten Minutes|十分钟做出的牌子|文化与艺术|按优先级解决小意外、清楚说明价值。|街区节当天，团队发现印好的指示牌不见了。|活动开场前缺物料，用一句话说明最必要的信息，并分配十分钟内能做的补救。|We need a clear title, the start time and directions. I’ll write the sign. Could you confirm the location with the organiser?',
'make do with|用现有条件凑合|make do with cardboard and a marker。~get the point across|把要点说明白|get a message across to someone。~right away|立刻|表示马上行动，仍需说明责任人。~lead to|通向；导致|lead to the stall；过去式 led。',
'What do they use for the replacement sign?|Cardboard and a thick marker.|A new digital billboard.|A large printed book.|他们用纸板和粗笔补做。~Why does the first visitor leave?|The demonstration time is not visible.|He dislikes bicycles.|The stall is closed all day.|牌子缺少醒目的演示时间。',`
They had ten minutes before leaving. Ella wanted to search every cupboard. Maya asked what they could make right away. Leo found clean cardboard and a thick marker. They would make do with those. A missing printout did not have to become a missing stall.§出发前还有十分钟。埃拉想把每个柜子找一遍。玛雅问，现在能立刻做出什么。里奥找来干净纸板和粗笔，他们就用这些。丢了一张印刷品，不必连摊位也错过。

Sam wrote, "Why does your bicycle click?" Underneath, Ella drew an arrow. Maya checked that the arrow would actually lead to their new position. The organiser approved the sign location. Getting the point across mattered more than matching the colours of the old poster.§山姆写：“你的自行车为什么咔哒响？”埃拉在下面画箭头。玛雅确认箭头确实通往新位置。主办方同意了摆放点。把信息说明白，比配色和旧海报一致更重要。

Their first visitor looked at the bike and asked when the demonstration began. "In twenty minutes," Sam said. The man walked away. They had written the question and direction but forgotten the time. Ella added it in large letters, along with the length of the demonstration.§第一位访客看看车，问几点开始演示。“二十分钟后，”山姆说。那人走了。他们写了问题和方向，却忘记时间。埃拉把开始时间和演示时长用大字补上。

At eleven, a small group gathered. Sam took a breath and touched the wheel. Then a man at the back asked the exact question that had stopped him during rehearsal.§十一点，一小群人围了过来。山姆深吸一口气，扶住车轮。后排一位先生问出了那个排练时让他卡住的问题。
`);
episode('I Don’t Know Yet|我现在还不知道|日常生活|自然澄清、承认不知道、继续完成任务。|摊位终于开始演示，山姆再次遇到让他紧张的提问。|有人问你超出能力范围的问题，先确认意思，明确不知道，再说明能帮到哪一步。|If you mean your own bike, I can’t diagnose it here. I can explain this demonstration and help you book a check with Ben.',
'as far as|就……而言；到……为止|as far as I know 表示知识范围。~find someone who|找到能……的人|who 引导描述人的从句。~carry on|继续|carry on with the demonstration。~thanks to|多亏|thanks to someone’s help；说明具体帮助。',
'How does Sam answer the difficult question?|Explains his limit and offers a booking with Ben.|Invents a diagnosis.|Walks away silently.|他没有猜测故障，说明了能力范围。~What unexpected request arrives?|A company wants a private session.|A request to buy the whole street.|A demand to cancel the festival.|有公司询问包场活动。',`
Sam recognised the question and felt his stomach tighten. "Do you mean your own bike or this one?" he asked. "Mine," the man said. Sam shook his head. "I don’t know what’s wrong with yours. I can find someone who can check it properly."§山姆认出了问题，胃一下绷紧。“你指自己的车，还是这辆？”他问。“我的，”对方说。山姆摇头：“我不知道你的车哪里有问题，但可以找能认真检查的人。”

He explained what Ben’s next session could cover, then carried on with the display bike. The man stayed. Nobody seemed angry that a teenager did not know everything. Thanks to the practice, Sam had a sentence he could use when certainty was not available.§他解释本下次活动能做什么，然后继续用展示车演示。那位先生留了下来。没有人因为一个少年不知道所有答案而生气。多亏排练，他在不确定时也有一句真正能用的话。

By lunch, eight people had asked about returning. Priya recorded interest separately from paid bookings. "As far as I know, four have actually booked," she said. Maya appreciated the smaller, accurate number. They had learned what to count after the misleading bank balance.§午饭前，有八个人询问下次活动。普莉娅把感兴趣与已付费报名分开记录。“据我目前所知，真正报名的是四个，”她说。玛雅更看重这个较小但准确的数字。经历过误导人的银行余额后，他们学会了数什么。

A woman handed Ella a business card. Her company wanted a private team session. The fee she suggested could cover the room’s monthly rent.§一位女士递给埃拉名片。她的公司想办一场团队专场。她提出的费用，够付这个房间一个月的租金。
`);
episode('Enough to Pay the Rent|够付房租的报价|工作协作|评估合作请求、核查范围与代价。|街区节已有四笔回头报名，一家公司提出高价包场。|合作方开出高价但超出能力范围，先核对人数、日期、服务范围与占用成本。|The fee sounds helpful, but we need to confirm the group size, date and activities. We can’t promise specialist repairs or cancel existing bookings without discussion.',
'in return for|作为……的交换|说明获得收益需要付出什么。~turn down|拒绝|turn down an offer；turn it down。~at the expense of|以……为代价|分析收益影响到谁。~take a closer look|仔细看看|take a closer look at the terms。',
'What does the first company request involve?|Taking two Saturdays already offered to neighbours.|Only using an empty weekday.|A free five-minute chat.|原提议会占用已向邻居开放的两个周六。~What alternative do they propose?|A smaller weekday session within their skills.|Unlimited private repairs.|Cancelling all public sessions.|他们提出能力范围内的工作日小场。',`
The company offered six hundred pounds in return for two private Saturdays. Maya wanted to say yes. Priya asked her to take a closer look at the dates. Both were already on the public booking page. Several neighbours had paid. The money came with an existing commitment attached.§公司愿意出六百镑，换两场周六包场。玛雅很想答应。普莉娅请她仔细看日期。两场都已在公共报名页面上，有邻居已经付费。这笔收入附带的，是对已有承诺的影响。

Leo asked about the activities. The company expected individual bike repairs, lunch and a talk. Ben could not offer all that. "We shouldn’t save the room at the expense of the people it’s for," Rosa said. They would turn down that version of the offer.§里奥询问活动内容。公司希望逐辆修车、提供午餐，再做一场讲座。本无法全都承接。“不能以牺牲这个房间原本服务的人为代价来保住它，”罗莎说。他们会拒绝这个版本。

Ella proposed one smaller weekday session: a demonstration and a discussion, with no promise of repairs or catering. The price would be lower. They sent the scope in writing and gave the company time to decide. A useful deal had to fit both sides.§埃拉提议工作日办一场更小的活动：演示加讨论，不承诺维修和餐饮，价格也相应降低。他们书面说明范围，让公司考虑。能做成的合作，得对双方都合适。

As the festival closed, Priya counted receipts. One payment had no booking number. Another booking had two payments. They could not announce the day’s result until the difference was explained.§街区节收摊时，普莉娅清点收据。一笔付款没有报名号，另一笔报名却有两次付款。查清差异之前，他们不能宣布当天的结果。
`);
episode('Count It Twice|再核对一遍|购物消费|核对付款、解释差异、纠正重复收费。|团队提出缩小版公司专场；街区节收账时发现两处差异。|你发现同一订单付了两次款，向对方说明核查结果与退款安排。|We found two payments for the same booking. We’ve checked the records and will refund the duplicate. Your original booking is still confirmed.',
'match up|对应起来|match up receipts with bookings。~account for|解释；占据|account for the difference。~pay back|退还；偿还|pay someone back；paid 是过去式。~leave over|剩下|what is left over 表示剩余部分。',
'Why is one payment missing a booking number?|It is a donation, not a booking.|It is fake money.|It belongs to another café.|备注说明它是捐款。~What do they do about the double payment?|Refund the duplicate and retain the booking.|Count both as profit.|Cancel both payments without telling the guest.|他们退回重复部分，保留原预约。',`
Priya matched up the paper receipts, bank entries and booking list. The payment without a booking number had a note: "For the room, from a neighbour." It was a donation. They recorded it separately. Donations could help once, but should not be mistaken for repeat session income.§普莉娅逐项核对纸收据、银行交易和报名表。没有报名号的付款有备注：“邻居送给房间的一点心意。”这是一笔捐款，需要单独记录。捐款可以帮一次，却不能当作稳定活动收入。

The double payment came from a guest who had tried again after a slow screen. Leo checked both transactions before paying back the duplicate. He told the guest the original booking was confirmed. A correction needed to repair the record and the person’s uncertainty.§重复付款来自一位因页面反应慢而重试的客人。里奥核实两笔交易后退回重复部分，并说明原预约仍有效。纠错既要修复账目，也要消除当事人的疑惑。

Once they could account for the difference, they calculated what was left over after the stall fee and materials. The day had made a modest surplus. More importantly, four new sessions were booked. Maya put both figures in the report instead of combining them into a bigger headline.§解释清差异后，他们扣掉摊位费和材料费，计算结余。当天有一点盈余，更重要的是有四笔新报名。玛雅把两个数字分别放进报告，没有拼成一个更大的宣传数字。

Rosa read the message and asked everyone to come on Monday. The four-week review had arrived. They would find out whether their room could stay open.§罗莎读完消息，让大家周一来。四周复盘的日子到了。他们终于要知道，这个房间能否继续开放。
`);
episode('The Monday Review|周一的复盘|工作协作|用证据复盘、区分一次收益与持续能力。|街区节有小额盈余和四笔新报名；四周试行即将接受复盘。|向伙伴复盘一项尝试，分别说明实际收入、一次性帮助、未兑现预约和下月风险。|We covered direct costs, but part of the surplus was a one-off donation. Next month’s bookings look promising, though they aren’t all paid yet.',
'one-off|一次性的|a one-off donation；不要当作持续收入。~fall short|未达到|fall short of the target。~look back on|回顾|look back on the trial。~move forward|继续推进|说明下一步的条件与负责人。',
'What does the trial show?|Progress, but not a stable surplus yet.|Guaranteed profit forever.|No one used the room.|他们接近目标，但仍依赖一次性帮助。~What does Rosa offer?|A three-month extension with reviews.|An unconditional permanent lease.|Immediate closure without discussion.|罗莎提出有复盘条件的三个月延长期。',`
On Monday, nobody brought a celebration cake. Priya showed costs, earned income, future payments and one-off donations on separate lines. Without the festival donation, they would still fall short of the month’s total. They had improved the situation, not solved it forever.§周一，没有人带庆祝蛋糕。普莉娅把成本、已实现收入、未来收款和一次性捐款分行展示。没有街区节捐款，本月总额仍未达标。他们改善了情况，还没有永久解决问题。

Looking back on the trial, Maya listed three changes: later sessions brought more guests, clearer repair limits reduced complaints, and shorter shifts were easier to cover. She also listed the closure caused by water damage. Ignoring the bad week would make the next forecast too cheerful.§回顾试行，玛雅列出三个变化：推迟活动增加了客人，明确维修范围减少了投诉，短班次更容易排人。她也列出因进水关闭的影响。忽略糟糕的一周，会让下次预测过分乐观。

Rosa offered three more months with monthly reviews, a spending limit and the option to stop. The room had passed its safety checks and could reopen gradually. They could move forward, but only with a plan that did not depend on everyone working for free indefinitely.§罗莎愿意再给三个月，条件是每月复盘、限制支出，并保留停止选项。房间已通过安全检查，可以逐步恢复。他们能继续，但计划不能依靠所有人无限期免费劳动。

Ben raised his hand. "Then we need to talk about teaching someone else." His family needed more of his time. The room’s future could not rest on one pair of hands.§本举手：“那就得谈谈教会其他人的事。”他的家人需要他投入更多时间。房间的未来，不能只靠一双手。
`);
episode('One Pair of Hands|不能只靠一个人|工作协作|拆解技能、观察练习、反馈与授权。|房间争取到三个月延长期，但本无法长期承担全部维修活动。|教朋友一个技能时，分清示范、独立练习、检查与需要专业帮助的边界。|I’ll show you once, then you can try it while I watch. We’ll check the result together. Anything beyond these steps goes to a qualified specialist.',
'pass on|传授；传递|pass on a skill to someone。~under supervision|在指导监督下|能力未核实前保留监督。~check against|对照检查|check the result against a checklist。~on your own|独自；独立|independent performance 需要实际观察。',
'How do they teach the next volunteer?|Demonstrate, practise under supervision and check results.|Give a certificate after one video.|Ask them to handle every repair immediately.|他们按任务观察实际操作，不凭观看次数授权。~What does Sam discover?|He can explain one task but still needs help with others.|He knows all mechanical work.|Learning is finished.|能力按具体任务核实，不能泛化。',`
Ben did not begin with a list of everything he knew. He chose one simple demonstration and wrote its starting conditions, steps and stopping points. "I can pass on this task," he said. "That doesn’t make someone ready for every repair that arrives."§本没有一开始就列出自己知道的所有知识。他选一个简单演示，写明前提、步骤和停止点。“这个任务可以教，”他说，“但不意味着学会的人就能处理所有送来的维修。”

Ella watched, then practised under supervision. Ben asked her to explain why she chose each step. They checked the result against the list. A step she could repeat from memory still needed a visible result. The checklist supported judgement; it did not replace skill.§埃拉先看示范，再在指导下练习。本请她解释每一步为什么这么选。他们对照清单检查结果。即使能背出步骤，也要做出看得见的结果。清单帮助判断，却不能代替技能。

Sam could now lead the display-bike explanation on his own. He still asked for help with a different mechanism. Nobody called that a failure. They recorded which tasks each volunteer could actually do and which required someone more experienced. The room gained capacity without pretending everyone was an expert.§山姆已经能独立带展示车讲解，遇到另一种机构仍会求助。没人把这称为失败。他们记录每位志愿者实际能做的任务，以及哪些仍需有经验的人处理。房间增加了承接能力，也没有假装人人都是专家。

Maya recognised the same problem in her English. She could understand many words in the lessons she read. Could she use them when someone asked an unexpected question? Ella suggested testing that at dinner.§玛雅在自己的英语里看到了同样的问题。课程里许多词她都看得懂。可别人突然提问时，她能用出来吗？埃拉建议晚饭时就试试。
`);
episode('Dinner Without a Script|没有稿子的晚饭|家庭关系|不看原文表达、换条件应答、发现词汇缺口。|团队按具体任务培训新志愿者；玛雅想检验自己的英语能否离开材料使用。|不看参考，用英语邀请朋友吃饭、说明预算，并处理对方临时更改时间的请求。|Would you like to have dinner on Friday? I can spend about twenty pounds. If seven is too early, we could meet at half past seven instead.',
'come up with|想出|come up with an alternative。~put into words|用语言表达|put an idea into words。~without looking|不看材料|说明回忆条件，不等于自动正确。~make sense|意思清楚；合理|Does that make sense? 可用于确认理解。',
'How does Ella change the practice?|Adds a new time, budget and dietary request.|Asks Maya to copy the whole story.|Shows every answer first.|她改变条件，检验迁移。~What does Maya record?|Words she could use and gaps she needs to revisit.|Every word she has ever seen as mastered.|Only how long she read.|她记录实际表达与待补缺口。',`
At dinner, Ella asked Maya to invite her to an imaginary restaurant. Maya answered easily without looking at notes. Then Ella changed the time, lowered the budget and asked about vegetarian food. Maya paused. She needed to come up with a new plan, not repeat a familiar paragraph.§晚饭时，埃拉请玛雅邀请她去一家假想餐厅。玛雅不看笔记就轻松回答了。接着，埃拉改时间、压低预算，又问素食。玛雅停住了。她需要想一个新方案，不是重背熟悉段落。

"We could eat at home instead," Maya said. She could put the main idea into words, but forgot how to ask whether a price included service. Ella helped only after Maya had tried. They marked that expression as helped practice, not independent use.§“那可以在家吃，”玛雅说。主要意思她能说出来，却忘了怎么问价格是否包含服务费。玛雅先试，之后埃拉才帮忙。他们把这个表达记为借助帮助练习，没有算独立使用。

The next evening, Rosa asked a similar question about a different outing. Maya retrieved the expression herself. It made sense in the new conversation. She recorded the gap and the later attempt separately. Seeing a word, recalling it and using it with a person were three things worth tracking.§第二天晚上，罗莎围绕另一场出游提出相似问题。玛雅自己想出了那个表达，在新谈话里也用得通。她把之前的缺口和之后的尝试分别记下。看过、想起、与人交谈时用出，是三件值得分别记录的事。

Then Nina sent Maya a message. A role on a new project was opening across the river. It offered more responsibility and one difficult choice.§接着，妮娜发来消息。河对岸一个新项目空出岗位。机会意味着更多责任，也意味着一个难以回避的选择。
`);
episode('Across the River|河对岸的机会|工作协作|比较机会、澄清条件、避免仓促决定。|玛雅开始检验独立表达；经理又提出一个新项目机会。|比较两个工作机会，分别说明职责、通勤、时间与需要进一步确认的条件。|The new role offers more responsibility, but the commute is longer. I need to clarify the working hours and support before deciding.',
'weigh up|权衡|weigh up the options。~take on|承担|take on responsibility / a role。~in the long run|长远来看|与短期成本一起比较。~sleep on it|考虑一晚再决定|争取明确的考虑时间。',
'What does Maya clarify before deciding?|Hours, responsibilities and support.|Only the job title.|The café’s paint colour.|她问清实际工作条件。~What does she tell the room’s team?|Her availability may change and they should plan for it.|She will always cover every shift.|They must reject new volunteers.|她提前说明可用时间可能减少。',`
The new role sounded exciting. Maya would take on a customer project instead of only preparing research. The office was across the river, with a longer commute. She asked Nina about working hours, support and how success would be judged. A better title did not answer those questions.§新岗位很吸引人。玛雅将负责一个客户项目，不再只是准备研究。办公室在河对岸，通勤更长。她问妮娜工作时间、支持资源和怎样判断成果。更好的头衔回答不了这些问题。

Nina gave her the details and until Wednesday to decide. Maya said she would sleep on it. To weigh up the options, she wrote what she would gain, what she would lose and which uncertainties remained. In the long run, she wanted responsibility she could learn to handle, not just more hours.§妮娜说明细节，给她到周三决定。玛雅说想考虑一晚。她写下收益、损失和仍未确定之处，逐项权衡。长远来看，她想承担能学会处理的责任，而不只是增加工作时长。

At the room meeting, she warned that her availability might change. Leo did not ask her to turn the role down. "Tell us which shifts you can keep. We’ll plan around the rest." Their new task records finally had a reason to exist beyond looking organised.§房间开会时，她提前说明可用时间可能变化。里奥没有让她拒绝机会：“告诉我们哪些班还能留，其他再安排。”他们新的任务记录，终于有了比看起来整齐更实际的用途。

Maya accepted the role on Wednesday. On Thursday, a letter arrived with a proposed rent increase for the next year. The room had another decision to make, and this time Maya could not write the whole plan.§周三，玛雅接受了岗位。周四，来信提出下一年的租金上涨。房间又面临新决定，这次玛雅不能再独自写完整方案。
`);
episode('Next Year’s Number|明年的那个数字|购物消费|计算涨幅、确认生效时间、提出协商方案。|玛雅接受新项目，团队也收到下一年的涨租提议。|说明租金从六百涨到六百六十，区分涨六十与涨百分之十，并询问生效日期。|The proposed rent rises from six hundred to six hundred and sixty. That’s sixty more, or ten percent. When would it take effect?',
'go up by|上涨了|go up by sixty；go up to six hundred。~take effect|生效|ask when the change takes effect。~spread out|分散；分摊|spread out a payment over several months。~reach an agreement|达成一致|agreement 应写明各方实际同意内容。',
'How much is the proposed rent increase?|Sixty pounds, or ten percent.|Six hundred pounds, or sixty percent.|Ten pounds, or one percent.|从六百到六百六十，差六十，涨幅百分之十。~What do they seek first?|Clarification and a phased option.|An immediate promise to pay anything.|A legal conclusion from the poster.|他们先核实生效日期和可协商的分阶段方案。',`
Priya wrote the two figures side by side: six hundred and six hundred and sixty. "It goes up by sixty, to six hundred and sixty. That’s ten percent." Sam checked the calculation. A small difference in the words could describe a very different increase.§普莉娅把两个数字并排写下：六百、六百六十。“上涨六十，涨到六百六十，是百分之十。”山姆核算了一遍。说法里小小的差别，可能描述完全不同的涨幅。

The letter proposed a change for next year, not next month. Rosa would clarify when it would take effect and what options were open. They treated it as a proposal to discuss, without guessing what any agreement or local rule required. Important terms needed proper checking.§信中提议明年调整，不是下个月。罗莎会核实生效时间和可选办法。他们把它当作待讨论的提议，没有猜测已有约定或当地规则的具体要求。重要条款得认真核查。

Ella and Priya drafted the reply. They asked whether the increase could be spread out in stages and offered a review date based on actual room income. Maya checked their arithmetic but did not take over. To reach an agreement, they needed a plan everyone could sustain.§埃拉和普莉娅起草回复，询问能否分阶段调整，并根据房间实际收入提出复盘日期。玛雅核对计算，没有重新接管。要达成一致，方案得让各方都能维持。

Before the reply came, the company accepted their smaller weekday session. Now they had to deliver it without Ben leading every step or Maya answering every message.§回复还没到，公司先接受了缩小后的工作日专场。现在，他们得在本不带每个步骤、玛雅不回每条消息的情况下把活动交付出来。
`);
episode('A Day That Ran Without Her|没有她盯着的一天|工作协作|按分工执行、处理中断、验证交接。|团队正在协商租金，公司专场确认，玛雅却需在新项目上班。|你无法到场，交接负责人、范围、联系规则和结束后的核对事项。|Ella is leading the session, and Priya handles payments. Please contact me only if the agreed scope changes. We’ll check bookings and costs together tonight.',
'keep to|遵守|keep to the agreed time / scope。~sort out|处理妥当|sort out a booking problem。~check in with|联系确认|check in with the person in charge。~let go of|放手|let go of control 仍保留清楚分工。',
'How does the team handle an extra request?|Explains the agreed scope and offers a separate follow-up.|Promises all repairs immediately.|Calls Maya for every sentence.|他们遵守范围，另约后续讨论。~What proves the handover worked?|The session finishes within scope and records are complete.|Maya reads every message live.|Everyone knows all tasks perfectly.|看实际交付与记录，而非是否完全没有问题。',`
At her new office, Maya kept checking her phone. The company session was starting at the café. Ella sent one message: "We’ve opened. I’ll check in with you tonight." Maya put the phone away. Letting go of control was easier to recommend than to practise.§新办公室里，玛雅不停看手机。公司专场正在咖啡馆开场。埃拉发了一条消息：“已经开始，今晚再和你核对。”玛雅放下手机。建议别人放手，比自己真正放手容易得多。

During the session, a guest asked for repairs to several personal bicycles. Ella kept to the agreed demonstration. She explained what was included and offered to arrange a separate conversation with Ben. She did not turn a new request into an unplanned promise.§活动中，一位客人要求顺便修几辆私家自行车。埃拉坚持约定的演示范围，解释包含哪些内容，愿意另行安排与本沟通。她没有把临时请求直接变成未经计划的承诺。

Priya sorted out a missing receipt using the numbered payment list. Sam led his rehearsed part with an adult present. At the end, they checked the table, equipment and room together. The session finished on time. It had small problems, but none required Maya to run it remotely.§普莉娅用有编号的付款表补上缺失收据。山姆在成年人在场时带领排练过的部分。结束时，他们一起核对桌子、设备和房间。活动按时结束，虽然有小问题，但不需要玛雅远程指挥。

That evening, Maya read the short report. Beside it was Rosa’s reply about rent: a phased increase was possible, subject to written agreement. There was finally a plan they could test over time.§当晚，玛雅读了简短报告。旁边是罗莎关于租金的回复：可以讨论分阶段调整，具体以书面约定为准。他们终于有了一个能用时间检验的计划。
`);
episode('A Place to Return To|一个还能回来的地方|家庭关系|总结变化、感谢具体帮助、安排下一次。|公司专场顺利完成，租金也有了分阶段协商的可能，房间逐渐能自行运转。|向朋友总结这段时间学到的三件具体事情，感谢他的帮助，并约定下次实际见面。|I’ve learned to ask clearer questions, confirm arrangements and ask for help sooner. Thanks for practising with me. Shall we meet next Saturday and try a new situation?',
'look forward to|期待|look forward to + 名词 / doing。~show up|出现；到场|show up for a session。~keep going|继续|keep going 需要可持续安排。~settle in|安顿下来|settle in to a new place / role。',
'What has changed by the end?|The room has a workable shared plan, with continuing reviews.|Nobody needs to pay rent again.|All future problems are solved.|他们获得可执行安排，并继续复盘。~Who arrives at the wrong door?|A new neighbour carrying two bags.|The original supplier.|Nina’s customer.|新邻居的到来呼应第一集。',`
On the first Saturday after the festival, Maya arrived late because she had taken a walk by the river. Nothing had fallen apart. Priya checked bookings, Ella greeted guests and Ben taught a new volunteer. The room would keep going through shared work and regular reviews, not one final rescue.§街区节后的第一个周六，玛雅沿河散了步，来晚了。一切并没有散架。普莉娅核对报名，埃拉接待客人，本教新志愿者。房间靠共同分工、定期复盘继续，而不是靠一次最终拯救。

Maya had begun to settle in to both the street and her new role. She could ask for help sooner, confirm a date clearly and explain a limit without disappearing. There were still words she could not find in conversation. She wrote them down and tried them again in a different situation.§玛雅逐渐适应街区和新岗位。她能更早求助、明确确认日期，也能说明边界而不逃避。谈话里仍有想不起的词，她记下来，在不同情境中再试。

"What are you looking forward to?" Leo asked over lunch. "A normal Saturday," she said. "And the next person who shows up with a real question." Rosa laughed. Ordinary days now contained more people, but also clearer ways to share the work.§午饭时，里奥问：“你接下来期待什么？”“一个普通周六，”她说，“还有下一个带着真实问题来的人。”罗莎笑了。普通日子里，人更多了，但分工也更清楚。

Someone knocked upstairs. A woman stood outside number nine with two bags. Her key did not work. Maya looked at the tag and smiled. "You want number six. I’m Maya. Would you like a hand?" This time, she knew what to say.§楼上传来敲门声。一位女士提着两个包站在九号门外，钥匙打不开。玛雅看了看钥匙牌，笑了：“你要找的是六号。我叫玛雅，要帮忙吗？”这一次，她知道该怎么说。
`);
// Navigation references are derived only after every authored episode exists.
const quotes={66:['turned the power off'],68:['mixed up'],69:['was allergic to'],72:[null,null,null,'let you know'],73:['available on'],74:['pointed out',null,'made it clear'],75:['had gone through','charge her twice'],76:['walk her through','got stuck','followed up'],79:[null,'belonged to'],80:['hear him out'],81:['applied for'],82:['woke Rosa up',null,'got hold of'],83:[null,'recovered from',null,'lost track of'],84:['felt unwell','breaks','took care of','Asking for help'],85:[null,null,'called off'],86:[null,null,'met halfway'],87:['allowed for'],89:[null,'change their mind','leave one person out','blurred out'],90:['stay clear'],91:[null,'talked him through'],92:[null,null,null,'had a go'],93:[null,'Getting the point across'],94:[null,null,'carried on'],96:['matched up',null,'paying back','left over'],97:[null,null,'Looking back on'],98:[null,null,'checked the result against','on his own'],99:[null,'put the main idea into words',null,'made sense'],101:['goes up by'],102:['kept to','sorted out',null,'Letting go of'],103:['looking forward to','shows up']};
for(let i=0;i<episodes.length;i++){
 const a=episodes[i];a.series.nextId=i===episodes.length-1?null:a.id+1;
 a.series.hook=a.content.split('\n\n').at(-1);
 a.phrases.forEach((p,j)=>{if(quotes[a.id]?.[j])p.quote=quotes[a.id][j];});
 a.checks.forEach((q,j)=>{const correct=q.options[0],shift=(i+j)%3;q.options=[...q.options.slice(shift),...q.options.slice(0,shift)];q.answer=q.options.indexOf(correct);});
}
root.SerialReading={id:'maple-street',title:'枫树街的夏天',seasons,episodes,characters:[['Maya / 玛雅','搬来的产品经理；一边适应新工作，一边学习参与街区生活。'],['Leo / 里奥','咖啡馆经营者；愿意帮忙，也需要守住正常经营。'],['Rosa / 罗莎','房东与邻居；关心公共空间，也要面对真实成本。'],['Ben / 本','维修志愿者；通过示范和练习传授具体技能。'],['Ella / 埃拉','摄影师；负责活动、照片和与居民沟通。'],['Priya / 普莉娅','加入活动的邻居；帮助团队核对账务与参与条件。'],['Sam / 山姆','在成年人支持下学习维修演示与接待的少年。']]};
if(typeof articles!=='undefined')articles.push(...episodes);
if(typeof module!=='undefined')module.exports=root.SerialReading;
})(typeof window!=='undefined'?window:globalThis);
