// Catálogo de programas. `estado: "proximamente"` muestra el curso con lista de espera.
// TODO(fase 3): mover a Supabase (tabla `courses`) y gestionar lecciones/progreso.
export type Curso = {
  slug: string;
  titulo: string;
  categoria: "Mercados" | "Negocios" | "Mentalidad" | "Biohacking";
  nivel: "Inicial" | "Intermedio" | "Avanzado";
  modulos: number;
  resumen: string;
  estado: "disponible" | "proximamente";
};

export const cursos: Curso[] = [
  { slug: "mercados-desde-cero", titulo: "Mercados financieros desde cero", categoria: "Mercados", nivel: "Inicial", modulos: 8, resumen: "Lectura de mercado, tipos de activos, gestión de riesgo y tu primer plan de inversión.", estado: "proximamente" },
  { slug: "crypto-estrategico", titulo: "Crypto estratégico", categoria: "Mercados", nivel: "Intermedio", modulos: 10, resumen: "Ciclos, custodia, portafolio y cómo invertir en activos digitales con criterio institucional.", estado: "proximamente" },
  { slug: "negocio-digital-7-cifras", titulo: "Negocio digital a 7 cifras", categoria: "Negocios", nivel: "Avanzado", modulos: 12, resumen: "Oferta, adquisición, ventas y sistemas para escalar sin depender de ti.", estado: "proximamente" },
  { slug: "mentalidad-de-legado", titulo: "Mentalidad de legado", categoria: "Mentalidad", nivel: "Inicial", modulos: 6, resumen: "Fe, lógica y disciplina: la base interna que sostiene cada decisión financiera.", estado: "proximamente" },
  { slug: "marca-personal-autoridad", titulo: "Marca personal de autoridad", categoria: "Negocios", nivel: "Intermedio", modulos: 9, resumen: "Posicionamiento, contenido y embudos para convertir audiencia en clientes.", estado: "proximamente" },
  { slug: "biohacking-ejecutivo", titulo: "Biohacking ejecutivo", categoria: "Biohacking", nivel: "Inicial", modulos: 5, resumen: "Sueño, energía y recuperación para líderes que rinden al máximo.", estado: "proximamente" },
];
