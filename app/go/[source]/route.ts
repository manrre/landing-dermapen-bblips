import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { buildHotmartUrl, hotmartSources, type HotmartSource } from "@/lib/hotmart-links";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ source: string }> }) {
  const { source } = await params;

  if (!hotmartSources.includes(source as HotmartSource)) {
    redirect(buildHotmartUrl("meta-co-final"));
  }

  redirect(buildHotmartUrl(source as HotmartSource));
}
