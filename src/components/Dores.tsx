'use client';

import { motion } from 'framer-motion';

const painPoints = [
  {
    title: "Mês bom, mês ruim, sem padrão",
    description: "Em alguns meses a empresa vende bem. Em outros, o time comercial espera o telefone tocar. Crescimento que depende da sorte não é crescimento. É ciclo."
  },
  {
    title: "Anúncio rodando, retorno invisível",
    description: "Você investe em anúncios, mas qual canal está trazendo cliente de verdade? Qual campanha está pagando o que custou? Sem rastreamento real, cada decisão de investimento é chute."
  },
  {
    title: "Você virou o gestor de marketing da sua própria empresa",
    description: "Você deveria estar focado em decisões de negócio, não escolhendo anúncios, ajustando públicos e cuidando de plataformas. Você contratou pra resolver, não pra virar gerente."
  },
  {
    title: "Contato chegando, ninguém fechando",
    description: "Chegam contatos, mas seu time comercial gasta tempo com quem nunca vai comprar. O problema não é falta de gente entrando. É que ninguém filtrou quem tem perfil pra comprar."
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
    <section id="dores" className="relative w-full py-section px-6 sm:px-12 lg:px-24 bg-secondary">
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
            className="text-4xl md:text-5xl font-semibold tracking-[-1px] text-primary leading-[1.1]"
          >
            Reconhece algum destes no seu negócio?
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
              className="bg-tertiary backdrop-blur-xl p-8 rounded-xl border border-white/5 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col"
            >
              <h3 className="text-xl font-bold text-primary mb-4">
                {pain.title}
              </h3>
              <p className="text-body leading-[1.7] font-light text-sm md:text-base flex-1">
                {pain.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
