'use client';

import { motion } from 'framer-motion';
import Eyebrow from '@/components/Eyebrow';

const painPoints = [
  {
    title: "Mês bom, mês ruim, sem padrão",
    description: "Em alguns meses a empresa vende bem. Em outros, o time espera o telefone tocar. Crescimento que depende da sorte não é crescimento sustentável. É apenas um ciclo.",
    resolution: "Previsibilidade de receita exige estrutura, não sorte."
  },
  {
    title: "Anúncio rodando, retorno invisível",
    description: "Você investe em mídia, mas não sabe qual canal traz cliente de verdade. Sem um rastreamento exato, cada nova decisão de investimento acaba sendo um chute no escuro.",
    resolution: "Saber o retorno de cada canal exige a estrutura certa."
  },
  {
    title: "Dono operando o próprio marketing",
    description: "Você deveria focar em decisões de negócio, não em escolher anúncios ou ajustar campanhas. Quando o dono vira o gerente de tráfego, a empresa inteira para de crescer.",
    resolution: "Você precisa focar em decidir, não em operar botões."
  },
  {
    title: "Contato chegando, ninguém fechando",
    description: "Chegam contatos todos os dias, mas seu time gasta tempo com quem nunca vai comprar. O problema não é falta de demanda, é a total ausência de um filtro de qualificação.",
    resolution: "O filtro de perfil deve atuar antes do time comercial."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
  }
};

export default function Dores() {
  return (
    <section id="dores" className="relative w-full pt-section-sm pb-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">

        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start md:items-end">
          <div className="md:w-1/2 flex flex-col justify-start">
            <div className="mb-6">
              <Eyebrow index="01">O crescimento travou?</Eyebrow>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-[1.1] text-white/95 text-balance"
            >
              Reconhece algum destes no seu negócio?
            </motion.h2>
          </div>

          <div className="md:w-1/2 flex flex-col justify-end md:pb-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 }}
              className="text-body text-lg md:text-xl font-normal leading-[1.7] max-w-lg"
            >
              Quatro sintomas recorrentes em empresas que batem em um teto invisível. Se você se vê em algum deles, não é acaso. É arquitetura.
            </motion.p>
          </div>
        </div>

        {/* Lado Direito - Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {painPoints.map((pain, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="shadow-card-dark bg-tertiary p-8 md:p-10 rounded-xl hover:-translate-y-0.5 transition-transform duration-300 ease-out flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-[11px] text-secondary tracking-[0.18em] uppercase">Sintoma / 0{index + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cta"></span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 tracking-[-0.03em] leading-snug">
                {pain.title}
              </h3>
              <p className="text-body leading-[1.7] font-normal text-sm md:text-base flex-1">
                {pain.description}
              </p>
              {pain.resolution && (
                <div className="pt-5 mt-6 border-t border-white/5 flex items-start gap-3">
                  <span className="text-white/60 text-sm mt-0.5">&rarr;</span>
                  <p className="text-primary font-medium text-sm md:text-base leading-relaxed">
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
