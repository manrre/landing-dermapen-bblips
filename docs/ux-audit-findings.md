# Síntesis De Auditoría Agentica — Dermapen + BBLips Landing

> Resultado de 6 subagentes independientes auditando en paralelo.
> Fecha: 2026-06-05 | Fuente: [ux-neuroscience-plan.md](ux-neuroscience-plan.md)

## Resumen Cuantitativo

| Dimensión | Subagente | CRÍTICOS | ALTOS | MEDIOS | BAJOS |
|---|---|---|---|---|---|
| Copy | Neuro Copy Auditor | 3 | 3 | 1 | 0 |
| Visual & Cognitivo | Visual & Cognitive Auditor | 4 | 5 | 4 | 2 |
| Confianza | Trust & Social Proof Auditor | 1 | 2 | 2 | 2 |
| Mobile | Mobile & Responsive Auditor | 0 | 2 | 3 | 3 |
| Performance | Performance & Technical Auditor | 1 | 4 | 6 | 6 |
| Attribution | Hotmart & Attribution Auditor | 0 | 0 | 1 | 3 |
| **TOTAL** | | **9** | **16** | **17** | **16** |

---

## Hallazgos Críticos (ICE ≥ 36)

| # | Dimensión | Hallazgo | I | C | E | ICE | Acción |
|---|---|---|---|---|---|---|---|
| C1 | Copy | AIDA ausente — la página informa pero no persuade. Solo Offer sigue el patrón. | 5 | 5 | 2 | **50** | Re-cablear AIDA sección por sección |
| C2 | Copy | PAS roto — problema identificado pero NUNCA agitado. Sin activación emocional. | 5 | 5 | 4 | **100** | Insertar agitación del dolor en ProblemSection |
| C3 | Copy | Emoción/Logica invertido — 90% defensivo, 10% emocional. Disclaimers matan deseo. | 5 | 5 | 2 | **50** | Mover disclaimers al final, rewrite emocional |
| C4 | Trust | Sin testimonios de alumnas — la spec 6.9 los exigía. Sin prueba social real. | 5 | 5 | 2 | **50** | Implementar sección de testimonios |
| C5 | Visual | Hero con 3 acciones simultáneas — viola Hick's Law | 5 | 4 | 3 | **60** | Una sola acción en Hero; WhatsApp relegado |
| C6 | Visual | CTA repetido 5× — pierde Von Restorff, banner blindness | 4 | 5 | 3 | **60** | Un solo CTA primario; variantes secundarias |
| C7 | Visual | 16 secciones + 2 barras persistentes — satura memoria de trabajo | 4 | 4 | 1 | **16** | Fusionar secciones; eliminar 1 barra |
| C8 | Visual | Floating bar con 2 botones — decisión binaria constante | 4 | 4 | 4 | **64** | Solo CTA en floating bar; WhatsApp ícono mínimo |
| C9 | Perf | `<img>` nativo sin optimizar en slider — sin lazy loading ni WebP | 4 | 5 | 5 | **100** | Migrar a `next/image` |

---

## Hallazgos Altos (ICE 27-35)

