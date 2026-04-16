'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const metrics = [
  { value: 20, suffix: "+", label: "anos vendendo", isStatic: false },
  { value: 11, suffix: "+", label: "anos no digital", isStatic: false },
  { value: 3000, suffix: "+", label: "alunos pelo mundo", isStatic: false },
  { value: 0, suffix: "BR+EUA", label: "onde operamos", isStatic: true },
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

export default function Credibilidade() {
  return (
    <section className="relative w-full py-section overflow-hidden bg-secondary">
      {/* Fundo Gradiente */}
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
            {/* Imagem */}
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
              Quem está por trás do trabalho
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-semibold tracking-tight text-primary leading-[1.1] mb-8"
            >
              Thiago Weirich
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-5 text-body leading-[1.75] font-light text-base md:text-lg max-w-xl"
            >
              <p>
                Por mais de uma década vendi imóvel em Santa Catarina, presencialmente, com ciclos longos e objeções reais. Aprendi o que faz um cliente decidir, o que faz ele sair pela porta sem assinar, e o que acontece com um time comercial que não tem fluxo de cliente qualificado chegando. Nessa época, meu marketing era panfleto e placa.
              </p>
              <p>
                Em 2015 precisei escalar sem estar presente em cada conversa. Aprendi performance digital operando com dinheiro próprio, antes de recomendar qualquer coisa para alguém. Funcionou tão bem que em 2020 o problema mudou de lado: havia mais demanda do que time para atender. Criei a imobiliária TW Broker para absorver o volume e montei o time comercial do zero, com processo de atendimento e conversão. Não como experimento. Como necessidade de quem tem empresa para pagar e meta para bater.
              </p>
              <p>
                Em 2023 criei o programa Corretor Que Vende, onde mais de 3.000 profissionais aprenderam a unir operação comercial com marketing digital. Não como teoria. Como método que já estava funcionando em empresa própria antes de virar conteúdo. No mesmo ano, abri a W4Digital para levar essa estrutura para outros negócios. Em 2024 me mudei para os Estados Unidos para operar com acesso direto ao mercado onde as plataformas de anúncio são desenvolvidas.
              </p>
              <p>
                Aqui na W4Digital, a régua de resultado é a mesma que usei em empresa própria: venda fechada, não relatório de clique. Quem opera entende o que está em jogo quando o time comercial abre o mês sem agenda.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Nota Pessoal Assinada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 }}
          className="mt-20 border-l-2 border-cta pl-8 max-w-3xl"
        >
          <p className="text-body text-base md:text-lg leading-[1.75] font-light italic">
            "Sei o que é investir em marketing e olhar para o calendário esperando o mês virar. Não como observador. Como dono de empresa com time para pagar e cliente para fechar. Construí a W4Digital para ser o que eu precisava em 2015: uma operação que responde pela mesma régua que o empresário usa. Resultado é receita, não clique. E quando o resultado não acontece, a conversa precisa ser honesta antes do mês acabar."
          </p>
          <div className="mt-6">
            <p className="text-primary font-semibold text-sm tracking-wide">Thiago Weirich</p>
            <p className="text-[#565656] text-xs tracking-widest uppercase mt-1">Criador e Head of Performance, W4Digital</p>
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
            A W4Digital opera com um time sênior reduzido e sem estrutura de franquia. Quem recebe o briefing é quem opera a conta. Não há camadas de repasse.
          </p>
        </motion.div>

        {/* Redes Sociais */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.6 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <span className="text-[#565656] text-[11px] font-semibold tracking-[3px] uppercase">Sobre o fundador</span>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/thiagoweirich/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#565656] hover:text-primary transition-colors duration-300 text-sm"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/thiagoweirich/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#565656] hover:text-primary transition-colors duration-300 text-sm"
            >
              <Instagram size={16} />
              <span>Instagram</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
