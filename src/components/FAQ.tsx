'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Eyebrow from '@/components/Eyebrow';

const faqs = [
  {
    q: 'Quanto tempo até eu ver resultado?',
    a: 'As primeiras 2 a 4 semanas são de planejamento e estrutura: rastreamento, páginas de destino, qualificação, integrações. A partir da semana 5, entra operação ativa com ajuste diário. Resultado comercial mensurável começa entre o segundo e terceiro mês. Quem promete "explodir em 30 dias" está te vendendo sorte.',
  },
  {
    q: 'Quanto custa trabalhar com a W4D?',
    a: 'Cada cliente tem seu plano específico. Não trabalhamos com pacote de prateleira. O investimento é construído considerando os canais de mídia ativos na operação (Google, Meta, YouTube, LinkedIn, TikTok ou combinação deles), as camadas de automação e IA aplicadas na qualificação do lead, a verba mensal de mídia que a empresa comporta, e a complexidade do funil comercial. Como referência, nossa parceria se posiciona na faixa de um profissional sênior de performance interno. A diferença é que você recebe um time completo operando a conta, não uma única pessoa. O valor exato é definido na primeira conversa, depois de entendermos o seu modelo de negócio.',
  },
  {
    q: 'O que acontece se o resultado vier abaixo do esperado?',
    a: 'Nosso contrato mínimo de implementação é de 3 meses. Esse é o tempo necessário para a estrutura maturar. A regra é clara: se você acompanhar o nosso passo a passo e executar a sua parte comercial dentro do que foi combinado, o resultado da sua empresa crescerá junto com a nossa operação. O jogo é de parceria e transparência diária.',
  },
  {
    q: 'Por que não contratar um gestor de tráfego interno ao invés da W4D?',
    a: 'Um gestor interno opera uma função: subir campanhas. Vender com previsibilidade exige mais do que isso: engenharia de dados, orquestração, copy e design focado em conversão, operando juntos na mesma conta. A W4D entrega esse time multidisciplinar dentro da sua operação, algo que uma contratação CLT isolada não alcança.',
  },
  {
    q: 'Quais projetos vocês NÃO aceitam?',
    a: 'Não operamos negócios que ainda não validaram seu produto ou serviço no mercado. Nossa especialidade é instalar nosso sistema comercial em empresas que já tracionam, mas precisam de volume, previsibilidade e novos contatos qualificados.',
  },
  {
    q: 'Vocês atendem empresa fora do Brasil e dos EUA?',
    a: 'Nosso foco de expansão é a América do Norte e o Brasil. Para operações na Europa ou Ásia, avaliamos o modelo de negócio e a complexidade do fuso horário antes de assumir a conta.',
  },
];

function FAQItem({ index, total, q, a, isOpen, onToggle }: { index: number; total: number; q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const indexStr = String(index).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');

  return (
    <div className="border-b border-white/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-6 py-6 md:py-7 text-left group"
      >
        <div className="flex items-baseline gap-4 md:gap-6 flex-1 min-w-0">
          <span className="font-mono text-[11px] md:text-xs text-secondary tracking-[0.18em] uppercase shrink-0 pt-0.5">
            {indexStr} / {totalStr}
          </span>
          <span className="text-base md:text-lg font-medium text-primary tracking-[-0.01em] leading-snug">
            {q}
          </span>
        </div>
        <span
          aria-hidden
          className={`shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full border text-lg leading-none transition-all duration-300 ${
            isOpen
              ? 'border-cta-accent/50 bg-cta-accent/[0.1] text-cta rotate-45'
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative w-full py-12 md:py-section px-6 sm:px-12 lg:px-24 bg-primary noise-overlay">

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

        {/* Topo Centralizado */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="mb-6">
            <Eyebrow index="04">Dúvidas frequentes</Eyebrow>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
            className="h2-section font-semibold tracking-[-0.05em] leading-[1.1] text-white/95 text-balance max-w-2xl"
          >
            As perguntas que todo dono de empresa faz antes de contratar.
          </motion.h2>
          <p className="mt-6 text-body text-base md:text-lg font-normal leading-[1.7] max-w-xl">
            Se a sua não estiver aqui, é só perguntar no próprio formulário. Respondemos antes da primeira conversa.
          </p>
        </div>

        {/* Acordeão Centralizado */}
        <div className="w-full flex flex-col">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              index={i + 1}
              total={faqs.length}
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
