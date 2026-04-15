'use client';

import { motion } from 'framer-motion';
import { Globe, Filter, Bot, BarChart } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

const pillars = [
  {
    icon: <Globe strokeWidth={1} className="w-10 h-10 text-primary mb-6" />,
    title: "Tráfego Multicanal",
    description: "Google, Meta, YouTube, TikTok, LinkedIn. Seus anúncios nos canais certos, para o público certo, no momento certo."
  },
  {
    icon: <Filter strokeWidth={1} className="w-10 h-10 text-primary mb-6" />,
    title: "Funil de Vendas",
    description: "Um caminho estruturado que transforma desconhecidos em compradores reais."
  },
  {
    icon: <Bot strokeWidth={1} className="w-10 h-10 text-primary mb-6" />,
    title: "Automação com IA",
    description: "Respostas instantâneas via WhatsApp, e-mail e CRM integrado. Seu negócio atendendo 24/7 sem depender de você."
  },
  {
    icon: <BarChart strokeWidth={1} className="w-10 h-10 text-primary mb-6" />,
    title: "Otimização Contínua",
    description: "Monitoramento diário, ajustes em tempo real e relatórios claros. Sem achismo, só dados."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as any, stiffness: 60, damping: 25 }
  }
};

export default function Solucao() {
  return (
    <section className="relative w-full py-section px-6 sm:px-12 lg:px-24 border-t border-b border-white/5 bg-primary">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Header da Seção */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any  }}
          className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-4"
        >
          A máquina de captação
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1  }}
          className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-[-1px] text-primary leading-[1.1] mb-8"
        >
          Um sistema completo para sua<br />empresa vender todos os dias
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2  }}
          className="text-lg md:text-xl text-body font-light leading-[1.7] max-w-2xl mb-20 "
        >
          Não é só rodar anúncio. É um funil inteiro que funciona 24 horas: da primeira impressão até o fechamento.
        </motion.p>

        {/* Pilares */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {pillars.map((pillar, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="flex flex-col items-center text-center p-8 bg-tertiary backdrop-blur-xl border border-white/5 rounded-xl hover:border-white/15 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              {pillar.icon}
              <h3 className="text-xl font-bold text-primary mb-4">
                {pillar.title}
              </h3>
              <p className="text-sm md:text-base text-body leading-[1.7] font-light">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
        >
          <MagneticButton>
            <a 
              href="#formulario"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-primary transition-all duration-300 ease-out bg-cta rounded-full hover:bg-cta-hover hover:-translate-y-1 shadow-xl shadow-cta/20"
            >
              Quero minha máquina de vendas <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
