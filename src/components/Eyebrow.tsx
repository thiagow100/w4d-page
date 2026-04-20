'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  accent?: boolean;
};

export default function Eyebrow({ children, className = '', accent = false }: EyebrowProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
      className={`inline-block px-4 py-1.5 rounded-full border font-mono text-[11px] tracking-[2px] uppercase whitespace-nowrap ${
        accent
          ? 'border-cta/30 bg-cta/[0.06] text-cta'
          : 'border-white/10 bg-white/[0.03] text-body'
      } ${className}`}
    >
      {children}
    </motion.span>
  );
}
