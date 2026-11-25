"use client";

import { useEffect } from "react";

export function StudioMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const sections = document.querySelectorAll<HTMLElement>("[data-studio-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top > window.innerHeight) {
        section.classList.add("will-reveal");
        observer.observe(section);
      }
    });

    function revealForPreference() {
      if (preference.matches) sections.forEach((section) => section.classList.add("is-revealed"));
    }
    preference.addEventListener("change", revealForPreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", revealForPreference);
      sections.forEach((section) => section.classList.remove("will-reveal"));
    };
  }, []);

  return null;
}
