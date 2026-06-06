export const DEFAULT_USD_COP_RATE = 3784.7;
export const DISCOUNT_PRICE_USD = 10;
export const REGULAR_PRICE_USD = 25;
export const USD_COP_RATE_SOURCE = "https://open.er-api.com/v6/latest/USD";

/* ------------------------------------------------------------------ */
/*  Geo pricing: precios por pais                                      */
/* ------------------------------------------------------------------ */

export interface CountryPricing {
  currency: string;
  symbol: string;
  price: number;
  regularPrice: number;
  locale: string;
}

/**
 * Tabla de precios locales por codigo ISO-3166-1 alpha-2 de pais.
 * Los precios se calculan aproximadamente a partir de 10 USD / 25 USD
 * usando tasas de referencia fijas (no en vivo) para estabilidad.
 */
export const COUNTRY_PRICING: Record<string, CountryPricing> = {
  CO: { currency: "COP", symbol: "$", price: 37847, regularPrice: 94618, locale: "es-CO" },
  MX: { currency: "MXN", symbol: "$", price: 197, regularPrice: 493, locale: "es-MX" },
  AR: { currency: "ARS", symbol: "$", price: 12000, regularPrice: 30000, locale: "es-AR" },
  CL: { currency: "CLP", symbol: "$", price: 9900, regularPrice: 24750, locale: "es-CL" },
  PE: { currency: "PEN", symbol: "S/", price: 39, regularPrice: 98, locale: "es-PE" },
  US: { currency: "USD", symbol: "$", price: 10, regularPrice: 25, locale: "en-US" },
  ES: { currency: "EUR", symbol: "€", price: 10, regularPrice: 25, locale: "es-ES" },
  DEFAULT: { currency: "USD", symbol: "$", price: 10, regularPrice: 25, locale: "es-CO" },
};

/**
 * Nombre largo del pais para mostrar en UI (eyebrow, textos).
 */
export const COUNTRY_NAMES: Record<string, string> = {
  CO: "Colombia",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  PE: "Peru",
  US: "Estados Unidos",
  ES: "Espana",
};

export function getCountryPricing(countryCode: string): CountryPricing {
  return COUNTRY_PRICING[countryCode] ?? COUNTRY_PRICING.DEFAULT;
}

export function getCountryName(countryCode: string): string {
  return COUNTRY_NAMES[countryCode] ?? "Colombia";
}

/**
 * Formatea un precio segun el locale y moneda del pais.
 */
export function formatLocalPrice(value: number, pricing: CountryPricing): string {
  try {
    const formatted = new Intl.NumberFormat(pricing.locale, {
      style: "currency",
      currency: pricing.currency,
      maximumFractionDigits: 0,
    }).format(value);
    return formatted;
  } catch {
    return `${pricing.symbol}${value.toLocaleString("es-CO")} ${pricing.currency}`;
  }
}

/**
 * Retorna el objeto de precio completo listo para enviar al cliente.
 */
export function getGeoPricing(countryCode: string) {
  const pricing = getCountryPricing(countryCode);
  const countryName = getCountryName(countryCode);

  return {
    country: countryCode,
    countryName,
    currency: pricing.currency,
    symbol: pricing.symbol,
    price: pricing.price,
    regularPrice: pricing.regularPrice,
    displayPrice: formatLocalPrice(pricing.price, pricing),
    displayRegularPrice: formatLocalPrice(pricing.regularPrice, pricing),
    usdEquivalent: `${DISCOUNT_PRICE_USD} USD`,
  };
}

/* ------------------------------------------------------------------ */
/*  Funciones legacy (precio COP por tasa de cambio)                   */
/* ------------------------------------------------------------------ */

export function calculateCopPrice(usdPrice: number, usdCopRate = DEFAULT_USD_COP_RATE): number {
  return Math.round(usdPrice * usdCopRate);
}

export function formatCopPrice(value: number): string {
  const formattedValue = new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "COP",
  }).format(value);

  return `${formattedValue.replace(/\s/g, "")} COP`;
}

export function getOfferPricing(usdCopRate = DEFAULT_USD_COP_RATE) {
  const discountCop = calculateCopPrice(DISCOUNT_PRICE_USD, usdCopRate);
  const regularCop = calculateCopPrice(REGULAR_PRICE_USD, usdCopRate);

  return {
    discountUsd: DISCOUNT_PRICE_USD,
    regularUsd: REGULAR_PRICE_USD,
    discountCop,
    regularCop,
    displayDiscountCop: formatCopPrice(discountCop),
    displayRegularCop: formatCopPrice(regularCop),
    usdCopRate,
  };
}

export function parseUsdCopRate(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;

  const rates = "rates" in payload ? payload.rates : null;
  if (!rates || typeof rates !== "object" || !("COP" in rates)) return null;

  const copRate = rates.COP;
  return typeof copRate === "number" && Number.isFinite(copRate) && copRate > 0 ? copRate : null;
}
