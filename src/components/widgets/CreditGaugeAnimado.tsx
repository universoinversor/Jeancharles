"use client";

import { useEffect, useRef, useState } from "react";
import { CreditGauge } from "@/components/widgets/CreditGauge";
import { rangoDe } from "@/content/credito";

/**
 * Velocímetro que sube de `desde` a `hasta` cada vez que entra en pantalla (la aguja y el número se mueven juntos).
 * Con movimiento reducido muestra directamente el valor final.
 */
export function CreditGaugeAnimado({ desde = 650, hasta = 750, ms = 2600, bureau = "Tu puntaje" }: { desde?: number; hasta?: number; ms?: number; bureau?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(desde);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setScore(hasta); return; } // eslint-disable-line react-hooks/set-state-in-effect -- sin animación, valor final directo
    let raf = 0, t0 = 0, timer: ReturnType<typeof setTimeout>;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const step = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / ms);
      setScore(Math.round(desde + (hasta - desde) * ease(p)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf); clearTimeout(timer);
      if (e.isIntersecting) { t0 = 0; setScore(desde); timer = setTimeout(() => { raf = requestAnimationFrame(step); }, 350); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [desde, hasta, ms]);

  return (
    <div ref={ref} className="gauge-anim">
      <CreditGauge score={score} bureau={bureau} progreso={desde} />
      <div className="gauge-anim__pasos" aria-hidden="true">
        <span>Antes <b>{desde}</b> · {rangoDe(desde).label}</span>
        <span className="gauge-anim__flecha">→</span>
        <span>Meta <b>{hasta}</b> · {rangoDe(hasta).label}</span>
      </div>
    </div>
  );
}
