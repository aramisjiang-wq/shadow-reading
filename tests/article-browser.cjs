'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({headless:true}),context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];
 page.setDefaultTimeout(10000);page.setDefaultNavigationTimeout(15000);await context.route('https://fonts.googleapis.com/**',route=>route.abort());await context.route('https://fonts.gstatic.com/**',route=>route.abort());
 page.on('pageerror',e=>errors.push(e.message));let checks=0;function check(value,message){assert.ok(value,message);checks++;}
 async function go(path){await page.goto(base+path);if(path.includes('reading.html')){await page.waitForFunction(()=>document.getElementById('articleTitle').textContent!=='Loading…');await page.waitForFunction(()=>getComputedStyle(document.getElementById('articleContent')).opacity==='1');}else if(path.includes('words.html'))await page.locator('#articleSelect').waitFor();else await page.waitForFunction(()=>document.querySelector('main')?.dataset.route===(location.hash||'#home'));}
 await go('/#home');check((await page.locator('.hero a.btn.primary').getAttribute('href')).startsWith('reading.html?article='),'home primary action reads an article');
 check((await page.locator('nav a').nth(1).innerText()).includes('文章库'),'article library is the main content navigation');
 check(await page.locator('main a[href^="#dialogue/"]').count()===0,'short dialogues do not displace articles on homepage');
 await page.evaluate(()=>{localStorage.setItem('sr_onboarded','1');localStorage.setItem('sr_completed','[0,19]');localStorage.setItem('sr_practiced','{"0":[2,4]}');});
 await go('/#articles');check(await page.locator('.article-card').count()===40,'edited library has forty manuscripts');
 await page.locator('#articleFormat').selectOption('访谈');check(await page.locator('.article-card').count()===10,'ten long interviews');
 await page.locator('#articleLevel').selectOption('advanced');check(await page.locator('.article-card').count()===2,'format and difficulty combine');
 await page.locator('#articleFormat').selectOption('');await page.locator('#articleLevel').selectOption('');await page.locator('#articleSearch').fill('Thirteen, Not Thirty');check(await page.locator('.article-card').count()===1,'article title search');
 await page.locator('#articleSearch').fill('');await page.locator('#articleCollection').selectOption('archive');check(await page.locator('.article-card').count()===20,'original archive has twenty manuscripts');
 await page.getByRole('button',{name:'工作协作',exact:true}).click();check(await page.locator('.article-card').count()>0,'archive topic filters map to original themes');
 await go('/reading.html?article=21');check((await page.locator('#progressPill').innerText())==='精编 1 / 40','reader has independent edited collection');
 check(await page.locator('#articleContent .paragraph-wrapper').count()===6,'all six editorial paragraphs render');
 check(await page.locator('#articleContent .paragraph-wrapper.practiced').count()===0,'rewritten article does not inherit original paragraph marks');
 check(!(await page.locator('.article-item.active').getAttribute('class')).includes('completed'),'rewritten article does not inherit original completion');
 check(await page.locator('#prevBtn').isDisabled(),'first edited article does not navigate back into archive');
 check(await page.locator('.as-phrases article').count()===4,'four in-article expressions');
 await page.getByRole('tab',{name:'理解与复述',exact:true}).click();
 await page.locator('input[name=article-check-0][value="2"]').check();await page.locator('input[name=article-check-1][value="0"]').check();await page.locator('#articleCheckForm button').click();
 check((await page.locator('#articleCheckForm button').innerText()).includes('1/2'),'understanding check scores actual choices');
 await page.locator('input[name=article-check-0][value="1"]').check();await page.locator('#articleCheckForm button').click();check((await page.locator('#articleCheckForm button').innerText()).includes('2/2'),'understanding correction works');
 check(await page.evaluate(()=>localStorage.sr_completed)==='[0,19]','quiz does not mark entire article mastered or complete');
 await page.locator('#articleRetellText').fill('First the keys were missing. Then Rosa helped. Finally they planned lunch.');
 await page.locator('[data-kind=retell][data-rating=independent]').click();await page.waitForFunction(()=>document.getElementById('articleRetellStatus').textContent.includes('已保存'));
 let events=await page.evaluate(()=>Object.values(JSON.parse(localStorage.sr_learning_v1).events));check(events.length===1&&events[0].target==='article:21:retell','article retelling records under its own ID');
 await page.locator('#articleTransferText').fill('I left my phone at home.');await page.locator('[data-study-action=show-reference]').click();await page.locator('[data-kind=transfer][data-rating=independent]').click();await page.waitForFunction(()=>document.getElementById('articleTransferStatus').textContent.includes('已保存'));
 events=await page.evaluate(()=>Object.values(JSON.parse(localStorage.sr_learning_v1).events));check(events.at(-1).rating==='with-help','seeing reference prevents independent transfer self-rating');
 await page.locator('#nextBtn').click();check((await page.locator('#articleTitle').innerText())==='The Meeting We Stopped Having','next reads the next edited manuscript');check(await page.locator('#articleRetellText').inputValue()==='','next article has independent retelling text');
 await page.locator('#prevBtn').click();check((await page.locator('#articleRetellText').inputValue()).includes('Rosa helped'),'retelling restores from record');
 await page.getByRole('tab',{name:'正文',exact:true}).click();
 // Cancellation generations protect the new article from late speech callbacks.
 await page.evaluate(()=>{window.testUtterances=[];speechSynthesis.speak=u=>testUtterances.push(u);speechSynthesis.cancel=()=>{};startReading();});
 await page.locator('#nextBtn').click();await page.evaluate(()=>testUtterances[0].onend());
 check(await page.evaluate(()=>testUtterances.length)===1,'late old playback callback does not continue the new article');
 await go('/reading.html?article=1&paragraph=3');check((await page.locator('#articleTitle').innerText())==='A Typical Day in My Life','old bookmark selects same original manuscript');check(await page.locator('#articleContent .paragraph-wrapper.practiced').count()===2,'old paragraph marks remain intact');check((await page.locator('#articleGuide').innerText()).includes('历史原稿'),'archive status visible');check(await page.locator('#articleLesson').isHidden(),'editorial questions not attached to old wording');
 await go('/reading.html?article=20');check(await page.locator('#nextBtn').isDisabled(),'archive navigation stays in archive');
 await go('/reading.html?article=60');check(await page.locator('#nextBtn').isDisabled(),'last edited article navigation boundary');check((await page.locator('#articleGuide').innerText()).includes('按可观察现象排查问题'),'guide renders final article learning goal');
 await go('/#progress');check((await page.locator('.history-item').first().innerText()).includes('计划之外的早晨'),'article production appears by article title');
 await go('/words.html');await page.locator('#articleSelect').selectOption('59');check((await page.locator('#articleSelect').inputValue())==='59','wordbook includes final new article index');
 await go('/#home');await page.screenshot({path:'tests/article-home.png'});
 for(const width of [390,320]){
 await page.setViewportSize({width,height:844});await go('/#articles');check(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`library fits ${width}`);
 await go('/reading.html?article=57');check(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`reader fits ${width}`);
 await page.getByRole('tab',{name:'理解与复述',exact:true}).click();await page.locator('#articleQuestions').scrollIntoViewIfNeeded();check(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`quiz fits ${width}`);
 }
 await page.setViewportSize({width:390,height:844});await go('/#home');await page.screenshot({path:'tests/article-home-mobile.png',fullPage:true});await go('/reading.html?article=21');await page.screenshot({path:'tests/article-reader-mobile.png',fullPage:true});
 const clean=await browser.newPage({viewport:{width:1440,height:1000}});await clean.goto(base+'/#home');await clean.locator('.hero a.btn.primary').waitFor();await clean.screenshot({path:'tests/article-home.png'});await clean.close();
 check(errors.length===0,`page errors: ${errors.join('; ')}`);console.log(JSON.stringify({checks,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
