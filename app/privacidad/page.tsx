import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Yess Lacroix Academy",
  description:
    "Política de privacidad y protección de datos personales de Yess Lacroix Academy y Formación Integral y Artística (FIA).",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">
        Política de Privacidad
      </h1>
      <p className="text-sm text-gray-500 mb-10">
        Última actualización: 7 de junio de 2026
      </p>

      <section className="space-y-8 text-base leading-relaxed">
        {/* 1. Responsable */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            1. Responsable del Tratamiento
          </h2>
          <p>
            <strong>Razón social:</strong> Formación Integral y Artística (FIA)
            — Yess Lacroix Academy
            <br />
            <strong>Domicilio:</strong> Cali, Valle del Cauca, Colombia
            <br />
            <strong>Correo electrónico:</strong>{" "}
            <a
              href="mailto:wafiaeduca@gmail.com"
              className="text-[#c9a84c] underline"
            >
              wafiaeduca@gmail.com
            </a>
            <br />
            <strong>Teléfono:</strong> +57 311 874 5095
            <br />
            <strong>Sitio web:</strong>{" "}
            <a
              href="https://dermapen.esteticaybellezafia.com"
              className="text-[#c9a84c] underline"
            >
              dermapen.esteticaybellezafia.com
            </a>
          </p>
        </div>

        {/* 2. Datos que recopilamos */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            2. Datos Personales que Recopilamos
          </h2>
          <p>
            Para gestionar nuestra publicidad en plataformas Meta (Facebook e
            Instagram) y operar nuestro sistema de gestión de leads, recopilamos
            las siguientes categorías de datos:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Datos de identificación:</strong> nombre, apellido, número
              de cédula.
            </li>
            <li>
              <strong>Datos de contacto:</strong> correo electrónico, número de
              teléfono, ciudad de residencia.
            </li>
            <li>
              <strong>Datos de navegación:</strong> dirección IP, páginas
              visitadas, interacciones con anuncios (mediante Meta Pixel).
            </li>
            <li>
              <strong>Datos de interés académico:</strong> cursos consultados,
              fecha de contacto, fuente de procedencia.
            </li>
          </ul>
          <p className="mt-2">
            Todos los datos personales enviados a Meta para fines publicitarios
            son <strong>hasheados con SHA-256</strong> antes de su transmisión.
            No enviamos datos personales en texto plano a ninguna plataforma
            externa.
          </p>
        </div>

        {/* 3. Finalidad */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            3. Finalidad del Tratamiento
          </h2>
          <p>Utilizamos tus datos personales exclusivamente para:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Gestionar campañas publicitarias en Meta Ads (Facebook/Instagram).</li>
            <li>Medir la efectividad de nuestras campañas mediante conversiones (Meta CAPI).</li>
            <li>Crear audiencias personalizadas y similares para optimizar nuestra publicidad.</li>
            <li>Contactarte si has solicitado información sobre nuestros cursos.</li>
            <li>
              Cumplir con obligaciones legales bajo la ley colombiana de
              protección de datos (Ley 1581 de 2012).
            </li>
          </ul>
          <p className="mt-2">
            <strong>No vendemos, alquilamos ni compartimos</strong> tus datos
            personales con terceros no autorizados.
          </p>
        </div>

        {/* 4. Base legal */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            4. Base Legal del Tratamiento
          </h2>
          <p>El tratamiento de tus datos se fundamenta en:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Consentimiento informado:</strong> al enviar tus datos a
              través de nuestros formularios o al interactuar con nuestros
              anuncios.
            </li>
            <li>
              <strong>Interés legítimo:</strong> para la optimización de
              nuestras campañas publicitarias y la medición de su efectividad.
            </li>
            <li>
              <strong>Cumplimiento legal:</strong> en los casos requeridos por
              la legislación colombiana.
            </li>
          </ul>
        </div>

        {/* 5. Meta CAPI */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            5. Uso de Meta Conversions API (CAPI)
          </h2>
          <p>
            Para mejorar la medición y optimización de nuestras campañas en
            Facebook e Instagram, utilizamos la API de Conversiones de Meta
            (Meta CAPI). Los eventos que enviamos incluyen:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Lead:</strong> cuando solicitas información sobre un curso.</li>
            <li><strong>Purchase:</strong> cuando te inscribes y pagas un curso.</li>
            <li><strong>CompleteRegistration:</strong> cuando completas tu registro.</li>
          </ul>
          <p className="mt-2">
            Todos los datos de identificación personal (email, teléfono, nombre,
            ciudad) son <strong>normalizados y hasheados con SHA-256</strong>{" "}
            antes de ser enviados a los servidores de Meta. No transmitimos
            datos personales sin cifrar.
          </p>
        </div>

        {/* 6. Meta Pixel */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            6. Uso de Meta Pixel
          </h2>
          <p>
            Este sitio web utiliza Meta Pixel, una herramienta de análisis que
            nos permite medir la efectividad de nuestra publicidad mediante el
            seguimiento de las acciones que realizas en nuestro sitio. Meta
            Pixel puede recopilar:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Páginas visitadas y tiempo de navegación.</li>
            <li>Clics en botones y enlaces.</li>
            <li>Datos del navegador y dirección IP.</li>
          </ul>
          <p className="mt-2">
            Puedes desactivar la publicidad basada en intereses en la{" "}
            <a
              href="https://www.facebook.com/about/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a84c] underline"
            >
              configuración de anuncios de Facebook
            </a>
            .
          </p>
        </div>

        {/* 7. Derechos */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            7. Tus Derechos (Ley 1581 de 2012)
          </h2>
          <p>Como titular de datos personales en Colombia, tienes derecho a:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Acceder:</strong> conocer qué datos tuyos tenemos
              almacenados.
            </li>
            <li>
              <strong>Rectificar:</strong> corregir datos inexactos o
              incompletos.
            </li>
            <li>
              <strong>Suprimir:</strong> solicitar la eliminación de tus datos
              cuando no sean necesarios.
            </li>
            <li>
              <strong>Revocar:</strong> retirar tu consentimiento en cualquier
              momento.
            </li>
            <li>
              <strong>Presentar quejas:</strong> ante la Superintendencia de
              Industria y Comercio (SIC).
            </li>
          </ul>
          <p className="mt-2">
            Para ejercer cualquiera de estos derechos, escríbenos a{" "}
            <a
              href="mailto:wafiaeduca@gmail.com"
              className="text-[#c9a84c] underline"
            >
              wafiaeduca@gmail.com
            </a>{" "}
            con el asunto &ldquo;Derechos ARCO — Protección de Datos&rdquo;.
            Responderemos en un máximo de 15 días hábiles.
          </p>
        </div>

        {/* 8. Seguridad */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            8. Medidas de Seguridad
          </h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tus
            datos:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Cifrado SHA-256 de todos los datos antes de enviarlos a plataformas externas.</li>
            <li>Conexiones seguras mediante HTTPS/TLS para toda comunicación.</li>
            <li>Tokens de acceso rotados periódicamente y almacenados en variables de entorno.</li>
            <li>Acceso restringido a bases de datos solo mediante credenciales cifradas.</li>
            <li>Registro de auditoría de todas las operaciones realizadas sobre datos personales.</li>
          </ul>
        </div>

        {/* 9. Cookies */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            9. Cookies y Tecnologías Similares
          </h2>
          <p>
            Utilizamos cookies y tecnologías similares (Meta Pixel, Facebook
            CAPI) para:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Recordar tus preferencias de navegación.</li>
            <li>Medir el rendimiento de nuestras campañas publicitarias.</li>
            <li>Mostrar anuncios relevantes sobre nuestros cursos.</li>
          </ul>
          <p className="mt-2">
            Puedes configurar tu navegador para rechazar cookies. Ten en cuenta
            que algunas funcionalidades del sitio pueden verse afectadas.
          </p>
        </div>

        {/* 10. Transferencia internacional */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            10. Transferencia Internacional de Datos
          </h2>
          <p>
            Al utilizar los servicios de Meta Platforms, Inc. (Facebook),
            algunos datos hasheados son procesados en servidores ubicados en
            Estados Unidos y otras jurisdicciones. Meta está certificado bajo
            el Data Privacy Framework (DPF) y cumple con los estándares
            internacionales de protección de datos.
          </p>
        </div>

        {/* 11. Cambios */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            11. Cambios a esta Política
          </h2>
          <p>
            Nos reservamos el derecho de actualizar esta política en cualquier
            momento. Los cambios serán publicados en esta misma página con la
            fecha de actualización revisada. Recomendamos revisar esta política
            periódicamente.
          </p>
        </div>

        {/* 12. Contacto */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            12. Contacto para Protección de Datos
          </h2>
          <p>
            Si tienes preguntas sobre esta política o sobre el tratamiento de
            tus datos personales, contáctanos:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Correo:</strong>{" "}
              <a
                href="mailto:wafiaeduca@gmail.com"
                className="text-[#c9a84c] underline"
              >
                wafiaeduca@gmail.com
              </a>
            </li>
            <li>
              <strong>WhatsApp:</strong> +57 311 874 5095
            </li>
            <li>
              <strong>Dirección:</strong> Cali, Valle del Cauca, Colombia
            </li>
          </ul>
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Formación Integral y Artística (FIA) —
          Yess Lacroix Academy. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}
