'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Eyebrow from '@/components/Eyebrow';

// Ícones coloridos vetoriais das plataformas
const platforms = [
  { name: 'Google', icon: '/logos/google.svg' },
  { name: 'Facebook', icon: '/logos/facebook.svg' },
  { name: 'Instagram', icon: '/logos/instagram.svg' },
  { name: 'YouTube', icon: '/logos/youtube.svg' },
  { name: 'LinkedIn', icon: '/logos/linkedin.svg' },
  { name: 'TikTok', icon: (
    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )},
];

const services = [
  {
    id: 'anuncios',
    label: 'Gestão de Anúncios',
    subtitle: 'Operação de Mídia',
    description: 'Gestão completa dos seus anúncios no Google, Meta, YouTube, TikTok e LinkedIn. Quem opera aqui entende de venda. Não só de plataforma.',
    bullets: [
      'Segmentamos os anúncios para públicos com padrão de comportamento alinhado ao que você vende. Não para audiências amplas que apenas se parecem com seus clientes.',
      'Distribuímos investimento entre plataformas com base em onde o seu tipo de cliente está decidindo. Não onde é mais barato anunciar.',
      'Ajustamos campanhas continuamente com base no que está gerando retorno. Não no que está gerando clique.',
    ],
    visual: 'platforms',
  },
  {
    id: 'conversao',
    label: 'Estrutura de Conversão',
    subtitle: 'Da visita ao contato',
    description: 'Estruturamos as páginas de destino e os anúncios para quem visitou sem entrar em contato, com sequências de e-mail quando fazem sentido para o negócio. O objetivo é reduzir o volume de contatos sem perfil que chegam ao seu time comercial.',
    bullets: [
      'Desenvolvemos páginas de destino alinhadas com o anúncio que trouxe o visitante, para que o que ele leu e o que ele vê continuem a mesma conversa.',
      'Configuramos sequências de contato automáticas para quem demonstrou interesse mas ainda não agiu, sem exigir que o seu time comercial entre em contato com cada visitante individualmente.',
      'Alcançamos de volta quem visitou sua página sem avançar, com anúncios segmentados pela objeção provável de cada perfil. Não com a mesma peça para todo mundo.',
    ],
    visual: null,
  },
  {
    id: 'qualificacao',
    label: 'Qualificação e Resposta',
    subtitle: 'Antes do Comercial',
    description: 'Configuramos respostas e filtros automáticos para o primeiro contato, para que seu time comercial receba apenas quem já demonstrou interesse real. Sem triagem manual na sua agenda.',
    bullets: [
      'Configuramos processos que respondem ao primeiro contato em segundos, qualificando o interesse antes que chegue à sua equipe, independentemente do horário.',
      'Impedimos que contatos sem perfil ocupem o tempo do seu time comercial. Só avança quem passou pelos critérios de qualificação que definimos juntos.',
      'Estruturamos os caminhos de resposta para que nenhum contato chegue sem resposta por falta de alguém disponível para atender.',
    ],
    visual: null,
  },
  {
    id: 'monitoramento',
    label: 'Monitoramento e Resultado',
    subtitle: 'Acompanhamento Diário',
    description: 'Monitoramos o desempenho dos anúncios e das páginas todos os dias, com foco em conversão real. Não em métricas de alcance ou visualização que não aparecem no seu faturamento.',
    bullets: [
      'Consolidamos os dados de todas as plataformas em uma visão única, para que você saiba, a qualquer momento, quanto do investimento está gerando retorno.',
      'Testamos variações de anúncios e páginas de forma contínua, descartando o que não converte e escalando o que está funcionando.',
      'Separamos o resultado por canal nos relatórios, para que você identifique sem ambiguidade qual está gerando retorno e qual está apenas consumindo investimento.',
    ],
    visual: null,
  },
];

