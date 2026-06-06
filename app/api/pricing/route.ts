import { NextRequest, NextResponse } from "next/server";
import { getGeoPricing } from "@/lib/pricing";

export const dynamic = "force-dynamic";

/**
 * Conjunto de IPs locales / loopback que no deben consultar APIs externas.
 */
const LOCAL_IPS = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1", "localhost", "0.0.0.0"]);

/**
 * Extrae la IP real del visitante desde los headers de la request.
 */
function extractClientIp(request: NextRequest): string {
  // 1. x-forwarded-for: puede tener varias IPs (cliente, proxy1, proxy2)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  // 2. x-real-ip: header comun en nginx/reverse-proxy
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  // 3. fallback: IP remota directa
  const remoteIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";

  return remoteIp;
}

/**
 * Geolocaliza una IP usando ip-api.com (plan gratuito, 45 req/min).
 * Si falla, intenta ipapi.co (plan gratuito, 1000 req/dia).
 * Si ambos fallan, retorna null.
 */
async function geoLocateCountry(ip: string): Promise<string | null> {
  // Intentar con ip-api.com (mas rapido, sin API key)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 800);

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });

    if (response.ok) {
      const data = (await response.json()) as { countryCode?: string };
      if (data.countryCode && /^[A-Z]{2}$/.test(data.countryCode)) {
        return data.countryCode;
      }
    }
  } catch {
    // Fall through al siguiente proveedor
  } finally {
    clearTimeout(timeoutId);
  }

  // Fallback: ipapi.co
  const controller2 = new AbortController();
  const timeoutId2 = setTimeout(() => controller2.abort(), 800);

  try {
    const response = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: controller2.signal,
      headers: { accept: "text/plain" },
    });

    if (response.ok) {
      const countryCode = (await response.text()).trim();
      if (/^[A-Z]{2}$/.test(countryCode)) {
        return countryCode;
      }
    }
  } catch {
    // Ambos fallaron
  } finally {
    clearTimeout(timeoutId2);
  }

  return null;
}

export async function GET(request: NextRequest) {
  const clientIp = extractClientIp(request);
  let countryCode = "DEFAULT";

  // Si la IP es local, usar Colombia como default (mercado principal)
  if (!LOCAL_IPS.has(clientIp)) {
    const detected = await geoLocateCountry(clientIp);
    if (detected) {
      countryCode = detected;
    }
  } else {
    // IP local: asumir Colombia (mercado principal)
    countryCode = "CO";
  }

  return NextResponse.json(getGeoPricing(countryCode));
}
