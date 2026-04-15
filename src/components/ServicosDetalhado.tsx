'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// SVGs inline das plataformas (simples, monocromáticos)
const platforms = [
  { name: 'Google Ads', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 0L5.5 12h13L12 0zm0 3.5L16.6 12H7.4L12 3.5zM2 14l-2 7h8.5L6 14H2zm14 0l-2.5 7H22l-2-7h-4z"/>
    </svg>
  )},
  { name: 'Meta', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M14.023 0C10.147 0 7.54 2.326 5.635 5.753 4.245 3.085 2.424 0 0 0v3.6c1.265 0 2.556 1.73 3.782 4.02C2.53 9.88 1.47 12.6 1.47 15c0 2.87 1.176 4.5 2.941 4.5 2.118 0 3.647-2.25 5.353-5.25C11.47 17.25 13 20 15.176 20c2.118 0 3.353-1.8 3.353-4.5 0-2.7-.97-5.37-2.264-7.5C18.03 4.97 19.765 3.6 21.353 3.6V0c-3.294 0-5.765 3.12-7.33 6.75C12.88 3.97 12.353 0 14.023 0z"/>
    </svg>
  )},
  { name: 'Instagram', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )},
  { name: 'YouTube', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )},
  { name: 'LinkedIn', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )},
  { name: 'TikTok', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )},
];

const tabs = [
  {
    id: 'trafego',
    label: 'Tráfego Pago',
    subtitle: 'Mídia Paga',
    description: 'Gestão completa dos seus anúncios online no Google, Meta, YouTube, TikTok e LinkedIn.',
    bullets: [
      'Atraia compradores para seu funil de vendas',
      'Abasteça seu comercial com oportunidades reais',
      'Tenha previsibilidade e mensure o retorno do investimento',
    ],
    visual: 'platforms',
  },
  {
    id: 'funil',
    label: 'Funil de Vendas',
    subtitle: 'Conversão Estruturada',
    description: 'Landing pages, sequências de e-mail e remarketing que transformam visitantes em compradores.',
    bullets: [
      'Páginas otimizadas para conversão',
      'Sequências automatizadas de nutrição',
      'Remarketing inteligente para quem não converteu',
    ],
    visual: 'funnel',
  },
  {
    id: 'automacao',
    label: 'Automação com IA',
    subtitle: 'Inteligência Artificial',
    description: 'Chatbots, respostas automáticas e fluxos inteligentes que trabalham 24 horas por dia.',
    bullets: [
      'Atendimento instantâneo via WhatsApp e e-mail',
      'CRM integrado com qualificação automática',
      'Fluxos que escalam sem aumentar equipe',
    ],
    visual: 'ai',
  },
  {
    id: 'otimizacao',
    label: 'Otimização Contínua',
    subtitle: 'Performance',
    description: 'Monitoramento diário e ajustes baseados em dados reais para escalar resultados.',
    bullets: [
      'Dashboards em tempo real',
      'Testes A/B constantes em criativos e páginas',
      'Relatórios claros com ROI por canal',
    ],
    visual: 'performance',
  },
];

// Visual para o lado direito: Platforms Grid
function PlatformsVisual() {
  return (
    <div className="grid grid-cols-3 gap-4 place-items-center">
      {platforms.map((p) => (
        <div
          key={p.name}
          title={p.name}
          className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 bg-black/40 hover:border-cta/40 hover:scale-110 transition-all duration-300 ease-out cursor-default w-full"
        >
          <span className="text-white/40 group-hover:text-cta transition-colors duration-300">
            {p.icon}
          </span>
          <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors duration-300 font-light tracking-wide">
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// Visual genérico com etapas / nodes (para funnel, ai, performance)
function GenericVisual({ type }: { type: string }) {
  const configs: Record<string, { steps: string[]; color: string }> = {
    funnel: {
      steps: ['Visitante', 'Lead Qualificado', 'Oportunidade', 'Cliente'],
      color: '#EC0000',
    },
    ai: {
      steps: ['Mensagem recebida', 'IA qualifica', 'CRM atualizado', 'Comercial fecha'],
      color: '#EC0000',
    },
    performance: {
      steps: ['Dados coletados', 'Análise diária', 'Teste A/B', 'Escala o que funciona'],
      color: '#EC0000',
    },
  };

  const c = configs[type] || configs.funnel;

  return (
    <div className="flex flex-col gap-3 w-full">
      {c.steps.map((step, i) => (
        <div key={i} className="flex items-center gap-4">
          <div
            className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-xs font-bold"
            style={{ borderColor: c.color, color: c.color }}
          >
            {i + 1}
          </div>
          <div className="flex-1 h-px bg-white/5 relative">
            <motion.div
              className="absolute inset-y-0 left-0 h-px"
              style={{ background: c.color }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as any }}
            />
          </div>
          <span className="text-sm text-white/50 font-light">{step}</span>
        </div>
      ))}
    </div>
  );
}

export default function ServicosDetalhado() {
  const [activeTab, setActiveTab] = useState(0);

  const tab = tabs[activeTab];

  return (
    <section className="relative w-full py-32 px-6 sm:px-12 lg:px-24"
      style={{ background: 'rgba(10,10,10,0.95)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-4 block"
        >
          Como trabalhamos
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-4xl md:text-5xl font-extrabold tracking-[-1px] text-primary leading-[1.1] mb-16 text-center"
        >
          Cada serviço. Uma engrenagem.&nbsp;<br className="hidden md:block" />
          Um sistema que vende.
        </motion.h2>

        {/* Tab Bar */}
        <div className="flex flex-nowrap overflow-x-auto scrollbar-none gap-2 mb-12 w-full justify-start md:justify-center pb-1">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ease-out whitespace-nowrap ${
                activeTab === i
                  ? 'bg-cta text-white shadow-lg shadow-cta/20'
                  : 'bg-transparent text-[#999] hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="w-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring' as any, stiffness: 60, damping: 25 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            >
              {/* Lado Esquerdo: Copy */}
              <div className="p-10 md:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                <span className="text-cta text-[13px] font-semibold tracking-[3px] uppercase mb-4 block">
                  {tab.subtitle}
                </span>
                <p className="text-lg md:text-xl text-[#999999] font-light leading-[1.7] mb-10">
                  {tab.description}
                </p>
                <ul className="flex flex-col gap-4">
                  {tab.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                      className="flex items-start gap-3"
                    >
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        className="text-cta mt-1 shrink-0"
                      />
                      <span className="text-[#999999] font-light leading-[1.7] text-sm md:text-base">
                        {bullet}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Lado Direito: Visual */}
              <div className="p-10 md:p-14 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${tab.id}-visual`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: 'spring' as any, stiffness: 60, damping: 25, delay: 0.1 }}
                    className="w-full"
                  >
                    {tab.visual === 'platforms' ? (
                      <PlatformsVisual />
                    ) : (
                      <GenericVisual type={tab.visual} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
