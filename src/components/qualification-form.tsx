"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { course } from "@/data/landing-content";
import {
  buildWhatsappMessage,
  classifyLead,
  LeadFormData,
  LeadStatus,
  makeWhatsappUrl,
  professionalProfiles,
  reservationIntents,
} from "@/lib/lead";

const initialData: LeadFormData = {
  fullName: "",
  whatsapp: "",
  email: "",
  city: "",
  professionalProfile: "",
  reservationIntent: "",
  contactConsent: false,
};

type Errors = Partial<Record<keyof LeadFormData, string>>;

function validateStep(step: number, data: LeadFormData): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (data.fullName.trim().length < 3) errors.fullName = "Por favor escribe tu nombre completo.";
    if (data.whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "Ingresa un número de WhatsApp válido.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Ingresa un correo electrónico válido.";
    if (data.city.trim().length < 2) errors.city = "Indica la ciudad donde resides.";
  }

  if (step === 2) {
    if (!data.professionalProfile) errors.professionalProfile = "Selecciona tu perfil profesional.";
    if (!data.reservationIntent) errors.reservationIntent = "Selecciona una opción para continuar.";
    if (!data.contactConsent) errors.contactConsent = "Debes autorizar el contacto para recibir información.";
  }

  return errors;
}

function resultCopy(status: LeadStatus, name: string) {
  if (status === "hot") {
    return {
      title: `Gracias, ${name}. Recibimos tus datos.`,
      text: "Continúa por WhatsApp para recibir los pasos de reserva y separar tu cupo.",
      button: "Continuar por WhatsApp",
      primary: true,
    };
  }
  if (status === "warm") {
    return {
      title: `Gracias, ${name}. Recibimos tu información.`,
      text: "Tu perfil corresponde al público de la capacitación. Continúa por WhatsApp para resolver dudas y recibir la información completa.",
      button: "Recibir información por WhatsApp",
      primary: true,
    };
  }
  if (status === "review") {
    return {
      title: `Gracias, ${name}. Queremos revisar tu perfil.`,
      text: "Esta capacitación está dirigida a profesionales de salud, estética y odontología. Continúa por WhatsApp para validar si tu formación aplica.",
      button: "Validar mi caso por WhatsApp",
      primary: true,
    };
  }
  if (status === "unqualified") {
    return {
      title: "Gracias por tu interés.",
      text: "Esta capacitación está dirigida a profesionales o personas tituladas en salud, estética u odontología. Por ahora, tu perfil no corresponde al público objetivo del curso.",
      button: "Solicitar revisión de mi caso",
      primary: false,
    };
  }
  return {
    title: `Gracias, ${name}. Recibimos tu información.`,
    text: "Hemos guardado tus datos. Si deseas conocer más detalles, puedes continuar por WhatsApp y resolver tus dudas.",
    button: "Recibir información por WhatsApp",
    primary: false,
  };
}

