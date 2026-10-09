import { rangoDe } from "@/content/credito";

const MIN = 300, MAX = 850, SWEEP = 240, START = 150;
const CX = 130, CY = 122, R = 88;
const SEGMENTOS = 46;

const pt = (t: number, r = R) => {
  const a = ((START + SWEEP * t) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};
const arc = (t1: number, t2: number, r = R) => {
  const [x1, y1] = pt(t1, r), [x2, y2] = pt(t2, r);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${(t2 - t1) * SWEEP > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};
const tOf = (v: number) => (Math.min(MAX, Math.max(MIN, v)) - MIN) / (MAX - MIN);
const f = (n: number) => n.toFixed(2);

/**
 * Velocímetro tipo tablero digital (300–850): segmentos LED que se encienden hasta el puntaje,
 * anillos de telemetría que giran y aguja con brillo.
 * `progreso`: si se indica, los segmentos ganados desde ese valor hasta `score` brillan en oro claro.
 */
export function CreditGauge({ score, bureau, note, progreso }: { score: number; bureau: string; note?: string; progreso?: number }) {
  const r = rangoDe(score);
  const t = tOf(score);
  const [nx, ny] = pt(t, R - 16);
  const [lx, ly] = pt(t - 0.012, 14), [rx, ry] = pt(t + 0.012, 14);

  return (
    <figure className="gauge">
      <svg viewBox="0 0 260 220" role="img" aria-label={`${bureau}: ${score}, ${r.label}`}>
        {/* anillo exterior de telemetría (gira) */}
        <g className="gauge__spin">
          <circle cx={CX} cy={CY} r={R + 24} fill="none" stroke="rgba(224,184,74,.22)" strokeDasharray="2 9" />
        </g>
        {/* marcas de escala */}
        {Array.from({ length: 56 }, (_, i) => {
          const k = i / 55, largo = i % 5 === 0;
          const [x1, y1] = pt(k, R + 11), [x2, y2] = pt(k, R + (largo ? 18 : 14));
          return <line key={i} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} stroke={largo ? "rgba(242,217,139,.55)" : "rgba(239,232,218,.18)"} strokeWidth={largo ? 1.2 : 0.8} />;
        })}
        {[300, 580, 670, 740, 800, 850].map((v) => {
          const [x, y] = pt(tOf(v), R + 29);
          return <text key={v} x={f(x)} y={f(y + 3)} textAnchor="middle" className="gauge__tick">{v}</text>;
        })}

        {/* segmentos LED */}
        {Array.from({ length: SEGMENTOS }, (_, i) => {
          const a = i / SEGMENTOS, b = (i + 1) / SEGMENTOS - 0.006;
          const valor = MIN + (MAX - MIN) * ((a + b) / 2);
          const on = (a + b) / 2 <= t;
          const ganado = on && progreso !== undefined && valor >= progreso;
          return (
            <path key={i} d={arc(a, b)} fill="none" strokeWidth="13"
              stroke={ganado ? "#FFF4CE" : rangoDe(valor).color}
              className={`gauge__seg${on ? " is-on" : ""}${ganado ? " is-gain" : ""}`} />
          );
        })}

        {/* anillo interior (gira al revés) con barrido de luz */}
        <g className="gauge__spin gauge__spin--rev">
          <circle cx={CX} cy={CY} r="60" fill="none" stroke="rgba(224,184,74,.28)" strokeDasharray="1 5" />
          <path d={arc(0.1, 0.3, 60)} fill="none" stroke="#F2D98B" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
        </g>

        {/* aguja */}
        <polygon points={`${f(lx)},${f(ly)} ${f(nx)},${f(ny)} ${f(rx)},${f(ry)}`} fill="#F2D98B" className="gauge__needle" />
        <circle cx={f(nx)} cy={f(ny)} r="3" fill="#FFF4CE" className="gauge__needle" />

        {/* núcleo */}
        <circle cx={CX} cy={CY} r="46" fill="#08080d" stroke="rgba(224,184,74,.45)" />
        <circle cx={CX} cy={CY} r="41" fill="none" stroke="rgba(224,184,74,.12)" />
        <text x={CX} y={CY - 18} textAnchor="middle" className="gauge__sys">SCORE</text>
        <text x={CX} y={CY + 13} textAnchor="middle" className="gauge__score">{score}</text>
        <text x={CX} y={CY + 30} textAnchor="middle" className="gauge__sys" fill={r.color}>/ 850</text>
        <text x={CX} y={CY + 82} textAnchor="middle" className="gauge__label" fill={r.color}>{r.label}</text>
      </svg>
      <figcaption>
        <b>{bureau}</b>
        {note ? <span>{note}</span> : null}
      </figcaption>
    </figure>
  );
}
