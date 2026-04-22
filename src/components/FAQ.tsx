'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Eyebrow from '@/components/Eyebrow';

const faqs = [
  {
    q: 'Qual o investimento mínimo em mídia pra trabalhar com vocês?',
    a: 'Trabalhamos com empresas que investem a partir de US$ 10 mil por mês em mídia paga. Abaixo disso, os dados não maturam rápido o suficiente pra justificar a estrutura que montamos. Não é política. É matemática.',
  },
  {
    q: 'Quanto tempo até eu ver resultado?',
    a: 'As primeiras 2 a 4 semanas são de planejamento e estrutura — rastreamento, páginas de destino, qualificação, integrações. A partir da semana 5, entra operação ativa com ajuste diário. Resultado comercial mensurável começa entre o segundo e terceiro mês. Quem promete "explodir em 30 dias" está te vendendo sorte.',
  },
  {
    q: 'Vocês atendem empresa fora do Brasil e dos EUA?',
    a: 'Operamos com empresas brasileiras no Brasil, brasileiras com sede nos EUA e empresas americanas. Para outras regiões, avaliamos caso a caso — depende do fuso, do idioma da operação comercial e da estrutura fiscal envolvida.',
  },
  {
    q: 'O que acontece se o resultado vier abaixo do esperado?',
    a: 'Você sabe na mesma semana. Os números ficam abertos. Revemos a estratégia, ajustamos o que não está respondendo, ou terminamos o contrato sem atrito. Não existe cláusula de amarração.',
  },
  {
    q: 'Como funciona a elaboração da proposta?',
    a: 'Primeiro, temos uma conversa de 30 minutos, por vídeo ou telefone, onde analisamos sua operação atual e identificamos oportunidades de melhoria. Sem compromisso na primeira conversa. Se fizer sentido pros dois lados, desenhamos e enviamos uma proposta comercial sob medida.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-6 py-6 md:py-7 text-left group"
      >
        <span className="text-base md:text-lg font-medium text-primary tracking-[-0.01em] leading-snug">
          {q}
        </span>
        <span
          aria-hidden
          className={`shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full border text-lg leading-none transition-all duration-300 ${
            isOpen
              ? 'border-cta/40 bg-cta/[0.08] text-cta rotate-45'
              : 'border-white/15 bg-white/[0.02] text-body group-hover:border-white/30 group-hover:text-primary'
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
            className="overflow-hidden"
          >
            <p className="pb-6 md:pb-7 pr-10 text-body text-base font-normal leading-[1.75] max-w-[65ch]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full py-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-24">

        {/* Coluna esquerda — título (sticky em desktop) */}
        <div className="md:w-1/3 md:sticky md:top-28 md:self-start flex flex-col">
          <div className="mb-6">
            <Eyebrow index="05">Dúvidas frequentes</Eyebrow>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-[1.1] text-white/95 text-balance"
          >
            As perguntas que todo dono de empresa faz antes de contratar.
          </motion.h2>
          <p className="mt-6 text-body text-base md:text-lg font-normal leading-[1.7] max-w-md">
            Se a sua não estiver aqui, é só perguntar no próprio formulário. Respondemos antes da primeira conversa.
          </p>
        </div>

        {/* Coluna direita — acordeão */}
        <div className="md:w-2/3 flex flex-col">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
