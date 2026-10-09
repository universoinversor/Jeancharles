import { useId } from "react";

export type OroArtKind = "cripto" | "forex" | "bio" | "mente" | "negocios" | "libro" | "neuro";

/**
 * Ilustraciones propias en oro metálico (SVG, sin fotos de stock): monedas, velas, pulso, órbitas.
 * Llenan su contenedor como una imagen con `object-fit: cover`.
 */
export function OroArt({ kind, className = "" }: { kind: OroArtKind; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${s}-${uid}`;
  const url = (s: string) => `url(#${id(s)})`;

  return (
    <svg className={`oro-art ${className}`} viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id("metal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5C3F08" />
          <stop offset=".18" stopColor="#C29327" />
          <stop offset=".36" stopColor="#F2D98B" />
          <stop offset=".46" stopColor="#FFF4CE" />
          <stop offset=".58" stopColor="#E0B84A" />
          <stop offset=".8" stopColor="#8E6616" />
          <stop offset="1" stopColor="#5C3F08" />
        </linearGradient>
        <radialGradient id={id("moneda")} cx=".32" cy=".28" r=".85">
          <stop offset="0" stopColor="#FFF4CE" />
          <stop offset=".3" stopColor="#F2D98B" />
          <stop offset=".55" stopColor="#E0B84A" />
          <stop offset=".8" stopColor="#8E6616" />
          <stop offset="1" stopColor="#5C3F08" />
        </radialGradient>
        <radialGradient id={id("halo")} cx=".72" cy=".3" r=".7">
          <stop offset="0" stopColor="#E0B84A" stopOpacity=".32" />
          <stop offset=".45" stopColor="#8E6616" stopOpacity=".1" />
          <stop offset="1" stopColor="#05050c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("area")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0B84A" stopOpacity=".35" />
          <stop offset="1" stopColor="#E0B84A" stopOpacity="0" />
        </linearGradient>
        <filter id={id("brillo")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <pattern id={id("reja")} width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="#efe8da" strokeOpacity=".05" />
        </pattern>
      </defs>

      <rect width="600" height="450" fill="#07070c" />
      <rect width="600" height="450" fill={url("halo")} />
      <rect width="600" height="450" fill={url("reja")} />

      {kind === "cripto" && (
        <g>
          <path d="M0 390 L50 370 L90 378 L140 338 L180 348 L230 298 L270 310 L320 250 L360 262 L410 206 L450 220 L500 156 L540 170 L600 112 V450 H0Z" fill={url("area")} />
          <path d="M0 390 L50 370 L90 378 L140 338 L180 348 L230 298 L270 310 L320 250 L360 262 L410 206 L450 220 L500 156 L540 170 L600 112" fill="none" stroke={url("metal")} strokeWidth="3" filter={url("brillo")} />
          <Moneda cx={455} cy={120} r={74} sym="₿" fill={url("moneda")} />
          <Moneda cx={110} cy={120} r={34} sym="Ξ" fill={url("moneda")} opacity={0.55} />
          <Moneda cx={300} cy={400} r={46} sym="$" fill={url("moneda")} opacity={0.35} />
          <Destellos />
        </g>
      )}

      {kind === "forex" && (
        <g>
          <text x="40" y="250" fontSize="230" fontFamily="var(--f-display)" fill="#efe8da" fillOpacity=".04">€$¥</text>
          {[
            [40, 300, 340, 1], [80, 310, 350, 0], [120, 280, 330, 1], [160, 270, 300, 1], [200, 285, 315, 0],
            [240, 240, 290, 1], [280, 230, 260, 1], [320, 245, 275, 0], [360, 200, 250, 1], [400, 185, 215, 1],
            [440, 195, 230, 0], [480, 150, 205, 1], [520, 130, 165, 1], [560, 110, 145, 1],
          ].map(([x, top, bottom, up]) => (
            <g key={x}>
              <line x1={x} x2={x} y1={top - 22} y2={bottom + 18} stroke="#C29327" strokeOpacity=".7" />
              <rect x={x - 9} y={top} width="18" height={bottom - top} rx="2"
                fill={up ? url("metal") : "none"} stroke={url("metal")} strokeWidth={up ? 0 : 1.5} />
            </g>
          ))}
          <path d="M20 350 C120 330 180 300 260 270 S420 210 580 120" fill="none" stroke="#FFF4CE" strokeOpacity=".75" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
          <Destellos />
        </g>
      )}

      {kind === "bio" && (
        <g>
          {[70, 120, 170, 220, 270].map((r, i) => (
            <circle key={r} cx="300" cy="225" r={r} fill="none" stroke={url("metal")} strokeOpacity={0.55 - i * 0.1} strokeWidth={i === 0 ? 2 : 1} />
          ))}
          <circle cx="300" cy="225" r="46" fill={url("moneda")} opacity=".9" />
          <text x="300" y="241" textAnchor="middle" fontSize="40" fontFamily="var(--f-display)" fontStyle="italic" fill="#3a2805">FIR</text>
          <path d="M0 225 H170 L195 180 L222 300 L250 140 L276 262 L296 225" fill="none" stroke={url("metal")} strokeWidth="3" strokeLinejoin="round" filter={url("brillo")} />
          <path d="M304 225 L324 188 L350 262 L372 205 L392 225 H600" fill="none" stroke={url("metal")} strokeWidth="3" strokeLinejoin="round" filter={url("brillo")} />
          <Destellos />
        </g>
      )}

      {kind === "mente" && (
        <g transform="translate(300 225)">
          {[0, 60, 120].map((rot) => (
            <ellipse key={rot} rx="230" ry="70" transform={`rotate(${rot - 20})`} fill="none" stroke={url("metal")} strokeOpacity=".55" />
          ))}
          <circle r="58" fill={url("moneda")} filter={url("brillo")} />
          <circle r="80" fill="none" stroke="#F2D98B" strokeOpacity=".25" />
          {[[200, -40], [-150, 95], [60, -95], [-210, -20]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#FFF4CE" />
          ))}
          <g transform="translate(-300 -225)"><Destellos /></g>
        </g>
      )}

      {kind === "negocios" && (
        <g>
          {[[90, 300], [190, 250], [290, 200], [390, 140], [490, 80]].map(([x, top], i) => (
            <rect key={x} x={x - 30} y={top} width="60" height={400 - top} rx="4" fill={url("metal")} opacity={0.35 + i * 0.15} />
          ))}
          <line x1="30" x2="570" y1="400" y2="400" stroke="#C29327" strokeOpacity=".6" />
          <path d="M60 330 L180 270 L280 238 L390 168 L520 70" fill="none" stroke="#FFF4CE" strokeWidth="3" strokeLinecap="round" filter={url("brillo")} />
          <path d="M498 66 L522 68 L516 92" fill="none" stroke="#FFF4CE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <Destellos />
        </g>
      )}

      {kind === "neuro" && (
        <g>
          {/* red neuronal: nodos dorados conectados, con el núcleo brillante al centro */}
          {NEURO_LINKS.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={NEURO_NODES[a][0]} y1={NEURO_NODES[a][1]} x2={NEURO_NODES[b][0]} y2={NEURO_NODES[b][1]}
              stroke={url("metal")} strokeOpacity=".55" strokeWidth="1.4" />
          ))}
          {NEURO_NODES.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={url("moneda")} filter={r > 9 ? url("brillo") : undefined} />
          ))}
          <circle cx="300" cy="225" r="54" fill="none" stroke="#FFF4CE" strokeOpacity=".35" />
          <circle cx="300" cy="225" r="84" fill="none" stroke="#C29327" strokeOpacity=".2" strokeDasharray="3 7" />
          <Destellos />
        </g>
      )}

      {kind === "libro" && (
        <g>
          {[-50, -25, 0, 25, 50].map((a) => (
            <path key={a} d="M300 -40 L270 470 L330 470Z" fill="#F2D98B" opacity=".05" transform={`rotate(${a} 300 -40)`} />
          ))}
          <g transform="translate(420 190) rotate(-8) scale(.85)">
            <rect x="-92" y="-128" width="184" height="256" rx="6" fill="#0d0b08" stroke={url("metal")} strokeWidth="3" />
            <rect x="-92" y="-128" width="16" height="256" fill={url("metal")} opacity=".85" />
            <rect x="-62" y="-100" width="130" height="200" rx="2" fill="none" stroke="#C29327" strokeOpacity=".5" />
            <text x="3" y="-20" textAnchor="middle" fontSize="26" fontFamily="var(--f-display)" fill="#efe8da">Hope in the</text>
            <text x="3" y="12" textAnchor="middle" fontSize="26" fontFamily="var(--f-display)" fill="#efe8da">Visible</text>
            <text x="3" y="44" textAnchor="middle" fontSize="22" fontFamily="var(--f-display)" fontStyle="italic" fill={url("metal")}>&amp; Invisible</text>
            <circle cx="3" cy="86" r="14" fill={url("moneda")} />
          </g>
          <Destellos />
        </g>
      )}
    </svg>
  );
}

