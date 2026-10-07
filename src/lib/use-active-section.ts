"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavSection = { id: string; label: string };

/**
 * Secciones navegables de la página actual (`<section id data-nav="Etiqueta">`) y cuál se está leyendo.
 * La activa es la última cuyo borde superior ya pasó el 40 % de la pantalla.
 */
export function useActiveSection() {
  const pathname = usePathname();
  const [sections, setSections] = useState<NavSection[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("main [data-nav][id]"));
    setSections(els.map((el) => ({ id: el.id, label: el.dataset.nav ?? el.id }))); // eslint-disable-line react-hooks/set-state-in-effect -- se lee el DOM de la página recién montada
    if (!els.length) { setActive(""); return; }

    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.4;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      // Al tocar fondo, la última sección (Contacto) aunque sea corta.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els[els.length - 1].id;
      setActive(current);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return { sections, active };
}
