import { headers } from "next/headers";

export type MetaEventName = "PageView" | "InitiateCheckout" | "Contact";

export interface MetaEventInput {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, string | number | boolean | null>;
}

interface MetaEventPayload extends MetaEventInput {
  clientIpAddress?: string;
  clientUserAgent?: string;
}

function getMetaConfig() {
  return {
    accessToken: process.env.META_CAPI_ACCESS_TOKEN,
    graphVersion: process.env.META_GRAPH_VERSION ?? "v21.0",
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    testEventCode: process.env.META_CAPI_TEST_EVENT_CODE,
  };
}

function getClientIp(headerStore: Headers): string | undefined {
  const forwardedFor = headerStore.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim();

  return headerStore.get("x-real-ip") ?? undefined;
}

export async function buildMetaEventPayload(input: MetaEventInput): Promise<MetaEventPayload> {
  const headerStore = await headers();

  return {
    ...input,
    clientIpAddress: getClientIp(headerStore),
    clientUserAgent: headerStore.get("user-agent") ?? undefined,
  };
}

export async function sendMetaEvent(input: MetaEventPayload) {
  const config = getMetaConfig();

  if (!config.pixelId || !config.accessToken) {
    return { skipped: true, reason: "missing_meta_env" };
  }

  const userData: Record<string, string> = {};
  if (input.clientIpAddress) userData.client_ip_address = input.clientIpAddress;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const event = {
    event_name: input.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    action_source: "website",
    event_source_url: input.eventSourceUrl,
    user_data: userData,
    custom_data: input.customData,
  };

  const body = {
    data: [event],
    ...(config.testEventCode ? { test_event_code: config.testEventCode } : {}),
  };

  const response = await fetch(`https://graph.facebook.com/${config.graphVersion}/${config.pixelId}/events`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...body, access_token: config.accessToken }),
  });

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      body: await response.text(),
    };
  }

  return response.json();
}
