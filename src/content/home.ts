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

export const articles = [
  { tag: "Finanzas", title: "Bitcoin en 2026: ¿refugio o riesgo?", text: "Ciclos de mercado y adopción institucional: dónde está la próxima gran oportunidad.", img: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=900&q=75", alt: "Gráfico de mercado financiero" },
  { tag: "Mentalidad", title: "La psicología del 1%", text: "Cómo los líderes de alto rendimiento gestionan el estrés y deciden bajo presión.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=75", alt: "Reunión de liderazgo" },
  { tag: "Negocios", title: "Sistemas invisibles de escalado", text: "Deja de operar tu negocio y empieza a dirigirlo: los tres sistemas que automatizan el crecimiento.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=75", alt: "Equipo de negocios planificando" },
];

export const cinema = {
  lines: ["Precisión.", "Potencia.", "Legado."],
  meta: ["Mercados", "Negocios", "Mente", "Cuerpo"],
  image: "/media/headlight.webp",
};

export const universe = [
  { kicker: "Mercados en vivo", title: "Cripto Terminal", href: "/crypto", img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1400&q=75", alt: "Monedas de bitcoin" },
  { kicker: "Alto rendimiento", title: "Nipponflex Health", href: "/nipponflex", img: "/img/mattress.webp", alt: "Colchón Nipponflex Triple S Firm con tecnología FIR" },
  { kicker: "Academia", title: "Cursos & Mentorías", href: "/cursos", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=75", alt: "Reunión de liderazgo" },
  { kicker: "Mercados globales", title: "Forex Dashboard", href: "/forex", img: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=900&q=75", alt: "Pantallas con gráficos de divisas" },
  { kicker: "El nuevo libro", title: "Hope in the Visible", href: "/#libro", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=75", alt: "Libro abierto sobre una mesa" },
];

/** Frase de Jean Charles (del sitio oficial). */
export const quote = "Todos sabemos lo que tenemos que hacer, pero la mayoría de la gente todavía no lo hace, porque es difícil salir de nuestra zona de confort.";
