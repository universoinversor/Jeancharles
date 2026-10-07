import { GoldTitle } from "@/components/ui/Section";
import { aboutStats, quote, specialties } from "@/content/home";

export function Marquee() {
  const group = (hidden: boolean) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {specialties.map((s) => (
        <span key={s} style={{ display: "contents" }}>
          <span className="marquee__item">{s}</span>
          <span className="marquee__sep" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-label="Áreas de especialidad">
      <div className="marquee__track">{group(false)}{group(true)}</div>
    </div>
  );
}

export function About() {
  return (
    <section className="section" id="sobre" data-nav="Sobre mí" aria-labelledby="sobre-title">
      <div className="container manifesto">
        <div className="reveal">
          <span className="eyebrow">Sobre Jean Charles</span>
          <GoldTitle id="sobre-title" pre="Lo mejor" gold="está por venir." style={{ marginTop: "1.4rem" }} />
          <blockquote className="manifesto__quote" style={{ marginTop: "2rem", borderLeft: "1px solid var(--gold)", paddingLeft: "1.5rem", fontSize: "var(--step-2)" }}>
            “{quote}”
            <footer className="mono muted" style={{ fontSize: ".72rem", letterSpacing: ".2em", marginTop: "1rem", textTransform: "uppercase" }}>— Jean Charles</footer>
          </blockquote>
        </div>
        <div className="manifesto__body reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
          <p className="manifesto__quote">
            Inversionista experto en <em>mercados financieros</em> y <em>negocios digitales</em>, con más de diez años
            ayudando a miles de personas y empresas en tres continentes.
          </p>
          <p className="muted" style={{ marginTop: "1.6rem" }}>
            Conferencista profesional reconocido por su enfoque personalizado y una ética de trabajo rigurosa. Su
            capacidad analítica le permite ofrecer asesoría estratégica para maximizar inversiones y minimizar riesgos —
            uniendo mentalidad, estrategia y capital en un solo sistema.
          </p>
          <div className="stats">
            {aboutStats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat__num">
                  <span data-count={s.num}>{s.num}</span>{s.sup ? <sup>{s.sup}</sup> : null}
                </span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
