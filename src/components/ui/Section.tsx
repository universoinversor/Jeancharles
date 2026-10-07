import type { ReactNode } from "react";

/** Título con una palabra en oro metálico: <GoldTitle pre="El Método" gold="JC" /> */
export function GoldTitle({ pre, gold, post, as: Tag = "h2", id, className = "display h2", style }: {
  pre?: ReactNode; gold: ReactNode; post?: ReactNode; as?: "h1" | "h2" | "p"; id?: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <Tag className={className} id={id} style={style}>
      {pre ? <>{pre} </> : null}
      <span className="italic gold-text">{gold}</span>
      {post ? <> {post}</> : null}
    </Tag>
  );
}

/** Cabecera de sección: eyebrow + título (+ texto a la derecha en "split"). */
export function SectionHead({ eyebrow, title, lead, variant = "split" }: {
  eyebrow: string; title: ReactNode; lead?: ReactNode; variant?: "split" | "center" | "stack";
}) {
  const cls = variant === "split" ? "section-head section-head--split" : variant === "center" ? "section-head section-head--center reveal" : "section-head reveal";
  if (variant !== "split") {
    return (
      <header className={cls}>
        <span className="eyebrow">{eyebrow}</span>
        {title}
        {lead ? <p className="lead">{lead}</p> : null}
      </header>
    );
  }
  return (
    <header className={cls}>
      <div className="reveal">
        <span className="eyebrow">{eyebrow}</span>
        <div style={{ marginTop: "1.4rem" }}>{title}</div>
      </div>
      {lead ? <div className="lead reveal" style={{ "--d": ".1s" } as React.CSSProperties}>{lead}</div> : null}
    </header>
  );
}

/** Banda de llamada a la acción final. */
export function CtaBand({ eyebrow, title, lead, children, id }: {
  eyebrow: string; title: ReactNode; lead: ReactNode; children: ReactNode; id: string;
}) {
  return (
    <section className="section section--tight" aria-labelledby={id}>
      <div className="container">
        <div className="cta-band reveal">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <div id={id} style={{ marginTop: "1.4rem" }}>{title}</div>
            <p className="lead" style={{ marginTop: "1.2rem" }}>{lead}</p>
          </div>
          <div className="cta-band__actions">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Hero de páginas internas. */
export function PageHero({ badge, title, lead, children, center = false, id }: {
  badge: ReactNode; title: ReactNode; lead: ReactNode; children?: ReactNode; center?: boolean; id: string;
}) {
  return (
    <section className="page-hero" id="arriba" data-nav="Inicio" aria-labelledby={id}>
      <div className="grid-lines" aria-hidden="true" />
      <div className="glow" style={center ? { width: 640, height: 640, top: -200, left: "50%", marginLeft: -320 } : { width: 600, height: 600, top: -220, right: -140 }} aria-hidden="true" />
      <div className="container" style={{ position: "relative", zIndex: 2, ...(center ? { textAlign: "center", display: "grid", justifyItems: "center" } : {}) }}>
        <span className="badge">{badge}</span>
        <div id={id}>{title}</div>
        <p className="lead" style={center ? { marginInline: "auto" } : undefined}>{lead}</p>
        {children}
      </div>
    </section>
  );
}
