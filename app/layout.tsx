import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PyMuPDF4LLM — Conversor PDF a Markdown",
  description: "Convierte documentos PDF a Markdown limpio y estructurado usando PyMuPDF4LLM. Optimizado para LLMs, RAG y edición humana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-apple-bg font-sans antialiased text-apple-text">{children}</body>
    </html>
  );
}
