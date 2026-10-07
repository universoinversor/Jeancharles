/* eslint-disable @next/next/no-img-element -- imágenes locales y del distribuidor oficial */
import type { Metadata } from "next";
import { DialogLink } from "@/components/ui/DialogLink";
import { CtaBand, GoldTitle, PageHero, SectionHead } from "@/components/ui/Section";
import { benefits, faq, gateways, problems, products } from "@/content/nipponflex";
import { partners, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nipponflex Health — La ciencia del descanso",
  description:
    "Sistemas japoneses de descanso y recuperación con FIR Power, magnetismo y Vibro Relax. Catálogo oficial E-Energy by Nipponflex USA con Jean Charles.",
};

const ICON: Record<(typeof benefits)[number]["icon"], React.ReactNode> = {
  fir: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  magnet: <path d="M6 3v8a6 6 0 0 0 12 0V3h-4v8a2 2 0 0 1-4 0V3zM6 7h4M14 7h4" />,
  vibro: <path d="M2 12h3l2-6 3 12 3-9 2 5 2-2h5" />,
};

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;
const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

export default function NipponflexPage() {
  const wa = whatsappLink("Hola Jean Charles, quiero asesoría sobre los sistemas Nipponflex.");
  return (
    <>
      <PageHero
        id="nf-title"
        center
        badge="Ciencia avanzada de recuperación"
        title={<GoldTitle as="h1" className="display h1" pre="Hackea tu" gold="biología" />}
        lead="El alto rendimiento exige una recuperación de élite. Sistemas japoneses de descanso que combinan FIR Power, magnetismo y Vibro Relax."
      >
        <div className="hero__ctas" style={{ justifyContent: "center", marginTop: "2.5rem", opacity: 1, animation: "none" }}>
          <a href="#catalogo" className="btn btn--gold btn--magnetic">Ver el catálogo <span className="arrow" aria-hidden="true">↓</span></a>
          <DialogLink dialog="consulta" servicio="nipponflex" className="btn btn--magnetic">Asesoría personalizada</DialogLink>
        </div>
      </PageHero>

      {/* El problema */}
      <section className="section section--line" aria-labelledby="problema-title">
        <div className="container">
          <div className="split reveal">
            <div className="split__media" style={{ background: "#d9d9dc" }}>
              <img src="/img/mattress.webp" alt="Colchón Nipponflex Triple S Firm" loading="lazy" style={{ objectFit: "contain", padding: "6%", filter: "none" }} width={1080} height={1080} />
            </div>
            <div className="split__body">
              <span className="eyebrow">El problema</span>
              <GoldTitle id="problema-title" pre="Por qué el sueño común" gold="no te alcanza" />
              <p className="muted">
                La vida moderna nos expone a luz artificial, contaminación electromagnética y estrés constante. Un colchón
                común solo te sostiene; no hace nada por tu recuperación.
              </p>
              <ul className="ticks" role="list">
                {problems.map((p) => (
                  <li key={p.n}><span><strong>{p.n}. {p.title}:</strong> {p.text}</span></li>
                ))}
              </ul>
              <p className="manifesto__quote" style={{ fontSize: "var(--step-1)" }}>
                “Tu cama actual es solo una superficie acolchada. Es hora de pasar a una <em>máquina de recuperación activa</em>.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La ciencia */}
      <section className="section" id="ciencia" aria-labelledby="ciencia-title">
        <div className="container">
          <SectionHead
            eyebrow="La tecnología"
            title={<GoldTitle id="ciencia-title" pre="La ciencia de la" gold="recuperación" />}
            lead="Los sistemas Nipponflex no son simples camas: integran tecnologías propias pensadas para tu descanso."
          />
          <div className="benefits">
            {benefits.map((b, i) => (
              <article className="benefit reveal" style={d(`${i * 0.1}s`)} key={b.title}>
                <span className="benefit__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{ICON[b.icon]}</svg>
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section className="section section--raised" id="catalogo" aria-labelledby="catalogo-title">
        <div className="container">
          <SectionHead
            variant="center"
            eyebrow="Inventario USA · enlaces verificados"
            title={<GoldTitle id="catalogo-title" pre="Arsenal" gold="élite" />}
            lead="Elige tu sistema de recuperación. Compras directo en la tienda oficial E-Energy by Nipponflex con el código de Jean Charles."
          />
          <div className="products">
            {products.map((p, i) => (
              <article className={`product reveal${p.featured ? " product--featured" : ""}`} style={d(`${(i % 3) * 0.1}s`)} key={p.slug}>
                <div className="product__media">
                  {p.flag ? <span className="badge product__flag">{p.flag}</span> : null}
                  <img src={p.img} alt={p.name} loading="lazy" width={980} height={980} />
                </div>
                <div className="product__body">
                  <div className="product__head">
                    <h3>{p.name}</h3>
                    {p.price ? <span className="price">{usd(p.price)} USD</span> : null}
                  </div>
                  <p>{p.text}</p>
                  <ul className="ticks" role="list">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <a href={p.url} target="_blank" rel="noopener sponsored" className={`btn btn--block${p.featured ? " btn--gold" : ""}`}>
                    {p.featured ? "Adquirir el sistema" : "Ver en la tienda"} <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Puertas de entrada */}
      <section className="section" aria-labelledby="activa-title">
        <div className="container">
          <SectionHead
            eyebrow="E-Energy by Nipponflex"
            title={<GoldTitle id="activa-title" pre="Activa tu" gold="bioenergía" />}
            lead="Elige por dónde entrar al ecosistema: compra, explora la colección o súmate como socio."
          />
          <div className="cards">
            {gateways.map((g, i) => (
              <a className="card reveal" href={g.href} target="_blank" rel="noopener sponsored" style={d(`${i * 0.1}s`)} key={g.title}>
                <div className="card__body" style={{ paddingTop: "1.6rem" }}>
                  <span className="card__tag">0{i + 1}</span>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <span className="link-underline" style={{ width: "fit-content", marginTop: ".4rem" }}>{g.cta} <span aria-hidden="true">↗</span></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--line" id="faq" aria-labelledby="faq-title">
        <div className="container--narrow">
          <SectionHead variant="stack" eyebrow="Preguntas frecuentes" title={<GoldTitle id="faq-title" pre="Antes de" gold="empezar" />} />
          <div className="faq reveal">
            {faq.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
          <p className="disclaimer">
            Los productos Nipponflex son artículos de bienestar y descanso, no dispositivos médicos: no están destinados a
            diagnosticar, tratar, curar ni prevenir enfermedades. Precios referenciales de la tienda oficial; el precio
            final se confirma al pagar. Las compras desde estos enlaces generan una comisión para Jean Charles como socio.
          </p>
        </div>
      </section>

      <CtaBand
        id="nf-cta"
        eyebrow="Acceso VIP"
        title={<GoldTitle pre="Tu descanso es tu" gold="ventaja competitiva." />}
        lead="Agenda una asesoría y te recomendamos el sistema que encaja con tu rutina."
      >
        <a href={partners.eEnergyStore} className="btn btn--gold btn--block" target="_blank" rel="noopener sponsored">Entrar a la tienda oficial <span className="arrow" aria-hidden="true">↗</span></a>
        <DialogLink dialog="consulta" servicio="nipponflex" className="btn btn--block">Reservar asesoría</DialogLink>
        <a href={wa} className="btn btn--block" target="_blank" rel="noopener">Escribir por WhatsApp</a>
      </CtaBand>
    </>
  );
}
