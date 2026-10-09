import type { Metadata } from "next";
import { DialogLink } from "@/components/ui/DialogLink";
import { Monedas } from "@/components/ui/Monedas";
import { CtaBand, GoldTitle, PageHero, SectionHead } from "@/components/ui/Section";
import { SectionRail } from "@/components/ui/SectionRail";
import { CreditDiagnostico } from "@/components/widgets/CreditDiagnostico";
import { CreditGauge } from "@/components/widgets/CreditGauge";
import { CreditGaugeAnimado } from "@/components/widgets/CreditGaugeAnimado";
import { CreditDolor } from "@/components/widgets/CreditDolor";
import { beneficios, buros, dolor, equilibrio, factores, faqCredito, impuestos, pasos } from "@/content/credito";
import { whatsappLink } from "@/lib/site";
import { FondoLujo } from "@/components/ui/FondoLujo";

export const metadata: Metadata = {
  title: "Crédito optimizado — Tus 3 burós alineados con tus ingresos",
  description:
    "Aprende a mejorar tu puntaje en Equifax, Experian y TransUnion y a alinearlo con tus ingresos. Diagnóstico, plan y acompañamiento con Jean Charles.",
};

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

const ICON: Record<(typeof beneficios)[number]["icon"], React.ReactNode> = {
  casa: <path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6" />,
  tasa: <><path d="M5 19 19 5" /><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /></>,
  auto: <><path d="M3 16v-4l2-5h14l2 5v4H3z" /><circle cx="7.5" cy="16.5" r="1.8" /><circle cx="16.5" cy="16.5" r="1.8" /></>,
  negocio: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5h6v2M3 12h18" /></>,
  tarjeta: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19M6 15h4" /></>,
  llave: <><circle cx="8" cy="12" r="4" /><path d="M12 12h9M18 12v3M21 12v2" /></>,
};

