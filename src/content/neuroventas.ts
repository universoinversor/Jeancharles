// Neurolingüística (PNL) y Neuroventas — comunicación y ventas con método.
// Reglas: técnicas de comunicación, no terapia ni promesas de resultados; persuasión ética, nunca manipulación.

export const neuroIntro = {
  pnl: {
    title: "Programación neurolingüística (PNL)",
    text: "Un modelo práctico de comunicación: cómo usas el lenguaje, dónde pones tu enfoque y qué creencias te frenan. Sirve para hablar con más claridad, conectar más rápido y sostener hábitos nuevos.",
  },
  neuro: {
    title: "Neuroventas",
    text: "Aplicar lo que sabemos sobre cómo decide el cerebro —emoción, atención, confianza y atajos mentales— para vender mejor, con ética y sin presionar.",
  },
};

export const pilares = [
  { n: "01", title: "Rapport y confianza", text: "Conectar en los primeros minutos: escucha activa, ritmo y lenguaje que hacen sentir a la otra persona entendida." },
  { n: "02", title: "Preguntas poderosas", text: "Preguntas que descubren lo que el cliente realmente quiere, en lugar de recitar características." },
  { n: "03", title: "Lenguaje que mueve", text: "Palabras, historias y metáforas que convierten una idea en una imagen clara y memorable." },
  { n: "04", title: "Estado emocional", text: "Manejar tus nervios y tu energía antes de una llamada, una presentación o un cierre importante." },
  { n: "05", title: "Emoción + lógica", text: "Las personas deciden con la emoción y lo justifican con la lógica: tu mensaje necesita las dos." },
  { n: "06", title: "Objeciones y cierre", text: "Escuchar la objeción, entender el miedo detrás y guiar hacia una decisión, sin presión." },
];

/** El recorrido de una conversación de venta. */
export const recorrido = [
  { phase: "Atención", title: "Capta", text: "Un inicio que rompe el piloto automático: una pregunta, un dato o una historia." },
  { phase: "Conexión", title: "Conecta", text: "Rapport y escucha: la persona siente que hablas de su problema, no de tu producto." },
  { phase: "Deseo", title: "Visualiza", text: "Le ayudas a ver el después: cómo cambia su vida o su negocio con la solución." },
  { phase: "Decisión", title: "Cierra", text: "Resuelves objeciones y propones el siguiente paso con claridad y seguridad." },
];

export const aplicaciones = [
  { icon: "venta", title: "Ventas 1:1", text: "Llamadas, citas y seguimiento por WhatsApp con un guion que se siente natural." },
  { icon: "escenario", title: "Presentaciones", text: "Hablar en público y en conferencias con presencia, estructura e impacto." },
  { icon: "equipo", title: "Liderazgo", text: "Comunicar visión, dar feedback y motivar a tu equipo." },
  { icon: "contenido", title: "Marketing y contenido", text: "Textos, anuncios y videos que captan atención y generan acción." },
  { icon: "negociacion", title: "Negociación", text: "Llegar a acuerdos donde ambas partes ganan, sin ceder de más." },
  { icon: "mente", title: "Mentalidad", text: "Cambiar el diálogo interno que te frena: del miedo al rechazo a la confianza." },
] as const;

export const formatos = [
  { title: "Taller para empresas", text: "Formación en vivo para tu equipo comercial, presencial o en línea.", servicio: "conferencias" },
  { title: "Mentoría 1:1", text: "Sesiones con Jean Charles sobre tus casos reales de venta y comunicación.", servicio: "neuroventas" },
  { title: "Curso en línea", text: "El método completo a tu ritmo, con ejercicios prácticos.", href: "/cursos" },
] as const;

export const faqNeuro = [
  { q: "¿La PNL es terapia?", a: "No. Aquí se usa como un conjunto de técnicas de comunicación y hábitos para la vida profesional. No sustituye la atención psicológica ni médica." },
  { q: "¿Neuroventas es manipular?", a: "No. Es entender cómo decide una persona para comunicar mejor el valor real de lo que ofreces. Si el producto no le sirve al cliente, la venta no debe hacerse." },
  { q: "¿Sirve si no soy vendedor?", a: "Sí. Todos vendemos ideas: en una entrevista, frente a un inversionista, con tu equipo o en tu familia." },
  { q: "¿En cuánto tiempo veo resultados?", a: "Depende de tu práctica. Son habilidades: mejoran con repetición, feedback y aplicación en situaciones reales." },
];
