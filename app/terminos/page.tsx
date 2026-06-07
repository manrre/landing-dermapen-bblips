import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Yess Lacroix Academy",
  description:
    "Términos y condiciones de uso de los servicios de Formación Integral y Artística (FIA) — Yess Lacroix Academy.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">
        Términos y Condiciones
      </h1>
      <p className="text-sm text-gray-500 mb-10">
        Última actualización: 7 de junio de 2026
      </p>

      <section className="space-y-8 text-base leading-relaxed">
        {/* 1. Introducción */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            1. Aceptación de los Términos
          </h2>
          <p>
            Al acceder y utilizar este sitio web (
            <strong>dermapen.esteticaybellezafia.com</strong>) y los servicios
            de <strong>Formación Integral y Artística (FIA)</strong> — Yess
            Lacroix Academy, aceptas estos Términos y Condiciones en su
            totalidad. Si no estás de acuerdo, te pedimos que no utilices
            nuestros servicios.
          </p>
        </div>

        {/* 2. Descripción del servicio */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            2. Descripción del Servicio
          </h2>
          <p>
            Yess Lacroix Academy ofrece cursos presenciales y teórico-prácticos
            en el área de estética y belleza en las ciudades de Cali y Popayán,
            Colombia. A través de este sitio web, los usuarios pueden:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Consultar información sobre cursos disponibles.</li>
            <li>Adquirir cursos mediante la plataforma de pago Hotmart.</li>
            <li>Recibir información publicitaria relevante sobre nuestros programas.</li>
          </ul>
        </div>

        {/* 3. Cuenta y registro */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            3. Registro y Cuenta de Usuario
          </h2>
          <p>
            Para inscribirte en nuestros cursos a través de Hotmart, debes
            proporcionar información veraz, precisa y completa. Eres responsable
            de mantener la confidencialidad de tu cuenta y contraseña. Yess
            Lacroix Academy no se hace responsable por el uso no autorizado de
            tu cuenta.
          </p>
        </div>

        {/* 4. Precios y pagos */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            4. Precios y Pagos
          </h2>
          <p>
            Todos los precios se muestran en pesos colombianos (COP) o dólares
            estadounidenses (USD) según la ubicación detectada. El precio final
            se confirma en la página de checkout de Hotmart. Nos reservamos el
            derecho de modificar precios sin previo aviso, aunque los cambios no
            afectarán compras ya realizadas.
          </p>
          <p className="mt-2">
            Los pagos son procesados exclusivamente a través de{" "}
            <strong>Hotmart</strong>, plataforma segura de comercio electrónico.
            Yess Lacroix Academy no almacena datos de tarjetas de crédito o
            débito.
          </p>
        </div>

        {/* 5. Propiedad intelectual */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            5. Propiedad Intelectual
          </h2>
          <p>
            Todo el contenido de este sitio web —incluyendo textos, imágenes,
            videos, logotipos, marcas y material didáctico— es propiedad de
            Formación Integral y Artística (FIA) y está protegido por las leyes
            colombianas de derechos de autor. Queda prohibida su reproducción,
            distribución o modificación sin autorización expresa por escrito.
          </p>
        </div>

        {/* 6. Política de reembolso */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            6. Política de Reembolso
          </h2>
          <p>
            Las compras realizadas a través de Hotmart están sujetas a la
            política de garantía de 7 días de Hotmart. Si no estás satisfecho
            con el curso dentro de los primeros 7 días posteriores a la compra,
            puedes solicitar un reembolso a través de la plataforma Hotmart. Una
            vez iniciado el curso presencial, no se realizan devoluciones salvo
            casos excepcionales evaluados individualmente.
          </p>
        </div>

        {/* 7. Limitación de responsabilidad */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            7. Limitación de Responsabilidad
          </h2>
          <p>
            Yess Lacroix Academy no será responsable por:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Interrupciones temporales del sitio web por mantenimiento o causas técnicas.</li>
            <li>Daños indirectos o consecuentes derivados del uso de este sitio.</li>
            <li>
              El contenido de sitios web de terceros enlazados desde nuestras
              páginas (Hotmart, WhatsApp, Meta).
            </li>
          </ul>
        </div>

        {/* 8. Publicidad y Meta Ads */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            8. Publicidad y Plataformas de Terceros
          </h2>
          <p>
            Utilizamos Meta Ads (Facebook e Instagram) para promocionar nuestros
            cursos. Las interacciones con nuestros anuncios —incluyendo clics,
            visualizaciones y conversiones— son medidas a través de Meta Pixel y
            la API de Conversiones de Meta (CAPI) con datos hasheados. Al
            interactuar con nuestros anuncios, aceptas las políticas de
            privacidad de Meta Platforms, Inc.
          </p>
        </div>

        {/* 9. Ley aplicable */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            9. Legislación Aplicable
          </h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes de la República
            de Colombia. Cualquier disputa será resuelta ante los tribunales
            competentes de la ciudad de Cali, Valle del Cauca. Para efectos de
            protección de datos, aplica la Ley 1581 de 2012 y sus decretos
            reglamentarios.
          </p>
        </div>

        {/* 10. Contacto */}
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
            10. Contacto
          </h2>
          <p>
            Para cualquier consulta sobre estos Términos y Condiciones:
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
