'use client';

import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useState } from 'react';
import DirectionalCTA from '@/components/DirectionalCTA';

/** Stagger das 4 colunas — 80ms entre cada (cascade calmo, não atrasa interação). */
const columnsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const columnItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
};

/** NavLink — link com underline draw-on no hover (origin-left, 300ms ease-out).
 *  Pattern Stripe/Linear: cor + linha vermelha que se desenha embaixo ao hover. */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative w-fit text-sm font-medium text-body hover:text-primary transition-colors duration-200"
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 right-0 h-px bg-cta scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </a>
  );
}

export default function Footer() {
  /** Cursor spotlight — radial vermelho sutil que segue o cursor sobre o grid das 4 colunas.
   *  Aparece no hover, fade-out 500ms ao sair. Desktop only (mobile não tem cursor).
   *  motion values fora do React render cycle = zero re-renders no scroll/hover. */
  const colsMouseX = useMotionValue(0);
  const colsMouseY = useMotionValue(0);
  const [colsActive, setColsActive] = useState(false);

  const handleColsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    colsMouseX.set(e.clientX - rect.left);
    colsMouseY.set(e.clientY - rect.top);
    if (!colsActive) setColsActive(true);
  };

  const colsSpotlight = useMotionTemplate`radial-gradient(280px circle at ${colsMouseX}px ${colsMouseY}px, rgba(255, 59, 59, 0.06), transparent 65%)`;

  return (
    <footer className="relative w-full overflow-hidden bg-primary pt-16 md:pt-24 pb-8 px-6 sm:px-12 lg:px-24 border-t border-white/5 noise-overlay">

      {/* Aurora-soft contida — só atrás da seção de fechamento (top 50%), não atrás de colunas/legal.
          Wrapper absolute serve como contexto de positioning para o `inset:0` da .aurora-w4d-soft. */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-[50%] pointer-events-none overflow-hidden">
        <div className="aurora-w4d-soft" />
      </div>

      {/* Spotlight focal — gradient radial vermelho atrás do h2/CTA do closing scene.
          Cria "palco" visual pra mensagem final, distinto da aurora-soft (atmosférica difusa).
          Posicionado em 25% from left pq h2 é left-aligned (items-start). */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full md:w-[65%] h-[42%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 75% at 28% 50%, rgba(255, 59, 59, 0.09) 0%, rgba(255, 59, 59, 0.04) 35%, transparent 70%)',
        }}
      />

      {/* Fade final dramático — últimos ~240px afundam pra near-black.
          Usa rgba alpha em vez de #000000 hardcoded (CLAUDE.md proíbe pure black). */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[240px] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col relative z-10">

        {/* Closing scene — h2 com presença equivalente às demais seções, subtítulo de apoio e CTA único.
            CTA usa DirectionalCTA (mesmo do Hero) — magnetic pull + directional fill. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
          className="mb-16 md:mb-20 w-full flex flex-col items-start"
        >
          <h2 className="h2-section font-semibold tracking-[-0.05em] text-white/95 leading-[1.08]">
            Marketing medido pelo que vende.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-body font-normal leading-[1.7] max-w-2xl">
            Estrutura completa de marketing, do anúncio à agenda do seu comercial.
          </p>
          <div className="mt-10">
            <DirectionalCTA href="#formulario">Começar a parceria</DirectionalCTA>
          </div>
        </motion.div>

        {/* 4 colunas: Navegação · Contato · Palhoça · Orlando.
            Mobile (<sm) → stack vertical 1-col.
            Tablet (sm-lg) → 2×2.
            Desktop (lg+) → 4×1.
            Stagger reveal cascade ao entrar no viewport.
            Cursor spotlight global (desktop only) — radial vermelho segue mouse sobre o grid. */}
        <motion.div
          variants={columnsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          onMouseMove={handleColsMouseMove}
          onMouseLeave={() => setColsActive(false)}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12"
        >

          {/* Spotlight overlay — desktop only, fade in/out 500ms via opacity. */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none hidden md:block transition-opacity duration-500 ease-out -mx-6 sm:-mx-12 lg:-mx-24"
            style={{
              background: colsSpotlight,
              opacity: colsActive ? 1 : 0,
            }}
          />

          {/* Navegação — links âncora pra seções da página, com underline draw-on no hover */}
          <motion.div variants={columnItem} className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Navegação
            </span>
            <nav className="flex flex-col gap-3 items-start" aria-label="Navegação rodapé">
              <NavLink href="#metodo">Método W4D</NavLink>
              <NavLink href="#quem-somos">Quem somos</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
              <NavLink href="#formulario">Falar com a W4D</NavLink>
            </nav>
          </motion.div>

          {/* Contato */}
          <motion.div variants={columnItem} className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Contato
            </span>
            <div className="flex flex-col gap-4">
              <a href="tel:+16892638133" className="flex items-center gap-3 text-primary hover:text-cta transition-colors duration-200 text-sm font-medium">
                <Phone size={16} strokeWidth={2.5} className="text-secondary" />
                +1 689 263-8133
              </a>
              <a href="mailto:sales@w4d.com.br" className="flex items-center gap-3 text-primary hover:text-cta transition-colors duration-200 text-sm font-medium">
                <Mail size={16} strokeWidth={2.5} className="text-secondary" />
                sales@w4d.com.br
              </a>
            </div>
          </motion.div>

          {/* Palhoça — cidade primary (decision-info), razão social mono small (legal-info) */}
          <motion.div variants={columnItem} className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Palhoça, SC
            </span>
            <div className="flex items-start gap-3 text-sm font-normal leading-relaxed">
              <MapPin size={16} strokeWidth={2.5} className="text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <span className="text-primary font-medium">Palhoça · Santa Catarina · Brasil</span>
                <span className="font-mono text-[11px] text-secondary uppercase tracking-wider">
                  W4D Negócios Digitais LTDA
                </span>
              </div>
            </div>
          </motion.div>

          {/* Orlando — mesma hierarquia: cidade primary, razão social mono small */}
          <motion.div variants={columnItem} className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Orlando, FL
            </span>
            <div className="flex items-start gap-3 text-sm font-normal leading-relaxed">
              <MapPin size={16} strokeWidth={2.5} className="text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <span className="text-primary font-medium">Orlando · Florida · USA</span>
                <span className="font-mono text-[11px] text-secondary uppercase tracking-wider">
                  W4Digital LLC
                </span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Linha Divisória de Gradiente — oklch evita passagem por marrom no fade.
            Draw-on do centro pra fora ao entrar no viewport (1.2s, ease-out). Pattern Apple/Stripe. */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-full h-[1px] bg-[linear-gradient(to_right_in_oklch,transparent,rgba(255,59,59,0.55),transparent)] my-8 opacity-70 origin-center"
        />

        {/* Bottom row: logo + copyright + legal · stamp + voltar ao topo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <a href="#" aria-label="Voltar ao topo" className="shrink-0 hover:opacity-70 transition-opacity duration-200">
              <Image
                src="/images/logo-w4d-only.png"
                alt="W4D"
                width={120}
                height={35}
                className="h-6 md:h-7 w-auto object-contain opacity-90"
              />
            </a>
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
              <span className="font-mono text-[11px] md:text-xs text-muted tracking-[0.12em] lowercase">
                © 2026 · W4D
              </span>
              <span className="text-white/10 hidden md:block">|</span>
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
                <a href="/privacidade" className="font-mono text-[11px] md:text-xs text-muted hover:text-primary transition-colors duration-200 tracking-[0.12em] lowercase">
                  política de privacidade
                </a>
                <a href="/termos" className="font-mono text-[11px] md:text-xs text-muted hover:text-primary transition-colors duration-200 tracking-[0.12em] lowercase">
                  termos de uso
                </a>
              </div>
            </div>
          </div>

          {/* Stamp + back-to-top com glassmorphism — backdrop-blur + bg translucent + inner highlight refraction.
              Pattern redesign-skill ("True glassmorphism"). */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] md:text-xs text-secondary tracking-[0.12em] uppercase">
              BUILT WITH DISCIPLINE, NOT HYPE.
            </span>
            <a
              href="#"
              aria-label="Voltar ao topo da página"
              className="group w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center justify-center text-secondary hover:text-primary hover:border-white/25 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200 ease-out shrink-0"
            >
              <ArrowUp size={16} strokeWidth={2} className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
