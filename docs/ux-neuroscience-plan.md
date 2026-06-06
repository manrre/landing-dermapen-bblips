# Plan Agentico De UX Y Alta Conversión — Dermapen + BBLips Landing

> Documento de trabajo basado en neurociencia aplicada, metodologías CRO comprobadas y skills agenticas disponibles en GitHub.
> Fecha: 2026-06-05

## 1. Fundamentos De Neurociencia Aplicada

### 1.1 Los 7 Principios Que Predicen Conversión

| # | Principio | Qué dice la ciencia | Aplicación en esta landing |
|---|---|---|---|
| 1 | **Fluidez de procesamiento** | Información fácil de procesar → se percibe como más confiable. +16.9% CVR. | Reducir densidad de texto, chunking, jerarquía visual clara. |
| 2 | **Especificidad** | Lenguaje concreto activa regiones sensoriales del cerebro. FreshBooks +4% registros. | Números exactos, resultados tangibles, no abstractos. |
| 3 | **Reconocimiento de patrones** | El cerebro busca lo familiar; violarlo = fricción. Teamwork +54% CVR. | Navegación predecible, layouts estándar de landing. |
| 4 | **Efecto Von Restorff** | Lo diferente destaca y se recuerda. AliveCor +25% CVR. | CTA con color de alto contraste, badge de oferta prominente. |
| 5 | **Aversión a la pérdida** | Pérdidas pesan 2× más que ganancias. Leadforce +24.5% CVR. | "No pierdas el descuento", countdown timer, escasez real. |
| 6 | **Anclaje** | Primer número visto = referencia para todo. +18.6% descargas. | Precio tachado ($25 → $10), "Antes / Ahora". |
| 7 | **Prueba social** | Cerebro reduce incertidumbre viendo a otros. Vegetology +6% CVR. | Testimonios near CTA, números reales (15.000+). |

**Fuentes:** Orbit Media / Gill Andrews, Brainfluence (Roger Dooley), Core Neuro-Design Playbook (Revolutex Digital 2025).

### 1.2 La Secuencia De Decisión Cerebral

```
1. Entrada sensorial → Impresión visual instantánea (0.5s)
2. Reconocimiento de patrones → ¿Esto es familiar y confiable?
3. Evaluación emocional → Amígdala decide antes que corteza prefrontal
4. Procesamiento consciente → Análisis lógico (precio, features)
5. Decisión → Comprar o irse
```

**Implicación:** El hero debe resolver los pasos 1-3 en < 5 segundos. El resto de la página resuelve el paso 4.

### 1.3 El Dato Más Importante

> **95% de las decisiones de compra son subconscientes. La gente compra con emoción y justifica con lógica.** — Neuroimagen funcional (Kahneman, Sistema 1 vs Sistema 2)

Esto significa: **el copy emocional va primero, el racional después.** No al revés.

## 2. Frameworks De Alta Conversión

### 2.1 AIDA Por Sección (No Solo Por Página)

| Sección | A | I | D | A |
|---|---|---|---|---|
| **Hero** | H1 poderoso | Subcopy intrigante | Precio + beneficio | CTA principal |
| **Problem** | "¿Quieres empezar pero no sabes cómo?" | Agitar consecuencias | Visualizar solución | CTA secundario |
| **Benefits** | Badge visual | Feature → beneficio | "Esto es lo que logras" | Micro-CTA |
| **Authority** | Números (15K+) | Quién es Yess Lacroix | "gente como tú ya lo hizo" | CTA confianza |
| **Offer** | "Oferta especial" | Precio anclado | Garantía + bonus | CTA final |

### 2.2 PAS En Cada Bloque De Dolor

**Problem → Agitate → Solution** aplicado dentro de secciones clave:

- **Hero**: "No sabes qué técnica aprender ni qué materiales comprar" (P) → "Invertir a ciegas puede costarte tiempo y dinero" (A) → "Este curso te da la ruta paso a paso por solo $10 USD" (S)

## 3. Skills De Claude Code Disponibles En GitHub

### 3.1 Skills Que Podemos Instalar Y Usar

