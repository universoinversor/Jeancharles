import Link from "next/link";
import { DialogLink } from "@/components/ui/DialogLink";
import { GoldTitle, SectionHead } from "@/components/ui/Section";
import { journey, pillars, services } from "@/content/home";

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export function Method() {
  return (
    <section className="section section--line" id="metodo" data-nav="Método" aria-labelledby="metodo-title">
      <div className="container">
        <SectionHead
          eyebrow="La tríada del poder"
          title={<GoldTitle id="metodo-title" pre="El Método" gold="JC" />}
          lead="Tres pilares que trabajan juntos. Sin mentalidad, la estrategia se rompe. Sin estrategia, el capital se pierde. Sin capital, no hay legado."
        />
        <div className="pillars">
          {pillars.map((p, i) => (
            <article className="pillar reveal" style={d(`${i * 0.1}s`)} key={p.num}>
              <span className="pillar__num">{p.num}</span>
              <h3 className="display h3">{p.title}</h3>
              <p>{p.text}</p>
              <ul role="list">{p.tags.map((t) => <li className="chip" key={t}>{t}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section section--raised" id="servicios" data-nav="Servicios" aria-labelledby="servicios-title">
      <div className="container">
        <SectionHead
          eyebrow="Cómo trabajamos juntos"
          title={<h2 className="display h2" id="servicios-title">Servicios</h2>}
          lead="Seis formas de acceder al criterio de Jean Charles — desde una sesión estratégica privada hasta un escenario frente a tu equipo."
        />
        <div className="services">
          {services.map((s, i) => (
            <article className="service reveal" key={s.title}>
              <span className="service__idx">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="service__title">
                {"href" in s
                  ? <Link href={s.href} className="stretched">{s.title}</Link>
                  : <DialogLink dialog={s.dialog} servicio={s.servicio} className="stretched">{s.title}</DialogLink>}
              </h3>
              <p className="service__desc">{s.text}</p>
              <span className="service__go" aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section className="section" id="camino" data-nav="El camino" aria-labelledby="camino-title">
      <div className="container">
        <SectionHead variant="center" eyebrow="Tu transformación" title={<GoldTitle id="camino-title" pre="El camino al" gold="legado" />} />
        <div className="journey" role="list">
          <span className="journey__rail" aria-hidden="true"><i /></span>
          {journey.map((s) => (
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
  );
}
