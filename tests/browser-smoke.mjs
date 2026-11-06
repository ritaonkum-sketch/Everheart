import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
try{for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.BASE_URL||'http://127.0.0.1:3001');await page.getByLabel('Your name',{exact:true}).waitFor();await page.screenshot({path:`../work/welcome-${width}.png`,fullPage:true,animations:'disabled'});assert.equal(await page.getByLabel('Import a save file').isVisible(),false);await page.getByLabel('Your name',{exact:true}).fill('Ari');await page.getByLabel('Imperial archivist').check();await page.getByRole('button',{name:'Enter the gala'}).click();
 await page.getByRole('heading',{name:'An invitation is a kind of threat'}).waitFor();
 await page.screenshot({path:`../work/arrival-${width}.png`,fullPage:true,animations:'disabled'});for(const heading of ['The man who does not applaud','The price of a beautiful room','The interval before midnight','The space between two steps','A toast to the living','A truth without a witness']){await page.locator('.choices>button').first().click();await page.getByRole('heading',{name:heading,exact:true}).waitFor();}
 await page.reload();await page.getByRole('heading',{name:'A truth without a witness',exact:true}).waitFor();
 await page.getByRole('button',{name:'The court',exact:true}).click();await page.getByRole('heading',{name:'Vance Stirling',exact:true}).waitFor();
 await page.getByRole('button',{name:'Your journal',exact:true}).click();assert.equal(await page.locator('.journal li').count(),6);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Export this journey'}).click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'everheart-gala-save.json');const path=await download.path();
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'New journey',exact:true}).click();await page.getByLabel('Your name',{exact:true}).waitFor();await page.getByLabel('Import a save file').setInputFiles(path);await page.getByRole('heading',{name:'A truth without a witness',exact:true}).waitFor();
 await page.getByRole('button',{name:'The court',exact:true}).click();await page.screenshot({path:`../work/court-${width}.png`,fullPage:true,animations:'disabled'});await page.getByRole('button',{name:'The story',exact:true}).click();await page.screenshot({path:`../work/story-${width}.png`,fullPage:true,animations:'disabled'});
 assert.deepEqual(errors,[]);console.log(`PASS ${width}px: role customization, six decisions, ending, reload, court, journal, export/import, reset, no overflow or browser errors`);await page.close();
}}finally{await browser.close();}
