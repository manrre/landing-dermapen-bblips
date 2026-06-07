import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { CountdownTimer } from "@/components/landing/countdown-timer";
import { CourseBenefitSlider } from "@/components/landing/dermapen-experience";
import { FloatingActions } from "@/components/landing/floating-actions";
import { CountryEyebrow } from "@/components/landing/country-eyebrow";
import { HotmartButton } from "@/components/landing/hotmart-button";
import { LivePrice } from "@/components/landing/live-price";
import { getOfferPricing } from "@/lib/pricing";
import { whatsappUrl } from "@/lib/hotmart-links";
import {
  audienceItems,
  courseStats,
  curriculum,
  faqs,
  mediaAssets,
  offer,
  roiItems,
  scarcityOffers,
  solutionItems,
  testimonials,
  treatmentBenefits,
  trustItems,
  visualProofItems,
} from "@/data/dermapen-landing";


export default function Home() {
  const pricing = getOfferPricing();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Microneedling Facial + BBLips",
            "description": "Curso online para aprender microneedling facial y BBLips desde cero. 12 lecciones, demo real, certificado digital.",
            "provider": {
              "@type": "Organization",
              "name": "Yess Lacroix Academy"
            },
            "offers": {
              "@type": "Offer",
              "price": "10",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://pay.hotmart.com/V40642188D"
            }
          }),
        }}
      />
      <main>
      <TopScarcity pricing={pricing} />
      <Hero pricing={pricing} />
      <MiniOferta pricing={pricing} />
      <ProblemSection />
      <SolutionSection />
      <CourseBenefitSlider />
      <VisualPreviewSection />
      <BenefitsSection />
      <MediaProofSection />
      <RoiSection pricing={pricing} />
      <AuthoritySection />
      <TestimonialsSection />
      <CurriculumSection />
      <OfferSection pricing={pricing} />
      <FaqSection />
      <FinalCta pricing={pricing} />
      <FloatingActions />
    </main>
    </>
  );
}

function TopScarcity({ pricing }: { pricing: ReturnType<typeof getOfferPricing> }) {
  return (
    <aside className="top-scarcity" aria-label="Oferta por tiempo limitado">
      <span>Oferta por tiempo limitado</span>
      <strong><LivePrice fallback={pricing.displayDiscountCop} /></strong>
      <CountdownTimer compact />
    </aside>
  );
}

function MiniOferta({ pricing }: { pricing: ReturnType<typeof getOfferPricing> }) {
  return (
    <section className="section-pad mini-oferta-section">
      <div className="container-page mini-oferta-grid">
        <div className="mini-oferta-trust-row">
          <span className="mini-oferta-trust-badge">
            <BadgeCheck size={18} /> 100% online
          </span>
          <span className="mini-oferta-trust-badge">
            <BadgeCheck size={18} /> Certificado digital
          </span>
          <span className="mini-oferta-trust-badge">
            <ShieldCheck size={18} /> Garantia de 7 dias
          </span>
        </div>
        <h2>
          Todo esto por <LivePrice fallback={pricing.displayDiscountCop} />
        </h2>
        <ul className="mini-oferta-bullets">
          <li><CheckCircle2 size={18} /> 12 lecciones online</li>
          <li><CheckCircle2 size={18} /> 4 demostraciones reales en video</li>
          <li><CheckCircle2 size={18} /> Manual PDF de 40 paginas</li>
          <li><CheckCircle2 size={18} /> Guia de mas de 15 materiales</li>
          <li><CheckCircle2 size={18} /> Certificado digital de finalizacion</li>
          <li><CheckCircle2 size={18} /> Acceso de por vida</li>
          <li><CheckCircle2 size={18} /> Garantia de 7 dias</li>
        </ul>
        <div className="mini-oferta-actions">
          <HotmartButton source="meta-co-mini">Quiero acceder al curso por {offer.priceUsd} <ArrowRight size={18} /></HotmartButton>
        </div>
        <p className="mini-oferta-footnote">
          <ShieldCheck size={14} /> Pago seguro procesado por Hotmart
        </p>
      </div>
    </section>
  );
}

