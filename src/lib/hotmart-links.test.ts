import { describe, expect, it } from "vitest";
import { buildHotmartUrl, buildInternalCheckoutUrl, getHotmartParams, hotmartSources, type HotmartSource } from "./hotmart-links";

const sources: HotmartSource[] = [
  "meta-co-hero",
  "meta-co-trust",
  "meta-co-roi",
  "meta-co-faq",
  "meta-co-final",
  "meta-co-wa",
];

describe("hotmart affiliate links", () => {
  it("keeps a stable source allowlist", () => {
    expect(hotmartSources).toEqual(sources);
  });

  it.each(sources)("preserves affiliate and discount params for %s", (source) => {
    const url = new URL(buildHotmartUrl(source));

    expect(url.hostname).toBe("pay.hotmart.com");
    expect(url.pathname).toBe("/V40642188D");
    expect(url.searchParams.get("ref")).toBe("I105893773O");
    expect(url.searchParams.get("off")).toBe("o3kleyo8");
    expect(url.searchParams.get("checkoutMode")).toBe("10");
    expect(url.searchParams.get("src")).toBe(source);
    expect(url.searchParams.has("bid")).toBe(false);
  });

  it("returns params for analytics payloads", () => {
    expect(getHotmartParams("meta-co-hero")).toEqual({
      ref: "I105893773O",
      off: "o3kleyo8",
      checkoutMode: "10",
      src: "meta-co-hero",
    });
  });

  it("builds internal checkout URLs for public landing buttons", () => {
    expect(buildInternalCheckoutUrl("meta-co-hero")).toBe("/go/meta-co-hero");
  });
});
