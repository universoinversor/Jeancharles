import { BookingForm } from "@/components/ui/BookingForm";
import { GoldTitle } from "@/components/ui/Section";
import { Socials } from "@/components/ui/Socials";
import { contacto } from "@/content/home";
import { site, whatsappLink } from "@/lib/site";

/** Cierre de la home: datos de contacto y el formulario de agenda a la vista, como en el sitio original. */
export function Contact() {
  return (
    <section className="section section--raised" id="contacto" data-nav="Contacto" aria-labelledby="contacto-title">
      <div className="container contact">
        <div className="contact__info reveal">
          <span className="eyebrow">{contacto.eyebrow}</span>
          <GoldTitle id="contacto-title" pre={contacto.pre} gold={contacto.gold} style={{ margin: "1.2rem 0" }} />
          <p className="lead">{contacto.lead}</p>
          <ul className="contact__list" role="list">
            <li>
              <span>WhatsApp</span>
              <a href={whatsappLink()} target="_blank" rel="noopener">{site.phoneLabel}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span>Oficina</span>
              <p>{site.address}</p>
            </li>
          </ul>
          <p className="mono muted contact__note"><span className="live-dot" /> {contacto.horario}</p>
          <Socials />
        </div>
        <div className="contact__form panel reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
          <div className="panel__head"><b>Agenda tu consultoría</b><span>Aplicación privada</span></div>
          <div className="contact__body">
            <BookingForm idPrefix="c" />
          </div>
        </div>
      </div>
    </section>
  );
}