export function QualificationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadFormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ status: LeadStatus; whatsappUrl: string } | null>(null);

  const resultContent = useMemo(() => {
    if (!result) return null;
    return resultCopy(result.status, data.fullName.split(" ")[0] || data.fullName);
  }, [data.fullName, result]);

  function update<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function continueStep() {
    const nextErrors = validateStep(1, data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStep(2);
  }

  async function submit() {
    const nextErrors = validateStep(2, data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const status = classifyLead(data);
    const message = buildWhatsappMessage(data, status);
    const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    const leadId = crypto.randomUUID();
    const eventId = `lead_${Date.now()}_${leadId}`;

    try {
      if (webhook) {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead_id: leadId,
            event_id: eventId,
            created_at: new Date().toISOString(),
            form: {
              nombre: data.fullName,
              whatsapp: data.whatsapp,
              email: data.email,
              ciudad: data.city,
              perfil_profesional: data.professionalProfile,
              intencion_reserva: data.reservationIntent,
              autorizacion_contacto: data.contactConsent,
            },
            lead_status: status,
            whatsapp_message: message,
            tracking: {
              landing_url: window.location.href,
              referrer: document.referrer,
              user_agent: navigator.userAgent,
            },
          }),
        });
      }

      setResult({
        status,
        whatsappUrl: makeWhatsappUrl(course.whatsappNumber, message),
      });
    } catch {
      setErrors({ contactConsent: "No pudimos enviar tus datos. Intenta nuevamente." });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (result && resultContent) {
    return (
      <div className="premium-card rounded-[28px] p-6 md:p-8">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8A93A]/18 text-[#0E3A46]">
          <CheckCircle2 aria-hidden="true" size={28} />
        </div>
        <h3 className="text-2xl font-semibold text-[#081F2D]">{resultContent.title}</h3>
        <p className="mt-3 leading-7 text-[#4B5563]">{resultContent.text}</p>
        <a
          href={result.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={`focus-ring mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
            resultContent.primary
              ? "bg-[#E8A93A] text-[#081F2D] hover:bg-[#f0b94f]"
              : "border border-[#0E3A46]/16 bg-white text-[#081F2D] hover:border-[#E8A93A]/60"
          }`}
        >
          <MessageCircle aria-hidden="true" size={18} />
          {resultContent.button}
        </a>
      </div>
    );
  }

  return (
    <div className="premium-card rounded-[28px] p-5 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0E3A46]">Paso {step} de 2</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#081F2D]">
            {step === 1 ? "Primero, déjanos tus datos" : "Háblanos de ti"}
          </h3>
        </div>
        <div className="hidden rounded-full bg-[#E8A93A]/14 px-4 py-2 text-sm font-bold text-[#081F2D] sm:block">
          Cupos limitados
        </div>
      </div>

      {step === 1 ? (
        <div className="grid gap-4">
          <Field label="Nombre completo" error={errors.fullName}>
            <input
              className="field"
              value={data.fullName}
              onChange={(event) => update("fullName", event.target.value)}
              placeholder="Escribe tu nombre completo"
            />
          </Field>
          <Field label="WhatsApp" error={errors.whatsapp}>
            <input
              className="field"
              value={data.whatsapp}
              onChange={(event) => update("whatsapp", event.target.value)}
              placeholder="Ej: 300 000 0000"
              inputMode="tel"
            />
          </Field>
          <Field label="Correo electrónico" error={errors.email}>
            <input
              className="field"
              value={data.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="tucorreo@email.com"
              inputMode="email"
            />
          </Field>
          <Field label="Ciudad" error={errors.city}>
            <input
              className="field"
              value={data.city}
              onChange={(event) => update("city", event.target.value)}
              placeholder="Ciudad donde resides"
            />
          </Field>
          <button className="focus-ring mt-2 rounded-full bg-[#081F2D] px-6 py-4 font-bold text-white" onClick={continueStep}>
            Continuar
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          <div className="rounded-2xl border border-[#E8A93A]/45 bg-[#FFF7E7] p-4 text-[#081F2D]">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#9A6A13]">Antes de continuar</p>
            <p className="mt-2 text-sm leading-6">
              La capacitación tiene un valor total de <strong>{course.totalPrice}</strong>. Para separar el cupo se realiza un abono de <strong>{course.deposit}</strong> y el saldo restante se paga el día de la capacitación.
            </p>
          </div>
          <Field label="¿Cuál es tu perfil profesional?" error={errors.professionalProfile}>
            <div className="grid gap-2 sm:grid-cols-2">
              {professionalProfiles.map((profile) => (
                <RadioCard
                  key={profile}
                  active={data.professionalProfile === profile}
                  onClick={() => update("professionalProfile", profile)}
                >
                  {profile}
                </RadioCard>
              ))}
            </div>
          </Field>
          <Field label="¿Qué paso quieres hacer ahora?" error={errors.reservationIntent}>
            <div className="grid gap-2">
              {reservationIntents.map((intent) => (
                <RadioCard
                  key={intent}
                  active={data.reservationIntent === intent}
                  onClick={() => update("reservationIntent", intent)}
                >
                  {intent}
                </RadioCard>
              ))}
            </div>
          </Field>
          <label className="flex gap-3 rounded-2xl border border-[#0E3A46]/12 bg-white/70 p-4 text-sm leading-6 text-[#4B5563]">
            <input
              type="checkbox"
              checked={data.contactConsent}
              onChange={(event) => update("contactConsent", event.target.checked)}
              className="mt-1 h-4 w-4 accent-[#E8A93A]"
            />
            Acepto ser contactado/a por WhatsApp, llamada o correo electrónico para recibir información sobre esta capacitación.
          </label>
          {errors.contactConsent ? <p className="text-sm font-semibold text-red-700">{errors.contactConsent}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="focus-ring rounded-full border border-[#0E3A46]/16 px-6 py-4 font-bold text-[#081F2D]" onClick={() => setStep(1)}>
              Volver
            </button>
            <button
              className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E8A93A] px-6 py-4 font-bold text-[#081F2D]"
              onClick={submit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
              {isSubmitting ? "Enviando..." : "Enviar y continuar"}
            </button>
          </div>
          <p className="text-sm leading-6 text-[#4B5563]">Tus datos serán usados únicamente para contactarte sobre esta capacitación.</p>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-[#081F2D]">{label}</span>
      {children}
      {error ? <span className="text-sm font-semibold text-red-700">{error}</span> : null}
    </label>
  );
}

function RadioCard({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring rounded-2xl border p-4 text-left text-sm font-semibold transition ${
        active
          ? "border-[#E8A93A] bg-[#E8A93A]/14 text-[#081F2D]"
          : "border-[#0E3A46]/12 bg-white/70 text-[#4B5563] hover:border-[#D8B978]"
      }`}
    >
      {children}
    </button>
  );
}
