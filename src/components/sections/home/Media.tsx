/* eslint-disable @next/next/no-img-element -- imágenes remotas */
import { GoldTitle, SectionHead } from "@/components/ui/Section";
import { YouTubeLite } from "@/components/widgets/YouTubeLite";
import { articles, videos } from "@/content/home";

export function Media() {
  return (
    <section className="section" id="media" aria-labelledby="media-title">
      <div className="container">
        <SectionHead
          eyebrow="Agencia & Media"
          title={<GoldTitle id="media-title" pre="Conocimiento" gold="global" />}
          lead={
            <div style={{ display: "grid", gap: "1.2rem", justifyItems: "start" }}>
              <span>Clases, análisis de mercado y conversaciones sin filtro en el canal oficial.</span>
              <a href="https://www.youtube.com/@jeancharles.digital?sub_confirmation=1" target="_blank" rel="noopener" className="link-underline">
                Suscribirme al canal <span aria-hidden="true">↗</span>
              </a>
            </div>
          }
        />
        <div className="videos">
          {videos.map((v, i) => <YouTubeLite key={v.id} {...v} delay={`${i * 0.1}s`} />)}
        </div>
      </div>
    </section>
  );
}

export function Journal() {
  return (
    <section className="section section--line" id="journal" aria-labelledby="journal-title">
      <div className="container">
        <SectionHead
          eyebrow="Pensamiento estratégico"
          title={<GoldTitle id="journal-title" pre="The" gold="Journal" />}
          lead="Ensayos sobre mercados, mentalidad y negocios. Suscríbete para recibir cada edición antes que nadie."
        />
        <div className="cards">
          {articles.map((a, i) => (
            <article className="card reveal" style={{ "--d": `${i * 0.1}s` } as React.CSSProperties} key={a.title}>
              <div className="card__media"><img src={a.img} alt={a.alt} loading="lazy" width={900} height={675} /></div>
              <div className="card__body">
                <span className="card__tag">{a.tag} · Próximamente</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