// Visual para o lado direito: Platforms Grid
function PlatformsVisual() {
  return (
    <div className="grid grid-cols-3 gap-4 place-items-center w-full max-w-md mx-auto">
      {platforms.map((p) => (
        <div
          key={p.name}
          title={p.name}
          className="group flex flex-col items-center justify-center p-4 rounded-xl shadow-border-dark bg-black/40 hover:shadow-[0_0_0_1px_rgba(236,0,0,0.35)] hover:bg-black/60 hover:scale-110 transition-all duration-300 ease-out w-full aspect-square"
        >
          {typeof p.icon === 'string' ? (
            <img
              src={p.icon}
              alt={p.name}
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 pointer-events-none"
            />
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center drop-shadow-md group-hover:scale-110 transition-transform duration-300 pointer-events-none text-white">
              {p.icon}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ServicosDetalhado() {
  return (
    <section className="relative w-full py-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="mb-4">
          <Eyebrow>O que entregamos</Eyebrow>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-[1.1] mb-16 text-center bg-gradient-to-b from-white to-[#B0B0B0] bg-clip-text text-transparent"
        >
          Do anúncio à agenda do seu time comercial.
        </motion.h2>

        {/* Faixa Método W4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-full mb-20 lg:mb-24"
        >
          <div className="flex justify-center mb-6">
            <Eyebrow accent>Método W4</Eyebrow>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {[
              { word: "WORK", sub: "base", desc: "Diagnóstico do negócio" },
              { word: "WAY", sub: "caminho", desc: "Estrutura montada antes de investir" },
              { word: "WIN", sub: "resultado", desc: "Operação ativa com ajuste diário" },
              { word: "WEALTH", sub: "escala", desc: "Escala baseada no que já funcionou" },
            ].map((phase, i) => (
              <div key={phase.word} className="flex items-center">
                <div className="flex flex-col items-center text-center w-full px-4 py-4">
                  <span className="text-lg md:text-xl font-bold text-primary tracking-[-0.03em] mb-0.5">
                    {phase.word}
                  </span>
                  <span className="font-mono text-[10px] text-secondary uppercase tracking-[1px] mb-1">
                    {phase.sub}
                  </span>
                  <span className="text-sm text-body font-normal">
                    {phase.desc}
                  </span>
                </div>
                {i < 3 && (
                  <span className="hidden lg:block text-white/20 text-lg shrink-0">&#8594;</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content Blocks - Sticky Stack Mobile, 2 Columns Desktop */}
        <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
              style={{
                '--mobile-top': `calc(5rem + ${index * 1.5}rem)`,
                zIndex: index + 10,
              } as React.CSSProperties}
              className="sticky top-[var(--mobile-top)] md:relative md:top-auto w-full h-auto min-h-[60vh] md:min-h-0 flex flex-col shadow-stack-card bg-tertiary rounded-2xl overflow-hidden p-6 sm:p-8 lg:p-12"
            >
              <div className="mb-8">
                <div className="mb-4">
                  <Eyebrow accent>{service.subtitle}</Eyebrow>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-[-0.04em] text-primary mb-6">
                  {service.label}
                </h3>
                <p className="text-lg text-body font-normal leading-[1.7]">
                  {service.description}
                </p>
              </div>
              
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={18}
                      strokeWidth={2.5}
                      className="text-white/20 mt-1 shrink-0"
                    />
                    <span className="text-body font-normal leading-[1.65] text-sm md:text-base">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Se o card tiver visual, renderizar aqui na base do card */}
              {service.visual === 'platforms' && (
                <div className="pt-8 mt-auto border-t border-white/5">
                  <PlatformsVisual />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mt-20 flex flex-col items-center gap-6 text-center"
        >
          <p className="text-base md:text-lg text-body font-normal leading-[1.7] max-w-xl">
            Se alguma dessas frentes resolve o que você está enfrentando agora, é isso que um diagnóstico identifica.
          </p>
          <a
            href="#formulario"
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary transition-all duration-300 ease-out bg-cta rounded-full hover:bg-cta-hover hover:-translate-y-1 glow-cta"
          >
            Solicitar diagnóstico <span className="ml-2 group-hover:translate-x-1 transition-transform">&#8594;</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
