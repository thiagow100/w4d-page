'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const phases = [
  { word: "WORK", description: "Antes de ativar qualquer anúncio, mapeamos o negócio com você: modelo de precificação, ciclo de venda e objeções reais do seu cliente. Você compartilha o histórico comercial e o acesso às plataformas. Nós identificamos onde o marketing pode entrar para ampliar o que já funciona na sua operação. O que sai dessa fase é um diagnóstico acionável, não uma apresentação para aprovar em reunião." },
  { word: "WAY",  description: "Com o diagnóstico em mãos, construímos a estrutura completa antes de qualquer investimento ir ao ar. Posicionamento, mensagens, páginas e critérios de qualificação, tudo baseado no que aprendemos sobre o seu ciclo de venda. Você revisa e valida cada decisão de posicionamento. Nada é ativado enquanto não reflete o que você conhece do seu cliente." },
  { word: "WIN",  description: "Com a estrutura ativa, os anúncios entram no ar e os contatos passam a chegar ao processo de qualificação. Aqui na W4Digital, o acompanhamento é diário: o que está gerando resultado continua, o que não está é ajustado antes de o desperdício se acumular. Do seu lado, o time comercial entra em ação e registra o que funciona no fechamento. Essa troca de informação entre operação e comercial é o que mantém a operação se ajustando." },
  { word: "WEALTH", description: "Quando os primeiros ciclos confirmam o que funciona, o foco deixa de ser testar e passa a ser ampliar. O custo para adquirir um cliente começa a se tornar conhecido, e as decisões de onde investir mais passam a ter base no que já funcionou, não em suposição. Aqui na W4Digital, expandimos a operação para novos canais e públicos com base no que foi validado, não com base em tendência de plataforma. Você toma decisões de investimento com referência concreta." }
];

function PhaseItem({ 
  phase, 
  index, 
  scrollYProgress 
}: { 
  phase: { word: string, description: string }, 
  index: number, 
  scrollYProgress: MotionValue<number> 
}) {
  // Com 4 blocos de 50vh, o container todo tem ~200vh reais de altura.
  // Vamos derivar as posições de trigger baseadas no index da palavra.
  // A linha vermelha viaja 0 a 1. Cada bloco é ~0.25 do progresso.
  const startLine = index * 0.23 + 0.1; 
  const turnOnLine = startLine + 0.05; // 0.05 é o tiro rápido (RÁPIDA 0.15s)
  
  // Word Animation (0.1 -> 1.0)
  const wordOpacity = useTransform(
    scrollYProgress, 
    [startLine, turnOnLine], 
    [0.10, 1.0]
  );
  
  // Color Animation (#050505 -> #FFFFFF)
  const wordColor = useTransform(
    scrollYProgress, 
    [startLine, turnOnLine], 
    ['#050505', '#FFFFFF']
  );

  // Text Animation (DEPOIS que a palavra acende)
  const descStart = turnOnLine + 0.02; // delay de 0.2s visual
  const descEnd = descStart + 0.05;
  
  const descOpacity = useTransform(
    scrollYProgress, 
    [descStart, descEnd], 
    [0, 1]
  );
  
  const descY = useTransform(
    scrollYProgress, 
    [descStart, descEnd], 
    [20, 0]
  );

  return (
    <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between h-[50vh] py-10">
      
      {/* O "W" gigante alternando esquerda/direita */}
      <div className={`w-full md:w-1/2 flex pl-24 md:pl-0 ${index % 2 === 0 ? 'md:justify-end md:pr-20' : 'md:order-2 md:justify-start md:pl-20'}`}>
        <motion.h3 
          style={{ opacity: wordOpacity, color: wordColor }}
          className="text-[clamp(48px,10vw,120px)] font-semibold tracking-[-4px]"
        >
          {phase.word}.
        </motion.h3>
      </div>

      {/* Texto Descritivo */}
      <div className={`w-full md:w-1/2 flex pl-24 md:pl-0 mt-8 md:mt-0 ${index % 2 === 0 ? 'md:order-2 md:justify-start md:pl-20' : 'md:justify-end md:pr-20'}`}>
        <motion.p 
          style={{ opacity: descOpacity, y: descY }}
          className={`text-xl md:text-3xl text-body leading-[1.7] font-light  max-w-md ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}
        >
          {phase.description}
        </motion.p>
      </div>
      
    </div>
  );
}

export default function MetodoW4() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // O offset "start center" mapeia globalmente o progresso dessa timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative w-full py-section px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Headers */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[#565656] text-[13px] font-semibold tracking-[3px] uppercase mb-6 block"
          >
            Como trabalhamos
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold tracking-[-1px] text-primary leading-[1.1] mb-6"
          >
            Método W4: a ordem em que construímos o seu marketing.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-cta text-sm md:text-lg tracking-widest uppercase font-bold"
          >
            4 fases. Na sequência em que funcionam.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full mx-auto flex flex-col">
          
          {/* Linha de Fundo Guiada */}
          <div className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-0 rounded-full" />
          
          {/* Linha de Progresso Vermelha Interativa */}
          <motion.div 
            style={{ scaleY: pathLength }}
            className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-cta z-10 origin-top rounded-full shadow-[0_0_15px_#EC0000]"
          />

          {/* Fases Rendering */}
          {phases.map((phase, index) => (
            <PhaseItem 
              key={index} 
              phase={phase} 
              index={index} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
