import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { MetaPixel } from "@/components/meta-pixel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://yesslacroixacademy.com"),
  title: "Curso Microneedling Facial + BBLips Online | Oferta Colombia",
  description:
    "Aprende Microneedling Facial + BBLips desde cero con acceso online, certificado digital, garantia de 7 dias y oferta especial para Colombia.",
  openGraph: {
    title: "Curso Microneedling Facial + BBLips Online",
    description:
      "Formacion online para aprender dos tecnicas esteticas de alta demanda con precio de descuento.",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/dermapen-bblips/course-mockup.png", width: 1200, height: 630, alt: "Curso Microneedling Facial + BBLips" }],
    url: "https://yesslacroixacademy.com",
    siteName: "Yess Lacroix Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curso Microneedling Facial + BBLips Online",
    description: "Aprende desde cero con 12 lecciones online, demo real y certificado digital por solo $10 USD.",
    images: ["/dermapen-bblips/course-mockup.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://yesslacroixacademy.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