| # | Dimensión | Hallazgo | I | C | E | ICE | Acción |
|---|---|---|---|---|---|---|---|
| A1 | Copy | Solo 4 datos concretos en toda la página — resto abstracto/genérico | 4 | 5 | 3 | **60** | Cuantificar: Nº lecciones, horas, videos, pasos |
| A2 | Copy | Cero framing de pérdida — todo es "obtén", nada de "no pierdas" | 4 | 4 | 4 | **64** | Cambiar CTAs a "No pierdas el descuento" |
| A3 | Copy | "aprox." repetido 5× + voz pasiva + jerga técnica | 3 | 4 | 4 | **48** | Eliminar "aprox.", activar voz, simplificar |
| A4 | Trust | Garantía 7 días ausente en FinalCta | 4 | 5 | 5 | **100** | Agregar badge de garantía en FinalCta |
| A5 | Trust | Hotmart nunca mencionado por nombre — pierde valor de marca | 3 | 4 | 5 | **60** | Agregar "Paga con Hotmart" en Offer y Hero |
| A6 | Visual | Contraste CTA #ff5a3d ~3.1:1 — límite WCAG AA | 3 | 5 | 4 | **60** | Oscurecer a #d93e26 para ~5.2:1 |
| A7 | Visual | TrustBar 5 items idénticos — nada destaca | 3 | 4 | 4 | **48** | Jerarquizar: 1-2 items destacados |
| A8 | Visual | TopScarcity sticky + FloatingActions persistente — sobrecarga | 3 | 4 | 3 | **36** | Quitar sticky de TopScarcity |
| A9 | Visual | Headings no cuentan historia lineal — problema 22 palabras | 4 | 4 | 3 | **48** | Reescribir secuencia de H2 como narrativa |
| A10 | Mobile | FAQ `<summary>` tap target < 20px (mínimo 44px) | 3 | 5 | 5 | **75** | `min-height: 44px; padding-block: 0.6rem` |
| A11 | Mobile | Videos slider sin `controls` — autoplay-loop consume datos | 3 | 5 | 4 | **60** | Agregar `controls` o reemplazar con imagen en mobile |
| A12 | Perf | Inter declarada en CSS pero nunca cargada | 2 | 5 | 5 | **50** | `next/font/google` o eliminar del CSS |
| A13 | Perf | Sin OG image — links en redes se ven genéricos | 4 | 5 | 5 | **100** | Agregar `og:image` 1200×630 |
| A14 | Perf | Sin JSON-LD — sin rich snippets en Google | 3 | 5 | 5 | **75** | Agregar schema Course + Offer |
| A15 | Perf | 3 dependencias muertas: framer-motion, @gsap/react, clsx | 1 | 5 | 5 | **25** | Eliminar de package.json |
| A16 | Attribution | FloatingActions y FinalCta comparten `meta-co-final` | 2 | 4 | 4 | **32** | Crear `meta-co-floating` |

---

## Hallazgos Medios (ICE 16-26)

| # | Dimensión | Hallazgo | I | C | E | ICE |
|---|---|---|---|---|---|---|
| M1 | Copy | H1 genérico + H2s redundantes o que introducen duda | 3 | 4 | 3 | 36 |
| M2 | Trust | Cifras autoridad (15K, 35 países) sin respaldo visual ni foto instructora | 3 | 3 | 2 | 18 |
| M3 | Trust | WhatsAppSection entre FAQ y FinalCta desvía compradores listos | 3 | 3 | 4 | 36 |
| M4 | Visual | 7/15 secciones usan mismo patrón — monotonía visual | 2 | 4 | 2 | 16 |
| M5 | Visual | 4 patrones de layout alternados sin criterio | 2 | 3 | 2 | 12 |
| M6 | Visual | CTA en offer-box ~200px del precio — Fitts's Law | 2 | 4 | 4 | 32 |
| M7 | Mobile | `padding-bottom: 88px` hardcodeado vs ~60px real en mobile | 2 | 4 | 5 | 40 |
| M8 | Mobile | Body sin `font-size` explícito; textos a 14.7px | 2 | 4 | 5 | 40 |
| M9 | Mobile | Sin WebM fallback — solo mp4 | 2 | 3 | 3 | 18 |
| M10 | Perf | Versiones `"latest"` en package.json | 1 | 5 | 5 | 25 |
| M11 | Perf | GSAP 36KB+ sin dynamic import | 2 | 4 | 3 | 24 |
| M12 | Perf | Tailwind importado sin clases usadas | 1 | 3 | 3 | 9 |
| M13 | Perf | Sin CSP ni nonce para scripts inline | 2 | 3 | 2 | 12 |
| M14 | Perf | Sin estrategia explícita de cache/revalidate | 2 | 3 | 4 | 24 |

---

## Plan De Acción Por Fases

### 🔴 Fase 2a: Correcciones Inmediatas (ICE ≥ 60, facilidad ≥ 4)

Hacer AHORA. Máximo impacto, mínimo esfuerzo.

| Orden | Hallazgo | Acción | ICE |
|---|---|---|---|
| 1 | C2 — PAS sin agitación | Insertar 3 frases de agitación en ProblemSection | 100 |
| 2 | C9 — `<img>` nativo | Migrar slider a `next/image` | 100 |
| 3 | A4 — Garantía en FinalCta | Agregar badge "Garantía 7 días" junto al CTA | 100 |
| 4 | A13 — Sin OG image | Crear y agregar `og:image` 1200×630 | 100 |
| 5 | A10 — FAQ tap targets | `min-height: 44px` en summary | 75 |
| 6 | A14 — Sin JSON-LD | Agregar schema Course+Offer en page.tsx | 75 |
| 7 | A2 — Cero framing pérdida | Cambiar copy de CTAs | 64 |
| 8 | C8 — Floating bar 2 botones | Quitar WhatsApp del floating bar | 64 |
| 9 | C5 — Hero 3 acciones | Reducir a 1 acción principal | 60 |
| 10 | C6 — CTA repetido 5× | Jerarquizar CTAs (primario/secundario/texto) | 60 |
| 11 | A1 — 4 datos concretos | Cuantificar claims en toda la página | 60 |
| 12 | A5 — Hotmart invisible | Agregar "Paga con Hotmart" | 60 |
| 13 | A6 — Contraste CTA | Oscurecer a #d93e26 | 60 |
| 14 | A11 — Videos sin controls | Agregar `controls` a videos del slider | 60 |

