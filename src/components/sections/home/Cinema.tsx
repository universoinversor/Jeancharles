/* eslint-disable @next/next/no-img-element -- imágenes locales y remotas */
import Link from "next/link";
import { GoldTitle, SectionHead } from "@/components/ui/Section";
import { cinema, universe } from "@/content/home";
import { OroArt } from "@/components/ui/OroArt";
import { Monedas } from "@/components/ui/Monedas";
import { FondoLujo } from "@/components/ui/FondoLujo";

/** Banda a sangre con un fotograma del logo reveal y una frase en grande. */
export function CinemaBand() {
  return (
    <section className="cinema" aria-label="Manifiesto">
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <span className="cinema__crest crest" aria-hidden="true"><img src="/brand/crest.webp" alt="" width={440} height={480} loading="lazy" /></span>
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
    <section className="section has-fondo" id="universo" data-nav="Universo JC" aria-labelledby="universo-title">
      <FondoLujo img="villa" />
      <Monedas set="seccion" />
      <div className="container">
        <SectionHead
          eyebrow="Todo en un solo lugar"
          title={<GoldTitle id="universo-title" pre="Universo" gold="JC" />}
          lead="Mercados, academia, escenarios, rendimiento y legado: cada parte del método, a un clic."
        />
        <div className="universe">
          {universe.map((u, i) => (
            <Link href={u.href} className={`tile-x reveal${"variant" in u ? ` tile-x--${u.variant}` : ""}`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties} key={u.title}>
              {"art" in u ? <OroArt kind={u.art} /> : null}
              {"variant" in u && u.variant === "portrait" ? <img className="crest-bg" src="/brand/crest.webp" alt="" loading="lazy" /> : null}
              {"img" in u ? <img src={u.img} alt={u.alt} loading="lazy" className={"variant" in u && u.variant === "portrait" ? "tile-x__portrait" : undefined} /> : null}
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
