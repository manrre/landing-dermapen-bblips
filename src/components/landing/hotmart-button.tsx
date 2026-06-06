"use client";

import type { ReactNode } from "react";
import { buildInternalCheckoutUrl, type HotmartSource } from "@/lib/hotmart-links";
import { trackMetaEvent } from "@/lib/meta-client";

interface HotmartButtonProps {
  children: ReactNode;
  source: HotmartSource;
  className?: string;
  variant?: "primary" | "secondary" | "dark";
}

export function HotmartButton({ children, source, className = "", variant = "primary" }: HotmartButtonProps) {
  const href = buildInternalCheckoutUrl(source);

  function handleClick() {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Microneedling Facial + BBLips Yess Lacroix",
      content_category: "online_course",
      source_section: source,
    });
  }

  return (
    <a className={`btn btn-${variant} ${className}`} href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
