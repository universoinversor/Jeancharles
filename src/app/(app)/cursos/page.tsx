import type { Metadata } from "next";
import { DialogLink } from "@/components/ui/DialogLink";
import { GoldTitle, PageHero } from "@/components/ui/Section";
import { cursos } from "@/content/cursos";

export const metadata: Metadata = {
  title: "Cursos & Mentorías",
  description: "Programas de Jean Charles sobre mercados financieros, crypto, negocios digitales, mentalidad y biohacking.",
};

export default function CursosPage() {
  return (
    <>
      <PageHero
        id="cursos-title"
        badge="Academia JC"
        title={<GoldTitle as="h1" className="display h1" pre="Cursos &" gold="Mentorías" />}
        lead="Programas paso a paso para dominar los mercados, construir negocios digitales rentables y sostener la mente de un líder."
      />
      <section className="section section--tight section--line" aria-label="Catálogo de cursos">
        <div className="container">
          <div className="cards">
            {cursos.map((c, i) => (
              <article className="card reveal" style={{ "--d": `${(i % 3) * 0.1}s` } as React.CSSProperties} key={c.slug}>
                <div className="card__body" style={{ paddingTop: "1.6rem" }}>
                  <span className="card__tag">{c.categoria} · {c.nivel}</span>
                  <h3>{c.titulo}</h3>
                  <p>{c.resumen}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginTop: ".6rem" }}>
                    <span className="mono muted" style={{ fontSize: ".75rem" }}>{c.modulos} módulos</span>
                    {c.estado === "proximamente"
                      ? <DialogLink dialog="lista" className="btn btn--sm">Lista de espera</DialogLink>
                      : <a href={`/cursos/${c.slug}`} className="btn btn--gold btn--sm">Empezar</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
