const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  const baseUrl = "https://sanand0.github.io/tdsdata/js_table/?seed=";

  for (let seed = 36; seed <= 45; seed++) {
    const url = `${baseUrl}${seed}`;
    console.log(`Visiting Seed ${seed} — ${url}`);

    await page.goto(url, { waitUntil: "networkidle" });

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseInt(cell.textContent.trim(), 10))
    );

    const pageTotal = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} Total: ${pageTotal}`);

    grandTotal += pageTotal;
  }

  console.log("=================================");
  console.log("FINAL GRAND TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
