'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

export default function Hero() {
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

  return (
    <section className="relative w-full min-h-[88dvh] flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-28 md:pt-32 pb-20 md:pb-28">

      {/* Dot-grid com mask radial — base atmosférica */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none z-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
          bg-[size:6rem_5rem]
          [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,#000_55%,transparent_100%)]"
      />

      {/* Linha-arquitetura horizontal — meridiano sutil, assinatura Vercel/Linear */}
      <div
        aria-hidden
        className="absolute top-[62%] left-0 right-0 h-px pointer-events-none z-0
          bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.08)_30%,rgba(255,59,59,0.5)_50%,rgba(255,255,255,0.08)_70%,transparent_100%)]"
      />

      {/* Anchor BR-EUA: SVG line-art minimalista, dois pontos e arco conectando */}
      <svg
        aria-hidden
        className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[min(720px,90vw)] h-[120px] pointer-events-none z-0 opacity-[0.32]"
        viewBox="0 0 720 120"
        fill="none"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FF3B3B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Arco BR → EUA */}
        <motion.path
          d="M 140 90 Q 360 -10, 580 90"
          stroke="url(#arcGrad)"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        />
        {/* Pin Brasil (esquerda-baixo) */}
        <circle cx="140" cy="90" r="3" fill="#EC0000" />
        <circle cx="140" cy="90" r="8" fill="none" stroke="rgba(255,59,59,0.5)" strokeWidth="0.8" />
        {/* Pin EUA (direita-baixo) */}
        <circle cx="580" cy="90" r="3" fill="#EC0000" />
        <circle cx="580" cy="90" r="8" fill="none" stroke="rgba(255,59,59,0.5)" strokeWidth="0.8" />
      </svg>

      {/* Glow diluído na base — transição pra Dores, ainda discreto mas legível sobre grafite */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[220px] pointer-events-none z-0
          bg-gradient-to-t from-cta-accent/[0.14] via-cta-accent/[0.05] to-transparent
          blur-3xl opacity-80"
      />

      {/* Container Principal */}
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

        {/* Título Principal — hierarquia por cor, não por gradiente */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.055em] leading-[1.04] mb-8 text-balance"
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
            {/* Botão Principal — glow refinado + tracking magnético no hover desktop */}
            <MagneticButton>
              <a
                href="#formulario"
                className="group inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-primary transition-colors duration-200 ease-out bg-cta rounded-full hover:bg-cta-hover active:scale-[0.98] glow-cta"
              >
                Solicitar proposta
                <span className="ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1">&#8594;</span>
              </a>
            </MagneticButton>
          </div>

          {/* Kicker de posicionamento */}
          <span className="text-sm text-body/80 mt-3 font-light max-w-4xl leading-relaxed">
            Não somos marqueteiros. Somos vendedores que colocaram dinheiro próprio em anúncios antes de cuidar do seu.
          </span>
        </motion.div>

      </motion.div>
    </section>
  );
}
