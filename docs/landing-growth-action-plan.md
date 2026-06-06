# Landing growth action plan

## Diagnostico comercial

- El hero necesitaba una promesa mas concreta: no solo "dos tecnicas", sino "sumar dos servicios esteticos a tu cabina".
- En mobile, el primer pantallazo era pesado: titulo muy grande, mockup antes del copy y demasiado alto antes del CTA.
- Habia textos que describian la construccion de la pagina en vez de vender el curso.
- La prevencion legal aparecia con mas fuerza que el deseo. Se mantiene la responsabilidad, pero el copy ahora explica valor, practica y materiales.
- El precio en COP estaba estatico. Ahora existe un endpoint dinamico con fallback para tasa USD/COP.
- El tracking tenia llamadas `fbq` aisladas, pero faltaba cargar Pixel y enviar eventos por Conversions API.

## Acciones aplicadas

- Hero reescrito con promesa, tecnica, beneficio y objecion de materiales.
- CTA principal actualizado a "Inscribirme por 10 USD aprox.".
- Mobile compactado: menor H1, menor padding, texto antes que visual y floating CTA mas bajo.
- Seccion de beneficios reescrita para vender el aprendizaje, no describir la UI.
- API `/api/pricing` creada para consultar USD/COP y recalcular COP en cliente.
- Meta Pixel + `/api/meta/events` creados con `event_id` compartido para deduplicacion Pixel/CAPI.
- Playwright agregado con prueba desktop/mobile para copy, precio, overflow y hero compacto.

## Browser automation para IA

- Stagehand: framework TypeScript de Browserbase que anade `act`, `extract` y `observe` sobre Playwright. Buena opcion futura para pruebas agenticas con lenguaje natural.
- browser-use: framework Python para agentes autonomos que navegan con Playwright. Mas flexible, pero mas pesado para este repo Next/TS.
- Skyvern: plataforma mas completa para workflows de navegador con vision y Playwright; util si luego hay procesos complejos externos.
- Recomendacion actual: mantener Playwright deterministico para QA de landing y evaluar Stagehand si se quiere un agente browser mas expresivo.

## Pendientes recomendados

- Conectar valores reales en `.env`: `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN` y opcionalmente `META_CAPI_TEST_EVENT_CODE`.
- Probar eventos en Meta Events Manager con test event code antes de pautar.
- Agregar prueba visual con screenshots comparativas cuando se estabilice el diseno final.
- Conseguir prueba visual o captura verificable para los claims de `15.000+ alumnas` y `35 paises`.

## Operating Protocol

> **Regla de oro:** No abrir navegador ni correr Playwright hasta que `Invoke-WebRequest http://localhost:3000/` devuelva `200`.

### Healthcheck obligatorio

- Antes de abrir Browser o lanzar Playwright, ejecutar:
  `powershell -ExecutionPolicy Bypass -File scripts/landing-local-healthcheck.ps1`
- Si el healthcheck falla, diagnosticar y corregir; NO intentar abrir el navegador.

### Como levantar servidor

**Desarrollo:**
- `npm run dev:clean` si `.next` esta corrupto o ausente.
- `npm run dev` si `.next` es un dev build valido.
- Comando canonico: `npm.cmd run dev -- --hostname 0.0.0.0 --port 3000`.

**Preview de produccion:**
- `npm run preview:clean` para build fresco + start.
- Siempre confirmar que `.next/BUILD_ID` existe antes de `next start`.

### Lo que nunca se debe hacer

1. **No usar `next start` sin `npm run build` previo** y sin `.next/BUILD_ID`.
2. **No alternar `localhost` y `127.0.0.1`** en la misma sesion para evitar problemas de origen y cache.
3. **No usar Playwright con `reuseExistingServer: true`** si el servidor actual no paso healthcheck previo.
4. **No dejar procesos Next antiguos vivos** entre sesiones. Al terminar, cerrar el proceso `node` del servidor.
5. **No repetir el mismo comando** si Playwright falla por timeout. Capturar logs primero y auditar.
6. **No limpiar `.next` por rutina.** Solo limpiar si hay evidencia de corrupcion: manifests vacios, chunks faltantes, o errores `MODULE_NOT_FOUND`.

### Playwright

- `reuseExistingServer` esta en `false` por defecto en `playwright.config.ts`.
- `webServer.command` usa `npm.cmd run dev -- --hostname 0.0.0.0 --port 3000`.
- `baseURL` y `url` del `webServer` usan `http://localhost:3000`.
- Si se necesita reutilizar un servidor existente, pasar healthcheck manual antes y luego usar `--reuse-existing-server` como flag de CLI, no desde config.

### Verificacion manual final

Despues de healthcheck exitoso, abrir `http://localhost:3000/` y confirmar:
- Hero visible con producto, precio y CTA.
- Precio COP visible.
- CTA Hotmart con parametros correctos (`ref=I105893773O`, `off=o3kleyo8`, `checkoutMode=10`, `src`).
- Mobile sin overflow horizontal en 390px.
- Canvas 3D renderiza en desktop (o fallback visible).

### Scripts operativos

| Script | Que hace |
|---|---|
| `npm run dev:clean` | Limpia `.next` y levanta Next dev |
| `npm run preview:clean` | Build limpio y `next start` |
| `npm run healthcheck` | Ejecuta healthcheck PowerShell |
| `npm run qa` | typecheck + tests + build + e2e en orden |

### URL canonica

- **Local:** `http://localhost:3000/`
- **NO usar** `http://127.0.0.1:3000/` en la misma sesion.
- **Checkout:** `https://pay.hotmart.com/V40642188D?off=o3kleyo8&checkoutMode=10&ref=I105893773O&src=meta-co-{section}`

### Sesion tipica segura

```text
1. Ejecutar healthcheck → si falla, cerrar procesos Node.js huerfanos
2. npm run dev:clean (o npm run preview:clean para probar build de produccion)
3. Esperar HTTP 200 + H1 "Suma Microneedling Facial y BBLips a tu cabina"
4. Abrir navegador
5. Verificar hero, precio COP, CTA, mobile
```
