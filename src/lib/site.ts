/**
 * Configuración central del sitio. Los valores sensibles o por entorno se leen
 * de variables NEXT_PUBLIC_* (ver .env.example); lo vacío se oculta solo.
 */
export const site = {
  name: "Jean Charles Official",
  person: "Jean Charles",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeancharlesofficial.com",
  description:
    "Jean Charles: inversionista en mercados financieros y negocios digitales con más de 10 años de experiencia. Consultorías, cursos y conferencias para dominar tu mente y escalar tu negocio.",
  logo: "/brand/logo-full.png",

  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  // Contacto oficial (del sitio publicado en jeancharles-gilt.vercel.app).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "16787603837",
  phoneLabel: "+1 (678) 760 3837",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@jeancharlesofficial.com",
  address: "Chamblee, Georgia 30341 · USA",
  // Formulario "Agendar una reunión": Formspree ya conectado al correo de Jean Charles.
  formspree: process.env.NEXT_PUBLIC_FORMSPREE ?? "https://formspree.io/f/xqegaqlq",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  newsletterAction: process.env.NEXT_PUBLIC_NEWSLETTER_ACTION ?? "",

  masterclassUrl: "https://www.youtube.com/@jeancharles.digital",

  social: {
    instagram: "https://www.instagram.com/jeancharles.official/",
    youtube: "https://www.youtube.com/@jeancharles.digital",
    tiktok: "",
    linkedin: "",
    x: "",
    facebook: "https://www.facebook.com/jeancharles.digital",
  },
} as const;

/** Enlaces de afiliado / referido de Jean Charles. */
export const partners = {
  // E-Energy by Nipponflex (distribuidor oficial USA) con el código de Jean Charles.
  eEnergyRef: "sca_ref=9832906.BkKSUq4QJY",
  eEnergyStore: "https://e-energyusa.com?sca_ref=9832906.BkKSUq4QJY",
  eEnergyExito77: "https://e-energyusa.com/exito77?sca_ref=9832906.BkKSUq4QJY",
  eEnergyPartner: "https://enterprise.uppromote.com/e-energy-by-nipponflex/register?ref=BkKSUq4QJY&p=158830",
  // Tarjeta cripto (enlace de referido de Crypto.com).
  cryptoCard: "https://crypto.com/app/3q56ja4556",
} as const;

/** Servicios del formulario de contacto (los mismos valores que usaba el sitio anterior). */
export const servicios = [
  { value: "mentoria", label: "Mentoría personalizada" },
  { value: "forex", label: "Forex Trading Dashboard" },
  { value: "crypto", label: "Cripto Terminal Wealth" },
  { value: "credito", label: "Crédito optimizado (3 burós)" },
  { value: "nipponflex", label: "Nipponflex Health & Wellness" },
  { value: "conferencias", label: "Conferencia para mi empresa / evento" },
  { value: "cursos", label: "Cursos & mentorías" },
] as const;
export type ServicioId = (typeof servicios)[number]["value"];

export type SocialKey = keyof typeof site.social;

export function whatsappLink(text = "Hola Jean Charles, quiero información sobre la consultoría.") {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "";
}

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
