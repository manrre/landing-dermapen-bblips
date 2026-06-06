"use client";

import { DISCOUNT_PRICE_USD } from "./pricing";

export type MetaEventName = "PageView" | "InitiateCheckout" | "Contact";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export function createMetaEventId(eventName: MetaEventName) {
  const randomId = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
  return `${eventName.toLowerCase()}_${Date.now()}_${randomId}`;
}

export function trackMetaEvent(
  eventName: MetaEventName,
  customData: Record<string, string | number | boolean | null> = {},
) {
  const eventId = createMetaEventId(eventName);
  const eventSourceUrl = window.location.href;
  const payload = {
    eventName,
    eventId,
    eventSourceUrl,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    customData: {
      currency: "USD",
      value: eventName === "InitiateCheckout" ? DISCOUNT_PRICE_USD : undefined,
      ...customData,
    },
  };

  window.fbq?.("track", eventName, payload.customData, { eventID: eventId });

  // Dev mode: log events to console for testing
  if (process.env.NODE_ENV === "development") {
    console.log(
      `%c[Meta Pixel] %c${eventName} %c| eventId: ${eventId}`,
      "color: #1877F2; font-weight: bold",
      "color: #42b72a; font-weight: bold",
      "color: #888",
    );
  }

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/meta/events", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/meta/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
