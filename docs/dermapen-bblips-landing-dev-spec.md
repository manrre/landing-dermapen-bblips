# Dermapen + BBLips Landing Dev Spec

## 1. Objetivo

Construir una landing page de alta conversion para Colombia que venda el curso online Dermapen + BBLips de Yess Lacroix Academy usando una experiencia premium con Dermapen 3D, scroll narrativo, tracking de Meta Ads y enlaces Hotmart de afiliado preservados.

La landing debe llevar a compra directa con descuento, no a navegacion exploratoria.

## 2. Oferta

Producto: Dermapen + BB Lips Yess Lacroix.

Mercado inicial: Colombia.

Precio principal:

- USD: 10 USD aproximado.
- COP observado: $37.847 COP aproximado.
- Texto recomendado: "Hoy desde aprox. $37.847 COP / 10 USD".
- Disclaimer: "El valor final puede variar segun conversion, cuotas o metodo de pago en Hotmart."

Checkout principal:

```text
https://pay.hotmart.com/V40642188D?off=o3kleyo8&checkoutMode=10&ref=I105893773O&src=meta-co-38k
```

Reglas duras:

- Nunca quitar `ref=I105893773O`.
- Nunca quitar `off=o3kleyo8` para la oferta de descuento.
- No usar `bid` en enlaces de campana.
- Cambiar `src` por seccion o variante cuando se necesite atribucion granular.

## 3. Audiencia

Principal:

- Mujeres en Colombia interesadas en estetica, belleza, cosmetologia, cabinas esteticas o emprendimiento.
- Rango de referencia: 28 a 43 anos.
- Personas que quieren iniciar desde cero o ampliar servicios.

Deseos:

- Aprender una tecnica estetica rentable.
- Tener una opcion de ingreso extra.
- Certificarse online.
- Saber que materiales comprar.
- Poder estudiar desde casa.

Objeciones:

- No tengo experiencia.
- No se si sirve en Colombia.
- No se que materiales comprar.
- Me preocupa pagar y no recibir acceso.
- No se si el certificado me sirve.
- Quiero preguntar antes de comprar.

## 4. Mensaje Central

Headline base:

```text
Aprende Dermapen + BBLips desde cero
```

Subheadline base:

```text
Curso online para aprender dos tecnicas esteticas de alta demanda, con acceso inmediato, certificado digital y garantia de 7 dias.
```

CTA principal:

```text
Inscribirme con descuento
```

CTA secundario:

```text
Resolver dudas por WhatsApp
```

El CTA de WhatsApp debe ser visualmente secundario.

## 5. Agentes Del Sistema

### 5.1 Agente Developer-Specifier

Skill principal:

- `agentic-system-auditor`

Responsabilidad:

- Define especificacion, contratos, gates, riesgos y criterios de aceptacion.
- Evita que el equipo construya por intuicion sin trazabilidad.

Inputs:

- Este `DEV_SPEC`.
- Links Hotmart.
- Material del curso en `D:\DERM+BBLIPS-20260603T010309Z-3-001`.
- Reglas de compliance medico-estetico.

Outputs:

- Criterios de aceptacion.
- Backlog de codificacion.
- Gates de QA.
- Hallazgos de riesgo antes de deploy.

No hace:

- No escribe copy final sin pasar por el agente de conversion.
- No altera enlaces Hotmart.

Gate:

- Ninguna fase pasa a produccion si rompe oferta, tracking, performance o compliance.

### 5.2 Agente Conversion Strategist

Skills:

- `landing-page-creator`
- `grand-slam-offer`
- `guarantee-generator`
- `hotmart-affiliate-links`

Responsabilidad:

- Estructura la pagina bajo AIDA.
- Define CTAs, objeciones, FAQ, oferta, precio, garantia y orden de secciones.
- Decide donde aparece WhatsApp sin canibalizar checkout.

Outputs:

- Copy por seccion.
- CTA map.
- Oferta y microcopy de precio.
- FAQ de objeciones.

Reglas:

- Minimo 3 CTAs a Hotmart.
- WhatsApp solo como rescate de dudas.
- No usar claims medicos absolutos.
- No prometer ingresos garantizados.

Gate:

