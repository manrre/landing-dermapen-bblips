# Project Operating Memory

> Memoria operativa canónica del proyecto `dermapen-bblips-landing`.
> Toda sesión agentica debe consultar este documento antes de levantar servidor, abrir navegador o modificar copy/checkout/tracking.

## 1. Documentos Del Proyecto

| Rol | Documento | Descripción |
|---|---|---|
| **Especificación canónica** | [dermapen-bblips-landing-dev-spec.md](dermapen-bblips-landing-dev-spec.md) | Oferta, audiencia, arquitectura, agentes, backlogs, riesgos, criterios de aceptación. Es la fuente de verdad del producto. |
| **Bitácora viva** | [landing-growth-action-plan.md](landing-growth-action-plan.md) | Diagnóstico comercial, acciones aplicadas, browser automation, pendientes recomendados, protocolo operativo. Se actualiza con cada cambio de conversión. |
| **Histórico / referencia** | [landing-implementation-plan.md](landing-implementation-plan.md) | Plan original de implementación (Next.js + formulario + n8n). Mantener como referencia histórica; ya no refleja el stack actual con checkout Hotmart directo. |

## 2. URL Canónica

- **URL local oficial:** `http://localhost:3000/`
- **NO usar** `http://127.0.0.1:3000/` durante la misma sesión para evitar problemas de origen, cookies y caché.
- **Checkout Hotmart base:** `https://pay.hotmart.com/V40642188D?off=o3kleyo8&checkoutMode=10&ref=I105893773O`

## 3. Skills Obligatorias Por Tipo De Tarea

| Tipo de tarea | Skill(s) obligatoria(s) |
|---|---|
| Browser / local preview | `browser` — solo después de healthcheck HTTP exitoso. Si Browser MCP falla, usar Playwright local como fallback documentado. |
| Auditoría de operación agentica | `agentic-system-auditor` — usar ante fallos repetidos, problemas de orquestación, handoffs, tiempos o subagentes. |
| Landing / conversión | `web-quality-audit`, `seo`, `performance`, `accessibility-a11y`, `hotmart-affiliate-links` |
| Cambios de copy / oferta / CTA | `landing-page-creator`, `grand-slam-offer`, `hotmart-affiliate-links` |
| Cambios visuales / layout | `premium-frontend-ui`, `tailwindcss`, `accessibility-a11y` |
| Tracking / analytics | `conversion-tracker`, `performance` |
| 3D / animación | `gsap-scrolltrigger`, `gsap-react`, `framer-motion` |
| Compliance | `compliance-checker` |

## 4. Protocolo De Subagentes Y Revisiones Independientes

Cuando un cambio afecta conversión, copy, mobile, tracking o checkout, se deben ejecutar **mínimo** estos subagentes de revisión independiente antes de hacer merge o deploy:

| Subagente | Responsabilidad | Gate |
|---|---|---|
| **Conversion Reviewer** | Oferta, hero, CTA, objeciones, garantía, urgencia | El hero comunica producto/precio/CTA en < 5s |
| **UX/Mobile Reviewer** | Proporciones, scroll, visibilidad de CTA, overflow horizontal | No hay overflow en 390px; CTA visible sin scroll excesivo |
| **Hotmart Attribution Reviewer** | Preserva `ref`, `off`, `checkoutMode`, `src` en todos los CTAs | 100% de CTAs tienen parámetros correctos |
| **Compliance Reviewer** | Claims médicos, ingresos, certificado, garantía, disclaimer legal | Ningún claim médico absoluto ni financiero garantizado |
| **Browser QA Agent** | Playwright desktop + mobile, evidencia visual | Screenshots de hero, precio, CTA y mobile sin errores |

## 5. Protocolo Exacto Para Levantar / Verificar Landing Local

### Paso 0: Verificar estado del puerto

```powershell
# Detectar si hay algo en puerto 3000
$existing = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "⚠ Puerto 3000 ocupado. Verificar si es un servidor Next válido o basura."
}
```

### Paso 1: Cerrar servidor viejo si falla healthcheck

```powershell
# Si el servidor existente no pasa healthcheck, cerrarlo
$response = try { Invoke-WebRequest -UseBasicParsing http://localhost:3000/ -TimeoutSec 5 } catch { $null }
if (-not $response -or $response.StatusCode -ne 200) {
    Write-Host "⚠ Servidor existente no saludable. Cerrando procesos Next.js..."
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
}
```

### Paso 2: Para desarrollo

