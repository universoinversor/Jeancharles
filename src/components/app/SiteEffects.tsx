"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Efectos de presentación que dependen del DOM de cada página:
 * reveal al hacer scroll, contadores, progreso de la línea de tiempo,
 * cursor y botones magnéticos. Se re-ejecuta en cada navegación y limpia todo.
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    // Reveal
    const reveals = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)");
    if (reduce) reveals.forEach((el) => el.classList.add("is-in"));
    else {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      reveals.forEach((el) => io.observe(el));
      observers.push(io);
    }

    // Contadores
    const run = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      if (reduce) { el.textContent = String(target); return; }
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / 1800, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 4))));
        if (t < 1 && !signal.aborted) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const co = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { run(en.target as HTMLElement); co.unobserve(en.target); }
      }),
      { threshold: 0.6 },
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => co.observe(el));
    observers.push(co);

    // Línea de tiempo
    const journey = document.querySelector<HTMLElement>(".journey");
    if (journey) {
      const rail = journey.querySelector<HTMLElement>(".journey__rail");
      const steps = journey.querySelectorAll<HTMLElement>(".step");
      const update = () => {
        const r = journey.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(Math.max((vh * 0.75 - r.top) / (r.height + vh * 0.25), 0), 1);
        rail?.style.setProperty("--p", p.toFixed(3));
        steps.forEach((s, i) => s.classList.toggle("is-lit", p >= (i + 0.5) / steps.length - 0.05));
      };
      window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true, signal });
      window.addEventListener("resize", update, { signal });
      update();
    }

    // Botones magnéticos (solo puntero fino)
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine && !reduce) {
      document.querySelectorAll<HTMLElement>(".btn--magnetic").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        }, { signal });
        btn.addEventListener("mouseleave", () => { btn.style.transform = ""; }, { signal });
      });
    }

    return () => {
      ac.abort();
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  // Cursor (una sola vez)
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cursor || !fine || reduce) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const over = (e: MouseEvent) => {
      cursor.classList.toggle("is-hover", !!(e.target as Element).closest?.("a, button, summary, .yt, .service"));
    };
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return null;
}
