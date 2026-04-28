'use client';

import { motion, useInView, animate, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Eyebrow from '@/components/Eyebrow';

const metrics = [
  { value: 20, suffix: "+", label: "anos vendendo", context: "Antes de ser agência, fomos o cliente", isStatic: false },
  { value: 11, suffix: "+", label: "anos no digital", context: "Tráfego pago com dinheiro próprio", isStatic: false },
  { value: 3000, suffix: "+", label: "alunos do método", context: "Profissionais treinados no método W4D", isStatic: false },
  { value: 0, suffix: "BR · USA", label: "onde operamos", context: "Operação ativa no Brasil e nos EUA", isStatic: true },
];

/**
 * Counter — slot-machine digit roll.
 * Cada dígito anima individualmente via Y transform (hardware-accelerated, sem
 * re-renders React no main thread). Stagger esquerda→direita reforça leitura
 * tipo "as casas decimais pousam uma de cada vez". Respeita prefers-reduced-motion.
 */
function Counter({ to, suffix, duration = 2, isStatic = false }: { to: number, suffix: string, duration?: number, isStatic?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const sizeClass = "text-4xl md:text-5xl font-semibold text-primary tracking-[-0.04em]";

  // Static: mostra direto o suffix completo (ex: "BR · USA")
  if (isStatic) {
    return <span ref={ref} className={sizeClass}>{suffix}</span>;
  }

  // Quebra o target em dígitos. Ex: 3000 → [3, 0, 0, 0]
  const digits = String(to).split('').map(Number);
  const ariaLabel = `${to}${suffix}`;

  return (
    <span ref={ref} className={`${sizeClass} inline-flex items-baseline tabular-nums`} aria-label={ariaLabel}>
      <span aria-hidden className="inline-flex items-baseline">
        {digits.map((digitValue, i) => (
          <RollingDigit
            key={i}
            target={inView ? digitValue : 0}
            duration={duration}
            delay={i * 0.08}
            reducedMotion={prefersReducedMotion ?? false}
          />
        ))}
      </span>
      <span aria-hidden>{suffix}</span>
    </span>
  );
}

/**
 * RollingDigit — um dígito 0-9 que rola via translateY.
 * Stack vertical de 0..9 (height 1em cada), container overflow-hidden 1em alto,
 * transform Y do inner stack = -digitValue * 10% (% relativo ao próprio elemento que tem 10em).
 */
function RollingDigit({ target, duration, delay, reducedMotion }: { target: number; duration: number; delay: number; reducedMotion: boolean }) {
  const value = useMotionValue(0);
  const y = useTransform(value, (latest) => `${-latest * 10}%`);

  useEffect(() => {
    if (reducedMotion) {
      value.set(target);
      return;
    }
    const controls = animate(value, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1] as any,
    });
    return () => controls.stop();
  }, [value, target, duration, delay, reducedMotion]);

  return (
    <span
      className="relative inline-block overflow-hidden leading-[1]"
      style={{ width: '0.62em', height: '1em' }}
    >
      <motion.span
        style={{ y }}
        className="absolute inset-x-0 top-0 flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="flex items-center justify-center"
            style={{ height: '1em', lineHeight: 1 }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function LeaderPhoto({ src, alt, initials, imgClassName = "object-cover object-top" }: { src: string, alt: string, initials: string, imgClassName?: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full relative aspect-[4/5] rounded-tl-3xl rounded-br-3xl overflow-hidden bg-secondary shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_50px_-12px_rgba(0,0,0,0.45)]">
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-semibold text-secondary/40 tracking-tight">{initials}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full hover:opacity-90 transition-all duration-700 contrast-[1.08] saturate-[0.85] brightness-[0.95] ${imgClassName}`}
        />
      )}
    </div>
  );
}

