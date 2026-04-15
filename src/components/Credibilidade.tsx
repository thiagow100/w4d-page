'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const metrics = [
  { value: 1.5, suffix: " bi+", label: "em vendas geradas" },
  { value: 6, suffix: "M+", label: "em mídia gerenciada" },
  { value: 3000, suffix: "+", label: "profissionais treinados" },
  { value: 20, suffix: "+", label: "anos em vendas" }
];

function Counter({ from = 0, to, suffix, duration = 2 }: { from?: number, to: number, suffix: string, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
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
  }, [from, to, inView, duration, suffix]);

  return <span ref={nodeRef} className="text-5xl md:text-6xl lg:text-7xl font-semibold text-primary tracking-tighter" />;
}

export default function Credibilidade() {
  return (
    <section className="relative w-full py-section overflow-hidden bg-secondary">
      {/* Fundo Gradiente para dark red/tertiary sutil */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-tertiary to-transparent z-0 opacity-80" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          {/* Lado Esquerdo - Foto (Reveal Effect) */}
          <div className="w-full md:w-5/12 relative aspect-[4/5] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-2xl border border-white/5 bg-secondary">
            {/* Cortina usando a cor Vermelho CTA */}
            <motion.div 
              initial={{ height: "100%" }}
              whileInView={{ height: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 bg-cta z-20 origin-top"
            />
            {/* Imagem Placeholder */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <span className="text-secondary mb-2 font-mono text-xs tracking-widest">[ thiago.png ]</span>
            <img 
                src="/images/thiago.jpeg" 
                alt="Thiago Weirich"
                className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
              />
            </div>
          </div>

          {/* Lado Direito - Bio */}
          <div className="w-full md:w-7/12 flex flex-col justify-start">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-4"
            >
              Quem está por trás da estratégia
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-semibold tracking-[-1px] text-primary leading-[1.1] mb-8 tracking-tight"
            >
              Thiago Weirich
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-body leading-[1.7] font-light mb-8 max-w-xl "
            >
              20 anos de experiência em vendas presenciais, sendo 14 no mercado imobiliário de Santa Catarina. 
              Mais de 10 anos em mídia paga, construindo funis e automações para empresas no Brasil e no exterior. 
              Criador do ecossistema Corretor Que Vende, com mais de 3.000 profissionais treinados em todo o país.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-primary leading-relaxed font-medium"
            >
              A W4Digital nasceu dessa trajetória. 20 anos vendendo na prática, convertidos em uma máquina de vendas digital.
            </motion.p>
          </div>
        </div>

        {/* Métricas (Counters) */}
        <div className="w-full mt-32 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: index * 0.1  }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex text-primary mb-2 items-baseline">
                {metric.suffix.includes(" bi+") || metric.suffix.includes("M+") ? <span className="text-3xl font-bold mr-1">R$</span> : null}
                <Counter to={metric.value} suffix={metric.suffix} />
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.5  }}
          className="mt-32 pt-12 border-t border-white/5 text-center"
        >
          <p className="text-body text-lg max-w-3xl mx-auto font-light leading-relaxed">
            A W4Digital conta com um time de especialistas em mídia paga, automação, funis e inteligência artificial, 
            operando diariamente na criação, otimização e escala de campanhas.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
