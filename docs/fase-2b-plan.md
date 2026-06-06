# Fase 2b + 3 — Plan De Ejecución Agentica

## Equipo de agentes (3 agentes, 0 conflictos de archivos)

| Agente | Archivos | Responsabilidad | Skills |
|---|---|---|---|
| **Alpha — Content & Narrative** | `page.tsx`, `dermapen-landing.ts` | AIDA, emoción/lógica, headings narrativos, WhatsApp, TrustBar jerarquía, Offer CTA cerca del precio | landing-page-creator, grand-slam-offer |
| **Beta — Visual & Layout** | `globals.css`, `floating-actions.tsx` | Quitar sticky TopScarcity, layouts variados, sincronizar padding-bottom | premium-frontend-ui, tailwindcss, accessibility-a11y |
| **Gamma — Technical Cleanup** | `next.config.ts`, `layout.tsx`, `package.json`, `hotmart-links.ts` | Cache strategy, CSP, versiones fijas, GSAP lazy, src único floating | nextjs-react-typescript, performance, seo |

## Asignación de tareas por agente

### Alpha — Content & Narrative (8 tareas)

1. **AIDA sección por sección** — Agregar micro-CTA o transición en cada bloque:
   - Solution → "Ver contenido del curso →" (ya existe)
   - Benefits → "Ver precio con descuento →"
   - MediaProof → "Quiero empezar ahora →"
   - Authority → "Unirme a 15.000+ alumnas →" (ya existe)
   - Curriculum → "Ver precio →" (ya existe)

2. **Emoción primero, lógica después** — En cada sección, asegurar que:
   - Primera frase = emocional/aspiracional
   - Segunda/tercera frase = features lógicos
   - Disclaimers legales al FINAL de cada sección, no al principio

3. **Headings narrativos** — Reescribir secuencia de H2 para que cuente una historia:
   - Hero → "Aprende X en Y lecciones — desde Z USD"
   - Problem → "¿3 meses viendo tutoriales sin saber por dónde empezar?"
   - Solution → "12 lecciones que te llevan de cero a atender con criterio"
   - Benefits → "Resultados visibles desde la 3ª sesión"
   - MediaProof → "Mira el contenido real antes de comprar"
   - ROI → "15.000+ alumnas empezaron así. Por solo 10 USD."
   - Authority → "Yess Lacroix Academy: comunidad en 35 países"
   - Testimonials → "Escucha a quienes ya se formaron"
   - Curriculum → "Esto es exactamente lo que aprenderás"
   - Offer → "Inscríbete hoy al precio de lanzamiento"
   - FAQ → "Respuestas directas antes de comprar"
   - Final → "Empieza hoy. Sin riesgo. Garantía de 7 días."

4. **WhatsAppSection → FAQ** — Eliminar sección independiente, mover su contenido como última pregunta del FAQ o como callout pequeño al final del FAQ. El CTA de WhatsApp queda solo en Hero y Floating (como icono secundario).

5. **TrustBar jerarquía** — De 6 items iguales a: 2 destacados (Garantía 7 días + Hotmart pago seguro) con fondo/borde distintivo, los otros 4 como texto compacto.

6. **CTA cerca del precio en Offer** — En OfferSection, reordenar: precio grande → CTA inmediatamente abajo → countdown → garantía. Sin gaps grandes.

7. **Restaurar tono Copy Agent** — Mantener el framing de pérdida, la especificidad, sin "aprox.", sin voz pasiva.

8. **Micro-CTAs en secciones sin acción** — Benefits, MediaProof, Authority: cada una debe tener un enlace de texto que avance al usuario hacia Offer.

### Beta — Visual & Layout (4 tareas)

1. **Quitar sticky de TopScarcity** — Cambiar `position: sticky` a `position: relative` para que la barra de escasez desaparezca al hacer scroll. El usuario no debe ver 2 barras fijas simultáneas.

2. **Variar layouts** — Alternar fondos de sección con más contraste:
   - Secciones pares: `background: var(--surface)` (blanco)
   - Secciones impares: `background: var(--bg)` (#faf9f7)
   - Testimonials: fondo distinto (sutil rosa/gris)

3. **padding-bottom sincronizado** — Asegurar que `body { padding-bottom }` coincida con la altura real del floating bar en desktop (88px) y mobile (68px). Ya está aplicado, solo verificar.

4. **Benefit-slider mobile** — Asegurar que `transform: none !important` está en todas las media queries necesarias.

### Gamma — Technical Cleanup (5 tareas)

1. **Cache strategy** — Agregar `export const revalidate = 3600` en page.tsx (o el approach correcto de Next.js 15).

2. **CSP headers** — Agregar Content-Security-Policy básico en next.config.ts.

3. **Fijar versiones devDependencies** — Reemplazar `"latest"` por versiones concretas en devDependencies.

4. **GSAP dynamic import** — En dermapen-experience.tsx, cambiar import estático por import dinámico.

5. **FloatingActions src único** — Cambiar `source="meta-co-final"` a `source="meta-co-floating"` en floating-actions.tsx y agregar al tipo HotmartSource.

## Orden de ejecución

Los 3 agentes pueden trabajar en paralelo — NO comparten archivos:

```
Alpha (page.tsx + dermapen-landing.ts)  →  ⚡
Beta  (globals.css)                      →  ⚡  PARALELO
Gamma (config files)                     →  ⚡
```

## Verificación

Al terminar los 3: `npm run typecheck && npx playwright test`
