import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
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
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <CourseBenefitSlider />
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

function Hero({ pricing }: { pricing: ReturnType<typeof getOfferPricing> }) {
  return (
    <section className="hero-section">
      <div className="container-page hero-grid">
        <div className="hero-copy">
          <CountryEyebrow />
          <h1>Aprende Microneedling Facial + BBLips en {courseStats.totalLessons} lecciones online — desde {offer.priceUsd}</h1>
          <p className="hero-lede">
            Aprende desde cero con demostraciones reales, guia de materiales, bioseguridad, manual PDF,
            certificado digital y acceso de por vida. Empieza hoy por solo {offer.priceUsd},
            sin comprar equipos a ciegas.
          </p>
          <p className="price-note" aria-label="Precio del curso">
            Precio hoy: desde <LivePrice fallback={pricing.displayDiscountCop} /> (Desde {offer.priceUsd} / precio en moneda local segun tu pais). El valor final puede variar por conversion y metodo de pago.
          </p>
          <div className="hero-actions" aria-label="Accion principal">
            <HotmartButton source="meta-co-hero">No perder el descuento del 60% — Inscribirme ahora</HotmartButton>
          </div>
          <div className="mini-proof" aria-label="Beneficios rapidos">
            <span><CheckCircle2 size={16} /> 100% online</span>
            <span><CheckCircle2 size={16} /> Certificado</span>
            <span><CheckCircle2 size={16} /> Garantia 7 dias</span>
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
          <p className="eyebrow">Para empezar con criterio</p>
          <h2>¿3 meses viendo tutoriales sin saber por donde empezar? Es suficiente.</h2>
        </div>
        <div className="agitation-block">
          <p className="agitation-lead">
            Mientras tanto, cada mes que pasa sin formarte:
          </p>
          <ul className="check-list">
            <li><CheckCircle2 size={18} /> Pierdes clientas que preguntan por microneedling y BBLips porque no sabes como ofrecerlos.</li>
            <li><CheckCircle2 size={18} /> Inviertes en materiales que no sabes usar, sin una ruta clara de aprendizaje.</li>
            <li><CheckCircle2 size={18} /> La inseguridad tecnica te frena a cobrar lo que realmente vale un servicio estetico.</li>
          </ul>
        </div>
        <div className="copy-stack">
          <p>
            Si quieres empezar en estetica o ampliar tu cabina, este curso te da una ruta practica
            para entender la tecnica, elegir materiales con criterio, cuidar la bioseguridad y
            practicar antes de invertir de mas.
          </p>
          <ul className="check-list">
            {audienceItems.map((item) => (
              <li key={item}><CheckCircle2 size={18} /> {item}</li>
            ))}
          </ul>
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
          <p>
            12 lecciones organizadas en 2 modulos: microneedling facial y BBLips. Con 4 demostraciones reales, guia de 15 materiales, protocolo de bioseguridad y manual PDF de 40 paginas para consultar en cabina.
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

function BenefitsSection() {
  return (
    <section className="section-pad benefits-section">
      <div className="container-page">
        <div className="section-heading center">
          <p className="eyebrow">Resultados que puedes ofrecer</p>
          <h2>Resultados visibles desde la 3a sesion</h2>
          <p className="emotion-lede">
            Tus clientas notaran la diferencia en textura, luminosidad e hidratacion. Tu notaras la diferencia en tu lista de precios.
          </p>
          <p>
            6 areas de aplicacion para sumar a tu cabina: textura y luminosidad, lineas finas, poros, marcas de acne, labios hidratados con BBLips y servicio combinado. Cada una con criterios claros de aplicacion y frecuencia.
          </p>
        </div>
        <div className="benefits-grid">
          {treatmentBenefits.map((benefit) => (
            <article key={benefit.title} className="benefit-card">
              <Sparkles size={20} />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
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
          <p className="eyebrow">Oferta de entrada</p>
          <h2>15.000+ alumnas empezaron asi. Por solo 10 USD.</h2>
          <p className="emotion-lede">
            Por menos de lo que cuesta un kit de pruebas, tienes 12 lecciones, manual PDF, 4 demostraciones reales y certificado digital.
          </p>
          <p className="section-copy">
            Accede desde tu pais por <LivePrice fallback={pricing.displayDiscountCop} />. Sin materiales previos, sin experiencia requerida. Pierdes mas tiempo dudando que lo que cuesta el curso.
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
      <div className="container-page authority-layout">
        <div className="authority-panel">
          <p className="eyebrow">Yess Lacroix Academy</p>
          <h2>Yess Lacroix Academy: comunidad en 35 paises</h2>
          <p>
            Mas de 15.000 alumnas han hecho parte de la comunidad de Yess Lacroix Academy en distintos paises.
            El curso se entrega por una comunidad online privada, con acceso digital y certificado de finalizacion.
          </p>
          <div className="authority-stats">
            <span><strong>15.000+</strong> alumnas en comunidad</span>
            <span><strong>35</strong> paises mencionados</span>
            <span><strong>7 dias</strong> garantia</span>
          </div>
        </div>
        <div className="note-panel">
          <ShieldCheck size={30} />
          <h3>Nota responsable</h3>
          <p>
            Este curso es una formacion online en tecnicas esteticas. Los resultados pueden variar.
            Revisa la normativa aplicable en tu ciudad o pais antes de ofrecer procedimientos a terceros.
          </p>
        </div>
        <p className="section-link">
          <a href="#oferta" className="btn-text">Unete a 15.000+ alumnas</a>
        </p>
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
            Escucha la experiencia real de quienes ya estan formandose con Dermapen + BBLips.
            Resultados, aprendizaje y motivacion desde adentro.
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
            La oferta de lanzamiento baja el acceso completo a {offer.priceUsd}. El precio final puede moverse por
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
          <HotmartButton source="meta-co-trust">Aprovechar antes de que suba a {offer.regularUsd}</HotmartButton>
          <CountdownTimer />
          <p className="guarantee-text"><ShieldCheck size={16} /> Garantia de {offer.guarantee}: si no quedas satisfecha, te reembolsamos</p>
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
        <h2>Empieza hoy con Microneedling Facial y BBLips por solo <LivePrice fallback={pricing.displayDiscountCop} /></h2>
        <p>Inscribete con descuento y accede a una formacion online que puedes repetir a tu ritmo.</p>
        <HotmartButton source="meta-co-final" variant="dark">Quiero el precio de lanzamiento antes que se acabe <ArrowRight size={18} /></HotmartButton>
        <p className="guarantee-badge"><ShieldCheck size={16} /> Garantia de {offer.guarantee}: si no quedas satisfecha, te reembolsamos</p>
      </div>
    </section>
  );
}
