// Contenido de la home. Editar aquí cambia el sitio sin tocar componentes.

export const heroStats = [
  { label: "Años de experiencia", value: 10, prefix: "+", suffix: "" },
  { label: "Continentes", value: 3, prefix: "", suffix: "" },
  { label: "Clientes", value: 1000, prefix: "", suffix: "+" },
];

export const specialties = [
  "Mercados financieros",
  "Negocios digitales",
  "Crypto & activos digitales",
  "Marketing de autoridad",
  "Conferencias",
  "Biohacking ejecutivo",
];

export const aboutStats = [
  { num: 10, sup: "+", label: "Años invirtiendo y enseñando" },
  { num: 3, sup: "", label: "Continentes con clientes activos" },
  { num: 1000, sup: "+", label: "Clientes globales" },
  { num: 150, sup: "+", label: "Proyectos completados" },
];

export const pillars = [
  {
    num: "I",
    title: "Mentalidad",
    text: "Prepara tu mente para el éxito masivo. Alineamos fe y lógica para romper los techos de cristal internos que frenan tus decisiones.",
    tags: ["Creencias", "Disciplina", "Enfoque"],
  },
  {
    num: "II",
    title: "Estrategia & Marketing",
    text: "Sistemas de ventas probados y posicionamiento de marca global para dominar tu nicho y convertir atención en ingresos.",
    tags: ["Ventas", "Marca", "Escala"],
  },
  {
    num: "III",
    title: "Inversión inteligente",
    text: "Multiplica activos en crypto y mercados financieros con gestión de riesgo de nivel institucional y visión de largo plazo.",
    tags: ["Mercados", "Crypto", "Riesgo"],
  },
];

export const services = [
  { title: "Asesorías personalizadas", text: "De inversión y emprendimiento de negocios: consultoría estratégica para maximizar tus inversiones y hacer crecer tu negocio con enfoque personalizado.", dialog: "consulta", servicio: "mentoria" },
  { title: "Cursos especializados", text: "En crecimiento de negocios y marketing: formación con estrategias probadas para escalar tu negocio y dominar el marketing digital.", href: "/cursos" },
  { title: "Conferencias empresariales", text: "Conferencista profesional con más de 10 años de experiencia: charlas motivacionales y estratégicas que inspiran transformación y resultados medibles.", dialog: "consulta", servicio: "conferencias" },
  { title: "Crédito optimizado", text: "Tus 3 burós (Equifax, Experian y TransUnion) alineados con tus ingresos: diagnóstico, plan y acompañamiento para mejorar tu puntaje.", href: "/credito" },
  { title: "Neuroventas & PNL", text: "Neurolingüística y neuroventas: comunicación que conecta, manejo de objeciones y cierre ético para vender, liderar y presentar.", href: "/neuroventas" },
  { title: "Marketing especializado", text: "Un equipo de marketing completo para impulsar tu negocio: estrategias digitales integrales que generan leads y aumentan las ventas.", dialog: "consulta", servicio: "mentoria" },
] as const;

export const journey = [
  { phase: "Fase 01", title: "Claridad & Mentalidad", text: "Reprogramación de creencias limitantes y definición de objetivos de alto impacto." },
  { phase: "Fase 02", title: "Estrategia de dominio", text: "Sistemas de ventas y marketing para escalar ingresos de forma predecible." },
  { phase: "Fase 03", title: "Multiplicación de activos", text: "Diversificación de capital en instrumentos financieros con riesgo controlado." },
  { phase: "Fase 04", title: "Libertad & Legado", text: "Consolidación de patrimonio y creación de impacto generacional." },
];

// IMPORTANTE: testimonios de EJEMPLO. Reemplazar por casos reales con autorización.
export const testimonials = [
  { quote: "La claridad estratégica que obtuve en solo tres sesiones reprogramó por completo mi modelo de negocio. Pasamos de seis a siete cifras en ocho meses.", name: "Carlos M.", role: "CEO · Tecnología" },
  { quote: "Jean Charles no solo enseña inversión: enseña maestría de vida. Su enfoque en la mentalidad era la pieza que me faltaba.", name: "Sofía R.", role: "Inversionista · Real Estate" },
  { quote: "El networking y las estrategias que compartimos en el círculo privado no tienen precio.", name: "David L.", role: "Fundador · E-commerce" },
];

export const videos = [
  { id: "DQ5NYKoDu0E", kicker: "Destacado · YouTube", title: "Episodio destacado" },
  { id: "UkCEhz4mW8I", kicker: "YouTube", title: "Mercados & estrategia" },
  { id: "Ud4X__a61bA", kicker: "YouTube", title: "Mentalidad & negocio" },
];

export const articles: { tag: string; title: string; text: string; art: "cripto" | "mente" | "negocios" }[] = [
  { tag: "Finanzas", title: "Bitcoin en 2026: ¿refugio o riesgo?", text: "Ciclos de mercado y adopción institucional: dónde está la próxima gran oportunidad.", art: "cripto" },
  { tag: "Mentalidad", title: "La psicología del 1%", text: "Cómo los líderes de alto rendimiento gestionan el estrés y deciden bajo presión.", art: "mente" },
  { tag: "Negocios", title: "Sistemas invisibles de escalado", text: "Deja de operar tu negocio y empieza a dirigirlo: los tres sistemas que automatizan el crecimiento.", art: "negocios" },
];

export const cinema = {
  lines: ["Precisión.", "Potencia.", "Legado."],
  meta: ["Mercados", "Negocios", "Mente", "Cuerpo"],
};

// Arte propio en oro (OroArt) o imagen local: nada de fotos de stock.
export const universe = [
  { kicker: "Mercados en vivo", title: "Cripto Terminal", href: "/crypto", art: "cripto" },
  { kicker: "Alto rendimiento", title: "Nipponflex Health", href: "/nipponflex", img: "/img/mattress.webp", alt: "Colchón Nipponflex Triple S Firm", variant: "producto" },
  { kicker: "Academia", title: "Cursos & Mentorías", href: "/cursos", img: "/img/jean-charles.webp", alt: "Jean Charles", variant: "portrait" },
  { kicker: "Mercados globales", title: "Forex Dashboard", href: "/forex", art: "forex" },
  { kicker: "El nuevo libro", title: "Hope in the Visible", href: "/#libro", art: "libro" },
] as const;

/** Frase de Jean Charles (del sitio oficial). */
export const quote = "Todos sabemos lo que tenemos que hacer, pero la mayoría de la gente todavía no lo hace, porque es difícil salir de nuestra zona de confort.";

export const contacto = {
  eyebrow: "Contacto",
  pre: "Tu siguiente nivel",
  gold: "empieza aquí",
  lead: "Cuéntanos tu objetivo —inversión, negocio, conferencia o bienestar— y el equipo de Jean Charles te responde personalmente.",
  horario: "Respuesta en menos de 24 h hábiles",
};
