import { NextResponse } from "next/server";
import { buildMetaEventPayload, sendMetaEvent, type MetaEventInput } from "@/lib/meta-events";

const allowedEvents = new Set(["PageView", "InitiateCheckout", "Contact"]);

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as MetaEventInput;

    if (!input.eventId || !allowedEvents.has(input.eventName)) {
      return NextResponse.json({ error: "invalid_event" }, { status: 400 });
    }

    const payload = await buildMetaEventPayload(input);
    const result = await sendMetaEvent(payload);

    return NextResponse.json({ ok: true, result });
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }
}
