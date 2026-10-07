"use client";

import { useEffect, useMemo, useState } from "react";
import { whatsappLink } from "@/lib/site";

const ASSETS = [
  { id: "bitcoin", code: "BTC", name: "Bitcoin" },
  { id: "ethereum", code: "ETH", name: "Ethereum" },
  { id: "solana", code: "SOL", name: "Solana" },
  { id: "binancecoin", code: "BNB", name: "BNB" },
  { id: "ripple", code: "XRP", name: "XRP" },
] as const;
type AssetId = (typeof ASSETS)[number]["id"];

const fmt = (n: number, max = 2) => n.toLocaleString("en-US", { maximumFractionDigits: max });

/**
 * Simulador de escenario: "si compro hoy X dólares de un activo y llega a un precio objetivo,
 * ¿cuánto valdría?". Precio actual en vivo desde CoinGecko; si no responde, se escribe a mano.
 * Es una cuenta aritmética, no una predicción, y así se dice en pantalla.
 */
export function CryptoCalculator() {
  const [prices, setPrices] = useState<Partial<Record<AssetId, number>>>({});
  const [estado, setEstado] = useState<"cargando" | "ok" | "error">("cargando");
  const [asset, setAsset] = useState<AssetId>("bitcoin");
  const [amount, setAmount] = useState(1000);
  const [manual, setManual] = useState<number | "">("");
  const [target, setTarget] = useState<number | "">("");

  useEffect(() => {
    const ac = new AbortController();
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ASSETS.map((a) => a.id).join(",")}&vs_currencies=usd`, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: Record<string, { usd: number }>) => {
        setPrices(Object.fromEntries(Object.entries(j).map(([k, v]) => [k, v.usd])));
        setEstado("ok");
      })
      .catch(() => { if (!ac.signal.aborted) setEstado("error"); });
    return () => ac.abort();
  }, []);

  const meta = ASSETS.find((a) => a.id === asset)!;
  const current = prices[asset] ?? (manual === "" ? 0 : manual);
  const objetivo = target === "" ? (current ? current * 1.5 : 0) : target;

  const r = useMemo(() => {
    if (!current || !amount || !objetivo) return null;
    const coins = amount / current;
    const future = coins * objetivo;
    return { coins, future, profit: future - amount, roi: ((future - amount) / amount) * 100 };
  }, [current, amount, objetivo]);

  const msg = r
    ? `Hola Jean Charles, me gustaría generar resultados con tu ayuda. 🦁\n\nHice un cálculo en la web:\nInversión: $${fmt(amount, 0)}\nMoneda: ${meta.code}\nPrecio objetivo: $${fmt(objetivo)}\nEscenario: ${r.profit >= 0 ? "+" : ""}$${fmt(r.profit, 0)} (${r.roi.toFixed(1)}%)\n\n¡Quiero empezar!`
    : "Hola Jean Charles, quiero empezar a invertir en cripto con tu ayuda.";

  return (
    <div className="calc">
      <div className="form-grid">
        <div className="form-grid form-grid--2">
          <div className="field">
            <label htmlFor="calc-asset">Activo</label>
            <select id="calc-asset" className="select" value={asset} onChange={(e) => { setAsset(e.target.value as AssetId); setTarget(""); }}>
              {ASSETS.map((a) => <option key={a.id} value={a.id}>{a.name} ({a.code})</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="calc-amount">Inversión (USD)</label>
            <input id="calc-amount" className="input" type="number" min={10} step={10} value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} />
          </div>
        </div>
        <div className="form-grid form-grid--2">
          <div className="field">
            <label htmlFor="calc-now">Precio actual {estado === "ok" ? "· en vivo" : estado === "cargando" ? "· cargando…" : "· escríbelo"}</label>
            {prices[asset] ? (
              <input id="calc-now" className="input" value={`$${fmt(prices[asset]!)}`} readOnly />
            ) : (
              <input id="calc-now" className="input" type="number" min={0} step="any" placeholder="Ej. 65000" value={manual} onChange={(e) => setManual(e.target.value === "" ? "" : Number(e.target.value))} />
            )}
          </div>
          <div className="field">
            <label htmlFor="calc-target">Precio objetivo (USD)</label>
            <input id="calc-target" className="input" type="number" min={0} step="any" placeholder={current ? fmt(current * 1.5, 0) : "Ej. 100000"} value={target} onChange={(e) => setTarget(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="calc__out" aria-live="polite">
        {r ? (
          <>
            <span className="tile__label">Escenario si {meta.code} llega a ${fmt(objetivo)}</span>
            <span className={`calc__big${r.profit < 0 ? " is-down" : ""}`}>{r.profit >= 0 ? "+" : ""}${fmt(r.profit, 0)}</span>
            <span className="mono muted" style={{ fontSize: ".8rem" }}>
              {fmt(r.coins, 6)} {meta.code} · valor final ${fmt(r.future, 0)} · {r.roi >= 0 ? "+" : ""}{r.roi.toFixed(1)}%
            </span>
          </>
        ) : (
          <span className="muted">Completa los datos para ver el escenario.</span>
        )}
        <a className="btn btn--gold btn--block" href={whatsappLink(msg)} target="_blank" rel="noopener" style={{ marginTop: "1rem" }}>
          Hablar con Jean Charles por WhatsApp
        </a>
        <p className="form-note" style={{ marginTop: ".8rem" }}>
          Simulación aritmética de un escenario elegido por ti, no una predicción. Los criptoactivos son muy volátiles y
          puedes perder todo tu capital.
        </p>
      </div>
    </div>
  );
}