- El hero debe explicar producto, beneficio, precio y accion en menos de 5 segundos.

### 5.3 Agente Hotmart Attribution

Skill:

- `hotmart-affiliate-links`

Responsabilidad:

- Preservar comision de afiliado.
- Generar URLs por seccion con `src`.
- Clasificar links de checkout, catalogo, pagina oficial y ofertas.

URL base:

```text
https://pay.hotmart.com/V40642188D?off=o3kleyo8&checkoutMode=10&ref=I105893773O
```

Mapa inicial de SRC:

```text
meta-co-hero
meta-co-trust
meta-co-roi
meta-co-faq
meta-co-final
meta-co-wa
```

Outputs:

- `lib/hotmart-links.ts`.
- Funcion `buildHotmartUrl(source: HotmartSource)`.
- Test de preservacion de parametros.

Gate:

- Todos los CTAs contienen `ref=I105893773O`, `off=o3kleyo8`, `checkoutMode=10` y `src`.

### 5.4 Agente Visual Director

Skills:

- `premium-frontend-ui`
- `tailwindcss`
- `accessibility-a11y`

Responsabilidad:

- Define identidad visual premium, clinica y confiable.
- Evita apariencia de curso barato o pagina saturada.
- Mantiene legibilidad mobile.

Direccion visual:

- Base: blanco clinico.
- Texto: grafito/negro suave.
- Acento: rosa labial controlado.
- CTA: coral/amarillo de alto contraste.
- Confianza: verde menta muy sutil.

Outputs:

- Tokens visuales.
- Layout responsive.
- Sistema de botones, badges, cards y secciones.

Gate:

- No hay texto solapado.
- CTA visible en mobile sin scroll excesivo.
- Contraste AA en textos principales.

### 5.5 Agente 3D Motion

Skills:

- `gsap-scrolltrigger`
- `gsap-react`
- `framer-motion`
- `premium-frontend-ui`

Responsabilidad:

- Construir Dermapen 3D estilizado.
- Ligar rotacion, posicion y zoom al scroll.
- Mantener performance.

Modelo 3D:

- Cuerpo: cilindro metalico grafito.
- Aros: cromados o rose-gold.
- Punta: material translucido.
- Cartucho: cilindro frontal.
- Microagujas: cilindros finos o line segments.
- Luz/acento: aro sutil rosa.

Escenas:

1. Hero: Dermapen flotando con rotacion lenta.
2. Tecnica: zoom a punta/cartucho.
3. Beneficios: giro lateral con copy.
4. Oferta: Dermapen reduce presencia para priorizar CTA.

Reglas:

- Animar `transform` y propiedades WebGL, no layout.
- Respetar `prefers-reduced-motion`.
- Fallback mobile ligero si FPS cae.

Outputs:

- `components/landing/dermapen-scene.tsx`.
- `components/landing/dermapen-model.tsx`.
- `components/landing/scroll-story.tsx`.

Gate:

- No bloquea LCP.
- No tapa CTA.
- No deja canvas blanco.
- En mobile puede degradar a render simple.

### 5.6 Agente Frontend Architect

Skills:

- `nextjs-react-typescript`
- `tailwindcss`
- `gsap-react`

Responsabilidad:

- Traducir la spec en arquitectura Next.js.
- Mantener componentes pequenos y tipados.
- Separar contenido, tracking y UI.

Estructura propuesta:

```text
app/
  page.tsx
  layout.tsx
  globals.css
components/
  landing/
    hero-section.tsx
    trust-bar.tsx
    problem-section.tsx
    solution-grid.tsx
    dermapen-model.tsx
    dermapen-scene.tsx
    scroll-story.tsx
    roi-section.tsx
    authority-section.tsx
    curriculum-section.tsx
    testimonials-section.tsx
    offer-section.tsx
    faq-section.tsx
    whatsapp-cta.tsx
    final-cta.tsx
    hotmart-button.tsx
lib/
  hotmart-links.ts
  landing-content.ts
  tracking.ts
  price.ts
types/
  landing.ts
```

Client components:

- 3D scene.
- GSAP scroll.
- Tracking click handlers.
- FAQ accordion if interactive.

