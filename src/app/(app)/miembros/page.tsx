import type { Metadata } from "next";
import Link from "next/link";
import { DialogLink } from "@/components/ui/DialogLink";
import { GoldTitle } from "@/components/ui/Section";
import { TradingView } from "@/components/widgets/TradingView";
import { cursos } from "@/content/cursos";
import { supabaseConfigured } from "@/lib/site";
import { getUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Área de miembros", robots: { index: false } };

export default async function MiembrosPage() {
  const user = await getUser();
  const nombre = (user?.user_metadata?.name as string | undefined) ?? user?.email?.split("@")[0];

  return (
    <div className="app-shell">
      <div className="container">
        {!supabaseConfigured ? (
          <div style={{ marginBottom: "1.5rem" }}><span className="badge">Vista previa · conecta Supabase para activar el login</span></div>
        ) : null}
        <span className="eyebrow">Área de miembros</span>
        <GoldTitle as="h1" className="display h2" pre={nombre ? `Hola, ${nombre}.` : "Tu"} gold={nombre ? "Sigamos." : "círculo privado"} style={{ margin: "1.2rem 0 2.5rem" }} />

        <div className="app-grid">
          <section className="tile min-[900px]:col-span-8" aria-labelledby="t-cursos">
            <span className="tile__label" id="t-cursos">Mis programas</span>
            {cursos.slice(0, 3).map((c, i) => (
              <div key={c.slug} style={{ display: "grid", gap: ".45rem", paddingBlock: ".6rem", borderTop: i ? "1px solid var(--line)" : undefined }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                  <strong style={{ fontWeight: 500 }}>{c.titulo}</strong>
                  <span className="soon">Próximamente</span>
                </div>
                <div className="progress"><i style={{ "--v": "0%" } as React.CSSProperties} /></div>
              </div>
            ))}
            <Link href="/cursos" className="link-underline" style={{ marginTop: "auto" }}>Ver catálogo completo</Link>
          </section>

          <section className="tile min-[900px]:col-span-4" aria-labelledby="t-sesion">
            <span className="tile__label" id="t-sesion">Próxima sesión 1:1</span>
            <span className="tile__value">Sin agendar</span>
            <p className="muted">Reserva tu sesión estratégica con Jean Charles.</p>
            <DialogLink dialog="consulta" className="btn btn--gold btn--sm" >Agendar ahora</DialogLink>
          </section>

          <section className="tile min-[900px]:col-span-7" style={{ padding: 0 }} aria-labelledby="t-mercado">
            <div className="panel__head" style={{ borderRadius: 0 }}><b id="t-mercado">Mercados</b><span>En vivo</span></div>
            <TradingView kind="single-quote" className="panel__body" config={{ symbol: "BITSTAMP:BTCUSD", width: "100%" }} />
            <Link href="/crypto" className="link-underline" style={{ margin: "0 1.6rem 1.6rem" }}>Abrir Crypto Nexus</Link>
          </section>

          <section className="tile min-[900px]:col-span-5" aria-labelledby="t-comunidad">
            <span className="tile__label" id="t-comunidad">Comunidad</span>
            <span className="tile__value">Círculo privado</span>
            <p className="muted">Networking, directos mensuales y estrategias compartidas entre miembros.</p>
            <span className="soon">Próximamente</span>
          </section>
        </div>
      </div>
    </div>
  );
}
