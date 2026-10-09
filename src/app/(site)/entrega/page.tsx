import type { Metadata } from "next";
import { GoldTitle, PageHero, SectionHead } from "@/components/ui/Section";
import { entrega } from "@/content/entrega";

export const metadata: Metadata = {
  title: "Tu nueva web está lista",
  description: "Entrega oficial del nuevo sitio de Jean Charles.",
  robots: { index: false, follow: false },
};

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function EntregaPage() {
  return (
    <>
      <PageHero
        id="entrega-title"
        center
        badge={entrega.badge}
        title={<GoldTitle as="h1" className="display h1" pre="Tu nueva web" gold="ya está lista." style={{ margin: "1.5rem 0" }} />}
        lead="Un regalo hecho a la medida de tu marca. Dale play y luego entra a verla en vivo."
      >
        <div className="entrega-video reveal">
          <video src={entrega.video.src} poster={entrega.video.poster} controls playsInline muted autoPlay loop preload="metadata" />
        </div>
        <div className="hero__ctas" style={{ marginTop: "2rem", justifyContent: "center", opacity: 1, animation: "none" }}>
          <a href={entrega.web} className="btn btn--gold btn--magnetic">Ver mi nueva web <span className="arrow" aria-hidden="true">→</span></a>
          <a href={entrega.video.src} download="jeancharles-entrega.mp4" className="btn btn--magnetic">Descargar el video</a>
        </div>
      </PageHero>

      <section className="section section--line" id="mensaje" aria-label="Mensaje de entrega">
        <div className="container--narrow">
          <article className="entrega-carta panel reveal">
            <p className="entrega-carta__saludo">{entrega.saludo}</p>
            {entrega.mensaje.map((p) => <p key={p}>{p}</p>)}
            <p className="entrega-carta__firma">{entrega.firma}<span>{entrega.equipo}</span></p>
          </article>
        </div>
      </section>

      <section className="section section--raised" id="incluye" aria-labelledby="inc-title">
        <div className="container">
          <SectionHead eyebrow="Lo que recibes" title={<GoldTitle id="inc-title" pre="Todo listo" gold="para crecer" />} />
          <div className="benefits benefits--6">
            {entrega.incluye.map((x, i) => (
              <article className="benefit reveal" style={d(`${(i % 3) * 0.1}s`)} key={x.title}>
                <span className="benefit__icon" aria-hidden="true">0{i + 1}</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href={entrega.web} className="btn btn--gold btn--magnetic">Entrar a jeancharlesofficial.com <span className="arrow" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
