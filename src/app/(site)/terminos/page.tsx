import type { Metadata } from "next";

export const metadata: Metadata = { title: "Términos de Servicio", description: "Términos y condiciones de uso del sitio Jean Charles Official." };

export default function Page() {
  return (
    <section className="page-hero">
      <div className="container--narrow">
        <span className="eyebrow">Legal</span>
        <h1 className="display h2" style={{ margin: "1.4rem 0 1rem" }}>Términos de Servicio</h1>
        <p className="mono muted" style={{ fontSize: ".8rem" }}>Última actualización: 5 de octubre de 2026</p>
        <div className="prose" style={{ marginTop: "2rem" }}>
<h2>1. Aceptación</h2>
                <p>Al acceder y utilizar este sitio aceptas estos Términos de Servicio y la legislación aplicable. Si no
                    estás de acuerdo, no utilices el sitio.</p>
                <h2>2. Contenido educativo</h2>
                <p>Todo el contenido —incluidos análisis de mercado, videos, artículos y datos de terceros— tiene fines
                    exclusivamente educativos e informativos. No constituye asesoría financiera, legal, fiscal ni médica
                    personalizada, ni una recomendación de compra o venta de ningún activo.</p>
                <h2>3. Riesgo de inversión</h2>
                <p>Invertir en mercados financieros y criptoactivos implica un alto riesgo, incluida la pérdida total del
                    capital. Los resultados pasados y los testimonios no garantizan resultados futuros. Eres el único
                    responsable de tus decisiones de inversión.</p>
                <h2>4. Productos de bienestar</h2>
                <p>Los productos Nipponflex mostrados son artículos de bienestar comercializados por distribuidores
                    oficiales. No son dispositivos médicos ni sustituyen la consulta con un profesional de la salud.
                    Algunos enlaces pueden generar una comisión para Jean Charles como embajador.</p>
                <h2>5. Propiedad intelectual</h2>
                <p>Los textos, marcas, logotipos y materiales del sitio pertenecen a Jean Charles Official o a sus
                    respectivos titulares. Se permite su visualización personal y no comercial.</p>
                <h2>6. Limitación de responsabilidad</h2>
                <p>El sitio se proporciona “tal cual”. Jean Charles Official no será responsable por daños derivados del
                    uso o la imposibilidad de uso de los materiales del sitio.</p>
                <h2>7. Modificaciones</h2>
                <p>Podemos actualizar estos términos en cualquier momento. La versión vigente es siempre la publicada en
                    esta página.</p>
        </div>
      </div>
    </section>
  );
}