export default function CreditoPage() {
  const ahorro = Math.round((impuestos.ejemplo.gasto * impuestos.ejemplo.tasa) / 100);
  return (
    <>
      <SectionRail />
      <PageHero
        id="credito-title"
        center
        decor={<Monedas set="cripto" />}
        badge="Equifax · Experian · TransUnion"
        title={<GoldTitle as="h1" className="display h1" pre="Crédito" gold="optimizado" />}
        lead="¿Vives en Estados Unidos y todavía no tienes un buen score, tarjetas de crédito ni casa propia? Jean Charles te enseña a entender el sistema de crédito americano y a usarlo a tu favor."
      >
        <div className="hero__ctas" style={{ justifyContent: "center", marginTop: "2.5rem", opacity: 1, animation: "none" }}>
          <a href="#diagnostico" className="btn btn--gold btn--magnetic">Hacer mi diagnóstico <span className="arrow" aria-hidden="true">↓</span></a>
          <DialogLink dialog="consulta" servicio="credito" className="btn btn--magnetic">Agendar asesoría</DialogLink>
        </div>
        <div className="panel credito-hero__gauge">
          <CreditGaugeAnimado desde={650} hasta={750} />
          <p className="form-note">Ejemplo ilustrativo de un plan bien ejecutado. Los resultados varían según cada caso.</p>
        </div>
      </PageHero>

      {/* Al dolor: preguntas */}
      <section className="section section--line has-fondo" id="te-identificas" data-nav="¿Te identificas?" aria-labelledby="dolor-title">
        <FondoLujo img="casa" />
        <div className="container">
          <SectionHead
            eyebrow={dolor.eyebrow}
            title={<GoldTitle id="dolor-title" pre={dolor.pre} gold={dolor.gold} />}
            lead={dolor.lead}
          />
          <CreditDolor />
          <aside className="debito reveal" aria-labelledby="debito-title">
            <span className="debito__tag" aria-hidden="true">Débito ≠ Crédito</span>
            <h3 id="debito-title">{dolor.debito.title}</h3>
            <p>{dolor.debito.text}</p>
          </aside>
        </div>
      </section>

      {/* Los 3 burós */}
      <section className="section section--line" id="buros" data-nav="Tus 3 burós" aria-labelledby="buros-title">
        <div className="container">
          <SectionHead
            eyebrow="Así se ve tu crédito"
            title={<GoldTitle id="buros-title" pre="Tres burós," gold="tres puntajes" />}
            lead="Cada buró tiene su propio número. Un buen crédito es tenerlos los tres en verde, no solo uno."
          />
          <div className="gauges">
            {buros.map((b, i) => (
              <div className="panel gauges__item reveal" style={d(`${i * 0.1}s`)} key={b.name}>
                <CreditGauge score={b.ejemplo} bureau={b.name} note="Puntaje de ejemplo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crédito + ingresos */}
      <section className="section section--raised" id="equilibrio" data-nav="Crédito + ingresos" aria-labelledby="equilibrio-title">
        <div className="container">
          <SectionHead
            variant="center"
            eyebrow="Todo tiene que estar alineado"
            title={<GoldTitle id="equilibrio-title" pre="Buen crédito sin ingresos" gold="no te lleva lejos" />}
            lead="Para avanzar, tu crédito, tus ingresos y tus deudas tienen que estar en orden al mismo tiempo. Si uno falla, el banco no te aprueba."
          />
          <div className="balance">
            {equilibrio.map((e, i) => (
              <article className="balance__item reveal" style={d(`${i * 0.1}s`)} key={e.title}>
                <span className="balance__n" aria-hidden="true">0{i + 1}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section has-fondo" id="beneficios" data-nav="Beneficios" aria-labelledby="beneficios-title">
        <FondoLujo img="villa" />
        <div className="container">
          <SectionHead
            eyebrow="Lo que se abre con un buen crédito"
            title={<GoldTitle id="beneficios-title" pre="Los" gold="beneficios" />}
            lead="Un crédito optimizado es una herramienta: te da acceso, te ahorra intereses y te deja crecer."
          />
          <div className="benefits benefits--6">
            {beneficios.map((b, i) => (
              <article className="benefit reveal" style={d(`${(i % 3) * 0.1}s`)} key={b.title}>
                <span className="benefit__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{ICON[b.icon]}</svg>
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Qué pesa en tu puntaje */}
      <section className="section section--line" id="factores" data-nav="Cómo se calcula" aria-labelledby="factores-title">
        <div className="container">
          <SectionHead
            eyebrow="Cómo funciona el sistema"
            title={<GoldTitle id="factores-title" pre="Qué pesa en tu" gold="puntaje" />}
            lead="Cinco factores deciden tu número. Cuando sabes cuánto pesa cada uno, sabes dónde actuar primero."
          />
          <div className="factores">
            {factores.map((f, i) => (
              <div className="factor reveal" style={d(`${i * 0.08}s`)} key={f.title}>
                <span className="factor__pct"><span className="factor__num">{f.pct}</span><sup>%</sup></span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <span className="factor__bar" aria-hidden="true"><i style={{ width: `${(f.pct / 35) * 100}%` }} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autodiagnóstico */}
      <section className="section section--raised" id="diagnostico" data-nav="Diagnóstico" aria-labelledby="diag-title">
        <div className="container--narrow">
          <SectionHead
            variant="stack"
            eyebrow="Gratis · 1 minuto"
            title={<GoldTitle id="diag-title" pre="Tu" gold="diagnóstico" />}
            lead="Escribe tus 3 puntajes y tus números del mes. Te mostramos dónde estás y qué mover primero."
          />
          <CreditDiagnostico />
        </div>
      </section>

      {/* Impuestos */}
      <section className="section" id="impuestos" data-nav="Impuestos" aria-labelledby="imp-title">
        <div className="container">
          <div className="split reveal">
            <div className="split__body">
              <span className="eyebrow">{impuestos.eyebrow}</span>
              <GoldTitle id="imp-title" pre={impuestos.pre} gold={impuestos.gold} />
              <p className="muted">{impuestos.lead}</p>
              <ul className="ticks" role="list">
                {impuestos.ejemplos.map((e) => <li key={e.title}><span><strong>{e.title}:</strong> {e.text}</span></li>)}
              </ul>
            </div>
            <div className="split__body tax">
              <span className="tile__label">Ejemplo</span>
              <div className="tax__row"><span>Inviertes en tu negocio</span><b>${impuestos.ejemplo.gasto.toLocaleString("en-US")}</b></div>
              <div className="tax__row"><span>Tu tasa de impuesto (ejemplo)</span><b>{impuestos.ejemplo.tasa}%</b></div>
              <div className="tax__row tax__row--total"><span>Pagas de impuestos hasta</span><b className="calc__big">${ahorro} menos</b></div>
              <p className="form-note">{impuestos.aviso}</p>
            </div>
          </div>
        </div>
      </section>

      {/* El programa */}
      <section className="section section--line" id="programa" data-nav="El programa" aria-labelledby="prog-title">
        <div className="container">
          <SectionHead variant="center" eyebrow="Cómo trabajamos" title={<GoldTitle id="prog-title" pre="Tu crédito," gold="paso a paso" />} />
          <div className="journey" role="list">
            <span className="journey__rail" aria-hidden="true"><i /></span>
            {pasos.map((p) => (
              <div className="step" role="listitem" key={p.n}>
                <span className="step__dot" aria-hidden="true" />
                <span className="step__phase">Paso {p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--line" id="preguntas" data-nav="Preguntas" aria-labelledby="faqc-title">
        <div className="container--narrow">
          <SectionHead variant="stack" eyebrow="Preguntas frecuentes" title={<GoldTitle id="faqc-title" pre="Antes de" gold="empezar" />} />
          <div className="faq reveal">
            {faqCredito.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
          <p className="disclaimer">
            Servicio de educación y asesoría financiera. No garantizamos aumentos de puntaje ni la eliminación de
            información correcta de tu reporte. Tienes derecho a disputar errores gratis directamente con Equifax, Experian
            y TransUnion, y a pedir tus reportes gratuitos en AnnualCreditReport.com. Los puntajes mostrados son ejemplos.
            No es asesoría legal ni fiscal.
          </p>
        </div>
      </section>

      <CtaBand
        id="cred-cta"
        eyebrow="Tu siguiente nivel"
        title={<GoldTitle pre="Ordena tu crédito." gold="Haz crecer tus ingresos." />}
        lead="Agenda una asesoría y revisamos juntos tus 3 burós, tu DTI y tu plan."
      >
        <DialogLink dialog="consulta" servicio="credito" className="btn btn--gold btn--block">Agendar asesoría <span className="arrow" aria-hidden="true">→</span></DialogLink>
        <a href={whatsappLink("Hola Jean Charles, quiero optimizar mi crédito y mis ingresos.")} className="btn btn--block" target="_blank" rel="noopener">Escribir por WhatsApp</a>
      </CtaBand>
    </>
  );
}