| Skill | Repo | Función | Relevancia |
|---|---|---|---|
| `marketing-skills/cro` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) ⭐30K+ | Auditoría CRO en 7 dimensiones: propuesta de valor, headlines, jerarquía CTA, escaneabilidad, trust signals, objeciones, fricción | 🔴 DIRECTA |
| `marketing-skills/copywriting` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | Rewrite de headlines, CTAs, objeciones | 🔴 DIRECTA |
| `marketing-skills/seo-audit` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | SEO técnico y on-page | 🟡 Media |
| `web-quality-audit` | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) | Lighthouse, Core Web Vitals, accessibility, best practices | 🔴 DIRECTA |
| `web-quality-audit` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | 150+ checks: Performance, Accessibility, SEO, Best Practices | 🔴 DIRECTA |
| `ui-ux-audit` | [WomenDefiningAI/claude-code-skills](https://github.com/WomenDefiningAI/claude-code-skills) | Auditoría UI/UX obligatoria: redundancia, gaps reales vs asumidos, diseño limpio | 🟡 Media |
| `web-design` | [KAOPU-XiaoPu/web-design](https://github.com/KAOPU-XiaoPu/web-design) ⭐332 | Spec-driven design: 9-section DESIGN.md + 100-score checklist | 🟡 Media |
| `product-team/ux-researcher` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | Investigación UX, user personas, journey mapping | 🟡 Media |

### 3.2 Skills Propias Del Proyecto (Ya Existentes)

| Skill | Ubicación | Función |
|---|---|---|
| `hotmart-affiliate-links` | `skills/hotmart-affiliate-links/SKILL.md` | Preservación de parámetros de afiliado |
| `landing-page-creator` | (invocable) | Creación de landing pages |
| `grand-slam-offer` | (invocable) | Estructura de oferta |
| `conversion-tracker` | (invocable) | Tracking de eventos |

## 4. Arquitectura Agentica De Revisión

### 4.1 Subagentes Obligatorios Por Dimensión

Cada subagente audita UNA dimensión y entrega hallazgos independientes. Se ejecutan en paralelo.

```
                        ┌─────────────────────┐
                        │   UX Orchestrator    │
                        │   (Plan Agentico)    │
                        └──────────┬──────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Neuro Copy      │    │ Visual &        │    │ Trust &         │
│ Auditor         │    │ Cognitive       │    │ Social Proof    │
│                 │    │ Auditor         │    │ Auditor         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Headlines     │    │ • Jerarquía     │    │ • Testimonios   │
│ • AIDA por      │    │   visual        │    │ • Garantía      │
│   sección       │    │ • Carga         │    │ • Authority     │
│ • PAS en dolor  │    │   cognitiva     │    │ • Certificados  │
│ • Especificidad │    │ • Contraste CTA │    │ • Riesgo        │
│ • Emoción vs    │    │ • Escaneabilidad│    │   percibido     │
│   lógica        │    │ • Fitts's Law   │    │ • Compliance    │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                      │
         ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Mobile &        │    │ Performance     │    │ Hotmart &       │
│ Responsive      │    │ & Technical     │    │ Attribution     │
│ Auditor         │    │ Auditor         │    │ Auditor         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • 390px layout  │    │ • LCP / CLS     │    │ • ref=          │
│ • Tap targets   │    │ • Core Web      │    │ • off=          │
│ • Scroll        │    │   Vitals        │    │ • checkoutMode  │
│ • Overflow       │    │ • Lighthouse    │    │ • src= por      │
│ • Thumb zone    │    │ • Imágenes      │    │   sección       │
│ • Readability   │    │ • Fonts         │    │ • WhatsApp      │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                                ▼
                    ┌─────────────────────┐
                    │   Synthesis &       │
                    │   Prioritization    │
                    │   (ICE/RICE)        │
                    └─────────────────────┘
```

### 4.2 Prompt Base Por Subagente

#### Neuro Copy Auditor
```
Audita el copy de la landing en http://localhost:3000/ aplicando:
1. Principio de Especificidad: ¿cada claim tiene números/concreción?
2. AIDA por sección: ¿cada bloque captura atención → interés → deseo → acción?
3. PAS en secciones de dolor: ¿Problem → Agitate → Solution presente?
4. Emoción primero, lógica después: ¿el orden es correcto?
5. Aversión a la pérdida: ¿el descuento se comunica como pérdida de oportunidad?
6. Fluidez de procesamiento: ¿el lenguaje es simple y directo?

Entrega: hallazgos categorizados (Crítico / Alto / Medio / Bajo) con copy sugerido.
```

#### Visual & Cognitive Auditor
```
Audita el diseño visual y carga cognitiva aplicando:
1. Jerarquía visual: ¿elemento más importante = más prominente?
2. Efecto Von Restorff: ¿el CTA destaca suficientemente? Contraste ≥ 3:1?
3. Hick's Law: ¿una sola acción principal por sección?
4. Fitts's Law: ¿CTAs grandes y cerca del contenido relacionado?
5. Carga cognitiva: ¿cada pantalla tiene un solo mensaje?
6. Patrones familiares: ¿el layout sigue convenciones de landing?

Entrega: hallazgos con screenshots y mediciones de contraste/tamaño.
```

#### Trust & Social Proof Auditor
```
Audita las señales de confianza aplicando:
1. Social proof: ¿testimonios están cerca de CTAs?
2. Authority: ¿credenciales visibles y verificables?
3. Risk reversal: ¿garantía visible en todo CTA?
4. Transparency: ¿precio, acceso, y términos claros?
5. Compliance: ¿claims médicos controlados? ¿disclaimer visible?

Entrega: hallazgos con verificación de cada claim.
```

#### Mobile & Responsive Auditor
```
Audita la experiencia mobile en 390px:
1. Hero: ¿CTA visible sin scroll excesivo?
2. Overflow horizontal: ¿cero?
3. Tap targets: ¿≥ 44x44px?
4. Thumb zone: ¿CTAs accesibles con pulgar?
5. Readability: ¿texto legible sin zoom?
6. Scroll: ¿la página fluye naturalmente?

Entrega: hallazgos con screenshots mobile.
```

#### Performance & Technical Auditor
```
Audita performance y aspectos técnicos:
1. Lighthouse: Performance, Accessibility, Best Practices, SEO
2. Core Web Vitals: LCP, CLS, INP
3. Imágenes: ¿formatos next-gen? ¿lazy loading?
4. Fonts: ¿carga optimizada? ¿sin FOIT/FOUT?
5. JavaScript: ¿hidratación mínima? ¿code splitting?

Entrega: informe Lighthouse + recomendaciones priorizadas.
```

#### Hotmart & Attribution Auditor
```
Audita integridad de enlaces de afiliado:
1. Todos los CTAs contienen ref=I105893773O
2. Todos los CTAs de descuento contienen off=o3kleyo8
3. checkoutMode=10 presente
4. src= único por sección
5. WhatsApp no canibaliza checkout principal

Entrega: tabla de CTAs con verificación por parámetro.
```

### 4.3 Priorización ICE

| Factor | Peso | Descripción |
|---|---|---|
| **I**mpact | 1-5 | ¿Cuánto mueve la conversión? |
| **C**onfidence | 1-5 | ¿Qué tan seguros estamos de que funciona? |
| **E**ase | 1-5 | ¿Qué tan fácil es implementarlo? |

Score = I × C × E. Priorizar scores ≥ 27 primero.

## 5. Plan De Trabajo En 5 Fases

### Fase 1: Auditoría Agentica Inicial (1 sesión)
**Objetivo:** 6 subagentes auditan en paralelo, generan hallazgos independientes.

1. Instalar skills de GitHub necesarias
2. Lanzar 6 subagentes en paralelo con prompts base
3. Recopilar hallazgos
4. Síntesis y priorización ICE

**Output:** `docs/ux-audit-findings.md` con hallazgos priorizados.

### Fase 2: Correcciones De Alto Impacto (1-2 sesiones)
**Objetivo:** Implementar hallazgos Críticos y Altos (ICE ≥ 27).

Áreas probables de intervención:
- Hero: headlines, jerarquía, precio, CTA
- Copy: especificidad, emoción → lógica
- CTA: contraste, tamaño, posición
- Trust: testimonios near CTA, garantía
- Mobile: overflow, tap targets, thumb zone

### Fase 3: Correcciones De Medio Impacto (1 sesión)
**Objetivo:** Implementar hallazgos Medios (ICE 16-26).

Áreas probables:
- Performance: optimización de imágenes, fonts
- SEO: metadata, structured data
- A11y: contraste, labels, focus
- Animaciones: reducir motion si afecta

### Fase 4: Verificación Independiente (1 sesión)
**Objetivo:** Subagentes independientes verifican que cada corrección se aplicó bien.

- Browser QA Agent: Playwright desktop + mobile + screenshots
- Conversion Reviewer: re-audita hero, CTA, objeciones
- Compliance Reviewer: re-audita claims

### Fase 5: A/B Testing Plan (documento)
**Objetivo:** Definir qué variables testear con tráfico real.

- Variable A: headline actual vs propuesto
- Variable B: CTA copy actual vs propuesto
- Variable C: orden de secciones
- Plan de medición: eventos, significancia estadística, duración

## 6. Checklists De Auditoría Rápida

### 6.1 First 5 Seconds Test
- [ ] ¿El H1 explica qué es y para quién?
- [ ] ¿El precio es visible sin scroll?
- [ ] ¿El CTA principal está above the fold?
- [ ] ¿La página se ve profesional y confiable?
- [ ] ¿El visitante sabe exactamente qué hacer?

### 6.2 Mobile Sanity Check
- [ ] ¿Hero ≤ 920px de alto?
- [ ] ¿CTA visible en primer pantallazo (390px)?
- [ ] ¿Sin overflow horizontal?
- [ ] ¿Texto legible sin zoom?
- [ ] ¿Tap targets ≥ 44px?

### 6.3 Trust Check
- [ ] ¿Testimonio/logo/prueba social cerca del primer CTA?
- [ ] ¿Garantía visible?
- [ ] ¿Precio transparente?
- [ ] ¿Disclaimer médico-estético presente?
- [ ] ¿Información de contacto accesible?

### 6.4 Hotmart Check
- [ ] ¿Todos los CTAs principales tienen `ref=I105893773O`?
- [ ] ¿Todos los CTAs de oferta tienen `off=o3kleyo8`?
- [ ] ¿`checkoutMode=10` presente?
- [ ] ¿`src=` único por sección?
- [ ] ¿WhatsApp es visualmente secundario?

## 7. Skills A Instalar

```bash
# Skills de marketing y CRO
npx skills add coreyhaines31/marketingskills

# Web quality (Lighthouse, Core Web Vitals, a11y)
npx skills add addyosmani/web-quality-skills

# Alternativa: 150+ checks de calidad
npx skills add davila7/claude-code-templates --skill web-quality-audit
```

## 8. Métricas De Éxito

| Métrica | Actual | Objetivo |
|---|---|---|
| Hero comunica oferta en < 5s | ? | ✅ Sí |
| CTA click rate | ? | ≥ 3% |
| Scroll depth 50% | ? | ≥ 60% |
| Scroll depth 75% | ? | ≥ 40% |
| Checkout initiation | ? | ≥ 2% |
| Mobile bounce rate | ? | < 50% |
| LCP | ? | < 2.5s |
| CLS | ? | < 0.1 |
| Lighthouse Performance | ? | ≥ 90 |
| Lighthouse Accessibility | ? | ≥ 90 |

## 9. Referencias

- [Core Neuro-Design Playbook — Revolutex Digital 2025](https://revolutexdigital.com/core-neuro-design-playbook/)
- [How Neuroscience Predicts What Will Convert — Orbit Media / Gill Andrews](https://www.orbitmedia.com/blog/neuroscience-and-conversions/)
- [Brainfluence: 100 Ways to Persuade — Roger Dooley](https://www.amazon.com/Brainfluence-persuade-convince-customers-neuromarketing/dp/1118113365)
- [marketingskills — coreyhaines31 (30K+ ⭐)](https://github.com/coreyhaines31/marketingskills)
- [web-quality-skills — addyosmani](https://github.com/addyosmani/web-quality-skills)
- [web-quality-audit (150+ checks) — davila7](https://github.com/davila7/claude-code-templates)
- [ui-ux-audit — WomenDefiningAI](https://github.com/WomenDefiningAI/claude-code-skills)
- [The Modern UX Audit Blueprint — UXGen Studio](https://uxgenstudio.com/the-modern-ux-audit-blueprint-that-stops-conversion-leaks/)
- [UX Audit Guide 2025 — Grauberg Design Studio](https://grauberg.co/resources/ux-audit-guide-step-by-step-process-for-2025)
- [AIDA in Web Design — Red Website Design](https://red-website-design.co.uk/aida-in-web-design-the-secret-to-building-pages-that-persuade-and-sell/)
