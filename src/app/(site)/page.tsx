import { DialogLink } from "@/components/ui/DialogLink";
import { CtaBand, GoldTitle } from "@/components/ui/Section";
import { Hero } from "@/components/sections/home/Hero";
import { About, Marquee } from "@/components/sections/home/About";
import { Journey, Method, Services } from "@/components/sections/home/Method";
import { Book, MarketStrip, Performance, Testimonials } from "@/components/sections/home/Showcase";
import { Journal, Media } from "@/components/sections/home/Media";
import { CinemaBand, Universe } from "@/components/sections/home/Cinema";
import { site, whatsappLink } from "@/lib/site";

export default function HomePage() {
  const wa = whatsappLink();
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <CinemaBand />
      <Method />
      <Services />
      <Journey />
      <Universe />
      <MarketStrip />
      <Performance />
      <Testimonials />
      <Book />
      <Media />
      <Journal />
      <CtaBand
        id="cta-title"
        eyebrow="Plazas limitadas cada mes"
        title={<GoldTitle pre="Tu siguiente nivel" gold="empieza hoy." />}
        lead="Agenda una sesión estratégica y sal con un plan concreto para tu capital, tu negocio y tu mente."
      >
        <DialogLink dialog="consulta" className="btn btn--gold btn--block btn--magnetic">
          Agendar consultoría <span className="arrow" aria-hidden="true">→</span>
        </DialogLink>
        {wa ? <a href={wa} className="btn btn--block" target="_blank" rel="noopener">Escribir por WhatsApp</a> : null}
        <a href={site.social.instagram} className="btn btn--block" target="_blank" rel="noopener">Seguir en Instagram</a>
      </CtaBand>
    </>
  );
}
