"use client";

import { useEffect } from "react";

export function LandingAnimations() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function loadAnimations() {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        return;
      }

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTimeline
          .from(".hero-kicker", { autoAlpha: 0, y: 16, duration: 0.55 })
          .from(".hero-title", { autoAlpha: 0, y: 28, duration: 0.75 }, "-=0.18")
          .from(".hero-copy", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.32")
          .from(".hero-chip", { autoAlpha: 0, y: 14, duration: 0.45, stagger: 0.055 }, "-=0.18")
          .from(".hero-action", { autoAlpha: 0, y: 18, duration: 0.48, stagger: 0.07 }, "-=0.12")
          .from(".hero-price", { autoAlpha: 0, y: 18, scale: 0.98, duration: 0.5 }, "-=0.2");

        gsap.fromTo(
          ".hero-visual",
          { scale: 1.04, autoAlpha: 0.72 },
          { scale: 1, autoAlpha: 1, duration: 1.15, ease: "power2.out" },
        );

        gsap.to(".hero-visual", {
          scale: 1.02,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.from(".hero-particle", {
          autoAlpha: 0,
          scale: 0.25,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.07,
          delay: 0.35,
        });

        gsap.to(".hero-particle", {
          y: "random(-8, 8)",
          x: "random(-6, 6)",
          duration: "random(6, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.12,
        });

        gsap.from(".fibrin-node", {
          autoAlpha: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fibrin-diagram",
            start: "top 76%",
            once: true,
          },
        });

        gsap.from(".fibrin-link", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fibrin-diagram",
            start: "top 76%",
            once: true,
          },
        });

        gsap.from(".biology-node", {
          autoAlpha: 0,
          y: 20,
          rotateX: -8,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".differential-motion",
            start: "top 72%",
            once: true,
          },
        });

        gsap.from(".criterion-card", {
          autoAlpha: 0,
          x: 18,
          duration: 0.5,
          stagger: 0.055,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".differential-motion",
            start: "top 68%",
            once: true,
          },
        });

        ScrollTrigger.batch(".motion-card", {
          start: "top 82%",
          once: true,
          batchMax: 4,
          interval: 0.08,
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.58, ease: "power3.out", stagger: 0.07, overwrite: true },
            );
          },
        });

        gsap.from(".evolution-card", {
          autoAlpha: 0,
          y: 32,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".evolution-section",
            start: "top 70%",
            once: true,
          },
        });

        gsap.fromTo(
          ".evolution-track",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: ".evolution-section",
              start: "top 72%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          },
        );

        gsap.from(".floating-cta", {
          autoAlpha: 0,
          y: 18,
          scale: 0.96,
          duration: 0.42,
          ease: "power2.out",
          delay: 0.5,
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".hero-kicker, .hero-title, .hero-copy, .hero-action, .hero-price", {
          autoAlpha: 0,
          y: 14,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.045,
        });

        gsap.from(".floating-cta", {
          autoAlpha: 0,
          y: 12,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.45,
        });

        ScrollTrigger.batch(".mobile-reveal", {
          start: "top 88%",
          once: true,
          batchMax: 3,
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.045, overwrite: true },
            );
          },
        });
      });

      cleanup = () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    void loadAnimations();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
