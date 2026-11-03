/* 原创教学材料；等级为编写难度提示，不是 CEFR 认证。花括号标出语境回忆答案。 */
(function (root) {
'use strict';
const units = [];
function parseEntries(id, rows, offset = 0) {
  return rows.trim().split('\n').filter(Boolean).map((row, i) => {
    const [head, pos, meaning, marked, zh, usage] = row.split('|');
    const answer = marked.match(/\{([^}]+)\}/)[1];
    return {id: `${id}-${String(i + 1 + offset).padStart(2, '0')}`, unit: id, head, pos, meaning,
      example: marked.replace(/[{}]/g, ''), zh, usage, prompt: marked.replace(/\{[^}]+\}/, '____'), answers: [answer]};
  });
}
function unit(id, title, family, level, intro, rules, rows) {
  units.push({id, title, family, level, intro, rules, entries: parseEntries(id, rows)});
}
function extend(id, rows) {
  const u = units.find(u => u.id === id);
  u.entries.push(...parseEntries(id, rows, u.entries.length));
}
unit('verbs-core','高频动词：一词多用','动词','基础','先用最常用的动词组织句子，再掌握搭配和词形。',[
'搭配一起学：make a decision、do the work、take a break，不能逐字互换。',
'一般现在时第三人称单数加 -s；疑问和否定中的主要动词用原形：Does she work here?',
'同一动词按义项记录。这里练的是所列用法，并不代表已经掌握它的全部词义。'],`
be|v.|是；处于某种状态|They {are} ready for the meeting.|他们准备好开会了。|am / is / are；过去式 was / were；过去分词 been。
have|v.|有；拥有|We {have} two options.|我们有两个选择。|have / has / had；have breakfast 表示吃早餐。
do|v.|做；处理任务|I need to {do} the laundry.|我需要洗衣服。|do / does / did / done；do homework，do the dishes。
make|v.|制作；作出|Let's {make} a decision today.|我们今天作个决定吧。|make / made / made；make a plan，不说 do a decision。
get|v.|得到；到达；变得|What time do you {get} home?|你几点到家？|get home 中 home 前不用 to；get tired 表示变累。
take|v.|拿；乘坐；花费|I usually {take} the train to work.|我通常坐火车上班。|take / took / taken；take a break；It takes ten minutes。
give|v.|给；提供|Could you {give} me a hand?|你能帮我一下吗？|give / gave / given；give someone something；give it to me。
go|v.|去|We {go} to the gym on Fridays.|我们周五去健身房。|go / went / gone；go home；go to work。
come|v.|来|Can you {come} to my office?|你能来我的办公室吗？|come / came / come；come to a place；come home。
put|v.|放置|Please {put} the keys on the table.|请把钥匙放在桌上。|put / put / put；需要说明把什么放在哪里。
keep|v.|保持；保留|Please {keep} the door closed.|请让门保持关闭。|keep / kept / kept；keep doing 表示持续做。
let|v.|让；允许|Please {let} me know by Friday.|请在周五前告诉我。|let / let / let；let someone do，不加 to。
`);
unit('verbs-daily','生活动作与短语动词','动词','基础','用完整搭配描述一天，也能请求别人做事。',[
'短语动词整体理解：look for 是寻找，look after 是照顾。',
'可分短语遇代词时放中间：turn it off，不能 turn off it。',
'时间顺序可以用 first、then、after that、finally 连接。'],`
wake up|phr.v.|醒来|I {wake up} at seven every morning.|我每天早上七点醒来。|wake / woke / woken；wake someone up 表示叫醒。
get up|phr.v.|起床|I {get up} ten minutes after my alarm rings.|闹钟响十分钟后我起床。|醒来 wake up 和离开床 get up 不一定同时发生。
leave|v.|离开；留下|I {leave} home at eight.|我八点离开家。|leave / left / left；leave for London 表示动身去伦敦。
arrive|v.|到达|We {arrive} at the station at noon.|我们中午到车站。|arrive at 小地点，arrive in 城市/国家；arrive home。
bring|v.|带来|Please {bring} your laptop to the meeting.|请把笔记本电脑带来开会。|bring / brought / brought；bring 朝说话者/目的地带来。
carry|v.|提；携带|Can you {carry} this bag for me?|你能帮我提这个包吗？|carry / carried；强调搬运，不限定朝向。
look for|phr.v.|寻找|I'm trying to {look for} my glasses.|我正在找眼镜。|look for 强调寻找过程；find 强调找到结果。
find|v.|找到|Did you {find} your keys?|你找到钥匙了吗？|find / found / found；did 后用原形。
turn on|phr.v.|打开设备|Could you {turn on} the light?|你能打开灯吗？|turn it on；开门用 open the door。
turn off|phr.v.|关掉设备|Please {turn off} your phone.|请关掉手机。|turn it off；音量调低是 turn it down。
pick up|phr.v.|接人；拿起|I'll {pick up} the children at five.|我五点去接孩子。|pick someone up；pick it up；也可指学会某项技能。
look after|phr.v.|照顾|Can you {look after} the cat this weekend?|这周末你能照顾猫吗？|不可把宾语放中间：look after it。
`);
unit('verbs-thinking','想法、感受与交流','动词','基础','表达想要什么、知道什么，以及如何向别人说明。',[
'want / need / decide 后面可接 to do；enjoy 后面接 doing。',
'say 强调说的内容，tell 常接人：tell me；speak to someone；talk about something。',
'know、want 等状态动词在这些用法中通常不用进行时。'],`
want|v.|想要|I {want} to book a room.|我想订一间房。|want to do；want someone to do；礼貌请求可用 would like。
need|v.|需要|We {need} to leave now.|我们现在需要出发。|need to do；don't need to 表示没必要。
know|v.|知道；认识|Do you {know} the address?|你知道地址吗？|know / knew / known；know how to do。
think|v.|认为；思考|I {think} this option is better.|我认为这个选项更好。|think / thought / thought；think about 表示考虑。
understand|v.|理解|I don't {understand} the last sentence.|我不理解最后一句话。|understand / understood / understood。
remember|v.|记得|Please {remember} to lock the door.|请记得锁门。|remember to do 尚未做；remember doing 记得做过。
forget|v.|忘记|Don't {forget} to send the email.|别忘了发邮件。|forget / forgot / forgotten；forget to do。
enjoy|v.|喜欢；享受|I {enjoy} cooking for friends.|我喜欢给朋友做饭。|enjoy doing，不说 enjoy to do。
say|v.|说|What did she {say}?|她说了什么？|say / said / said；say something to someone。
tell|v.|告诉|Could you {tell} me the time?|你能告诉我时间吗？|tell / told / told；tell someone about something。
ask|v.|问；请求|I'd like to {ask} a question.|我想问一个问题。|ask someone to do；ask for help。
explain|v.|解释|Could you {explain} the problem to me?|你能向我解释问题吗？|explain something to someone，不说 explain me something。
`);
unit('verbs-work','工作、安排与决策','动词','进阶','用动词说清楚进度、分工、变更和结果。',[
'安排要有动作、对象和时间：Please send the report by Friday。',
'finish / avoid 后用 doing；plan / agree 后可用 to do。',
'borrow 是借入，lend 是借出；spend 接人作主语，cost 常用物作主语。'],`
start|v.|开始|We {start} work at nine.|我们九点开始工作。|start doing / start to do 都可；start with 从……开始。
finish|v.|完成|I need to {finish} writing the report.|我需要写完报告。|finish doing，不说 finish to do。
plan|v.|计划|We {plan} to launch in June.|我们计划六月发布。|plan / planned；plan to do；a plan for the trip。
decide|v.|决定|Let's {decide} which version to use.|我们决定用哪个版本吧。|decide to do；decide on something。
agree|v.|同意|I {agree} with your suggestion.|我同意你的建议。|agree with 人/观点；agree to do；agree on 共同决定。
change|v.|改变|Can we {change} the delivery date?|我们能改交付日期吗？|change from A to B；change one's mind 改变主意。
confirm|v.|确认|Please {confirm} the booking by email.|请通过邮件确认预订。|confirm the details；确认事实，不等于提出建议。
check|v.|检查；核对|Could you {check} the total again?|你能再核对一下总额吗？|check in 办入住；check out 退房/查看。
send|v.|发送|I'll {send} you the updated file.|我会把更新后的文件发给你。|send / sent / sent；send it to me。
borrow|v.|借入|Could I {borrow} your pen?|我能借用你的笔吗？|borrow something from someone；归还用 return。
lend|v.|借出|Could you {lend} me your pen?|你能把笔借给我吗？|lend / lent / lent；lend something to someone。
spend|v.|花费时间或钱|I {spend} an hour reading every evening.|我每天晚上花一小时阅读。|spend time doing / spend money on；物作主语可用 cost。
`);
unit('verb-forms','不规则变化与时态','动词','进阶','不孤立背变化表，用时间线选择正确形式。',[
'过去时间已结束：I went yesterday；与现在相关的经历/结果：I have been there。',
"did / didn't 后接原形；have / has 后接过去分词。",
'现在完成时通常不与 yesterday、last week 这类已结束时间直接搭配。'],`
went|v.|go 的过去式|We {went} to Shanghai last week.|我们上周去了上海。|go / went / gone；有明确过去时间用过去式。
taken|v.|take 的过去分词|I have {taken} this train before.|我以前坐过这趟火车。|take / took / taken；have 后用 taken。
made|v.|make 的过去式/过去分词|She {made} a cake yesterday.|她昨天做了蛋糕。|make / made / made；不规则动词不加 -ed。
did|v.|do 的过去式|What {did} you do yesterday?|你昨天做了什么？|疑问句 did 后的主要动词 do 保持原形。
seen|v.|see 的过去分词|Have you {seen} this film?|你看过这部电影吗？|see / saw / seen；看电影的经历。
written|v.|write 的过去分词|I've {written} three emails today.|我今天已经写了三封邮件。|write / wrote / written；today 可指尚未结束的今天。
bought|v.|buy 的过去式/过去分词|I {bought} this jacket on Monday.|我周一买了这件夹克。|buy / bought / bought；bought 与 brought 不同。
brought|v.|bring 的过去式/过去分词|She {brought} some snacks to the party.|她带了一些零食来聚会。|bring / brought / brought；注意与 bought 区分。
left|v.|leave 的过去式/过去分词|The train {left} ten minutes ago.|火车十分钟前开走了。|leave / left / left；ago 表示距现在多久以前。
been|v.|be 的过去分词；去过|I've {been} to London twice.|我去过伦敦两次。|have been to 去过且回来了；have gone to 去了尚未回来。
working|v.|work 的现在分词|She is {working} from home today.|她今天正在家办公。|be + doing；work / worked / worked。
used to|phr.|过去常常|I {used to} live near the station.|我过去住在车站附近。|used to do 过去常常；be used to doing 习惯于。
`);
unit('modals','情态、请求与义务','动词','进阶','表达能力、可能性、建议、义务和假设。',[
'情态动词后接动词原形：can go、should leave，不加 to 或 -s。',
"mustn't 是禁止；don't have to 是没必要，意义完全不同。",
'could / would 可让请求更委婉；may / might 表示可能，不能当成确定事实。'],`
can|modal|能；可以|I {can} swim, but I can't dive.|我会游泳，但不会潜水。|can + 原形；第三人称不加 -s。
could|modal|能否；过去能够|{Could} you repeat that, please?|请你再说一遍好吗？|Could you do...? 礼貌请求；这里不是描述过去。
would like|phr.|想要（礼貌）|I {would like} a window seat.|我想要一个靠窗座位。|would like something / would like to do。
should|modal|应该；建议|You {should} back up your files.|你应该备份文件。|should + 原形；shouldn't 表示建议不要。
must|modal|必须|You {must} wear a seat belt.|你必须系安全带。|must + 原形；过去的义务一般用 had to。
mustn't|modal|禁止；绝对不能|You {mustn't} park in front of the gate.|你不能把车停在大门前。|must not 的缩写，不能与 don't have to 混淆。
have to|phr.|不得不；必须|I {have to} leave by six.|我必须六点前离开。|has to / had to；do you have to...?
don't have to|phr.|没必要|You {don't have to} bring any food.|你不必带食物。|不必做，但允许做；不是禁止。
may|modal|可能；可以（较正式）|The package {may} arrive tomorrow.|包裹明天可能送到。|may + 原形；表示不确定。
might|modal|可能|We {might} need more time.|我们可能需要更多时间。|might + 原形；不能机械换算成固定概率。
will|modal|将会；即时决定|I'll help you; I {will} carry that bag.|我来帮你，我来提那个包。|will / 'll；否定 won't；也可表达意愿。
would|modal|会（假设）；委婉询问|{Would} you mind opening the window?|你介意打开窗户吗？|Would you mind doing...?；不能 mind to do。
`);
unit('numbers','数字、序数与金额','数字数量','基础','把数字听准、说准，特别练十几、整十、小数和大数。',[
'13 / 30、14 / 40、15 / 50 容易混听；必要时逐位确认：three zero。',
'日期用序数词；金额按货币和地区有不同读法，重要信息应再确认。',
'1 million = 100万；350万 = 3.5 million，不是 350 million。'],`
zero|num.|零|The temperature is {zero} degrees.|气温是零度。|号码中也可能听见 oh；核对重要号码可明确说 zero。
thirteen|num.|十三|There are {thirteen} people in the room.|房间里有十三个人。|13；注意与 thirty（30）对比，-teen 常带较强重音。
thirty|num.|三十|The journey takes {thirty} minutes.|路程要三十分钟。|30；有歧义时说 three zero。
fifteen|num.|十五|Please wait for {fifteen} minutes.|请等十五分钟。|15；对比 fifty（50）。
fifty|num.|五十|The ticket costs {fifty} dollars.|票价是五十美元。|50；对比 fifteen（15）。
first|num.|第一|This is my {first} visit.|这是我第一次来。|one → first；日期 the first of May / May first。
second|num.|第二|Take the {second} exit.|从第二个出口出去。|two → second；second 也作名词表示秒。
third|num.|第三|Our office is on the {third} floor.|我们办公室在三楼。|three → third；楼层编号须注意国家差异。
twenty-first|num.|第二十一|Her birthday is on the {twenty-first} of June.|她生日是六月二十一日。|21st；复合序数只变最后一部分。
hundred|num.|百|The total is two {hundred} dollars.|总额是两百美元。|具体数词后不加 s；hundreds of 表示数百。
thousand|num.|千|The project costs ten {thousand} dollars.|项目花费一万美元。|10,000 = ten thousand；不是 one thousand。
million|num.|百万|The population is three point five {million}.|人口是三百五十万。|3,500,000；具体数词后 million 不加 s。
`);
unit('quantity','小数、比例、单位与数量','数字数量','进阶','从“会读一个数”进到“准确传达数量关系”。',[
'可数名词用 many / few；不可数名词用 much / little。',
'half of、a third of 等表示比例；分母为序数，分子大于一时分母通常加 s。',
'百分比变化要区分 percent 与 percentage points；确认单位与基准。'],`
point|n.|小数点|The result is three {point} five.|结果是三点五。|3.05 可读 three point zero five，小数位逐位读。
percent|n./adv.|百分之|Sales rose by ten {percent}.|销售额增长了百分之十。|10%；percent 前有具体数字；percentage 表示百分比这个概念。
half|n./det.|一半|I'd like {half} a kilo of apples.|我想要半公斤苹果。|half an hour；half of the total。
quarter|n.|四分之一；一刻钟|A {quarter} of the team works remotely.|团队四分之一的人远程工作。|a quarter = 1/4；a quarter past two = 2:15。
two thirds|num.|三分之二|{Two thirds} of the seats are full.|三分之二的座位坐满了。|分子基数、分母序数复数：two thirds。
many|det.|许多（可数）|How {many} tickets do you need?|你需要多少张票？|many + 可数名词复数；How many people...?
much|det.|多少；许多（不可数）|How {much} time do we have?|我们有多少时间？|much + 不可数名词；How much is it? 问价格。
a few|det.|几个；一些（可数）|We still have {a few} seats left.|我们还剩几个座位。|a few 表示有一些；few 强调几乎没有。
a little|det.|一点（不可数）|Could I have {a little} water?|能给我一点水吗？|a little water；little water 强调水很少。
each|det./pron.|每个（逐个）|The tickets cost ten dollars {each}.|票每张十美元。|each ticket；each of the tickets；强调个体。
kilo|n.|公斤|These oranges cost three dollars a {kilo}.|这些橙子每公斤三美元。|kilogram 的口语形式；复数 kilos。
at least|phr.|至少|We need {at least} three volunteers.|我们至少需要三名志愿者。|at least 最少；at most 最多；up to 可表示上限。
`);
unit('clock','钟点、预约与时间确认','时间','基础','同一个时间听得懂、读得出，也能在对话中确认。',[
'时间前常用 at，星期/日期前用 on，月份/年份前用 in。',
'2:15 = two fifteen / a quarter past two；2:45 = two forty-five / a quarter to three。',
'跨时区约时间要确认日期和时区；12 a.m. 是午夜，12 p.m. 是中午。'],`
o'clock|adv.|整点|The shop opens at nine {o'clock}.|商店九点整开门。|只用于整点：nine o'clock，不说 nine thirty o'clock。
past|prep.|过了（钟点）|It's ten {past} two.|现在是两点十分。|分钟 + past + 小时；也可直接说 two ten。
to|prep.|差……到（钟点）|It's ten {to} three.|现在是两点五十分。|ten to three = 2:50；小时指即将到来的小时。
half past|phr.|……点半|The meeting starts at {half past} two.|会议两点半开始。|half past two = 2:30；不是 1:30。
noon|n.|中午十二点|Let's meet at {noon}.|我们中午十二点见。|at noon；12 p.m.；避免模糊的 12 o'clock。
midnight|n.|午夜十二点|The last train leaves at {midnight}.|末班车午夜发车。|at midnight；12 a.m.；订票时确认所属日期。
a.m.|adv.|上午；午夜至中午前|The flight leaves at 8 {a.m.}|航班上午八点起飞。|8 a.m. = 08:00；不再叠加 in the morning。
p.m.|adv.|下午；中午至午夜前|Dinner is at 7 {p.m.}|晚餐在晚上七点。|7 p.m. = 19:00；注意上午下午不要听反。
on time|phr.|准时|The train arrived {on time}.|火车准时到了。|on time 按预定时间；in time 来得及。
in time|phr.|及时；来得及|We arrived {in time} to catch the bus.|我们及时赶到，坐上了公交车。|in time for the meeting；不是强调精确时间点。
early|adj./adv.|早的；提前|We arrived ten minutes {early}.|我们提前十分钟到了。|early / earlier / earliest；ten minutes early。
late|adj./adv.|晚的；迟到|I'm sorry I'm {late}.|对不起，我迟到了。|late / later / latest；lately 是最近，不是晚地。
`);
unit('calendar','日期、星期与频率','时间','基础','安排今天、回顾昨天、说明多久做一次。',[
'last / next / this + 时间通常不加 in / on / at：next Monday。',
'频率副词通常在实义动词前、be 后：usually work；am usually busy。',
'日期 03/04 有地区歧义；重要安排写出月份名称。'],`
yesterday|adv./n.|昨天|I sent the file {yesterday}.|我昨天发了文件。|常配一般过去时；the day before yesterday 前天。
today|adv./n.|今天|Are you free {today}?|你今天有空吗？|this morning 今天早上；时态取决于事件与时间是否结束。
tomorrow|adv./n.|明天|I'll call you {tomorrow}.|我明天给你打电话。|the day after tomorrow 后天；不说 on tomorrow。
next week|phr.|下周|We're moving office {next week}.|我们下周搬办公室。|next week 前不用 in；in a week 是一周后。
last month|phr.|上个月|We visited Rome {last month}.|我们上个月去了罗马。|last month 前不用 in；常配过去时。
Monday|n.|星期一|The course starts on {Monday}.|课程周一开始。|on Monday；on Mondays 每逢周一；星期首字母大写。
January|n.|一月|The new term starts in {January}.|新学期一月开始。|in January；on January 5th；月份首字母大写。
weekend|n.|周末|What are you doing this {weekend}?|你这周末做什么？|at the weekend 常见于英式；on the weekend 常见于美式。
always|adv.|总是|She {always} arrives early.|她总是提前到。|实义动词前；She is always early。
usually|adv.|通常|I {usually} walk to work.|我通常走路上班。|usually 表示通常如此，并非每次。
sometimes|adv.|有时|I {sometimes} work from home.|我有时在家办公。|可用于句首；some time 是一段时间。
twice|adv.|两次|I go swimming {twice} a week.|我每周游泳两次。|once 一次，twice 两次，three times 三次。
`);
unit('duration','时长、起点与截止','时间','进阶','分清持续多久、何时开始、最晚何时完成。',[
'for + 时长；since + 起点：for two years / since 2024。',
'by 表示最迟；until 表示持续到：send it by five / stay until five。',
'in two days 两天后；two days ago 两天前；within two days 两天之内。'],`
for|prep.|持续（多长时间）|I've lived here {for} three years.|我在这里住了三年。|for + 时长；也可用于过去时：I stayed for a week。
since|prep./conj.|自从（时间起点）|I've worked here {since} 2022.|我从2022年就在这里工作。|since + 起点；常与现在完成时搭配。
by|prep.|最迟在……之前|Please reply {by} Friday.|请最迟周五回复。|表示截止；如须精确要补充时刻和时区。
until|prep./conj.|一直到|I'll be in the office {until} six.|我会在办公室待到六点。|表示状态持续；not until 直到……才。
during|prep.|在……期间|Please keep quiet {during} the film.|电影播放期间请保持安静。|during + 名词；while 后可接完整分句。
while|conj.|当……时|I listened to music {while} I was cooking.|做饭时我听了音乐。|while + 分句；during dinner，不说 during I ate。
before|prep./conj.|在……之前|Call me {before} you leave.|你出发前给我打电话。|时间从句表达将来通常用一般现在时。
after|prep./conj.|在……之后|Let's talk {after} lunch.|我们午饭后聊。|after + 名词/分句；after doing something。
ago|adv.|……以前（距现在）|They moved here two years {ago}.|他们两年前搬来这里。|过去时；two years ago，不说 ago two years。
in|prep.|……之后（未来）|I'll be back {in} ten minutes.|我十分钟后回来。|in + 一段时间；in ten minutes 不等于 for ten minutes。
within|prep.|在……之内|We'll reply {within} two working days.|我们会在两个工作日内回复。|限定最大时长；确认是工作日还是自然日。
from…to…|phr.|从……到……|The office is open {from} nine to five.|办公室从九点开到五点。|from A to B；between A and B，不能 between A to B。
`);
unit('adjectives','描述事物与反义表达','形容词','基础','用具体属性描述需求，避免所有东西都只会说 good。',[
'形容词放名词前或系动词后：a quiet room / the room is quiet。',
'修饰人的感受与事物特性要分清：I am interested；the topic is interesting。',
'形容词不随名词复数加 s：two small rooms。'],`
available|adj.|可用的；有空的|Is this room {available} tonight?|这个房间今晚有空吗？|be available；available for a meeting；不能只理解成便宜。
busy|adj.|忙碌的|I'm {busy} until three.|我三点前都很忙。|be busy doing；busy / busier / busiest。
quiet|adj.|安静的|I'd prefer a {quiet} room.|我更想要一间安静的房。|quiet / quieter；与 quite（相当）拼写不同。
noisy|adj.|吵闹的|The restaurant is too {noisy}.|餐厅太吵了。|noisy / noisier / noisiest；名词 noise。
comfortable|adj.|舒适的|These shoes are very {comfortable}.|这双鞋很舒服。|more / most comfortable；反义 uncomfortable。
expensive|adj.|昂贵的|That option is too {expensive}.|那个选项太贵了。|more / most expensive；expensive 不等于 valuable。
cheap|adj.|便宜的|The tickets are surprisingly {cheap}.|票出奇地便宜。|cheap / cheaper / cheapest；也可能暗示质量差，留意语境。
heavy|adj.|重的|This suitcase is too {heavy}.|这个行李箱太重了。|heavy / heavier / heaviest；反义 light。
light|adj.|轻的|I need a {light} jacket for spring.|我需要一件春天穿的轻便夹克。|light 也可指浅色/光；按语境区分。
safe|adj.|安全的|Is it {safe} to walk here at night?|晚上在这里走路安全吗？|safe / safer / safest；名词 safety。
clear|adj.|清晰的；明确的|The instructions are {clear}.|说明很清楚。|clear / clearer；make something clear。
ready|adj.|准备好的|Are you {ready} to order?|你准备好点餐了吗？|ready to do；ready for something。
`);
unit('feelings','人物、感受与程度','形容词','基础','表达身体状态、感受和评价，也能解释原因。',[
'-ed 常描述感受，-ing 常描述引起感受的特性：bored / boring。',
'感受后常有固定介词：worried about、interested in、good at。',
'副词修饰形容词：really tired、quite useful；不要把 freshly 当形容词。'],`
tired|adj.|疲倦的|I feel {tired} after the trip.|旅行后我很累。|be tired of 对……厌倦；be tired from 因……劳累。
hungry|adj.|饥饿的|Are you {hungry} yet?|你饿了吗？|hungry / hungrier / hungriest。
thirsty|adj.|口渴的|I'm {thirsty}; could I have some water?|我渴了，能给我一点水吗？|thirsty / thirstier / thirstiest。
worried|adj.|担心的|I'm {worried} about the deadline.|我担心截止时间。|worried about；worrying 令人担心的。
interested|adj.|感兴趣的|I'm {interested} in photography.|我对摄影感兴趣。|be interested in；不是 interested about。
interesting|adj.|有趣的|That's an {interesting} question.|那是一个有趣的问题。|描述引起兴趣的事物；与 interested 区分。
bored|adj.|感到无聊的|The children are {bored}.|孩子们感到无聊。|bored with / by；boring 描述令人无聊的事物。
boring|adj.|令人无聊的|The lecture was {boring}.|讲座很无聊。|I'm bored 不同于 I'm boring。
excited|adj.|兴奋的|We're {excited} about the trip.|我们对旅行很兴奋。|excited about；exciting 令人兴奋的。
helpful|adj.|有帮助的；乐于助人的|Your advice was really {helpful}.|你的建议很有帮助。|helpful to someone；advice 不可数。
really|adv.|确实；很|I'm {really} glad you could come.|你能来我很高兴。|副词，修饰形容词/动词；real 是形容词。
quite|adv.|相当；颇|The test was {quite} difficult.|考试相当难。|quite difficult；quite a good idea；注意与 quiet 区分。
`);
unit('comparison','比较、程度与选择','形容词','进阶','比较方案、说明过量和不足，把需求表达准确。',[
'短形容词常加 -er / -est，较长形容词常用 more / most；不说 more cheaper。',
'enough 放形容词后、名词前：large enough / enough time。',
'比较要说清参照：cheaper than the other one；as...as 表示同等程度。'],`
better|adj./adv.|更好|This route is {better} than the old one.|这条路线比原来的更好。|good / well → better → best；不能 more better。
best|adj./adv.|最好|Which option is the {best}?|哪个选项最好？|最高级常用 the；比较范围须清楚。
worse|adj./adv.|更差|The traffic is {worse} today.|今天交通更差。|bad / badly → worse → worst。
cheaper|adj.|更便宜|Is there a {cheaper} ticket?|有更便宜的票吗？|cheap → cheaper；cheaper than；不说 more cheaper。
more expensive|adj.|更贵|The direct flight is {more expensive}.|直达航班更贵。|expensive 用 more / most，不加 -er。
less|det./adv.|更少；较不|We have {less} time than yesterday.|我们时间比昨天更少。|less + 不可数；less expensive 表示没那么贵。
fewer|det.|更少（可数）|There are {fewer} cars on Sundays.|周日车更少。|fewer + 可数名词复数；fewer people。
as|adv./conj.|像……一样|This bag is as heavy {as} that one.|这个包和那个一样重。|as + 形容词原级 + as；not as...as 不如。
too|adv.|太；过于|It's {too} cold to swim.|天气太冷，不能游泳。|too + 形容词 + to do；too much water / too many people。
enough|adv./det.|足够|Is this room large {enough}?|这个房间够大吗？|形容词后 enough；enough chairs 放名词前。
much|adv.|……得多（修饰比较级）|The train is {much} faster than the bus.|火车比公交车快得多。|much / a lot / slightly + 比较级；不用 very faster。
most|adv.|最（构成最高级）|This is the {most} convenient option.|这是最方便的选项。|the most + 较长形容词；one of the most useful tools。
`);
unit('prepositions','位置、方向与搭配','基础表达','基础','介词跟场景一起用，不只背一个中文意思。',[
'at 常指点位，in 常指内部，on 常指表面；具体用法也取决于固定搭配。',
'移动进入用 into，静态位置用 in；到达地点要看动词：arrive at / get to。',
'介词后接名词或 doing；look forward to meeting 中 to 是介词。'],`
in|prep.|在……里面|The keys are {in} my bag.|钥匙在我包里。|in the room / in Beijing；月份年份也常用 in。
on|prep.|在……上面|Your phone is {on} the desk.|你的手机在桌上。|on the wall / on the bus；星期日期用 on。
at|prep.|在（点位）|I'll meet you {at} the entrance.|我在入口处见你。|at the station / at home；具体时刻用 at。
under|prep.|在……下面|The bag is {under} the chair.|包在椅子下面。|与 over / above 对照位置，注意是否有遮盖/垂直关系。
between|prep.|在……之间|The café is {between} the bank and the hotel.|咖啡馆在银行和酒店之间。|between A and B；不能 between A to B。
next to|prep.|在……旁边|The pharmacy is {next to} the supermarket.|药店在超市旁边。|next to 紧邻；near 表示附近。
opposite|prep.|在……对面|The bus stop is {opposite} the museum.|公交站在博物馆对面。|opposite the building；不是 next to。
into|prep.|进入……里面|She walked {into} the room.|她走进房间。|表示进入的移动；in 表示内部位置。
across|prep.|横穿；在另一边|Walk {across} the bridge.|走过桥。|across the road；through the tunnel 是穿过内部。
through|prep.|穿过（内部）|The train goes {through} a tunnel.|火车穿过隧道。|through the park；也可表示整个过程。
with|prep.|和；用；带有|I'd like a room {with} a balcony.|我想要一个带阳台的房间。|with someone / with a pen；without 是没有。
without|prep.|没有；不做|Can I order coffee {without} sugar?|我能点不加糖的咖啡吗？|without + 名词/doing；without saying goodbye。
`);
unit('determiners','冠词、代词与名词数量','基础表达','进阶','说清楚指谁、指哪个、多少，以及是否已经提过。',[
'a / an 按后面单词的开头发音选择：an hour、a university。',
'可数单数名词通常需要限定词；information、advice、luggage 常不可数。',
'some 常用于肯定及期待同意的请求，any 常用于疑问/否定；须结合语境。'],`
a|det.|一个；某个|She's {a} university student.|她是一名大学生。|university 开头是辅音音素 /j/；用 a。
an|det.|一个（元音音素前）|I'll be back in {an} hour.|我一小时后回来。|hour 的 h 不发音；按发音选 an。
the|det.|特指的人或事物|Please close {the} door behind you.|请关上你身后的那扇门。|双方知道指哪扇门时特指；不是所有名词都加 the。
some|det./pron.|一些|Would you like {some} tea?|你想喝点茶吗？|礼貌提供/请求中也常用 some。
any|det./pron.|任何；一些（疑问/否定）|We don't have {any} milk left.|我们没有牛奶了。|not any；any seat 也可表示任何座位。
another|det./pron.|另一个；再一个|Could I have {another} cup of coffee?|我能再喝一杯咖啡吗？|another + 可数单数；another two days 再两天。
other|det./adj.|其他的|Are there any {other} options?|还有其他选项吗？|other + 名词；the other 两者中的另一个。
it|pron.|它（作主语或宾语）|I like this bag; I'll take {it}.|我喜欢这个包，我买它。|指代上文单数事物；put it down，不能 put down it。
them|pron.|他们；它们（宾格）|The keys are here; please take {them}.|钥匙在这里，请把它们拿走。|they 作主语，them 作宾语。
mine|pron.|我的（所有物）|This seat is {mine}.|这个座位是我的。|mine 后不接名词；my seat；yours / hers / ours / theirs。
information|n.|信息|Could you send me more {information}?|你能发给我更多信息吗？|不可数；a piece of information；不说 informations。
advice|n.|建议|Thank you for your {advice}.|谢谢你的建议。|不可数；some advice；advise 是动词。
`);
unit('connections','连接、提问与澄清','基础表达','进阶','把单句连成完整意思，听不懂时也能继续交流。',[
'because 和 so 通常不在同一个因果句里重复连接；although 与 but 同理。',
'询问原因 why、方式 how、时长 how long、频率 how often。',
'澄清是交流的一部分：Could you repeat that? / Do you mean...?'],`
because|conj.|因为|I took a taxi {because} I was late.|因为迟到了，我打了车。|because + 分句；because of + 名词。
so|conj.|所以|It was raining, {so} we stayed inside.|下雨了，所以我们待在室内。|so 连接结果；正式写作避免 because...so 重复。
although|conj.|虽然|{Although} it was cold, we went for a walk.|虽然天气冷，我们还是去散步了。|although... 不再加 but 连接同一主从句。
if|conj.|如果|I'll call you {if} I need help.|如果需要帮助，我会给你打电话。|真实将来条件：if 从句现在时，主句可用 will。
unless|conj.|除非；如果不|We won't leave {unless} you're ready.|除非你准备好了，否则我们不会出发。|unless 约等于 if...not；留意否定意义。
both|det./pron.|两者都|{Both} options are available.|两个选项都可选。|both A and B；both of us；谓语通常用复数。
either|det./pron.|两者任一个|{Either} date works for me.|两个日期中的任一个我都可以。|either A or B；either date + 单数谓语。
neither|det./pron.|两者都不|{Neither} option is suitable.|两个选项都不合适。|neither A nor B；neither option + 单数谓语。
how long|phr.|多长时间|{How long} does the journey take?|路程要多久？|回答 for + 时长，或直接说时长；不等于何时。
how often|phr.|多久一次|{How often} do you exercise?|你多久锻炼一次？|回答频率：twice a week；与 how long 区分。
repeat|v.|重复|Could you {repeat} that more slowly?|你能再慢一点说一遍吗？|repeat something；礼貌表达不需要 repeat again。
mean|v.|意思是|Do you {mean} thirteen or thirty?|你是说十三还是三十？|mean / meant / meant；What does ... mean?
`);
extend('numbers', `
one|num.|一|I'd like {one} ticket, please.|我要一张票，谢谢。|one / first；one hundred；one ticket 用单数。
two|num.|二|We need {two} chairs.|我们需要两把椅子。|two / second；two chairs 用复数。
three|num.|三|There are {three} exits.|有三个出口。|three / third；数字与序数词形不同。
four|num.|四|The class lasts {four} weeks.|课程持续四周。|four / fourth；不要与 for 混写。
five|num.|五|The ticket costs {five} pounds.|票价五英镑。|five / fifth；序数去掉 ve 变成 f。
six|num.|六|A table for {six}, please.|请给我们一张六人桌。|six / sixth；six people。
seven|num.|七|The shop opens at {seven}.|商店七点开门。|seven / seventh；说明上午下午以免歧义。
eight|num.|八|There are {eight} seats in this row.|这一排有八个座位。|eight / eighth；eighth 只有一个 t。
nine|num.|九|The meeting starts at {nine}.|会议九点开始。|nine / ninth；ninth 去掉 e。
ten|num.|十|The trip takes {ten} minutes.|路程要十分钟。|ten / tenth；ten minutes 注意复数。
eleven|num.|十一|Our group has {eleven} members.|我们组有十一名成员。|eleven / eleventh。
twelve|num.|十二|There are {twelve} months in a year.|一年有十二个月。|twelve / twelfth；注意 twelfth 的拼写。
fourteen|num.|十四|Room {fourteen} is upstairs.|十四号房在楼上。|14；fourteen 与 forty 对比听。
sixteen|num.|十六|The course has {sixteen} lessons.|课程有十六节课。|16；与 sixty（60）对比。
seventeen|num.|十七|There are {seventeen} names on the list.|名单上有十七个名字。|17；与 seventy（70）对比。
eighteen|num.|十八|You must be at least {eighteen} to join.|参加者必须至少十八岁。|18；与 eighty（80）对比。
nineteen|num.|十九|The total is {nineteen} euros.|总额为十九欧元。|19；与 ninety（90）对比。
twenty|num.|二十|The bus comes every {twenty} minutes.|公交车每二十分钟来一班。|20；twenty-one 到 twenty-nine 用连字符连接。
forty|num.|四十|The taxi fare is {forty} dollars.|出租车费四十美元。|40；正确拼写 forty，不是 fourty。
sixty|num.|六十|There are {sixty} seconds in a minute.|一分钟有六十秒。|60；与 sixteen 对比。
seventy|num.|七十|The ticket costs {seventy} yuan.|票价七十元。|70；与 seventeen 对比。
eighty|num.|八十|The limit is {eighty} kilometres per hour.|限速每小时八十公里。|80；eighty 不写 eightty。
ninety|num.|九十|The workshop lasts {ninety} minutes.|工作坊持续九十分钟。|90；注意 ninety 与 nineteen。
billion|num.|十亿|The investment is one {billion} dollars.|投资额是十亿美元。|1,000,000,000；现代通行英语中的 billion 为十亿。
fourth|num.|第四|This is the {fourth} time I've called.|这是我第四次打电话。|4th；four → fourth；不是 forth。
fifth|num.|第五|We live on the {fifth} floor.|我们住在五楼。|5th；five → fifth。
eighth|num.|第八|The meeting is on the {eighth} of May.|会议在五月八日。|8th；eight → eighth。
ninth|num.|第九|My seat is in the {ninth} row.|我的座位在第九排。|9th；nine → ninth。
twelfth|num.|第十二|The deadline is the {twelfth} of July.|截止日期是七月十二日。|12th；twelve → twelfth。
twentieth|num.|第二十|Today is her {twentieth} birthday.|今天是她二十岁生日。|20th；twenty → twentieth；整十序数 -y 变 -ieth。
thirty-first|num.|第三十一|The booking ends on the {thirty-first} of August.|预订到八月三十一日结束。|31st；复合数字最后一部分变序数。
`);
extend('calendar', `
Tuesday|n.|星期二|The library is closed on {Tuesday}.|图书馆星期二闭馆。|Tuesday / Tue；注意首字母大写。
Wednesday|n.|星期三|We have a meeting every {Wednesday}.|我们每周三开会。|Wednesday / Wed；every Wednesday 前不用 on。
Thursday|n.|星期四|I'll be back on {Thursday}.|我星期四回来。|Thursday / Thu；与 Tuesday 区分。
Friday|n.|星期五|Please send it by {Friday}.|请最迟星期五发送。|Friday / Fri；on Friday 指当日，by Friday 指截止。
Saturday|n.|星期六|Let's meet on {Saturday} morning.|我们星期六上午见。|on Saturday morning，具体某天的早晨用 on。
Sunday|n.|星期日|The shop closes early on {Sunday}.|商店星期日提早关门。|Sunday / Sun；周起始日因地区习惯不同。
February|n.|二月|The course begins in {February}.|课程二月开始。|February / Feb；in February，日期用 on。
March|n.|三月|My birthday is in {March}.|我的生日在三月。|March / Mar；首字母大写时作月份。
April|n.|四月|The exhibition opens in {April}.|展览四月开幕。|April / Apr；on April 3rd。
May|n.|五月|The new office opens in {May}.|新办公室五月启用。|May 作月份时大写；may 小写可作情态动词。
June|n.|六月|We're travelling in {June}.|我们六月去旅行。|June / Jun；注意 June 与 July。
July|n.|七月|The festival takes place in {July}.|节日在七月举行。|July / Jul；on July 4th。
August|n.|八月|The school is closed in {August}.|学校八月停课。|August / Aug；月份名称首字母大写。
September|n.|九月|The term starts in {September}.|学期九月开始。|September / Sep / Sept。
October|n.|十月|We moved here in {October}.|我们十月搬到这里。|October / Oct；不要因 oct 词根误认为八月。
November|n.|十一月|The conference is in {November}.|会议在十一月。|November / Nov。
December|n.|十二月|The year ends in {December}.|一年在十二月结束。|December / Dec。
spring|n.|春季|The flowers bloom in {spring}.|花在春天开放。|in spring；季节名称通常不用大写。
summer|n.|夏季|We often swim in {summer}.|我们夏天经常游泳。|in summer；this summer 前不用 in。
autumn|n.|秋季|The leaves change colour in {autumn}.|树叶在秋天变色。|autumn（英式常用）；fall（美式常用）。
winter|n.|冬季|It often snows here in {winter}.|这里冬天经常下雪。|in winter；last winter 前不用 in。
once|adv.|一次|We meet {once} a month.|我们每月见一次。|once a day / once a year；不是 one time a month 的唯一表达。
never|adv.|从不|I {never} drink coffee at night.|我晚上从不喝咖啡。|never 本身含否定；一般不再加 don't。
often|adv.|经常|How {often} do you travel for work?|你多久出差一次？|often 在实义动词前，be 后；often 不代表固定频率。
`);
extend('duration', `
second|n.|秒|Please wait one {second}.|请等一秒。|1 minute = 60 seconds；second 也可作序数第二。
minute|n.|分钟|The call lasted one {minute}.|电话持续了一分钟。|a minute；five minutes；注意复数。
hour|n.|小时|The meeting lasted an {hour}.|会议持续了一个小时。|an hour；a two-hour meeting 作定语 hour 不加 s。
day|n.|一天；白天|I'll stay for one {day}.|我会待一天。|working day 工作日；calendar day 自然日。
week|n.|周|We need another {week}.|我们还需要一周。|in a week 一周后；for a week 持续一周。
month|n.|月|The trial lasts one {month}.|试用持续一个月。|once a month 每月一次；a monthly payment 按月付款。
year|n.|年|I've lived here for a {year}.|我在这里住一年了。|for a year；since last year；annual 每年的。
recently|adv.|最近|Have you seen her {recently}?|你最近见过她吗？|可配现在完成时或过去时，依据具体语境。
already|adv.|已经|I've {already} sent the email.|我已经发了邮件。|通常在助动词后、主要动词前。
yet|adv.|还；已经（疑问/否定）|I haven't finished {yet}.|我还没完成。|否定和疑问中常放句尾；Have you finished yet?
`);
extend('verb-forms', `
ate|v.|eat 的过去式|We {ate} at home last night.|我们昨晚在家吃饭。|eat / ate / eaten。
drunk|v.|drink 的过去分词|I've {drunk} enough water today.|我今天已经喝了足够的水。|drink / drank / drunk；也可作形容词醉的。
spoken|v.|speak 的过去分词|Have you {spoken} to the manager?|你和经理谈过了吗？|speak / spoke / spoken；speak to / with someone。
read|v.|读（原形/过去式/过去分词同形）|I {read} the report yesterday.|我昨天读了报告。|read / read / read；原形读 /riːd/，过去式与分词读 /red/。
met|v.|meet 的过去式/过去分词|We {met} at a conference last year.|我们去年在会议上认识。|meet / met / met。
paid|v.|pay 的过去式/过去分词|I {paid} by card yesterday.|我昨天刷卡付款。|pay / paid / paid；pay for something。
felt|v.|feel 的过去式/过去分词|I {felt} better after a rest.|休息后我感觉好多了。|feel / felt / felt；feel + 形容词。
thought|v.|think 的过去式/过去分词|I {thought} the meeting was tomorrow.|我原以为会议是明天。|think / thought / thought；thought 作名词也表示想法。
found|v.|find 的过去式/过去分词|She {found} her keys under the sofa.|她在沙发下面找到了钥匙。|find / found / found；found 另有创立这个动词义项。
kept|v.|keep 的过去式/过去分词|I {kept} the receipt.|我保留了收据。|keep / kept / kept；keep doing。
began|v.|begin 的过去式|The film {began} at eight.|电影八点开始。|begin / began / begun。
chosen|v.|choose 的过去分词|We've {chosen} the quieter room.|我们选了更安静的房间。|choose / chose / chosen。
broken|v.|break 的过去分词|Someone has {broken} the window.|有人打破了窗户。|break / broke / broken；broken 也作形容词坏的。
lost|v.|lose 的过去式/过去分词|I've {lost} my ticket.|我的票丢了。|lose / lost / lost；loose 是松的，拼写不同。
sent|v.|send 的过去式/过去分词|I've {sent} you the address.|我已经把地址发给你。|send / sent / sent。
told|v.|tell 的过去式/过去分词|She {told} me about the change.|她告诉了我有关变更的事。|tell / told / told；tell someone something。
`);
extend('adjectives', `
large|adj.|大的（尺寸/数量）|We need a {large} table for eight people.|我们需要一张八人用的大桌。|large / larger / largest；big 也可表示大。
small|adj.|小的|Could I have a {small} coffee?|能给我一杯小杯咖啡吗？|small / smaller / smallest。
long|adj.|长的|It was a {long} journey.|那是一次漫长的旅程。|long / longer / longest；How long? 可问长度或时长。
short|adj.|短的|Let's take a {short} break.|我们短暂休息一下吧。|short / shorter / shortest；a short meeting。
new|adj.|新的|I'm looking for a {new} phone.|我正在找一部新手机。|new / newer / newest；brand-new 全新的。
old|adj.|旧的；年老的|I'm still using my {old} laptop.|我还在用旧电脑。|old / older / oldest；How old...? 问年龄。
fast|adj./adv.|快的；快地|This is a {fast} train.|这是一趟快车。|fast / faster / fastest；fast 可直接作副词，不用 fastly。
slow|adj.|慢的|The service is quite {slow} today.|今天服务相当慢。|slow / slower / slowest；副词 slowly。
easy|adj.|容易的|The instructions are {easy} to follow.|这些说明容易理解和照做。|easy / easier / easiest；副词 easily。
difficult|adj.|困难的|This question is {difficult} to answer.|这个问题很难回答。|more / most difficult；difficulty 是名词。
important|adj.|重要的|It's {important} to confirm the date.|确认日期很重要。|important to someone；important for a task。
urgent|adj.|紧急的|This request is {urgent}.|这个请求很紧急。|urgent 说的是时间紧迫，不等于 important。
possible|adj.|可能的；可行的|Is it {possible} to change the booking?|能更改预订吗？|possible to do；possibly 是副词。
suitable|adj.|合适的|Is this room {suitable} for a meeting?|这个房间适合开会吗？|suitable for；suit 是动词；fit 也可指尺寸合身。
full|adj.|满的|The restaurant is {full} tonight.|餐厅今晚满了。|be full of；fully booked 订满的。
empty|adj.|空的|This bottle is {empty}.|这个瓶子是空的。|empty / emptier / emptiest；empty 也可作动词倒空。
clean|adj.|干净的|Could I have a {clean} towel?|能给我一条干净毛巾吗？|clean / cleaner / cleanest；clean 也作动词。
dirty|adj.|脏的|These plates are {dirty}.|这些盘子是脏的。|dirty / dirtier / dirtiest；dirt 是名词。
`);

root.Curriculum = {units, entries: units.flatMap(u => u.entries), version: 1};
})(typeof window !== 'undefined' ? window : globalThis);
