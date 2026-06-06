<#
.SYNOPSIS
    Healthcheck para la landing Dermapen + BBLips en localhost:3000.

.DESCRIPTION
    Verifica que el servidor local responda HTTP 200, que el HTML contenga
    el H1 esperado, y diagnostica el estado del directorio .next.
    No modifica ni borra nada sin la opcion -Clean.

.PARAMETER Clean
    Si se especifica, limpia el directorio .next y procesos Next.js huerfanos.

.PARAMETER Port
    Puerto a verificar. Default: 3000.

.EXAMPLE
    .\scripts\landing-local-healthcheck.ps1
    Verifica salud del servidor y estado de .next.

.EXAMPLE
    .\scripts\landing-local-healthcheck.ps1 -Clean
    Limpia .next y procesos huerfanos, luego verifica.
#>

param(
    [switch]$Clean,
    [int]$Port = 3000
)

$ErrorActionPreference = "Stop"
$BaseUrl = "http://localhost:$Port/"
$ExpectedH1 = "Suma Microneedling Facial y BBLips a tu cabina"
$ExitCode = 0

function Write-Step {
    param($message)
    Write-Host ""
    Write-Host "--- $message ---" -ForegroundColor Cyan
}

function Write-Pass {
    param($message)
    Write-Host "  [PASS] $message" -ForegroundColor Green
}

function Write-Fail {
    param($message)
    Write-Host "  [FAIL] $message" -ForegroundColor Red
    $script:ExitCode = 1
}

function Write-Warn {
    param($message)
    Write-Host "  [WARN] $message" -ForegroundColor Yellow
}

function Write-Info {
    param($message)
    Write-Host "  [INFO] $message" -ForegroundColor Gray
}

# === Clean mode ==============================================
if ($Clean) {
    Write-Step "CLEAN MODE: Cerrando procesos Node.js y limpiando .next"

    $nodeProcs = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcs) {
        Write-Info "Cerrando $($nodeProcs.Count) proceso(s) Node.js..."
        $nodeProcs | Stop-Process -Force
        Start-Sleep -Seconds 2
        Write-Pass "Procesos Node.js cerrados"
    } else {
        Write-Info "No hay procesos Node.js vivos"
    }

    if (Test-Path ".next") {
        Write-Info "Eliminando .next..."
        Remove-Item -Recurse -Force ".next"
        Write-Pass ".next eliminado"
    } else {
        Write-Info ".next no existe, nada que limpiar"
    }
}

# === 1. Port check ===========================================
Write-Step "1. VERIFICANDO PUERTO $Port"

$tcpConnection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($tcpConnection) {
    $proc = Get-Process -Id $tcpConnection.OwningProcess -ErrorAction SilentlyContinue
    Write-Info "Puerto $Port ocupado por: $($proc.ProcessName) (PID: $($proc.Id))"
} else {
    Write-Warn "Puerto $Port libre - no hay servidor escuchando"
}

# === 2. HTTP healthcheck =====================================
Write-Step "2. VERIFICANDO HTTP 200 EN $BaseUrl"

try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $BaseUrl -TimeoutSec 60
    if ($response.StatusCode -eq 200) {
        Write-Pass "HTTP 200 OK"
    } else {
        Write-Fail "HTTP $($response.StatusCode) - esperado 200"
    }
} catch {
    Write-Fail "No se pudo conectar a $BaseUrl : $_"
}

# === 3. H1 verification ======================================
Write-Step "3. VERIFICANDO H1 ESPERADO"

if ($response -and $response.Content) {
    $content = $response.Content
    $contentLength = $content.Length
    Write-Info "HTML recibido: $contentLength caracteres"

    if ($content -match [regex]::Escape($ExpectedH1)) {
        Write-Pass "H1 encontrado: '$ExpectedH1'"
    } else {
        Write-Fail "H1 NO encontrado: '$ExpectedH1'"

        # Extraer posibles H1 del HTML para diagnostico
        $h1Matches = [regex]::Matches($content, '<h1[^>]*>(.*?)</h1>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if ($h1Matches.Count -gt 0) {
            Write-Info "H1 encontrados en el HTML:"
            foreach ($match in $h1Matches) {
                $h1Text = $match.Groups[1].Value -replace '<[^>]+>', '' -replace '\s+', ' '
                Write-Info "  -> '$h1Text'"
            }
        } else {
            Write-Warn "No se encontro ninguna etiqueta H1 en el HTML"
        }
    }
}

# === 4. .next diagnosis ======================================
Write-Step "4. DIAGNOSTICO DE .next"

if (Test-Path ".next") {
    $hasBuildId = Test-Path ".next/BUILD_ID"
    $hasRoutesManifest = Test-Path ".next/routes-manifest.json"
    $hasDevMarkers = Test-Path ".next/static/development"
    $hasServerPages = Test-Path ".next/server/pages-manifest.json"
    $hasChunks = Test-Path ".next/static/chunks"

    Write-Info "Checklist:"
    Write-Info "  BUILD_ID: $hasBuildId"
    Write-Info "  routes-manifest.json: $hasRoutesManifest"
    Write-Info "  static/development/: $hasDevMarkers"
    Write-Info "  server/pages-manifest.json: $hasServerPages"
    Write-Info "  static/chunks/: $hasChunks"

    if ($hasBuildId -and $hasRoutesManifest -and $hasServerPages) {
        Write-Pass ".next es un BUILD DE PRODUCCION valido"
        if ($Clean) {
            Write-Warn ".next de produccion fue limpiado. Vuelve a ejecutar 'npm run build'."
        }
    } elseif ($hasDevMarkers -and -not $hasBuildId) {
        Write-Pass ".next es un DEV BUILD (desarrollo)"
        if ($Clean) {
            Write-Warn ".next de desarrollo fue limpiado. Vuelve a ejecutar 'npm run dev'."
        }
    } elseif (-not $hasBuildId -and -not $hasDevMarkers) {
        Write-Fail ".next INCOMPLETO O CORRUPTO - no es dev ni produccion valido"
        Write-Info "  Recomendacion: ejecutar 'npm run dev:clean' o 'npm run preview:clean'"
    } elseif ($hasBuildId -and -not $hasRoutesManifest) {
        Write-Fail ".next tiene BUILD_ID pero falta routes-manifest.json - BUILD INTERRUMPIDO"
        Write-Info "  Recomendacion: ejecutar 'npm run preview:clean'"
    } elseif (-not $hasChunks) {
        Write-Fail ".next sin static/chunks/ - faltan assets compilados"
        Write-Info "  Recomendacion: ejecutar 'npm run dev:clean' o 'npm run preview:clean'"
    } else {
        Write-Warn ".next en estado AMBIGUO - revisar manualmente"
    }
} else {
    Write-Warn ".next NO EXISTE. Ejecuta 'npm run dev' o 'npm run build' primero."
    $ExitCode = 1
}

# === 5. Resumen ==============================================
Write-Step "5. RESUMEN"

if ($ExitCode -eq 0) {
    Write-Host ""
    Write-Host "  +++ HEALTHCHECK APROBADO +++" -ForegroundColor Green
    Write-Host "  El servidor esta listo para abrir en $BaseUrl" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "  --- HEALTHCHECK FALLIDO ---" -ForegroundColor Red
    Write-Host "  Revisa los errores arriba antes de abrir el navegador." -ForegroundColor Red
    Write-Host "  Para limpiar y empezar de cero: .\scripts\landing-local-healthcheck.ps1 -Clean" -ForegroundColor Yellow
    Write-Host ""
}

exit $ExitCode
