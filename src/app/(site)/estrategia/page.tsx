import type { Metadata } from "next";
import Image from "next/image";
import { GoldTitle, SectionHead } from "@/components/ui/Section";
import { SectionRail } from "@/components/ui/SectionRail";
import { EstudioAtajo, EstudioContenido } from "@/components/widgets/EstudioContenido";
import { embudo, indicadores, mezcla, produccion, resumen } from "@/content/estrategia";

export const metadata: Metadata = {
  title: "Estrategia de contenido — 21 días",
  description: "Sistema de contenido de 21 días: pilares, calendario de guiones, teleprompter y métricas para Jean Charles Official.",
  robots: { index: false, follow: false },
};

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function EstrategiaPage() {
  return (
    <>
      <SectionRail />
      <section className="hero hero--cinema estrategia-hero" id="arriba" data-nav="Inicio" aria-labelledby="est-title">
        <div className="grid-lines" aria-hidden="true" />
        <div className="tech-grid" aria-hidden="true" />
        <div className="container estrategia-hero__grid">
          <div>
            <span className="badge">Estrategia · Plan de lanzamiento 21 días</span>
            <GoldTitle as="h1" className="display h1" id="est-title" pre="Una marca." gold="Una voz." post="Una comunidad." style={{ margin: "1.5rem 0" }} />
            <p className="lead">
              Un sistema orgánico para convertir historias auténticas en contenido que se comparte, construye autoridad y
              abre conversaciones comerciales.
            </p>
            <div className="hero__ctas" style={{ marginTop: "2.2rem", opacity: 1, animation: "none" }}>
              <a href="#calendario" className="btn btn--gold btn--magnetic">Ver los 21 guiones <span className="arrow" aria-hidden="true">↓</span></a>
              <EstudioAtajo className="btn btn--magnetic">Abrir teleprompter</EstudioAtajo>
            </div>
            <p className="estrategia-hero__nota">Cuenta objetivo: @jeancharles.official · Negocios · Mentalidad · Bienestar</p>
          </div>
          <figure className="estrategia-hero__foto">
            <Image src="/estrategia/jean-charles.webp" alt="Jean Charles" width={1100} height={1467} sizes="(min-width: 960px) 420px, 80vw" priority />
          </figure>
        </div>
      </section>

      <div className="container">
        <div className="stats estrategia-stats">
          {resumen.map((s) => (
            <div className="stat" key={s.label}><span className="stat__num">{s.n}</span><span className="stat__label">{s.label}</span></div>
          ))}
        </div>
      </div>

      {/* Identidad y pilares */}
      <section className="section" id="identidad" data-nav="Identidad" aria-labelledby="ide-title">
        <div className="container">
          <SectionHead
            eyebrow="01 · Identidad de marca"
            title={<GoldTitle id="ide-title" pre="Autoridad sin aparentar." gold="Contenido con propósito." />}
            lead="Jean Charles como empresario e inversionista que comparte experiencias y aprendizajes de educación financiera, mentalidad y bienestar. La promesa es una conversación útil, nunca resultados garantizados."
          />
          <div className="journey estrategia-embudo" role="list">
            <span className="journey__rail" aria-hidden="true"><i /></span>
            {embudo.map((e) => (
              <div className="step" role="listitem" key={e.fase}>
                <span className="step__dot" aria-hidden="true" />
                <span className="step__phase">{e.fase}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
          <h3 className="estrategia-sub">Mezcla de pilares</h3>
          <div className="mezcla">
            {mezcla.map((m, i) => (
              <div className="mezcla__item reveal" style={d(`${i * 0.06}s`)} key={m.pilar}>
                <div className="mezcla__top"><b>{m.pilar}</b><span>{m.pct}%</span></div>
                <span className="mezcla__bar" aria-hidden="true"><i style={{ width: `${m.pct * 2.5}%` }} /></span>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario */}
      <section className="section section--raised" id="calendario" data-nav="21 días" aria-labelledby="cal-title">
        <div className="container">
          <SectionHead
            eyebrow="02 · Agenda de grabación"
            title={<GoldTitle id="cal-title" pre="21 días." gold="21 conversaciones." />}
            lead="Cada pieza trae gancho, guion editable y llamado a la acción. Ábrelo para prepararlo o entra directo al teleprompter. Los temas son propuestas: adáptalos a experiencias reales antes de grabar."
          />
          <EstudioContenido />
        </div>
      </section>

      {/* Producción */}
      <section className="section" id="produccion" data-nav="Producción" aria-labelledby="pro-title">
        <div className="container">
          <SectionHead eyebrow="03 · Set de producción" title={<GoldTitle id="pro-title" pre="Graba con intención." gold="Publica con criterio." />} />
          <div className="benefits estrategia-pasos">
            {produccion.map((p, i) => (
              <article className="benefit reveal" style={d(`${i * 0.08}s`)} key={p.phase}>
                <span className="step__phase">{p.phase}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <div className="estrategia-dos">
            <div className="panel estrategia-card">
              <span className="chip">Teleprompter</span>
              <h3>Un estudio de grabación en tu navegador</h3>
              <p>Velocidad, tamaño de texto, espejo, cuenta regresiva, pantalla completa, edición y atajos de teclado. Funciona sin iniciar sesión.</p>
              <EstudioAtajo className="btn btn--gold btn--sm">Abrir teleprompter</EstudioAtajo>
            </div>
            <div className="panel estrategia-card">
              <span className="chip">Producción real</span>
              <h3>La cámara no hace viral el contenido</h3>
              <p>Prueba tres primeros segundos distintos en tus mejores temas. Haz que cada video responda una pregunta concreta. Evita datos inventados, testimonios falsos y beneficios de salud no comprobados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Indicadores */}
      <section className="section section--line" id="indicadores" data-nav="Indicadores" aria-labelledby="ind-title">
        <div className="container">
          <SectionHead eyebrow="04 · Aprendizaje de campaña" title={<GoldTitle id="ind-title" pre="Medir para mejorar." gold="No publicar por publicar." />} />
          <div className="cards">
            {indicadores.map((x, i) => (
              <article className="card reveal" style={d(`${i * 0.1}s`)} key={x.tag}>
                <div className="card__body" style={{ paddingTop: "1.6rem" }}>
                  <span className="card__tag">{x.tag}</span>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="disclaimer">
            No se presentan cifras de la cuenta: son indicadores para medir cuando haya publicaciones y datos reales. Los
            guiones son propuestas editoriales; confirma experiencias y afirmaciones antes de publicar. Nada de esto es
            asesoría financiera ni promete resultados.
          </p>
        </div>
      </section>
    </>
  );
}
