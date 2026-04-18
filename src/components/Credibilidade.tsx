'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

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
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isStatic) {
      if (nodeRef.current) nodeRef.current.textContent = suffix;
      return;
    }
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1] as any,
        onUpdate(value) {
          if (nodeRef.current) {
            const hasFloat = to % 1 !== 0;
            nodeRef.current.textContent = (hasFloat ? value.toFixed(1).replace('.', ',') : Math.round(value)) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, duration, suffix, isStatic]);

  return <span ref={nodeRef} className="text-5xl md:text-6xl lg:text-7xl font-semibold text-primary tracking-tighter" />;
}

function LeaderPhoto({ src, alt, initials }: { src: string, alt: string, initials: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full relative aspect-[4/5] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-2xl border border-white/5 bg-secondary">
      <motion.div
        initial={{ height: "100%" }}
        whileInView={{ height: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 bg-cta z-20 origin-top"
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {hasError ? (
          <span className="text-5xl font-semibold text-secondary/40 tracking-tight">{initials}</span>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover object-top grayscale md:grayscale hover:grayscale-0 opacity-90 hover:opacity-100 brightness-110 hover:brightness-100 transition-all duration-700"
          />
        )}
      </div>
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
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="block font-mono text-secondary text-[11px] tracking-[3px] uppercase mb-16 text-center"
        >
          Quem está por trás do trabalho
        </motion.span>

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
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary leading-[1.1] mt-8 mb-2">
              Thiago Weirich
            </h2>
            <span className="font-mono text-secondary text-[11px] tracking-[2px] uppercase mb-4">
              Fundador e Head of Performance
            </span>
            <BioTimeline items={[
              { year: "2005", text: "Começou a vender. Corretor de imóveis em Santa Catarina desde 2011." },
              { year: "2015", text: "Aprendeu tráfego pago operando com dinheiro próprio, antes de recomendar para qualquer cliente." },
              { year: "2020", text: "Criou a TW Broker para absorver a demanda. Montou processo comercial, folha de pagamento, meta e resultado." },
              { year: "2023", text: "3.000+ profissionais formados pelo programa Corretor Que Vende. Fundou a W4Digital." },
            ]} />
            <p className="text-primary font-semibold text-base mt-6 leading-relaxed">
              A régua é a mesma de empresa própria: receita no caixa, todo mês.
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
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary leading-[1.1] mt-8 mb-2">
              Carlos Murayama
            </h2>
            <span className="font-mono text-secondary text-[11px] tracking-[2px] uppercase mb-4">
              Sócio e Head de Operação
            </span>
            <BioTimeline items={[
              { year: "8 anos", text: "Operou hostel e bar: contratação, gestão de equipe, fluxo de caixa e resultado para entregar todo mês." },
              { year: "7 anos", text: "Atua com tráfego pago e performance para negócios locais." },
              { year: "2 anos", text: "Expandiu para lançamentos imobiliários. Entende o que está em jogo quando uma campanha não entrega." },
              { year: "Hoje", text: "Lidera a equipe de mídia. Garante que o planejado na proposta é o que chega ao resultado." },
            ]} />
            <p className="text-primary font-semibold text-base mt-6 leading-relaxed">
              Já foi o dono de empresa esperando o resultado. Sabe o peso.
            </p>
          </motion.div>

        </div>

        {/* Marcas - Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mt-24 flex flex-col items-center"
        >
          <span className="font-mono text-secondary text-[11px] tracking-[3px] uppercase mb-10">
            Com quem já trabalhamos
          </span>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 w-full max-w-4xl">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            ))}
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
