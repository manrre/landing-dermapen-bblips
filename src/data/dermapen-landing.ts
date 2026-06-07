import { getCountryName } from "@/lib/pricing";
import {
  BadgeCheck,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Syringe,
} from "lucide-react";

export const offer = {
  priceCop: "$37.847 COP",
  priceUsd: "10 USD",
  regularUsd: "25 USD",
  guarantee: "7 dias",
  productName: "Microneedling facial + BBLips Yess Lacroix",
};

export const courseStats = {
  totalModules: 2,
  totalLessons: 12,
  totalVideoHours: "4+",
  totalPDFPages: 40,
  totalDemostraciones: 4,
  totalMaterialesCubiertos: 15,
  totalPaises: 35,
  totalAlumnas: "15.000+",
};

export const mediaAssets = {
  heroMain: "/dermapen-bblips/hero-main.png",
  courseMockup: "/dermapen-bblips/course-mockup.png",
  dermapenProcedure: "/course-media/dermapen-face-before-after.jpg",
  dermapenScars: "/course-media/dermapen-acne-scars.jpg",
  dermapenStretchMarks: "/course-media/dermapen-stretch-marks.jpg",
  bblips: "/course-media/img-bblips-nueva.jpg",
  commercialPoster: "/dermapen-bblips/commercial-poster.png",
  commercialVideo: "/course-media/bblips-procedure.mp4",
  testimonialVideo: "/course-media/dermapen-glow.mp4",
  anuncioHorizontal: "/course-media/anuncio-horizontal.mp4",
  posters: {
    bblipsProcedure: "/course-media/posters/bblips-procedure-poster.jpg",
    anuncioHorizontal: "/course-media/posters/anuncio-horizontal-poster.jpg",
    dermapenGlow: "/course-media/posters/dermapen-glow-poster.jpg",
    testimonioLanding: "/course-media/posters/testimonio-landing-poster.jpg",
    testimonialShort: "/course-media/posters/testimonial-short-poster.jpg",
    commercialFeed: "/course-media/posters/commercial-feed-poster.jpg",
  },
  // REEMPLAZAR con foto real de Yess Lacroix
  yessLacroixPhoto: "/dermapen-bblips/yess-lacroix.jpg",
  // REEMPLAZAR con screenshot real de la comunidad
  communityScreenshot: "/dermapen-bblips/comunidad-screenshot.jpg",
};

export const trustItems = [
  { icon: Smartphone, title: "100% online", text: "Acceso inmediato desde celular, tablet o computador.", highlight: false },
  { icon: GraduationCap, title: "Certificado digital", text: "Descargable al terminar el contenido del curso.", highlight: false },
  { icon: CalendarCheck, title: "Acceso de por vida", text: "Puedes repetir las clases a tu ritmo.", highlight: false },
  { icon: ShieldCheck, title: "Garantia 7 dias", text: "7 dias de prueba: si no te gusta, te devolvemos el 100%", highlight: true },
  { icon: BadgeCheck, title: "Desde cero", text: "Pensado para principiantes y profesionales de belleza.", highlight: false },
  { icon: CircleDollarSign, title: "Pago protegido", text: "Pago 100% seguro en plataforma lider en Latinoamerica.", highlight: true },
];

export const solutionItems = [
  {
    icon: Syringe,
    title: "Microneedling facial",
    text: "6 lecciones dedicadas: tecnica, fundamentos esteticos y uso responsable del dispositivo con demostracion en modelo real.",
  },
  {
    icon: Sparkles,
    title: "BBLips",
    text: "6 lecciones sobre el procedimiento de labios: hidratacion, materiales, bioseguridad y practica supervisada en video.",
  },
  {
    icon: ShieldCheck,
    title: "Bioseguridad",
    text: "Modulo completo con protocolos de higiene, preparacion del area de trabajo y precauciones para reducir riesgos en cada sesion.",
  },
  {
    icon: ClipboardCheck,
    title: "Materiales",
    text: "Guia de mas de 15 materiales: dispositivo, cartuchos, principios activos y productos con criterios claros de compra.",
  },
  {
    icon: BookOpenCheck,
    title: "Manual PDF de 40 paginas",
    text: "Descargable con resumen del curso para estudiar sin conexion, repasar tecnicas y consultar en cabina.",
  },
  {
    icon: HeartPulse,
    title: "Practica real",
    text: "4 demostraciones en video que muestran cada paso antes de que tu misma apliques la tecnica en modelo real.",
  },
];

