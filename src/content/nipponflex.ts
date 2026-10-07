// Nipponflex Health — catálogo oficial de E-Energy by Nipponflex (USA) con el código de Jean Charles.
// Precios referenciales tomados de la tienda; el precio final lo confirma la tienda al pagar.
import { partners } from "@/lib/site";

const ref = (path: string) => `https://e-energyusa.com${path}?${partners.eEnergyRef}`;

export const benefits = [
  { icon: "fir", title: "FIR Power", text: "Tecnología de infrarrojo lejano integrada en los sistemas: emite ondas de entre 4 y 14 micras, como la luz suave de la mañana, para un descanso más profundo." },
  { icon: "magnet", title: "Magnetismo", text: "Imanes de ferrita de bario ubicados estratégicamente que evocan el campo magnético natural de la Tierra mientras duermes." },
  { icon: "vibro", title: "Vibro Relax", text: "Micro-masaje electrónico con distintas frecuencias e intensidades, pensado para relajar el cuerpo antes de dormir." },
] as const;

export const problems = [
  { n: "01", title: "Mala circulación", text: "Menos oxígeno llegando a los músculos retrasa la recuperación." },
  { n: "02", title: "Exposición a EMF", text: "Pantallas y luz artificial alteran el ritmo natural del sueño." },
  { n: "03", title: "Tensión en la columna", text: "Las superficies planas no acompañan la curvatura natural del cuerpo." },
];

export type Product = {
  slug: string;
  name: string;
  price?: number;
  text: string;
  bullets: string[];
  img: string;
  url: string;
  featured?: boolean;
  flag?: string;
};

export const products: Product[] = [
  {
    slug: "triple-s-firm",
    name: "Nipponflex Triple S Firm",
    price: 6559.65,
    text: "La plataforma de descanso insignia: FIR Power, magnetismo y Vibro Relax multizona en un solo sistema.",
    bullets: ["Alineación completa de la columna", "Regulación de temperatura", "Vibro Relax por zonas"],
    img: "/img/mattress.webp",
    url: ref("/products/nipponflex-us-triple-s-firm"),
    featured: true,
    flag: "Insignia",
  },
  {
    slug: "hive-dream-pillow",
    name: "Hive Dream FIR Pillow",
    price: 507.45,
    text: "Almohada ergonómica para la zona cervical, con puntos FIR y magnéticos.",
    bullets: ["Soporte cervical ergonómico", "Puntos FIR y magnéticos"],
    img: "https://e-energyusa.com/cdn/shop/files/WhatsApp_Image_2025-11-26_at_14.53.03_d70af48a.jpg",
    url: ref("/products/hive-dream-pillow"),
  },
  {
    slug: "fir-ion-bracelet",
    name: "FIR ION Bicolor Bracelet",
    price: 247,
    text: "Lleva FIR y magnetismo contigo todo el día, con un diseño ejecutivo.",
    bullets: ["FIR + magnetismo", "Uso diario"],
    img: "https://e-energyusa.com/cdn/shop/files/359085713_670051741829034_2806861226433582955_n.jpg",
    url: ref("/products/copy-of-bracelet-fir-ion-black"),
  },
  {
    slug: "wellness-kit-premium",
    name: "Wellness Kit Premium",
    price: 1709,
    text: "El combo portátil de FIR y magnetismo para acompañar tu recuperación donde estés.",
    bullets: ["Kit completo portátil", "FIR + magnetismo"],
    img: "https://e-energyusa.com/cdn/shop/files/13_aedcc70e-0c79-4897-a962-f24e8f02fa5c.jpg",
    url: ref("/products/wellness-kit-premium-02"),
    flag: "Más completo",
  },
  {
    slug: "alkaline-max-squeeze",
    name: "Alkaline Max Squeeze",
    text: "Botella con tecnología Ion Balls para alcalinizar y magnetizar tu agua en cualquier lugar.",
    bullets: ["Tecnología Ion Balls", "Portátil"],
    img: "/img/squeeze.webp",
    url: ref("/products/2020-ion-balls-new-squeeze"),
  },
];

export const gateways = [
  { title: "Tienda oficial USA", text: "El catálogo completo de E-Energy by Nipponflex con envío verificado dentro de Estados Unidos.", cta: "Entrar a la tienda", href: partners.eEnergyStore },
  { title: "Colección Exito77", text: "La selección Exito77 de ropa y accesorios bio-magnéticos de alto rendimiento.", cta: "Ver Exito77", href: partners.eEnergyExito77 },
  { title: "Programa de socios", text: "Únete a la red: regístrate como afiliado o distribuidor dentro del ecosistema de Jean Charles.", cta: "Registrarme", href: partners.eEnergyPartner },
];

export const faq = [
  { q: "¿Qué es la tecnología FIR Power?", a: "FIR (infrarrojo lejano) usa esferas sintéticas con titanio, aluminio y platino que emiten ondas de 4 a 14 micras, similares a la luz suave de la mañana, sin generar calor." },
  { q: "¿Por qué comprar con el enlace de Jean Charles?", a: "Nipponflex USA vende a través de su red de socios certificados. Comprando desde estos enlaces tu pedido queda registrado con el código de Jean Charles y recibes su acompañamiento." },
  { q: "¿Hacen envíos fuera de Estados Unidos?", a: "Este inventario sale del centro de distribución de Nipponflex USA, con envío dentro de Estados Unidos. Para otros países, escríbenos y te orientamos." },
  { q: "¿Sustituyen un tratamiento médico?", a: "No. Son productos de bienestar y descanso; no están destinados a diagnosticar, tratar ni curar ninguna enfermedad. Consulta a tu médico ante cualquier condición de salud." },
];