export default function Credibilidade() {
  return (
    <section id="quem-somos" className="relative w-full py-12 md:py-section px-6 sm:px-12 lg:px-24 overflow-hidden bg-secondary noise-overlay scroll-mt-24">

      {/* Aurora W4D soft — continuidade atmosférica cross-section */}
      <div aria-hidden className="aurora-w4d-soft" />

      {/* Fundo Gradiente */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-tertiary to-transparent z-0 opacity-80" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-16">
          <Eyebrow index="03">Quem está por trás do trabalho</Eyebrow>
        </div>

        {/* 2 Líderes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">

          {/* Thiago */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="flex flex-col"
          >
            <LeaderPhoto
              src="/images/Thiago3.png"
              alt="Thiago Weirich"
              initials="TW"
              imgClassName="object-cover object-top origin-top scale-[1.2]"
            />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-primary leading-[1.1] mt-8 mb-2">
              Thiago Weirich
            </h2>
            <span className="font-mono text-secondary text-xs tracking-[0.18em] uppercase mb-5">
              Fundador e Head of Performance
            </span>
            {/* Year-chips — âncora visual scan-friendly, não substitui a prosa */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[11px] text-body tracking-wider">
                <span className="text-white/40">●</span> 2005 · Vendas
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[11px] text-body tracking-wider">
                <span className="text-white/40">●</span> 2020 · TW Broker
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[11px] text-body tracking-wider">
                <span className="text-white/40">●</span> Hoje · W4D
              </span>
            </div>
            <p className="text-body text-base md:text-lg font-normal leading-[1.75] max-w-[60ch]">
              Thiago começou em vendas em 2005 e consolidou-se como corretor de imóveis em Santa Catarina a partir de 2011. Em 2015, passou a estudar tráfego pago errando com dinheiro do próprio bolso, quando quase ninguém anunciava no Facebook. Em 2020 fundou a TW Broker, operação que vendeu milhões em imóveis todos os anos. Em 2023 criou o Corretor Que Vende, treinando mais de três mil profissionais do mercado imobiliário. Hoje, lidera a W4D aplicando esse mesmo sistema comercial no Brasil e Estados Unidos, focado em performance de conversão, volume e previsibilidade.
            </p>
            <div className="mt-6 border-l-2 border-white/15 pl-4 max-w-[60ch]">
              <span aria-hidden className="block font-serif text-5xl leading-none text-white/25 -mb-2">&ldquo;</span>
              <p className="text-primary font-medium text-base md:text-lg leading-relaxed">
                No fim do dia o marketing é apenas o meio. A nossa única régua de sucesso é quanto a sua empresa vende com recorrência.
              </p>
            </div>
          </motion.div>

          {/* Carlos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.15 }}
            className="flex flex-col"
          >
            <LeaderPhoto
              src="/images/carlos.png"
              alt="Carlos Murayama"
              initials="CM"
            />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-primary leading-[1.1] mt-8 mb-2">
              Carlos Murayama
            </h2>
            <span className="font-mono text-secondary text-xs tracking-[0.18em] uppercase mb-5">
              Sócio e Head de Operação
            </span>
            {/* Year-chips — âncora visual scan-friendly, não substitui a prosa */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[11px] text-body tracking-wider">
                <span className="text-white/40">●</span> 2011 · Gestão
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[11px] text-body tracking-wider">
                <span className="text-white/40">●</span> 2019 · Tráfego
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] font-mono text-[11px] text-body tracking-wider">
                <span className="text-white/40">●</span> Hoje · W4D
              </span>
            </div>
            <p className="text-body text-base md:text-lg font-normal leading-[1.75] max-w-[60ch]">
              Carlos operou hostel e bar por oito anos a partir de 2011, sentindo na pele a gestão, a contratação e a pressão pelo faturamento. Em 2019 passou a se dedicar exclusivamente a tráfego pago e performance, com foco rigoroso em negócios locais. Em 2022 consolidou sua operação gerindo múltiplas contas em saúde e educação, com métricas de ROI e conversão direta como régua. Em 2024 aprofundou a esteira em lançamentos imobiliários. Hoje, lidera o time de operação da W4D, garantindo que o faturamento projetado chegue no resultado comercial.
            </p>
            <div className="mt-6 border-l-2 border-white/15 pl-4 max-w-[60ch]">
              <span aria-hidden className="block font-serif text-5xl leading-none text-white/25 -mb-2">&ldquo;</span>
              <p className="text-primary font-medium text-base md:text-lg leading-relaxed">
                Estratégias no papel não pagam contas. Meu trabalho é fazer a mídia colocar boas oportunidades na sua mesa todos os dias.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Métricas (Counters) — 4 cells, pulse dot inline na 4ª sinaliza "status ao vivo" */}
        <div className="w-full mt-24 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center md:text-left">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: index * 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex text-primary mb-3 items-baseline">
                <Counter to={metric.value} suffix={metric.suffix} isStatic={metric.isStatic} />
              </div>
              <span className="font-mono text-xs text-body tracking-[0.18em] uppercase mb-1.5">
                {metric.label}
              </span>
              <span className="text-secondary text-sm font-normal leading-snug">
                {metric.context}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Linha da equipe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-white/5 text-center"
        >
          <p className="text-body text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            A W4D opera com um núcleo de especialistas: gestores de tráfego, automação e IA, designers, web designers e editores de vídeo. Quem recebe o briefing é quem opera a conta. Não há franquia, não há repasse e não há camada intermediária entre o diagnóstico e a entrega.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
