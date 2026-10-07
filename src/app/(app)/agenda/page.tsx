import type { Metadata } from "next";
import { DialogLink } from "@/components/ui/DialogLink";
import { GoldTitle, PageHero } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Agenda una consultoría estratégica 1:1 con Jean Charles.",
};

export default function AgendaPage() {
  return (
    <>
      <PageHero
        id="agenda-title"
        badge="Consultoría 1:1"
        title={<GoldTitle as="h1" className="display h1" pre="Reserva tu" gold="sesión" />}
        lead="Elige el horario que mejor te funcione. Llegas con tu situación; sales con un plan concreto."
      />
      <section className="section section--tight section--line">
        <div className="container--narrow">
          {site.calendlyUrl ? (
            <iframe className="calendly-frame" src={site.calendlyUrl} title="Agenda con Jean Charles" style={{ height: 760 }} />
          ) : (
            <div className="tile" style={{ textAlign: "center", alignItems: "center" }}>
              <p className="muted">La agenda en línea se activa al configurar NEXT_PUBLIC_CALENDLY_URL. Mientras tanto, envía tu solicitud:</p>
              <DialogLink dialog="consulta" className="btn btn--gold">Solicitar sesión</DialogLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
