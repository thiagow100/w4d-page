'use client';

import { motion, useScroll, useMotionValueEvent, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import DirectionalCTA from '@/components/DirectionalCTA';

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

  /** prefers-reduced-motion: respeita preferência do user pra desabilitar
   *  bounce perpétuo do chevron (única animação infinita Framer Motion no Hero). */
  const prefersReducedMotion = useReducedMotion();
  const chevronActive = revealed && !isScrolled;
  const chevronBounceEnabled = chevronActive && !prefersReducedMotion;

  /** Spotlight cursor — radial gradient vermelho sutil que segue o cursor dentro do Hero.
   *  Desktop only (touch não faz sentido). Opacity controlada por estado isActive — somente
   *  aparece quando mouse está dentro da seção. Via useMotionValue + useMotionTemplate para
   *  updates fora do React render cycle (performance). */
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const [spotlightActive, setSpotlightActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768) return; // mobile skip
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    if (!spotlightActive) setSpotlightActive(true);
  };

  const handleMouseLeave = () => {
    setSpotlightActive(false);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, oklch(62% 0.26 27 / 0.09), transparent 60%)`;

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
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[82dvh] flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-28 md:pt-32 pb-8 md:pb-16 noise-overlay"
    >

      {/* Aurora W4D — camada única (streaks 24s).
          Fase 1 subtração: aurora-w4d-slow removida pra reduzir empilhamento atmosférico
          competindo com H1 + spotlight + dot-grid. Apple/Linear opera com 0-1 camada. */}
      <div aria-hidden className="aurora-w4d" />

      {/* Spotlight cursor — radial vermelho sutil segue mouse (desktop only via mediaquery via JS).
          Transition opacity mascara entry/exit suave. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0 hidden md:block transition-opacity duration-500 ease-out"
        style={{
          background: spotlightBackground,
          opacity: spotlightActive ? 1 : 0,
        }}
      />

      {/* Dot-grid com mask radial — base atmosférica tecnica sobre o aurora.
          Mobile: hidden — economia de paint em scrolling (mascara radial + grid linhas é caro em GPU integrada). */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-0 opacity-50 pointer-events-none z-0
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

        {/* CTA — DirectionalCTA combina Magnetic pull + directional fill (mesmo componente reusado no Footer). */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-start gap-5"
        >
          <div className="flex flex-col items-start">
            <DirectionalCTA href="#formulario">Solicitar apresentação</DirectionalCTA>
          </div>

          {/* Kicker de posicionamento */}
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
          animate={chevronBounceEnabled ? { y: [0, 5, 0] } : { y: 0 }}
          transition={
            chevronBounceEnabled
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
