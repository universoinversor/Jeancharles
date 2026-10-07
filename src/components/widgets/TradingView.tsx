"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "ticker-tape" | "single-quote" | "advanced-chart" | "technical-analysis" | "screener" | "forex-cross-rates" | "events";

/** Widget de TradingView que se inyecta solo cuando está cerca de la pantalla. */
export function TradingView({
  kind,
  config,
  className,
  style,
  loadingLabel = "Cargando",
}: {
  kind: Kind;
  config: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
  loadingLabel?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const json = JSON.stringify({ colorTheme: "dark", isTransparent: true, locale: "es", ...config });

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const inject = () => {
      const wrap = document.createElement("div");
      wrap.className = "tradingview-widget-container";
      wrap.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
      const s = document.createElement("script");
      s.src = `https://s3.tradingview.com/external-embedding/embed-widget-${kind}.js`;
      s.async = true;
      s.text = json;
      wrap.appendChild(s);
      el.appendChild(wrap);
      timer = setTimeout(() => setLoaded(true), 1500);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); inject(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      el.querySelectorAll(".tradingview-widget-container").forEach((n) => n.remove());
    };
  }, [kind, json]);

  return (
    <div ref={host} data-tv={kind} className={`${className ?? ""}${loaded ? " is-loaded" : ""}`} style={style}>
      {kind !== "ticker-tape" ? <span className="widget-loading">{loadingLabel}</span> : null}
    </div>
  );
}
