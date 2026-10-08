import type { Metadata } from "next";
import Link from "next/link";
import { DialogLink } from "@/components/ui/DialogLink";
import { OroArt } from "@/components/ui/OroArt";
import { CtaBand, GoldTitle, SectionHead } from "@/components/ui/Section";
import { SectionRail } from "@/components/ui/SectionRail";
import { aplicaciones, faqNeuro, formatos, neuroIntro, pilares, recorrido } from "@/content/neuroventas";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Neuroventas & PNL — Comunicación que conecta, ventas que cierran",
  description:
    "Programación neurolingüística y neuroventas con Jean Charles: rapport, lenguaje, manejo de objeciones y cierre ético para ventas, liderazgo y conferencias.",
};

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

const ICON: Record<(typeof aplicaciones)[number]["icon"], React.ReactNode> = {
  venta: <><path d="M4 19V9l8-5 8 5v10" /><path d="M9 19v-5h6v5" /></>,
  escenario: <><path d="M12 3v3M5 21l2-9h10l2 9" /><circle cx="12" cy="9" r="2" /></>,
  equipo: <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5" /></>,
  contenido: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></>,
  negociacion: <path d="M3 12l4-4 4 3 3-3 7 7-3 3-4-3-3 3z" />,
  mente: <><path d="M9 4a4 4 0 0 0-4 4c-1.5 1-2 3-1 5 0 2 1.5 3.5 3.5 3.5V20h9v-3.5c2 0 3.5-1.5 3.5-3.5 1-2 .5-4-1-5a4 4 0 0 0-4-4c-1 0-2 .4-3 1-1-.6-2-1-3-1z" /></>,
};

