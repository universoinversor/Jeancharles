"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const TILT = ".card, .panel:not(:has(iframe)):not(.contact__form), .quote, .product, .tile-x, .balance__item, .dolor__resultado";
const SCRAMBLE = "!<>-_\\/[]{}=+*^?#0123456789";

/**
 * Capa "tech" interactiva:
 * - tarjetas que se inclinan en 3D y se iluminan donde está el cursor;
 * - destello dorado al hacer clic en cualquier botón;
 * - barra de progreso de lectura arriba;
 * - los rótulos (eyebrows) se "decodifican" al aparecer.
 * Todo se apaga con prefers-reduced-motion; la inclinación solo con mouse.
 */
export function TechFx() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  // Barra de progreso de lectura.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.current?.style.setProperty("--p", String(h > 0 ? scrollY / h : 0));
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [pathname]);

  // Destello al hacer clic en botones.
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onDown = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".btn, .dolor__item");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const s = document.createElement("span");
      s.className = "tech-ripple";
      s.style.left = `${e.clientX - r.left}px`;
      s.style.top = `${e.clientY - r.top}px`;
      btn.appendChild(s);
      setTimeout(() => s.remove(), 750);
    };
    addEventListener("pointerdown", onDown);
    return () => removeEventListener("pointerdown", onDown);
  }, []);

  // Inclinación 3D + luz que sigue al cursor.
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let current: HTMLElement | null = null, raf = 0;
    const leave = (el: HTMLElement) => {
      el.classList.remove("is-tilting");
      el.style.removeProperty("--rx"); el.style.removeProperty("--ry");
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(TILT);
      if (current && current !== el) leave(current);
      current = el;
      if (!el || (el.classList.contains("reveal") && !el.classList.contains("is-in"))) return;
      if (!el.querySelector(":scope > .tech-light")) {
        const l = document.createElement("span");
        l.className = "tech-light"; l.setAttribute("aria-hidden", "true");
        el.appendChild(l);
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        const k = Math.min(1, 520 / Math.max(r.width, r.height)) * 7; // las piezas grandes se inclinan menos
        el.style.setProperty("--rx", `${((0.5 - y) * k).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((x - 0.5) * k).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        el.classList.add("is-tilting");
      });
    };
    const onOut = (e: PointerEvent) => { if (!e.relatedTarget && current) { leave(current); current = null; } };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);
    return () => { document.removeEventListener("pointermove", onMove); document.removeEventListener("pointerout", onOut); cancelAnimationFrame(raf); };
  }, []);

  // Rótulos que se decodifican al aparecer.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("main .eyebrow")).filter((el) => el.children.length === 0);
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        io.unobserve(en.target);
        const el = en.target as HTMLElement;
        const final = el.dataset.texto ?? el.textContent ?? "";
        el.dataset.texto = final;
        let frame = 0;
        const total = 22;
        const tick = () => {
          frame++;
          const fijas = Math.floor((frame / total) * final.length);
          el.textContent = final.split("").map((c, i) => (i < fijas || c === " " ? c : SCRAMBLE[(i * 7 + frame) % SCRAMBLE.length])).join("");
          if (frame < total) requestAnimationFrame(tick); else el.textContent = final;
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}
