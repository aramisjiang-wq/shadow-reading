/* 原创教学阅读；人物、访谈、机构与事件均为虚构情境。旧稿不覆盖。 */
(function (root) {
'use strict';
const library = [];
function add(id,title,subtitle,level,category,format,unitIds,revisionOf,goal,phrases,checks,retell,transfer,text) {
 const pairs=text.trim().split('\n\n').map(p=>p.split('§'));
 const [task,sample]=transfer.split('=>');
 library.push({id,title,subtitle,level,category,format,units:unitIds.split(','),revisionOf:revisionOf||null,
   edition:'edited-2026-11',source:'原创教学文本（虚构情境）',goal,
   phrases:phrases.split('~').map(row=>{const [en,zh,note]=row.split('|');return {en,zh,note};}),
   checks:checks.split('~').map(row=>{const [q,a,b,c,answer,why]=row.split('|');return {q,options:[a,b,c],answer:Number(answer),why};}),
   retell,transfer:{prompt:task,sample},content:pairs.map(p=>p[0].trim()).join('\n\n'),translation:pairs.map(p=>p[1].trim()).join('\n\n')});
}
add(21,'A Morning That Did Not Go to Plan','计划之外的早晨','beginner','日常生活','叙事','verbs-daily,clock,duration',1,
'按时间顺序复述计划如何变化，区分最迟完成与持续到某时。',
'by eight|最迟八点|by 表示截止，不表示一直持续。~turn back|折返|描述改变行进方向。~give me a hand|帮我一下|give someone a hand 是常用请求。~in the end|最后；结果|引出事情的最终结果。',
'Why did the narrator turn back?|The bus was late.|The keys were still at home.|The office was closed.|1|出门后发现钥匙还在家，因此折返。~What did the narrator agree to do on Friday?|Help Rosa move a table and share lunch.|Attend an earlier office meeting.|Buy a new kettle.|0|两人约好周五搬桌子，之后一起做午饭。',
'用 first、then、after that、in the end 复述早晨的四个转折，说明谁帮助了谁。',
'改写成你忘带手机，并需要九点前到医院的情境。=>I had to be at the hospital by nine, but I left my phone at home. I turned back and asked my neighbour to help me find it.',`
I usually leave home at a quarter to eight. The bus takes about twenty minutes, and I like to reach the office before nine. Last Tuesday, I had an early call, so I planned to leave by eight at the latest. I put my laptop by the door and made a quick breakfast.§我通常七点四十五分出门。公交车程大约二十分钟，我喜欢九点前到办公室。上周二我有个较早的电话会议，所以打算最晚八点出发。我把笔记本电脑放在门边，简单做了早饭。

At five to eight, I picked up my bag and hurried downstairs. Halfway to the bus stop, I reached into my coat pocket. No keys. I checked the other pocket, then my bag. They were probably on the kitchen table. I had to turn back, but the front door had already locked behind me.§七点五十五分，我拿起包匆忙下楼。走到公交站的半路上，我摸了摸外套口袋。没有钥匙。我检查了另一个口袋，又翻了包。钥匙大概还在厨房桌上。我不得不折返，但大门已经锁上了。

My neighbour, Rosa, keeps a spare key for me. I rang her bell and asked, "Could you give me a hand?" She was still having breakfast, but she found the spare key straight away. My keys were not on the table, though. They were beside the kettle, under a shopping list.§邻居罗莎替我保管着备用钥匙。我按门铃问：“能帮我一下吗？”她还在吃早饭，但马上找出了备用钥匙。不过，我的钥匙不在桌上，而在水壶旁边，被购物清单压着。

By then, I had missed my usual bus. Instead of rushing to catch another one, I called my colleague. She said I could join the first part of the meeting from home. I sat down at the kitchen table, opened my laptop and checked that the microphone worked. The call started at half past eight.§这时，我已经错过平常坐的那班公交车。我没有急着去赶下一班，而是给同事打了电话。她说我可以在家参加会议的前半部分。我在厨房桌边坐下，打开电脑，检查麦克风是否正常。电话会议八点半开始。

After the call, I went upstairs to return Rosa's key. She laughed when I told her where mine had been. Then she asked whether I could help her move a small table on Friday. I said yes and suggested making lunch afterwards. We had lived next to each other for a year but had never shared a meal.§会议结束后，我上楼归还罗莎的钥匙。我告诉她钥匙原来放在哪里，她笑了。接着她问我，周五能否帮忙搬一张小桌子。我答应了，并提议搬完后一起做午饭。我们做邻居一年了，却从没一起吃过饭。

In the end, I reached the office at ten. I still finished the report before lunch, and nobody needed an explanation of every minute of my morning. That evening, I put a small bowl beside the door. My keys now go there. Friday's lunch went into my calendar too.§最后，我十点到达办公室，仍然在午饭前完成了报告，也没有人需要我逐分钟解释这个早晨。那天晚上，我在门边放了一个小碗。现在钥匙都放在那里。周五的午饭也记进了日历。
`);
add(22,'The Meeting We Stopped Having','取消一次例会之后','intermediate','工作协作','工作纪实','verbs-work,comparison,connections',2,
'解释一项工作安排的成本、试行办法和保留条件。',
'set aside|留出|set aside time for something。~get in the way|妨碍|后面可接 of + 名词/doing。~try it out|试行|代词 it 放在 try 与 out 之间。~keep track of|跟踪；掌握进展|指持续了解，而非只看一次。',
'Why was the daily meeting a problem for Maya?|It repeatedly interrupted a complex task.|Nobody attended it.|It lasted all afternoon.|0|即使会议只有十五分钟，她也需要额外时间重新进入设计任务。~What remained a reason to call a meeting?|Every minor update.|A decision involving several people.|A routine completed task.|1|试行后仍保留需要多人共同决策时的会议。',
'说明旧安排、两种不同需求、试行规则和两周后的变化，不要只列优缺点。',
'将试行周期改成一个月，并增加“紧急问题直接电话沟通”。=>We’ll try it out for a month. Routine updates will go in writing, but we’ll call directly if something is urgent.',`
Every morning at nine fifteen, our team stopped working and joined the same video call. We each described yesterday's work, today's plan and any problems. The meeting was supposed to last fifteen minutes. It usually did, but that did not mean it cost each person only fifteen minutes.§每天早上九点十五分，我们团队都会停下工作，加入同一个视频会议。每个人介绍昨天的工作、今天的计划和遇到的问题。会议原定十五分钟，通常也确实按时结束，但这不意味着每个人只付出了十五分钟。

Maya, one of our designers, explained the difficulty. She often spent the first hour drawing a complicated process. Just as she began to see how the pieces fitted together, the meeting started. Afterwards, she needed time to find her place again. The call was short; the interruption was not.§设计师玛雅解释了困难所在。她常用上班后的第一个小时绘制复杂流程。刚开始理清各部分关系，会议就开始了。会后，她又需要花时间恢复思路。通话时间很短，中断带来的影响却不短。

Our manager had a different concern. Without the call, how would new colleagues know whom to ask for help? A written update might be efficient for experienced staff but confusing for someone in their first week. We needed to protect focused work without making it harder to ask questions.§经理有另一个顾虑：没有这次会议，新同事怎么知道该向谁求助？文字更新对熟练员工可能高效，但刚入职的人可能看不明白。我们需要保护专注工作的时间，同时不能让提问变得更困难。

We agreed to try it out for two weeks. Routine updates went into a shared document by ten. Each person named any decision they needed from someone else. We also set aside twenty minutes after lunch when anyone could bring a problem. Attendance at that session was optional, not a second daily meeting.§我们决定试行两周。常规进展在十点前写进共享文档，每个人注明需要谁作出什么决定。另外，午饭后留出二十分钟，大家可以带着问题来讨论。这个时段自愿参加，并不是另一次全员例会。

The first week exposed a weakness: two requests disappeared in a long list of updates. We added a separate section for unanswered questions and assigned a person to each one. That made it easier to keep track of what needed a response. The document alone had not solved the problem; its structure mattered.§第一周就暴露出一个弱点：两个请求淹没在长长的更新列表里。于是，我们为未答复的问题单设一栏，并为每个问题指定跟进人。这样就更容易追踪哪些事情需要回应。文档本身并没有解决问题，组织方式同样重要。

At the review, Maya said the new routine no longer seemed to get in the way of her morning. A new colleague said the named contacts helped more than listening to every update. We kept meetings for decisions that required several people. We had not removed conversation; we had given it a clearer purpose.§复盘时，玛雅说新安排不再打断她早上的工作。一位新同事说，明确的联系人比听完所有人的更新更有帮助。需要多人共同决策时，我们仍然开会。交流还在，只是目的更明确了。
`);
add(23,'The Jacket I Returned','我退掉的那件夹克','beginner','消费选择','叙事','comparison,adjectives,numbers',3,
'讲清购买理由、实际问题和解决办法，并比较单价与实际花费。',
'on sale|在打折|此处指降价销售，不是仅仅待售。~try it on|试穿|代词放在 try 与 on 之间。~keep the receipt|保留收据|receipt 的 p 不发音。~in total|总共|用于核对实际总花费。',
'Why did Lin buy the first jacket?|It was the colour she needed.|The discount made the decision feel urgent.|Her old jacket was broken.|1|限时折扣让她觉得必须立刻决定。~Why did she choose the second jacket?|It fitted better and had a lower purchase price.|It had a larger discount.|It came with free shoes.|0|第二件虽无折扣，但价格更低且更合身。',
'用过去时复述两次购物，包含原价、折后价、退货和第二次选择。',
'把夹克换成鞋，并说明折后仍比另一双贵十美元。=>The shoes were on sale, but they were still ten dollars more expensive than the other pair.',`
I went into the shop to buy a plain blue jacket for work. Near the entrance, a sign said, "Today only: thirty percent off." Below it was a green jacket with large pockets. It was not the colour I wanted, but I stopped to look at the price.§我进店是想买一件上班穿的素色蓝夹克。入口附近，一块牌子写着“仅限今天：七折”。牌子下面是一件有大口袋的绿色夹克。虽然不是我想要的颜色，我还是停下来查看价格。

The original price was one hundred dollars. With the discount, I would pay seventy. I asked to try it on. The sleeves were a little long, but the assistant said I could roll them up. I looked at the sign again and imagined someone else buying the last jacket in my size.§原价一百美元，打折后付七十美元。我提出试穿。袖子有点长，店员说可以卷起来。我又看了看牌子，想到这个尺码的最后一件可能会被别人买走。

At home, I put the jacket on with my work trousers. The green looked different under the kitchen light. More importantly, the pockets pulled forward when I sat down. I tried to tell myself it was a good deal. Then I noticed I was already finding reasons not to wear it.§回家后，我穿上工作长裤，再配这件夹克。厨房灯光下，绿色看起来和店里不一样。更重要的是，坐下时口袋会向前扯。我试图说服自己买得划算，随后却发现，自己已经在找不穿它的理由了。

Luckily, I had remembered to keep the receipt. The label was still attached, and I had not worn the jacket outside. The next morning, I checked the shop's return information and took it back. The assistant inspected it, asked for the receipt and returned the seventy dollars to my card.§好在我记得保留收据。吊牌还在，我也没有穿出门。第二天早上，我先查了商店的退货说明，再把夹克带回去。店员检查衣服、查看收据，然后把七十美元退回我的卡里。

On the way home, I saw a simple blue jacket in another shop. It cost sixty-five dollars and was not on sale. This time, I checked the sleeves, sat down and moved my arms before deciding. It fitted properly. I did not have to change the way I wore it to make it work.§回家路上，我在另一家店看见一件简单的蓝夹克，售价六十五美元，没有打折。这次我先检查袖长，坐下试试，再活动双臂，之后才决定。它很合身，不需要我迁就着穿。

The blue jacket cost sixty-five dollars in total, five dollars less than the green one. That price did not include the two afternoons I had used or the extra bus journey I had paid for. Now, when I see a sale sign, I ask a different question: would I want this item if there were no discount?§蓝夹克总价六十五美元，比绿夹克低五美元。但这个价格没有算上我花掉的两个下午，也没算上多坐一趟公交车的费用。现在看到促销牌时，我会换个问题问自己：如果没有折扣，我还想要这件东西吗？
`);
add(24,'A Walk That Fits into Tuesday','能安排进周二的一次散步','beginner','健康生活','叙事','calendar,duration,modals',4,
'描述一个适合具体日程的活动安排，不把个人经验当作普遍健康结论。',
'fit into|安排进；融入|让活动适应已有日程。~twice a week|每周两次|twice 表示两次。~take a break|休息一下|take / took / taken。~stick to|坚持执行|描述持续遵守具体安排。',
'Why did the narrator stop using the gym?|The timetable did not fit the journey home.|The gym had no equipment.|A friend asked them to stop.|0|绕路去健身房让本已很晚的回家时间更难安排。~What made the walking plan easier to keep?|It required a new membership.|It had a specific place in the workday.|It had to be done every day.|1|散步安排在午饭后，并设定了可调整的短路线。',
'比较原计划和新计划，说明场所、频率、时长和下雨时的处理。',
'设计一个每周两次、每次十五分钟的语言练习安排，说明时间不够时怎么办。=>I’ll practise for fifteen minutes twice a week after dinner. If I’m short of time, I’ll review one short dialogue.',`
In January, I joined a gym near the station. I planned to go three evenings a week on my way home. For the first two weeks, I did. Then a project became busy, my train home got later, and the gym bag stayed under my desk. I kept paying, but I rarely went.§一月，我加入了车站附近的健身房，打算每周三个晚上在回家路上去锻炼。前两周确实去了。后来项目忙起来，回家乘的车越来越晚，健身包就一直放在桌下。我还在付费，却很少去。

I asked myself what I could fit into an ordinary week, not an ideal one. On Tuesdays and Thursdays, I usually finished lunch with fifteen minutes to spare. There was a small park two streets from the office. I decided to walk there twice a week before making any bigger plans.§我开始问自己，普通的一周里能安排什么，而不是理想的一周。周二和周四，我吃完午饭通常还剩十五分钟。办公室隔两条街有个小公园。我决定先每周去走两次，再考虑更大的计划。

The route was simple. I left the office, walked past the library, went around the park and came back along the same road. It took about twelve minutes at a comfortable pace. I did not need special clothes or a booking. I only needed to stop looking at my email long enough to leave.§路线很简单：离开办公室，经过图书馆，绕公园一圈，再沿原路回来。以舒服的速度走，大约十二分钟。不需要特别的衣服，也不用预约，只需要暂时放下邮件，走出办公室。

My colleague Sam joined me one Thursday. At first, we talked about work the whole way. The next week, we left our phones in our pockets and noticed that a new bakery had opened. Walking with someone else made it easier to take a break instead of quietly returning to my desk.§一个周四，同事萨姆和我一起走。起初，我们一路都在聊工作。下一周，我们把手机留在口袋里，注意到一家新面包店开门了。有人作伴后，我更容易真正休息一下，而不是悄悄回到桌前继续干活。

We did not go out in heavy rain. On those days, I used the break to move around inside the building. If a meeting ran late, I took a shorter walk afterwards. Missing one Tuesday did not mean I had to give up the whole week or walk twice as far on Thursday.§大雨天我们不出门。那时，我会利用休息时间在楼里走动。如果会议结束得晚，就在会后走短一点。错过一个周二，不代表整周都要放弃，也不需要周四走两倍的路来补。

After six weeks, I was still following the routine. That was the result I could actually see. I was not measuring a dramatic change in my body, and I was not offering anyone a medical plan. I had simply found an activity that was easier to stick to than the one I had chosen before.§六周后，我仍然照这个安排做。这是我能实际观察到的结果。我没有测量身体是否发生巨大变化，也不是在给任何人制定医疗方案。我只是找到了一项比之前更容易坚持的活动。
`);
add(25,'The Question I Was Afraid to Ask','我不敢问出的那个问题','intermediate','学习成长','叙事','verbs-thinking,connections,verb-forms',5,
'复述学习中的具体障碍，区分“不懂概念”和“不知道下一步怎么做”。',
'keep up with|跟上|keep up with a class / a conversation。~work it out|想明白；解决|work / worked；it 放中间。~in my own words|用我自己的话|不是照读原文。~make sense|说得通；有意义|常用 Does that make sense?',
'What did the narrator hide during class?|That the instructions were unclear to them.|That they had already finished.|That they had missed the train.|0|听懂了不少术语，但不知道练习的第一步。~What showed a better understanding afterwards?|Copying a longer definition.|Explaining a new example without notes.|Completing the original task faster than everyone.|1|换一个例子并不看笔记解释，暴露了是否真正理解。',
'说明课堂表象、实际困难、具体提问和检验理解的办法。',
'用英文向老师说明：术语认识，但不明白为什么先做第二步。=>I recognise the terms, but I don’t understand why we do the second step first. Could you show me with a different example?',`
On the first evening of a data course, I filled three pages with notes. I recognised most of the words on the screen, so I assumed I was following the lesson. When the tutor asked us to try a short exercise, I opened the file and waited. I did not know which column to use first.§数据课程的第一个晚上，我记了三页笔记。屏幕上的词大多认识，于是我以为自己跟上了。老师让我们做一个小练习时，我打开文件，坐着等了一会儿。我不知道第一步该用哪一列。

Around me, people were already typing. I clicked through the instructions again, hoping to work it out without asking. The longer I waited, the more difficult it became to speak. I could imagine a useful question, but I could also imagine everyone discovering that I had not understood the previous twenty minutes.§周围的人已经开始打字。我再次点开说明，希望不用提问也能弄明白。等得越久，越难开口。我想到了一个有用的问题，却也想象着：所有人会因此发现，我之前二十分钟都没真正听懂。

Eventually, the person beside me whispered, "Which column did you start with?" She was stuck in exactly the same place. We asked the tutor together. Instead of saying, "I don't understand anything," I said, "I can identify the numbers, but I don't know what we're comparing. Could you show us how you choose the first column?"§最后，旁边的人小声问：“你先用了哪一列？”她也卡在完全相同的地方。我们一起向老师提问。我没有说“我什么都不懂”，而是说：“数字我认识，但我不知道我们在比较什么。你能演示一下怎么选择第一列吗？”

The tutor drew two small tables on paper. One showed each shop's total sales; the other showed sales per opening day. A shop that opened longer could have a larger total without selling more each day. That distinction made sense to me once I could see two actual shops instead of a page of definitions.§老师在纸上画了两个小表：一个列各店销售总额，另一个列每个营业日的销售额。营业天数多的店，总额可能较大，但每天不一定卖得更多。看到两家具体的店，而不是一页定义后，我理解了这个区别。

To check, she asked us to explain the example in our own words and then change one detail. I made one shop close for a week. My first answer was wrong because I forgot to adjust its opening days. Correcting that mistake taught me more than copying another explanation into my notebook.§为了检查理解，她让我们用自己的话解释这个例子，再改动一个条件。我让其中一家店停业一周。第一次回答错了，因为我忘了调整营业天数。纠正这个错误，比往笔记本上再抄一段解释更有帮助。

I still take notes, but I now leave space for questions. If I cannot keep up with an exercise, I try to name the exact step where I get lost. After class, I choose a different example and explain it without looking. A full notebook is easy to produce. A clear explanation takes more work.§我仍然记笔记，不过会留出写问题的地方。如果跟不上练习，我会尽量指出具体卡在哪一步。课后，我换一个例子，不看笔记进行解释。写满一本笔记很容易，讲清楚却需要更多努力。
`);
add(26,'The Train We Missed','错过火车的那个下午','beginner','旅行出行','叙事','clock,verbs-daily,comparison',6,
'比较备选行程，准确描述出发、到达和时间余量。',
'at least|至少|表示最低数量或时长。~find out|查明；弄清|find / found / found。~instead of|代替；而不是|后接名词或 doing。~on time|准时|不同于表示来得及的 in time。',
'Why did they miss the train?|They went to the wrong station entrance.|They took too long buying food.|The train left early.|0|到达了错误入口，走到正确站台时已晚了。~Why did they choose the later direct train?|It was the earliest arrival.|It gave them time to eat without another change.|It was free.|1|他们放弃到达更早但需要换乘的路线，选择从容一点的直达车。',
'复述误会、两种备选路线、选择原因和到达后的变化。',
'提出晚半小时出发但无需换乘的方案，并问同伴是否接受。=>We could leave half an hour later and take a direct train instead of changing. Would that work for you?',`
We reached the station at ten past one, five minutes before our train was due to leave. I thought that was enough time. Then I saw the signs: this entrance served the local lines, and our platform was on the other side of the building. The passage between them was closed for repairs.§我们一点十分到车站，距离火车原定发车还有五分钟。我以为时间足够。接着看见标牌：这个入口通往本地线路，我们的站台在建筑另一边，连接两侧的通道正在维修，无法通行。

We had to go outside, walk around the station and enter again. When we found the right platform, the train was already moving. My friend Ella looked at me but did not say anything. I was holding the tickets and a printed plan for an afternoon that could no longer happen exactly as written.§我们只好走到外面，绕过车站再进一次。找到正确站台时，火车已经开动。朋友埃拉看着我，什么也没说。我手里拿着车票和打印好的行程表，但这个下午已经不可能完全照计划进行了。

At the information desk, we asked about the next service. There were two choices. A train at half past one required a change and would get us there at two forty. A direct train left at two and arrived at three. We needed to find out whether our tickets were valid on either service.§我们到服务台询问下一班车。有两个选择：一点半出发的车需要换乘，两点四十分到；直达车两点出发，三点到。我们还需要查清原来的车票是否能用于这两班车。

The assistant checked our tickets and explained the conditions. Both trains were possible without an extra payment. We chose the direct one instead of rushing through another station. We had nearly forty minutes, so we bought sandwiches and sat outside. Ella suggested dropping the museum from our plan rather than squeezing everything in.§工作人员核对车票并解释使用条件。两班都可以坐，不用补钱。我们选择直达车，不再赶着去另一个车站换乘。还有将近四十分钟，于是买了三明治，坐在外面。埃拉建议取消博物馆行程，而不是把所有活动硬塞进去。

Our second train left on time. When we arrived, we walked through the old town and spent an hour by the river. We missed the exhibition, but we had time to stop in a small bookshop that was not on my list. Ella found a book she had been trying to buy for months.§第二班车准时开了。到达后，我们穿过老城区，在河边待了一个小时。虽然错过展览，却有时间逛一家原计划里没有的小书店。埃拉找到了一本想买好几个月的书。

On the journey home, I changed my plan for our next trip. I wrote down the station entrance, not just its name, and allowed at least twenty minutes before departure. I also left one part of the afternoon empty. A useful plan could help us choose; it did not need to fill every minute.§回程时，我修改了下次旅行的计划：记下车站入口，而不只是站名，并在发车前至少留二十分钟。我还空出了一段下午时间。好计划可以帮助选择，却不必把每一分钟都排满。
`);
add(27,'When the App Became Another Job','当应用成了另一份工作','advanced','科技与信息','观点叙事','verbs-work,comparison,connections',7,
'区分工具的功能数量与实际收益，用具体证据支持判断。',
'put off|推迟|put off doing something。~in practice|在实际使用中|与理论或预期作比较。~at the expense of|以……为代价|说明收益伴随的损失。~strip it back|删减至必要部分|strip back 在此指简化。',
'What was the central problem with the app?|It could not send notifications.|Maintaining it displaced the work it was meant to support.|It did not allow enough categories.|1|整理工具逐渐占用了原本应该用于实际工作的时间。~What did the narrator keep after the experiment?|Only a list of the next three actions.|Every category and daily chart.|No record of tasks at all.|0|最终只保留下一步三个行动，细节仍在原文件中。',
'用一个具体功能说明它最初为何有吸引力、何时带来成本，以及删减后的取舍。',
'向团队解释为什么不启用所有通知，但保留紧急提醒。=>In practice, routine notifications interrupt focused work. We’ll keep urgent alerts and review the other updates at set times.',`
The app promised to organise my projects, reading, exercise and personal errands in one place. During the first weekend, I built coloured categories and connected several calendars. Each task could have a priority, a deadline, a label and a progress measure. I enjoyed setting it up because the screen made my scattered responsibilities look manageable.§这个应用承诺把项目、阅读、运动和私人事务集中管理。第一个周末，我建立了彩色分类，还关联了几个日历。每个任务都能设置优先级、截止日期、标签和进度指标。我很享受配置过程，因为屏幕让零散的责任看起来变得可控。

By the third week, I was spending part of every evening maintaining the system. If I postponed a task, I adjusted its date in two views and checked the effect on a weekly chart. Sometimes I would put off writing a difficult paragraph by reorganising the project that contained it. The system recorded activity, but not all of that activity moved the work forward.§第三周，我每天晚上都要花一段时间维护这套系统。推迟任务时，要在两个视图里改日期，再检查周图表的变化。有时，我通过整理某个项目，拖延写其中一段难写的文字。系统记录了活动，但这些活动并不都让工作取得进展。

A colleague asked a question that caught me off guard: "What decision can you make with that chart?" I explained what each colour meant, then realised I could not answer her question. The chart showed how many tasks I had closed. It did not show whether I had finished the one piece of work that mattered most that week.§一位同事的问题让我措手不及：“你能用这张图作什么决定？”我解释了每种颜色的意思，随后发现自己没回答问题。图表展示关闭了多少任务，却没说明那周最重要的一件工作是否完成。

I decided to strip it back for a fortnight. I kept a single list of the next three actions and placed project details in their existing documents. I turned off routine notifications and left reminders only for appointments with other people. At first, the simpler screen felt incomplete. There were fewer places to look busy without making a choice.§我决定简化系统，试行两周。只保留一张列出接下来三个行动的清单，项目细节仍放在原有文档里。我关掉常规通知，只保留与他人约定事项的提醒。最初，简洁的屏幕让我觉得不完整：不作选择就能显得忙碌的地方少了。

In practice, the smaller system was easier to maintain. It did lose something: I could no longer search a detailed history of every postponed errand. For my purposes, that was an acceptable trade-off. Another person might need the history for billing or coordination. The important question was which decisions the information supported, not whether the feature looked sophisticated.§实际使用中，精简后的系统更易维护。它确实失去了一些东西：我无法再检索每件延期小事的详细历史。对我的需求而言，这个取舍可以接受。其他人可能需要历史来计费或协调。关键在于信息支持什么决定，而不在于功能看起来多高级。

I still use the app, but I no longer treat complete organisation as a separate goal. A tool can reduce uncertainty, preserve a commitment or make a next step visible. When maintaining it happens at the expense of those outcomes, I now consider removing a feature before adding another one.§我仍然使用这个应用，但不再把“把一切整理得完美”当作独立目标。工具可以减少不确定性、保留承诺，或让下一步清晰可见。如果维护工具反而牺牲了这些结果，我现在会先考虑删掉一个功能，再考虑增加一个。
`);
add(28,'Dinner at Three Different Times','三个时间表，一顿家庭晚饭','beginner','家庭关系','叙事','clock,calendar,modals',8,
'描述彼此冲突的安排，提出具体可行的共同时间。',
'work out|商量出；解决|work out a plan。~take turns|轮流|take turns doing something。~heat it up|把它热一下|代词 it 放中间。~make room for|给……留出空间或时间|此处指为相处留时间。',
'Why was dinner difficult to arrange?|Everyone disliked the same food.|The family came home at different times.|The kitchen was closed.|1|三个人的工作、课程和回家时间不同。~What did the family agree to do?|Eat together every evening without exception.|Protect one shared dinner and simplify the other evenings.|Stop cooking at home.|1|他们保留周日晚饭作为固定相聚时间，其他晚上灵活安排。',
'先分别介绍三个人的时间，再说明他们怎样安排做饭和一起吃饭。',
'提出每周三一起吃晚饭，其余日子轮流做饭。=>Could we have dinner together on Wednesdays and take turns cooking on the other days?',`
For years, dinner at our house was at seven. My mother cooked, my father set the table, and I washed the dishes afterwards. Then my father began an evening course, my mother changed her working hours, and I started a job across the city. The old plan no longer fitted our week.§多年来，我们家都在七点吃晚饭。妈妈做饭，爸爸摆餐具，我饭后洗碗。后来爸爸开始上晚课，妈妈换了工作时间，我也到城市另一头上班。原来的安排不再适合我们的一周。

On Mondays, my mother came home at six, I arrived at half past seven, and my father did not return until nine. She kept waiting to see who wanted to eat. I often bought a sandwich on the way home because I did not know what was ready. By nine, someone was always tired or hungry.§周一，妈妈六点回家，我七点半到，爸爸九点才回来。妈妈总在等，看谁要吃饭。我常因不知道家里准备了什么，在回家路上买三明治。到了九点，总有人又累又饿。

One Sunday, we put our calendars on the table and tried to work out a different arrangement. We found that Tuesday and Thursday were especially difficult. Instead of asking everyone to wait, we agreed to cook food that was easy to share at different times. Whoever ate later could heat it up.§一个周日，我们把日历放到桌上，试着商量新安排。周二、周四尤其难协调。于是，我们不再让所有人互相等，而是同意做一些方便分时吃的食物。晚吃的人自己热一下。

We also decided to take turns cooking. On my evening, I made rice, vegetables and chicken, then left a note saying what was in each container. My father cooked soup on Saturdays. My mother admitted that choosing what to cook every day had become more tiring than the cooking itself.§我们也决定轮流做饭。轮到我时，我做了米饭、蔬菜和鸡肉，并留张纸条说明各个盒子里装的是什么。爸爸周六煮汤。妈妈说，每天决定做什么，已经比做饭本身更累了。

There was still one thing we wanted to keep: a meal with nobody rushing away. We chose Sunday at half past six. Phones stayed off the table, and the meal did not need to be special. One week, we ate eggs on toast because none of us had been shopping. We still sat together for an hour.§但有一件事我们仍想保留：一起吃一顿谁都不急着走的饭。我们选定周日六点半。手机不上桌，饭菜也不必特别。有一周，大家都没买菜，只吃鸡蛋配吐司，却仍坐在一起聊了一个小时。

Our kitchen is not more organised in every way. There are sometimes three containers in the fridge with three different names. But we argue less about who should have waited. We found a way to make room for one another without pretending that all our days followed the same timetable.§我们的厨房并不是所有方面都更整齐了：冰箱里有时放着三个写着不同名字的饭盒。但我们少了关于“谁应该等谁”的争执。我们找到了给彼此留时间的办法，也承认每个人的日程并不相同。
`);
add(29,'What the Recipe Did Not Tell Me','菜谱没有告诉我的事','beginner','饮食与烹饪','叙事','quantity,verbs-thinking,comparison',9,
'根据实际情况描述步骤、判断状态，并准确表达数量变化。',
'follow the instructions|按照说明做|follow 也可指遵循步骤。~a little at a time|每次加一点|强调分次，而非一次加入。~turn down|调低|turn down the heat / turn it down。~twice as much|两倍那么多|比较不可数数量。',
'Why did the sauce become too thick?|The narrator used a wider pan and cooked it too long.|There were no tomatoes.|The sister added too much water.|0|锅的大小和火力不同，固定时间不适用。~What did the narrator change in the written recipe?|Only the name of the dish.|Added descriptions of appearance and a smaller starting quantity.|Removed all measurements.|1|补上了状态描述，并减少起始用水量，方便逐步调整。',
'描述第一次失败的具体原因，以及第二次怎样调整水、火和判断方式。',
'说明做双份不意味着盐也要一开始就一次加双倍。=>I’m making twice as much, but I’ll add the salt a little at a time and taste it before adding more.',`
The recipe looked simple: cook an onion, add tomatoes and beans, then leave the pan on a low heat for twenty minutes. I had invited my sister for dinner and wanted to make something warm and easy. I bought all the ingredients, measured them carefully and put the instructions beside the cooker.§菜谱看起来很简单：先炒洋葱，加入番茄和豆子，再小火煮二十分钟。我请姐姐来吃晚饭，想做一道热乎又容易的菜。我买齐材料，仔细量好，把说明放在炉子旁边。

I tried to follow the instructions exactly. After twenty minutes, however, most of the liquid had disappeared. The beans were sticking to the bottom, and the onion tasted too strong. I turned off the heat and checked the recipe again. The numbers were right. The food in front of me did not look right at all.§我尽量严格照说明做。但二十分钟后，液体几乎煮干了。豆子粘在锅底，洋葱味也太冲。我关火，又看一遍菜谱。数字都没错，眼前的菜却完全不像应该有的样子。

My sister arrived while I was considering ordering a pizza. She looked at the pan and asked what kind I had used. Mine was much wider than the one in the recipe's photograph. The same amount of sauce covered a larger surface. She also noticed that my idea of a low heat was still quite hot.§姐姐来时，我正考虑点披萨。她看了看锅，问我用的是什么锅。我的锅比菜谱照片中的宽很多，同样多的酱汁铺在更大的面积上。她还发现，我认为的“小火”其实仍然很旺。

We added warm water a little at a time and stirred the beans away from the bottom. Then we turned down the heat and put the pan back on the cooker. Instead of watching only the clock, we watched the sauce. When it moved slowly from the spoon but still covered the beans, we stopped cooking.§我们每次加一点温水，把锅底的豆子轻轻搅开，接着调低火力，把锅放回炉子上。这次，我们不只看钟，也看酱汁。当它能从勺子上缓慢流下、又仍能裹住豆子时，就停止加热。

The following week, I cooked it again. I started with less water and kept some ready to add. I wrote notes beside the recipe: "onion soft, not brown" and "sauce loose enough to stir." When I made twice as much for four people, those descriptions were more useful than simply doubling the cooking time.§接下来一周，我又做了一次。起初少放些水，同时备好水随时添加。我在菜谱旁写下：“洋葱变软，但不要变褐色”“酱汁要能轻松搅动”。后来做四人份、分量翻倍时，这些描述比直接把烹饪时间加倍更有用。

I still use measurements. They tell me where to begin. But now I also look for instructions that explain what I should see, hear or feel as I cook. Before serving that second dinner, I tasted a spoonful. Then, for the first time that evening, I sat down instead of checking the recipe again.§我仍然使用量具，因为它们告诉我从哪里开始。但现在，我也会寻找能说明烹饪时应该看到、听到或感受到什么的指引。第二次上菜前，我尝了一勺。随后，那天晚上我终于坐了下来，没有再看一遍菜谱。
`);
add(30,'Finishing Behind the Runner in Blue','在蓝衣跑者后面抵达终点','intermediate','运动与挑战','叙事','comparison,verb-forms,modals',10,
'用具体比较说明目标如何调整，并区分结果排名与过程选择。',
'keep up with|跟上|强调维持相同速度或进展。~fall behind|落后|fall / fell / fallen。~slow down|慢下来|可用于速度和工作节奏。~ahead of|在……前面|这里用于赛跑中的位置。',
'Why did the narrator begin too quickly?|They followed a faster runner rather than their plan.|The coach ordered them to sprint.|The course was shorter than expected.|0|为了追蓝衣跑者，偏离了原先节奏。~What was different about the final kilometre?|The narrator deliberately chose a sustainable pace.|The narrator became the race winner.|The event was cancelled.|0|最后一公里主动选择可持续节奏，而非继续与某个人较劲。',
'复述赛前目标、开跑后的选择、中途困难和最后的决定，包含两个比较级。',
'向同伴说明你会慢一点，但仍想跑完全程。=>I need to slow down, but I still want to finish the whole course. You can go ahead of me.',`
Before my first five-kilometre event, I had a modest plan: run the first half slowly enough to speak in full sentences, then decide whether to increase my pace. During training, I could usually manage that. On the morning of the event, the crowd, music and numbered shirts made the plan feel less important than it had at home.§第一次参加五公里活动前，我的计划很朴素：前半程跑得慢一点，保持还能说完整句子的速度，再决定要不要加速。训练时通常能做到。但活动当天，人群、音乐和号码布，让在家制定的计划显得没那么重要了。

A runner in a bright blue shirt started just ahead of me. I decided to keep up with him for the first few minutes. He looked relaxed, and I assumed that meant his pace would suit me. I did not know how often he trained or what distance he normally ran. I was comparing two shirts in a crowd, not two runners with the same experience.§一位穿亮蓝上衣的跑者从我前面起跑。我决定先跟他几分钟。他看上去很轻松，我就以为他的速度也适合我。但我不知道他训练多频繁、平常跑多远。我比较的只是人群里的两件上衣，而不是经历相同的两个跑者。

After two kilometres, I could no longer finish a sentence without taking another breath. The blue shirt moved further away. I tried to close the gap and felt worse. When I finally slowed to a walk, several people passed me. That bothered me more than the tiredness. My original aim had somehow become an obligation not to fall behind a stranger.§两公里后，我已经不能不换气地说完一句话。蓝色上衣越来越远。我试图缩小距离，却更难受了。终于减速走路时，好几个人超过了我。相比疲倦，这更让我在意。不知何时，最初的目标变成了“不能落后于一个陌生人”。

At the water station, a volunteer asked whether I needed help. I said I wanted a short rest. I moved to the side, drank some water and watched people choose different ways through the event. Some walked together; others ran alone. Nobody was following the private contest I had invented with the runner in blue.§在饮水站，志愿者问我是否需要帮助。我说想短暂休息。我站到一旁，喝了点水，看着人们以不同方式完成活动：有人结伴走，有人独自跑。没有人在意我与蓝衣跑者之间那场自己想象出来的比赛。

For the last kilometre, I chose a pace I could control. I walked when I wanted to and began running again without trying to recover every lost second. Near the finish, I saw the blue shirt outside the course. He had already finished and was cheering for someone else. He probably had no idea that I had been trying to race him.§最后一公里，我选择了自己能掌控的速度。想走就走，再开始跑时，也不试图追回每一个“损失”的秒数。临近终点，我在赛道外看见那件蓝衣。他已经完成，正在为别人加油。他大概完全不知道，我一直想和他比赛。

My finishing time was slower than my best training time. I wrote it down anyway, along with the decision that had made the middle of the race so difficult. For the next event, I planned to start with a friend who knew my pace. I wanted a reminder that I could slow down before I was forced to stop.§最终成绩比我训练时最好的一次还慢。我仍把它记下来，也记下那个让中段变得艰难的决定。下一次活动，我打算和了解我节奏的朋友一起起跑。我希望有人提醒我：不必等到被迫停下，才允许自己慢下来。
`);
add(31,'The Street After the Rain','雨后的那条街','intermediate','城市与环境','观察叙事','prepositions,quantity,verbs-work',11,
'区分观察、猜测和后续核实，描述位置与变化。',
'get around it|绕过它|get around an obstacle 绕过障碍。~rather than|而不是|比较两个行动选择。~follow up|跟进|follow up on a report。~for the time being|暂时|表示当前安排仍可能调整。',
'What did the residents discover about the drain?|It had been completely removed.|It was blocked by leaves and packaging.|It served the entire city.|1|清理前的检查发现，排水口被树叶和包装物堵住。~Why did they photograph the street again?|To compare conditions after similar rain.|To advertise a shop.|To prove all flooding had ended permanently.|0|他们希望比较相近降雨条件下同一处的情况，不把一次观察当作永久结论。',
'分别说明居民实际看见了什么、最初猜测什么，以及还需要检查什么。',
'向管理人员报告入口积水，包含位置、时间和你能确认的情况。=>There was standing water outside the north entrance at eight this morning. I saw leaves covering the drain, but I don’t know whether there is another blockage underneath.',`
After a night of heavy rain, a deep puddle stretched across the pavement outside our building. People stepped into the road to get around it. A delivery worker pushed his bicycle through the water and then lifted it onto the kerb. By the time I reached the bus stop, my left shoe was wet and I was annoyed with the street rather than curious about it.§一夜大雨后，我们楼外的人行道上积了一大片水。行人绕到马路上通过。一位送货员推着自行车穿过积水，再抬上路沿。我走到公交站时，左脚鞋子已经湿了，只顾埋怨这条街，没有想过原因。

That afternoon, our neighbours' group filled with explanations. Someone blamed the new building across the road. Another person said the drains were simply too small. Neither had checked. Rosa suggested starting with what we could see. We took photographs from the same corner and marked the place where the water seemed deepest.§当天下午，邻居群里出现了各种解释。有人怪马路对面的新楼，也有人说排水管本来就太小，但谁也没检查过。罗莎建议先看能确认的事实。我们从同一个街角拍照，标出积水看起来最深的位置。

Near the crossing, leaves and pieces of packaging covered a drain. A second drain further along the pavement was clear. We reported both observations to the maintenance team rather than saying we knew the whole cause. The team removed the material and checked the opening. They explained that they still needed to inspect the pipe below.§路口附近，一个排水口被树叶和包装碎片覆盖。沿人行道再往前，另一个排水口则是通畅的。我们把两处观察都报告给维护人员，没有声称已经找出全部原因。工作人员清走杂物，检查入口，并说明仍需要查看地下管道。

The report received a reference number, which made it possible to follow up without retelling the story each time. A shopkeeper agreed to keep loose packaging away from the crossing. Several residents offered to photograph the street after the next heavy shower. Nobody was asked to enter the road or clear the drain themselves.§报告有了编号，之后跟进就不必每次从头解释。一位店主同意不再让散落的包装物留在路口。几位居民愿意在下一次大雨后再拍照。没有人被要求走进车道，或自行清理排水设施。

Two weeks later, rain left a smaller puddle in the same place. That looked encouraging, but we did not know whether the rainfall had been equally heavy. Our photographs showed an improvement in the pavement, not proof that every drainage problem had been solved. The maintenance team confirmed that their inspection was still open.§两周后，同一位置在雨后只留下一片较小积水，看起来有所改善。但我们不知道两次雨量是否相同。照片显示人行道情况变好了，却不能证明排水问题已经全部解决。维护团队也确认，检查还没有结束。

For the time being, I pay more attention to that corner. I notice where the street slopes and which doorway becomes difficult to reach first. The pavement is a small part of a much larger system, but it is also where people carry shopping, guide pushchairs and wait for buses. Starting with that detail gave our complaint a place, a record and a next step.§至少目前，我开始更留意那个街角：街面向哪里倾斜，哪一处门口最先变得难以接近。人行道只是大系统的一小部分，但也是人们提菜、推婴儿车、等公交的地方。从这个细节出发，我们的抱怨有了具体位置、记录和下一步。
`);
add(32,'Ten Minutes with One Painting','与一幅画相处十分钟','intermediate','文化与艺术','观察叙事','adjectives,verbs-thinking,connections',12,
'用具体视觉细节描述作品，区分看到的内容与自己的解释。',
'at first glance|乍看之下|glance 指短暂一瞥。~in the background|在背景中|与 in the foreground 对照。~pay attention to|留意|to 是介词。~make of|如何理解；如何评价|What do you make of it?',
'What did the narrator notice only after waiting?|A small figure near the window.|A price written on the frame.|A second painting behind the first.|0|多看一会儿后才注意到窗边的小人物。~How did the museum label affect the narrator?|It completely settled the painting’s meaning.|It added context without removing the questions.|It described exactly the same personal memory.|1|标签补充背景，却没有替观众决定唯一解释。',
'不用 beautiful 或 interesting，描述画中三处细节，再说明你对其中一处的解释。',
'描述一张照片，明确区分“看见两个人”与“猜测他们在等车”。=>I can see two people beside the road. I think they may be waiting for a bus, but the photograph does not show a bus stop.',`
I used to move through art galleries as though I were trying to finish a list. I looked at a painting, read the label and moved on. If someone asked what I had enjoyed, I could usually remember a famous name but not a particular brushstroke, shadow or face. On one quiet afternoon, I tried a different approach: ten minutes with one painting.§以前逛美术馆，我像在完成清单：看画，读标签，再走向下一幅。若有人问喜欢什么，我通常记得某个名家的名字，却想不起具体笔触、阴影或面孔。一个安静的下午，我决定换种方式：只和一幅画相处十分钟。

I chose a modest painting of a room after a meal. At first glance, it seemed almost empty. There were two chairs, a table and a pale window. I resisted reading the label straight away. Instead, I named the colours I could see and noticed that the light on the table was warmer than the light on the floor.§我选了一幅并不起眼的画，内容是饭后的房间。乍看几乎空无一人：两把椅子、一张桌子、一扇颜色很浅的窗。我忍住没有马上读标签，而是先说出看到的颜色，并发现桌面的光比地板上的光更暖。

After a few minutes, I noticed a small figure in the background, close to the window. The person's face was turned away. Suddenly, the empty chairs suggested an absence rather than a tidy room. Had the other diners left? Was this person waiting for someone? The paint did not answer, and my questions were not facts about the scene.§几分钟后，我注意到背景里、窗边有一个小人物，脸朝着另一边。那些空椅子忽然让我想到“有人离开了”，不再只是整洁的房间。其他用餐者走了吗？这个人在等人吗？画没有回答，这些问题也不是画面已经证实的事实。

Another visitor stopped beside me. She thought the room looked peaceful. I said it seemed lonely to me. We pointed to the same details but connected them differently: the unused cup comforted her because it suggested someone would return; I had seen it as evidence that someone had gone. Neither of us needed to persuade the other.§另一位观众在我身边停下。她觉得房间很平静，我却觉得孤独。我们指着相同的细节，却作了不同联想：没动过的杯子让她安心，因为似乎有人还会回来；我则把它看成有人已经离去的痕迹。我们不需要说服对方。

Eventually, I read the label. It told me when the work had been made and described the artist's interest in ordinary interiors. That context helped, but it did not settle what I should make of the room. I went back to the window and began to pay attention to the narrow strip of blue around its frame.§最后我才读标签。它说明创作时间，也介绍画家对日常室内景象的兴趣。这些背景有帮助，却没有决定我该怎样理解这个房间。我重新看向窗户，开始留意窗框周围的一条窄蓝边。

When I left, I had seen fewer paintings than usual. Yet I could describe this one on the journey home without opening the museum's website. I remembered the chairs, the turned face and the disagreement between two viewers. Spending longer had not made me an expert. It had given me something specific to look at, remember and discuss.§离开时，我看过的画比平时少，但回家路上，不打开美术馆网站也能描述这一幅。我记得椅子、转开的脸，以及两位观众不同的理解。多看一会儿没有让我成为专家，却给了我可以具体观察、记忆和讨论的东西。
`);
add(33,'The Result That Did Not Fit Our Guess','没有支持猜想的结果','advanced','科学与判断','实验叙事','comparison,quantity,connections',13,
'清楚区分假设、比较条件、观察结果与结论边界。',
'carry out|进行；实施|carry out a test / an experiment。~account for|解释；考虑进去|此处指考虑可能影响比较的因素。~rule out|排除|未检测到不等于完全排除。~on the basis of|根据|说明结论所依赖的证据。',
'What weakened the team’s first comparison?|The two sets of plants differed in more than light.|They had no written prediction.|Every plant died.|0|浇水方式和位置等条件也不同，不能把差异全归因于光照。~What did the second test establish?|The lamp always improves growth.|The team could not confidently support its original claim under those conditions.|Light has no effect on any plant.|1|结果只限制在此次条件下，不能扩展为普遍结论。',
'按“预测—第一次问题—修改—观察—结论边界”复述实验，指出一个尚未排除的解释。',
'解释某次测试结果不明显，因此需要重复测试，而不是宣布两个方案完全相同。=>We did not observe a clear difference in this test. We need more evidence before saying the two options perform the same way.',`
Our evening science group wanted to investigate a simple question: would an extra desk lamp make young bean plants grow taller? Before starting, we wrote down a prediction and agreed on a way to measure height. Everyone expected a visible difference. The lamp looked like a useful intervention, and it was tempting to treat the experiment as a demonstration of something we already knew.§我们的晚间科学小组想研究一个简单问题：多加一盏台灯，会让豆苗长得更高吗？开始前，大家写下预测，统一了测量高度的方法。所有人都期待看见差异。灯看起来像个有用的干预，因此我们很容易把实验当作演示一个“已经知道”的结论。

We placed one tray beside a window and another beneath the lamp. After a week, the plants in the second tray were taller. At the next meeting, however, someone asked who had watered them. Different people had used different amounts of water. The trays were also on different shelves. We had changed several conditions while describing only one. We had failed to account for the different watering routines.§我们把一盘苗放在窗边，另一盘放在台灯下。一周后，第二盘长得更高。但下次聚会时，有人问是谁浇的水。原来不同的人用了不同水量，两盘苗也放在不同架子上。我们同时改变了好几个条件，却只描述了其中一个，没有考虑不同浇水方式的影响。

To carry out a more useful comparison, we started again. We used matching containers, divided the seeds between them without selecting the strongest ones, and recorded the same watering routine. Both groups received the usual room light, while one received additional light from the lamp. We also marked the measuring point so that two people would not choose different starting positions.§为了作更有用的比较，我们重新开始。使用相同容器，不挑选最健壮的种子来分组，并记录统一的浇水安排。两组都接受通常的室内光，其中一组额外接受台灯照明。我们还标明测量起点，避免两个人选择不同位置。

The second result was less satisfying to look at. Some plants under the lamp were taller; others were shorter than plants in the comparison group. We entered every measurement, including the small plants we might once have ignored. There was no clear pattern strong enough for us to repeat our first claim with confidence. A tidier story would have required leaving out inconvenient observations.§第二次的结果看起来没那么令人满意。灯下有些苗更高，有些却比对照组更矮。我们记录每一次测量，包括过去可能被忽略的小苗。没有出现足够清晰的规律，让我们有把握重复最初的主张。若想讲一个更整齐的故事，就得删掉那些不方便的观察。

That did not establish that extra light could never matter. Our small test involved one kind of plant, one lamp and a short period. We had not measured all the relevant conditions, so we could not rule out every alternative explanation. Even our choice of height as the main outcome deserved another question: taller did not automatically mean healthier or stronger.§这并不能证明额外光照永远没有作用。我们的小测试只涉及一种植物、一盏灯和一段较短时间，也没有测量所有相关条件，因此无法排除每种替代解释。甚至把高度作为主要结果的做法也值得追问：更高并不自动意味着更健康或更强壮。

On the basis of the second test, we rewrote the conclusion rather than adjusting the measurements to rescue the prediction. We described what we had done, what varied and what remained uncertain. The result did not give us the confident answer we had wanted. It did give the next group a clearer starting point, because they could see which question had actually been tested.§根据第二次测试，我们修改了结论，而不是调整测量值来挽救预测。我们写清做了什么、哪些地方有差异，以及什么仍不确定。结果没有给出我们期待的肯定答案，却让下一组有更清楚的起点，因为他们能看出究竟检验了什么问题。
`);
add(34,'Three Objects from the Same Street','同一条街的三件旧物','advanced','历史与文化','观察叙事','verb-forms,prepositions,connections',14,
'比较不同来源的历史材料，说明可确认信息与解释之间的距离。',
'date back to|可追溯到|主语通常是物品、传统或建筑。~take for granted|认为理所当然|过去习惯未必与现在相同。~leave out|遗漏；省略|leave / left / left。~piece together|拼合线索|由零散材料重建有限的理解。',
'Why did the photograph not settle who used the street?|It showed only one moment from one viewpoint.|It had no buildings.|It was printed in colour.|0|照片只保存了某个时刻和视角，并不代表街上所有人的生活。~What did the exhibition invite visitors to compare?|Three accounts that provided different kinds of evidence.|Three identical copies of one object.|Only the price of old objects.|0|照片、票据和口述记忆提供的信息类型不同。',
'分别说明照片、票据、口述记忆能提供什么，又各自遗漏了什么。',
'描述一张家庭旧照时，区分照片所见与后来亲人讲述的故事。=>The photograph shows four people outside a shop. According to my aunt, it was taken on the day the shop opened, but that detail is not written on the photograph.',`
The exhibition occupied a single room above a library. Its title was the name of a street I passed every day. Instead of presenting a complete history, the curator had placed three objects on separate tables: a photograph, a shop receipt and a recorded interview. All three concerned the same short stretch of pavement, but none could tell its story alone.§展览位于图书馆楼上的一个房间，标题就是我每天经过的街名。策展人没有展示一套完整历史，而是在三张桌上分别放了一张照片、一张商店票据和一段访谈录音。三件材料都与同一小段街道有关，却没有任何一件能独自讲完它的故事。

The photograph appeared to date back to the early part of the twentieth century. People stood outside a bakery, facing the camera. I first noticed their formal clothes and imagined a special celebration. The label offered a more cautious description: the exact occasion was unknown. A posed image could reveal buildings and clothing while leaving out the ordinary movement that had stopped for the photographer.§照片似乎来自二十世纪初。人们站在面包店外，面向相机。我先注意到正式的衣着，猜想那是某种庆典。标签的描述更谨慎：具体场合不详。摆拍能显示建筑和服装，却会遗漏为拍照而暂停的日常活动。

The receipt listed flour, fuel and delivery charges. Its numbers made the shop feel less like a charming scene and more like a business with bills to pay. Yet the figures did not tell us how much the owner earned or how workers were treated. Several prices had been crossed out and replaced, and the curator had preserved both versions rather than quietly choosing one.§票据列着面粉、燃料和配送费用。这些数字让商店不再只是迷人的画面，也是一家需要支付账单的生意。但数字无法告诉我们店主收入多少、雇员受到怎样的对待。几项价格被划掉重写，策展人保留了两个版本，没有悄悄选定一个。

In the interview, a former resident remembered buying bread there as a child. Her description included a step at the entrance that her grandmother found difficult. That detail was invisible in the photograph until I looked again. Her account gave meaning to a feature I had taken for granted. It also depended on a memory recorded many years after the visits she described.§访谈里，一位以前的居民记得童年在那里买面包。她提到入口有一级台阶，祖母走起来很吃力。直到重新看照片，我才注意到这个细节。她的讲述赋予了一个我习以为常的结构以意义，但那段记忆也是在多年后才被录下的。

The display asked visitors to piece together a description using all three sources. I could say that there had been a bakery and identify some of its costs. I could also report one person's remembered experience of entering it. I could not honestly turn those fragments into a confident claim that everyone on the street had lived in the same way.§展览请观众综合三个来源拼出一段描述。我可以说这里曾有一家面包店，并指出它的部分成本，也能转述一个人记得的进店经历。但我不能诚实地把这些碎片，变成“街上所有人都过着同一种生活”的肯定主张。

Outside, the bakery building had become a phone shop. I noticed the entrance step before I noticed the sign. The exhibition had not replaced my present-day street with a complete picture of the past. It had changed the questions I asked of both: whose experience was visible, which details had survived, and what would be missing from the record we left behind?§走出展览后，原面包店已经成了手机店。我先看见入口台阶，才注意招牌。展览并没有用一幅完整的过去图景替代眼前街道，却改变了我对过去和现在的提问：谁的经历被看见，什么细节保存下来，而我们留下的记录又会漏掉什么？
`);
add(35,'Before the Appointment','就诊之前，我准备了什么','intermediate','健康生活','叙事','duration,verbs-thinking,calendar',15,
'清楚描述时间线、实际体验和想向专业人员核实的问题。',
'write down|记下|write / wrote / written。~leave something out|遗漏某事|避免在叙述中漏掉重要信息。~in order|按顺序|此处表示按时间整理。~go over|逐一查看；复核|go over a list together。',
'Why did the narrator make a list?|To decide on a treatment independently.|To describe events without forgetting details.|To replace the appointment.|1|清单用于准确叙述，并没有替代专业判断。~What did the narrator do before leaving?|Asked the clinician to clarify the agreed next steps.|Guessed an unclear instruction.|Copied another patient’s plan.|0|离开前逐项复核下一步及需要再次联系的情形。',
'复述从预约、整理信息到确认下一步的过程，区分观察和自己的猜测。',
'向医生说明症状从周一开始，但你不确定是否与工作安排有关。=>It started on Monday. I noticed it after work, but I’m not sure whether the two are connected.',`
When I booked the appointment, the receptionist asked what I wanted to discuss. I gave a short answer, then realised that I had described the last bad afternoon rather than the whole week. The events were clear in my memory as separate moments, but I had not put them in order. I decided to prepare before I went.§预约时，前台问我想咨询什么。我简短回答后才意识到，自己描述的是最近一个不舒服的下午，而不是整周的情况。这些事件作为片段很清楚，我却没按时间排列。于是，我决定就诊前先整理一下。

I began to write down when the discomfort had started, how long each episode had lasted and what I had actually noticed. I avoided filling the page with guesses about the cause. Where I was unsure of a time, I wrote "approximately" instead of pretending to remember exactly. That helped me separate observation from explanation.§我开始记下不适何时出现、每次持续多久，以及自己实际注意到什么。我没有写满关于病因的猜测。记不准的时间，就注明“大约”，而不是假装记得很精确。这样能把观察与解释分开。

I also listed the medicines and other products I was taking, using their labels rather than relying on names I half remembered. I brought the list with me and left room for questions. The receptionist had explained the clinic's arrival arrangements when I booked, so I checked those details again before leaving home.§我也列出正在使用的药物和其他产品，名称以包装标签为准，没有依赖模糊记忆。我带上清单，并留出写问题的位置。预约时，前台已解释到达后的安排，我出门前又核对了一次。

During the appointment, I initially tried to read every note aloud. The clinician asked me to start with the concern that mattered most to me. Once I had explained that, we used the timeline to fill in the detail. Preparing had helped, but it did not mean the conversation had to follow my page from top to bottom.§就诊时，我起初试图把每条笔记都念出来。医生请我先说最在意的问题。说明后，我们再用时间线补充细节。提前准备有帮助，但不意味着谈话必须从上到下照着纸上的顺序进行。

Near the end, I worried that I might leave something out. We went back to my questions and checked which had been answered. I asked the clinician to go over the next steps in plain language and to explain when I should contact the clinic again. If I had not understood something, I said so rather than nodding.§快结束时，我担心遗漏问题。我们回到清单，确认哪些已经得到回答。我请医生用通俗语言复核下一步，并说明何时需要再次联系诊所。没听懂的地方，我会直接说出来，而不是只点头。

At home, I added the agreed arrangements to my calendar and kept the notes together. The list had not diagnosed anything, and someone else's appointment could require a different conversation. Its value was simpler: it helped me give a clearer account and check that I understood what had actually been agreed.§回家后，我把已经商定的安排记进日历，保留好相关笔记。清单没有作出诊断，别人的就诊也可能需要完全不同的谈话。它的价值更简单：帮助我把经历讲清楚，并确认自己理解了实际商定的内容。
`);
add(36,'Before I Clicked Accept','点下接受之前','advanced','工作协作','决策叙事','duration,modals,verbs-thinking',16,
'阅读一段示例条款，明确费用基准、通知期限与尚待解释的部分。',
'be responsible for|负责|介词 for 后接名词/doing。~in writing|以书面形式|用于保留明确答复。~refer to|指的是；提及|需核对指代对象。~come to an end|结束|描述期限的终点。',
'What was unclear about the quoted price?|Whether it was monthly and whether equipment was included.|Whether the room had a window.|Whether the provider had an email address.|0|需确认月费口径及设备是否另计。~What did the narrator do with the unclear cancellation wording?|Asked for clarification and kept the reply.|Assumed it meant immediate cancellation.|Treated this example as a rule for every agreement.|0|在作决定前要求解释，并保存书面答复。',
'复述三个核对点，说明哪些已得到回答，哪些仍取决于具体协议。',
'就一份报价追问：三十天通知期是从发送邮件当天开始计算吗？=>Could you confirm in writing whether the thirty-day notice period starts on the day I send the email?',`
The shared office looked exactly right: close to the station, quiet enough for calls and available two days a week. The booking page displayed a single monthly price and an inviting button marked "Accept." I was ready to click when I noticed a link to the terms. I opened it, expecting little more than the same information in longer sentences.§这间共享办公室看起来完全合适：靠近车站，安静到可以打电话，每周能用两天。预订页面显示一个月费和醒目的“接受”按钮。我正要点击，注意到条款链接。打开时，我以为里面只是把相同信息写得更长。

The first question concerned what the price covered. One paragraph referred to "standard facilities," while another said customers could be responsible for certain equipment charges. I could not tell whether using a screen during a meeting would cost extra. That uncertainty mattered more to my budget than the welcoming photograph of the room.§第一个问题是价格包含什么。一段提到“标准设施”，另一段又说某些设备费用可能由客户承担。我看不出开会用显示屏是否要另付费。相比房间的温馨照片，这个不确定之处对我的预算更重要。

Next, I looked at how the arrangement would come to an end. The example agreement required notice before a stated renewal date, but the page did not make that date obvious. I had nearly assumed that stopping my visits would stop the payments. Nothing I had read supported that assumption. I wrote down the exact wording instead of trying to remember its general meaning.§接着，我看了安排如何结束。这份示例协议要求在指定续约日前通知，但页面没有清楚显示那个日期。我差点以为停止到访就会停止收费，然而已读内容并不支持这个假设。我记下原句，没有只凭大概印象。

I emailed the provider with three numbered questions: did the displayed amount refer to one calendar month, which equipment was included, and what date would the notice period be counted from? I asked for the answers in writing. The reply explained the screen charge and attached a schedule showing the renewal date. It also corrected a sentence the provider agreed was ambiguous.§我发邮件提出三个编号问题：显示金额是否对应一个自然月，包含哪些设备，通知期从哪天开始算。我要求书面答复。回复解释了显示屏费用，并附上写有续约日期的时间表。服务方也修改了一句他们认可存在歧义的文字。

The answers did not make the offer automatically good or bad. They made it possible to compare it with another room whose advertised price was higher but included the equipment I needed. I calculated the likely cost for my own pattern of use. A lower headline price was not the same as a lower total under the conditions that applied to me.§这些答案没有自动证明报价好或坏，但让我能与另一间办公室比较。后者广告价格更高，却包含我需要的设备。我按自己的使用方式估算成本。在适用于我的条件下，标示价格更低，不等于总花费更低。

I eventually chose the other room and saved both offers with the correspondence. This fictional booking does not establish a rule about anyone else's agreement or rights. Its lesson was a reading task: identify the commitment, locate the conditions and ask about the wording you cannot confidently explain. I wanted my decision to rest on the offer I was accepting, not on a convenient version I had imagined.§最后我选了另一间，并把两份报价和往来邮件一起保存。这个虚构预订情境不构成关于其他协议或权利的规则。它呈现的是一项阅读任务：找出承诺、定位条件，并追问自己无法准确解释的措辞。我希望决定依据的是实际接受的报价，而不是自己想象中更方便的版本。
`);
add(37,'Thirteen, Not Thirty','是十三，不是三十','intermediate','学习成长','叙事','numbers,connections,verbs-thinking',17,
'描述一次误听的形成和纠正过程，练习数字澄清与事实核对。',
'be certain of|确信|确信的感觉不等于已核实。~double-check|再次核对|用于数字、日期和关键信息。~jump to a conclusion|过早下结论|在信息不足时形成判断。~read back|复述核对|read back a number / an address。',
'Why did the narrator initially trust the number thirty?|It fitted what they expected and was written neatly in their notes.|Three people had independently confirmed it.|The organiser showed a printed list.|0|数字符合预期，清晰笔记又增加了确信感，但没有独立确认。~What finally resolved the disagreement?|The original email from the organiser.|A vote among the volunteers.|Repeating the same memory more loudly.|0|原始邮件明确写着十三人。',
'按“听到什么—以为什么—拿什么核对—怎样改流程”复述，不把记忆问题说成普遍心理定律。',
'在电话里确认六十还是十六，并请求书面名单。=>Did you say sixty or sixteen? Could you send me the list so I can double-check the number?',`
I was arranging chairs for a workshop when another volunteer asked why I had put out so many. "Thirty people," I said. I was certain of the number because I had written it at the top of my notebook in large, careful letters. She looked surprised. Her message from the organiser said thirteen, and the room suddenly seemed much larger than we needed.§我正在为工作坊摆椅子，另一位志愿者问为什么摆这么多。“三十个人。”我很确定，因为笔记本最上方用又大又工整的字写着这个数字。她却很惊讶：组织者给她的信息是十三人。房间忽然显得大得超出需要。

The previous evening, I had taken a brief call while walking home. Traffic was loud, and I expected the group to be about the same size as the month before. When I heard a number ending in a similar sound, I wrote thirty without asking a follow-up question. My expectation had supplied a comfortable answer to an unclear moment.§前一天晚上，我在回家路上接了个简短电话。车流声很大，我又预期人数与上个月差不多。听到一个尾音相近的数字时，便写下“三十”，没有继续问。原本模糊的一刻，被符合预期的答案填补了。

By the next morning, I could remember the note more clearly than the call. I even felt I could hear the organiser saying the larger number. That feeling did not tell us which record was correct. We stopped moving furniture and opened the original email together. It said thirteen, with a list of the participants underneath.§到了第二天早上，我对笔记的记忆，比对电话本身还清楚，甚至觉得能听见组织者说出较大的数字。但这种感觉无法说明哪份记录正确。我们停下搬家具，一起打开原始邮件，上面写着十三人，下面还附了名单。

There was no need to jump to a conclusion about anyone being careless in every part of their life. I had made one specific mistake under specific conditions. The useful questions were practical: which information mattered enough to confirm, and how could we make the confirmation easy? We added a short booking summary to the shared document.§没必要因此就断言某个人在生活各方面都粗心。我是在特定条件下犯了一个具体错误。有用的问题是实际的：哪些信息重要到需要确认，怎样让确认更容易？我们在共享文档里增加了一份简短预订摘要。

Now, when I take a booking call, I read back the date, time and number of people before ending it. If a number is hard to hear, I ask the speaker to say its digits separately. I also request a written message for the details that affect space or payment. The extra question can feel awkward, but moving seventeen unnecessary chairs felt more awkward.§现在接预订电话，我会在挂断前复述日期、时间和人数。数字难听清时，请对方逐位说。涉及场地或付款的细节，我也会要求文字确认。多问一句可能有点尴尬，但搬走十七把多余椅子更尴尬。

The next workshop did have thirty participants. This time, I did not accept the number simply because it matched the previous error. I checked the updated list, counted the seats and asked another volunteer to double-check the layout. Confidence was useful for getting started; the record was what allowed us to finish preparing the right room.§下一次工作坊确实有三十人。这次，我没有因为数字与上次错误相同就直接接受。我检查更新后的名单，数座位，并请另一位志愿者复核布局。有信心能帮助开始，但记录才让我们最终准备好合适的房间。
`);
add(38,'A Busy Shop with an Empty Account','生意忙，账户却没钱','advanced','工作协作','案例叙事','numbers,quantity,comparison',18,
'通过虚构数字理解销售、成本和到账时间的不同，核对比较口径。',
'come in|进来；到账|这里指款项实际收到。~payment in advance|预付款|in advance 表示提前；pay 是动词，payment 是名词。~break down|拆分|break down a total into parts。~set money aside|预留资金|为特定用途留出金额。',
'Why was the account short of cash despite large orders?|Some customers had not yet paid, while supplies had to be paid for first.|Every order had been cancelled.|The owner had forgotten to count the number of products.|0|销售约定和实际到账不同步，而材料需要提前付款。~What did the revised table separate?|Order value, expected costs and payment dates.|Only product colours.|Revenue by the owner’s favourite customers.|0|拆分金额、成本与到账日后，才能看清资金时间差。',
'用文中的一个订单解释：金额看上去很大，为什么仍可能需要先付钱。',
'核对一份业务报告：这二十万元是已收款，还是已确认但未收款的订单金额？=>Does the two hundred thousand yuan refer to money already received, or to confirmed orders that have not been paid yet?',`
When Daniel's small print shop received its largest order of the year, he invited the team for lunch. The customer wanted five hundred notebooks at twenty dollars each. Ten thousand dollars sounded impressive beside an ordinary week's sales. Two days later, however, Daniel was staring at the bank account, wondering how to pay for the paper needed to begin the job.§丹尼尔的小印刷店接到当年最大订单时，他请团队吃了午饭。客户要五百本笔记本，每本二十美元。一万美元与普通一周的销售相比很可观。但两天后，他盯着银行账户，盘算如何先付制作所需的纸张款。

The order was real, but most of the money would not come in until after delivery. The paper supplier required payment in advance. Staff still needed to be paid, and the shop's rent was due before the customer expected to receive the notebooks. A busy production schedule did not move the customer's payment date forward.§订单是真的，但大部分钱要交货后才到账。纸张供应商要求预付，员工工资仍要支付，店租也在客户收货前到期。生产排得再忙，也不会让客户的付款日自动提前。

Daniel asked his colleague Nina to break down the order. In this fictional example, paper and covers would cost three thousand dollars, outside printing another two thousand, and packaging five hundred. The difference between those listed costs and the order value was not automatically money available to spend. Other shop expenses still existed, and some costs were estimates rather than final invoices.§丹尼尔请同事妮娜拆分订单。在这个虚构例子中，纸张和封面花三千美元，外包印刷两千，包装五百。订单金额减去这些列出的成本，并不自动等于可随意支出的钱。店里还有其他开支，而且部分数字只是估算，不是最终账单。

They made a second table arranged by date rather than customer. It showed money currently available, payments already committed and expected receipts. That view exposed a gap in the middle of the month. Even if the customer paid exactly when agreed, the account could run short before the delivery. The problem was partly one of timing, not simply the size of the sale.§他们又做了一张按日期、而非按客户排列的表，显示现有资金、已承诺支出和预计收款。这个视图暴露了月中的缺口：即使客户完全按约付款，交货前账户仍可能不够。问题部分在时间安排，不只是销售额大小。

Daniel discussed the schedule with the customer and supplier before making further commitments. He also kept estimates separate from confirmed amounts and asked for professional help with the business's wider finances. A single table could not resolve every cost or contractual question. It could make the immediate uncertainty visible instead of hiding it behind a large total.§丹尼尔在作出更多承诺前，与客户和供应商商量时间安排。他把估算和已确认金额分开，也就整体财务向专业人员求助。一张表无法解决所有成本和合同问题，但能让眼前的不确定性显现，而不是藏在大总额后面。

The team still celebrated winning the work. They simply stopped using the order value as an answer to every financial question. At later reviews, Nina asked which period each figure covered, whether it had been paid and what remained to be spent. Their new habit was to set money aside for identified commitments before treating a promising month as spare cash.§团队仍为赢得业务庆祝，只是不再用订单总额回答所有财务问题。后来的复盘中，妮娜会问每个数字覆盖什么期间、是否收款、还有什么支出。他们开始为已确定的承诺预留资金，而不是把看起来不错的一个月直接理解为多余现金。
`);
add(39,'Before Sharing the Headline','转发标题之前','intermediate','科技与信息','调查叙事','verbs-thinking,calendar,connections',19,
'检查消息的时间、范围和来源，说明原始表述与转发标题的差别。',
'out of date|过时的|不同于 wrong；信息可能曾经适用。~refer to|指的是|确认文字究竟覆盖谁和哪里。~cropped|被裁切的|crop a photograph 裁剪照片；裁掉的背景可能影响理解。~pass on|传递；转发|pass on a message / pass it on。',
'What was misleading about the forwarded message?|It removed the date and location limits.|It used a smaller photograph.|It included too many source links.|0|原本局部、短期的调整被标题写成普遍变化。~What did the narrator send to the group?|The original notice with the relevant limits explained.|Only a more dramatic headline.|A claim that every forwarded message is false.|0|补上来源、日期和地点，没有扩大结论。',
'先转述群消息的说法，再说明原始通知的实际范围，最后说你会怎样回复。',
'解释通知只适用于周一上午的北入口，而非整栋楼全天关闭。=>The notice refers only to the north entrance on Monday morning. It does not say that the whole building will be closed all day.',`
A message appeared in our neighbourhood group just before I left for work: "Station closing tomorrow. All services affected." Several people immediately changed their plans. One offered to drive others into the city. I began to pass on the message to a colleague, then noticed that the attached image had been cropped so closely that no date or source remained.§出门上班前，邻里群里出现一条消息：“车站明天关闭，全部班次受影响。”几个人马上修改计划，有人提出开车带大家进城。我正要转发给同事，注意到附图裁得太紧，日期和来源都不见了。

The wording sounded definite, but I did not know what "station" referred to. There were two stations with similar names in the area. I searched for the transport operator's original notice and found a paragraph about repairs at the north entrance. The work affected access for a few hours, not every train for a whole day.§措辞很肯定，但我不知道“车站”究竟指哪里。附近有两个名称相似的站。我查找运营方的原始通知，找到一段关于北入口维修的说明。工程影响的是几个小时的出入，并不是整天所有列车。

The notice also carried a date from the previous month. A new message had made an old image look current. That did not prove the original author had intended to mislead anyone; the image might have been copied without its context. It did mean that the information was out of date for tomorrow's journey.§通知还标着上个月的日期。新发的消息让旧图片看起来像当前消息。这不能证明最初发布者有意误导，图片也可能只是脱离背景被复制。但对明天的出行而言，这份信息确实已经过时。

Before replying, I checked the current service page as well. I wanted to avoid replacing one unsupported claim with another. Then I posted the original link, explained the date and entrance restrictions, and said which part of tomorrow's timetable I had actually checked. I did not claim to know that every possible service would run normally.§回复前，我又查看了当前运营页面，避免用另一个缺乏依据的说法替代原消息。随后贴出原链接，解释日期和入口限制，并说明实际查过明天时刻表的哪一部分。我没有声称所有可能的班次都会正常运行。

The person who had shared the image thanked me and added a correction. One neighbour still needed help finding a step-free entrance, which was a different question from whether the station was closed. The group could now focus on that practical concern. A calmer headline would not have supplied all the answers either, but the missing details had mattered.§转发图片的人道谢并补充了更正。另一个邻居仍需要找到无台阶入口，这与“车站是否关闭”是不同问题。群里终于可以讨论这个实际需求。即使标题写得更平和，也不会自动给出全部答案，但缺失的细节确实很重要。

I still read quick updates on my phone. I simply pause when a claim would cause someone to cancel, pay, travel or worry. Before sharing, I look for the original wording, its date and the people or places it covers. Those checks do not make every message certain. They make it clearer what I know and what I am merely repeating.§我仍会用手机快速看消息，只是在一条说法可能让人取消安排、付款、出行或担忧时停一下。转发前，我寻找原文、日期，以及适用的人群或地点。这些核对不能让所有消息都变得确定，但能让我分清哪些是已知信息，哪些只是重复别人的话。
`);
add(40,'The Promise I Could Not Keep','我没能兑现的承诺','advanced','思考与选择','反思叙事','modals,verbs-work,connections',20,
'讨论承诺、限制与责任的冲突，用具体后果支持观点。',
'count on|指望；依赖|count on someone to do something。~make up for|弥补|不一定能完全消除影响。~at short notice|在很短的提前通知下|强调留给对方准备的时间少。~follow through|把承诺落实到底|常与 on a promise 搭配。',
'Why was simply apologising insufficient?|The friend still needed a way to move the furniture.|The friend had not heard the promise.|The move was cancelled by the building.|0|道歉不能直接解决周六搬运的实际缺口。~How did the narrator change future commitments?|Offered specific limits before agreeing.|Refused every request permanently.|Promised more quickly to look helpful.|0|以后先说明自己能提供的具体时间和能力，再让对方决定。',
'说明冲突、两个人分别受到的影响、补救行动及其仍未解决的部分。',
'你只能帮忙一小时，不能开车。向朋友清楚说明，让对方自行决定是否足够。=>I can help for an hour on Saturday morning, but I can’t drive. Would that still be useful, or do you need someone who can stay longer?',`
When my friend Ben asked whether I could help him move, I said yes before opening my calendar. I wanted to be the sort of friend he could count on. The move was two weeks away, which made the promise feel easy. I pictured a few boxes, a short drive and lunch afterwards. Ben, meanwhile, began planning around a whole morning of help.§朋友本问我能否帮忙搬家时，我没打开日历就答应了。我希望成为他可以依靠的朋友。搬家还在两周后，承诺显得很轻松。我想象的是几箱东西、一段短途开车，之后一起午饭；本却开始按“我能帮整个上午”来安排。

Three days before the move, I learned that I needed to accompany a family member to an appointment. The times overlapped. I could not reasonably be in both places, but I delayed telling Ben because I hoped some convenient solution would appear. That delay protected me from an uncomfortable conversation while reducing the time he had to find another arrangement.§搬家前三天，我得知需要陪家人去一个预约，时间重叠了。我不可能同时出现在两处，却拖着没告诉本，希望事情会出现方便的解决办法。拖延让我暂时避开尴尬谈话，却缩短了他另作安排的时间。

When I finally called, Ben was angry. He had turned down another offer of help and booked a van on the assumption that I would drive it. I explained the family situation, but that did not remove the consequences of my promise. Two things could be true together: my new responsibility mattered, and he had good reason to feel let down.§终于打电话时，本很生气。他已经拒绝另一位朋友的帮助，并在认定我会开车的前提下租了货车。我解释了家里的情况，但这并没有消除承诺带来的后果。两件事可以同时成立：新的家庭责任很重要，而他也确实有理由失望。

I asked what problem was hardest to solve at short notice. It was the driving, not the number of boxes. With his agreement, I contacted another friend who could drive and offered to pay the additional rental cost caused by changing the collection time. I also helped pack the evening before. These actions were useful, but they did not turn the missed promise into a kept one.§我问他，临时最难解决的是什么。是开车，不是箱子数量。经他同意，我联系另一位能开车的朋友，并提出承担因调整取车时间增加的租金。前一晚我也帮忙打包。这些行动有用，却不能把失约变成守约。

It took longer to make up for the loss of trust. For a while, Ben checked details with me more than he used to. I found that uncomfortable, then remembered who had made the uncertainty necessary. An apology could acknowledge the problem; only later behaviour could give him a reason to rely on me again. I could not demand an immediate return to the old confidence.§信任受损需要更久才能弥补。一段时间里，本比以前更常向我确认细节。我觉得不自在，随后想起，是谁让这种确认变得必要。道歉能承认问题，只有后续行为才能给他再次依靠我的理由。我不能要求信任立刻恢复。

Now, I try to make smaller, clearer commitments: an hour of packing, one return journey, a call by a certain time. If I cannot follow through, I tell the other person as soon as I know and ask which consequences need attention. Being helpful no longer means saying yes to the largest imagined version of a request. It means allowing someone to plan with an honest account of what I can provide.§现在，我尽量作更小、更清楚的承诺：帮忙打包一小时、接送一趟、在某个时间前回电话。如果无法落实，确定后就尽快告知，并询问哪些后果需要处理。乐于助人，不再意味着答应自己想象中最大版本的请求，而是让别人能依据我真实可提供的帮助作安排。
`);
add(41,'Before the First Loaf Leaves the Oven','第一炉面包出炉之前','intermediate','人物与生活','访谈','clock,quantity,verbs-daily',0,
'从较长问答中提取作息、数量决策与意外处理。',
'by the time|到……的时候|连接两个事件的先后。~run out of|用完；卖完|run / ran / run。~allow for|为……留余量|allow for delays / changes。~at a time|每次|不同于 at the same time。',
'Why does the baker not make the same number of loaves every day?|Orders and the day’s expected demand differ.|The oven holds only one loaf.|Customers choose the number after closing.|0|订单和需求随星期、天气、活动等变化。~What does the baker do when a delivery is late?|Adjusts the range and tells waiting customers.|Promises every product at the usual time anyway.|Stops taking notes.|0|先调整可提供品类，并说明变化，不作无法兑现的保证。',
'用第三人称介绍面包师的一天，包含开工、数量判断、交接和延误应对。',
'以店员身份说明某种面包还需二十分钟，但另一种已经有货。=>The sourdough will be ready in about twenty minutes. We have the wholemeal loaves available now if you’d prefer not to wait.',`
Interviewer: What time does your working day begin? Baker: Usually at four thirty. I check the dough prepared the previous evening before turning to the day's orders. By the time the first customer arrives at seven, several hours of work have already happened. Opening the door is the beginning of sales, not the beginning of making bread.§采访者：你通常几点开始工作？面包师：一般四点半。我先检查前一晚准备的面团，再看当天订单。第一位顾客七点到时，我们已经做了好几个小时。开门是开始卖面包，不是开始做面包。

Interviewer: How do you decide how much to make? Baker: Confirmed orders come first. Then I look at the day of the week, recent sales and anything unusual nearby. A school event can change the morning. I cannot predict every customer, so I allow for some variation rather than treating yesterday's number as a rule.§采访者：怎么决定做多少？面包师：先看已确认订单，再看星期几、近期销售和附近有没有特殊活动。一次学校活动就可能改变整个早晨。我无法预测每位顾客，所以会留出调整余量，不把昨天的数字当成规则。

Interviewer: Is selling everything always a good result? Baker: Not necessarily. If we run out of the most popular loaf at nine, we may disappoint people who regularly come at ten. But making too much creates another problem. I record when things sell, not just whether they sell. The time tells me something the final total cannot.§采访者：全部卖完总是好事吗？面包师：不一定。如果最受欢迎的面包九点就卖光，经常十点来的顾客会失望。但做太多也有问题。我会记什么时候卖出，而不只记有没有卖出。时间能告诉我总数看不出的东西。

Interviewer: What happens when a delivery is late? Baker: I check which ingredients we already have and simplify the range. I would rather offer three things at the promised time than promise six I cannot finish. The person at the counter needs the same information, or customers hear a different answer from whoever happens to be serving.§采访者：原料配送迟到怎么办？面包师：先看现有材料，缩减品类。我宁愿按承诺提供三样，也不答应做完六样却办不到。柜台同事也必须知道相同信息，否则顾客会因接待人不同而听到不同答案。

Interviewer: Can a new colleague learn by watching? Baker: Watching helps, but I also ask them to describe what they notice. "Bake until ready" is not useful to a beginner. We work on one stage at a time and compare the result with an example. I need to know whether my instructions were clear, not just whether someone can copy my movements.§采访者：新同事看你操作就能学会吗？面包师：观察有帮助，但我也会请他们描述注意到了什么。“烤到好了”对初学者没用。我们每次练一个阶段，把结果与示例比较。我需要知道指引是否清楚，不只是对方能否模仿动作。

Interviewer: What do you enjoy most? Baker: The moment a regular customer tells us what happened to the bread after it left the shop: a family breakfast, a picnic, someone visiting after a long journey. We spend hours thinking about texture and timing. Their stories remind me that the product eventually becomes part of somebody else's ordinary day.§采访者：你最享受什么？面包师：熟客告诉我们面包离店后的故事时：一次家庭早餐、一场野餐，或远道而来的探访。我们花很多时间考虑口感和时机。他们的故事提醒我，产品最终会成为别人普通生活的一部分。
`);
add(42,'The Quietest Job in a Noisy Library','热闹图书馆里的安静工作','intermediate','人物与生活','访谈','verbs-thinking,prepositions,modals',0,
'通过访谈理解同一空间中不同使用者的需求与取舍。',
'look for|寻找|不等于已找到的 find。~point them towards|引导他们找到方向|point someone towards a source 引导查找来源。~make room for|为……留空间|这里涉及不同活动共存。~on their own|独自；独立|their own 指本人自己。',
'Why does the librarian ask about the reader’s purpose?|The purpose helps identify a useful starting point.|Every reader must pass a test.|The library only has one subject.|0|同一个宽泛主题下，不同任务需要不同材料。~How does the library handle quiet and group work?|Creates different areas and explains their use.|Assumes everyone wants complete silence.|Removes every table.|0|通过分区和清晰说明，容纳不同使用需求。',
'介绍图书馆员如何处理找书、安静空间和首次来访者三个问题。',
'你要为五分钟报告找材料，向馆员说明需要入门概览而不是专业论文。=>I’m preparing a five-minute presentation. Could you help me find a short introduction rather than a technical research paper?',`
Interviewer: People imagine a library as a silent room. Is yours like that? Librarian: Parts of it are. Other parts contain children's activities, language groups and people asking how to use a printer. Silence is one service we provide, but it is not the only reason people come. A building can be busy without every corner being noisy.§采访者：人们常把图书馆想成安静的房间。你们这里也是吗？馆员：有些区域是。其他地方有儿童活动、语言小组，也有人来问打印机怎么用。安静是我们提供的一种服务，但不是大家来的唯一原因。整栋楼很忙，不代表每个角落都吵。

Interviewer: What makes a request difficult? Librarian: Someone may say they want a book about climate, history or computers. Those are enormous subjects. I ask what they want to do with the information. A school presentation, a personal decision and specialist research require different starting points. A good question often saves a long search through the wrong shelf.§采访者：什么请求比较难处理？馆员：有人说想找气候、历史或电脑方面的书。这些题目都很大。我会问，他想用信息做什么。课堂报告、个人决定和专业研究，需要不同的起点。问对问题，常能省下在错误书架前寻找的时间。

Interviewer: Do you find every answer for the reader? Librarian: I try to point them towards useful sources and show how to check what a source covers. Sometimes we look for an answer together. I also want them to continue on their own. Handing over a title is different from helping someone understand why that title might be useful.§采访者：每个答案都由你替读者找出来吗？馆员：我会引导他们找到有用来源，并演示怎样检查来源覆盖什么。有时一起找答案，但我也希望他们之后能独立继续。交给一个书名，与帮助理解它为什么有用，是两回事。

Interviewer: How do you manage groups and quiet study? Librarian: We make room for both in different areas and explain the arrangement before a problem grows. A group table near the entrance is not a promise that every conversation will be quiet. The study room upstairs has clearer restrictions. People need to know which space matches their task.§采访者：怎样兼顾小组和安静自习？馆员：通过不同区域给两者留空间，并在问题扩大前解释安排。入口附近的小组桌，并不保证每场谈话都很安静。楼上自习室的限制更明确。大家需要知道什么空间适合自己的任务。

Interviewer: Who finds the building hardest to use? Librarian: Sometimes the person who has never entered a library before. They may not know whether they can sit down without borrowing anything. We added a simple welcome sign and moved the help desk closer to the entrance. We learned more by watching someone arrive than by adding another page to the website.§采访者：谁觉得这栋楼最难使用？馆员：有时是从没进过图书馆的人。他们可能不知道，不借东西能不能坐下。我们加了简单欢迎牌，把咨询台移近入口。看一个人实际走进来，比再往网站加一页更能发现问题。

Interviewer: What counts as a successful day? Librarian: A reader may leave without a book but with the next step they needed. Last week, someone arrived looking for a particular manual. We found a newer guide and helped them locate a workshop. They left with a date and a contact, which mattered more than borrowing the original title.§采访者：怎样算成功的一天？馆员：读者可能没借书，却得到了所需的下一步。上周有人来找特定手册。我们找到更新的指南，又帮他找到工作坊。他离开时有日期和联系人，这比借到最初那本书更重要。
`);
add(43,'Changing Careers without a Perfect Plan','没有完美计划的转行','advanced','工作协作','访谈','verbs-work,comparison,verb-forms',0,
'理解较长回答中的经历、证据与判断，区分希望和已验证能力。',
'build on|在……基础上发展|已有经验如何用于新任务。~find out|弄清|通过行动获得具体信息。~take on|承担|take on a project / responsibility。~rule out|排除|此处指检验后放弃某种选择。',
'What did Sara learn from the small project?|Which parts of the work she could demonstrate and which needed practice.|That every new job would be easy.|That her earlier experience was worthless.|0|小项目提供可见成果，也暴露技能缺口。~Why did she speak with people doing the job?|To check the everyday work behind the attractive job title.|To ask them to guarantee a salary.|To avoid practising anything herself.|0|重点是了解日常职责，而不是只看职位名称。',
'按转行前的期待、现实接触、试做、发现的缺口和最终选择复述。',
'向招聘者解释你可以带来的原有经验，同时坦诚一项仍在学习的技能。=>I can build on my experience coordinating projects, but I’m still learning the analysis tools. This small project shows what I can do so far.',`
Interviewer: Did you decide on a new career before leaving your old role? Sara: Not completely. I knew I wanted more analytical work, but that description covered many jobs. I had coordinated projects for six years and enjoyed finding patterns in delays. Enjoying that part of my job did not mean I already understood the daily work of an analyst.§采访者：离开原岗位前，你就确定新职业了吗？萨拉：没有完全确定。我知道想做更多分析工作，但这个描述包含很多职位。我做了六年项目协调，喜欢从延误中找规律。但喜欢原工作中的这一部分，不等于了解分析师每天实际做什么。

Interviewer: What did you do first? Sara: I spoke with three people whose jobs sounded interesting. Instead of asking whether they liked the profession, I asked what they had done the previous Tuesday. Their answers included cleaning inconsistent data, clarifying requests and explaining limitations. That helped me compare the actual tasks with the attractive picture I had formed around the title.§采访者：你先做了什么？萨拉：我找三个工作听起来有趣的人聊。没只问喜不喜欢这个职业，而是问上周二具体做了什么。回答包括整理不一致数据、澄清请求、解释局限。这样，我就能比较真实任务与自己围绕职位名称形成的美好印象。

Interviewer: How did you test your interest? Sara: I asked a community group for a small, non-sensitive project and used sample information they were comfortable sharing. The question was why event registration and attendance differed. I documented every assumption and produced a short explanation. It was modest work, but someone else had to understand the result and decide whether it was useful.§采访者：怎样检验兴趣？萨拉：我向一个社区小组申请了非敏感的小项目，使用他们同意分享的示例信息，研究活动报名和实际出席为什么不同。我记录每个假设，写出简短解释。工作很小，但结果需要让别人理解，并判断有没有用。

Interviewer: What did it reveal? Sara: I could build on my experience asking operational questions. I was slower with the software than I expected, and my first chart made a small difference look dramatic. A reviewer pointed that out. Correcting the chart was more valuable evidence of learning than merely saying I was comfortable with numbers.§采访者：它揭示了什么？萨拉：提出运营问题的原有经验可以继续发挥作用。但软件操作比预期慢，第一张图还把小差异画得很夸张。审阅者指出了这一点。改好图，比只说自己擅长数字，更能证明我在学习。

Interviewer: Did that make the decision obvious? Sara: No. I had to consider income, study time and the kind of supervision I would need. I did not want to take on a role that required immediate independence in skills I had barely practised. I used the project to find out what to learn next and to rule out vacancies whose expectations were too far ahead.§采访者：于是决定就很明显了吗？萨拉：没有。我还得考虑收入、学习时间和需要什么指导。我不想承担一个要求立刻独立使用技能、而我几乎没练过的岗位。我用项目弄清下一步该学什么，也排除要求超前太多的职位。

Interviewer: How do you describe the move now? Sara: As a series of smaller choices rather than one brave leap. I changed direction after I had something concrete to show and a clearer account of the gaps. The plan was never perfect. It became more realistic each time another person questioned my work or I tried to do the job behind the description.§采访者：现在如何描述这次转行？萨拉：是一连串较小选择，而不是一次勇敢飞跃。有具体成果可展示、更清楚能力缺口后，我才改变方向。计划从来不完美，但每当别人质疑我的工作，或我真正尝试职位描述背后的任务时，它就更现实一点。
`);
add(44,'Learning a Language in an Ordinary Week','在普通的一周里学语言','intermediate','学习成长','访谈','duration,verbs-thinking,connections',0,
'从学习者经历中识别输入、回忆与迁移，不把个人经验当作效果承诺。',
'get used to|逐渐习惯|get used to + 名词/doing。~look up|查阅|look a word up / look it up。~come up with|想出|come up with an answer。~without looking|不看资料|用于描述回忆条件。',
'Why did Mina stop changing material every day?|She recognised new material but could not reuse the expressions.|She had finished every book.|She disliked all audio.|0|接触很多材料没有自动转化为可用表达。~How did she check whether she could use a phrase?|Changed the details and answered without looking.|Played the recording once.|Counted how many words she highlighted.|0|换时间、数字等条件，在不看原文时重新作答。',
'描述她的一周安排，明确同篇重复和换条件练习分别解决什么问题。',
'用英文说明你已能跟读，但换一个日期就不会说了，因此要练迁移。=>I can repeat the passage, but I get stuck when the date changes. I need to practise using the same expressions with different details.',`
Interviewer: What did your study routine look like at first? Mina: I collected interesting clips and listened to something new each evening. I highlighted words and felt busy. But when a colleague asked a simple question about my weekend, I struggled to come up with an answer. Recognising a phrase in a recording was different from finding it when I needed it.§采访者：最初怎样学习？米娜：我收集有趣片段，每晚听新内容，标出生词，感觉很充实。但同事简单问周末安排时，我却想不出怎么回答。听录音时认出一句话，与需要时能调出来，是不同的事。

Interviewer: What changed? Mina: I chose one short article for several days. First I listened without reading and wrote what I could hear. Then I checked the text and looked up expressions that blocked the meaning. I did not look up every unfamiliar word immediately. I wanted to understand the situation before spending the whole session inside a dictionary.§采访者：后来改了什么？米娜：同一篇短文练几天。先不看文本听，尽量写下听见的内容；再核对原文，查影响理解的表达。我没有一开始就查每个陌生词，希望先理解情境，不把整次学习都花在词典里。

Interviewer: When do you speak? Mina: After I understand a paragraph, I listen again and follow its rhythm. I pause where I need to. Repetition helps me get used to the sequence of words, but I do not assume that speaking along proves I can create the sentence myself. Later, I close the text and explain the paragraph in simpler language.§采访者：什么时候开口？米娜：理解一段后，再听并跟着节奏读，需要时暂停。重复让我逐渐熟悉词语顺序，但我不认为能跟着说就证明自己能造句。之后关上文本，用更简单的话解释那一段。

Interviewer: How do you make it less dependent on memory? Mina: I change one condition. If the article describes a meeting on Tuesday, I arrange it for Friday. If someone buys three tickets, I ask for two. The change can be small, but it forces me to choose a different word or form instead of reciting an unbroken sequence.§采访者：怎样减少只靠背诵？米娜：改一个条件。文章约周二开会，我改成周五；别人买三张票，我改买两张。变化可以很小，却会迫使我选择不同词语或词形，而不只是连续背出一串。

Interviewer: What happens on a busy day? Mina: I review one paragraph without looking before I add anything new. Sometimes that is all I do. On a quieter evening, I record an explanation and compare it with my earlier attempt. I note where I needed help. I do not give myself a perfect score just because I finished playing the audio.§采访者：忙的时候怎么办？米娜：先不看原文复习一段，再决定加不加新内容。有时就只做这一件事。空一点的晚上，我录下解释，与之前的尝试比较，并记下哪里需要帮助。我不会因为播完音频就给自己满分。

Interviewer: What improvement can you honestly claim? Mina: I can now arrange some everyday appointments with less hesitation, and I can ask for clarification when I miss a number. I still need practice outside those situations. This is my experience, not a promise that the same timetable will produce the same result for everyone.§采访者：你能诚实地确认什么进步？米娜：现在约一些日常事项时，我没那么犹豫了；漏听数字，也会主动确认。但其他情境仍需要练。这是我的经历，不代表所有人用同样时间表都会得到同样结果。
`);
add(45,'Working Together from Different Cities','不同城市里的共同工作','advanced','工作协作','访谈','clock,duration,verbs-work',0,
'识别远程协作中交接信息、时间口径和响应预期的重要性。',
'handovers|工作交接|handover 是名词；hand over a task 是动词短语。~by default|默认情况下|不等于不可例外。~waiting on|等待某人或某事|wait on / wait for；此处指等待依赖项。~spell out|明确说明|不只是隐含在上下文。',
'What was missing from the first handover?|The expected decision and who would make it.|A longer greeting.|A colourful heading.|0|有文件但没有说明需要谁作什么决定。~How were response expectations clarified?|By separating urgent requests from routine updates and stating deadlines with time zones.|By expecting everyone to stay online all night.|By removing every deadline.|0|把紧急与常规请求分开，并明确截止时刻及时区。',
'说明跨城协作的两个具体误会，以及改进后的交接包含什么。',
'写一句交接：请对方北京时间周三下午三点前确认金额，无需重审排版。=>Please confirm the amount by three p.m. Beijing time on Wednesday. The layout does not need another review.',`
Interviewer: What surprised you about working with a team in several cities? Manager: I expected scheduling calls to be the hardest part. In fact, unclear handovers caused more delays. A person would finish work and send a file, but nobody knew whether the next person should review it, change it or simply keep it for reference. Distance exposed an ambiguity that already existed.§采访者：与多个城市的团队合作，最意外的是什么？经理：我原以为最难是约会议。实际上，不清楚的交接造成更多延误。有人完成工作发了文件，却没人知道下一位应该审阅、修改，还是仅供参考。距离暴露了原本就存在的模糊之处。

Interviewer: Can you give an example? Manager: A designer sent a proposal before going offline. The message said, "Please check." One colleague corrected the wording; another waited for a cost estimate; the designer expected a decision between two versions. Everyone had responded to a different interpretation. The document was not missing, but the decision attached to it was.§采访者：能举例吗？经理：设计师下线前发了方案，写着“请看看”。一位同事改措辞，另一位等成本估算，设计师却期待大家在两个版本中作选择。每个人回应的都是不同理解。文件没缺，缺的是与文件对应的决策要求。

Interviewer: What does a handover include now? Manager: We spell out the current state, the requested action, the person responsible and the point at which work can continue. We also say what does not need reviewing. That last detail prevents a settled choice from being reopened every time someone sees the document for the first time. A short message with clear boundaries beats a long message with none.§采访者：现在交接写什么？经理：明确当前状态、请求的行动、负责人，以及满足什么条件后能继续。也说明哪些不用再审。这能避免已决定事项每次被第一次看文件的人重新打开。有清楚边界的短消息，比没有边界的长消息更好。

Interviewer: How do you handle time zones? Manager: For important deadlines, we write the date, local time and time zone together. "Tomorrow afternoon" depends on the reader's location and when they open the message. We do not assume that a calendar invitation has removed every misunderstanding. A quick read-back is still useful when travel or a release depends on the time.§采访者：怎么处理时区？经理：重要截止时间把日期、当地时刻和时区写在一起。“明天下午”取决于读者在哪里、什么时候打开消息。我们不认为日历邀请能消除所有误会。涉及旅行或发布时，简单复述核对仍有价值。

Interviewer: Must people reply immediately? Manager: Not by default. Routine updates can wait until the next working period. If we are waiting on a specific answer, the message says so and gives a realistic deadline. We have a separate route for urgent problems. Without that distinction, every notification looks equally important, and people either interrupt everything or ignore too much.§采访者：必须立即回复吗？经理：默认不需要。常规更新可以等到下一个工作时段。如果正在等某个答复，消息会明确写出，并给合理期限。紧急问题另有渠道。没有这种区分，每个通知看起来都一样重要，大家要么不断被打断，要么忽略太多。

Interviewer: Has written communication replaced conversation? Manager: No. We still talk when the problem is uncertain or people disagree about what the words mean. Afterwards, we write down the decision. The point is not to force every interaction into a document. It is to let the next person act without having to reconstruct a conversation they were not present for.§采访者：文字沟通替代了谈话吗？经理：没有。问题不确定，或大家对词义理解不同时，仍然交谈，之后再记下决定。目的不是把一切互动塞进文档，而是让下一位不用重建一场自己没参加的谈话，也能采取行动。
`);
add(46,'A Repairer Who Sometimes Says No','有时会拒绝维修的修理师','intermediate','人物与生活','访谈','verbs-work,modals,comparison',0,
'理解维修沟通中的现象、原因不确定性、报价和授权边界。',
'take apart|拆开|take it apart 代词放中间。~find out|查明|先检查再确认原因。~go ahead|继续进行|这里指得到同意后动工。~worth doing|值得做|worth 后用 doing。',
'Why does the repairer avoid giving a definite cause immediately?|Similar symptoms may have different causes.|The customer is always wrong.|The repairer never examines devices.|0|相似现象可能来自不同原因，需检查后判断。~What must happen before extra work begins?|The customer receives the revised estimate and agrees.|The old estimate is silently replaced.|The device is sold.|0|费用或范围变化要告知并获得同意。',
'说明从客户描述到检查、报价、确认和交付的顺序，并指出不能维修时怎样说明。',
'你是修理师：检查费二十美元，正式维修另报价，得到同意后才做。=>The inspection costs twenty dollars. I’ll give you a separate repair estimate and only go ahead after you agree.',`
Interviewer: What do customers usually say when they arrive? Repairer: Often, "It doesn't work." That is a useful beginning, but it covers many different things. Does the device fail to turn on, stop after a minute or make an unfamiliar sound? I ask what happened before the problem appeared and which actions they have already tried.§采访者：顾客到店通常说什么？修理师：常说“它坏了”。这是有用的开始，却涵盖很多不同情况。是无法开机，开一分钟就停，还是发出陌生声音？我会问故障前发生什么，以及已经尝试了哪些操作。

Interviewer: Can you identify the cause from that description? Repairer: Sometimes I recognise a familiar pattern, but I do not want to present a guess as a diagnosis of the machine. Similar symptoms can have different causes. I explain what I can check without opening it and what requires permission to take apart. The customer should understand the next step.§采访者：凭描述能确定原因吗？修理师：有时能认出熟悉的表现，但不想把猜测当成对机器的确诊。相似现象可能有不同原因。我会说明哪些检查不用拆机，哪些需要许可才能拆开，让顾客理解下一步。

Interviewer: How do you discuss the price? Repairer: I separate the inspection from the repair. If I need to find out which component has failed, that work takes time even when the customer later decides against replacing it. Once I have an estimate, I explain the parts, labour and any uncertainty. A single number without a scope creates arguments later.§采访者：怎样谈价格？修理师：把检查和维修分开。查明哪个部件失效需要时间，即使顾客之后决定不更换也是如此。有了估价，我会解释零件、人工和不确定项。只给一个数字、不说范围，之后容易争执。

Interviewer: What if the problem becomes larger? Repairer: I stop and call before I go ahead. The original permission does not mean permission for any cost I discover. I describe what changed and ask whether the customer wants another estimate. Some decide to collect the device as it is. That choice belongs to them, not to me.§采访者：发现问题比预期大怎么办？修理师：先停下，打电话再继续。最初的同意，不代表允许我发现多少费用就做多少。我说明变化，问要不要新的估价。有些人决定按现状取回设备，那是他们的选择，不是我的。

Interviewer: Do you ever recommend not repairing something? Repairer: Yes. A part may be unavailable, or I may be unable to offer a dependable result. Something can also be repairable without being worth doing for that particular owner. They might value it for personal reasons, so I ask rather than assuming that replacement is always preferable.§采访者：会建议不要修吗？修理师：会。有时买不到零件，或无法提供可靠结果。也有东西虽然能修，对某位所有者却未必值得。他们也可能因个人感情重视它，所以我会问，而不假定更换总是更好。

Interviewer: What makes a good handover? Repairer: Showing what was tested, explaining any limits and letting the customer try the device. I keep the account specific. "It is fixed" sounds reassuring, but "the charging connection passed this test" tells them more. If another fault remains, it needs a name rather than a place in the small print.§采访者：好的交付是什么样？修理师：展示检查了什么，说明局限，让顾客试用。我尽量具体。“修好了”听起来安心，但“充电接口通过了这项测试”信息更多。如果还有别的故障，需要明确指出，而不是藏在小字里。
`);
add(47,'The Guide Who Leaves Time to Get Lost','会给迷路留时间的导游','intermediate','旅行出行','访谈','prepositions,clock,comparison',0,
'从访谈提取路线设计的实际约束，练习时间、距离和集合说明。',
'leave time for|为……留时间|leave time for a break。~keep together|保持在一起|用于队伍不走散。~get back to|返回|get back to the meeting point。~at the latest|最迟|常在具体时刻后使用。',
'Why does the guide not fill every minute?|Stops and different walking speeds need room.|The guide has no plan.|Visitors must shop at every stop.|0|实际步速、休息和意外需要余量。~What makes the meeting point useful?|A precise visible landmark and a clear return time.|Only the name of a large district.|A message saying come back later.|0|地点和时刻都要让游客能实际识别和执行。',
'为第一次来访的人设计三站路线，说明步行距离、休息和集合点。',
'告诉队员最晚四点十五回到图书馆正门旁的蓝色钟下。=>Please get back by four fifteen at the latest. We’ll meet under the blue clock beside the library’s main entrance.',`
Interviewer: How do you begin planning a walking tour? Guide: I start with the people, not a list of famous places. How far can they comfortably walk? Are they interested in buildings, food or stories? A route that looks efficient on a map may feel exhausting in the rain. The same distance can be a different experience for different groups.§采访者：你从哪里开始设计步行路线？导游：从人开始，不是从名胜清单开始。他们能舒服地走多远？对建筑、美食还是故事感兴趣？地图上高效的路线，下雨时可能令人疲惫。同样的距离，对不同人会是不同体验。

Interviewer: Why do you leave gaps in the schedule? Guide: Because a real walk is not a line moving across a screen. People stop to tie shoes, read a window display or ask a question. I leave time for those moments. If we arrive early, there is something nearby to explore. If every minute is already promised, a small delay becomes everyone's problem.§采访者：为什么行程留空？导游：真实步行不是屏幕上一条线移动。有人系鞋带、看橱窗、问问题。我会给这些时刻留时间。提前到，还能看看附近；若每分钟都已承诺，一个小延误就会变成全队的问题。

Interviewer: How do you keep together in a busy street? Guide: Before we enter, I explain where we will stop and which side of the road we will use. I do not give a long direction while walking ahead with my back to people. At crossings, I wait until everyone has arrived before beginning the next explanation.§采访者：热闹街道上怎样保持队伍不散？导游：进入前先说明停在哪里、走哪一侧。我不会背对大家走在前面时讲长长的路线指引。过路口后，等所有人到齐再开始下一段讲解。

Interviewer: What do you tell people during free time? Guide: A location and a time they can identify without me. "Get back to the square later" is too vague. I might say, "Meet under the clock beside the library entrance by four fifteen at the latest." Then I ask someone to repeat the place and time, especially if the group is large.§采访者：自由活动时交代什么？导游：即使没我在，他们也能识别的地点和时间。“晚点回广场”太模糊。我会说：“最晚四点十五，在图书馆入口旁的钟下集合。”然后请人复述，队伍大时尤其如此。

Interviewer: What if a visitor wants to do something outside the route? Guide: I explain the trade-off. The market may be possible, but it could mean missing the museum. I cannot promise both if the opening times conflict. Sometimes we split into smaller groups with clear plans. Choice is useful only when the person understands what each option involves.§采访者：有人想去路线外的地方怎么办？导游：解释取舍。市场也许能去，但可能错过博物馆。如果开放时间冲突，不能两个都保证。有时分成小组，各自安排明确。知道每个选项包含什么，选择才有意义。

Interviewer: What do visitors remember afterwards? Guide: Often a small encounter I could not have scheduled: a shopkeeper explaining a recipe or someone asking about a doorway. The route makes those encounters possible, but it should not squeeze them out. I want people to leave knowing a little more about a place, not simply knowing that they completed my list.§采访者：游客后来记住什么？导游：往往是我无法提前安排的小相遇，比如店主解释食谱，或有人问起某个门口。路线让相遇成为可能，却不该把它挤掉。我希望游客多了解一个地方，而不仅仅知道完成了我的清单。
`);
add(48,'Making a Small Exhibition','办一场小展览','intermediate','文化与艺术','访谈','verbs-work,adjectives,connections',0,
'理解作品选择、观众路径和说明文字之间的联系。',
'draw attention to|让人留意|注意说明要突出的细节。~leave out|舍弃；省去|选择本身构成叙事。~stand on its own|独立成立|无需额外背景也能被理解。~came across|给人某种印象|come / came / come；此处不是偶遇。',
'Why were some strong photographs left out?|They did not support the exhibition’s central question.|There was a rule against colour.|They were all damaged.|0|单张好看不代表适合共同主题。~What did the first visitor reveal?|The intended starting point was not obvious.|Every caption was too short.|The exhibition had no lights.|0|观众的实际入口和观看顺序不同于策展人的假设。',
'说明策展人怎样从一组作品形成一个可被观众理解的展览。',
'建议删掉一段解释，把观众注意力引向照片中的一处具体细节。=>Could we shorten this caption and draw attention to the open door in the background?',`
Interviewer: How did you choose photographs for the exhibition? Curator: We began with a question about how people use the neighbourhood after dark. There were beautiful photographs we had to leave out because they did not help with that question. Choosing the strongest individual image was not always the same as choosing the image that helped the group make sense.§采访者：怎样为展览选照片？策展人：先有一个问题：天黑后，人们怎样使用社区。有些漂亮照片仍要舍弃，因为与问题无关。单张最强的照片，不一定最能帮助整组作品形成清楚意思。

Interviewer: Do captions explain what viewers should feel? Curator: I try not to. A caption can identify a place, give context or draw attention to a detail that is easy to miss. It should not tell everyone that the same photograph is definitely hopeful or sad. A description and an instruction about emotion are different kinds of writing.§采访者：说明文字告诉观众应该感受什么吗？策展人：我尽量避免。说明可以标出地点、补充背景，或提醒容易忽略的细节，但不该告诉所有人某张照片一定充满希望或悲伤。描述与指挥感受是两种不同写法。

Interviewer: What changed after you tested the room? Curator: Our first visitor entered from the side and began with what we considered the final photograph. We had assumed the route was obvious. We moved a panel and made the opening question visible from both doors. The room had to explain its organisation without somebody guiding each person through it.§采访者：试布展后改了什么？策展人：第一位观众从侧门进来，先看了我们认为应该最后看的照片。原以为路线很明显，于是移动展板，让两个门口都能看见开场问题。房间必须在没人逐个带领的情况下，说明自己的组织方式。

Interviewer: Can every photograph stand on its own? Curator: Some can. Others need a relationship with the next image. A closed shop looks different beside a picture of its morning delivery. Together, they raise a question about time rather than abandonment. I want those connections to be available, but not so forced that the images become illustrations of my explanation.§采访者：每张照片都能独立成立吗？策展人：有些可以，有些需要与旁边的照片关联。一家关门的店，放在它清晨收货的照片旁，意义会不同。组合提出的是时间问题，不一定是荒废。我希望关联可被发现，却不强迫图片变成我解释的插图。

Interviewer: How do you know whether the text is working? Curator: I ask visitors what they thought a sentence meant. Asking whether they liked it is not enough. One caption came across as blaming local residents, although that was not our intention. We changed it to describe the observed behaviour and removed a claim we could not support.§采访者：怎么知道文字是否有效？策展人：问观众觉得某句话是什么意思，只问喜不喜欢不够。有一段说明给人的印象像在责备居民，尽管本意不是如此。我们改成描述实际观察到的行为，删掉一项无法支持的主张。

Interviewer: What makes a small exhibition successful? Curator: Not that visitors repeat the exact interpretation we planned. I hope they leave with a detail they can describe and a question they want to explore. Last week, two neighbours disagreed about a photograph and stayed to compare memories. That conversation was part of what the exhibition made room for.§采访者：小展览怎样算成功？策展人：不是观众逐字复述预定解释。我希望他们带走一个能描述的细节和一个想继续探索的问题。上周两位邻居对一张照片有不同理解，留下来比较各自记忆。展览也为这样的谈话留出空间。
`);
add(49,'The Person at the Other End of the Call','电话另一端的人','intermediate','工作协作','访谈','verbs-thinking,duration,modals',0,
'从服务访谈中提取问题描述、承诺范围与下一次联系安排。',
'deal with|处理|deal / dealt / dealt。~keep someone informed|让某人持续知情|不等于承诺已经解决。~get back to|回复|get back to someone by a time。~as soon as|一……就……|不要用它代替具体可承诺期限。',
'Why does the adviser repeat the problem back?|To check that the customer and adviser mean the same thing.|To fill the silence.|To avoid recording anything.|0|复述用于核对理解，防止解决错误的问题。~What can an update honestly contain when the repair is unfinished?|What was checked, what remains open and when contact will happen next.|A false promise that it is fixed.|Only an apology with no next step.|0|进展更新不必假装完成，但应说清已知、未决和下一联系时间。',
'设计一次服务回访，包含已核实事实、未解决事项和明确联系时间。',
'说明你不能承诺今天修好，但会在下午四点前更新检查结果。=>I can’t promise it will be repaired today, but I’ll get back to you with the inspection result by four this afternoon.',`
Interviewer: What is your first task when someone calls about a problem? Adviser: To understand which problem they want us to deal with. A late parcel, an incorrect item and an unexpected charge may all arrive in the same angry sentence. I let the person finish, then repeat the main points and ask which consequence needs attention first.§采访者：有人打电话反映问题时，你的首要任务是什么？客服：理解他希望我们处理哪个问题。包裹晚到、货不对、收费意外，可能在一句气话里同时出现。我会让对方说完，再复述重点，问哪个后果最需要先处理。

Interviewer: Does repeating it back make the call longer? Adviser: Sometimes by a minute, but it can prevent us from investigating the wrong issue. Last week, I thought a customer wanted a refund. What she needed most was confirmation that a replacement would arrive before an event. The money still mattered, but the deadline changed which options were useful.§采访者：复述会延长通话吗？客服：有时多一分钟，却能避免查错问题。上周我以为一位顾客要退款，她最需要的其实是确认替换品能否在活动前到达。钱仍重要，但期限改变了哪些选项有用。

Interviewer: What do you say when you do not know the answer? Adviser: I name what I need to check and who has that information. I do not say "It should be fine" just to end an uncomfortable pause. A guess can become the promise a customer plans around. It is better to explain the uncertainty while still taking responsibility for the next contact.§采访者：不知道答案时怎么说？客服：说明要查什么、谁掌握信息。我不会只为结束尴尬沉默就说“应该没问题”。猜测可能变成顾客据以安排的承诺。更好的做法是说明不确定，同时对下一次联系负责。

Interviewer: How do you keep someone informed without a final solution? Adviser: I separate an update from a resolution. I can say what has been checked, what remains open and when I will get back to them. If I promise a call by four, the call must happen even if the repair is unfinished. Silence does not become useful because the news is incomplete.§采访者：没有最终解决方案，怎样让顾客知情？客服：把进展和解决分开。我能说查过什么、什么仍未决、什么时候回复。如果承诺四点前打电话，即使没修完也应该打。消息不完整，不代表沉默就有用。

Interviewer: Are phrases such as "as soon as possible" helpful? Adviser: They can express intention, but they do not tell a customer when to expect anything. Where I can make a specific commitment, I do. Where I cannot, I explain the dependency and arrange a review time. The aim is a promise I can keep, not the most comforting sentence available.§采访者：“尽快”这类话有帮助吗？客服：能表达意愿，却没有告诉顾客何时期待结果。能具体承诺就具体说；不能时说明依赖条件，并约定再次检查的时间。目标是能兑现的承诺，不是选一句最令人安心的话。

Interviewer: What do you record after the call? Adviser: The agreed action, the customer's stated need and the next contact time. I avoid writing only that the customer was difficult or unhappy. A colleague taking over needs enough information to act, not just an impression of the conversation. Good notes let the customer continue without starting the entire story again.§采访者：通话后记什么？客服：已商定行动、顾客明确需求、下次联系时间。我避免只写“顾客难沟通”或“不满意”。接手同事需要足够行动的信息，而不只是对谈话的印象。好记录让顾客继续处理，而不必重讲全部故事。
`);
add(50,'A Garden between Two Buildings','两栋楼之间的花园','intermediate','城市与环境','访谈','quantity,verbs-work,calendar',0,
'解释共享空间中的目标差异、试行安排与维护责任。',
'in charge of|负责|说明具体职责，不只是职位。~take turns|轮流|take turns watering。~set up|建立；布置|set / set / set。~work around|围绕限制调整|work around different schedules。',
'Why did the group begin with a few containers?|To test the work and responsibilities before expanding.|Because nobody liked plants.|Because the whole courtyard was already a farm.|0|小范围试行能观察实际维护工作和责任。~What problem appeared during the first holiday?|Watering responsibility was assumed rather than assigned.|Every resident moved away.|There was no gate.|0|大家以为别人会浇水，直到明确轮值和交接才改善。',
'说明花园最初的提议、不同居民的需求、试行和维护办法。',
'为共享书架提出小范围试行，并写清谁负责整理。=>Let’s set up one shelf for a month. We’ll take turns checking it each Friday before deciding whether to add another.',`
Interviewer: How did the garden begin? Organiser: The space between our buildings was mostly bare paving. Some residents wanted flowers; others wanted somewhere to sit. A few worried about noise and extra work. We did not begin by promising a large garden. We asked whether three containers and a bench would be a useful first experiment.§采访者：花园怎样开始的？组织者：两栋楼之间原本大多是空铺地。有居民想种花，有人想有地方坐，也有人担心噪声和新增工作。我们没有一开始就承诺大花园，而是先问三个种植箱加一张长椅，是否值得试试。

Interviewer: Who made the decisions? Organiser: We invited people who used the courtyard at different times, including those who did not want to garden. A clear route to the doors mattered to everyone. We marked the proposed positions and checked whether a pushchair could pass. A plan seen from above had missed how people actually moved through the space.§采访者：谁来决定？组织者：我们邀请不同时间使用院子的人，也包括不想种植的人。通往各门口的路线畅通，对大家都重要。先标位置，再检查婴儿车能否通过。俯视图上的计划，漏掉了人们实际怎样穿过空间。

Interviewer: What happened after you set up the containers? Organiser: At first, everyone helped. During the first holiday, nobody was clearly in charge of watering. Each person thought another neighbour would do it. Several plants dried out. The problem was not a lack of enthusiasm at the opening; it was the absence of an ordinary routine afterwards.§采访者：种植箱放好后怎样？组织者：起初人人帮忙。第一次假期时，却没人明确负责浇水，每个人都以为其他邻居会做，几株植物干枯了。问题不是开场缺热情，而是之后没有日常安排。

Interviewer: How did you change that? Organiser: We agreed to take turns and added a simple handover. If someone was away, they needed another person to confirm the exchange rather than leaving a message nobody answered. We had to work around different schedules. A routine that depended on the same person being available every evening would not last.§采访者：怎么改？组织者：轮值并加简单交接。有人不在，需要另一位确认接班，而不是留条没人回复的消息。我们得适应不同日程。若安排依赖同一个人每晚都有空，就持续不了。

Interviewer: Did everyone become a gardener? Organiser: No, and that was not necessary. One neighbour kept the seat clean. Another helped translate the notices. Some simply used the bench and let us know when a path was blocked. Participation could take different forms without making every person responsible for every task.§采访者：人人都成了园丁吗？组织者：没有，也没必要。一位邻居清洁座椅，另一位翻译通知。有人只是坐坐，并在通道被挡时告诉我们。参与可以有不同方式，不必让每个人对每项任务都负责。

Interviewer: Will you expand it? Organiser: We will review the first season before deciding. We want to know which plants survived, who did the work and whether people still felt welcome to use the courtyard. A bigger space would be worth considering only if we understood how to care for it. More containers would not automatically mean a better shared place.§采访者：会扩大吗？组织者：先复盘第一个季节，再决定。我们想知道哪些植物活下来，谁承担了工作，大家是否仍觉得院子欢迎自己。只有理解怎样照料，才值得考虑更大规模。种植箱更多，不会自动让共享空间更好。
`);
add(51,'The Parcel for the Day Before','早到一天的包裹','beginner','日常生活','叙事','calendar,duration,verbs-work',0,
'核对实际日期、预期日期和交付地点，清楚提出可执行请求。',
'a day early|提前一天|early 表示早于预定时间。~leave it with|把它交给……保管|明确接收人或地点。~got in touch|取得了联系|get / got；get in touch with someone。~pick it up|取件|代词 it 在 pick 与 up 之间。',
'What was wrong with the delivery?|It arrived a day earlier than the agreed day.|The parcel was empty.|The customer ordered nothing.|0|包裹比约定早一天送达，当时家里没人。~What did the narrator ask the company to confirm?|The new collection point and its opening time.|The driver’s favourite route.|A free holiday.|0|最后需要明确在哪里取、什么时候开放。',
'讲清原约定、提前送达造成的问题，以及最后怎样取到包裹。',
'说明周二没人收货，请改到周三，或经确认交给前台。=>Nobody will be home on Tuesday. Could you deliver it on Wednesday, or leave it with reception if they agree?',`
The delivery message said my desk would arrive on Wednesday between nine and twelve. I arranged to work from home that morning. On Tuesday, while I was on a train, another message appeared: "Your driver is nearby." The desk was a day early, and nobody was at home to receive it.§送货消息说，书桌周三九点到十二点送达。我因此安排那天上午在家工作。周二，我正在火车上，另一条消息出现了：“司机即将到达。”书桌提前一天来了，家里却没人收货。

I tried to call the number in the message, but the call did not connect. Then the driver rang me. I explained that the agreed day was Wednesday. He could not wait until I returned. I asked whether he could leave it with the building's reception desk, but first I needed to check that they could accept such a large box.§我拨打消息里的号码，没接通。随后司机打来电话。我解释约定是周三，他不能等我回家。我问能否交给大楼前台，但需要先确认前台能否接收这么大的箱子。

Reception said there was not enough space. The driver could not simply leave the desk in the entrance because it would block the door. We agreed that he would return it to the local depot. I wrote down the depot's name, but I still did not know when I could collect it or whether another delivery was possible.§前台说空间不够。司机也不能直接放在入口，因为会挡门。我们同意先运回本地配送点。我记下配送点名称，但还不知道什么时候能取，或者能否重新配送。

That evening, I got in touch with the delivery company through the order page. I included the order number and the original Wednesday message. I did not want to tell the story again without the dates. The adviser checked the record and offered either another delivery on Friday or collection from the depot the next afternoon.§当晚，我通过订单页面联系配送公司，附上订单号和原先约定周三的消息。我不想又重讲一遍却没有具体日期。客服查记录后给两个选择：周五再送，或第二天下午去配送点自取。

My sister had a car large enough for the box and could help on Wednesday. Before choosing collection, I asked the adviser to confirm the address, opening time and what I needed to bring. I also checked the box dimensions with my sister. A plan to pick it up would not help if it did not fit in the car.§姐姐的车足够大，周三也能帮忙。选择自取前，我请客服确认地址、开放时间和需要带什么，还与姐姐核对箱子尺寸。如果放不进车里，计划自取也没有意义。

We collected the desk at three on Wednesday. At home, I compared the label on the box with the order and checked the contents before putting it together. The problem had begun with a single changed day. Solving it required a new place, a new time and a person who had actually agreed to help.§周三三点，我们取到书桌。回家后，我把箱上标签与订单核对，检查箱内物品再组装。问题起于送货日期改变一天，解决它却需要新的地点、时间，以及一个确实答应帮忙的人。
`);
add(52,'Two Rooms, One Moving List','两个房间，一份搬家清单','beginner','日常生活','叙事','prepositions,adjectives,verbs-daily',0,
'描述物品位置、搬运顺序与尺寸限制，区分愿望与可行方案。',
'fit through|能够穿过|尺寸与空间相容。~take apart|拆开|take / took / taken。~set aside|单独留出|为第一晚用品留出一箱。~on top of|在……上面|用于位置或堆放关系。',
'Why could the desk not be moved as one piece?|It could not fit through the new doorway.|It had been sold.|The van was empty.|0|目的地门口尺寸限制使整张搬运不可行。~What was in the box kept separate?|Things needed on the first night.|Only old magazines.|Tools that nobody could use.|0|把首晚所需用品单独放，避免到新家后翻找。',
'按准备、发现问题、调整和第一晚四部分复述搬家，使用三个位置介词。',
'告诉搬运者把写着厨房的箱子放在餐桌旁，别压在易碎箱上。=>Please put the box marked kitchen beside the dining table, not on top of the fragile box.',`
My new flat had two rooms and much less storage than my old one. I knew I could not take everything, so I began with a list of furniture rather than a list of boxes. I measured the bed, desk and shelves. Then I measured the new rooms, including the doors and the narrow space behind the entrance.§新公寓有两个房间，储物空间比旧家少很多。我知道不能全搬，于是先列家具，而不是先列纸箱。我量床、书桌和书架，再量新房间，包括门口和入口后面狭窄的位置。

The desk would fit against the bedroom wall, but it would not fit through the doorway as one piece. I had almost missed that detail because the room itself was large enough. A friend helped me take apart the legs and label the screws. We put the small parts in a bag and attached it to the desk.§书桌靠卧室墙放得下，却不能整张穿过门口。我差点漏掉这个细节，因为房间本身够大。朋友帮我拆下桌腿，给螺丝作标记，再把小零件装袋固定在桌子上。

I labelled each box with its destination and a short description. "Bedroom: winter clothes" was more useful than "things." On two sides, I wrote the label again so it would remain visible in the van. Books went into small boxes. I could carry one large box of cushions, but not one equally large box of books.§每箱都写目的房间和简短内容。“卧室：冬装”比“杂物”有用。我在箱子两侧都写标签，方便在货车里看见。书装小箱：一大箱靠垫搬得动，同样大的书箱却搬不动。

I set aside one box for the first evening: a towel, clean clothes, a cup, a plate, the kettle and my phone charger. It went into the car last and came out first. I kept documents and keys with me. That way, I did not need to search through the whole move before making a drink or finding a toothbrush.§我单独留了一箱首晚用品：毛巾、干净衣服、杯子、盘子、水壶和手机充电器。它最后上车，最先搬出。证件和钥匙随身带着。这样，不用翻遍搬家物品，才能喝水或找牙刷。

At the new flat, a friend started stacking boxes in the hallway. I asked him to leave a clear path and put each one near its room instead. Nothing heavy went on top of the box marked fragile. We put the bed together before arranging the shelves. I wanted somewhere to sleep more than I wanted a finished living room.§到新家后，朋友开始把箱子堆在走廊。我请他留出通道，把箱子放在各自房间附近。重物不放在标着易碎的箱子上。我们先装床，再整理书架。相比布置好的客厅，我更需要能睡觉的地方。

That night, half the boxes were still closed. The desk top rested beside the wall, waiting for the next day. Yet I could wash, make tea and go to bed without moving a pile of belongings. The new place did not look complete, but the parts of an ordinary evening were already possible.§那晚，一半箱子还没打开，桌面靠墙等第二天再装。但我能洗漱、泡茶、上床睡觉，不用先搬开一堆东西。新家看起来还没布置完，普通夜晚所需的事情却已经做得到。
`);
add(53,'A Weekend Plan with a Wet-Weather Version','带雨天备选的周末计划','beginner','旅行出行','叙事','calendar,comparison,connections',0,
'比较两个方案并说明触发条件，让行程随实际约束调整。',
'depend on|取决于|depend on the weather / transport。~in case|以防|不等于简单条件 if。~a backup plan|备用计划|说明何时采用。~make up our minds|作出决定|make up one’s mind。',
'Why did the group not book the outdoor lunch immediately?|They wanted to confirm the weather and cancellation conditions.|They had already eaten.|Nobody wanted to travel.|0|天气和预订条件未确认前，不急着作承诺。~What was the indoor alternative?|A museum near the station and lunch afterwards.|The same walk in heavy rain.|Staying at the closed café.|0|室内方案仍保留共同出行和午餐，只更换主要活动。',
'介绍两个方案的地点、交通、花费和决定时间，并说明雨天切换条件。',
'给朋友写一条消息：周六上午确认天气，若下大雨就改去美术馆。=>Let’s check the forecast on Saturday morning. If there’s heavy rain, we’ll go to the gallery instead.',`
Four of us wanted to spend Saturday together. The first idea was a long walk by the coast, followed by lunch outside. We all liked it, but two people were coming by train, and the weather forecast kept changing. Before buying tickets, we agreed that the day needed more than one possible version.§我们四个人想周六一起过。最初提议沿海长距离散步，再在户外午餐。大家都喜欢，但有两个人坐火车来，天气预报也不断变化。买票前，我们同意这一天应该不止一种安排。

The coast plan would depend on fairly dry weather. The walk began twenty minutes from the station and took about two hours. If it rained halfway through, there was no quick bus back. We wrote down those details instead of describing the plan only as "an easy walk." Easy meant different things to each person.§海边方案需要天气比较干燥。起点离车站二十分钟，步行大约两小时。中途下雨，也没有很快返回的公交车。我们把这些具体情况写下来，不只说“轻松散步”。每个人理解的“轻松”并不一样。

For a backup plan, we found a museum close to the town station. The journey was shorter, and a café nearby could seat all four of us. We checked the opening hours and whether tickets needed booking. We also checked the outdoor restaurant's cancellation conditions before promising to eat there.§备用方案是镇上车站附近的博物馆。路程更短，旁边咖啡馆能坐下四个人。我们查了开放时间和是否需要订票，也先了解户外餐厅的取消条件，再决定要不要订那里。

On Friday evening, we compared the two costs in the group chat. The museum ticket added a little, but the cheaper train almost balanced it. Everyone could afford either option. We decided to make up our minds at eight on Saturday morning, before the two travellers left home. Until then, nobody needed to guess which ticket to buy.§周五晚上，我们在群里比较费用。博物馆要多花一点门票，但较便宜的火车票几乎抵消了差额。两个方案大家都能接受。我们约定周六早上八点决定，赶在两位朋友出门前，让他们不用猜该买哪种票。

Saturday brought heavy rain. We sent one clear message confirming the museum, the train and the meeting point. I packed a light jacket in case the afternoon improved, but nobody treated the coast walk as a secret second appointment. At the museum, we found a room of old maps that kept us talking for nearly an hour.§周六下大雨。我们发出一条明确消息，确认博物馆、车次和集合点。我带件轻外套，以防下午天气转好，但没人把海边散步偷偷当成另一项必须完成的安排。博物馆里的一间旧地图展厅，让我们聊了将近一小时。

By lunchtime, the rain had stopped. We took a short walk through the town rather than trying to recover the entire coastal route. We had changed the main activity but kept what mattered to the group: enough time together and a day nobody had to struggle through. The unused plan could wait for another weekend.§午饭时雨停了。我们在镇上短走一段，没有试图补完整条海岸路线。主要活动变了，但保留了大家在意的事情：有时间相处，不必勉强熬过一天。没用上的计划，可以等另一个周末。
`);
add(54,'Two Hours at the Station','车站里的两个小时','intermediate','旅行出行','叙事','duration,clock,verbs-thinking',0,
'在信息不完整时比较等待和改道，区分预计时间与已确认时间。',
'for the moment|目前；暂时|此刻情况不代表最终安排。~get hold of|联系到|get hold of a person。~allowed time|留出了时间|allow time to do；将余量与后续任务联系。~due to leave|原定出发|be due to do；不表示已保证发生。',
'Why did the narrator not immediately buy the alternative ticket?|The route and arrival benefit were not yet clear.|They had no destination.|The station sold no tickets.|0|转车路线的实际时间尚不明确，不能只比较表面发车时间。~What did contacting the host achieve?|Changed the collection arrangement before the narrator travelled.|Guaranteed that the railway would reopen.|Removed every delay.|0|提前告知，让接站与门禁安排可以调整。',
'说明延误期间哪些信息确定、哪些只是预计，以及你会先联系谁。',
'通知接待者你目前预计晚两小时，准确时间确定后再更新。=>At the moment, I expect to arrive about two hours late. I’ll update you when the arrival time is confirmed.',`
The departure board changed while I was buying a bottle of water. My train, due to leave at three, was delayed because of a problem further along the line. The screen gave no new departure time. Around me, people looked from the board to their phones as though another glance might produce information that had not yet arrived.§我买水时，发车屏幕变了。原定三点的列车因前方线路问题延误，却没有新的发车时间。周围的人在屏幕和手机之间来回看，仿佛再看一眼就能得到尚未出现的信息。

My first thought was to find another route immediately. A journey planner suggested leaving from a different station, but the connection included two changes and a bus. I could see the first departure time more easily than the final arrival time. Buying a ticket quickly would feel like taking action, but I still needed to know what that action would achieve.§我首先想立刻找别的路线。行程工具建议去另一站，方案里有两次换乘和一段公交。我更容易看见第一班出发时间，却难看清最后到达时间。赶紧买票会让我感觉在行动，但仍需要知道行动能带来什么。

At the help desk, I asked for the best current estimate and whether my existing ticket could be used elsewhere. The assistant explained what was confirmed and what was still being checked. For the moment, waiting remained a reasonable option. I took a seat where I could see the board without standing in front of it.§在咨询台，我询问当前最可靠的预计时间，以及原票能否在其他线路使用。工作人员解释哪些已确认、哪些仍在核查。目前继续等仍是合理选择。我找了个能看见屏幕的座位，不再站到屏幕前。

Then I tried to get hold of the friend who was collecting me. She had planned to leave work early. I told her I might arrive around two hours late and asked her not to start driving yet. We agreed on another update at four, even if the railway had not given a final answer. She sent instructions for entering the flat if she was unavailable later.§随后，我联系准备接站的朋友。她原打算早下班。我说可能晚到两小时，请她先别开车。我们约好四点再更新一次，即使铁路还没给最后答复。她也发来稍晚不方便接站时，如何进入公寓的说明。

At four ten, the board announced a departure at four forty. I checked the platform and allowed time to reach it, but I did not tell my friend I had already left. When the train actually moved, I sent the arrival estimate shown onboard. That message separated a scheduled departure from a journey that was finally underway.§四点十分，屏幕公布四点四十分发车。我核对站台，留出走过去的时间，却没有告诉朋友“已经出发”。等列车实际开动，再发车上显示的预计到达时间。这条消息把计划发车与真正开始的行程分开了。

I arrived hungry and later than planned, but not outside a locked building with someone waiting at the wrong station. The hours had not been useful in the way I originally intended. Still, I had changed the arrangements around the delay instead of spending all of them refreshing the same uncertain screen.§我又饿又晚地到了，但没有被锁在楼外，也没有让人在错误时间去车站等。那几个小时没有按原计划发挥作用，但我至少调整了延误影响到的安排，而不是把时间全部用来刷新同一个不确定的屏幕。
`);
add(55,'My First Day on a Team That Spoke in Shortcuts','满是缩略语的入职第一天','intermediate','工作协作','叙事','verbs-thinking,connections,determiners',0,
'澄清团队术语，判断一句话要求的是信息、行动还是决定。',
'stood for|代表；是……的缩写|stand / stood / stood；What does it stand for?~follow up on|跟进|对已有事项继续处理。~take notes|记笔记|notes 常用复数。~bring up|提出话题|bring / brought / brought。',
'Why was knowing the full form of the abbreviation not enough?|The narrator still needed to know what action it required.|The letters were invisible.|The team never used words.|0|展开缩写只解释名称，没有解释在此处应做什么。~What made the glossary more useful?|Examples of decisions and actions beside the terms.|Only a longer alphabetical list.|Removing the original terms.|0|术语与具体任务、例子关联，才能帮助行动。',
'描述新人遇到的语言障碍及其解决办法，区分术语定义和实际要求。',
'在会议中确认：这个缩写我明白了，但你希望我批准还是只阅读？=>I understand what the abbreviation stands for, but do you need me to approve this or just read it?',`
By lunchtime on my first day, I had a notebook full of letters. The team used short names for projects, documents and review stages. I could follow the general topic, but several sentences contained almost no ordinary nouns. Everyone else seemed comfortable, and I worried that asking too many questions would make the meeting about my confusion.§入职第一天午饭前，我已记下满页字母。团队用简称称呼项目、文档和审核阶段。我大概跟得上主题，但有些句子几乎没有普通名词。其他人都很自如，我担心问太多，会把会议变成专门处理我的困惑。

During a break, I asked a colleague what one abbreviation stood for. She gave me the full name. It was useful, but it did not explain why the team needed it by Friday or what I was supposed to contribute. I had translated the letters without understanding the work attached to them.§休息时，我问同事一个缩写代表什么。她说出全名，有帮助，却没有解释团队为何周五前需要它，或希望我贡献什么。我翻译了字母，仍没理解与之相连的工作。

In the next meeting, I tried a more specific question: "When you say the review is ready, do you mean it is ready for us to read, or that it has already been approved?" Two experienced colleagues gave different answers. The shortcut had hidden a disagreement that was not mine alone. We paused to clarify the state of the document.§下一次会议，我换了一个更具体的问题：“你说审核已准备好，是指可以让我们读，还是已经批准？”两位老同事给了不同答案。原来简称藏着分歧，并不只是我一个人不懂。大家停下来确认文档状态。

I continued to take notes, but I added an example beside each term. Who created this document? Who decided whether it was finished? What action followed the decision? When I could not answer, I marked a question rather than inventing an explanation. A colleague agreed to go through the list with me at the end of the week.§我继续记笔记，但在每个术语旁补例子：谁创建文档，谁决定是否完成，决定后做什么？回答不了就标问题，不编解释。一位同事同意周末前与我一起过一遍清单。

The list became a short guide for the next new starter. We did not remove the team's shortcuts; they were efficient once their meaning was shared. We added plain-language explanations and links to actual examples. We also separated terms that described a file from terms that described a decision, because mixing those had caused several mistakes.§清单后来成为下一位新人的简短指南。我们没有取消团队简称；一旦含义共享，它们确实高效。只是补上通俗解释和真实示例链接，并把表示文件的词与表示决策的词分开，因为混淆曾造成几次错误。

On Friday, I was asked to follow up on an unanswered question. I knew which person to contact and what reply would let the work continue. I still did not understand every abbreviation, but I could name what I needed to bring up. That felt more like joining the team than silently copying a longer sequence of letters.§周五，我被请去跟进一个未答复问题。我知道该联系谁，也知道什么答复能让工作继续。虽然仍不懂所有缩写，但能说清需要提出什么。这比默默抄下更长一串字母，更像真正加入团队。
`);
add(56,'The Feedback That Changed One Paragraph','只改了一段的反馈','intermediate','工作协作','叙事','verbs-work,comparison,verbs-thinking',0,
'把抽象评价转成具体修改，说明为什么改、怎样验证。',
'getting to the point|切入重点|get to the point；不是单纯缩短字数。~spell out|明确写出|补足决策所需信息。~shorten|缩短|shorten the introduction；不要只删字而保留模糊要求。~act on|根据……采取行动|act on feedback。',
'What did the first reviewer find unclear?|What decision the proposal requested.|The font colour only.|The author’s name.|0|读完背景仍不知道希望批准什么。~Why was the revision more useful?|It stated the requested decision, cost and consequence of delay near the start.|It added more general history.|It removed every explanation.|0|改动集中在读者作决定所需信息，而非只追求更短。',
'先描述原稿结构，再说明反馈如何转成三个具体修改，最后解释验证方式。',
'请同事指出“更清楚”究竟意味着补金额、补期限，还是改行动要求。=>When you say it needs to be clearer, do you mean the amount, the deadline or the action we’re requesting?',`
My proposal began with nearly a page about the history of our booking process. I had described the old spreadsheet, the growth in requests and several conversations with colleagues. I thought that giving the full background would make the recommendation convincing. The first reviewer wrote only one sentence at the top: "What decision do you need from me?"§我的方案开头用了将近一页介绍预订流程历史：旧表格、请求增长、与同事的几次谈话。我以为背景交代完整，建议就更有说服力。第一位审阅者只在顶端写了一句：“你需要我作什么决定？”

At first, I took the comment as a request to cut words. I shortened the introduction and removed two examples. The draft became half a page shorter, but the same question remained. I had still not said whether I wanted permission to investigate, money to buy a tool or approval to change the process immediately.§起初，我把这条反馈理解为删字。缩短引言，去掉两个例子，稿子少了半页，但问题仍在。我依然没说明要的是允许调查、买工具的预算，还是立即改变流程的批准。

I asked the reviewer to show me where she expected the answer. She pointed to the first paragraph. Before reading all the evidence, she needed to know what choice it supported. Getting to the point was not simply writing fewer sentences. It meant giving the reader a useful frame for the sentences that followed.§我请审阅者指出，她预期在哪里看到答案。她指着第一段：阅读全部证据前，需要知道证据支持什么选择。切入重点，不只是句子更少，而是先给读者一个理解后文的有效框架。

I rewrote the opening to spell out a two-week trial, the proposed cost and the person who would review the result. I added what would happen if we delayed: the team could continue with the current method, but would need temporary help during the busiest week. The background moved below the recommendation, where readers could inspect it if they needed more detail.§我重写开头，明确两周试行、拟议费用，以及谁评估结果。也补上延期后果：可以继续现有方式，但最忙那周需要临时人手。背景移到建议下方，供需要细节的读者查看。

Then I gave the revised paragraph to a colleague who had not attended our discussions. I asked her to tell me what she thought she was being asked to approve. She identified the trial correctly but assumed it included a permanent subscription. I changed one sentence to make clear that any ongoing purchase would require a separate decision.§接着，把修改后的段落给一位没参加讨论的同事，请她说说以为要批准什么。她正确识别了试行，却误以为包含长期订阅。我又改一句，说明持续采购需要另作决定。

We eventually approved the limited trial. The rest of the proposal still mattered, but the opening now did its job. I kept the review comments beside both versions. They reminded me that to act on feedback, I sometimes needed another conversation before another edit. "Clearer" was a useful direction only when we agreed on what the reader needed to understand.§最后，有限试行获得批准。方案其他内容仍重要，但开头终于完成了自己的任务。我把反馈与两个版本放在一起，提醒自己：落实反馈有时需要先再谈一次，才能再改一次。只有共同明确读者需要理解什么，“更清楚”才是有用方向。
`);
add(57,'Two Charts, One Small Change','两张图，同一个小变化','advanced','科技与信息','分析叙事','quantity,numbers,comparison',0,
'检查图表中的尺度、分母、时间范围和样本量，准确口述变化。',
'at first sight|乍看之下|描述第一印象。~start from|从……开始|此处指纵轴起点。~in proportion to|相对于……的比例|帮助说明大小关系。~put the comparison into context|把比较放入背景|加入时间、范围和基准。',
'Why did the first chart make the change look dramatic?|Its vertical scale began close to the two values.|The underlying values were ten times larger.|The chart compared different currencies.|0|截短的纵轴放大了视觉差异，但原数值只从48%到50%。~What additional information was requested?|Sample size and how the two periods were defined.|Only brighter colours.|The designer’s preferred font.|0|比例差异需要结合分母和时间口径理解。',
'用两种方式说明48%到50%的变化，明确区分百分点与相对百分比。',
'向同事解释从20%到25%是增加5个百分点，相对增加25%。=>The rate rose by five percentage points, from twenty to twenty-five percent. That is a relative increase of twenty-five percent.',`
The slide looked like good news. Two bars showed a rise in the share of customers who completed a form, from forty-eight percent to fifty percent. At first sight, the second bar seemed almost twice as tall. Someone described the result as a dramatic improvement before asking how the chart had been drawn. The numbers were printed correctly; the visual impression was another matter.§幻灯片看起来是好消息。两根柱子显示完成表单的客户比例从48%升到50%。乍看，第二根几乎高一倍。有人还没问图怎么画，就称之为显著改善。标出的数字没错，视觉印象却是另一回事。

The vertical axis did not start from zero. It began close to the lower value, which enlarged the visible difference between the bars. A restricted scale can sometimes reveal a small change, but it needs clear labelling and an appropriate chart design. Here, the bars encouraged people to compare their apparent heights as if those heights represented the whole amounts.§纵轴并非从零开始，而是从接近较低数值的位置起，放大了可见差距。限制尺度有时能展示细微变化，但需要清楚标注和合适图形。这次，柱状图让人把可见高度当成整体数量来比较。

We made a second version with the full percentage scale and placed the values beside it. The difference looked smaller, as the underlying numbers suggested. Neither redrawing the chart nor using a calmer colour answered the next question: was the change meaningful for the decision? To discuss that, we needed the number of customers and a consistent definition of completion.§我们做第二版，用完整百分比尺度，并在旁边列数值。差异看起来更小，符合底层数字。但重画图或换温和颜色，都没回答下一问：变化对决策是否有意义？为此，需要客户数量和一致的“完成”定义。

We also had to put the comparison into context. The first figure covered a full month; the second originally covered only the first week after a change. The mix of customers might differ. We did not declare that the result was false, but we stopped describing it as a settled comparison until we could define periods and groups that made sense together.§还得把比较放入背景。第一个数覆盖整月，第二个起初只覆盖调整后的第一周，客户构成可能不同。我们没有宣称结果是假的，但在明确可合理比较的期间和群体前，不再把它说成已经定论的比较。

When presenting the revised slide, I said the rate had risen by two percentage points, not that it had doubled. Relative to forty-eight percent, the increase was about four point two percent. Both descriptions could be calculated from the same pair of values, yet they answered different questions. I kept the arithmetic visible so listeners could follow the distinction.§展示改后的图时，我说提高了两个百分点，不是翻倍。相对于48%，增幅约4.2%。两种描述都能从同一对数值算出，却回答不同问题。我把计算写出来，让听众能理解区别。

The meeting ended with a request for a better comparison, not a celebration or a rejection of the change. We wanted the effect described in proportion to the evidence available. The first chart had made a modest movement look dramatic. The more useful version made it easier to ask what had actually changed and what we would need to know before acting on it.§会议结束时，大家要求更合适的比较，没有庆祝，也没有否定调整。我们希望描述的分量与现有证据相称。第一张图让小变化显得戏剧化，较有用的版本则让人更容易问：实际改变了什么，行动前还需要知道什么？
`);
add(58,'The Cheaper Quote That Cost More','总价更高的便宜报价','advanced','消费选择','决策叙事','quantity,comparison,duration',0,
'在相同需求与时间范围下比较报价，辨认一次性费、持续费和范围差异。',
'add up|加起来|add up the costs / add them up。~included in|包含在……之中|be included in the total / price。~over the course of|在……期间|强调一整段时期。~like for like|同等条件下比较|避免把不同范围当作同一种方案。',
'Why was the lower monthly figure insufficient for the comparison?|It left out setup and delivery fees.|It used no numbers.|It covered a different colour of paper only.|0|报价范围不同，必须先补齐一次性和配送费用。~What did the team do before choosing?|Compared the same service over the same six-month period.|Multiplied only the larger price.|Chose whichever email arrived first.|0|统一需求和期间后再合计。',
'说明两个方案各包含什么，按六个月计算总额，并明确哪些条件仍需确认。',
'核对服务费是否包含安装、培训和每月两次配送。=>Could you confirm whether setup, training and two deliveries per month are included in the quoted price?',`
Our community workshop needed a printer for six months. Supplier A quoted sixty dollars a month, while Supplier B quoted eighty. At the top of a comparison table, the choice appeared obvious. Several people preferred A before reading the attachments. The monthly figures were easy to compare because they shared the same unit, but they did not yet describe the same service.§社区工作坊需要租打印机六个月。供应商A每月六十美元，B每月八十。放在比较表顶端，选择似乎很明显。几个人没看附件就选A。月费单位相同，看起来容易比较，但描述的还不是同一种服务。

A's offer included the machine but charged one hundred and twenty dollars for setup and thirty dollars for each monthly delivery. B included setup and one delivery a month in its price. We needed that delivery schedule, so ignoring it would not be a harmless simplification. We could not compare like for like until we had identified the services we actually required.§A含机器，安装另收一百二十美元，每月配送每次三十。B的价格包含安装和每月一次配送。我们确实需要这个配送频率，所以忽略它不是无害简化。先明确实际需要的服务，才能在同等条件下比较。

Over the course of six months, A's listed charges added up to six hundred and sixty dollars: three hundred and sixty in monthly fees, one hundred and twenty for setup and one hundred and eighty for deliveries. B's listed total was four hundred and eighty. Those figures concerned only the stated items in this fictional example; tax and any additional use still needed clarification.§六个月内，A列明的费用共六百六十美元：月费三百六十、安装一百二十、配送一百八十。B列明总额四百八十。这些数字只对应这个虚构例子中已列出的项目，税费和额外使用仍需确认。

We sent both suppliers the same questions. What volume was included? What happened if a delivery was missed? Could the machine be collected after six months without another period beginning automatically? The answers changed our view of convenience as well as price. A service that required a volunteer to solve each delivery problem could consume time that our table had not measured.§我们向两家发相同问题：包含多少用量，配送漏送怎么办，六个月后能否取走机器而不自动开始新一期？回答不仅影响价格判断，也影响便利性。若每次配送问题都需志愿者解决，就会耗费表中没计入的时间。

One person asked whether choosing B meant we no longer cared about cost. It was the opposite: we had finally agreed on which costs belonged in the decision. We also recorded conditions that were not included in either total. Where an answer remained uncertain, we kept a note instead of entering zero, which would have made missing information look like a free service.§有人问，选B是不是不在乎成本。恰恰相反：我们终于统一了哪些成本应纳入决定，也记下两个总额都没包含的条件。答案仍不确定时，保留备注，而不是填零，以免把缺信息伪装成免费。

We chose B after confirming the remaining terms in writing. The comparison table kept its first version beside the final one. It showed why our decision had changed without suggesting that a higher monthly price was always better. The useful habit was to add up a defined package over a defined period, then make the unresolved conditions visible to whoever would approve it.§书面确认剩余条款后，我们选了B。比较表保留第一版和最终版，说明决定为何改变，却不暗示月费高总是更好。有用的做法是：在明确期间内加总明确范围的项目，再让审批者看见尚未解决的条件。
`);
add(59,'A Change of Date, Not a Cancellation','是改日期，不是取消','intermediate','工作协作','沟通叙事','calendar,verbs-thinking,connections',0,
'识别听者推断与说话者本意的差别，用复述确认行动。',
'call off|取消|不同于 postpone 推迟。~put the event back|推迟活动|put something back；也可用 postpone。~clear up|澄清|clear up a misunderstanding。~as agreed|按约定|须有双方确实一致的安排。',
'What did Alex incorrectly assume?|That moving the event meant cancelling the room booking entirely.|That the room was blue.|That the customer wanted an earlier start.|0|把改期理解成取消全部预订，导致房间被释放。~What did the new confirmation include?|The old date, new date and what would remain booked.|Only the word changed.|A longer apology without dates.|0|同时说明变更项和保留项，避免对行动范围的误解。',
'用两个视角复述同一封消息：发件人希望什么、收件人做了什么，再说明澄清办法。',
'明确告诉同事：周二的会议改到周四，但请保留设备和餐饮预订。=>We’re moving Tuesday’s meeting to Thursday. Please keep the equipment and catering bookings and change their dates too.',`
My message to the venue was short: "We need to move next Tuesday's workshop. Please update the booking." I had not yet chosen a new date, but I expected the room to remain reserved while we discussed alternatives. Alex, the coordinator, read the message differently. He thought we wanted to call off the booking and start again later.§我发给场地方的消息很短：“下周二工作坊需要改期，请更新预订。”新日期还没定，我却期待讨论备选时房间继续保留。协调员亚历克斯理解不同：他以为我们要取消预订，以后再重新开始。

He released the room and sent a brief reply: "Updated as requested." I read that as confirmation of my own intention. Neither of us had stated the actual action in full. By Friday, another group had booked Tuesday, and I was asking whether we could put the event back by just two days. Thursday was available, but the equipment was not.§他释放房间，简短回复：“已按要求更新。”我把它读成对自己意图的确认。我们谁都没完整说出具体行动。到周五，另一组订走了周二；我问能否只推迟两天。周四有房，但设备没有。

At first, our emails focused on whose sentence had been clearer. That did not help us find a room or a projector. We switched to a call and described the sequence without arguing about motives. I explained what I had intended to keep. Alex explained what the booking system did when a reservation was cancelled.§起初，邮件都在争谁说得更清楚，但这找不到房间或投影仪。我们改为通话，先描述发生顺序，不争论动机。我说明原本想保留什么，亚历克斯解释系统取消预订后会发生什么。

That helped us clear up the misunderstanding. We found a smaller room on Thursday with equipment already installed. It meant changing the seating plan and reducing the number of extra chairs. I checked those changes with the workshop leader before accepting. A new date alone would not restore every part of the original arrangement.§这样才澄清误会。我们找到周四一间已装设备的小房间，需要改座位布局，减少备用椅子。接受前，我与工作坊负责人核对这些变化。仅有新日期，并不能恢复原安排的所有部分。

Alex's next message listed the details: the original Tuesday booking was cancelled, the Thursday room was confirmed, equipment was included, and catering still required my approval. I replied line by line. This was longer than "updated," but it let both of us identify exactly what had changed and what remained open.§亚历克斯下一封消息逐项列出：周二原预订已取消，周四房间已确认，含设备，餐饮仍需我批准。我也逐项回应。虽然比“已更新”长，却让我们都能识别究竟改了什么、什么仍未确定。

On Thursday, the workshop began as agreed. Afterwards, I kept a simple rule for change requests: state the old arrangement, the new arrangement if known, and the parts that must stay in place. I also ask the other person to confirm the action, not merely the receipt of my message. A read email is not necessarily a shared plan.§周四，工作坊按约开始。之后，我给变更请求留下一条简单规则：说明旧安排、已知的新安排，以及哪些必须保留。我也请对方确认行动，而不只是确认收到了消息。邮件已读，并不必然代表计划已共享。
`);
add(60,'When the Training Video Would Not Play','培训视频无法播放时','intermediate','科技与信息','问题解决','verbs-daily,verbs-work,connections',0,
'按可观察现象排查问题，记录尝试及其结果，避免同时改变多个条件。',
'work out|弄清；解决|work out what is happening。~one thing at a time|每次只检查一项|让每次尝试的结果更容易解释。~as well|也；同样|在此类叙述中常用于补充另一个观察。~get around|绕过障碍|临时替代不等于根本解决。',
'Why did the team test another short video?|To distinguish a problem with one file from a broader playback issue.|To make the meeting longer.|To erase the original file.|0|比较其他文件有助于限定问题范围。~Why was the temporary transcript not called a complete fix?|People could continue learning, but video playback remained unresolved.|Nobody could read it.|It replaced the entire course permanently.|0|替代材料让学习继续，但原播放问题还在。',
'说明问题、三次检查及结果、临时替代和交接信息，别把试过当成修好。',
'向支持团队报告：声音能播放，但画面不动；换过浏览器后仍相同。=>The audio plays, but the picture is frozen. I’ve tried another browser, and the result is the same.',`
Five minutes before the training session, the video froze on the opening image. The sound continued, but the picture did not move. I was sharing my screen with twelve colleagues. My first instinct was to click several settings at once, turn everything off and start again. That might help, but it would also make it harder to explain what had changed.§培训前五分钟，视频停在开场画面。声音继续，图像不动。我正向十二位同事共享屏幕。第一反应是同时点几个设置，全部关闭再来。但即使有效，也难解释究竟什么改变了结果。

I asked the group to pause and described exactly what I could observe. Someone suggested testing the file without screen sharing. The picture still froze. Another short video played normally on the same machine. That did not prove the cause, but it helped us work out that the problem might be connected with this particular file rather than every video.§我请大家暂停，先准确描述观察到的现象。有人建议不共享屏幕，直接播文件，画面仍停住。同一电脑上的另一段短视频正常播放。这没有证明原因，却帮助限定：问题可能与这个文件有关，而不是所有视频都不能播。

We checked one thing at a time. A second browser produced the same result as well. A colleague downloaded another copy, which also froze at the same point. I wrote down each attempt and its outcome. "Tried everything" would have sounded thorough, but it would not help the person who later had to inspect the file.§我们每次只检查一项。换浏览器后结果也相同，另一位同事重新下载一份，也停在同一处。我记下每次尝试和结果。“什么都试过了”听起来全面，却帮不了之后检查文件的人。

The instructor had a transcript and still images showing the main steps. We used those to get around the immediate obstacle and continued the discussion. Before moving on, I told the group that this was an alternative format for the session, not a confirmed repair. Anyone who needed the moving demonstration would receive another update.§讲师有文字稿和展示主要步骤的静态图。我们用它们暂时绕过障碍，继续讨论。继续前，我说明这是本次课程的替代形式，不代表视频已修好。需要动态演示的人，之后会收到更新。

After the session, I sent the support team the file name, the point where the picture stopped and the list of tests. I also explained that the audio played normally and other files worked. They did not need another description of how frustrating the session had been; they needed a reproducible account of what happened.§课后，我把文件名、停止位置和检查清单发给支持团队，也说明声音正常、其他文件能播。他们不需要再听一次课程多令人沮丧，而是需要能复现问题的记录。

The next day, the team supplied a new copy. I tested the troublesome section and then the complete video before sharing it. In the follow-up message, I said what I had checked and asked people to report if their device behaved differently. We could finally provide the promised demonstration without confusing a useful temporary route with a finished solution.§第二天，团队提供新副本。我先测原先出问题的片段，再测完整视频，之后才分享。跟进消息中，我说明检查范围，请大家报告自己设备上的不同表现。终于能提供原先承诺的演示，也没有把有用的临时办法与彻底解决混为一谈。
`);
const surfaces={29:{'turn down':'turned down'},25:{'in my own words':'in our own words','make sense':'made sense'},34:{'take for granted':'taken for granted','leave out':'leaving out'},37:{'be certain of':'was certain of'},39:{'refer to':'referred to'}};
for(const a of library) for(const p of a.phrases) p.quote=surfaces[a.id]?.[p.en]||p.en;
root.EditedArticles = library;
if(typeof articles!=='undefined') articles.push(...library);
})(typeof window!=='undefined'?window:globalThis);
