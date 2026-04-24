'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )},
];

const services = [
  {
    id: 'anuncios',
    label: 'Gestão de Anúncios',
    subtitle: 'Operação de Mídia',
    description: 'Gestão completa dos seus anúncios nas principais plataformas do mercado. Nossa equipe não apenas aperta botões de tráfego, mas opera com inteligência comercial focada em venda.',
    bullets: [
      'Segmentamos os anúncios para públicos com real intenção de compra, ignorando métricas de vaidade e audiências amplas que só parecem com clientes.',
      'Distribuímos o investimento entre os canais baseados na jornada de decisão do seu perfil ideal, não apenas onde o custo do clique está mais barato.',
      'Ajustamos campanhas diariamente com foco absoluto no que está gerando receita, cortando sem piedade tudo aquilo que só gera visualização e clique.',
    ],
  },
  {
    id: 'conversao',
    label: 'Estrutura de Conversão',
    subtitle: 'Da Visita ao Contato',
    description: 'Desenhamos landing pages e fluxos de automação de alto nível para visitantes que não compraram de primeira. O foco é filtrar curiosos e reter potenciais compradores reais.',
    bullets: [
      'Construímos landing pages que conversam diretamente com a promessa do anúncio, mantendo a coerência visual e textual que faz o visitante converter.',
      'Configuramos sequências de recuperação automática para quem demonstrou interesse, aquecendo o contato antes mesmo do seu time comercial falar com ele.',
      'Impactamos novamente quem saiu da página através de remarketing segmentado, quebrando objeções específicas de cada perfil de forma quase invisível.',
    ],
  },
  {
    id: 'qualificacao',
    label: 'Qualificação e Filtros',
    subtitle: 'Antes do Comercial',
    description: 'Implementamos respostas imediatas e filtros automáticos para todo contato novo. O objetivo é que a sua equipe converse apenas com quem tem bolso e interesse real de compra.',
    bullets: [
      'Automatizamos a primeira interação em poucos segundos, captando dados vitais e medindo o nível de urgência do contato independentemente do seu horário.',
      'Blindamos o tempo valioso da sua equipe comercial, barrando curiosos e permitindo que apenas perfis pré-aprovados nos critérios avancem de fase.',
      'Mapeamos todas as rotas possíveis de atendimento para garantir que nenhuma oportunidade real seja perdida por demora ou falta de alguém disponível.',
    ],
  },
  {
    id: 'monitoramento',
    label: 'Monitoramento Exato',
    subtitle: 'Acompanhamento Diário',
    description: 'Acompanhamos a performance da estrutura diariamente, priorizando conversão sólida. Ignoramos métricas superficiais que inflam relatórios mas não aparecem na sua conta bancária.',
    bullets: [
      'Centralizamos as informações de todas as fontes em um único painel, mostrando de forma cristalina de onde está vindo cada centavo do seu retorno real.',
      'Executamos testes constantes de variações criativas e textuais, descartando peças que não convertem e injetando mais verba naquelas que dão lucro.',
      'Isolamos o resultado por canal de aquisição, para que não exista dúvida sobre qual plataforma está tracionando a venda e qual está apenas gastando.',
    ],
  },
];

// Método W4D — fases com linha vermelha scroll-drawn conectando em desktop
const PHASES = [
  { word: "WORK", sub: "base", desc: "Diagnóstico da sua operação atual" },
  { word: "WAY", sub: "caminho", desc: "Estrutura montada antes de investir" },
  { word: "WIN", sub: "resultado", desc: "Operação ativa com ajuste diário" },
  { word: "WEALTH", sub: "crescimento", desc: "Crescimento baseado no que já funcionou" },
] as const;

// Um dot por fase — hooks em nível superior (Rules of Hooks respeitadas)
function PhaseDot({ progress, threshold }: { progress: any, threshold: number }) {
  const opacity = useTransform(progress, (p: number) => (p >= threshold ? 1 : 0.18));
  const scale = useTransform(progress, (p: number) => (p >= threshold ? 1 : 0.7));
  return (
    <motion.span
      aria-hidden
      className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cta"
      style={{ opacity, scale }}
    />
  );
}

