/**
 * Performance audit script — Lighthouse + bundle analysis
 * Uso: npx tsx scripts/audit-performance.ts
 */

import { chromium } from "playwright";
import { resolve } from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = resolve("artifacts/performance");
const VIEWPORT = { width: 390, height: 844 }; // Mobile first

interface MetricResult {
  name: string;
  value: number;
  unit: string;
  target: number;
  pass: boolean;
}

const metrics: MetricResult[] = [];

function check(name: string, value: number, unit: string, target: number, lowerIsBetter = true) {
  const pass = lowerIsBetter ? value <= target : value >= target;
  metrics.push({ name, value, unit, target, pass });
  const icon = pass ? "✅" : "❌";
  console.log(`  ${icon} ${name}: ${value}${unit} (target: ${lowerIsBetter ? "≤" : "≥"}${target}${unit})`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("╔══════════════════════════════════════════╗");
  console.log("║   Performance Audit — Mobile (390px)     ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // Collect Core Web Vitals via Performance API
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60000 });

  // ── 1. Core Web Vitals ────────────────────────────
  console.log("━━━ 1. Core Web Vitals ━━━");

  const vitals = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const paints = performance.getEntriesByType("paint");
    const fcp = paints.find((p) => p.name === "first-contentful-paint");
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];

    // Largest resource (approximate LCP)
    let largestSize = 0;
    let largestUrl = "";
    resources.forEach((r) => {
      if (r.transferSize > largestSize) {
        largestSize = r.transferSize;
        largestUrl = r.name;
      }
    });

    return {
      fcp: fcp ? fcp.startTime : null,
      domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
      loadComplete: nav.loadEventEnd - nav.startTime,
      ttfb: nav.responseStart - nav.requestStart,
      dnsTime: nav.domainLookupEnd - nav.domainLookupStart,
      resourceCount: resources.length,
      totalTransferSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
      largestResource: { url: largestUrl, size: largestSize },
    };
  });

  check("FCP (First Contentful Paint)", Math.round(vitals.fcp ?? 0), "ms", 1800);
  check("TTFB (Time to First Byte)", Math.round(vitals.ttfb), "ms", 800);
  check("DOM Content Loaded", Math.round(vitals.domContentLoaded), "ms", 2500);
  check("Load Complete", Math.round(vitals.loadComplete), "ms", 4000);

  // ── 2. JavaScript Bundle ─────────────────────────
  console.log("\n━━━ 2. JavaScript Bundle ━━━");

  const jsResources = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return resources
      .filter((r) => r.name.includes(".js") || r.name.includes("_next"))
      .map((r) => ({
        url: r.name.replace(/^.*\/\/[^/]+/, "").slice(0, 100),
        size: Math.round((r.transferSize || r.encodedBodySize || 0) / 1024),
        duration: Math.round(r.duration),
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 12);
  });

  const totalJS = jsResources.reduce((sum, r) => sum + r.size, 0);
  check("JS Bundle Total", totalJS, "KB", 500);

  console.log("  Top JS files:");
  jsResources.slice(0, 6).forEach((r) => {
    console.log(`    ${r.size}KB — ${r.url}`);
  });

  // ── 3. Images & Media ────────────────────────────
  console.log("\n━━━ 3. Images & Media ━━━");

  const imgResources = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return resources
      .filter((r) => {
        const url = r.name.toLowerCase();
        return url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg") || url.includes(".webp") || url.includes(".mp4");
      })
      .map((r) => ({
        url: r.name.replace(/^.*\/\/[^/]+/, "").slice(0, 100),
        size: Math.round((r.transferSize || r.encodedBodySize || 0) / 1024),
        type: r.name.split(".").pop()?.toLowerCase(),
        duration: Math.round(r.duration),
      }))
      .sort((a, b) => b.size - a.size);
  });

  const totalImg = imgResources.reduce((sum, r) => sum + r.size, 0);
  check("Total Imagenes + Video", totalImg, "KB", 3000);

  console.log("  Media assets:");
  imgResources.forEach((r) => {
    const flag = r.size > 200 ? "🔴" : r.size > 100 ? "🟡" : "🟢";
    console.log(`    ${flag} ${r.size}KB [${r.type}] — ${r.url}`);
  });

  // ── 4. CSS ───────────────────────────────────────
  console.log("\n━━━ 4. CSS ━━━");

  const cssResources = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return resources
      .filter((r) => r.name.includes(".css"))
      .map((r) => ({
        url: r.name.replace(/^.*\/\/[^/]+/, "").slice(0, 100),
        size: Math.round((r.transferSize || r.encodedBodySize || 0) / 1024),
        duration: Math.round(r.duration),
      }));
  });

  const totalCSS = cssResources.reduce((sum, r) => sum + r.size, 0);
  check("CSS Total", totalCSS, "KB", 100);

  // ── 5. Fonts ─────────────────────────────────────
  console.log("\n━━━ 5. Fonts ━━━");

  const fontResources = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return resources.filter((r) => r.initiatorType === "css" && (r.name.includes("font") || r.name.includes("woff")));
  });

  if (fontResources.length === 0) {
    console.log("  ⚠️ No se detectaron fuentes cargadas (posible FOIT/FOUT)");
    console.log("  Inter declarada en CSS pero nunca cargada — se usa fuente del sistema");
  }

  // ── 6. Third Party ───────────────────────────────
  console.log("\n━━━ 6. Third-Party ━━━");

  const thirdParty = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const domains = new Set<string>();
    resources.forEach((r) => {
      try {
        const url = new URL(r.name);
        if (!url.hostname.includes("localhost")) domains.add(url.hostname);
      } catch {}
    });
    return Array.from(domains);
  });

  thirdParty.forEach((d) => console.log(`  🌐 ${d}`));
  check("Third-Party Domains", thirdParty.length, "", 3);

  // ── 7. DOM Size ──────────────────────────────────
  console.log("\n━━━ 7. DOM & Render ━━━");

  const domStats = await page.evaluate(() => {
    const all = document.querySelectorAll("*");
    return {
      totalElements: all.length,
      bodyHTMLSize: document.body.innerHTML.length,
      viewportHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight,
    };
  });

  check("DOM Elements", domStats.totalElements, "", 1500);
  check("HTML Size", Math.round(domStats.bodyHTMLSize / 1024), "KB", 200);
  console.log(`  Viewport: ${domStats.viewportHeight}px | Document: ${domStats.documentHeight}px`);

  // ── 8. CLS Check ─────────────────────────────────
  console.log("\n━━━ 8. CLS (Layout Shift) ━━━");

  // Scroll through page to trigger any layout shifts
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await delay(200);
    }
    window.scrollTo(0, 0);
  });

  const clsScore = await page.evaluate(() => {
    let cls = 0;
    const entries = performance.getEntriesByType("layout-shift") as any[];
    entries.forEach((e) => {
      if (!e.hadRecentInput) cls += e.value;
    });
    return cls;
  });

  check("CLS (Cumulative Layout Shift)", parseFloat(clsScore.toFixed(3)), "", 0.1);

  // ── Summary ──────────────────────────────────────
  console.log("\n━━━ RESUMEN ━━━");

  const passed = metrics.filter((m) => m.pass).length;
  const total = metrics.length;
  const score = Math.round((passed / total) * 100);

  console.log(`\n  ${passed}/${total} métricas OK (${score}%)`);

  const fails = metrics.filter((m) => !m.pass);
  if (fails.length > 0) {
    console.log("\n  ❌ Fallos:");
    fails.forEach((f) => {
      console.log(`    - ${f.name}: ${f.value}${f.unit} (target: ${f.target}${f.unit})`);
    });
  }

  // Save report
  const report = `# Performance Audit Report
Date: ${new Date().toISOString()}
URL: ${BASE_URL}
Viewport: ${VIEWPORT.width}x${VIEWPORT.height}

## Metrics
${metrics.map((m) => `| ${m.pass ? "✅" : "❌"} | ${m.name} | ${m.value}${m.unit} | ${m.target}${m.unit} |`).join("\n")}

## Top JS Bundles
${jsResources.slice(0, 6).map((r) => `- ${r.size}KB — ${r.url}`).join("\n")}

## Media Assets
${imgResources.map((r) => `- ${r.size > 200 ? "🔴" : r.size > 100 ? "🟡" : "🟢"} ${r.size}KB [${r.type}] — ${r.url}`).join("\n")}

## Third-Party
${thirdParty.map((d) => `- ${d}`).join("\n")}
`;
  fs.writeFileSync(resolve(OUTPUT_DIR, "report.md"), report);

  await browser.close();
  console.log(`\n📄 Reporte guardado en ${OUTPUT_DIR}/report.md`);
}

main().catch(console.error);
