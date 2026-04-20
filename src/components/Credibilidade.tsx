'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Eyebrow from '@/components/Eyebrow';

const metrics = [
  { value: 20, suffix: "+", label: "anos vendendo", context: "Antes de ser agência, fomos o cliente", isStatic: false },
  { value: 11, suffix: "+", label: "anos no digital", context: "Tráfego pago com dinheiro próprio", isStatic: false },
  { value: 3000, suffix: "+", label: "alunos pelo mundo", context: "Método validado em escala", isStatic: false },
  { value: 0, suffix: "BR+EUA", label: "onde operamos", context: "Operação dos dois lados", isStatic: true },
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

  return <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-semibold text-primary tracking-[-0.06em]">{display}</span>;
}

function LeaderPhoto({ src, alt, initials }: { src: string, alt: string, initials: string }) {
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
          className="absolute inset-0 w-full h-full object-cover object-top opacity-95 hover:opacity-100 transition-opacity duration-700"
        />
      )}
    </div>
  );
}

// Timeline de marcos para bio scan-friendly
function BioTimeline({ items }: { items: { year: string, text: string }[] }) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4 items-start">
          <span className="font-mono text-cta text-xs tracking-wider shrink-0 mt-0.5 w-10">{item.year}</span>
          <p className="text-body text-base font-normal leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function Credibilidade() {
  return (
    <section className="relative w-full py-section overflow-hidden bg-secondary noise-overlay">
      {/* Fundo Gradiente */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-tertiary to-transparent z-0 opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">

        {/* Eyebrow */}
        <div className="flex justify-center mb-16">
          <Eyebrow>Quem está por trás do trabalho</Eyebrow>
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
              src="/images/thiago.png"
              alt="Thiago Weirich"
              initials="TW"
            />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-primary leading-[1.1] mt-8 mb-2">
              Thiago Weirich
            </h2>
            <span className="font-mono text-secondary text-[11px] tracking-[2px] uppercase mb-4">
              Fundador e Head of Performance
            </span>
            <BioTimeline items={[
              { year: "2005", text: "Iniciou em vendas, validando-se como corretor de imóveis em Santa Catarina no ano de 2011." },
              { year: "2015", text: "Aprendeu tráfego pago errando com dinheiro próprio antes de aplicar em clientes." },
              { year: "2020", text: "Criou a TW Broker para atender à demanda. Montou a operação do zero, vendendo milhões em imóveis todos os anos." },
              { year: "2023", text: "Criou o Corretor Que Vende, treinando mais de 3.000 profissionais do mercado imobiliário." },
              { year: "Hoje", text: "Lidera a W4Digital aplicando essa exata máquina de vendas em negócios no Brasil e EUA." },
            ]} />
            <p className="text-primary font-semibold text-base mt-6 leading-relaxed">
              "No fim do dia o marketing é apenas o meio. A nossa única régua de sucesso é quanto a sua empresa vende com recorrência."
            </p>
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
            <span className="font-mono text-secondary text-[11px] tracking-[2px] uppercase mb-4">
              Sócio e Head de Operação
            </span>
            <BioTimeline items={[
              { year: "2011", text: "Operou hostel e bar por 8 anos. Sentiu na pele a gestão, contratação e pressão pelo faturamento." },
              { year: "2019", text: "Iniciou atuação dedicada a tráfego pago e performance com foco rigoroso em negócios locais." },
              { year: "2022", text: "Consolidou sua operação gerindo múltiplas contas de nichos variados, com foco absoluto em métricas de ROI e conversão direta." },
              { year: "2024", text: "Expandiu sua esteira com aprofundamento estratégico focado em lançamentos imobiliários." },
              { year: "Hoje", text: "Lidera o time de operação da W4Digital, garantindo que o planejado chegue ao resultado combinado." },
            ]} />
            <p className="text-primary font-semibold text-base mt-6 leading-relaxed">
              "Estratégias no papel não pagam contas. Meu fardo é fazer a mídia colocar boas oportunidades na sua mesa todos os dias."
            </p>
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

        {/* Métricas (Counters) */}
        <div className="w-full mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: index * 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex text-primary mb-2 items-baseline">
                <Counter to={metric.value} suffix={metric.suffix} isStatic={metric.isStatic} />
              </div>
              <span className="font-mono text-[11px] text-secondary tracking-[2px] uppercase mb-1">
                {metric.label}
              </span>
              <span className="text-body text-xs font-normal">
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
            A W4Digital opera com um time reduzido de especialistas: gestores de tráfego, automação, IA e design. Quem recebe o briefing é quem opera a conta. Não há franquia, não há repasse e não há camada intermediária entre o diagnóstico e a entrega.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
