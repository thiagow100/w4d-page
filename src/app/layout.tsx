import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import TechGrid from '@/components/TechGrid';
import Nav from '@/components/Nav';

// A fonte Outfit traz um visual muito "tech", limpo e geométrico sem ser genérico como a Roboto.
const mainFont = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-main',
  display: 'swap',
});

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
    <html lang="pt-BR" className={`${mainFont.variable} scroll-smooth`}>
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
