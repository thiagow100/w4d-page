'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from '@/components/MagneticButton';

type HoverDirection = 'top' | 'right' | 'bottom' | 'left' | null;

interface DirectionalCTAProps {
  href: string;
  children: React.ReactNode;
}

/**
 * DirectionalCTA — CTA primário da página com 2 efeitos combinados:
 *  1. Magnetic pull: o botão inteiro é puxado em direção ao cursor (campo 100px)
 *  2. Directional fill: ao hover, um vermelho mais claro entra DA direção onde o cursor entrou
 *
 * Reused entre Hero ("Solicitar apresentação") e Footer ("Começar a parceria") para
 * dar tratamento visual idêntico aos 2 CTAs de conversão primária da página.
 *
 * Acessibilidade: respeita prefers-reduced-motion (omite directional fill).
 * Mobile: MagneticButton já desativa abaixo de 768px.
 */
export default function DirectionalCTA({ href, children }: DirectionalCTAProps) {
  const [direction, setDirection] = useState<HoverDirection>(null);
  const prefersReducedMotion = useReducedMotion();

  const getDirection = (e: React.MouseEvent<HTMLAnchorElement>): HoverDirection => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const top = y;
    const bottom = rect.height - y;
    const left = x;
    const right = rect.width - x;
    const min = Math.min(top, bottom, left, right);
    if (min === top) return 'top';
    if (min === bottom) return 'bottom';
    if (min === left) return 'left';
    return 'right';
  };

  const slideFrom = (dir: HoverDirection) => {
    if (!dir) return { x: 0, y: 0 };
    if (dir === 'top') return { x: 0, y: '-100%' };
    if (dir === 'bottom') return { x: 0, y: '100%' };
    if (dir === 'left') return { x: '-100%', y: 0 };
    return { x: '100%', y: 0 };
  };

  return (
    <MagneticButton>
      <a
        href={href}
        onMouseEnter={(e) => setDirection(getDirection(e))}
        onMouseLeave={(e) => setDirection(getDirection(e))}
        className="group relative inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-primary bg-cta rounded-full active:scale-[0.98] glow-cta overflow-hidden isolate"
      >
        <AnimatePresence>
          {direction && !prefersReducedMotion && (
            <motion.span
              key={direction}
              aria-hidden
              initial={slideFrom(direction)}
              animate={{ x: 0, y: 0 }}
              exit={slideFrom(direction)}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as any }}
              className="absolute inset-0 bg-cta-hover pointer-events-none z-0"
            />
          )}
        </AnimatePresence>
        <span className="relative z-10">{children}</span>
        <span className="relative z-10 ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1">&#8594;</span>
      </a>
    </MagneticButton>
  );
}
