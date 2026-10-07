import type { Metadata } from "next";
import { DialogLink } from "@/components/ui/DialogLink";
import { CtaBand, GoldTitle, PageHero, SectionHead } from "@/components/ui/Section";
import { TradingView } from "@/components/widgets/TradingView";
import { CryptoCalculator } from "@/components/widgets/CryptoCalculator";
import { partners } from "@/lib/site";
import { SectionRail } from "@/components/ui/SectionRail";
import { Monedas } from "@/components/ui/Monedas";

export const metadata: Metadata = {
  title: "Cripto Terminal — Mercados en tiempo real",
  description: "Panel de mercado en tiempo real: Bitcoin, Ethereum, Solana, sentimiento técnico y screener crypto. Curado por Jean Charles.",
};

const QUOTES = [
  { code: "BTC", name: "Bitcoin", symbol: "BITSTAMP:BTCUSD" },
  { code: "ETH", name: "Ethereum", symbol: "BITSTAMP:ETHUSD" },
  { code: "SOL", name: "Solana", symbol: "BINANCE:SOLUSDT" },
  { code: "BNB", name: "BNB", symbol: "BINANCE:BNBUSDT" },
];

const TICKER = {
  symbols: [
    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
    { proName: "BINANCE:SOLUSDT", title: "Solana" },
    { proName: "BINANCE:BNBUSDT", title: "BNB" },
    { proName: "BITSTAMP:XRPUSD", title: "XRP" },
    { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
    { proName: "OANDA:XAUUSD", title: "Oro" },
  ],
  showSymbolLogo: true,
  displayMode: "adaptive",
};

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function CryptoPage() {
  return (
    <>
      <SectionRail />
      <PageHero
        id="crypto-title"
        decor={<Monedas set="cripto" />}
        badge={<><span className="live-dot" /> Datos en vivo</>}
        title={<GoldTitle as="h1" className="display h1" pre="Cripto" gold="Terminal" />}
        lead="Panel de inteligencia de mercado: precios en tiempo real, análisis técnico y sentimiento global — en un solo lugar."
      />

      <TradingView kind="ticker-tape" className="market-strip" config={TICKER} />

      <section className="section section--tight" id="activos" data-nav="Activos" aria-labelledby="activos-title">
        <div className="container">
          <SectionHead
            eyebrow="Activos principales"
            title={<GoldTitle id="activos-title" pre="Activos" gold="líderes" />}
            lead="Cotizaciones institucionales actualizadas en tiempo real."
          />
          <div className="dash dash--quotes">
            {QUOTES.map((q, i) => (
              <div className="panel reveal" style={d(`${i * 0.08}s`)} key={q.code}>
                <div className="panel__head"><b>{q.code}</b><span>{q.name}</span></div>
                <TradingView kind="single-quote" className="panel__body" config={{ symbol: q.symbol, width: "100%" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--line" id="analisis" data-nav="Análisis" aria-labelledby="analisis-title">
        <div className="container">
          <SectionHead variant="stack" eyebrow="Análisis técnico" title={<GoldTitle id="analisis-title" pre="BTC/USD" gold="en vivo" />} />
          <div className="dash dash--main">
            <div className="panel reveal">
              <div className="panel__head"><b>Gráfico</b><span>Diario · UTC</span></div>
              <TradingView
                kind="advanced-chart"
                className="panel__body"
                style={{ height: 520 }}
                loadingLabel="Cargando gráfico"
                config={{
                  autosize: true, symbol: "BITSTAMP:BTCUSD", interval: "D", timezone: "Etc/UTC", theme: "dark", style: "1",
                  backgroundColor: "rgba(13, 13, 17, 1)", gridColor: "rgba(239, 232, 218, 0.05)", allow_symbol_change: true,
                  save_image: false, calendar: false, support_host: "https://www.tradingview.com", isTransparent: false,
                }}
              />
            </div>
            <div className="panel reveal" style={d(".1s")}>
              <div className="panel__head"><b>Sentimiento</b><span>Indicadores técnicos</span></div>
              <TradingView
                kind="technical-analysis"
                className="panel__body"
                style={{ minHeight: 520 }}
                config={{ interval: "1D", width: "100%", height: 500, symbol: "BITSTAMP:BTCUSD", showIntervalTabs: true, displayMode: "single" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight section--line" id="screener" data-nav="Screener" aria-labelledby="screener-title">
        <div className="container">
          <SectionHead variant="stack" eyebrow="Mercado completo" title={<GoldTitle id="screener-title" pre="Crypto" gold="screener" />} />
          <div className="panel reveal">
            <TradingView
              kind="screener"
              className="panel__body"
              style={{ minHeight: 620 }}
              loadingLabel="Cargando screener"
              config={{ width: "100%", height: 620, defaultColumn: "overview", screener_type: "crypto_mkt", displayCurrency: "USD" }}
            />
          </div>
          <p className="disclaimer">
            Información solo educativa; no constituye asesoría financiera ni recomendación de compra o venta. Los
            criptoactivos son altamente volátiles y puedes perder todo tu capital.
          </p>
        </div>
      </section>

      {/* Tarjeta cripto */}
      <section className="section section--line" id="tarjeta" data-nav="Tarjeta" aria-labelledby="card-title">
        <div className="container cardx-wrap">
          <div className="cardx reveal" aria-hidden="true">
            <div className="cardx__chip" />
            <span className="cardx__brand">ELITE · WORLD ACCESS</span>
            <span className="cardx__num">•••• •••• •••• 4829</span>
            <span className="cardx__name">JEAN CHARLES</span>
            {/* eslint-disable-next-line @next/next/no-img-element -- escudo local */}
            <img className="cardx__crest" src="/brand/crest.webp" alt="" width={440} height={480} />
          </div>
          <div className="reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <span className="eyebrow">Gasta tus cripto en cualquier lugar</span>
            <GoldTitle id="card-title" pre="Tu tarjeta" gold="cripto" style={{ margin: "1.4rem 0 1.4rem" }} />
            <ul className="ticks" role="list">
              <li><span><strong>Cripto a fiat al instante:</strong> conserva tus activos y conviértelos solo al momento de pagar.</span></li>
              <li><span><strong>Recompensas:</strong> cashback según el programa vigente de la tarjeta.</span></li>
              <li><span><strong>Aceptación mundial:</strong> paga en comercios y retira en cajeros de todo el mundo.</span></li>
            </ul>
            <div className="hero__ctas" style={{ marginTop: "2rem", opacity: 1, animation: "none" }}>
              <a href={partners.cryptoCard} target="_blank" rel="noopener sponsored" className="btn btn--gold">Solicitar con el código de Jean Charles <span className="arrow" aria-hidden="true">↗</span></a>
            </div>
            <p className="form-note" style={{ marginTop: ".8rem" }}>Enlace de referido de Crypto.com. Condiciones, comisiones y recompensas las define el emisor.</p>
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="section section--raised" id="calculadora" data-nav="Calculadora" aria-labelledby="calc-title">
        <div className="container book-wrap">
          <div className="reveal">
            <span className="eyebrow">Haz que tu dinero trabaje</span>
            <GoldTitle id="calc-title" pre="Simula tu" gold="escenario" style={{ margin: "1.4rem 0 1.2rem" }} />
            <p className="lead">Elige un activo, cuánto quieres invertir y el precio al que crees que puede llegar. Con el resultado, conversa con Jean Charles una estrategia con gestión de riesgo.</p>
          </div>
          <div className="reveal" style={{ "--d": ".1s" } as React.CSSProperties}><CryptoCalculator /></div>
        </div>
      </section>

      <CtaBand
        id="crypto-cta"
        eyebrow="Estrategia, no especulación"
        title={<GoldTitle pre="¿Listo para invertir" gold="con criterio?" />}
        lead="Recibe análisis exclusivos y diseña tu estrategia con gestión de riesgo profesional."
      >
        <DialogLink dialog="consulta" servicio="crypto" className="btn btn--gold btn--block">Agendar consultoría <span className="arrow" aria-hidden="true">→</span></DialogLink>
        <a href="https://www.youtube.com/@jeancharles.digital" className="btn btn--block" target="_blank" rel="noopener">Análisis en YouTube</a>
      </CtaBand>
    </>
  );
}