function MetodoW4D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotProgress = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 3]);

  return (
    <div ref={sectionRef} id="metodo" className="w-full mb-24 lg:mb-28 relative scroll-mt-24">
      <div className="flex justify-center mb-12">
        <Eyebrow accent>Método W4D</Eyebrow>
      </div>

      <div className="relative">
        {/* Linha horizontal scroll-drawn — apenas lg+ */}
        <div
          aria-hidden
          className="hidden lg:block absolute left-0 right-0 top-[34px] pointer-events-none z-0 px-[12.5%]"
        >
          <svg className="w-full" height="2" viewBox="0 0 1000 2" preserveAspectRatio="none">
            <defs>
              <linearGradient id="metodoLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF3B3B" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FF3B3B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FF3B3B" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 1 L 1000 1"
              stroke="url(#metodoLineGrad)"
              strokeWidth="1"
              fill="none"
              style={{ pathLength }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 items-start relative z-10">
          {PHASES.map((phase, i) => (
            <div key={phase.word} className="flex flex-col items-center text-center w-full px-2">
              <div className="relative mb-4">
                <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary tracking-[-0.04em] block">
                  {phase.word}
                </span>
                <PhaseDot progress={dotProgress} threshold={i} />
              </div>
              <span className="font-mono text-xs text-cta uppercase tracking-[0.18em] mb-3 mt-2">
                {phase.sub}
              </span>
              <span className="text-sm md:text-base text-body font-normal leading-snug max-w-[22ch]">
                {phase.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Grid de plataformas — logos soltos sem fundo escuro, editorial
function PlatformsVisual() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-10 place-items-center w-full max-w-4xl mx-auto">
      {platforms.map((p) => (
        <div
          key={p.name}
          title={p.name}
          className="group flex items-center justify-center w-full h-16 md:h-20"
        >
          {typeof p.icon === 'string' ? (
            <img
              src={p.icon}
              alt={p.name}
              className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            />
          ) : (
            <div className="flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
    <section id="servicos" className="relative w-full py-12 md:py-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="mb-5">
          <Eyebrow index="02">O que entregamos</Eyebrow>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.05em] leading-[1.05] mb-20 text-center text-white/95 max-w-4xl text-balance"
        >
          Do anúncio à agenda do seu time comercial.
        </motion.h2>

        {/* Faixa Método W4D — linha scroll-drawn vermelha conecta as fases */}
        <MetodoW4D />


        {/* Plataformas — logos soltos, sem tile escuro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-full mb-24 lg:mb-28 flex flex-col items-center"
        >
          <div className="mb-10">
            <Eyebrow>Operamos onde seu cliente está</Eyebrow>
          </div>
          <PlatformsVisual />
        </motion.div>

        {/* Content Blocks - Sticky Stack Mobile, 2 Columns Desktop */}
        <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
              style={{
                '--mobile-top': `calc(5rem + ${index * 1.5}rem)`,
                zIndex: index + 10,
              } as React.CSSProperties}
              className="sticky top-[var(--mobile-top)] md:relative md:top-auto w-full h-auto min-h-[60dvh] md:min-h-0 flex flex-col shadow-stack-card bg-tertiary rounded-2xl overflow-hidden p-8 pb-16 sm:p-10 sm:pb-10 lg:p-12 lg:pb-12"
            >
              {/* Hierarquia interna: eyebrow → label → descrição → bullets */}
              <div className="mb-8">
                <div className="mb-5">
                  <Eyebrow>{service.subtitle}</Eyebrow>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-semibold tracking-[-0.04em] text-primary leading-[1.15] mb-5">
                  {service.label}
                </h3>
                <p className="text-base md:text-lg text-body font-normal leading-[1.7] max-w-[60ch]">
                  {service.description}
                </p>
              </div>

              <ul className="flex flex-col gap-4 flex-1 pt-6 border-t border-white/5">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="text-white/60 mt-1 shrink-0"
                    />
                    <span className="text-body font-normal leading-[1.7] text-sm md:text-base">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mt-24 flex flex-col items-center gap-6 text-center"
        >
          <p className="text-base md:text-lg text-body font-normal leading-[1.7] max-w-xl">
            Se alguma dessas frentes resolve o que você está enfrentando agora, é hora de estruturarmos isso na sua operação.
          </p>
          <a
            href="#formulario"
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary transition-colors duration-200 ease-out bg-cta rounded-full hover:bg-cta-hover active:scale-[0.98] glow-cta"
          >
            Solicitar proposta
            <span className="ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1">&#8594;</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
