'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  /** Numerador/denominador estilo Obsidian/Flock (ex: "01" ou "02 / 05"). Renderizado antes do texto. */
  index?: string;
};

export default function Eyebrow({ children, className = '', accent = false, index }: EyebrowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
      className={`inline-flex items-center gap-2.5 font-mono text-xs md:text-sm tracking-[0.18em] uppercase whitespace-nowrap ${className}`}
    >
      {index && (
        <>
          <span className="text-cta font-bold">{index}</span>
          <span className="text-secondary" aria-hidden>&bull;</span>
        </>
      )}
      <span className={accent ? 'text-cta' : 'text-secondary'}>{children}</span>
    </motion.div>
  );
}