Server components:

- Static content sections.
- Layout.
- SEO metadata.

Gate:

- `npm run typecheck` pasa.
- `npm run build` pasa.
- No duplicacion de URL Hotmart en componentes.

### 5.7 Agente Tracking And Analytics

Skills:

- `conversion-tracker`
- `hotmart-affiliate-links`
- `performance`

Responsabilidad:

- Implementar medicion de eventos.
- Preparar integracion Meta Pixel y futura CAPI.
- No bloquear navegacion al checkout.

Eventos:

- `PageView`
- `ViewContent`
- `ScrollDepth25`
- `ScrollDepth50`
- `ScrollDepth75`
- `InitiateCheckout`
- `OutboundClickHotmart`
- `Contact`

Datos por evento:

```json
{
  "product": "dermapen-bblips",
  "market": "CO",
  "offer": "o3kleyo8",
  "price_usd": 10,
  "price_cop_approx": 37847,
  "source_section": "hero",
  "variant": "a"
}
```

Gate:

- Cada CTA dispara evento antes de redirigir.
- Redireccion no espera mas de 300 ms por tracking.
- Si Pixel no carga, CTA sigue funcionando.

### 5.8 Agente Compliance Medico-Estetico

Skills:

- `compliance-checker`
- `accessibility-a11y`

Responsabilidad:

- Revisar copy para evitar claims riesgosos.
- Cuidar promesas de salud, resultados e ingresos.

Reglas de copy:

- Decir "aprenderas la tecnica", no "vas a curar/eliminar".
- Decir "resultados pueden variar".
- Decir "revisa normativa de tu ciudad/pais".
- No decir "sin contraindicaciones".
- No decir "ingresos garantizados".
- No decir "certificado con aval internacional" si el material indica que no lo tiene.

Texto legal recomendado:

```text
Este curso es una formacion online en tecnicas esteticas. Los resultados pueden variar segun practica, materiales, tipo de piel y condiciones de cada persona. Revisa la normativa aplicable en tu ciudad o pais antes de ofrecer procedimientos esteticos a terceros.
```

Gate:

- Ningun claim medico absoluto.
- Ningun claim financiero garantizado.

### 5.9 Agente QA Reviewer

Skills:

- `web-quality-audit`
- `performance`
- `accessibility-a11y`
- `agentic-system-auditor`

Responsabilidad:

- Revisar build, mobile, desktop, enlaces, tracking y animaciones.

Checklist:

- Hero comunica producto/precio/CTA.
- Todos los CTAs preservan afiliado.
- Checkout abre con precio bajo.
- WhatsApp abre mensaje correcto.
- Canvas 3D renderiza en desktop.
- Mobile no se rompe.
- `prefers-reduced-motion` reduce animaciones.
- No hay CLS visible.
- Imagenes optimizadas.
- Build exitoso.

Gate:

- No se despliega si falla checkout, afiliado, mobile o build.

### 5.10 Agente Deploy Ops

Skills:

- `performance`
- `web-quality-audit`

Responsabilidad:

- Preparar deploy en Hetzner/EasyPanel.
- Gestionar variables de entorno.
- Verificar HTTPS, dominio, cache y health check.

Variables previstas:

```text
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
META_CAPI_PIXEL_ID=
NEXT_PUBLIC_WHATSAPP_URL=
NEXT_PUBLIC_LANDING_VARIANT=a
```

Gate:

- Dominio con HTTPS.
- Build reproducible.
- Variables no sensibles en cliente excepto las publicas.
- No exponer tokens CAPI en frontend.

## 6. Arquitectura De Pagina

### 6.1 Hero

Objetivo:

- Capturar atencion, explicar la oferta, mostrar precio y llevar a checkout.

Contenido:

- Badge: "Oferta Colombia - acceso online inmediato".
- H1: "Aprende Dermapen + BBLips desde cero".
- Subcopy: "Curso online para aprender dos tecnicas esteticas de alta demanda, con certificado digital, acceso de por vida y garantia de 7 dias."
- Precio: "Hoy desde aprox. $37.847 COP / 10 USD".
- CTA: "Inscribirme con descuento".
- CTA secundario: "Tengo una pregunta".
- Dermapen 3D rotando.

