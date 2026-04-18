'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const metrics = [
  { value: 20, suffix: "+", label: "anos vendendo", isStatic: false },
  { value: 11, suffix: "+", label: "anos no digital", isStatic: false },
  { value: 3000, suffix: "+", label: "alunos pelo mundo", isStatic: false },
  { value: 0, suffix: "BR+EUA", label: "onde operamos", isStatic: true },
];

const brands = ["iFood", "Santander", "Cyrela", "CBA Empreendimentos", "A6 Inc", "Sidesc"];

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
            className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
          />
        )}
      </div>
    </div>
  );
}

export default function Credibilidade() {
  return (
    <section className="relative w-full py-section overflow-hidden bg-secondary">
      {/* Fundo Gradiente */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-tertiary to-transparent z-0 opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="block text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-16 text-center"
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
              src="/images/thiago.jpeg"
              alt="Thiago Weirich"
              initials="TW"
            />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary leading-[1.1] mt-8 mb-2">
              Thiago Weirich
            </h2>
            <span className="text-[#565656] text-xs font-semibold tracking-[2px] uppercase mb-6">
              Fundador e Head of Performance
            </span>
            <div className="text-body leading-[1.75] font-light text-base max-w-xl">
              <p>
                Thiago começou a vender em 2005 e virou corretor de imóveis em Santa Catarina em 2011. Em 2015, aprendeu tráfego pago operando com dinheiro próprio, antes de recomendar qualquer estratégia para qualquer cliente. O marketing gerou tanta demanda que em 2020 o problema mudou de lado: havia mais oportunidade do que time para atender. Criou a TW Broker para absorver o volume, montou o processo comercial do zero e operou empresa com folha de pagamento, meta e resultado para entregar. Desde 2023, mais de 3.000 profissionais passaram pelo programa Corretor Que Vende para aprender o mesmo processo. No mesmo ano, fundou a W4Digital para levar essa operação a outros negócios. A régua é a mesma de empresa própria: receita no caixa, todo mês.
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
              src="/images/carlos.jpeg"
              alt="Carlos Murayama"
              initials="CM"
            />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary leading-[1.1] mt-8 mb-2">
              Carlos Murayama
            </h2>
            <span className="text-[#565656] text-xs font-semibold tracking-[2px] uppercase mb-6">
              Sócio e Head de Operação
            </span>
            <div className="text-body leading-[1.75] font-light text-base max-w-xl">
              <p>
                Antes de trabalhar com marketing digital, Carlos operou um hostel e bar por oito anos: contratação, gestão de equipe, fluxo de caixa e resultado para entregar todo mês. Há sete anos atua com tráfego pago e performance para negócios locais e, nos últimos dois anos, expandiu para lançamentos imobiliários. Entende o que está em jogo quando uma campanha não entrega: já foi o dono de empresa esperando o resultado. Na W4Digital é Sócio e Head de Operação: lidera a equipe de mídia e garante que o que foi planejado na proposta é o que chega ao resultado do cliente.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Marcas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mt-24 flex flex-col items-center"
        >
          <span className="text-[#565656] text-[11px] font-semibold tracking-[3px] uppercase mb-8">
            Com quem já trabalhamos
          </span>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
            {brands.map((brand, index) => (
              <span key={brand} className="flex items-center text-secondary text-sm font-light tracking-wide">
                {brand}
                {index < brands.length - 1 && (
                  <span className="ml-3 text-white/10">·</span>
                )}
              </span>
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
              <span className="text-sm md:text-base text-secondary tracking-wide uppercase font-semibold">
                {metric.label}
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
          <p className="text-body text-lg max-w-3xl mx-auto font-light leading-relaxed">
            A W4Digital opera com um time reduzido de especialistas: gestores de tráfego, automação, IA e design. Quem recebe o briefing é quem opera a conta. Não há franquia, não há repasse e não há camada intermediária entre o diagnóstico e a entrega.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
