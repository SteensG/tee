import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await page.evaluate(() => { document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible')); });
await new Promise(r => setTimeout(r, 800));
const scrolls = [0, 900, 1800, 2700, 3600, 4500, 5400, 6200];
for (let i = 0; i < scrolls.length; i++) {
  await page.evaluate(y => window.scrollTo(0, y), scrolls[i]);
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: `/tmp/v3-s${i+1}.png` });
}
await browser.close();
console.log('done');
