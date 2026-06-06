# Landing Page Premium - Plan de Implementacion

## 1. Decision base para arrancar

Para empezar a codificar sin friccion, propongo asumir este stack:

- `Next.js` con App Router
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion` para microinteracciones y reveals
- `React Hook Form` + `Zod` para el formulario
- `lucide-react` para iconografia base

Motivo: necesitamos una landing de alto cuidado visual, buen performance movil, formulario con logica condicional, tracking de eventos y facilidad para conectar con `n8n`.

## 2. Objetivo del MVP

La primera version no debe intentar resolver todo el ecosistema visual desde el dia uno. El MVP debe salir con:

1. Hero premium y narrativa completa
2. Todas las secciones clave de conversion
3. Formulario de validacion en 2 pasos
4. Clasificacion de lead en frontend
5. Envio del formulario a webhook de `n8n`
6. Pantalla post-formulario con CTA de WhatsApp segun el caso
7. Tracking base listo para Meta Pixel / GTM
8. Diseño lo bastante premium para vender, pero sin depender de 3D pesado

Lo que puede quedar para fase 2:

- Scroll storytelling avanzado PRP -> PRF
- Video de la doctora
- Integracion completa con WhatsApp API
- Google Maps real con embed definitivo
- Meta CAPI completo desde entorno productivo

## 3. Arquitectura de informacion de la landing

La pagina debe construirse en este orden:

1. `Hero`
2. `Trust Bar`
3. `Opportunity Section`
4. `Differential Section`
5. `Evolution Section`
6. `Learning Section`
7. `Applications Section`
8. `Experience Section`
9. `Audience Section`
10. `Instructor Section`
11. `Includes Section`
12. `Pricing Section`
13. `Location Section`
14. `FAQ Section`
15. `Qualification Form`
16. `Post Form Result`

## 4. Mapa de componentes recomendado

```text
app/
  page.tsx
  layout.tsx
  globals.css

src/
  components/
    layout/
      container.tsx
      section-shell.tsx
      sticky-cta.tsx
    ui/
      button.tsx
      chip.tsx
      section-heading.tsx
      icon-badge.tsx
      accordion.tsx
      card.tsx
    sections/
      hero.tsx
      trust-bar.tsx
      opportunity.tsx
      differential.tsx
      evolution.tsx
      learning.tsx
      applications.tsx
      experience.tsx
      audience.tsx
      instructor.tsx
      includes.tsx
      pricing.tsx
      location.tsx
      faq.tsx
      qualification-form.tsx
      post-form-result.tsx
    form/
      step-contact.tsx
      step-qualification.tsx
      form-progress.tsx
    visual/
      fibrin-background.tsx
      plasma-orb.tsx
      particle-field.tsx
  data/
    landing-content.ts
    faqs.ts
    audience-profiles.ts
  lib/
    analytics.ts
    lead-classifier.ts
    whatsapp.ts
    utils.ts
    validations.ts
  types/
    landing.ts
    lead.ts
```

## 5. Modelo de contenido

Conviene centralizar todo el contenido en archivos de datos para no mezclar copy con logica visual.

### `landing-content.ts`

Debe contener:

- Datos del curso
- Hero copy
- Chips y highlights
- Secciones de valor
- Listados de aprendizaje
- Aplicaciones por perfil
- Info de inversion
- Datos de ubicacion
- Textos del formulario

### `faqs.ts`

Array tipado con:

- `question`
- `answer`

### `lead.ts`

Tipos recomendados:

- `ProfessionalProfile`
- `InterestIntent`
- `LeadStatus`
- `LeadPayload`
- `WebhookResponse`

## 6. Estados de lead que debemos soportar

Estados canonicos:

- `hot`
- `warm`
- `cold`
- `review`
- `unqualified`

### Regla de clasificacion

#### Perfil permitido

- `medico`
- `odontologo`
- `fisioterapeuta`
- `enfermero`
- `cosmetologo`
- `esteticista_titulada`

#### Intencion

- `reserve_now`
- `need_info`
- `just_info`

#### Resultado

- perfil permitido + `reserve_now` => `hot`
- perfil permitido + `need_info` => `warm`
- perfil permitido + `just_info` => `cold`
- perfil `otro` => `review`
- perfil `no_aplica` => `unqualified`

## 7. Flujo UX que debemos implementar

```text
CTA de cualquier seccion
  -> scroll al formulario
  -> paso 1: datos de contacto
  -> paso 2: validacion de perfil
  -> enviar al webhook
  -> clasificar lead
  -> renderizar pantalla final
  -> mostrar CTA de WhatsApp si corresponde
