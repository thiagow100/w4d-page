'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Eyebrow from '@/components/Eyebrow';

const metrics = [
  { value: 20, suffix: "+", label: "anos vendendo", context: "Antes de ser agência, fomos o cliente", isStatic: false },
  { value: 11, suffix: "+", label: "anos no digital", context: "Tráfego pago com dinheiro próprio", isStatic: false },
  { value: 3000, suffix: "+", label: "alunos do método", context: "Profissionais treinados no método W4D", isStatic: false },
  { value: 0, suffix: "BR · USA", label: "onde operamos", context: "Operação ativa no Brasil e nos EUA", isStatic: true },
];

const brands = [
  { name: 'iFood', logo: '/logos/ifood.svg' },
  { name: 'Santander', logo: '/logos/santander.svg' },
  { name: 'Cyrela', logo: '/logos/cyrela.svg' },
  { name: 'CBA', logo: '/logos/cba.svg' },
  { name: 'A6 Inc', logo: '/logos/a6inc.svg' },
  { name: 'Sidesc', logo: '/logos/sidesc.svg' },
];

function Counter({ from = 0, to, suffix, duration = 2, isStatic = false }: { from?: number, to: number, suffix: string, duration?: number, isStatic?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState<string>(() =>
    isStatic ? suffix : `${from}${suffix}`
  );

  useEffect(() => {
    if (isStatic) return;
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1] as any,
      onUpdate(value) {
        const hasFloat = to % 1 !== 0;
        setDisplay((hasFloat ? value.toFixed(1).replace('.', ',') : Math.round(value)) + suffix);
      }
    });
    return () => controls.stop();
  }, [inView, from, to, duration, suffix, isStatic]);

  const sizeClass = "text-4xl md:text-5xl";

  return <span ref={ref} className={`${sizeClass} font-semibold text-primary tracking-[-0.04em]`}>{display}</span>;
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
    <section id="quem-somos" className="relative w-full py-20 md:py-section overflow-hidden bg-secondary noise-overlay scroll-mt-24">
      {/* Fundo Gradiente */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-tertiary to-transparent z-0 opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">

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
              imgClassName="object-cover object-top scale-[1.1] translate-y-1"
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

        {/* Marcas - Marquee horizontal infinito */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mt-24 flex flex-col items-center w-full"
        >
          <Eyebrow className="mb-10">Com quem já trabalhamos</Eyebrow>

          <div className="marquee-mask marquee-pause w-full overflow-hidden">
            <div className="marquee-track gap-16 md:gap-24 py-2">
              {[...brands, ...brands].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="shrink-0 flex items-center justify-center"
                  aria-hidden={i >= brands.length}
                >
                  <Image
                    src={brand.logo}
                    alt={i < brands.length ? brand.name : ''}
                    width={140}
                    height={48}
                    className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-100 brightness-0 invert transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

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
