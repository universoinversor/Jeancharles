/* eslint-disable @next/next/no-img-element -- imágenes locales y remotas */
import Link from "next/link";
import { GoldTitle, SectionHead } from "@/components/ui/Section";
import { cinema, universe } from "@/content/home";

/** Banda a sangre con un fotograma del logo reveal y una frase en grande. */
export function CinemaBand() {
  return (
    <section className="cinema" aria-label="Manifiesto">
      <img className="cinema__img" src={cinema.image} alt="" loading="lazy" width={1080} height={1080} />
      <div className="container cinema__body">
        <p className="cinema__title reveal">
          {cinema.lines.map((l, i) => (
            <span key={l} className={i === cinema.lines.length - 1 ? "italic gold-text" : undefined}>{l}</span>
          ))}
        </p>
        <div className="cinema__meta reveal" style={{ "--d": ".15s" } as React.CSSProperties}>
          {cinema.meta.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>
    </section>
  );
}

/** Mosaico de imágenes grandes con las áreas de la marca. */
export function Universe() {
  return (
    <section className="section" id="universo" aria-labelledby="universo-title">
      <div className="container">
        <SectionHead
          eyebrow="Todo en un solo lugar"
          title={<GoldTitle id="universo-title" pre="Universo" gold="JC" />}
          lead="Mercados, academia, escenarios, rendimiento y legado: cada parte del método, a un clic."
        />
        <div className="universe">
          {universe.map((u, i) => (
            <Link href={u.href} className="tile-x reveal" style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties} key={u.title}>
              <img src={u.img} alt={u.alt} loading="lazy" />
              <span className="tile-x__go" aria-hidden="true">→</span>
              <span className="tile-x__kicker">{u.kicker}</span>
              <span className="tile-x__title">{u.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
