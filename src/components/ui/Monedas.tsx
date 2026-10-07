/**
 * Monedas de oro flotando detrás del contenido (decoración pura, CSS).
 * Cada moneda: posición, tamaño, símbolo, giro 3D, desenfoque (profundidad) y retraso de su vaivén.
 */
type Moneda = { x: string; y: string; s: number; sym: string; ry?: number; blur?: number; d?: number; o?: number };

const SETS: Record<"hero" | "seccion" | "cripto", Moneda[]> = {
  hero: [
    { x: "90%", y: "62%", s: 64, sym: "Ξ", ry: -30, blur: 0, d: 1, o: 0.9 },
    { x: "58%", y: "16%", s: 44, sym: "₿", ry: 35, blur: 1, d: 0, o: 0.7 },
    { x: "54%", y: "80%", s: 34, sym: "$", ry: -40, blur: 2.5, d: 2, o: 0.45 },
    { x: "94%", y: "14%", s: 28, sym: "₿", ry: 50, blur: 3, d: 3, o: 0.35 },
  ],
  seccion: [
    { x: "93%", y: "6%", s: 46, sym: "₿", ry: 30, blur: 0.5, d: 0, o: 0.75 },
    { x: "62%", y: "3%", s: 30, sym: "$", ry: -45, blur: 2.5, d: 1.5, o: 0.45 },
    { x: "1%", y: "92%", s: 64, sym: "Ξ", ry: -25, blur: 3, d: 2.5, o: 0.35 },
  ],
  cripto: [
    { x: "6%", y: "22%", s: 72, sym: "₿", ry: 28, blur: 0, d: 0, o: 0.9 },
    { x: "88%", y: "16%", s: 56, sym: "Ξ", ry: -38, blur: 1, d: 1.2, o: 0.75 },
    { x: "80%", y: "74%", s: 40, sym: "$", ry: 45, blur: 2.5, d: 2.4, o: 0.5 },
    { x: "66%", y: "84%", s: 34, sym: "◎", ry: -50, blur: 3, d: 3.1, o: 0.4 },
  ],
};

export function Monedas({ set = "seccion" }: { set?: keyof typeof SETS }) {
  return (
    <div className="monedas" aria-hidden="true">
      {SETS[set].map((m, i) => (
        <span
          key={i}
          className="moneda"
          style={{
            left: m.x, top: m.y, "--s": `${m.s}px`, "--ry": `${m.ry ?? 0}deg`,
            "--b": `${m.blur ?? 0}px`, "--o": m.o ?? 1, animationDelay: `${-(m.d ?? 0) * 2}s`,
          } as React.CSSProperties}
        >
          <i>{m.sym}</i>
        </span>
      ))}
    </div>
  );
}
