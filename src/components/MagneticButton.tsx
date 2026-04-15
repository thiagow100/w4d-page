'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Regra bloqueante: Não executar tracking magnético em celulares
      if (window.innerWidth < 768) return;
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Pitágoras para a distância real entre o cursor e o âmago do botão
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Campo magnético de 100px ao redor do cursor
      if (distance < 100) {
         // Cap maxímo de repuxo (4px) exigido no prompt, proporcional à distância
         const pull = 4;
         const x = (distanceX / 100) * pull;
         const y = (distanceY / 100) * pull;
         setPosition({ x, y });
      } else {
         // O mouse soltou o "imã", a gravidade devolve pra posição (0,0) original
         setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring" as any, stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
