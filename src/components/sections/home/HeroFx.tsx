"use client";

import { useEffect, useRef } from "react";
import { GoldDust } from "@/components/widgets/GoldDust";

/** Video de fondo + luz que sigue al puntero + polvo de oro. */
export function HeroFx() {
  const spot = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) vid.current?.pause();
    const hero = spot.current?.closest<HTMLElement>(".hero");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hero || !fine || reduce) return;
    let tx = 70, ty = 40, x = tx, y = ty, raf = 0;
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };
    const loop = () => {
      x += (tx - x) * 0.06; y += (ty - y) * 0.06;
      spot.current?.style.setProperty("--mx", `${x}%`);
      spot.current?.style.setProperty("--my", `${y}%`);
      raf = requestAnimationFrame(loop);
    };
    hero.addEventListener("pointermove", move);
    loop();
    return () => { hero.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="hero__media" aria-hidden="true">
        <video ref={vid} autoPlay muted loop playsInline preload="metadata" poster="/media/hero-poster.webp">
          <source src="/media/hero-loop.webm" type="video/webm" />
          <source src="/media/hero-loop.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__spot" ref={spot} aria-hidden="true" />
      <GoldDust />
    </>
  );
}
