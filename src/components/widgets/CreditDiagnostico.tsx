"use client";

import { useState } from "react";
import { buros, rangoDe } from "@/content/credito";
import { whatsappLink } from "@/lib/site";

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
type Num = number | "";
const num = (v: string): Num => (v === "" ? "" : Math.max(0, Number(v)));

/**
 * Autodiagnóstico: los 3 puntajes + ingreso y pagos de deuda mensuales.
 * Muestra el promedio, el buró más débil y la relación deuda/ingreso (DTI), y arma el mensaje para WhatsApp.
 * Es orientativo: cada prestamista aplica sus propios criterios.
 */
export function CreditDiagnostico() {
  const [scores, setScores] = useState<Num[]>(["", "", ""]);
  const [ingreso, setIngreso] = useState<Num>("");
  const [deudas, setDeudas] = useState<Num>("");

  const validos = scores.flatMap((s, i) => (s !== "" && s >= 300 && s <= 850 ? [{ s, name: buros[i].name as string }] : []));
  const promedio = validos.length ? Math.round(validos.reduce((a, b) => a + b.s, 0) / validos.length) : 0;
  const bajo = validos.length ? validos.reduce((a, b) => (b.s < a.s ? b : a)) : null;
  const dti = ingreso && deudas !== "" ? Math.round((Number(deudas) / Number(ingreso)) * 100) : null;
  const dtiEstado = dti === null ? null : dti <= 36 ? { t: "Sana", c: "is-up" } : dti <= 43 ? { t: "Al límite", c: "is-mid" } : { t: "Alta", c: "is-down" };

  const consejos: string[] = [];
  if (bajo && rangoDe(bajo.s).min < 670) consejos.push(`Prioridad: subir ${bajo.name} (${bajo.s}) por encima de 670.`);
  if (validos.length === 3 && Math.max(...validos.map((v) => v.s)) - Math.min(...validos.map((v) => v.s)) >= 30) consejos.push("Tus burós están desalineados: revisa errores o cuentas que solo reporta uno de ellos.");
  if (dti !== null && dti > 36) consejos.push("Tu deuda pesa mucho frente a tu ingreso: bajar deuda o subir income es tan importante como el puntaje.");
  if (promedio >= 740 && dti !== null && dti <= 36) consejos.push("Crédito e ingresos alineados: es momento de usar tu crédito para crecer (casa, negocio, inversión).");

  const listo = validos.length > 0 || dti !== null;
  const msg = [
    "Hola Jean Charles, quiero optimizar mi crédito. 📈",
    "",
    ...buros.map((b, i) => `${b.name}: ${scores[i] === "" ? "—" : scores[i]}`),
    ingreso ? `Ingreso mensual: $${fmt(Number(ingreso))}` : "",
    deudas !== "" ? `Pagos de deuda al mes: $${fmt(Number(deudas))}` : "",
    dti !== null ? `DTI: ${dti}%` : "",
    "",
    "¿Me ayudas con un plan?",
  ].filter((l, i, a) => l !== "" || (a[i - 1] ?? "") !== "").join("\n");

  return (
    <div className="calc diag">
      <div className="form-grid form-grid--3">
        {buros.map((b, i) => (
          <div className="field" key={b.name}>
            <label htmlFor={`d-${b.name}`}>{b.name}</label>
            <input id={`d-${b.name}`} className="input" type="number" inputMode="numeric" min={300} max={850} placeholder="300–850"
              value={scores[i]} onChange={(e) => setScores((s) => s.map((x, k) => (k === i ? num(e.target.value) : x)))} />
          </div>
        ))}
      </div>
      <div className="form-grid form-grid--2">
        <div className="field">
          <label htmlFor="d-ingreso">Ingreso mensual (USD)</label>
          <input id="d-ingreso" className="input" type="number" inputMode="numeric" min={0} placeholder="Ej. 5000" value={ingreso} onChange={(e) => setIngreso(num(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="d-deudas">Pagos de deudas al mes (USD)</label>
          <input id="d-deudas" className="input" type="number" inputMode="numeric" min={0} placeholder="Tarjetas, auto, préstamos…" value={deudas} onChange={(e) => setDeudas(num(e.target.value))} />
        </div>
      </div>

      <div className="calc__out" aria-live="polite">
        {listo ? (
          <div className="diag__grid">
            <div>
              <span className="tile__label">Promedio de tus burós</span>
              <span className="calc__big">{promedio || "—"}</span>
              {promedio ? <span className="mono muted diag__sub">{rangoDe(promedio).label}{bajo ? ` · más bajo: ${bajo.name}` : ""}</span> : null}
            </div>
            <div>
              <span className="tile__label">Deuda / ingreso (DTI)</span>
              <span className={`calc__big ${dtiEstado?.c ?? ""}`}>{dti !== null ? `${dti}%` : "—"}</span>
              {dtiEstado ? <span className="mono muted diag__sub">{dtiEstado.t} · ideal ≤ 36 %</span> : null}
            </div>
          </div>
        ) : (
          <span className="muted">Escribe tus puntajes y tus números del mes para ver tu diagnóstico.</span>
        )}
        {consejos.length ? <ul className="ticks diag__tips" role="list">{consejos.map((c) => <li key={c}>{c}</li>)}</ul> : null}
        <a className="btn btn--gold btn--block" href={whatsappLink(msg)} target="_blank" rel="noopener" style={{ marginTop: "1rem" }}>
          Quiero que Jean Charles revise mi crédito
        </a>
        <p className="form-note" style={{ marginTop: ".8rem" }}>
          Diagnóstico orientativo con los datos que escribes; no consulta tu crédito ni afecta tu puntaje. Cada prestamista
          aplica sus propios criterios.
        </p>
      </div>
    </div>
  );
}
