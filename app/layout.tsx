import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from "@clerk/localizations"; // ¡Login en Español!

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const fredoka = Fredoka({ subsets: ["latin"], weight: ['400', '600', '700'], variable: '--font-fredoka' });

export const metadata: Metadata = {
  title: "Fábrica de Sueños",
  description: "Crea cuentos mágicos con IA para tus hijos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Envolvemos la app con Clerk y el idioma español
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className={`${inter.variable} ${fredoka.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}