export const treatmentBenefits = [
  {
    title: "Textura y luminosidad",
    text: "Resultados visibles desde la tercera sesion. El microneedling estimula la renovacion progresiva de la piel con 1 sesion cada 4 semanas.",
  },
  {
    title: "Lineas finas y antiage",
    text: "Apoyo estetico para pieles que buscan mejorar firmeza visual. Sesiones cada 3-4 semanas. Los resultados se acumulan con cada aplicacion.",
  },
  {
    title: "Poros e imperfecciones",
    text: "Aprendes a diferenciar tipos de piel y adaptar la tecnica. No aplicas protocolos iguales para todos los casos.",
  },
  {
    title: "Marcas de acne y cicatrices",
    text: "El curso cubre criterios para una demanda frecuente en cabinas. Resultados progresivos visibles entre 3 y 6 semanas.",
  },
  {
    title: "Labios hidratados con BBLips",
    text: "BBLips se enfoca en labios con apariencia mas suave y nutrida. Efecto desde la primera sesion, mantenimiento cada 3-4 semanas.",
  },
  {
    title: "Servicio combinable",
    text: "Ofrece microneedling facial y BBLips como servicios separados o como paquete estetico de mayor valor en tu cabina.",
  },
];

export const courseBenefitSlides = [
  {
    label: "01",
    title: "Aprendes con una ruta clara",
    text: "Las clases ordenan tecnica, materiales, higiene y practica para que no avances por ensayo y error.",
    media: mediaAssets.courseMockup,
    tone: "Aprendizaje",
  },
  {
    label: "02",
    title: "Ves procedimientos reales",
    text: "Los videos e imagenes ayudan a reconocer el paso a paso, el contexto de cabina y los cuidados de cada tecnica.",
    media: mediaAssets.commercialVideo,
    tone: "Demostracion",
  },
  {
    label: "03",
    title: "Puedes estudiar a tu ritmo",
    text: "El acceso online te permite repetir las clases, revisar el manual y volver a los modulos cuando necesites practicar.",
    media: mediaAssets.dermapenProcedure,
    tone: "Flexibilidad",
  },
  {
    label: "04",
    title: "Compras con una barrera baja",
    text: "La oferta de entrada facilita empezar hoy, validar si el contenido encaja contigo y decidir tus siguientes materiales con mas criterio.",
    media: mediaAssets.bblips,
    tone: "Decision",
  },
];

export const visualProofItems = [
  {
    kind: "video",
    src: mediaAssets.anuncioHorizontal,
    title: "Anuncio Dermapen + BBLips",
    alt: "Video promocional del curso Dermapen + BBLips",
  },
  {
    kind: "image",
    src: mediaAssets.dermapenStretchMarks,
    title: "Aplicaciones esteticas corporales",
    alt: "Referencia visual de estrias antes y despues de microneedling",
  },
  {
    kind: "image",
    src: mediaAssets.bblips,
    title: "Resultado visual BBLips",
    alt: "Referencia visual de labios BBLips",
  },
];

export const scarcityOffers = [
  "Precio de lanzamiento: 10 USD en tu moneda local.",
  "Descuento disponible por tiempo limitado en la pagina de pago.",
  "Acceso inmediato a la comunidad online del curso.",
  "Manual PDF, clases online, certificado digital y garantia informada de 7 dias.",
];

export const curriculum = [
  {
    title: "Modulo de microneedling facial",
    items: [
      "Microneedling y objetivos esteticos",
      "Fisiologia basica de la piel",
      "Dispositivos, agujas y materiales",
      "Limpieza facial y preparacion",
      "Principios activos",
      "Practica en modelo real",
    ],
  },
  {
    title: "Modulo BBLips",
    items: [
      "Fisiologia y anatomia de labios",
      "Exfoliacion y proteccion",
      "Hidratacion y productos",
      "Materiales y kit BBLips",
      "Bioseguridad y precauciones",
      "Practica en modelo real",
    ],
  },
];

export const faqs = [
  {
    question: "¿El curso es 100% online?",
    answer:
      "Si. Todo el contenido es online: clases grabadas, manual PDF descargable y demostraciones en video. Accedes desde celular, tablet o computador a tu ritmo.",
  },
  {
    question: "¿Necesito experiencia previa?",
    answer:
      "No. El curso esta disenado para principiantes y tambien para esteticistas o profesionales de belleza que quieren sumar Dermapen + BBLips a sus servicios.",
  },
  {
    question: "¿Necesito comprar el Dermapen o materiales antes?",
    answer:
      "No. Dentro del curso ves exactamente que se usa y para que sirve cada material. Te recomendamos ver el contenido primero y decidir con criterio antes de invertir en equipos. La guia de materiales viene incluida.",
  },
  {
    question: "¿Cuando recibo el acceso despues de pagar?",
    answer:
      "El acceso es inmediato una vez Hotmart aprueba el pago. Con tarjeta de credito o debito suele ser en minutos. Con otros metodos puede tomar algunas horas.",
  },
  {
    question: "¿Puedo comprar desde mi pais?",
    answer:
      "Si. Hotmart acepta multiples metodos de pago en Latinoamerica: tarjetas de credito y debito, PSE (Colombia), Oxxo (Mexico), y otros metodos locales. El precio se convierte a tu moneda local.",
  },
  {
    question: "¿El certificado tiene aval internacional o gubernamental?",
    answer:
      "Es un certificado digital de finalizacion emitido por Yess Lacroix Academy. No debe presentarse como aval gubernamental, permiso profesional ni titulo oficial. Es un reconocimiento de que completaste la formacion.",
  },
  {
    question: "¿Como funciona la garantia de 7 dias?",
    answer:
      "Hotmart te protege con una garantia de 7 dias. Si el curso no cumple lo que esperabas, puedes solicitar el reembolso directamente en la plataforma Hotmart y te devuelven el 100% de tu dinero sin preguntas.",
  },
  {
    question: "¿Esto no lo puedo aprender gratis en YouTube?",
    answer:
      "En YouTube encuentras fragmentos, pero no una ruta completa con protocolos, bioseguridad, criterios de materiales y demostraciones paso a paso. Este curso te ahorra meses de ensayo y error, y te da un manual PDF para consultar en cabina.",
  },
  {
    question: "¿Tengo una duda antes de comprar, como te contacto?",
    answer:
      "Escribenos por WhatsApp al +57 311 874 5095. Resolvemos tus dudas sobre acceso, contenido, pago o materiales en minutos. No hay compromiso al preguntar.",
  },
];

