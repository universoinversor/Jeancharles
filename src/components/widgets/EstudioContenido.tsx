"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { guiones, textoGuion, type Guion } from "@/content/estrategia";
import { toast } from "@/lib/ui-events";

/**
 * Estudio de contenido: calendario de 21 guiones con filtros y búsqueda, lector de guion
 * (copiar / editar) y teleprompter de pantalla completa (velocidad, tamaño, espejo, cuenta regresiva).
 * Las ediciones se guardan solo en este navegador (localStorage).
 */

const clave = (day: number) => `jc_guion_${day}`;
const leerGuion = (g: Guion) => {
  try { return localStorage.getItem(clave(g.day)) ?? textoGuion(g); } catch { return textoGuion(g); }
};
const guardarGuion = (g: Guion, texto: string) => {
  try {
    if (texto === textoGuion(g)) localStorage.removeItem(clave(g.day));
    else localStorage.setItem(clave(g.day), texto);
  } catch { /* sin almacenamiento */ }
};

const SEMANAS = [
  { id: 0, label: "Todos" },
  { id: 1, label: "Semana 1" },
  { id: 2, label: "Semana 2" },
  { id: 3, label: "Semana 3" },
];

export function EstudioContenido() {
  const [semana, setSemana] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState<Guion | null>(null);
  const [prompter, setPrompter] = useState<Guion | null>(null);

  const lista = useMemo(() => {
    const q = busqueda.trim().toLocaleLowerCase("es");
    return guiones.filter((g) =>
      (semana === 0 || Math.ceil(g.day / 7) === semana) &&
      (!q || `${g.title} ${g.pillar} ${g.hook}`.toLocaleLowerCase("es").includes(q)));
  }, [semana, busqueda]);

  return (
    <div className="estudio">
      <div className="estudio__toolbar">
        <div className="estudio__filtros" role="group" aria-label="Filtrar por semana">
          {SEMANAS.map((s) => (
            <button key={s.id} type="button" className={`estudio__chip${semana === s.id ? " is-on" : ""}`} aria-pressed={semana === s.id} onClick={() => setSemana(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <input className="input estudio__buscar" type="search" placeholder="Buscar tema o pilar…" aria-label="Buscar guiones" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      </div>

      <div className="estudio__grid">
        {lista.map((g) => (
          <article className="estudio__dia" key={g.day}>
            <div className="estudio__head"><b>Día {String(g.day).padStart(2, "0")}</b><span>{g.pillar}</span></div>
            <h3>{g.title}</h3>
            <p>{g.hook}</p>
            <div className="estudio__meta">Meta: {g.goal}</div>
            <div className="estudio__acciones">
              <button type="button" className="btn btn--sm" onClick={() => setAbierto(g)}>Ver guion</button>
              <button type="button" className="btn btn--gold btn--sm" onClick={() => setPrompter(g)}>▶ Grabar</button>
            </div>
          </article>
        ))}
      </div>
      {lista.length === 0 ? <p className="estudio__vacio">No hay guiones para esta búsqueda.</p> : null}

      {abierto ? <LectorGuion guion={abierto} onClose={() => setAbierto(null)} onGrabar={() => { setPrompter(abierto); setAbierto(null); }} /> : null}
      {prompter ? <Teleprompter guion={prompter} onClose={() => setPrompter(null)} /> : null}
    </div>
  );
}

/** Abre el teleprompter con el guion del día 1 desde cualquier botón de la página. */
export function EstudioAtajo({ children, className }: { children: React.ReactNode; className?: string }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setAbierto(true)}>{children}</button>
      {abierto ? <Teleprompter guion={guiones[0]} onClose={() => setAbierto(false)} /> : null}
    </>
  );
}

function LectorGuion({ guion, onClose, onGrabar }: { guion: Guion; onClose: () => void; onGrabar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [texto, setTexto] = useState(() => textoGuion(guion));
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    setTexto(leerGuion(guion)); // eslint-disable-line react-hooks/set-state-in-effect -- borrador guardado, solo en el cliente
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, [guion]);

  const copiar = async () => {
    try { await navigator.clipboard.writeText(texto); toast("Guion copiado"); }
    catch { toast("No se pudo copiar: selecciona el texto y cópialo manualmente"); }
  };

  return (
    <dialog ref={ref} className="estudio-dialog" aria-labelledby="estudio-dialog-title" onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="estudio-dialog__top">
        <h2 id="estudio-dialog-title">Día {guion.day} · {guion.title}</h2>
        <button type="button" className="estudio-dialog__x" aria-label="Cerrar" onClick={onClose}>×</button>
      </div>
      <div className="estudio-dialog__body">
        <p className="eyebrow eyebrow--plain">{guion.pillar} · Meta: {guion.goal}</p>
        <p className="estudio-dialog__tip">Guion base: adáptalo a la experiencia real de Jean Charles y a su forma natural de hablar.</p>
        {editando
          ? <textarea className="textarea estudio-dialog__editor" value={texto} onChange={(e) => setTexto(e.target.value)} aria-label="Editar guion" autoFocus />
          : <div className="estudio-dialog__texto">{texto}</div>}
        <div className="estudio-dialog__acciones">
          <button type="button" className="btn btn--gold" onClick={onGrabar}>Ensayar en teleprompter →</button>
          <button type="button" className="btn" onClick={copiar}>Copiar guion</button>
          {editando ? (
            <button type="button" className="btn" onClick={() => { guardarGuion(guion, texto); setEditando(false); toast("Guion guardado en este navegador"); }}>Guardar cambios</button>
          ) : (
            <button type="button" className="btn" onClick={() => setEditando(true)}>Editar</button>
          )}
          {texto !== textoGuion(guion) && !editando ? (
            <button type="button" className="btn" onClick={() => { const t = textoGuion(guion); setTexto(t); guardarGuion(guion, t); }}>Restaurar original</button>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}

function Teleprompter({ guion, onClose }: { guion: Guion; onClose: () => void }) {
  const raiz = useRef<HTMLDivElement>(null);
  const pantalla = useRef<HTMLDivElement>(null);
  const [texto, setTexto] = useState(() => textoGuion(guion));
  const [corriendo, setCorriendo] = useState(false);
  const [velocidad, setVelocidad] = useState(3);
  const [tam, setTam] = useState(56);
  const [espejo, setEspejo] = useState(false);
  const [cuenta, setCuenta] = useState(0);
  const [editando, setEditando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const vel = useRef(velocidad);
  useEffect(() => { vel.current = velocidad; }, [velocidad]);

  useEffect(() => {
    setTexto(leerGuion(guion)); // eslint-disable-line react-hooks/set-state-in-effect -- borrador guardado, solo en el cliente
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const foco = document.activeElement as HTMLElement | null;
    raiz.current?.focus();
    return () => { document.body.style.overflow = prev; foco?.focus(); };
  }, [guion]);

  const medir = useCallback(() => {
    const s = pantalla.current;
    if (!s) return;
    const max = s.scrollHeight - s.clientHeight;
    setProgreso(max > 0 ? Math.min(100, (s.scrollTop / max) * 100) : 100);
  }, []);

  // Desplazamiento continuo mientras corre
  useEffect(() => {
    if (!corriendo) return;
    let raf = 0, last = 0, acumulado = 0;
    const tick = (t: number) => {
      const s = pantalla.current;
      if (!s) return;
      if (last) {
        acumulado += ((vel.current * vel.current) * 0.9 + 5) * (t - last) / 1000;
        const px = Math.floor(acumulado);
        if (px > 0) { s.scrollTop += px; acumulado -= px; }
      }
      last = t;
      medir();
      if (s.scrollTop + s.clientHeight >= s.scrollHeight - 3) { setCorriendo(false); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [corriendo, medir]);

  // Cuenta regresiva 3 · 2 · 1
  useEffect(() => {
    if (cuenta <= 0) return;
    const t = setTimeout(() => {
      if (cuenta === 1) { setCuenta(0); setCorriendo(true); } else setCuenta(cuenta - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [cuenta]);

  const salir = useCallback(() => {
    setCorriendo(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    onClose();
  }, [onClose]);

  const reiniciar = () => { setCorriendo(false); if (pantalla.current) pantalla.current.scrollTop = 0; medir(); };
  const pantallaCompleta = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await raiz.current?.requestFullscreen();
    } catch { toast("La pantalla completa no está disponible en este navegador"); }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (editando) { if (e.key === "Escape") setEditando(false); return; }
    const tag = (e.target as HTMLElement).tagName;
    if (e.key === "Escape") { e.preventDefault(); salir(); }
    else if (e.code === "Space" && !["INPUT", "TEXTAREA", "BUTTON"].includes(tag)) { e.preventDefault(); setCuenta(0); setCorriendo((c) => !c); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setVelocidad((v) => Math.min(10, v + 1)); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setVelocidad((v) => Math.max(1, v - 1)); }
  };

  // Portal a <body>: algún ancestro con transform convertiría el position: fixed en relativo a él.
  return createPortal(
    <div ref={raiz} className="prompter" role="dialog" aria-modal="true" aria-label={`Teleprompter: día ${guion.day}`} tabIndex={-1} onKeyDown={onKey} data-no-traducir>
      <div className="prompter__tools">
        <div className="prompter__group">
          <button type="button" className="btn btn--gold btn--sm" onClick={() => { setCuenta(0); setCorriendo((c) => !c); }} disabled={editando}>
            {corriendo ? "❚❚ Pausar" : "▶ Iniciar"}
          </button>
          <button type="button" className="btn btn--sm" onClick={reiniciar}>↺ Reiniciar</button>
          <button type="button" className="btn btn--sm" onClick={() => { reiniciar(); setCuenta(3); }} disabled={editando}>3 · 2 · 1</button>
          <span className="prompter__titulo">Día {guion.day}: {guion.title}</span>
        </div>
        <div className="prompter__group">
          <label>Velocidad <output>{velocidad}</output>
            <input type="range" min={1} max={10} value={velocidad} onChange={(e) => setVelocidad(Number(e.target.value))} />
          </label>
          <label>Texto <output>{tam}</output>
            <input type="range" min={28} max={100} value={tam} onChange={(e) => setTam(Number(e.target.value))} />
          </label>
        </div>
        <div className="prompter__group">
          <button type="button" className={`btn btn--sm${espejo ? " is-on" : ""}`} aria-pressed={espejo} onClick={() => setEspejo((m) => !m)}>↔ Espejo</button>
          {editando ? (
            <button type="button" className="btn btn--sm" onClick={() => { guardarGuion(guion, texto); setEditando(false); if (pantalla.current) pantalla.current.scrollTop = 0; medir(); }}>✓ Guardar</button>
          ) : (
            <button type="button" className="btn btn--sm" onClick={() => { setCorriendo(false); setEditando(true); }}>✎ Editar</button>
          )}
          <button type="button" className="btn btn--sm" onClick={pantallaCompleta}>⛶ Pantalla</button>
          <button type="button" className="btn btn--sm" onClick={salir}>✕ Salir</button>
        </div>
      </div>
      <div className="prompter__progress" aria-hidden="true"><span style={{ width: `${progreso}%` }} /></div>
      {editando ? (
        <div className="prompter__editar">
          <textarea className="textarea" value={texto} onChange={(e) => setTexto(e.target.value)} aria-label="Editar guion" autoFocus />
          <p>Los cambios se guardan solo en este navegador.</p>
        </div>
      ) : (
        <div ref={pantalla} className={`prompter__pantalla${espejo ? " is-espejo" : ""}`} onScroll={medir}>
          {cuenta > 0 ? <div className="prompter__cuenta" aria-live="assertive">{cuenta}</div> : null}
          <div className="prompter__texto" style={{ fontSize: `${tam}px` }}>{texto}</div>
        </div>
      )}
      <p className="prompter__atajos">Espacio: iniciar/pausar · ↑ ↓ velocidad · Esc: salir</p>
    </div>,
    document.body,
  );
}
