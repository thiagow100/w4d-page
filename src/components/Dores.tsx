'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Eyebrow from '@/components/Eyebrow';
import { GlowingEffect } from '@/components/ui/glowing-effect';

/**
 * PulseDot — transita de vermelho ("problema ativo") para neutro ("problema registrado")
 * após 1.8s de estar em view. Reforça psicologicamente a leitura: você viu o sintoma,
 * a W4D já tem a resolução mapeada. Once: true para não re-trigger em scroll reverso.
 */
function PulseDot() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.span
      ref={ref}
      className="w-1.5 h-1.5 rounded-full"
      initial={{ backgroundColor: '#EC0000' }}
      animate={{
        backgroundColor: inView ? 'rgba(255, 255, 255, 0.28)' : '#EC0000',
      }}
      transition={{ duration: 1.0, delay: inView ? 1.8 : 0, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

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
    <section id="dores" className="relative w-full pt-6 pb-12 md:pt-12 md:pb-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay">

      {/* Aurora W4D soft — continuidade atmosférica com o Hero. Camada única, blur 22px,
          opacity 0.15, ciclo 56s. Silenciosa mas presente. */}
      <div aria-hidden className="aurora-w4d-soft" />

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
              className="h2-section font-semibold tracking-[-0.05em] leading-[1.1] text-white/95 text-balance"
            >
              Reconhece algum desses problemas no seu negócio?
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
              Quatro sintomas recorrentes em empresas em crescimento. Se você se vê em algum deles, não é falta de esforço. É falta de estrutura.
            </motion.p>
          </div>
        </div>

        {/* Lado Direito - Cards — mobile usa Sticky Scroll Stack (dores acumulam
            visualmente enquanto user scrolla). Desktop vira grid 2×2 normal. */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:grid md:grid-cols-2 gap-6 relative"
        >
          {painPoints.map((pain, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              style={{
                /* Offset 7rem (112px) por card: expõe header + 2 linhas do título
                   do card anterior no peak. p-6 + mb-4 + título (50px) + buffer (2px)
                   = 112px. No peak (4 cards presos), user vê: 3 títulos COMPLETOS
                   empilhados + card 4. */
                '--mobile-top': `calc(5rem + ${index * 7}rem)`,
                zIndex: index + 10,
              } as React.CSSProperties}
              className="sticky top-[var(--mobile-top)] md:relative md:top-auto shadow-stack-card bg-tertiary p-6 md:p-10 rounded-xl md:hover:-translate-y-0.5 transition-transform duration-300 ease-out flex flex-col md:h-full"
            >
              {/* GlowingEffect — border red-single ilumina sob proximidade do cursor */}
              <GlowingEffect proximity={80} spread={36} borderWidth={1} />

              <div className="relative z-10 flex justify-between items-center mb-4 md:mb-8">
                <span className="font-mono text-[11px] text-secondary tracking-[0.18em] uppercase">Sintoma / 0{index + 1}</span>
                <PulseDot />
              </div>
              <h3 className="relative z-10 text-xl md:text-2xl font-semibold text-primary mb-3 md:mb-4 tracking-[-0.03em] leading-snug min-h-[2.5em] md:min-h-0">
                {pain.title}
              </h3>
              <p className="relative z-10 text-body leading-[1.65] font-normal text-sm md:text-base md:flex-1">
                {pain.description}
              </p>
              {pain.resolution && (
                <div className="relative z-10 pt-4 mt-4 md:pt-5 md:mt-6 border-t border-white/5 flex items-start gap-3">
                  <span className="text-white/60 text-sm mt-0.5">&rarr;</span>
                  <p className="text-primary font-medium text-sm md:text-base leading-relaxed">
                    {pain.resolution}
                  </p>
                </div>
              )}
            </motion.div>
          ))}

          {/* Spacer mobile — estende o peak moment do sticky stack.
              30dvh de scroll extra depois do card 4 stickar, mantendo os 4
              cards visíveis simultaneamente por ~1s de scroll normal.
              md:hidden porque desktop é grid 2×2 sem sticky. */}
          <div aria-hidden className="h-[30dvh] md:hidden" />
        </motion.div>

      </div>
    </section>
  );
}
