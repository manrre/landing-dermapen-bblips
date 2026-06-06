/**
 * Análisis visual programático mobile (390px) — detecta inconsistencias de espaciado,
 * overlap, contraste, alineación, y tamaños de texto sin depender de capturas visuales.
 *
 * Uso: npx tsx scripts/audit-mobile-visual.ts
 */

import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const OUTPUT = path.resolve("artifacts/mobile-audit-report.md");
const VIEWPORT = { width: 390, height: 844 };

interface Issue {
  section: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  type: string;
  detail: string;
  recommendation: string;
}

const issues: Issue[] = [];

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60000 });

  await page.evaluate(() => document.fonts.ready);

  // ─── 1. SPACING BETWEEN SECTIONS ─────────────────────
  console.log("1. Checking section spacing...");
  const sectionSpacings = await page.evaluate(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "section, .section-pad, .top-scarcity, .final-cta",
    );
    const results: { name: string; paddingTop: number; paddingBottom: number; marginBottom: number }[] = [];
    sections.forEach((s) => {
      const style = getComputedStyle(s);
      const cls = s.className.split(" ").slice(0, 3).join(".");
      results.push({
        name: cls || s.tagName,
        paddingTop: parseFloat(style.paddingTop),
        paddingBottom: parseFloat(style.paddingBottom),
        marginBottom: parseFloat(style.marginBottom),
      });
    });
    return results;
  });

  const paddings = sectionSpacings.map((s) => s.paddingTop);
  const uniquePaddings = [...new Set(paddings.map((p) => Math.round(p)))];
  if (uniquePaddings.length > 3) {
    issues.push({
      section: "Todas",
      severity: "MEDIUM",
      type: "Espaciado inconsistente",
      detail: `Las secciones usan ${uniquePaddings.length} padding-top diferentes: ${uniquePaddings.join(", ")}px`,
      recommendation: "Unificar padding-block de secciones a 2.8rem (44.8px) como está en section-pad mobile.",
    });
  }

  // ─── 2. TEXT SIZE CONSISTENCY ─────────────────────────
  console.log("2. Checking text sizes...");
  const textSizes = await page.evaluate(() => {
    const texts = document.querySelectorAll<HTMLElement>("h1, h2, h3, p, li, span, a, strong, small, figcaption");
    const results: { tag: string; fontSize: number; text: string }[] = [];
    texts.forEach((t) => {
      if (t.textContent && t.textContent.trim().length > 3) {
        results.push({
          tag: t.tagName,
          fontSize: parseFloat(getComputedStyle(t).fontSize),
          text: t.textContent.trim().substring(0, 60),
        });
      }
    });
    return results;
  });

  const smallTexts = textSizes.filter((t) => t.fontSize < 14);
  if (smallTexts.length > 5) {
    issues.push({
      section: "Varias",
      severity: "HIGH",
      type: "Texto muy pequeño",
      detail: `${smallTexts.length} elementos con fontSize < 14px: ${smallTexts.map((t) => `${t.tag} ${t.fontSize}px "${t.text}"`).slice(0, 10).join("; ")}`,
      recommendation: "Subir textos pequeños a mínimo 0.875rem (14px). WCAG recomienda >= 16px para body.",
    });
  }

  const h2Sizes = textSizes.filter((t) => t.tag === "H2").map((t) => t.fontSize);
  const h2Min = Math.min(...h2Sizes);
  const h2Max = Math.max(...h2Sizes);
  if (h2Max - h2Min > 4) {
    issues.push({
      section: "Varias",
      severity: "MEDIUM",
      type: "H2 tamaños inconsistentes",
      detail: `H2 varían de ${h2Min.toFixed(1)}px a ${h2Max.toFixed(1)}px (diferencia de ${(h2Max - h2Min).toFixed(1)}px)`,
      recommendation: "Unificar H2 en mobile a clamp(1.7rem, 9vw, 2.6rem) consistente.",
    });
  }

  // ─── 3. LINE HEIGHT / LEADING ─────────────────────────
  console.log("3. Checking line heights...");
  const lineHeights = await page.evaluate(() => {
    const headings = document.querySelectorAll<HTMLElement>("h1, h2");
    const results: { tag: string; fontSize: number; lineHeight: number; ratio: number }[] = [];
    headings.forEach((h) => {
      const s = getComputedStyle(h);
      const fs = parseFloat(s.fontSize);
      const lh = parseFloat(s.lineHeight);
      results.push({ tag: h.tagName, fontSize: fs, lineHeight: lh, ratio: lh / fs });
    });
    return results;
  });

  const tightHeadings = lineHeights.filter((h) => h.ratio < 1.05);
  if (tightHeadings.length > 0) {
    issues.push({
      section: "Varias",
      severity: "MEDIUM",
      type: "Headings muy apretados",
      detail: `${tightHeadings.length} headings con line-height ratio < 1.05 — puede causar solapamiento visual`,
      recommendation: "Usar line-height mínimo 1.1 en headings. El actual h1 tiene line-height: 1 (demasiado justo).",
    });
  }

  // ─── 4. CONTRAST RATIO ────────────────────────────────
  console.log("4. Checking contrast...");
  const contrastIssues = await page.evaluate(() => {
    // Simplified contrast check: find elements with potentially low contrast
    const issues: string[] = [];
    const ctaBtn = document.querySelector(".btn-primary");
    if (ctaBtn) {
      const s = getComputedStyle(ctaBtn);
      issues.push(`CTA bg: ${s.backgroundColor}, color: ${s.color}, fontSize: ${s.fontSize}`);
    }
    const mutedTexts = document.querySelectorAll<HTMLElement>(".eyebrow, .disclaimer-copy, figcaption");
    mutedTexts.forEach((el) => {
      const s = getComputedStyle(el);
      issues.push(`${el.className.split(" ")[0]}: color=${s.color}, fontSize=${s.fontSize}, bg=${s.backgroundColor}`);
    });
    return issues;
  });
  console.log("   Contrast details:", contrastIssues.slice(0, 8).join(" | "));

  // ─── 5. OVERFLOW DETECTION ────────────────────────────
  console.log("5. Checking horizontal overflow...");
  const hasOverflow = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    return {
      bodyScrollW: body.scrollWidth,
      bodyClientW: body.clientWidth,
      htmlScrollW: html.scrollWidth,
      htmlClientW: html.clientWidth,
      overflowX: getComputedStyle(html).overflowX,
      overflow: body.scrollWidth > body.clientWidth + 1,
    };
  });

  if (hasOverflow.overflow) {
    // Find which element causes overflow
    const overflowElement = await page.evaluate(() => {
      const all = document.querySelectorAll("*");
      for (const el of all) {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.right > window.innerWidth + 5) {
          return {
            tag: (el as HTMLElement).tagName,
            class: (el as HTMLElement).className.substring(0, 80),
            right: rect.right,
            viewport: window.innerWidth,
          };
        }
      }
      return null;
    });
    if (overflowElement) {
      issues.push({
        section: overflowElement.class || "Desconocida",
        severity: "HIGH",
        type: "Overflow horizontal",
        detail: `${overflowElement.tag}.${overflowElement.class}: right=${overflowElement.right.toFixed(0)}px > viewport=${overflowElement.viewport}px`,
        recommendation: "Agregar max-width: 100% o overflow-x: hidden al contenedor problemático.",
      });
    }
  }

  // ─── 6. ELEMENT PROXIMITY / OVERLAP ───────────────────
  console.log("6. Checking element proximity and overlaps...");
  const proximityIssues = await page.evaluate(() => {
    const issues: string[] = [];
    const sections = document.querySelectorAll<HTMLElement>("section, .section-pad");

    sections.forEach((section) => {
      const children = Array.from(section.querySelectorAll<HTMLElement>(
        "h1, h2, h3, p, .btn, button, img, video, ul, .hero-actions, .price-strip, .price-note, .hero-whatsapp-link, .mini-proof, .agitation-block",
      ));

      for (let i = 0; i < children.length - 1; i++) {
        const a = children[i].getBoundingClientRect();
        const b = children[i + 1].getBoundingClientRect();
        const gap = b.top - a.bottom;

        // Too close (< 4px) — possible overlap or visual clash
        if (gap < 4 && gap > -20 && b.top > a.top) {
          const aId = (children[i] as HTMLElement).className.substring(0, 50) || children[i].tagName;
          const bId = (children[i + 1] as HTMLElement).className.substring(0, 50) || children[i + 1].tagName;
          issues.push(`TIGHT: "${aId}" → "${bId}" gap=${gap.toFixed(1)}px in section "${section.className.substring(0, 40)}"`);
        }

        // Too far (> 80px) between related elements
        if (gap > 80 && children[i].tagName === "H2" && children[i + 1].tagName === "P") {
          const aId = children[i].className.substring(0, 50) || children[i].tagName;
          issues.push(`WIDE: ${aId} → next element gap=${gap.toFixed(0)}px`);
        }
      }
    });
    return issues;
  });

  proximityIssues.forEach((p) => {
    if (p.startsWith("TIGHT:")) {
      issues.push({
        section: "Varias",
        severity: "MEDIUM",
        type: "Elementos muy juntos",
        detail: p,
        recommendation: "Agregar margin-bottom o gap entre elementos para respirar.",
      });
    }
  });

  // ─── 7. BUTTON / CTA SIZE & CONSISTENCY ───────────────
  console.log("7. Checking CTA buttons...");
  const ctaInfo = await page.evaluate(() => {
    const btns = document.querySelectorAll<HTMLElement>(".btn-primary, .btn-secondary, .btn-text, .floating-enroll .btn");
    return Array.from(btns).map((b) => {
      const s = getComputedStyle(b);
      const rect = b.getBoundingClientRect();
      return {
        text: b.textContent?.trim().substring(0, 40),
        width: rect.width,
        height: rect.height,
        fontSize: s.fontSize,
        bg: s.backgroundColor,
        color: s.color,
        borderRadius: s.borderRadius,
      };
    });
  });
  console.log("   CTAs:", JSON.stringify(ctaInfo, null, 2));

  // ─── 8. FLOATING ACTIONS VISIBILITY ───────────────────
  console.log("8. Checking floating bar...");
  const floatingInfo = await page.evaluate(() => {
    const bar = document.querySelector(".floating-actions");
    if (!bar) return null;
    const rect = bar.getBoundingClientRect();
    const s = getComputedStyle(bar);
    return {
      visible: rect.top < window.innerHeight && rect.bottom > 0,
      bottom: s.bottom,
      height: rect.height,
      width: rect.width,
      zIndex: s.zIndex,
    };
  });
  console.log("   Floating:", JSON.stringify(floatingInfo));

  await browser.close();

  // ─── GENERATE REPORT ──────────────────────────────────
  const critical = issues.filter((i) => i.severity === "CRITICAL");
  const high = issues.filter((i) => i.severity === "HIGH");
  const medium = issues.filter((i) => i.severity === "MEDIUM");
  const low = issues.filter((i) => i.severity === "LOW");

  const report = `# Mobile Visual Audit Report (390px)

> Generado programáticamente — $(date)

## Resumen

| Severidad | Cantidad |
|---|---|
| CRÍTICO | ${critical.length} |
| HIGH | ${high.length} |
| MEDIUM | ${medium.length} |
| LOW | ${low.length} |
| **TOTAL** | **${issues.length}** |

${issues.length === 0 ? "✅ No se detectaron issues visuales en mobile." : issues.map((i, n) => `
### ${n + 1}. [${i.severity}] ${i.type} — ${i.section}

**Detalle:** ${i.detail}

**Recomendación:** ${i.recommendation}
`).join("\n")}

## Métricas brutas

- **Secciones:** ${sectionSpacings.length}
- **Padding-top único:** ${uniquePaddings.length} variantes
- **Textos < 14px:** ${smallTexts.length}
- **H2 range:** ${h2Min.toFixed(1)}px – ${h2Max.toFixed(1)}px
- **Overflow horizontal:** ${hasOverflow.overflow ? "SÍ DETECTADO" : "No"}
- **Floating bar visible:** ${floatingInfo?.visible ? "Sí" : "No"}
`;

  fs.writeFileSync(OUTPUT, report);
  console.log(`\nReport saved to ${OUTPUT}`);
  console.log(`Found ${issues.length} visual issues (${critical.length}C / ${high.length}H / ${medium.length}M / ${low.length}L)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