### 🟡 Fase 2b: Correcciones Estructurales (ICE ≥ 36, facilidad ≤ 3)

Requieren rework de layout o copy profundo.

| Orden | Hallazgo | Acción | ICE |
|---|---|---|---|
| 15 | C1 — AIDA ausente | Re-cablear cada sección con AIDA | 50 |
| 16 | C3 — Emoción/Logica invertido | Reescribir copy emocional primero | 50 |
| 17 | C4 — Sin testimonios | Implementar sección testimonios (spec 6.9) | 50 |
| 18 | A3 — "aprox." + jerga | Eliminar muletillas, activar voz | 48 |
| 19 | A7 — TrustBar monótono | Jerarquizar con 1-2 items destacados | 48 |
| 20 | A9 — Headings no narrativos | Reescribir secuencia de H2 | 48 |
| 21 | M7 — padding-bottom | Sincronizar con altura real mobile | 40 |
| 22 | M8 — font-size base | `font-size: 16px` en body + ajustes | 40 |
| 23 | A8 — Sobrecarga sensorial | Quitar sticky de TopScarcity | 36 |
| 24 | M1 — H1 genérico | Reescribir H1 con especificidad + emoción | 36 |
| 25 | M3 — WhatsAppSection | Eliminar sección, mover a FAQ | 36 |
| 26 | M6 — CTA lejos del precio | Acercar CTA al precio en OfferSection | 32 |
| 27 | A16 — src duplicado | Crear `meta-co-floating` | 32 |

### 🟢 Fase 3: Correcciones de Pulido (ICE < 30)

Bajo impacto o requieren validación adicional.

| Orden | Hallazgo | Acción |
|---|---|---|
| 28 | M2 — Autoridad sin respaldo | Foto instructora + visualizar cifras |
| 29 | A15 — Dependencias muertas | Eliminar framer-motion, @gsap/react, clsx |
| 30 | M10 — Versiones "latest" | Fijar versiones semver |
| 31 | M11 — GSAP dynamic import | Lazy load GSAP |
| 32 | M4 — Patrón repetido 7× | Variar layouts de secciones |
| 33 | M9 — Sin WebM | Generar versiones WebM de videos |
| 34 | M14 — Sin cache strategy | Agregar `revalidate` |
| 35 | M12 — Tailwind sin usar | Evaluar eliminación |
| 36 | M13 — Sin CSP | Agregar Content-Security-Policy |

---

## ICE Score Reference

| Factor | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **I**mpacto | Casi nulo | Marginal | Notable | Significativo | Transformacional |
| **C**onfianza | Corazonada | Alguna evidencia | Buena evidencia | Fuerte evidencia | Casi certeza |
| **E**ase | Re-escribir todo | Cambio grande | Cambio medio | Cambio pequeño | One-liner |

---

## Métricas De Éxito Post-Corrección

| Métrica | Target |
|---|---|
| CTA principal visible above the fold en mobile (390px) | ✅ |
| H1 comunica producto + precio + beneficio en < 5s | ✅ |
| Contraste CTA ≥ 4.5:1 | ✅ |
| Tap targets ≥ 44px en todos los elementos interactivos | ✅ |
| OG image + JSON-LD presentes | ✅ |
| Testimonios de alumnas integrados near CTA | ✅ |
| Hotmart mencionado visiblemente como pasarela de pago | ✅ |
| Garantía visible en FinalCta | ✅ |
| Lighthouse Performance ≥ 90 | ✅ |
| Lighthouse Accessibility ≥ 90 | ✅ |
| Playwright: 0 overflow horizontal + CTA visible | ✅ |
| Hotmart: ref + off + checkoutMode en todos los CTAs | ✅ |
