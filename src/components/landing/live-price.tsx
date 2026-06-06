"use client";

import { useEffect, useState } from "react";

export interface GeoPricing {
  country: string;
  countryName: string;
  currency: string;
  symbol: string;
  price: number;
  regularPrice: number;
  displayPrice: string;
  displayRegularPrice: string;
  usdEquivalent: string;
}

interface LivePriceProps {
  fallback: string;
  type?: "discount" | "regular";
  className?: string;
  /** Si se provee, el componente NO llama a la API y muestra este valor directamente */
  staticPricing?: GeoPricing | null;
  /** Callback opcional para que el padre reciba el pricing detectado */
  onPricing?: (pricing: GeoPricing) => void;
}

export function LivePrice({ fallback, type = "discount", className, staticPricing, onPricing }: LivePriceProps) {
  const [pricing, setPricing] = useState<GeoPricing | null>(staticPricing ?? null);

  useEffect(() => {
    // Si ya tenemos staticPricing, no hacemos fetch
    if (staticPricing) {
      setPricing(staticPricing);
      return;
    }

    let isMounted = true;

    async function loadPricing() {
      try {
        const response = await fetch("/api/pricing", { cache: "no-store" });
        if (!response.ok) return;
        const nextPricing = (await response.json()) as GeoPricing;
        if (isMounted) {
          setPricing(nextPricing);
          onPricing?.(nextPricing);
        }
      } catch {
        if (isMounted) setPricing(null);
      }
    }

    loadPricing();
    const interval = window.setInterval(loadPricing, 30 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, [staticPricing, onPricing]);

  const displayPrice = type === "regular" ? pricing?.displayRegularPrice : pricing?.displayPrice;

  return <span className={className}>{displayPrice ?? fallback}</span>;
}