Acceptance:

- CTA visible above the fold en 390px.
- Precio visible antes del primer scroll.

### 6.2 Trust Bar

Items:

- 100% online.
- Acceso de por vida.
- Certificado digital.
- Garantia 7 dias.
- Ideal para principiantes.

Acceptance:

- En mobile debe ser scroll horizontal o grid compacto sin romper texto.

### 6.3 Problem Section

Copy base:

```text
Quieres entrar al mundo de la estetica o sumar un nuevo servicio, pero no sabes que tecnica aprender, que materiales comprar ni como empezar a atender con seguridad.
```

Bullets:

- No necesitas experiencia previa.
- Aprendes desde casa.
- Conoces materiales antes de comprar.
- Puedes practicar a tu ritmo.

Acceptance:

- Hablarle a principiante y esteticista sin excluir a ninguna.

### 6.4 Solution Grid

Cards:

- Dermapen facial.
- BBLips.
- Bioseguridad.
- Materiales.
- Principios activos.
- Practica real.

Acceptance:

- Cada feature debe traducirse en beneficio.

### 6.5 Scroll 3D Story

Pinned section:

- Paso 1: "Conoce la tecnica".
- Paso 2: "Entiende materiales y principios activos".
- Paso 3: "Observa practica en modelo real".
- Paso 4: "Suma el servicio a tu oferta estetica".

Acceptance:

- En desktop: Dermapen fijo + texto por pasos.
- En mobile: no pin largo; usar secuencia normal con render 3D simplificado.

### 6.6 ROI Section

Mensaje:

```text
El curso cuesta aprox. 10 USD. Una sesion estetica puede costar mas que el valor del curso, segun tu ciudad, experiencia y servicio ofrecido.
```

Disclaimer:

```text
No prometemos ingresos. Tu retorno depende de practica, precios, demanda local y capacidad de conseguir clientas.
```

Acceptance:

- No usar "recuperas seguro".

### 6.7 Authority Section

Contenido:

- Yess Lacroix Academy.
- +15.000 alumnas.
- Presencia en 35 paises.
- Instructora con experiencia estetica.
- Plataforma Hotmart.

Acceptance:

- No inventar avales.
- Si se menciona certificado, aclarar que es certificado de finalizacion del curso.

### 6.8 Curriculum Section

Dermapen:

- Microneedling.
- Fisiologia de la piel.
- Dispositivos.
- Limpieza facial.
- Principios activos.
- Materiales.
- Practica en modelo real.

BBLips:

- Anatomia/fisiologia de labios.
- Exfoliacion/proteccion.
- Hidratacion.
- Productos.
- Bioseguridad.
- Practica en modelo real.
- Manual PDF.

Acceptance:

- Temario escaneable, no bloque largo.

### 6.9 Testimonials Section

Assets candidatos:

```text
D:\DERM+BBLIPS-20260603T010309Z-3-001\DERM+BBLIPS\TESTIMONIOS\20b591f3-d2b0-4bce-8472-c01acc9711a0.mp4
D:\DERM+BBLIPS-20260603T010309Z-3-001\DERM+BBLIPS\TESTIMONIOS\ae85d176-455f-40f7-b19d-4b9b711134d8.mp4
```

Acceptance:

- Videos comprimidos para web.
- No autoplay con sonido.
- Controles accesibles.

### 6.10 Offer Section

Contenido:

- "Oferta especial por tiempo limitado".
- "Antes aprox. 25 USD".
- "Hoy aprox. 10 USD / $37.847 COP".
- "Garantia de 7 dias".
- CTA: "Inscribirme con descuento".

Acceptance:

- No mostrar precio viejo si no esta validado en checkout actual.

### 6.11 FAQ

Preguntas:

- Necesito experiencia previa?
- El curso incluye materiales?
- Donde compro los materiales en Colombia?
- Cuando recibo el acceso?
- Por cuanto tiempo tengo acceso?
- El certificado tiene aval internacional?
- Puedo pagar desde Colombia?
- Puedo escribir por WhatsApp antes de comprar?

Acceptance:

- La respuesta del certificado debe ser honesta: certificado de finalizacion, no aval gubernamental.

