"use client";

import { useEffect, useRef } from "react";
import { GoldDust } from "@/components/widgets/GoldDust";
import { Monedas } from "@/components/ui/Monedas";

/** Aurora dorada de fondo + luz que sigue al puntero + polvo de oro. */
export function HeroFx() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero__spot" ref={spot} aria-hidden="true" />
      <GoldDust />
      <Monedas set="hero" />
    </>
  );
}
