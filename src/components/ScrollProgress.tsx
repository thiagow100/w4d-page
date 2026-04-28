'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — barra 1px no topo, vermelho W4D, scaleX scroll-bound.
 * Spring suaviza o tracking pra não pular com o smooth-scroll Lenis.
 * z-[60] fica acima do Nav fixed (z-50) e abaixo do drawer mobile (z-[100]).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-px bg-cta z-[60] origin-left pointer-events-none"
    />
  );
}
