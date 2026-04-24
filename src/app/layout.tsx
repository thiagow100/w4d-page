import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import Nav from '@/components/Nav';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'W4D | Marketing Digital de Performance',
  description: 'Estrutura completa de aquisição: anúncios, páginas de conversão e qualificação comercial para empresas que precisam vender com previsibilidade.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-primary text-primary antialiased">
        <SmoothScroll>
          <Nav />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
