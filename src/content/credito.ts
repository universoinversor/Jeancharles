// Crédito optimizado — educación y acompañamiento para los 3 burós de EE. UU.
// Reglas: no prometer puntajes ni plazos (CROA), no cobrar por adelantado reparación de crédito,
// recordar que el consumidor puede disputar errores gratis. Los puntajes que se muestran son de EJEMPLO.

export const buros = [
  { name: "Equifax", ejemplo: 732 },
  { name: "Experian", ejemplo: 711 },
  { name: "TransUnion", ejemplo: 733 },
] as const;

/** Rangos de referencia del modelo FICO (300–850). VantageScore usa la misma escala con cortes parecidos. */
export const rangos = [
  { min: 300, max: 579, label: "Bajo", color: "#8a2a1c" },
  { min: 580, max: 669, label: "Regular", color: "#c2611f" },
  { min: 670, max: 739, label: "Bueno", color: "#E0B84A" },
  { min: 740, max: 799, label: "Muy bueno", color: "#a9c24a" },
  { min: 800, max: 850, label: "Excelente", color: "#4fbf6b" },
] as const;

export const rangoDe = (score: number) => rangos.find((r) => score >= r.min && score <= r.max) ?? rangos[0];

/** Qué pesa en el puntaje (ponderación pública de FICO). */
export const factores = [
  { pct: 35, title: "Historial de pagos", text: "Pagar a tiempo, siempre. Un solo atraso de 30 días puede pesar durante años." },
  { pct: 30, title: "Uso del crédito", text: "Cuánto debes frente a tu límite. Lo ideal: por debajo del 30 %, y mejor aún del 10 %." },
  { pct: 15, title: "Antigüedad", text: "La edad de tus cuentas. Cerrar tarjetas viejas puede bajar tu puntaje." },
  { pct: 10, title: "Crédito nuevo", text: "Muchas solicitudes en poco tiempo generan consultas duras y restan puntos." },
  { pct: 10, title: "Tipos de crédito", text: "Una mezcla sana: tarjetas, préstamo de auto, hipoteca o préstamo personal." },
];

/** Beneficios de tener el crédito en orden (generales; cada prestamista decide con sus propios criterios). */
export const beneficios = [
  { icon: "casa", title: "Tu casa propia", text: "Más opciones de hipoteca y mejores condiciones para comprar vivienda." },
  { icon: "tasa", title: "Tasas más bajas", text: "Un mejor puntaje suele significar intereses más bajos: miles de dólares de ahorro a lo largo de un préstamo." },
  { icon: "auto", title: "Financiamiento de auto", text: "Aprobaciones más fáciles y pagos mensuales más cómodos." },
  { icon: "negocio", title: "Capital para tu negocio", text: "Acceso a líneas de crédito y financiamiento empresarial para crecer." },
  { icon: "tarjeta", title: "Tarjetas premium", text: "Límites más altos, recompensas, millas y beneficios de viaje." },
  { icon: "llave", title: "Rentas y servicios", text: "Menos depósitos al rentar, contratar servicios o abrir cuentas." },
] as const;

/** La idea de Jean Charles: el crédito solo no alcanza; tiene que avanzar junto con los ingresos. */
export const equilibrio = [
  { title: "Crédito", text: "Tu reputación financiera en los 3 burós: abre las puertas." },
  { title: "Ingresos", text: "Tu capacidad de pago: sin income, un buen puntaje no te aprueba." },
  { title: "Deudas", text: "Tu relación deuda/ingreso (DTI): los bancos la miran tanto como el puntaje." },
];

export const pasos = [
  { n: "01", title: "Diagnóstico de los 3 burós", text: "Revisamos tus reportes de Equifax, Experian y TransUnion, línea por línea." },
  { n: "02", title: "Plan de acción", text: "Errores para disputar, uso de tarjetas, orden de pagos y qué no hacer mientras subes." },
  { n: "03", title: "Ingresos y deuda", text: "Ajustamos tu DTI y trabajamos tu income: crédito e ingresos avanzan juntos." },
  { n: "04", title: "Seguimiento", text: "Medimos el avance mes a mes hasta llegar a tu meta: casa, auto o capital para tu negocio." },
];

export const faqCredito = [
  { q: "¿Por qué mis 3 puntajes son distintos?", a: "Cada buró recibe información un poco diferente de tus acreedores y en fechas distintas. Por eso Equifax, Experian y TransUnion casi nunca muestran el mismo número, y hay que trabajar los tres." },
  { q: "¿Pueden garantizarme un puntaje?", a: "No. Nadie puede garantizar un puntaje ni borrar información correcta y vigente de tu reporte. Lo que sí hacemos es enseñarte y acompañarte con un plan claro para mejorar lo que depende de ti." },
  { q: "¿Puedo disputar errores yo mismo?", a: "Sí, y es gratis: la ley (FCRA) te permite disputar directamente con cada buró. Puedes pedir tus reportes gratuitos en AnnualCreditReport.com. Te guiamos para hacerlo bien." },
  { q: "¿Revisar mi crédito me baja puntos?", a: "Consultar tu propio crédito es una consulta suave y no afecta tu puntaje. Las consultas duras ocurren cuando solicitas crédito nuevo." },
];

/**
 * Invertir en el negocio y los impuestos (EE. UU.). Base: el IRS permite deducir los gastos "ordinarios y
 * necesarios" de un negocio, incluida la formación que mantiene o mejora habilidades del negocio actual.
 * Lo personal (p. ej. arreglar el crédito personal) no es deducible. Siempre: consultar con un contador (CPA).
 */
export const impuestos = {
  eyebrow: "Invertir también ahorra impuestos",
  pre: "Lo que inviertes en tu negocio",
  gold: "también cuenta",
  lead: "Mucha gente no invierte en su negocio porque no sabe cómo funciona el sistema: los gastos necesarios para operar y hacer crecer tu empresa se pueden deducir de tus impuestos.",
  ejemplos: [
    { title: "Equipo y mobiliario", text: "Computadoras, sillas, escritorios, herramientas de trabajo." },
    { title: "Software y marketing", text: "Programas, publicidad, página web, herramientas digitales." },
    { title: "Formación y consultoría", text: "Cursos y asesoría que mejoran las habilidades de tu negocio actual." },
  ],
  ejemplo: { gasto: 2000, tasa: 24 },
  aviso:
    "Ejemplo ilustrativo. La deducción depende de tu tipo de negocio, de que el gasto sea ordinario y necesario para él, y de tu situación fiscal; los gastos personales (como mejorar tu crédito personal) no son deducibles. Jean Charles no ofrece asesoría fiscal: confirma siempre con tu contador (CPA).",
};