function Hero({ pricing }: { pricing: ReturnType<typeof getOfferPricing> }) {
  return (
    <section className="hero-section">
      <div className="container-page hero-grid">
        <div className="hero-copy">
          <CountryEyebrow />
          <h1>Aprende Dermapen + BBLips online desde {offer.priceUsd}</h1>
          <p className="hero-lede">
            12 lecciones, 4 demos reales, manual PDF, certificado digital y acceso de por vida.
          </p>
          <div className="hero-trust-row" aria-label="Confianza">
            <span className="hero-trust-tag"><ShieldCheck size={16} /> Garantia de 7 dias</span>
            <span className="hero-trust-tag"><CheckCircle2 size={16} /> Pago seguro Hotmart</span>
            <span className="hero-trust-tag"><CheckCircle2 size={16} /> Acceso inmediato</span>
          </div>
          <div className="hero-actions" aria-label="Accion principal">
            <HotmartButton source="meta-co-hero">Acceder al curso por {offer.priceUsd} <ArrowRight size={18} /></HotmartButton>
          </div>
          <p className="hero-price-hint">
            <LivePrice fallback={pricing.displayDiscountCop} /> en tu moneda local · pago unico
          </p>
          <div className="hero-whatsapp-link">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> Tengo una duda antes de comprar
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Imagen del curso">
          <div className="hero-media-card">
            <Image
              src="/dermapen-bblips/hero-main.png"
              alt="Curso Dermapen + BBLips"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Confianza">
      <div className="container-page trust-grid">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className={`trust-item${item.highlight ? " trust-item-highlight" : ""}`}>
              <Icon size={22} aria-hidden="true" />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section-pad problem-section">
      <div className="container-page split-grid">
        <div>
          <p className="eyebrow">El problema</p>
          <h2>Quieres ofrecer Dermapen + BBLips, pero no sabes por donde empezar</h2>
        </div>
        <div className="copy-stack">
          <ul className="check-list">
            <li><CheckCircle2 size={18} /> No sabes que aguja usar ni como estructurar el protocolo.</li>
            <li><CheckCircle2 size={18} /> Has visto tutoriales, pero no tienes una ruta clara de aprendizaje.</li>
            <li><CheckCircle2 size={18} /> Quieres ofrecer Dermapen + BBLips sin invertir a ciegas en materiales.</li>
          </ul>
          <p>
            Si quieres empezar en estetica o ampliar tu cabina, este curso te da una ruta practica
            para entender la tecnica, elegir materiales con criterio y practicar antes de invertir de mas.
          </p>
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="section-pad solution-section">
      <div className="container-page">
        <div className="section-heading center">
          <p className="eyebrow">Que aprenderas</p>
          <h2>12 lecciones que te llevan de cero a atender con criterio</h2>
          <p className="emotion-lede">
            Imagina llegar a tu cabina y saber exactamente que aguja usar, que producto aplicar y como cobrar cada sesion sin dudar.
          </p>
        </div>
        <div className="feature-grid">
          {solutionItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="feature-card">
                <Icon size={26} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
        <p className="section-link">
          <a href="#contenido-curso" className="btn-text">¿Que incluye el curso?</a>
        </p>
      </div>
    </section>
  );
}

function VisualPreviewSection() {
  return (
    <section className="section-pad visual-preview-section">
      <div className="container-page">
        <div className="section-heading center">
          <p className="eyebrow">Mira lo que vas a aprender</p>
          <h2>Un vistazo real del contenido del curso</h2>
        </div>
        <div className="visual-preview-grid">
          {/* Video preview */}
          <figure className="visual-preview-card visual-preview-video">
            <video autoPlay muted loop playsInline preload="metadata" controlsList="nodownload noremoteplayback">
              <source src={mediaAssets.commercialVideo} type="video/mp4" />
            </video>
            <figcaption>Demo de procedimiento real</figcaption>
          </figure>
          {/* Course mockup */}
          <figure className="visual-preview-card">
            <Image src={mediaAssets.courseMockup} alt="Vista del curso online" fill sizes="(max-width: 768px) 100vw, 25vw" />
            <figcaption>Plataforma del curso</figcaption>
          </figure>
          {/* Manual PDF placeholder — REEMPLAZAR con imagen real del manual */}
          <figure className="visual-preview-card visual-preview-placeholder">
            <FileText size={36} />
            <figcaption>Manual PDF de 40 paginas</figcaption>
          </figure>
          {/* Certificado placeholder — REEMPLAZAR con imagen real del certificado */}
          <figure className="visual-preview-card visual-preview-placeholder">
            <BadgeCheck size={36} />
            <figcaption>Certificado digital</figcaption>
          </figure>
        </div>
        <p className="visual-preview-disclaimer">
          Las imagenes son referencias educativas. Los resultados pueden variar segun piel, tecnica, materiales y cuidados de cada persona.
        </p>
        <p className="section-link center">
          <a href="#contenido-curso" className="btn-text">Ver contenido completo del curso</a>
        </p>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="section-pad benefits-section">
      <div className="container-page">
        <div className="section-heading center">
          <p className="eyebrow">Resultados que puedes ofrecer</p>
          <h2>Aprende protocolos para resultados progresivos</h2>
          <p className="emotion-lede">
            Tus clientas notaran la diferencia en textura, luminosidad e hidratacion. Tu notaras la diferencia en tu lista de precios.
          </p>
        </div>
        <div className="benefits-grid">
          {treatmentBenefits.slice(0, 3).map((benefit) => (
            <article key={benefit.title} className="benefit-card">
              <Sparkles size={20} />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
        <details className="benefits-more" open>
          <summary>Ver mas resultados que puedes ofrecer</summary>
          <div className="benefits-more-grid">
            {treatmentBenefits.slice(3).map((benefit) => (
              <article key={benefit.title} className="benefit-card">
                <Sparkles size={20} />
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </details>
        <p className="section-link">
          <a href="#oferta" className="btn-text">Quiero ver el precio con descuento</a>
        </p>
      </div>
    </section>
  );
}

function MediaProofSection() {
  return (
    <section className="section-pad media-proof-section">
      <div className="container-page media-proof-grid">
        <div>
          <p className="eyebrow">Videos e imagenes reales</p>
          <h2>Mira procedimientos, resultados de referencia y contenido real antes de comprar</h2>
          <p className="section-copy">
            Revisa referencias del contenido, los procedimientos y los resultados esperados para saber
            que vas a estudiar antes de comprar.
          </p>
          <p className="disclaimer-copy">
            Las referencias visuales son educativas. Los resultados pueden variar segun piel, materiales, tecnica,
            cuidados posteriores y condiciones de cada persona.
          </p>
        </div>
        <div className="media-stack">
          <video className="commercial-video" poster="/course-media/posters/anuncio-horizontal-poster.jpg" controls playsInline preload="metadata">
            <source src={mediaAssets.anuncioHorizontal} type="video/mp4" />
          </video>
          <div className="result-grid">
            {visualProofItems.slice(1).map((item) => (
              <figure key={item.title}>
                {item.kind === "video" ? (
                  <video controls playsInline preload="metadata">
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 980px) 50vw, 220px" />
                )}
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
            <figure>
              <video controls playsInline preload="metadata">
                <source src={mediaAssets.testimonialVideo} type="video/mp4" />
              </video>
              <figcaption>Referencia de piel luminosa</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoiSection({ pricing }: { pricing: ReturnType<typeof getOfferPricing> }) {
  return (
    <section className="section-pad roi-section">
      <div className="container-page split-grid">
        <div>
          <p className="eyebrow">¿Vale la pena?</p>
          <h2>15.000+ alumnas en 35 paises ya empezaron</h2>
          <p className="emotion-lede">
            Por menos de lo que cuesta un kit de pruebas accedes a una formacion completa que puedes repetir a tu ritmo.
          </p>
          <p className="section-copy">
            Sin materiales previos, sin experiencia requerida. El curso te da criterio para que despues compres solo lo que necesitas.
          </p>
          <HotmartButton source="meta-co-roi">Quiero el precio de lanzamiento</HotmartButton>
        </div>
        <div className="roi-list">
          {roiItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="roi-item">
                <Icon size={24} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section className="section-pad authority-section">
      <div className="container-page">
        <div className="section-heading center">
          <p className="eyebrow">Yess Lacroix Academy</p>
          <h2>Formacion creada por Yess Lacroix Academy, comunidad online con alumnas en 35 paises</h2>
        </div>
        <div className="authority-grid">
          {/* Foto Yess Lacroix — REEMPLAZAR con imagen real */}
          <div className="authority-photo-card">
            <div className="authority-photo-placeholder">
              <Image
                src={mediaAssets.yessLacroixPhoto}
                alt="Yess Lacroix"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="authority-photo-img"
              />
            </div>
            <h3>Yess Lacroix</h3>
            <p>Fundadora de Yess Lacroix Academy</p>
          </div>
          {/* Comunidad visual — REEMPLAZAR con screenshot real */}
          <div className="authority-community-card">
            <div className="authority-community-placeholder">
              <Image
                src={mediaAssets.communityScreenshot}
                alt="Comunidad de alumnas Yess Lacroix Academy"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="authority-community-img"
              />
            </div>
            <div className="authority-stats">
              <span><strong>15.000+</strong> alumnas en comunidad</span>
              <span><strong>35</strong> paises</span>
              <span><strong>7 dias</strong> garantia</span>
            </div>
          </div>
        </div>
        <div className="note-panel authority-note">
          <ShieldCheck size={24} />
          <h3>Nota responsable</h3>
          <p>
            Este curso es una formacion online en tecnicas esteticas. Los resultados pueden variar.
            Revisa la normativa aplicable en tu ciudad o pais antes de ofrecer procedimientos a terceros.
          </p>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section-pad testimonials-section">
      <div className="container-page">
        <div className="section-heading center">
          <p className="eyebrow">Testimonios reales</p>
          <h2>Escucha a quienes ya se formaron</h2>
          <p>
            La experiencia real de quienes ya estan aprendiendo Dermapen + BBLips.
          </p>
        </div>
        <div className="testimonial-video-wrapper">
          <video
            className="testimonial-video"
            poster="/course-media/posters/testimonio-landing-poster-v2.jpg"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/course-media/testimonio-landing.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="testimonial-cards-grid">
          {testimonials.map((t) => (
            <blockquote key={t.name} className={`testimonial-card${t.type === 'whatsapp' ? ' testimonial-wa' : ''}`}>
              <p>{t.text}</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.country}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  return (
    <section className="section-pad curriculum-section" id="contenido-curso">
      <div className="container-page">
        <div className="section-heading">
          <p className="eyebrow">Contenido</p>
          <h2>Esto es exactamente lo que vas a aprender</h2>
        </div>
        <div className="curriculum-grid">
          {curriculum.map((block) => (
            <article key={block.title} className="curriculum-block">
              <h3>{block.title}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}><BadgeCheck size={18} /> {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="section-link center">
          <a href="#oferta" className="btn-text">Ver precio con descuento</a>
        </p>
      </div>
    </section>
  );
}

function OfferSection({ pricing }: { pricing: ReturnType<typeof getOfferPricing> }) {
  return (
    <section className="section-pad offer-section" id="oferta">
      <div className="container-page offer-layout">
        <div>
          <p className="eyebrow">Oferta especial</p>
          <h2>Inscribete hoy y accede al curso completo por precio de lanzamiento</h2>
          <p>
            La oferta de lanzamiento baja el acceso completo a {offer.priceUsd}. El precio final puede variar segun
            conversion, pais o metodo de pago.
          </p>
          <ul className="scarcity-list">
            {scarcityOffers.map((item) => (
              <li key={item}><CheckCircle2 size={18} /> {item}</li>
            ))}
          </ul>
        </div>
        <div className="offer-box">
          <span className="old-price">Antes <LivePrice fallback={pricing.displayRegularCop} type="regular" /></span>
          <strong className="current-price-big"><LivePrice fallback={pricing.displayDiscountCop} /></strong>
          <HotmartButton source="meta-co-trust">Acceder ahora por {offer.priceUsd} <ArrowRight size={18} /></HotmartButton>
          <CountdownTimer />
          <p className="guarantee-text"><ShieldCheck size={16} /> Garantia de {offer.guarantee}: si no quedas satisfecha, te reembolsamos el 100%</p>
          <div className="offer-after-pay">
            <h3>Que pasa despues de pagar</h3>
            <ul>
              <li><CheckCircle2 size={14} /> Recibes acceso online inmediato</li>
              <li><CheckCircle2 size={14} /> Ves las clases desde celular, tablet o PC</li>
              <li><CheckCircle2 size={14} /> Descargas el manual PDF de 40 paginas</li>
              <li><CheckCircle2 size={14} /> Terminas el contenido y recibes tu certificado digital</li>
            </ul>
          </div>
          <p className="offer-hotmart-seal">
            <ShieldCheck size={14} /> Compra segura procesada por <strong>Hotmart</strong>
          </p>
          <p className="offer-whatsapp-link">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} /> ¿Tienes dudas? Escribenos por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section-pad faq-section">
      <div className="container-page">
        <div className="section-heading center">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2>Preguntas clave antes de inscribirte</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ pricing }: { pricing: ReturnType<typeof getOfferPricing> }) {
  return (
    <section className="final-cta">
      <div className="container-page final-cta-inner">
        <Sparkles size={28} aria-hidden="true" />
        <h2>Empieza hoy con Dermapen + BBLips desde <LivePrice fallback={pricing.displayDiscountCop} /></h2>
        <p>Inscribete ahora y accede a las 12 lecciones, 4 demos reales, manual PDF y certificado digital.</p>
        <HotmartButton source="meta-co-final" variant="dark">Acceder al curso por {offer.priceUsd} <ArrowRight size={18} /></HotmartButton>
        <p className="guarantee-badge"><ShieldCheck size={16} /> Garantia de {offer.guarantee}: si no quedas satisfecha, Hotmart te reembolsa el 100%</p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="final-cta-wa">
          <MessageCircle size={14} /> ¿Tienes dudas? Escribenos por WhatsApp
        </a>
      </div>
    </section>
  );
}
