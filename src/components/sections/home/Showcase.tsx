/* eslint-disable @next/next/no-img-element -- imágenes remotas de catálogo */
import Link from "next/link";
import { DialogLink } from "@/components/ui/DialogLink";
import { GoldTitle, SectionHead } from "@/components/ui/Section";
import { TradingView } from "@/components/widgets/TradingView";
import { testimonials } from "@/content/home";

export const TICKER_HOME = {
  symbols: [
    { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
    { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
    { proName: "BINANCE:SOLUSDT", title: "Solana" },
    { proName: "OANDA:XAUUSD", title: "Oro" },
    { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
  ],
  showSymbolLogo: true,
  displayMode: "adaptive",
};

export function MarketStrip() {
  return (
    <section aria-label="Mercados en tiempo real">
      <TradingView kind="ticker-tape" className="market-strip" config={TICKER_HOME} />
    </section>
  );
}

export function Performance() {
  return (
    <section className="section" id="rendimiento" aria-labelledby="rendimiento-title">
      <div className="container">
        <div className="split reveal">
          <div className="split__media">
            <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80" alt="Entrenamiento de alto rendimiento" loading="lazy" width={1400} height={1600} />
            <p className="split__caption">“Tu cuerpo es tu primer negocio.”</p>
          </div>
          <div className="split__body">
            <span className="badge">Embajador oficial Nipponflex</span>
            <GoldTitle id="rendimiento-title" pre="Rendimiento para" gold="líderes globales" />
            <p className="muted">El éxito empresarial exige una máquina biológica optimizada. Sin salud no hay legado. Jean Charles integra biohacking y fitness ejecutivo para sostener la energía al máximo nivel.</p>
            <ul className="ticks" role="list">
              <li>Optimización del sueño y la recuperación</li>
              <li>Nutrición para claridad mental</li>
              <li>Entrenamiento de alta intensidad</li>
            </ul>
            <div><Link href="/nipponflex" className="btn">Explorar Nipponflex Health <span className="arrow" aria-hidden="true">→</span></Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section section--line" id="testimonios" aria-labelledby="testimonios-title">
      <div className="container">
        <SectionHead
          eyebrow="Resultados reales"
          title={<GoldTitle id="testimonios-title" pre="Historias de" gold="éxito" />}
          lead="Empresarios, inversionistas y fundadores que decidieron dejar de improvisar."
        />
        <div className="quotes">
          {testimonials.map((t, i) => (
            <figure className="quote reveal" style={{ "--d": `${i * 0.1}s` } as React.CSSProperties} key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">{t.name[0]}</span>
                <span><strong>{t.name}</strong><span className="role">{t.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Book() {
  return (
    <section className="section section--raised" id="libro" aria-labelledby="libro-title">
      <div className="container book-wrap">
        <div className="book-stage reveal" aria-hidden="true">
          <div className="book">
            <div className="book__spine" />
            <div className="book__pages" />
            <div className="book__cover">
              <small>Próximamente</small>
              <div className="book__title">Hope in the Visible<em>&amp; Invisible</em></div>
              <span className="book__mark">JC</span>
            </div>
          </div>
          <div className="book-shadow" />
        </div>
        <div className="reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
          <span className="eyebrow">El nuevo libro</span>
          <GoldTitle id="libro-title" pre="Hope in the Visible" gold="& Invisible" style={{ margin: "1.4rem 0 1.8rem" }} />
          <blockquote className="manifesto__quote" style={{ borderLeft: "1px solid var(--gold)", paddingLeft: "1.5rem" }}>
            “La fe no es ciega; es la visión definitiva de lo que aún está por manifestarse en el mundo material.”
          </blockquote>
          <p className="muted" style={{ margin: "1.6rem 0 2.2rem" }}>
            Jean Charles desglosa los principios espirituales que rigen la acumulación de riqueza y el impacto social.
            Una guía devocional para el emprendedor moderno.
          </p>
          <DialogLink dialog="lista" className="btn btn--gold">Unirme a la lista de espera</DialogLink>
        </div>
      </div>
    </section>
  );
}
