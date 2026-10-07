/* eslint-disable @next/next/no-img-element -- recursos de marca locales */
import { DialogLink } from "@/components/ui/DialogLink";
import { heroStats } from "@/content/home";
import { site } from "@/lib/site";
import { HeroFx } from "./HeroFx";

const RAMP = ["#8e6616", "#c29327", "#fff4ce", "#e0b84a", "#c29327", "#8e6616", "#f2d98b"];
const OFFSETS = [0, 0.18, 0.34, 0.46, 0.62, 0.8, 1];

export function Hero() {
  return (
    <section className="hero hero--cinema" aria-labelledby="hero-title">
      <HeroFx />

      <div className="container hero__grid">
        <div>
          <div className="hero__kicker">
            <img className="hero__wordmark" src="/brand/wordmark.webp" alt="Jean Charles" width={579} height={70} />
            <span className="eyebrow eyebrow--plain">Coach de crecimiento personal · Inversionista · Conferencista</span>
          </div>
          <h1 className="display h1 hero__title" id="hero-title">
            <span className="line"><span>Domina tu mente.</span></span>
            <span className="line"><span className="italic gold-text">Escala</span></span>
            <span className="line"><span>tu negocio.</span></span>
          </h1>
          <p className="lead hero__lead">
            Sistemas probados en mercados financieros, negocios digitales y alto rendimiento personal. Más de una
            década construyendo patrimonio — ahora, contigo.
          </p>
          <div className="hero__ctas">
            <DialogLink dialog="consulta" className="btn btn--gold btn--magnetic">
              Agendar consultoría <span className="arrow" aria-hidden="true">→</span>
            </DialogLink>
            <a href={site.masterclassUrl} target="_blank" rel="noopener" className="btn btn--magnetic">Ver masterclass</a>
          </div>
          <dl className="hero__meta">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.prefix ? <sup>{s.prefix}</sup> : null}<span data-count={s.value}>{s.value}</span>{s.suffix ? <sup>{s.suffix}</sup> : null}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="seal seal--crest seal--person" aria-hidden="true">
          <span className="seal__halo" />
          <svg className="seal__ring" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="oro-anillo" gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="380" y2="380">
                {RAMP.map((c, i) => <stop key={i} offset={OFFSETS[i]} stopColor={c} />)}
              </linearGradient>
              <path id="ring" d="M200,200 m-182,0 a182,182 0 1,1 364,0 a182,182 0 1,1 -364,0" />
            </defs>
            <text>
              <textPath href="#ring" textLength="1135" lengthAdjust="spacing">
                Inversionista global ✦ Estratega ✦ Conferencista ✦ Mentor ✦ Negocios digitales ✦ Mercados ✦
              </textPath>
            </text>
          </svg>
          <div className="seal__orbit"><span className="seal__dot" /></div>
          <div className="seal__inner">
            <span className="crest"><img src="/brand/crest.webp" alt="" width={440} height={480} /></span>
          </div>
          {/* Retrato oficial (fondo transparente): de pie delante del sello. */}
          <img className="seal__person" src="/img/jean-charles.webp" alt="" width={394} height={1216} fetchPriority="high" />
          <span className="seal__tag seal__tag--a"><span className="live-dot" /> Disponible para consultoría</span>
          <span className="seal__tag seal__tag--b">+10 años · 3 continentes</span>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">SCROLL<i /></div>
    </section>
  );
}
