'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    title: "O que o time fecha muda o que anunciamos",
    body: "O que está chegando com perfil errado, qual objeção aparece com frequência, qual argumento está ajudando a fechar. Esse retorno vai direto para os ajustes de campanha. Seu time comercial não é receptor passivo do que o marketing entrega. É parte ativa do que faz a operação melhorar semana a semana. Essa troca funciona porque quem recebe o feedback do comercial já esteve do lado de quem fecha a venda. Não é empatia. É experiência."
  },
  {
    title: "Você decide. Nós executamos.",
    body: "Ao fechar cada período, os canais com retorno comprovado estão separados dos que não geraram resultado. A conversa deixa de ser uma recomendação da agência e passa a ser: esses são os números, onde você quer investir mais? Você toma a decisão com referência. Nós executamos."
  },
  {
    title: "Resultado abaixo do esperado? A conversa acontece antes do mês fechar.",
    body: "Não existe relatório no final do mês com resultado ruim e sem conversa prévia. Quando algo não está funcionando, você sabe na semana em que acontece, não depois que o investimento já foi. Esse é o padrão quando os dois lados têm o mesmo interesse no resultado."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
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
      <div className="max-w-3xl mx-auto flex flex-col items-center">

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-6"
        >
          Como funciona na prática
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary text-center leading-[1.1] mb-24"
        >
          Dois lados ativos. Um resultado para os dois.
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-20 w-full"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-5"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-primary leading-[1.25] tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-base md:text-lg text-body font-light leading-[1.8]">
                {benefit.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="mt-24 text-base md:text-lg text-secondary text-center leading-[1.8] font-light"
        >
          É assim que trabalhamos com quem está disposto a operar junto. O diagnóstico é o primeiro passo.
        </motion.p>

      </div>
    </section>
  );
}
