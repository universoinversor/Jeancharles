/* eslint-disable @next/next/no-img-element -- retrato y escudo locales */
import type { Metadata } from "next";
import { DialogLink } from "@/components/ui/DialogLink";
import { CtaBand, GoldTitle, SectionHead } from "@/components/ui/Section";
import { TradingView } from "@/components/widgets/TradingView";
import { FOREX_TICKER, forexPrinciples, forexServices } from "@/content/forex";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Forex Dashboard — Gestión de inversiones",
  description: "Trading de divisas, portafolio cripto, mentoría DeFi y gestión de patrimonio privado con Jean Charles. Mercados en tiempo real.",
};

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function ForexPage() {
  return (
    <>
      <section className="hero hero--cinema" aria-labelledby="fx-title" style={{ minHeight: "92svh" }}>
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="grid-lines" aria-hidden="true" />
        <div className="container hero__grid">
          <div>
            <span className="badge"><span className="live-dot" /> Mercados en vivo</span>
            <GoldTitle as="h1" className="display h1" id="fx-title" pre="Eleva tu" gold="patrimonio digital" style={{ margin: "1.5rem 0" }} />
            <p className="lead">
              Gestión de inversiones con criterio institucional: divisas, activos digitales y estructuras de patrimonio
              privado, con un proceso claro y el riesgo siempre por delante.
            </p>
            <div className="hero__ctas" style={{ marginTop: "2.2rem", opacity: 1, animation: "none" }}>
              <DialogLink dialog="consulta" servicio="forex" className="btn btn--gold btn--magnetic">Iniciar mi plan <span className="arrow" aria-hidden="true">→</span></DialogLink>
              <a href="#mercados" className="btn btn--magnetic">Ver mercados</a>
            </div>
          </div>
          <div className="seal seal--crest seal--person" aria-hidden="true" style={{ maxWidth: 440 }}>
            <span className="seal__halo" />
            <div className="seal__orbit"><span className="seal__dot" /></div>
            <div className="seal__inner"><span className="crest"><img src="/brand/crest.webp" alt="" width={440} height={480} /></span></div>
            <img className="seal__person" src="/img/jean-charles.webp" alt="" width={394} height={1216} />
            <span className="seal__tag seal__tag--b">+10 años en mercados</span>
          </div>
        </div>
      </section>

      <TradingView kind="ticker-tape" className="market-strip" config={FOREX_TICKER} />

      <section className="section" id="servicios-fx" aria-labelledby="svc-title">
        <div className="container">
          <SectionHead
            eyebrow="Servicios élite"
            title={<GoldTitle id="svc-title" pre="Protocolos de" gold="inversión" />}
            lead="Cinco frentes para hacer crecer y proteger tu capital, con acompañamiento directo de Jean Charles."
          />
          <div className="services">
            {forexServices.map((s) => (
              <article className="service reveal" key={s.code}>
                <span className="service__idx">{s.code}</span>
                <h3 className="service__title">
                  <DialogLink dialog="consulta" servicio={s.code === "04" ? "forex" : "crypto"} className="stretched">{s.title}</DialogLink>
                </h3>
                <p className="service__desc">{s.text}</p>
                <span className="service__go" aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--raised section--tight" id="mercados" aria-labelledby="mkt-title">
        <div className="container">
          <SectionHead variant="stack" eyebrow="Terminal en vivo" title={<GoldTitle id="mkt-title" pre="Mercado de" gold="divisas" />} />
          <div className="dash dash--main">
            <div className="panel reveal">
              <div className="panel__head"><b>EUR/USD</b><span>Gráfico en vivo</span></div>
              <TradingView
                kind="advanced-chart"
                className="panel__body"
                style={{ height: 520 }}
                loadingLabel="Cargando gráfico"
                config={{
                  autosize: true, symbol: "FX_IDC:EURUSD", interval: "60", timezone: "Etc/UTC", theme: "dark", style: "1",
                  backgroundColor: "rgba(13, 13, 17, 1)", gridColor: "rgba(239, 232, 218, 0.05)", allow_symbol_change: true,
                  save_image: false, calendar: false, support_host: "https://www.tradingview.com", isTransparent: false,
                }}
              />
            </div>
            <div className="panel reveal" style={d(".1s")}>
              <div className="panel__head"><b>Agenda</b><span>Calendario económico</span></div>
              <TradingView
                kind="events"
                className="panel__body"
                style={{ minHeight: 520 }}
                config={{ width: "100%", height: 500, importanceFilter: "0,1", currencyFilter: "USD,EUR,GBP,JPY,MXN,COP" }}
              />
            </div>
          </div>
          <div className="panel reveal" style={{ marginTop: "1.25rem" }}>
            <div className="panel__head"><b>Cruces</b><span>Principales divisas</span></div>
            <TradingView
              kind="forex-cross-rates"
              className="panel__body"
              style={{ minHeight: 420 }}
              config={{ width: "100%", height: 400, currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "CAD", "MXN"] }}
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pr-title">
        <div className="container">
          <SectionHead
            eyebrow="Cómo trabajamos"
            title={<GoldTitle id="pr-title" pre="Disciplina antes que" gold="suerte" />}
            lead="No vendemos señales mágicas: construimos un proceso que puedas repetir."
          />
          <div className="benefits">
            {forexPrinciples.map((p, i) => (
              <article className="benefit reveal" style={d(`${i * 0.1}s`)} key={p.title}>
                <span className="benefit__icon" aria-hidden="true">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <p className="disclaimer">
            El trading de divisas y criptoactivos conlleva un riesgo alto y puede provocar la pérdida total del capital.
            Los resultados pasados no garantizan resultados futuros. Este contenido es educativo y no constituye asesoría
            financiera personalizada.
          </p>
        </div>
      </section>

      <CtaBand
        id="fx-cta"
        eyebrow="Plazas limitadas"
        title={<GoldTitle pre="Asegura tu" gold="cupo hoy." />}
        lead="Cuéntanos tu objetivo y diseñamos juntos tu plan de inversión."
      >
        <DialogLink dialog="consulta" servicio="forex" className="btn btn--gold btn--block">Agendar una reunión <span className="arrow" aria-hidden="true">→</span></DialogLink>
        <a href={whatsappLink("Hola Jean Charles, quiero información sobre Forex y gestión de inversiones.")} className="btn btn--block" target="_blank" rel="noopener">Escribir por WhatsApp</a>
      </CtaBand>
    </>
  );
}
