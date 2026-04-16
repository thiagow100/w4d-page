'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

const cards = [
  {
    title: "Previsibilidade que vem da estrutura",
    description: "Crescimento previsível não vem de sorte ou indicação. Vem de canais ativos rodando o ano todo, com volume e custo previstos. A estrutura entra em pé. Você sabe o que esperar do mês."
  },
  {
    title: "Cada centavo investido, visível",
    description: "Você vê qual canal trouxe qual cliente. Qual campanha pagou o próprio custo. Qual anúncio gerou receita. Sem chute, sem 'achismo', sem relatório bonito. Decisão de investimento embasada em dados concretos."
  },
  {
    title: "Seu tempo de volta no negócio",
    description: "Você não escolhe anúncio, ajusta público nem cuida de plataforma. Quem opera é quem entende disso há 11 anos. Você volta a tomar decisões de negócio, fechar vendas e crescer. Marketing operando, do jeito que deve ser."
  },
  {
    title: "Time comercial só com cliente real",
    description: "O contato que chega ao seu time não veio do nada. Veio de quem estava buscando o que você vende, no canal certo, com a mensagem certa. Seu time comercial sabe de onde veio, o que viu e por que chegou. Menos tempo explicando. Mais tempo fechando."
  }
];

const platforms = ['Google', 'Instagram', 'Facebook', 'YouTube', 'TikTok', 'LinkedIn', 'WhatsApp'];

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
          A resolução de cada problema
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1  }}
          className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-[-1px] text-primary leading-[1.1] mb-8"
        >
          Cada problema acima tem resolução estruturada.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2  }}
          className="text-lg md:text-xl text-body font-light leading-[1.7] max-w-2xl mb-20"
        >
          Aqui na W4Digital, cada problema que você reconheceu tem uma resolução específica. Não é pacote pronto. É estrutura completa, construída para o seu ciclo de venda.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col text-left p-8 bg-tertiary backdrop-blur-xl border border-white/5 rounded-xl hover:border-white/15 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <h3 className="text-xl font-bold text-primary mb-4">
                {card.title}
              </h3>
              <p className="text-sm md:text-base text-body leading-[1.7] font-light flex-1">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Faixa de Plataformas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-full flex flex-col items-center gap-6 py-10 mb-20 border-t border-b border-white/5"
        >
          <span className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase">
            Operamos onde seu cliente decide
          </span>
          <div className="flex flex-wrap justify-center gap-8">
            {platforms.map((platform) => (
              <span key={platform} className="text-sm text-secondary font-medium">
                {platform}
              </span>
            ))}
          </div>
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
              Solicitar diagnóstico <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
