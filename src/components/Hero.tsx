'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticButton from '@/components/MagneticButton';

export default function Hero() {
  /** Scroll indicator lifecycle:
   *  - reveal: appears at 2.4s after mount (fade-in)
   *  - fade-out: ao scrollar > 80px (não fica perpétuo em loop enquanto user está parado)
   *  - bounce: só anima quando `active` (visível). Evita GPU waste + cumpre emil-design-eng
   *    "never perpetual motion without purpose". */
  const [revealed, setRevealed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setIsScrolled(v > 80);
  });

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 2400);
    return () => clearTimeout(t);
  }, []);

  const chevronActive = revealed && !isScrolled;

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  /** fadeBlur — reveal cinematográfico Apple-style: opacity + y + filter blur.
   *  Exclusivo do H1 (blur é caro; justificado pelo peak moment). */
  const fadeBlur = {
    hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section className="relative w-full min-h-[88dvh] flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-28 md:pt-32 pb-12 md:pb-28 noise-overlay">

      {/* Aurora W4D — fundo atmosférico animado (streaks diagonais de luz vermelha diluída em blur,
          com mask radial localizando no centro). Substitui o Dark Horizon Glow — mais premium,
          mais "respiração". CSS-only, animação 24s. */}
      <div aria-hidden className="aurora-w4d" />

      {/* Dot-grid com mask radial — base atmosférica tecnica sobre o aurora */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none z-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
          bg-[size:6rem_5rem]
          [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,#000_55%,transparent_100%)]"
      />

      {/* Container Principal — só texto, layout 1-col */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-6xl flex flex-col items-start text-left"
      >

        {/* Kicker de Credibilidade */}
        <motion.div
          variants={fadeUp}
          className="mb-8"
        >
          <span className="font-mono text-xs md:text-sm text-secondary tracking-[0.12em] uppercase">
            Performance Marketing &bull; Brasil &amp; USA
          </span>
        </motion.div>

        {/* Título Principal — fadeBlur cinematográfico. Hierarquia por cor (branco→body),
            sem riscados, underlines ou typewriter. */}
        <motion.h1
          variants={fadeBlur}
          className="h1-hero font-semibold tracking-[-0.055em] leading-[1.04] mb-8 text-balance"
        >
          <span className="text-white/95">Seu marketing precisa gerar<br className="hidden md:block" /> receita. </span>
          <span className="text-body">Não engajamento.</span>
        </motion.h1>

        {/* Parágrafo de Apoio */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-body font-normal leading-[1.7] max-w-2xl mb-12 text-pretty"
        >
          Aqui na W4D, construímos toda a estrutura para trazer cliente novo: dos anúncios, passando pela qualificação, até o momento em que ele está pronto para comprar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-start gap-5"
        >
          <div className="flex flex-col items-start">
            <MagneticButton>
              <a
                href="#formulario"
                className="group inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-primary transition-colors duration-200 ease-out bg-cta rounded-full hover:bg-cta-hover active:scale-[0.98] glow-cta"
              >
                Solicitar apresentação
                <span className="ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1">&#8594;</span>
              </a>
            </MagneticButton>
          </div>

          {/* Kicker de posicionamento — dentro do `gap-5` do parent (20px basta pra
              separar do CTA sem quebrar grupo visual). mt-3 foi removido. */}
          <span className="text-sm text-body/80 font-light max-w-4xl leading-relaxed">
            Não somos marqueteiros. Somos vendedores que colocaram dinheiro próprio em anúncios antes de cuidar do seu.
          </span>
        </motion.div>

      </motion.div>

      {/* Scroll indicator — aparece 2.4s após mount, fade-out ao user scrollar (>80px).
          Bounce perpétuo só quando visível (economia GPU + emil-design-eng). */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: chevronActive ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.svg
          animate={chevronActive ? { y: [0, 5, 0] } : { y: 0 }}
          transition={
            chevronActive
              ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          className="w-5 h-5 text-secondary/55"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
