import { describe, expect, it } from "vitest";
import { calculateCopPrice, formatCopPrice, getOfferPricing, parseUsdCopRate } from "./pricing";

describe("pricing", () => {
  it("calculates COP from USD rate", () => {
    expect(calculateCopPrice(10, 3784.7)).toBe(37847);
  });

  it("formats Colombian pesos", () => {
    expect(formatCopPrice(37847)).toContain("37.847");
  });

  it("returns discount and regular pricing", () => {
    expect(getOfferPricing(3784.7)).toMatchObject({
      discountCop: 37847,
      regularCop: 94618,
      discountUsd: 10,
      regularUsd: 25,
    });
  });

  it("parses USD to COP rates from exchange payloads", () => {
    expect(parseUsdCopRate({ rates: { COP: 4000.25 } })).toBe(4000.25);
  });

  it("rejects invalid exchange payloads", () => {
    expect(parseUsdCopRate({ rates: { COP: 0 } })).toBeNull();
    expect(parseUsdCopRate({ rates: {} })).toBeNull();
    expect(parseUsdCopRate(null)).toBeNull();
  });
});
