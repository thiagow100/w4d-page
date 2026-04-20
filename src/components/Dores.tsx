'use client';

import { motion } from 'framer-motion';
import Eyebrow from '@/components/Eyebrow';

const painPoints = [
  {
    title: "Mês bom, mês ruim, sem padrão",
    description: "Em alguns meses a empresa vende bem. Em outros, o time comercial espera o telefone tocar. Crescimento que depende da sorte não é crescimento. É ciclo.",
    resolution: "Previsibilidade não vem de sorte. Vem de estrutura."
  },
  {
    title: "Anúncio rodando, retorno invisível",
    description: "Você investe em anúncios, mas qual canal está trazendo cliente de verdade? Qual campanha está pagando o que custou? Sem rastreamento real, cada decisão de investimento é chute.",
    resolution: "É possível saber qual canal está gerando retorno. Falta a estrutura certa."
  },
  {
    title: "Você virou o gestor de marketing da sua própria empresa",
    description: "Você deveria estar focado em decisões de negócio, não escolhendo anúncios, ajustando públicos e cuidando de plataformas. Você contratou para resolver, não para virar gerente.",
    resolution: "Você deveria decidir, não operar. É para isso que existimos."
  },
  {
    title: "Contato chegando, ninguém fechando",
    description: "Chegam contatos, mas seu time comercial gasta tempo com quem nunca vai comprar. O problema não é falta de gente entrando. É que ninguém filtrou quem tem perfil para comprar.",
    resolution: "O filtro precisa existir antes do seu time atender."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as any, stiffness: 60, damping: 25 }
  }
};

export default function Dores() {
  return (
    <section id="dores" className="relative w-full pt-section-sm pb-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">

        {/* Lado Esquerdo - Textos */}
        <div className="md:w-1/3 flex flex-col justify-start">
          <div className="mb-6">
            <Eyebrow>O crescimento travou?</Eyebrow>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-[1.1] bg-gradient-to-b from-white to-[#B0B0B0] bg-clip-text text-transparent"
          >
            Reconhece algum destes no seu negócio?
          </motion.h2>
        </div>

        {/* Lado Direito - Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {painPoints.map((pain, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="shadow-card-dark bg-tertiary p-8 rounded-xl hover:-translate-y-1 transition-transform duration-300 ease-out flex flex-col h-full"
            >
              <h3 className="text-xl font-semibold text-primary mb-4 tracking-[-0.03em]">
                {pain.title}
              </h3>
              <p className="text-body leading-[1.7] font-normal text-sm md:text-base flex-1">
                {pain.description}
              </p>
              {pain.resolution && (
                <div className="pt-4 mt-4 border-t border-white/5">
                  <p className="text-primary font-semibold text-sm md:text-base flex items-start gap-2">
                    <span className="text-cta shrink-0">&#8594;</span>
                    {pain.resolution}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
