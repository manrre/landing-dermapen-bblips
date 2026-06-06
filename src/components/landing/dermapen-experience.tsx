"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { courseBenefitSlides } from "@/data/dermapen-landing";

export function CourseBenefitSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Dynamic import: GSAP solo se carga cuando este componente se monta
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".benefit-slide-card").forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 70,
                rotate: index % 2 === 0 ? -3 : 3,
                scale: 0.94,
              },
              {
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  end: "top 45%",
                  scrub: true,
                },
              },
            );
          });

          gsap.fromTo(
            cards,
            { xPercent: 8 },
            {
              xPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }, section);

        return () => ctx.revert();
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="benefit-slider section-pad" id="metodo">
      <div className="container-page benefit-slider-heading">
        <p className="eyebrow">Beneficios del curso</p>
        <h2>Aprende el paso a paso antes de invertir en equipos o atender modelos</h2>
        <p>
          El curso combina clases online, recursos descargables y referencias visuales para que puedas estudiar
          con orden antes de invertir en materiales o atender a una persona.
        </p>
      </div>
      <div ref={cardsRef} className="container-page benefit-slide-track">
        {courseBenefitSlides.map((slide) => {
          const isVideo = slide.media.endsWith(".mp4");

          return (
            <article className="benefit-slide-card" key={slide.title}>
              <div className="benefit-slide-media">
                {isVideo ? (
                  <video autoPlay muted loop playsInline preload="none" controls controlsList="nodownload noremoteplayback">
                    <source src={slide.media} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={slide.media} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="benefit-slide-img" loading="lazy" />
                )}
              </div>
              <div className="benefit-slide-copy">
                <span>{slide.label}</span>
                <small>{slide.tone}</small>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
