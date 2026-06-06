export const professionalProfiles = [
  "Médico/a",
  "Odontólogo/a",
  "Fisioterapeuta",
  "Enfermero/a",
  "Cosmetólogo/a",
  "Esteticista titulada",
  "No soy profesional del área salud, estética u odontología",
] as const;

export const reservationIntents = [
  "Quiero recibir los pasos para reservar con $80.000 COP",
  "Quiero resolver algunas dudas antes de reservar",
  "Solo quiero recibir información por ahora",
] as const;

export type ProfessionalProfile = (typeof professionalProfiles)[number];
export type ReservationIntent = (typeof reservationIntents)[number];
export type LeadStatus = "hot" | "warm" | "cold" | "review" | "unqualified";

export type LeadFormData = {
  fullName: string;
  whatsapp: string;
  email: string;
  city: string;
  professionalProfile: ProfessionalProfile | "";
  reservationIntent: ReservationIntent | "";
  contactConsent: boolean;
};

const allowedProfiles = new Set<ProfessionalProfile>([
  "Médico/a",
  "Odontólogo/a",
  "Fisioterapeuta",
  "Enfermero/a",
  "Cosmetólogo/a",
  "Esteticista titulada",
]);

export function classifyLead(data: LeadFormData): LeadStatus {
  if (data.professionalProfile === "No soy profesional del área salud, estética u odontología") {
    return "unqualified";
  }

  if (!allowedProfiles.has(data.professionalProfile as ProfessionalProfile)) {
    return "review";
  }

  if (data.reservationIntent === "Quiero recibir los pasos para reservar con $80.000 COP") {
    return "hot";
  }

  if (data.reservationIntent === "Quiero resolver algunas dudas antes de reservar") {
    return "warm";
  }

  return "cold";
}

export function buildWhatsappMessage(data: LeadFormData, status: LeadStatus) {
  if (status === "hot") {
    return `Hola, quiero reservar mi cupo en la capacitación presencial de Medicina Regenerativa Aplicada con PRP, PRF y Fibrina Avanzada del sábado 23 de mayo en Cali.\n\nMi nombre es ${data.fullName}, mi perfil profesional es ${data.professionalProfile} y deseo recibir los pasos para reservar con $80.000 COP.`;
  }

  if (status === "warm") {
    return `Hola, quiero recibir más información sobre la capacitación presencial de Medicina Regenerativa Aplicada con PRP, PRF y Fibrina Avanzada del sábado 23 de mayo en Cali.\n\nMi nombre es ${data.fullName} y mi perfil profesional es ${data.professionalProfile}.`;
  }

  if (status === "review") {
    return `Hola, quiero validar si mi perfil aplica para la capacitación presencial de Medicina Regenerativa Aplicada con PRP, PRF y Fibrina Avanzada.\n\nMi nombre es ${data.fullName}, mi perfil profesional es ${data.professionalProfile} y deseo recibir orientación.`;
  }

  if (status === "unqualified") {
    return `Hola, quiero validar si mi perfil puede aplicar para la capacitación de Medicina Regenerativa Aplicada con PRP, PRF y Fibrina Avanzada.\n\nNo soy profesional del área salud, estética u odontología, pero deseo consultar mi caso.`;
  }

  return `Hola, quiero recibir información general sobre la capacitación presencial de Medicina Regenerativa Aplicada con PRP, PRF y Fibrina Avanzada del sábado 23 de mayo en Cali.\n\nMi nombre es ${data.fullName} y mi perfil profesional es ${data.professionalProfile}.`;
}

export function makeWhatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
