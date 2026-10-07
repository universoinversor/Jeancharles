"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/ui/Brand";
import { Socials } from "@/components/ui/Socials";
import { openDialog } from "@/lib/ui-events";
import { useActiveSection } from "@/lib/use-active-section";

// Como el sitio original: secciones de la home (#) y páginas propias, en el orden de lectura.
const NAV = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#sobre", label: "Sobre mí" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/forex", label: "Forex" },
  { href: "/crypto", label: "Cripto" },
  { href: "/nipponflex", label: "Nipponflex" },
  { href: "/#journal", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];
// Solo en el menú móvil (en escritorio viven en el pie y en "Universo JC").
const NAV_MOVIL_EXTRA = [
  { href: "/cursos", label: "Cursos" },
  { href: "/miembros", label: "Miembros" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 600 && y > last + 4) setHidden(true);
        else if (y < last - 4) setHidden(false);
        setShowSticky(y > window.innerHeight * 0.7);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú al navegar (ajuste de estado durante el render, sin efecto).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const book = (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); openDialog("consulta"); };
  const { active } = useActiveSection();
  // Página propia: por ruta. Sección de la home: la que se está leyendo.
  const current = (href: string): "page" | "location" | undefined => {
    if (!href.includes("#")) return pathname.startsWith(href) ? "page" : undefined;
    return pathname === "/" && href === `/#${active}` ? "location" : undefined;
  };

  return (
    <>
      <header className={`site-header${scrolled || open ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="container">
          <Brand />
          <nav className="nav" aria-label="Principal">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
            ))}
            <a href="#consulta" className="btn btn--gold btn--sm" onClick={book}>Agendar</a>
          </nav>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} id="mobile-menu" inert={!open}>
        <nav aria-label="Menú móvil">
          {[...NAV, ...NAV_MOVIL_EXTRA].map((n, i) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={current(n.href)} style={{ "--i": i } as React.CSSProperties}>
              <small>{String(i + 1).padStart(2, "0")}</small>{n.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <a href="#consulta" className="btn btn--gold" onClick={book}>Agendar consultoría</a>
          <Socials />
        </div>
      </div>

      <div className={`sticky-cta${showSticky && !open && active !== "contacto" ? " is-visible" : ""}`}>
        <a href="#consulta" className="btn btn--gold" onClick={book}>Agendar llamada</a>
      </div>
    </>
  );
}