### 6.12 WhatsApp Rescue

Objetivo:

- Recuperar indecisos sin quitar foco al checkout.

Posicion:

- Despues del FAQ y como boton secundario en hero.

Copy:

```text
Tienes una duda antes de inscribirte?
Escribenos para confirmar acceso, pago o contenido del curso.
```

Acceptance:

- Boton visual secundario.
- Evento `Contact`.
- `src=meta-co-wa` si se usa link Hotmart despues de conversacion.

### 6.13 Final CTA

Copy:

```text
Empieza hoy con Dermapen + BBLips por aprox. 10 USD
```

CTA:

```text
Inscribirme con descuento
```

Acceptance:

- Repetir garantia y acceso inmediato.

## 7. Backlog Tecnico Para Codificacion

### Sprint 1: Base

- Crear contenido estructurado en `lib/landing-content.ts`.
- Crear `lib/hotmart-links.ts`.
- Crear componentes estaticos.
- Crear estilos globales y tokens.

Done:

- Pagina renderiza sin 3D.
- CTAs funcionan.
- Build pasa.

### Sprint 2: Visual Premium

- Hero final.
- Trust bar.
- Offer section.
- FAQ.
- Responsive.

Done:

- Mobile 390px y desktop 1440px revisados.

### Sprint 3: Dermapen 3D

- Crear `DermapenModel`.
- Crear `DermapenScene`.
- Integrar canvas en hero.
- Fallback mobile/reduced motion.

Done:

- Canvas renderiza.
- No tapa CTA.

### Sprint 4: Scroll Story

- Integrar GSAP ScrollTrigger.
- Crear seccion pinned desktop.
- Crear version mobile normal.

Done:

- Scroll suave.
- No hay saltos de layout.

### Sprint 5: Tracking

- Crear `tracking.ts`.
- Eventos CTA/WhatsApp.
- Scroll depth.
- Preparar env de Meta Pixel.

Done:

- Eventos logueables en dev.
- No rompe si no hay Pixel ID.

### Sprint 6: Assets

- Copiar/comprimir imagenes relevantes a `public/`.
- Comprimir testimonios.
- Definir thumbnails.

Done:

- Assets tienen peso razonable.
- Lazy loading aplicado.

### Sprint 7: QA + Deploy

- Typecheck.
- Build.
- Lighthouse/manual browser.
- Verificar checkout con precio descuento.
- Deploy EasyPanel.

Done:

- URL publica lista para trafico.

## 8. Riesgos Y Controles

| Riesgo | Impacto | Control |
|---|---|---|
| Link pierde afiliado | No hay comision | Centralizar URLs y test unitario |
| Link pierde descuento | Baja conversion | Test manual checkout antes de deploy |
| 3D pesa demasiado | Baja performance | Lazy load, fallback mobile |
| WhatsApp canibaliza compra | Menos ventas directas | Boton secundario y ubicacion controlada |
| Claims medicos | Rechazo Meta o riesgo legal | Compliance pass antes de deploy |
| Precio cambia en Hotmart | Inconsistencia | Mostrar "aprox." y validar periodicamente |
| Meta Pixel bloqueado | Menos atribucion | Fallback local + futura CAPI |

## 9. Criterios De Aceptacion Globales

- La landing abre en mobile y desktop sin errores.
- El hero muestra producto, precio y CTA.
- Todos los CTAs principales envian a Hotmart con descuento.
- Todos los CTAs preservan `ref=I105893773O`.
- La landing no promete resultados medicos ni ingresos garantizados.
- WhatsApp existe solo como canal secundario.
- El Dermapen 3D renderiza o tiene fallback.
- Build y typecheck pasan.
- El checkout final muestra la oferta baja antes de iniciar campanas.

## 10. Decision Para Codificacion

Construir primero una version MVP premium:

1. Landing completa estatica con CTAs y copy.
2. Dermapen 3D en hero.
3. Scroll story 3D.
4. Tracking basico.
5. Deploy.

No construir aun:

- API dinamica de precio.
- CAPI completa.
- A/B testing automatizado.
- Panel administrativo.

Esas funciones entran despues de validar que la landing convierte.
