// Run against a running production server. Point PLAYWRIGHT_MODULE at an installed playwright module.
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {})});
try {
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:3000');
  await page.getByLabel('What should we call you?').fill('Ari');
  await page.getByRole('button',{name:'Begin your story'}).click();
  await page.getByRole('button',{name:'“I prefer to earn trust.”'}).click();
  await page.reload();
  await page.getByRole('heading',{name:'Between duty and desire'}).waitFor();
  await page.getByRole('button',{name:'Help Kael investigate the signal.'}).click();
  await page.getByText('A bond begins.').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'horizontal overflow');
  page.once('dialog',dialog=>dialog.accept());
  await page.getByRole('button',{name:'Start a new journey'}).click();
  await page.getByLabel('What should we call you?').waitFor();
  assert.deepEqual(errors,[]);
  console.log(`PASS ${width}px: onboarding, choices, save/resume, ending, reset, no overflow, no browser errors`);
  await page.close();
 }
} finally { await browser.close(); }
