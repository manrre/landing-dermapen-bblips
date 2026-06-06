import Image from "next/image";
import { Activity, Microscope, Sparkles } from "lucide-react";

type ImagePanelProps = {
  src: string;
  label: string;
  className?: string;
  available?: boolean;
  priority?: boolean;
  sizes?: string;
  variant?: "hero" | "card" | "dark";
};

export function ImagePanel({
  src,
  label,
  className = "",
  available = true,
  priority = false,
  sizes = "100vw",
  variant = "card",
}: ImagePanelProps) {
  return (
    <div className={`relative overflow-hidden bg-[linear-gradient(135deg,#f8fafa,#e8eef0)] ${className}`} role="img" aria-label={label}>
      {available ? (
        <Image
          src={src}
          alt=""
          fill
          aria-hidden="true"
          className="object-cover"
          priority={priority}
          sizes={sizes}
        />
      ) : (
        <FallbackVisual label={label} variant={variant} />
      )}
    </div>
  );
}

function FallbackVisual({ label, variant }: { label: string; variant: "hero" | "card" | "dark" }) {
  const dark = variant === "dark" || variant === "hero";

  return (
    <div
      className={`relative flex h-full min-h-full w-full items-center justify-center overflow-hidden ${
        dark
          ? "bg-[radial-gradient(circle_at_74%_18%,rgba(232,169,58,0.22),transparent_32%),linear-gradient(135deg,#081F2D,#0E3A46)]"
          : "bg-[radial-gradient(circle_at_70%_20%,rgba(232,169,58,0.18),transparent_34%),linear-gradient(135deg,#F8FAFA,#E8EEF0)]"
      }`}
    >
      <div className="absolute inset-0 opacity-70">
        <svg viewBox="0 0 640 480" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`fibrin-${label}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={dark ? "#D8B978" : "#0E3A46"} stopOpacity="0.2" />
              <stop offset="52%" stopColor="#E8A93A" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#3AAFA9" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          {Array.from({ length: 14 }).map((_, index) => (
            <path
              key={index}
              d={`M ${-40 + index * 42} ${330 - index * 13} C ${130 + index * 16} ${150 + index * 7}, ${350 - index * 14} ${430 - index * 11}, ${700 - index * 24} ${190 + index * 10}`}
              fill="none"
              stroke={`url(#fibrin-${label})`}
              strokeWidth={index % 3 === 0 ? 2.2 : 1.2}
            />
          ))}
          {Array.from({ length: 18 }).map((_, index) => (
            <circle
              key={`dot-${index}`}
              cx={80 + ((index * 97) % 500)}
              cy={95 + ((index * 53) % 300)}
              r={index % 4 === 0 ? 8 : 4}
              fill="#E8A93A"
              opacity={index % 4 === 0 ? 0.72 : 0.36}
            />
          ))}
        </svg>
      </div>
      <div className={`relative flex h-20 w-20 items-center justify-center rounded-full border backdrop-blur-xl ${
        dark ? "border-white/18 bg-white/10 text-[#D8B978]" : "border-[#0E3A46]/10 bg-white/65 text-[#0E3A46]"
      }`}>
        {label.toLowerCase().includes("facial") ? <Sparkles size={30} /> : label.toLowerCase().includes("prp") ? <Microscope size={30} /> : <Activity size={30} />}
      </div>
    </div>
  );
}
