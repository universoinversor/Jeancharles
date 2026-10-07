"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "jc_intro_seen";

/**
 * Logo reveal oficial a pantalla completa, una vez por sesión.
 * Un script en <head> marca `data-intro="seen"` antes de pintar para que quien
 * ya lo vio no tenga ni un destello. Se salta con movimiento reducido o si el
 * navegador bloquea el autoplay.
 */
export function CinematicIntro() {
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro === "seen") return;
    const finish = () => {
      try { sessionStorage.setItem(KEY, "1"); } catch { /* sin almacenamiento */ }
      html.classList.remove("intro-playing");
      setDone(true);
      window.setTimeout(() => setGone(true), 950);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }

    const v = video.current;
    if (!v) return;
    html.classList.add("intro-playing");
    const onTime = () => bar.current?.style.setProperty("--p", String(v.currentTime / (v.duration || 18)));
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", finish);
    v.play().catch(finish);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter") finish(); };
    window.addEventListener("keydown", onKey);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", finish);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`intro${done ? " is-done" : ""}`} role="dialog" aria-label="Presentación de Jean Charles" aria-hidden={done}>
      {/* eslint-disable-next-line @next/next/no-img-element -- fondo difuminado local */}
      <img className="intro__fill" src="/media/intro-poster.webp" alt="" aria-hidden="true" />
      <video ref={video} className="intro__video" muted playsInline preload="auto" poster="/media/intro-poster.webp">
        <source src="/media/intro.webm" type="video/webm" />
        <source src="/media/intro.mp4" type="video/mp4" />
      </video>
      <div className="intro__bar" ref={bar}><i /></div>
      <button
        type="button"
        className="intro__skip"
        onClick={() => {
          try { sessionStorage.setItem(KEY, "1"); } catch { /* sin almacenamiento */ }
          document.documentElement.classList.remove("intro-playing");
          video.current?.pause();
          setDone(true);
          window.setTimeout(() => setGone(true), 950);
        }}
      >
        Saltar intro
      </button>
    </div>
  );
}

/** Script que corre antes del primer pintado: si ya se vio, ni se monta visible. */
export const introGateScript = `try{if(sessionStorage.getItem("${KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="seen"}catch(e){}`;
