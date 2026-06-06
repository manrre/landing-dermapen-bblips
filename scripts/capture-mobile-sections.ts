/**
 * Script Playwright para capturar cada sección de la landing en mobile (390px)
 * y guardar screenshots en artifacts/mobile-screenshots/
 *
 * Uso: npx tsx scripts/capture-mobile-sections.ts
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.resolve("artifacts/mobile-screenshots");
const VIEWPORT = { width: 390, height: 844 }; // iPhone 14

const SECTIONS = [
  { selector: ".top-scarcity", name: "01-top-scarcity" },
  { selector: ".hero-section", name: "02-hero" },
  { selector: ".trust-bar", name: "03-trust-bar" },
  { selector: ".problem-section", name: "04-problem" },
  { selector: ".solution-section", name: "05-solution" },
  { selector: ".benefit-slider", name: "06-benefit-slider" },
  { selector: ".benefits-section", name: "07-benefits" },
  { selector: ".media-proof-section", name: "08-media-proof" },
  { selector: ".roi-section", name: "09-roi" },
  { selector: ".authority-section", name: "10-authority" },
  { selector: ".curriculum-section", name: "11-curriculum" },
  { selector: ".offer-section", name: "12-offer" },
  { selector: ".faq-section", name: "13-faq" },
  { selector: ".whatsapp-section", name: "14-whatsapp" },
  { selector: ".final-cta", name: "15-final-cta" },
];

async function main() {
  // Ensure output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60000 });
  console.log("Page loaded.\n");

  // Full page screenshot first
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "00-full-page.png"),
    fullPage: true,
  });
  console.log("✓ 00-full-page.png");

  // Capture each section
  for (const { selector, name } of SECTIONS) {
    const element = page.locator(selector).first();
    const count = await element.count();

    if (count === 0) {
      console.log(`✗ ${name}.png — selector "${selector}" not found`);
      continue;
    }

    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400); // Let animations settle

    await element.screenshot({
      path: path.join(OUTPUT_DIR, `${name}.png`),
    });

    console.log(`✓ ${name}.png`);
  }

  await browser.close();
  console.log(`\nDone! ${SECTIONS.length + 1} screenshots saved to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