```powershell
# Limpiar .next SOLO si hay manifiestos vacíos, chunks faltantes o errores MODULE_NOT_FOUND
# Regla: no limpiar .next por rutina; solo cuando hay evidencia de corrupción.

npm.cmd run dev -- --hostname 0.0.0.0 --port 3000
```

### Paso 3: Para preview de producción local

```powershell
npm.cmd run build
# Confirmar que .next/BUILD_ID existe
if (-not (Test-Path ".next/BUILD_ID")) {
    Write-Error "BUILD_ID no encontrado. El build falló o está incompleto."
    exit 1
}
npm.cmd run start -- --port 3000
```

### Paso 4: Healthcheck obligatorio antes de abrir navegador

```powershell
# Verificar HTTP 200
$response = Invoke-WebRequest -UseBasicParsing http://localhost:3000/ -TimeoutSec 10
if ($response.StatusCode -ne 200) {
    Write-Error "Healthcheck fallido: status $($response.StatusCode)"
    exit 1
}

# Verificar H1 esperado
if ($response.Content -notmatch "Suma Microneedling Facial y BBLips a tu cabina") {
    Write-Error "Healthcheck fallido: H1 no encontrado en la respuesta."
    exit 1
}

Write-Host "✓ Healthcheck exitoso: 200 + H1 presente"
```

### Paso 5: Abrir navegador SOLO después de healthcheck exitoso

```powershell
# Ahora sí: abrir browser o lanzar Playwright
Start-Process "http://localhost:3000/"
```

## 6. Protocolo Playwright

- **NO** usar `reuseExistingServer: true` sin healthcheck previo.
- Dejar que Playwright levante su propio servidor limpio, o ejecutar healthcheck manual antes.
- Si Playwright falla por timeout, **capturar logs y auditar**; NO repetir el mismo comando.
- Usar siempre `http://localhost:3000` como `baseURL` y `url` del `webServer`.

## 7. Reglas Duras Que Nunca Se Deben Romper

1. No abrir browser hasta que `Invoke-WebRequest http://localhost:3000/` devuelva `200`.
2. No usar `next start` sin `npm run build` previo y sin `.next/BUILD_ID` presente.
3. No alternar entre `localhost` y `127.0.0.1` en la misma sesión.
4. No usar Playwright con `reuseExistingServer: true` si el servidor actual no pasó healthcheck.
5. No dejar procesos Next.js antiguos vivos entre sesiones.
6. Nunca quitar `ref=I105893773O` de los enlaces Hotmart.
7. Nunca quitar `off=o3kleyo8` de los enlaces Hotmart.
8. No usar claims médicos absolutos ni prometer ingresos garantizados.

## 8. Diagnóstico De `.next`

| Condición | Estado | Acción |
|---|---|---|
| `.next/BUILD_ID` existe + `.next/standalone/` o `.next/server/pages/` tiene contenido | Producción válido | Usar con `next start` |
| `.next/static/development/` existe + sin `BUILD_ID` | Dev build | Usar con `next dev` |
| `.next/` existe pero `BUILD_ID` ausente y sin `static/development/` | Incompleto / corrupto | Limpiar y rebuild |
| `.next/` contiene `cache/` pero faltan chunks en `static/chunks/` | Parcial / roto | Limpiar y rebuild |
| `.next/BUILD_ID` existe pero `routes-manifest.json` ausente | Build interrumpido | Limpiar y rebuild |

## 9. Scripts Operativos Disponibles

| Script | Descripción |
|---|---|
| `npm run dev:clean` | Limpia `.next` y levanta Next dev |
| `npm run preview:clean` | Build limpio y `next start` |
| `npm run healthcheck` | Ejecuta `scripts/landing-local-healthcheck.ps1` |
| `npm run qa` | Typecheck + tests + build + e2e en orden |

## 10. Flujo Completo De Sesión Segura

```text
1. Ejecutar healthcheck → ¿puerto 3000 ocupado por servidor saludable?
   ├── Sí, saludable → Usar servidor existente, ir a paso 4
   └── No → Continuar a paso 2

2. Cerrar procesos Node.js huérfanos si existen

3. Levantar servidor según modo:
   ├── Desarrollo: npm run dev:clean
   └── Preview: npm run preview:clean

4. Esperar healthcheck HTTP 200 + H1 presente

5. Abrir browser / lanzar Playwright

6. Verificación manual final:
   ├── Hero visible con producto, precio y CTA
   ├── Precio COP visible
   ├── CTA Hotmart funcional
   └── Mobile sin overflow horizontal en 390px
```
