type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p
          className={`mb-4 text-sm font-bold uppercase tracking-[0.18em] ${
            dark ? "text-[#D8B978]" : "text-[#0E3A46]"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-balance text-3xl font-semibold leading-tight md:text-5xl ${
          dark ? "text-white" : "text-[#081F2D]"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-5 text-pretty text-lg leading-8 ${dark ? "text-white/72" : "text-[#4B5563]"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
