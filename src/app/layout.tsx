import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import TechGrid from '@/components/TechGrid';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'W4Digital | Marketing Digital de Performance',
  description: 'Tráfego pago, funis de venda e automação com IA para sua empresa vender todos os dias.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <body className="font-sans bg-primary text-primary selection:bg-cta selection:text-primary antialiased">
        <TechGrid />
        <Nav />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