function Moneda({ cx, cy, r, sym, fill, opacity = 1 }: { cx: number; cy: number; r: number; sym: string; fill: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy + r * 0.08} r={r} fill="#000" opacity=".5" />
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy} r={r * 0.84} fill="none" stroke="#5C3F08" strokeOpacity=".55" strokeWidth={r * 0.05} />
      <circle cx={cx} cy={cy} r={r * 0.9} fill="none" stroke="#FFF4CE" strokeOpacity=".55" strokeWidth={r * 0.02} />
      <text x={cx} y={cy + r * 0.32} textAnchor="middle" fontSize={r * 0.95} fontFamily="var(--f-display)" fontWeight="600" fill="#5C3F08" fillOpacity=".9">{sym}</text>
    </g>
  );
}

/** Destellos de cuatro puntas, como reflejos sobre el metal. */
function Destellos() {
  return (
    <g fill="#FFF4CE">
      {[[520, 60, 1], [80, 260, 0.6], [360, 90, 0.7], [250, 380, 0.5], [570, 330, 0.8]].map(([x, y, s]) => (
        <path key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`} d="M0 -14 C1.5 -3 3 -1.5 14 0 C3 1.5 1.5 3 0 14 C-1.5 3 -3 1.5 -14 0 C-3 -1.5 -1.5 -3 0 -14Z" opacity=".85" />
      ))}
    </g>
  );
}

/** Nodos [x, y, radio] y conexiones de la red neuronal. */
const NEURO_NODES: [number, number, number][] = [
  [300, 225, 26], [190, 150, 9], [410, 140, 10], [440, 300, 9], [180, 310, 10], [300, 90, 7],
  [300, 370, 7], [90, 220, 6], [520, 220, 7], [110, 90, 5], [500, 80, 5], [520, 380, 5], [90, 380, 5],
  [240, 60, 4], [370, 400, 4],
];
const NEURO_LINKS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 9], [1, 5], [2, 5], [2, 8], [2, 10], [3, 8],
  [3, 11], [3, 6], [4, 7], [4, 12], [4, 6], [5, 13], [6, 14], [1, 4], [2, 3],
];
