import Link from "next/link";
import { GoldTitle } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="glow" style={{ width: 520, height: 520, top: "20%", left: "50%", marginLeft: -260 }} aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 2, display: "grid", gap: "1.5rem", justifyItems: "center" }}>
        <span className="eyebrow eyebrow--plain">Error 404</span>
        <GoldTitle as="p" className="display h1" gold="Fuera" post="del mapa." />
        <p className="lead">Esta página no existe — pero tu siguiente nivel sí.</p>
        <Link href="/" className="btn btn--gold">Volver al inicio <span className="arrow" aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