export default function NeuroventasPage() {
  return (
    <>
      <SectionRail />
      <section className="hero hero--cinema" id="arriba" data-nav="Inicio" aria-labelledby="neuro-title" style={{ minHeight: "88svh" }}>
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="grid-lines" aria-hidden="true" />
        <div className="container hero__grid">
          <div>
            <span className="badge">Neurolingüística · Neuroventas</span>
            <GoldTitle as="h1" className="display h1" id="neuro-title" pre="Comunicación que conecta." gold="Ventas que cierran." style={{ margin: "1.5rem 0" }} />
            <p className="lead">
              Aprende cómo piensa y decide tu cliente, y usa el lenguaje a tu favor: en una llamada, en un escenario o
              frente a tu equipo.
            </p>
            <div className="hero__ctas" style={{ marginTop: "2.2rem", opacity: 1, animation: "none" }}>
              <DialogLink dialog="consulta" servicio="neuroventas" className="btn btn--gold btn--magnetic">Quiero dominarlo <span className="arrow" aria-hidden="true">→</span></DialogLink>
              <a href="#metodo" className="btn btn--magnetic">Ver el método</a>
            </div>
          </div>
          <div className="neuro-art" aria-hidden="true"><OroArt kind="neuro" /></div>
        </div>
      </section>

      {/* Qué es */}
      <section className="section section--line" id="que-es" data-nav="Qué es" aria-labelledby="que-title">
        <div className="container">
          <SectionHead
            eyebrow="Dos herramientas, un objetivo"
            title={<GoldTitle id="que-title" pre="La mente detrás de" gold="cada decisión" />}
            lead="Vender, liderar o presentar es comunicar. Cuando entiendes la mente, comunicas mejor."
          />
          <div className="balance balance--2">
            {[neuroIntro.pnl, neuroIntro.neuro].map((x, i) => (
              <article className="balance__item reveal" style={d(`${i * 0.1}s`)} key={x.title}>
                <span className="balance__n" aria-hidden="true">{i === 0 ? "PNL" : "NV"}</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="section section--raised" id="metodo" data-nav="El método" aria-labelledby="met-title">
        <div className="container">
          <SectionHead
            eyebrow="El método"
            title={<GoldTitle id="met-title" pre="Seis habilidades que" gold="cambian tus resultados" />}
            lead="Técnicas concretas que se practican y se miden, no frases motivacionales."
          />
          <div className="benefits benefits--6">
            {pilares.map((p, i) => (
              <article className="benefit reveal" style={d(`${(i % 3) * 0.1}s`)} key={p.title}>
                <span className="benefit__icon" aria-hidden="true">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recorrido de la venta */}
      <section className="section" id="recorrido" data-nav="La venta" aria-labelledby="rec-title">
        <div className="container">
          <SectionHead variant="center" eyebrow="Neuroventas en acción" title={<GoldTitle id="rec-title" pre="Así decide" gold="tu cliente" />} />
          <div className="journey" role="list">
            <span className="journey__rail" aria-hidden="true"><i /></span>
            {recorrido.map((s) => (
              <div className="step" role="listitem" key={s.phase}>
                <span className="step__dot" aria-hidden="true" />
                <span className="step__phase">{s.phase}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="section section--line" id="aplicaciones" data-nav="Dónde aplicarlo" aria-labelledby="apl-title">
        <div className="container">
          <SectionHead
            eyebrow="Dónde se aplica"
            title={<GoldTitle id="apl-title" pre="Todos" gold="vendemos algo" />}
            lead="Un producto, una idea, un proyecto o a ti mismo. Estas habilidades sirven en cada escenario."
          />
          <div className="benefits benefits--6">
            {aplicaciones.map((a, i) => (
              <article className="benefit reveal" style={d(`${(i % 3) * 0.1}s`)} key={a.title}>
                <span className="benefit__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{ICON[a.icon]}</svg>
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ética */}
      <section className="section section--raised" id="etica" data-nav="Ética" aria-labelledby="eti-title">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow--plain">Nuestro principio</span>
          <GoldTitle id="eti-title" pre="Persuasión con ética," gold="nunca manipulación" style={{ margin: "1.2rem 0" }} />
          <p className="lead" style={{ marginInline: "auto" }}>
            Influir es ayudar a alguien a tomar una buena decisión para su vida. Si lo que ofreces no le sirve, la venta
            no se hace. Esa es la diferencia entre un vendedor y un asesor de confianza.
          </p>
        </div>
      </section>

      {/* Formatos */}
      <section className="section" id="formatos" data-nav="Formatos" aria-labelledby="for-title">
        <div className="container">
          <SectionHead eyebrow="Cómo aprenderlo" title={<GoldTitle id="for-title" pre="Elige tu" gold="formato" />} />
          <div className="cards">
            {formatos.map((f, i) => (
              <article className="card reveal" style={d(`${i * 0.1}s`)} key={f.title}>
                <div className="card__body" style={{ paddingTop: "1.6rem" }}>
                  <span className="card__tag">0{i + 1}</span>
                  <h3>
                    {"href" in f
                      ? <Link href={f.href} className="stretched">{f.title}</Link>
                      : <DialogLink dialog="consulta" servicio={f.servicio} className="stretched">{f.title}</DialogLink>}
                  </h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--line" id="preguntas" data-nav="Preguntas" aria-labelledby="faqn-title">
        <div className="container--narrow">
          <SectionHead variant="stack" eyebrow="Preguntas frecuentes" title={<GoldTitle id="faqn-title" pre="Antes de" gold="empezar" />} />
          <div className="faq reveal">
            {faqNeuro.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
          <p className="disclaimer">
            Formación en comunicación y ventas. No es terapia psicológica ni sustituye atención profesional de salud.
            Los resultados dependen de la práctica y la aplicación de cada persona.
          </p>
        </div>
      </section>

      <CtaBand
        id="neuro-cta"
        eyebrow="Tu siguiente nivel"
        title={<GoldTitle pre="Habla mejor." gold="Vende mejor." />}
        lead="Agenda una sesión y trabajamos tu comunicación sobre tus casos reales."
      >
        <DialogLink dialog="consulta" servicio="neuroventas" className="btn btn--gold btn--block">Agendar sesión <span className="arrow" aria-hidden="true">→</span></DialogLink>
        <a href={whatsappLink("Hola Jean Charles, quiero información sobre neuroventas y PNL.")} className="btn btn--block" target="_blank" rel="noopener">Escribir por WhatsApp</a>
      </CtaBand>
    </>
  );
}
