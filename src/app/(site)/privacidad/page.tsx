import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Política de Privacidad", description: "Cómo Jean Charles Official recopila, usa y protege tus datos personales." };

export default function Page() {
  return (
    <section className="page-hero">
      <div className="container--narrow">
        <span className="eyebrow">Legal</span>
        <h1 className="display h2" style={{ margin: "1.4rem 0 1rem" }}>Política de Privacidad</h1>
        <p className="mono muted" style={{ fontSize: ".8rem" }}>Última actualización: 5 de octubre de 2026</p>
        <div className="prose" style={{ marginTop: "2rem" }}>
<p>En Jean Charles Official respetamos tu privacidad. Esta política explica qué datos recopilamos,
                    cómo los usamos y qué derechos tienes.</p>
                <h2>1. Información que recopilamos</h2>
                <ul>
                    <li><strong>Datos que nos facilitas:</strong> nombre, correo electrónico y la información que
                        incluyas al solicitar una consultoría, unirte a la lista de espera o suscribirte al newsletter.</li>
                    <li><strong>Datos de navegación:</strong> solo si aceptas las cookies analíticas, recopilamos
                        estadísticas anónimas de uso mediante Google Analytics.</li>
                </ul>
                <h2>2. Cómo usamos tu información</h2>
                <p>Para responder a tus solicitudes, enviarte el contenido al que te suscribiste, agendar sesiones y
                    mejorar el sitio. No vendemos tus datos personales.</p>
                <h2>3. Cookies</h2>
                <p>Las cookies esenciales permiten que el sitio funcione. Las cookies analíticas solo se activan si las
                    aceptas en el aviso de cookies. Puedes cambiar tu decisión borrando los datos del sitio en tu
                    navegador.</p>
                <h2>4. Servicios de terceros</h2>
                <p>Este sitio puede integrar servicios de terceros como YouTube (modo de privacidad mejorada, solo al
                    reproducir un video), TradingView (datos de mercado), Calendly (agenda) y proveedores de email
                    marketing. Cada uno se rige por su propia política de privacidad.</p>
                <h2>5. Tus derechos</h2>
                <p>Puedes solicitar acceso, rectificación o eliminación de tus datos, y darte de baja de cualquier
                    comunicación en cualquier momento mediante el enlace incluido en cada email.</p>
                <h2>6. Seguridad</h2>
                <p>Aplicamos medidas técnicas y organizativas razonables para proteger tu información, aunque ningún
                    sistema es completamente infalible.</p>
                <h2>7. Contacto</h2>
                <p>Para cualquier consulta sobre privacidad, escríbenos a través de los canales oficiales de
                    contacto: {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : "email"} o
                    <a href="https://www.instagram.com/jeancharles.official/" target="_blank" rel="noopener">Instagram</a>.</p>
        </div>
      </div>
    </section>
  );
}
