'use client';

import { motion, useScroll, useMotionValueEvent, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MagneticButton from '@/components/MagneticButton';

type HoverDirection = 'top' | 'right' | 'bottom' | 'left' | null;

/**
 * DirectionalHoverCTA — CTA que detecta de qual lado o mouse entrou (top/right/bottom/left)
 * e anima um fill vermelho claro entrando daquela direção. Tactile feedback que emil-design-eng
 * valida como "buttons must feel responsive to press". Desktop only (mobile não tem hover).
 */
function DirectionalHoverCTA() {
  const [direction, setDirection] = useState<HoverDirection>(null);

  const getDirection = (e: React.MouseEvent<HTMLAnchorElement>): HoverDirection => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const top = y;
    const bottom = rect.height - y;
    const left = x;
    const right = rect.width - x;
    const min = Math.min(top, bottom, left, right);
    if (min === top) return 'top';
    if (min === bottom) return 'bottom';
    if (min === left) return 'left';
    return 'right';
  };

  const slideFrom = (dir: HoverDirection) => {
    if (!dir) return { x: 0, y: 0 };
    if (dir === 'top') return { x: 0, y: '-100%' };
    if (dir === 'bottom') return { x: 0, y: '100%' };
    if (dir === 'left') return { x: '-100%', y: 0 };
    return { x: '100%', y: 0 };
  };

  return (
    <a
      href="#formulario"
      onMouseEnter={(e) => setDirection(getDirection(e))}
      onMouseLeave={(e) => setDirection(getDirection(e))}
      className="group relative inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-primary bg-cta rounded-full active:scale-[0.98] glow-cta overflow-hidden isolate"
    >
      {/* Directional fill — slide in da direção onde o cursor entrou */}
      <AnimatePresence>
        {direction && (
          <motion.span
            key={direction}
            aria-hidden
            initial={slideFrom(direction)}
            animate={{ x: 0, y: 0 }}
            exit={slideFrom(direction)}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute inset-0 bg-cta-hover pointer-events-none z-0"
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">Solicitar apresentação</span>
      <span className="relative z-10 ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1">&#8594;</span>
    </a>
  );
}

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
      className="relative w-full min-h-[88dvh] flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-28 md:pt-32 pb-12 md:pb-28 noise-overlay"
    >

      {/* Aurora W4D — camada principal (streaks rápidos 24s) */}
      <div aria-hidden className="aurora-w4d" />

      {/* Aurora W4D secundário — camada lenta (48s, ângulo 80deg, offset diferente)
          cria parallax entre 2 camadas. Depth atmosférico silencioso. */}
      <div aria-hidden className="aurora-w4d-slow" />

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

        {/* CTAs — MagneticButton + DirectionalHoverCTA:
            Magnetic puxa o botão inteiro em direção ao cursor (campo 100px).
            Directional fill entra DA direção onde o cursor entrou no botão. */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-start gap-5"
        >
          <div className="flex flex-col items-start">
            <MagneticButton>
              <DirectionalHoverCTA />
            </MagneticButton>
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
