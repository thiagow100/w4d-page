'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-start px-6 sm:px-12 lg:px-24 overflow-hidden pt-24 md:pt-40 pb-24">

      {/* Dot grid background hitech */}
      <div className="absolute inset-0 dot-grid fade-bottom pointer-events-none z-0" />

      {/* Efeito Radial de Profundidade Premium */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] aspect-square bg-cta-hover opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Container Principal */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-5xl flex flex-col items-center text-center"
      >

        {/* Kicker de Credibilidade - badge pill com destaque */}
        <motion.div
          variants={fadeUp}
          className="mb-8 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-white/10 bg-white/[0.03] max-w-[95vw]"
        >
          <span className="font-mono text-[9.5px] sm:text-[11px] md:text-[13px] text-body tracking-[1px] md:tracking-[2px] uppercase whitespace-nowrap">
            Performance Marketing &middot; Brasil &amp; EUA
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.06em] leading-[1.05] mb-8"
        >
          <span className="bg-gradient-to-b from-[#FFFFFF] to-[#E0E0E0] bg-clip-text text-transparent">
            Seu marketing precisa gerar receita.
          </span><br />
          <span className="bg-gradient-to-b from-[#B0B0B0] to-[#808080] bg-clip-text text-transparent">Não engajamento.</span>
        </motion.h1>

        {/* Parágrafo de Apoio */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-body font-normal leading-[1.7] max-w-2xl mb-12"
        >
          Aqui na W4Digital, construímos toda a estrutura para trazer cliente novo: dos anúncios, passando pela qualificação, até o momento em que ele está pronto para comprar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-6"
        >
          {/* Botão Principal */}
          <a
            href="#formulario"
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-primary transition-all duration-300 ease-out bg-cta rounded-full hover:bg-cta-hover hover:scale-105 glow-cta"
          >
            Solicitar diagnóstico <span className="ml-2 group-hover:translate-x-1 transition-transform">&#8594;</span>
          </a>



          {/* Kicker de posicionamento */}
          <span className="text-sm text-body mt-4 tracking-normal font-light max-w-2xl leading-relaxed">
            Não somos marqueteiros. Somos vendedores que colocaram dinheiro próprio em anúncios antes de cuidar do seu.
          </span>
        </motion.div>

      </motion.div>
    </section>
  );
}
