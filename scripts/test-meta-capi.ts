/**
 * Script de prueba para Meta Conversions API
 * Envia eventos de test a Meta Graph API y verifica respuestas.
 *
 * Uso:
 *   npx tsx scripts/test-meta-capi.ts
 *
 * Requiere: NEXT_PUBLIC_META_PIXEL_ID y META_CAPI_ACCESS_TOKEN en .env
 * Opcional: META_CAPI_TEST_EVENT_CODE si quieres que aparezcan en Events Manager > Test Events
 */

import { createHash, randomUUID } from "crypto";

// ── Cargar .env manualmente ──────────────────────────────
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(".env") });

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v21.0";
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE || undefined;

// ── Helpers ───────────────────────────────────────────────
function hash(data: string): string {
  return createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

function createEventId(eventName: string): string {
  return `${eventName.toLowerCase()}_${Date.now()}_${randomUUID().slice(0, 8)}`;
}

// ── Enviar evento a la API local ─────────────────────────
async function testLocalAPI() {
  console.log("\n━━━ 1. Test de API Local (/api/meta/events) ━━━\n");

  const events = [
    {
      eventName: "PageView",
      eventId: createEventId("pageview_test"),
      eventSourceUrl: "http://localhost:3000/",
    },
    {
      eventName: "InitiateCheckout",
      eventId: createEventId("initiatecheckout_test"),
      eventSourceUrl: "http://localhost:3000/",
      customData: {
        content_name: "Microneedling Facial + BBLips",
        content_category: "online_course",
        currency: "USD",
        value: 10,
        source_section: "meta-co-hero",
      },
    },
  ];

  for (const event of events) {
    console.log(`Enviando ${event.eventName}...`);
    try {
      const res = await fetch("http://localhost:3000/api/meta/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(event),
      });
      const data = await res.json();
      const icon = res.ok ? "✅" : "❌";
      console.log(`  ${icon} ${event.eventName} →`, JSON.stringify(data, null, 2).slice(0, 300));
    } catch (err) {
      console.log(`  ❌ ${event.eventName} → Error:`, err);
    }
  }
}

// ── Enviar evento directo a Graph API ─────────────────────
async function testGraphAPIDirect() {
  console.log("\n━━━ 2. Test Directo a Meta Graph API ━━━\n");

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.log("❌ Faltan NEXT_PUBLIC_META_PIXEL_ID o META_CAPI_ACCESS_TOKEN en .env");
    return;
  }

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`;
  const eventId = createEventId("purchase_test");

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: "http://localhost:3000/",
        user_data: {
          em: hash("test@example.com"),
          client_ip_address: "190.0.0.1",
          client_user_agent: "Mozilla/5.0 (Windows NT 10.0) Test Script",
        },
        custom_data: {
          value: 10.0,
          currency: "USD",
          content_name: "Dermapen + BBLips Test",
          content_category: "online_course",
        },
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  if (TEST_EVENT_CODE) {
    body.test_event_code = TEST_EVENT_CODE;
    console.log(`Modo TEST con codigo: ${TEST_EVENT_CODE}`);
  } else {
    console.log("Modo PRODUCCION (sin test_event_code)");
  }

  console.log(`POST ${url}`);
  console.log(`Event ID: ${eventId}`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok) {
      console.log("✅ Graph API respondio OK:", JSON.stringify(data, null, 2));
    } else {
      console.log("❌ Graph API respondio ERROR:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.log("❌ Error de red:", err);
  }
}

// ── Verificar configuracion ──────────────────────────────
function checkConfig() {
  console.log("━━━ Configuracion Detectada ━━━\n");
  console.log(`Pixel ID:     ${PIXEL_ID ? `✅ ${PIXEL_ID}` : "❌ FALTA"}`);
  console.log(`Access Token: ${ACCESS_TOKEN ? `✅ ${ACCESS_TOKEN.slice(0, 15)}...` : "❌ FALTA"}`);
  console.log(`Graph Version: ${GRAPH_VERSION}`);
  console.log(`Test Code:    ${TEST_EVENT_CODE ? `🧪 ${TEST_EVENT_CODE}` : "⚠️ Sin test code → eventos se envian a produccion"}`);
  console.log(`Modo:         ${TEST_EVENT_CODE ? "TEST (no afecta metricas)" : "PRODUCCION (afecta metricas reales)"}`);
}

// ── Main ──────────────────────────────────────────────────
async function main() {
  console.clear();
  console.log("╔══════════════════════════════════════════╗");
  console.log("║   Meta Conversions API — Test Script     ║");
  console.log("╚══════════════════════════════════════════╝");

  checkConfig();

  // Solo probar API local si el servidor esta corriendo
  try {
    const health = await fetch("http://localhost:3000/api/pricing");
    if (health.ok) {
      await testLocalAPI();
    }
  } catch {
    console.log("\n━━━ 1. API Local ━━━");
    console.log("⚠️  Servidor no detectado en localhost:3000 — saltando test local");
    console.log("   Inicia el servidor con: npm run dev");
  }

  await testGraphAPIDirect();

  console.log("\n━━━ Resultados ━━━");
  console.log("Si ves respuestas OK arriba, la integracion funciona correctamente.");
  console.log("Para ver eventos en Meta: Events Manager → Pixel → Test Events\n");
}

main();
