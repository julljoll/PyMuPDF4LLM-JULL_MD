import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PyMuPDF4LLM — Conversor PDF a Markdown",
  description: "Convierte documentos PDF a Markdown limpio y estructurado usando markitdown-ts. Optimizado para LLMs, RAG y edición humana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const m = window.matchMedia('(prefers-color-scheme: dark)');
                if (m.matches) document.documentElement.classList.add('dark');
                m.addEventListener('change', e => {
                  document.documentElement.classList.toggle('dark', e.matches);
                });
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
