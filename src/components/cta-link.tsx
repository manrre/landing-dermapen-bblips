import { ArrowRight } from "lucide-react";

type CtaLinkProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

export function CtaLink({ children, href = "#inscripcion", variant = "primary", className = "" }: CtaLinkProps) {
  const base =
    "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300";
  const styles = {
    primary:
      "bg-[#E8A93A] text-[#081F2D] shadow-[0_18px_45px_rgba(232,169,58,0.28)] hover:-translate-y-0.5 hover:bg-[#f0b94f]",
    secondary:
      "border border-[#0E3A46]/16 bg-white text-[#081F2D] hover:-translate-y-0.5 hover:border-[#E8A93A]/60",
    light:
      "border border-white/18 bg-white/10 text-white backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/16",
  };

  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <ArrowRight aria-hidden="true" size={18} />
    </a>
  );
}
