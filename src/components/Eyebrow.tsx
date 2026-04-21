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
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border font-mono text-xs tracking-[0.18em] uppercase whitespace-nowrap ${
        accent
          ? 'border-cta/30 bg-cta/[0.06] text-cta'
          : 'border-white/10 bg-white/[0.03] text-body'
      } ${className}`}
    >
      {index && (
        <>
          <span className={accent ? 'text-cta/60' : 'text-body/50'}>{index}</span>
          <span className={accent ? 'text-cta/30' : 'text-body/20'} aria-hidden>/</span>
        </>
      )}
      <span>{children}</span>
    </motion.span>
  );
}
