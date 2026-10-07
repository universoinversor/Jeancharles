"use client";

import { useActiveSection } from "@/lib/use-active-section";

/**
 * Índice lateral de la página (escritorio): un punto por sección, con su nombre al pasar el cursor
 * y la sección actual siempre visible. Se arma solo con las secciones que llevan `data-nav`.
 */
export function SectionRail() {
  const { sections, active } = useActiveSection();
  if (sections.length < 3) return null;
  const idx = Math.max(0, sections.findIndex((s) => s.id === active));

  return (
    <nav className="rail" aria-label="Secciones de esta página">
      <span className="rail__count mono" aria-hidden="true">
        {String(idx + 1).padStart(2, "0")}<i>/</i>{String(sections.length).padStart(2, "0")}
      </span>
      <ol>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={s.id === active ? "location" : undefined} className={s.id === active ? "is-active" : undefined}>
              <span className="rail__label">{s.label}</span>
              <span className="rail__dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
