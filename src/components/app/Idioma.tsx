"use client";

import { useEffect, useState } from "react";
import { EN, EN_PATRONES } from "@/lib/i18n/en";

/**
 * Inglés / español sin duplicar páginas: el contenido se escribe en español y, si el visitante elige EN,
 * se traduce en el navegador con el diccionario de `src/lib/i18n/en.ts` (textos, placeholders, aria-label).
 * Un MutationObserver traduce lo que aparece después (diálogos, resultados, cambios de página).
 * Preferencia en localStorage; la primera vez se toma del idioma del navegador.
 */

export type Lang = "es" | "en";
const KEY = "jc_lang";
const ATTRS = ["placeholder", "aria-label", "title"] as const;
const SKIP = "script, style, noscript, textarea, [data-no-traducir], [contenteditable]";

type Reg = { orig: string; set: string };
const textos = new Map<Text, Reg>();
const atributos = new Map<Element, Map<string, Reg>>();

const norm = (s: string) => s.replace(/\s+/g, " ").trim();
function traducir(es: string): string | null {
  const k = norm(es);
  if (!k) return null;
  const t = EN[k];
  if (t !== undefined) return t;
  for (const [re, rep] of EN_PATRONES) if (re.test(k)) return k.replace(re, rep);
  return null;
}
const conEspacios = (orig: string, t: string) => (orig.match(/^\s*/)?.[0] ?? "") + t + (orig.match(/\s*$/)?.[0] ?? "");

function traducirTexto(n: Text) {
  const pe = n.parentElement;
  if (!pe || pe.closest(SKIP)) return;
  const reg = textos.get(n);
  const actual = n.nodeValue ?? "";
  if (reg && actual === reg.set) return; // ya es nuestra traducción
  const t = traducir(actual);
  if (t === null) { if (reg) textos.delete(n); return; }
  const nuevo = conEspacios(actual, t);
  textos.set(n, { orig: actual, set: nuevo });
  n.nodeValue = nuevo;
}
function traducirAtributos(el: Element) {
  if (el.closest(SKIP)) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (!v) continue;
    const mapa = atributos.get(el) ?? new Map<string, Reg>();
    const reg = mapa.get(a);
    if (reg && v === reg.set) continue;
    const t = traducir(v);
    if (t === null) continue;
    mapa.set(a, { orig: v, set: t });
    atributos.set(el, mapa);
    el.setAttribute(a, t);
  }
}
function recorrer(raiz: Node) {
  if (raiz.nodeType === Node.TEXT_NODE) { traducirTexto(raiz as Text); return; }
  if (!(raiz instanceof Element)) return;
  traducirAtributos(raiz);
  const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n: Node | null;
  while ((n = w.nextNode())) {
    if (n.nodeType === Node.TEXT_NODE) traducirTexto(n as Text);
    else traducirAtributos(n as Element);
  }
}
function restaurar() {
  for (const [n, r] of textos) if (n.isConnected && n.nodeValue === r.set) n.nodeValue = r.orig;
  textos.clear();
  for (const [el, mapa] of atributos) for (const [a, r] of mapa) if (el.getAttribute(a) === r.set) el.setAttribute(a, r.orig);
  atributos.clear();
}

let observer: MutationObserver | null = null;
function aplicar(lang: Lang) {
  document.documentElement.lang = lang === "es" ? "es-MX" : "en-US";
  observer?.disconnect();
  observer = null;
  if (lang === "es") { restaurar(); return; }
  recorrer(document.body);
  observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === "characterData") traducirTexto(m.target as Text);
      else if (m.type === "attributes") traducirAtributos(m.target as Element);
      else m.addedNodes.forEach(recorrer);
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] });
}

export function leerIdioma(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "es" || v === "en") return v;
  } catch { /* sin almacenamiento */ }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
}
export function cambiarIdioma(lang: Lang) {
  try { localStorage.setItem(KEY, lang); } catch { /* sin almacenamiento */ }
  window.dispatchEvent(new CustomEvent<Lang>("jc:lang", { detail: lang }));
}

/** Motor de idioma (va una vez en el layout). */
export function Idioma() {
  useEffect(() => {
    const t = setTimeout(() => aplicar(leerIdioma()), 0); // después de hidratar
    const on = (e: Event) => aplicar((e as CustomEvent<Lang>).detail);
    window.addEventListener("jc:lang", on);
    return () => { clearTimeout(t); window.removeEventListener("jc:lang", on); observer?.disconnect(); };
  }, []);
  return null;
}

/** Selector ES | EN (en el menú). */
/** Banderas en SVG (los emoji de bandera no se ven en Windows). */
const OPCION: Record<Lang, { nombre: string; bandera: React.ReactNode }> = {
  es: {
    nombre: "Español (México)",
    bandera: (
      <svg className="idioma__flag" viewBox="0 0 30 20" aria-hidden="true">
        <rect width="10" height="20" fill="#006847" /><rect x="10" width="10" height="20" fill="#fff" /><rect x="20" width="10" height="20" fill="#ce1126" />
        <circle cx="15" cy="10" r="2.6" fill="#8c5a2b" />
      </svg>
    ),
  },
  en: {
    nombre: "English (United States)",
    bandera: (
      <svg className="idioma__flag" viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="20" fill="#b22234" />
        {[1, 3, 5, 7, 9, 11].map((i) => <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#fff" />)}
        <rect width="13" height={(20 * 7) / 13} fill="#3c3b6e" />
      </svg>
    ),
  },
};

export function SelectorIdioma({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState<Lang>("es");
  useEffect(() => {
    setLang(leerIdioma()); // eslint-disable-line react-hooks/set-state-in-effect -- preferencia guardada, solo en el cliente
    const on = (e: Event) => setLang((e as CustomEvent<Lang>).detail);
    window.addEventListener("jc:lang", on);
    return () => window.removeEventListener("jc:lang", on);
  }, []);
  return (
    <div className={`idioma ${className}`} role="group" aria-label="Idioma / Language" data-no-traducir>
      {(["es", "en"] as const).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} className={lang === l ? "is-on" : undefined} onClick={() => cambiarIdioma(l)}
          title={OPCION[l].nombre} aria-label={OPCION[l].nombre}>
          {OPCION[l].bandera}
          <span aria-hidden="true">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
