'use client';

import { motion } from 'framer-motion';
import { Users, UserCheck, Zap, LineChart, PieChart, Target } from 'lucide-react';

const benefits = [
  {
    icon: <Users strokeWidth={1} className="w-10 h-10 text-primary mb-8" />,
    text: "Clientes novos entrando todos os dias"
  },
  {
    icon: <UserCheck strokeWidth={1} className="w-10 h-10 text-primary mb-8" />,
    text: "Contatos que já chegam com interesse real no que você vende"
  },
  {
    icon: <Zap strokeWidth={1} className="w-10 h-10 text-primary mb-8" />,
    text: "Automação que trabalha enquanto você dorme"
  },
  {
    icon: <LineChart strokeWidth={1} className="w-10 h-10 text-primary mb-8" />,
    text: "Funil claro do primeiro contato até a venda"
  },
  {
    icon: <PieChart strokeWidth={1} className="w-10 h-10 text-primary mb-8" />,
    text: "Relatórios em tempo real, sem achismo"
  },
  {
    icon: <Target strokeWidth={1} className="w-10 h-10 text-primary mb-8" />,
    text: "Estratégia personalizada para o seu mercado"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as any, stiffness: 60, damping: 25 }
  }
};

export default function Beneficios() {
  return (
    <section className="relative w-full py-section px-6 sm:px-12 lg:px-24 border-t border-white/5 bg-primary">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-6"
        >
          Resultados que importam
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-1px] text-primary text-center leading-[1.1] mb-32 tracking-tight"
        >
          O que muda no seu negócio<br />com a W4Digital
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24 w-full"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex flex-col items-start px-4 md:px-0"
            >
              {benefit.icon}
              <p className="text-2xl md:text-3xl text-body font-light leading-[1.7]">
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
