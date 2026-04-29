'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import Eyebrow from '@/components/Eyebrow';
import { GlowingEffect } from '@/components/ui/glowing-effect';

// Ícones coloridos vetoriais das plataformas
const platforms = [
  { name: 'Google', icon: '/logos/google.svg' },
  { name: 'Facebook', icon: '/logos/facebook.svg' },
  { name: 'Instagram', icon: '/logos/instagram.svg' },
  { name: 'YouTube', icon: '/logos/youtube.svg' },
  { name: 'LinkedIn', icon: '/logos/linkedin.svg' },
  { name: 'TikTok', icon: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-primary" fill="currentColor">
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

/**
 * MetodoW4DHub — Método W4D como hub schematic com pulse "data flowing" + scroll-driven trace.
 *
 * Desktop (lg+): hub-and-spoke horizontal.
 *   - Hub badge central (pill com Método W4D mono + pulse dot vermelho)
 *   - Trunk vertical → rail horizontal → 4 drops (draw-on stagger sequencial)
 *   - PULSE TRAVELING infinito ao longo da rail (left→right) — simula data flow
 *   - Port dots vermelhos no top de cada phase node
 *
 * Mobile/tablet (<lg): timeline single-column.
 *   - Hub badge no top, trunk vertical descendendo pela left-side dos phases
 *   - Trunk SCROLL-DRIVEN: cresce conforme user scrolla (useScroll + useTransform)
 *   - Pulse na leading edge do trunk (ponto vermelho que persegue o caminho)
 *   - 4 phases stacked vertical: port dot na linha + word + sub + desc à direita
 *
 * Reduced-motion: pulses desabilitam, scroll-driven mantém (não é loop perpétuo).
 */
function MetodoW4DHub() {
  const prefersReducedMotion = useReducedMotion();
  const phasesRef = useRef<HTMLDivElement>(null);

  /** Scroll progress relativo ao container das phases (mobile timeline).
   *  start 0.85: trunk começa a crescer quando phases entram (top a 85% do viewport)
   *  end 0.5: trunk completo quando phases saem (bottom a 50% do viewport) */
  const { scrollYProgress } = useScroll({
    target: phasesRef,
    offset: ['start 0.85', 'end 0.5'],
  });
  const trunkHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div id="metodo" className="w-full mb-16 md:mb-20 lg:mb-24 relative scroll-mt-24">

      {/* Hub label — título tipográfico com 3 efeitos coerentes:
          (1) word-stagger: "Método" entra, "W4D" entra com delay 0.3s
          (2) fadeBlur no "W4D" — pattern do Hero H1, blur 8→0 + y 12→0 (Apple-style cinematográfico)
          (3) underline draw-on no "W4D" — pattern dos NavLinks Footer, thin red line scaleX 0→1
          Tudo gated por reduced-motion. Sem loop perpétuo (CLAUDE.md proíbe motion decorativa). */}
      <div className="flex justify-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary tracking-[-0.04em] leading-[1] inline-flex items-baseline gap-2.5">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.7,
              ease: [0.16, 1, 0.3, 1] as any,
            }}
          >
            Método
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.9,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: [0.16, 1, 0.3, 1] as any,
            }}
            className="relative text-cta"
          >
            W4D
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 1.0,
                ease: [0.16, 1, 0.3, 1] as any,
              }}
              className="absolute -bottom-1 left-0 right-0 h-px bg-cta origin-left"
            />
          </motion.span>
        </h3>
      </div>

      {/* ═══════ DESKTOP (lg+) — schematic horizontal ═══════ */}

      {/* Schematic stack: skeleton estático (white/15 lines) + PulseBeams overlay (red gradient flowing) +
          source node SVG (red circle no topo do trunk) ancorando o título ao schematic.
          Posições 12.5/37.5/62.5/87.5% = cell centers do grid-cols-4. ViewBox 1000x56 alinhado.
          h-14 = 56px (match com viewBox y). mt-5 = breathing room maior pro título tipográfico. */}
      <div className="hidden lg:block relative h-14 w-full mt-5">

        {/* Skeleton: trunk + rail + 4 drops draw-on inicial (white/15 = "wires desligados") */}
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-6 bg-white/15 origin-top"
        />
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
          className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-white/15 origin-center"
        />
        {[12.5, 37.5, 62.5, 87.5].map((leftPct, i) => (
          <motion.div
            key={i}
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, delay: 1.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute top-6 w-px h-7 bg-white/15 origin-top"
            style={{ left: `${leftPct}%` }}
          />
        ))}

        {/* Source node — static red dot no topo do trunk, ancora visual entre título e schematic.
            Sem animação infinita (PulseBeams removido a pedido do user). Apenas presence estática. */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[3px] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cta shadow-[0_0_6px_rgba(236,0,0,0.55)]"
        />
      </div>

      {/* Phase grid desktop horizontal — 4 cols. Eyebrow numerado (01 · BASE) acima do word.
          Cada coluna inteira faz cascata reveal com stagger 0.18s (mais pronunciado que antes). */}
      <div className="hidden lg:grid grid-cols-4 gap-x-4 items-start relative z-10">
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.word}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.7,
              delay: prefersReducedMotion ? 0 : 0.4 + i * 0.18,
              ease: [0.16, 1, 0.3, 1] as any,
            }}
            className="flex flex-col items-center text-center w-full px-2"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : 0.6 + i * 0.18,
                ease: [0.16, 1, 0.3, 1] as any,
              }}
              className="w-2 h-2 rounded-full bg-cta mb-5 shadow-[0_0_8px_rgba(236,0,0,0.6)]"
            />
            {/* Phase word (focal) → eyebrow term abaixo → desc. Numbers removidos —
                sequência já comunicada pelo schematic (trunk/rail/drops) + reading order natural
                + alliteration WORK/WAY/WIN/WEALTH. Strategic omission (redesign-skill). */}
            <span className="text-6xl font-semibold text-primary tracking-[-0.05em] leading-[1] block mb-3">
              {phase.word}
            </span>
            <span className="block font-mono text-xs text-cta uppercase tracking-[0.18em] mb-3">
              {phase.sub}
            </span>
            <span className="text-sm md:text-base text-body font-normal leading-snug max-w-[22ch]">
              {phase.desc}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ═══════ MOBILE / TABLET (<lg) — timeline vertical scroll-driven ═══════ */}

      {/* Conector hub→trunk-start: linha curta entre hub e início do timeline (alinha com left-6 do trunk). */}
      <div className="lg:hidden flex pl-[1.4375rem] mt-2">
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-px h-6 bg-gradient-to-b from-cta/60 to-white/15 origin-top"
        />
      </div>

      {/* Mobile timeline: trunk vertical scroll-driven na esquerda + 4 phases stacked à direita */}
      <div className="lg:hidden relative" ref={phasesRef}>

        {/* Trunk background — linha estática white/10 ocupando toda altura do timeline */}
        <div aria-hidden className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

        {/* Trunk progress fill — gradient vermelho com height controlada por scrollYProgress.
            Cresce conforme user scrolla pelo container das phases. */}
        <motion.div
          aria-hidden
          style={{ height: trunkHeight }}
          className="absolute left-6 top-0 w-px bg-gradient-to-b from-cta via-cta/80 to-cta/40 origin-top"
        />

        {/* Pulse na leading edge do trunk — persegue o caminho conforme scroll.
            Posicionado em `top: trunkHeight` segue exatamente onde o gradient termina. */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden
            style={{ top: trunkHeight }}
            className="absolute left-6 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cta shadow-[0_0_14px_4px_rgba(236,0,0,0.7)]"
          />
        )}

        {/* 4 phases stacked vertical, conteúdo em pl-14 (3.5rem) — port dots ficam em -left-2rem alinhando com trunk em left-6.
            Cascata reveal: cada phase desliza da direita (x: 24 → 0) com stagger 0.18s (mais pronunciado).
            Eyebrow numerado (01 · BASE) acima do word — index secondary + sub cta. */}
        <div className="flex flex-col gap-12 pl-14">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.word}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.1 + i * 0.18,
                ease: [0.16, 1, 0.3, 1] as any,
              }}
              className="relative"
            >
              {/* Port dot — alinha com o trunk (pl-14 = 3.5rem; -left-2rem volta até 1.5rem = left-6 do trunk) */}
              <span
                aria-hidden
                className="absolute -left-[2rem] top-3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cta shadow-[0_0_8px_rgba(236,0,0,0.6)]"
              />
              {/* Phase word (focal) → eyebrow term abaixo → desc. Numbers removidos —
                  sequência já comunicada pelo trunk timeline + reading order. */}
              <h4 className="text-3xl md:text-5xl font-semibold text-primary tracking-[-0.04em] leading-[1] mb-2">
                {phase.word}
              </h4>
              <span className="block font-mono text-[11px] md:text-xs text-cta uppercase tracking-[0.18em] mb-3">
                {phase.sub}
              </span>
              <span className="block text-sm md:text-base text-body font-normal leading-snug max-w-[40ch]">
                {phase.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Grid de plataformas — logos soltos sem fundo escuro, editorial.
// Breathing assimétrico: cada logo pulsa scale 1→1.04→1 com delay sequencial 0.5s,
// nunca todos no mesmo fase. Comunica "canais operacionalmente ativos" (signal, não decoração).
// Hover glow vermelho desktop preservado. Reduced-motion: pulse desabilita.
function PlatformsVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-10 place-items-center w-full max-w-4xl mx-auto">
      {platforms.map((p, i) => (
        <motion.div
          key={p.name}
          title={p.name}
          animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
          className="group flex items-center justify-center w-full h-16 md:h-20"
        >
          {typeof p.icon === 'string' ? (
            <img
              src={p.icon}
              alt={p.name}
              className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(236,0,0,0.45)] transition-all duration-300 ease-out pointer-events-none"
            />
          ) : (
            <div className="flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(236,0,0,0.45)] transition-all duration-300 ease-out pointer-events-none">
              {p.icon}
            </div>
          )}
        </motion.div>
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
          className="h2-section font-semibold tracking-[-0.05em] leading-[1.05] mb-10 md:mb-14 text-center text-white/95 max-w-4xl text-balance"
        >
          Do anúncio à agenda do seu time comercial.
        </motion.h2>

        {/* Método W4D — hub schematic central com connectors até as 4 fases */}
        <MetodoW4DHub />


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

        {/* Content Blocks — grid 2x2 limpo (sticky stack agora vive em Dores).
            Serviços = entregas paralelas funcionais; Dores = acumulação emocional.
            Cada card ganha GlowingEffect (border red proximity-aware, mesmo pattern Dores) +
            corner-squares brancos discretos no hover (xAI/Aceternity Dark Grid pattern). */}
        <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
              className="group relative w-full flex flex-col shadow-card-dark bg-tertiary rounded-2xl p-8 pb-12 sm:p-10 sm:pb-10 lg:p-12 lg:pb-12 md:hover:-translate-y-0.5 transition-transform duration-300 ease-out"
            >
              {/* GlowingEffect — proximity-aware red border glow (mesmo Dores). */}
              <GlowingEffect proximity={80} spread={36} borderWidth={1} />

              {/* Hierarquia interna: eyebrow → label → descrição → bullets. relative z-10 acima do GlowingEffect. */}
              <div className="mb-8 relative z-10">
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

              <ul className="flex flex-col gap-4 flex-1 pt-6 border-t border-white/5 relative z-10">
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
            Aplicar na minha operação
            <span className="ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1">&#8594;</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