```

### Regla critica

No debe aparecer un boton principal de WhatsApp antes del envio exitoso del formulario.

## 8. Contrato inicial del formulario

Campos:

- `fullName`
- `whatsapp`
- `email`
- `city`
- `professionalProfile`
- `reservationIntent`
- `contactConsent`

Campos de tracking:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `fbp`
- `fbc`
- `landing_url`
- `referrer`
- `user_agent`
- `event_id`
- `lead_id`
- `created_at`

## 9. Respuesta esperada de n8n

La UI deberia poder trabajar con algo como esto:

```json
{
  "success": true,
  "lead_id": "uuid",
  "lead_status": "hot",
  "next_step": "whatsapp_reserva",
  "whatsapp_message": "Hola, quiero reservar mi cupo...",
  "show_whatsapp_button": true
}
```

## 10. Eventos de tracking que debemos dejar instrumentados

Eventos base:

- `page_view`
- `hero_cta_click`
- `section_cta_click`
- `sticky_cta_click`
- `form_view`
- `form_start`
- `form_step_1_completed`
- `form_submit`
- `lead_hot`
- `lead_warm`
- `lead_cold`
- `lead_review`
- `lead_unqualified`
- `whatsapp_click`

## 11. Sistema visual minimo para la primera version

### Paleta inicial

- `bgDeep`: `#081F2D`
- `bgPetrol`: `#0E3A46`
- `bgLight`: `#F8FAFA`
- `surface`: `#FFFFFF`
- `surfaceAlt`: `#E8EEF0`
- `textPrimary`: `#1F2933`
- `textSecondary`: `#4B5563`
- `accentAmber`: `#E8A93A`
- `accentChampagne`: `#D8B978`
- `accentBio`: `#3AAFA9`

### Tipografia sugerida

- `Manrope` para titulos y texto

### Principios UI

- Secciones respirables
- Cards con radio moderado
- Mucho contraste
- CTA fuerte y siempre visible
- Cero look de flyer
- Cero visual de spa

## 12. Orden recomendado de implementacion

### Fase A - Base tecnica

1. Crear proyecto Next.js
2. Configurar Tailwind
3. Configurar tipografias
4. Crear layout base
5. Crear sistema de colores y tokens

### Fase B - Contenido y secciones

1. Crear `landing-content.ts`
2. Construir `Hero`
3. Construir `Trust Bar`
4. Construir secciones de contenido restantes
5. Construir `FAQ`

### Fase C - Conversion

1. Construir formulario en 2 pasos
2. Implementar validaciones
3. Implementar clasificador de lead
4. Implementar pantalla post-formulario
5. Generar mensajes de WhatsApp dinamicos

### Fase D - Integracion

1. Crear `submitLead()`
2. Conectar a webhook de `n8n`
3. Agregar manejo de errores
4. Agregar tracking

### Fase E - Refinamiento premium

1. Microanimaciones
2. Sticky CTA
3. Mejoras responsive finas
4. QA movil y desktop

## 13. Backlog tecnico inmediato

### Ticket 1 - Bootstrapping

- Crear proyecto base
- Definir estructura de carpetas
- Configurar estilos globales

### Ticket 2 - Content source of truth

- Crear objeto central con todo el copy
- Tipar datos del curso

### Ticket 3 - Landing skeleton

- Render de todas las secciones
- Navegacion por CTA con scroll

### Ticket 4 - Qualification form

- Paso 1 y paso 2
- Validaciones
- Estado de carga y error

### Ticket 5 - Lead routing

- Clasificacion local
- Mensajes de WhatsApp segun caso
- Pantallas finales

### Ticket 6 - n8n integration

- POST al webhook
- Payload con tracking
- Manejo de respuesta

### Ticket 7 - Analytics hooks

- Disparo de eventos
- Helpers reutilizables

## 14. Pendientes que bloquean una version final premium

Estos no bloquean el desarrollo del MVP, pero si la version final:

- Foto profesional de la Dra. Maria Teresa Martinez
- Bio validada de la docente
- Numero final de WhatsApp
- URL real del webhook de `n8n`
- URL real de Google Maps
- Politica de tratamiento de datos
- IDs reales de Pixel / GTM
- Fotos o recursos visuales propios

## 15. Lo que yo haria justo despues de este documento

Orden pragmatico:

1. Scaffold del proyecto `Next.js`
2. Crear `landing-content.ts` como fuente unica
3. Construir primero la landing estatica completa
4. Luego montar formulario y clasificacion
5. Luego integrar webhook y tracking
6. Despues pulir motion y detalles premium

## 16. Decisiones que doy por tomadas para no frenarnos

- La landing sera una sola pagina
- El CTA principal siempre baja al formulario
- El formulario sera de 2 pasos
- WhatsApp solo aparece despues del envio
- MVP sin 3D pesado
- Se prioriza performance movil
- El look sera biomedico premium, no estetica comercial

