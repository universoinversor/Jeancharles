/* eslint-disable @next/next/no-img-element -- recursos de marca locales */
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { Socials } from "@/components/ui/Socials";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { DialogLink } from "@/components/ui/DialogLink";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand height={48} />
            <p className="muted" style={{ marginTop: "1.2rem", maxWidth: "36ch" }}>
              Coach de crecimiento personal e inversor experto en mercados financieros.
            </p>
            <ul className="footer-links" role="list" style={{ marginTop: "1.2rem", fontSize: ".9rem" }}>
              <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">{site.phoneLabel}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li className="muted">{site.address}</li>
            </ul>
            <Socials />
          </div>
          <div>
            <p className="footer-title">Explorar</p>
            <ul className="footer-links" role="list">
              <li><Link href="/#sobre">Sobre mí</Link></li>
              <li><Link href="/#metodo">Método JC</Link></li>
              <li><Link href="/#servicios">Servicios</Link></li>
              <li><Link href="/#libro">Libro</Link></li>
              <li><Link href="/#media">Videos</Link></li>
              <li><Link href="/#journal">Blog</Link></li>
              <li><Link href="/#contacto">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-title">Universo JC</p>
            <ul className="footer-links" role="list">
              <li><Link href="/cursos">Cursos</Link></li>
              <li><Link href="/crypto">Cripto Terminal</Link></li>
              <li><Link href="/forex">Forex Dashboard</Link></li>
              <li><Link href="/nipponflex">Nipponflex Health</Link></li>
              <li><Link href="/miembros">Área de miembros</Link></li>
              <li><DialogLink dialog="consulta">Consultoría</DialogLink></li>
            </ul>
          </div>
          <div>
            <p className="footer-title">Newsletter</p>
            <p className="muted" style={{ fontSize: ".92rem", marginBottom: "1rem" }}>Estrategias semanales directo a tu bandeja. Sin ruido.</p>
            <NewsletterForm id="nl-footer" />
          </div>
        </div>

        <div className="footer-crest" aria-hidden="true">
          <img src="/brand/crest.webp" alt="" width={440} height={480} loading="lazy" />
          <img src="/brand/wordmark.webp" alt="" width={579} height={70} loading="lazy" />
        </div>

        <p className="disclaimer">
          El contenido de este sitio es educativo e informativo y no constituye asesoría financiera, legal ni médica
          personalizada. Invertir conlleva riesgos, incluida la pérdida del capital. Los resultados pasados no garantizan
          resultados futuros.
        </p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jean Charles Official. Todos los derechos reservados.</span>
          <nav aria-label="Legal">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
