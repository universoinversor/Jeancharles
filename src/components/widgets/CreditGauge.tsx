import { rangoDe, rangos } from "@/content/credito";

const MIN = 300, MAX = 850, SWEEP = 240, START = 150;
const CX = 120, CY = 118, R = 92;

const pt = (t: number, r = R) => {
  const a = ((START + SWEEP * t) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};
const arc = (t1: number, t2: number) => {
  const [x1, y1] = pt(t1), [x2, y2] = pt(t2);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${R} ${R} 0 ${(t2 - t1) * SWEEP > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};
const tOf = (v: number) => (Math.min(MAX, Math.max(MIN, v)) - MIN) / (MAX - MIN);

/** Velocímetro de puntaje (300–850) con los rangos de color y la aguja. */
export function CreditGauge({ score, bureau, note }: { score: number; bureau: string; note?: string }) {
  const r = rangoDe(score);
  const t = tOf(score);
  const [nx, ny] = pt(t, R - 30);
  return (
    <figure className="gauge">
      <svg viewBox="0 0 240 200" role="img" aria-label={`${bureau}: ${score}, ${r.label}`}>
        <path d={arc(0, 1)} fill="none" stroke="rgba(239,232,218,.06)" strokeWidth="20" strokeLinecap="round" />
        {rangos.map((g) => (
          <path key={g.label} d={arc(tOf(g.min) + 0.006, tOf(g.max + 1) - 0.006)} fill="none" stroke={g.color} strokeWidth="14" strokeLinecap="butt" opacity={g.label === r.label ? 1 : 0.38} />
        ))}
        {[300, 580, 670, 740, 800, 850].map((v) => {
          const [x, y] = pt(tOf(v), R + 17);
          return <text key={v} x={x} y={y + 3} textAnchor="middle" className="gauge__tick">{v}</text>;
        })}
        <line x1={CX} y1={CY} x2={nx} y2={ny} stroke="#F2D98B" strokeWidth="4" strokeLinecap="round" />
        <circle cx={CX} cy={CY} r="44" fill="#0b0b10" stroke="rgba(224,184,74,.35)" />
        <text x={CX} y={CY + 11} textAnchor="middle" className="gauge__score">{score}</text>
        <text x={CX} y={CY + 72} textAnchor="middle" className="gauge__label" fill={r.color}>{r.label}</text>
      </svg>
      <figcaption>
        <b>{bureau}</b>
        {note ? <span>{note}</span> : null}
      </figcaption>
    </figure>
  );
}