export const testimonials = [
  {
    type: "whatsapp",
    name: "Carolina M.",
    country: "Colombia",
    text: "Hola Yess! Ya vi las primeras 4 clases y estoy feliz. Explicas todo super claro. Ya pedi mi dermapen con criterio, sin comprar a ciegas. Gracias!",
  },
  {
    type: "text",
    name: "Valentina R.",
    country: "Mexico",
    text: "Lo que mas me gusto es que no necesitas experiencia. Las demos en modelo real me dieron la confianza para practicar. El manual PDF lo tengo en el celular y lo consulto en cabina.",
  },
  {
    type: "text",
    name: "Daniela S.",
    country: "Argentina",
    text: "El modulo de bioseguridad vale oro. Nadie te ensena eso en tutoriales. Ahora se exactamente que protocolo seguir y como cuidar a mis clientas.",
  },
];

export const audienceItems = [
  "Cada mes sin formarte pierdes clientas que preguntan por microneedling y BBLips.",
  "Has invertido en materiales que no sabes usar porque nadie te enseno el paso a paso.",
  "La inseguridad tecnica te frena a cobrar lo que valen estos servicios en cabina.",
  "Otras esteticistas se capacitan y crecen mientras tu sigues dudando que tecnica aprender.",
];

export const roiItems = [
  { icon: CircleDollarSign, title: "Entrada accesible", text: "La oferta de 10 USD reduce la barrera para empezar a estudiar." },
  { icon: CheckCircle2, title: "Empieza sin alta inversion", text: "Un precio de entrada te permite comenzar a estudiar antes de comprar materiales o equipos." },
  { icon: MessageCircle, title: "Resuelve dudas antes de pagar", text: "Escribenos por WhatsApp y confirma acceso, certificado, contenido o materiales." },
];

/* ------------------------------------------------------------------ */
/*  Helpers de pais dinamico                                           */
/* ------------------------------------------------------------------ */

/**
 * Genera el texto del eyebrow del Hero con el pais detectado.
 * Ejemplo: "Formacion estetica online · Colombia"
 * Si el pais no esta en la tabla, retorna solo "Formacion estetica online".
 */
export function heroEyebrow(countryCode: string): string {
  const name = getCountryName(countryCode);
  // Detecta fallback: si devuelve "Colombia" sin ser CO, es generico
  if (name === "Colombia" && countryCode !== "CO") {
    return "Formacion estetica online";
  }
  return `Formacion estetica online · ${name}`;
}

/**
 * Genera los textos de escasez adaptados al pais detectado.
 * Usa el simbolo de moneda del pais segun la tabla de precios.
 */
export function getScarcityOffers(countryCode: string, pricing: { displayPrice: string; usdEquivalent: string }): string[] {
  const countryName = getCountryName(countryCode);
  const label = countryName === "Colombia" && countryCode !== "CO" ? "tu pais" : countryName;

  return [
    `Precio de lanzamiento: ${pricing.usdEquivalent} (aprox. ${pricing.displayPrice} en ${label}).`,
    "Descuento disponible por tiempo limitado en la pagina de pago.",
    "Acceso inmediato a la comunidad online del curso.",
    "Manual PDF, clases online, certificado digital y garantia informada de 7 dias.",
  ];
}

/**
 * Retorna las FAQs con preguntas adaptadas al pais del visitante.
 * Si el pais no esta en la tabla, usa "mi pais" como generico.
 */
export function getFaqs(countryCode: string) {
  const countryName = getCountryName(countryCode);
  const label = countryName === "Colombia" && countryCode !== "CO" ? "mi pais" : countryName;

  return faqs.map((faq) => {
    if (faq.question === "Puedo comprar desde mi pais?") {
      return {
        question: `Puedo comprar desde ${label}?`,
        answer: "Si. La compra se realiza a traves de una pasarela de pago segura, lider en Latinoamerica. El valor final puede variar segun conversion, metodo de pago o cuotas disponibles.",
      };
    }
    return faq;
  });
}
