import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let context: gsap.Context | null = null;
let refreshBound = false;

function bindRefresh(): void {
  if (refreshBound) return;
  refreshBound = true;
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}

export function initScrollMotion(): void {
  const root = document.documentElement;
  context?.revert();
  context = null;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    root.classList.remove("has-motion");
    return;
  }

  bindRefresh();

  try {
    context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .fromTo(
          "[data-hero-line]",
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.09 },
        )
        .fromTo(
          "[data-hero-meta]",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.35,
        );

      const hero = document.querySelector("[data-hero]");
      if (hero) {
        gsap.to("[data-hero-copy]", {
          yPercent: -14,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-cue]", {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "35% top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: Number.parseFloat(element.dataset.revealDelay ?? "0"),
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll("[data-reveal-item]"),
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          },
        );
      });
    }, root);
  } catch (error) {
    console.error("Motion init failed", error);
    root.classList.remove("has-motion");
    return;
  }

  root.classList.remove("has-motion");
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
