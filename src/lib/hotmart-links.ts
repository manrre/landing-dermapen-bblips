export type HotmartSource =
  | "meta-co-hero"
  | "meta-co-trust"
  | "meta-co-roi"
  | "meta-co-faq"
  | "meta-co-final"
  | "meta-co-floating"
  | "meta-co-wa";

export const hotmartSources: HotmartSource[] = [
  "meta-co-hero",
  "meta-co-trust",
  "meta-co-roi",
  "meta-co-faq",
  "meta-co-final",
  "meta-co-floating",
  "meta-co-wa",
];

const BASE_CHECKOUT_URL = "https://pay.hotmart.com/V40642188D";

const REQUIRED_PARAMS = {
  off: "o3kleyo8",
  checkoutMode: "10",
  ref: "I105893773O",
};

export const whatsappUrl =
  "https://wa.me/573118745095?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20el%20curso%20Dermapen%20%2B%20BBLips";

export function buildHotmartUrl(source: HotmartSource): string {
  const url = new URL(BASE_CHECKOUT_URL);

  Object.entries(REQUIRED_PARAMS).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  url.searchParams.set("src", source);

  return url.toString();
}

export function buildInternalCheckoutUrl(source: HotmartSource): string {
  return `/go/${source}`;
}

export function getHotmartParams(source: HotmartSource) {
  return {
    ...REQUIRED_PARAMS,
    src: source,
  };
}
