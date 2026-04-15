'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

export default function Hero() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Staggering dinâmico entre o título, parágrafo e botão
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
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden pt-24">
      
      {/* Efeito Radial de Profundidade Premium */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] aspect-square bg-cta-hover opacity-[0.05] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Container Principal */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-5xl flex flex-col items-center text-center"
      >
        
        {/* Kicker */}
        <motion.span 
          variants={fadeUp}
          className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-8"
        >
          Performance Marketing
        </motion.span>

        {/* Título Principal */}
        <motion.h1 
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-2px] leading-[1.05] mb-8"
        >
          <span className="bg-gradient-to-b from-[#FFFFFF] to-[#E0E0E0] bg-clip-text text-transparent">
            Seu marketing precisa gerar receita.
          </span><br />
          <span className="text-body">Não engajamento.</span>
        </motion.h1>

        {/* Parágrafo de Apoio */}
        <motion.p 
          variants={fadeUp}
          className="text-lg md:text-xl text-body font-light leading-[1.7] max-w-2xl mb-12 "
        >
          Aqui na W4Digital, construímos toda a estrutura para trazer cliente novo: dos anúncios, passando pela qualificação, até o momento em que ele está pronto pra comprar.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          variants={fadeUp}
          className="flex flex-col items-center gap-6"
        >
          {/* Botão Principal conectando ao formulário */}
          <a 
            href="#formulario"
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-primary transition-all duration-300 ease-out bg-cta rounded-full hover:bg-cta-hover hover:scale-105 shadow-2xl shadow-cta/20"
          >
            Solicitar diagnóstico <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          
          {/* Link secundário para âncora de dores */}
          <a 
            href="#dores"
            className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-300"
          >
            Veja como funciona ↓
          </a>

          {/* Kicker de Posicionamento */}
          <span className="text-sm text-secondary mt-8 tracking-normal font-light max-w-2xl">
            20 anos vendendo. 11 com marketing digital. Não somos marqueteiros. Somos vendedores que colocaram dinheiro próprio em anúncios antes de cuidar do seu.
          </span>
        </motion.div>

      </motion.div>
    </section>
  );
}
