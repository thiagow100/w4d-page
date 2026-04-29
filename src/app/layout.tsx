import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { MotionConfig } from 'framer-motion';
import './globals.css';
import Nav from '@/components/Nav';
import ScrollProgress from '@/components/ScrollProgress';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://w4d.com.br'),
  title: 'W4D | Marketing Digital de Performance',
  description: 'Estrutura completa de aquisição: anúncios, páginas de conversão e qualificação comercial para empresas que precisam vender com previsibilidade.',
  // Open Graph — preview ao compartilhar em WhatsApp/LinkedIn/Slack/iMessage.
  // images: ausente aqui pq Next gera automaticamente do app/opengraph-image.tsx.
  openGraph: {
    title: 'W4D | Marketing medido pelo que vende',
    description: 'Estrutura completa de aquisição: anúncios, páginas de conversão e qualificação comercial. Operação ativa Brasil & USA.',
    url: 'https://w4d.com.br',
    siteName: 'W4D',
    locale: 'pt_BR',
    type: 'website',
  },
  // Twitter Card — preview no X/Twitter. summary_large_image usa a OG image em formato grande.
  twitter: {
    card: 'summary_large_image',
    title: 'W4D | Marketing medido pelo que vende',
    description: 'Estrutura completa de aquisição. Operação Brasil & USA.',
  },
  // Robots — explícito que indexação está liberada (defensivo contra config errada).
  robots: {
    index: true,
    follow: true,
  },
};

// Fase 5 — theme-color match com bg-primary (#0A0A0A) pra Safari/Android
// browser chrome ficar consistente com o dark mode da página.
export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-primary text-primary antialiased">
        {/* Fase 5 — MotionConfig reducedMotion="user" desabilita transforms
            (x, y, scale, rotate) automaticamente quando o usuário tem
            prefers-reduced-motion: reduce, mantendo opacity/color (que
            emil-design-eng diz preservar para comprehension). Substitui
            gates manuais por gate sistêmico em todos os motion components. */}
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <ScrollProgress />
            <Nav />
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
