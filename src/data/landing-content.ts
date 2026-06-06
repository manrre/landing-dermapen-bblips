import {
  Activity,
  BadgeCheck,
  Bone,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  HeartPulse,
  MapPin,
  Microscope,
  Scissors,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const course = {
  name: "Medicina Regenerativa Aplicada con PRP, PRF y Fibrina Avanzada",
  instructor: "Dra. María Teresa Martínez",
  city: "Cali, Colombia",
  address: "Calle 10 #49B-27, barrio Panamericano, sur de Cali",
  date: "Sábado 23 de mayo de 2026",
  shortDate: "23 de mayo",
  schedule: "8:00 a.m. a 5:00 p.m.",
  duration: "8 horas",
  seats: "Máximo 15 participantes",
  totalPrice: "$450.000 COP",
  deposit: "$80.000 COP",
  balance: "$370.000 COP",
  paymentMethods: "Nequi o presencial",
  whatsappNumber: "573000000000",
};

export const assetPaths = {
  hero: "/images/hero/hero-prp-fibrina.webp",
  fibrinDark: "/images/backgrounds/fibrina-dark.webp",
  fibrinLight: "/images/backgrounds/fibrina-light.webp",
  instructor: "/images/instructor/dra-maria-teresa-martinez.webp",
  materials: "/images/materials/guias-certificado.webp",
  practiceMaterials: "/images/materials/materiales-practica.webp",
  evolution: {
    prp: "/images/evolution/prp.webp",
    prf: "/images/evolution/prf.webp",
    aprf: "/images/evolution/a-prf.webp",
    iprf: "/images/evolution/i-prf.webp",
  },
  applications: {
    facial: "/images/applications/bioestimulacion-facial.webp",
    hair: "/images/applications/regeneracion-capilar.webp",
    tissue: "/images/applications/reparacion-tisular.webp",
    dental: "/images/applications/odontologia-prf.webp",
    joints: "/images/applications/infiltraciones-articulares.webp",
  },
};

export const trustItems = [
  { icon: MapPin, title: "Presencial en Cali", text: "Jornada en el sur de la ciudad." },
  { icon: Clock3, title: "8 horas intensivas", text: "De 8:00 a.m. a 5:00 p.m." },
  { icon: Activity, title: "Práctica en modelo", text: "Aprendizaje aplicado, no solo teoría." },
  { icon: FileText, title: "Guías incluidas", text: "Material impreso y digital en PDF." },
  { icon: BadgeCheck, title: "Certificado", text: "Certificado de asistencia al finalizar." },
  { icon: Users, title: "Solo 15 cupos", text: "Grupo reducido para mayor acompañamiento." },
];

export const evolutionCards = [
  {
    key: "prp",
    title: "PRP",
    subtitle: "Plasma Rico en Plaquetas",
    image: assetPaths.evolution.prp,
    text: "Concentrado plaquetario líquido con liberación rápida de factores de crecimiento.",
  },
  {
    key: "prf",
    title: "PRF",
    subtitle: "Plasma Rico en Fibrina",
    image: assetPaths.evolution.prf,
    text: "Matriz de fibrina que permite mayor soporte biológico y liberación más sostenida.",
  },
  {
    key: "aprf",
    title: "A-PRF",
    subtitle: "Fibrina Rica en Plaquetas Avanzada",
    image: assetPaths.evolution.aprf,
    text: "Protocolo orientado a mayor retención celular y una matriz más activa.",
  },
  {
    key: "iprf",
    title: "I-PRF",
    subtitle: "Fibrina Inyectable",
    image: assetPaths.evolution.iprf,
    text: "Versión líquida que puede polimerizar y formar una matriz tras su aplicación.",
  },
];

export const learningBlocks = [
  {
    icon: Microscope,
    title: "Bases biológicas",
    items: ["PRP y concentrados plaquetarios", "Factores de crecimiento", "Bioestimulación", "Remodelación tisular"],
  },
  {
    icon: Sparkles,
    title: "PRP, PRF, A-PRF e I-PRF",
    items: ["Matriz de fibrina", "Liberación rápida y sostenida", "Soporte estructural biológico", "Fibrina avanzada"],
  },
  {
    icon: HeartPulse,
    title: "Aplicaciones profesionales",
    items: ["Bioestimulación facial", "Regeneración capilar", "Odontología", "Infiltraciones articulares"],
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y criterio",
    items: ["Contraindicaciones", "Historia clínica", "Consentimiento informado", "Selección del paciente"],
  },
];

export const applications = [
  {
    icon: Sparkles,
    title: "Bioestimulación facial",
    image: assetPaths.applications.facial,
    text: "Comprende protocolos orientados a calidad de piel, reparación y estímulo biológico.",
  },
  {
    icon: Scissors,
    title: "Regeneración capilar",
    image: assetPaths.applications.hair,
    text: "Aprende el papel de los factores de crecimiento en protocolos capilares.",
  },
  {
    icon: Activity,
    title: "Reparación tisular",
    image: assetPaths.applications.tissue,
    text: "Conoce cómo la fibrina participa en cicatrización, soporte tisular y reparación.",
  },
  {
    icon: GraduationCap,
    title: "Odontología y cirugía oral",
    image: assetPaths.applications.dental,
    text: "Explora aplicaciones de PRF en regeneración tisular y soporte biológico odontológico.",
  },
  {
    icon: Bone,
    title: "Infiltraciones articulares",
    image: assetPaths.applications.joints,
    text: "Comprende fundamentos de tendones, cartílago, ligamentos y procesos degenerativos.",
  },
];

export const timeline = [
  { time: "8:00 a.m.", title: "Inicio", text: "Bienvenida, contextualización y fundamentos." },
  { time: "Mañana", title: "Bases técnicas", text: "PRP, PRF, fibrina avanzada, factores de crecimiento y criterios." },
  { time: "Mediodía", title: "Almuerzo", text: "Espacio para que cada participante salga a almorzar por su cuenta." },
  { time: "Tarde", title: "Práctica en modelo", text: "Acompañamiento docente, resolución de dudas y revisión de criterios." },
  { time: "5:00 p.m.", title: "Cierre", text: "Finalización de la jornada y certificado de asistencia." },
];

export const audienceProfiles = [
  "Médicos",
  "Odontólogos",
  "Fisioterapeutas",
  "Enfermeras",
  "Cosmetólogos",
  "Esteticistas tituladas",
];

export const includes = [
  "Capacitación presencial de 8 horas",
  "Materiales para la práctica",
  "Práctica en modelo",
  "Guías impresas",
  "Guías digitales en PDF",
  "Certificado de asistencia",
  "Acompañamiento docente",
  "Grupo reducido de máximo 15 participantes",
];

export const faqs = [
  ["¿Quiénes pueden tomar la capacitación?", "Médicos, odontólogos, fisioterapeutas, enfermeras, cosmetólogos y esteticistas tituladas. No está dirigida al público general."],
  ["¿El curso es presencial?", "Sí. Es una capacitación presencial en Cali, Colombia."],
  ["¿Cuándo se realiza?", "La capacitación se realizará el sábado 23 de mayo de 2026, de 8:00 a.m. a 5:00 p.m."],
  ["¿Dónde será la capacitación?", "Será en la Calle 10 #49B-27, barrio Panamericano, al sur de Cali."],
  ["¿Incluye práctica?", "Sí. La capacitación incluye práctica en modelo y materiales para la práctica."],
  ["¿Entregan certificado?", "Sí. Se entrega certificado de asistencia al finalizar la capacitación."],
  ["¿Cuánto cuesta?", "El valor total de la capacitación es de $450.000 COP. Puedes separar tu cupo con $80.000 COP."],
  ["¿Cómo reservo mi cupo?", "Puedes reservar con $80.000 COP por Nequi o de forma presencial. El saldo restante de $370.000 COP se paga el día de la capacitación."],
  ["¿El almuerzo está incluido?", "No. Se dará un espacio al mediodía para que cada participante pueda salir a almorzar por su cuenta."],
  ["¿Es para público general?", "No. Es una formación dirigida a profesionales o personas tituladas en salud, estética u odontología."],
];

export const cta = {
  primary: "Quiero inscribirme",
  secondary: "Recibir información de inscripción",
};
