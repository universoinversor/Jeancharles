"use client";

import { useState } from "react";
import { DialogLink } from "@/components/ui/DialogLink";
import { dolor } from "@/content/credito";

/** Preguntas de dolor: el visitante marca las que le pasan y ve su resultado al instante. */
export function CreditDolor() {
  const [marcadas, setMarcadas] = useState<boolean[]>(() => dolor.preguntas.map(() => false));
  const total = marcadas.filter(Boolean).length;
  const toggle = (i: number) => setMarcadas((m) => m.map((x, k) => (k === i ? !x : x)));

  return (
    <div className="dolor">
      <ul className="dolor__lista" role="list">
        {dolor.preguntas.map((p, i) => (
          <li key={p}>
            <button type="button" className={`dolor__item${marcadas[i] ? " is-on" : ""}`} aria-pressed={marcadas[i]} onClick={() => toggle(i)}>
              <span className="dolor__check" aria-hidden="true">{marcadas[i] ? "✓" : ""}</span>
              <span>{p}</span>
              <span className="dolor__si" aria-hidden="true">{marcadas[i] ? "Sí, me pasa" : "Toca si te pasa"}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={`dolor__resultado${total ? " is-on" : ""}`} aria-live="polite">
        {total ? (
          <>
            <p className="dolor__n"><b>{total}</b> de {dolor.preguntas.length}</p>
            <p>{dolor.cierre}</p>
            <div className="dolor__ctas">
              <DialogLink dialog="consulta" servicio="credito" className="btn btn--gold">Quiero entender el sistema <span className="arrow" aria-hidden="true">→</span></DialogLink>
              <a href="#diagnostico" className="btn">Hacer mi diagnóstico</a>
            </div>
          </>
        ) : (
          <p className="muted">Marca las que te pasan.</p>
        )}
      </div>
    </div>
  );
}
