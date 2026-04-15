'use client';

import { motion } from 'framer-motion';

const painPoints = [
  {
    title: "Crescimento imprevisível",
    description: "Alguns meses vendem bem, outros não. Sem um sistema de aquisição estruturado, o faturamento oscila sem controle."
  },
  {
    title: "Investimento sem clareza de retorno",
    description: "Há verba em mídia paga, mas falta visibilidade sobre custo de aquisição, ROI por canal e qual campanha realmente gera receita."
  },
  {
    title: "Operação consumindo seu tempo estratégico",
    description: "Você deveria estar focado em decisões de negócio, não gerenciando campanhas, criativos e plataformas de anúncio."
  },
  {
    title: "Volume sem qualificação",
    description: "Chegam contatos, mas sua equipe desperdiça tempo com quem não tem perfil de compra. O problema não é gerar contato, é gerar o contato certo."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring" as any, stiffness: 60, damping: 25 }
  }
};

export default function Dores() {
  return (
    <section style={{ background: 'rgba(10,10,10,0.92)' }} id="dores" className="relative w-full py-32 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Lado Esquerdo - Textos */}
        <div className="md:w-1/3 flex flex-col justify-start">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any  }}
            className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-6"
          >
            O crescimento travou?
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1  }}
            className="text-4xl md:text-5xl font-extrabold tracking-[-1px] text-primary leading-[1.1]"
          >
            Sinais de que sua operação de marketing está falhando
          </motion.h2>
        </div>

        {/* Lado Direito - Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {painPoints.map((pain, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-black/60 backdrop-blur-xl p-8 rounded-xl border border-white/5 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <h3 className="text-xl font-bold text-primary mb-4">
                {pain.title}
              </h3>
              <p className="text-[#999999] leading-[1.7] font-light text-sm md:text-base">
                {pain.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
