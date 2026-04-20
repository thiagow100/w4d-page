'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Nav() {
  const { scrollY } = useScroll();

  // Nav fica transparente no topo e ganha fundo de vidro ao scrollar
  // MotionValues passadas diretamente no style — Framer subscreve automaticamente
  const bgOpacity = useTransform(scrollY, [0, 150], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 150], [0, 0.12]);

  const backgroundColor = useTransform(bgOpacity, (v) => `rgba(23,23,23,${v})`);
  const borderBottomColor = useTransform(borderOpacity, (v) => `rgba(255,255,255,${v})`);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto"
    >
      <motion.div
        style={{
          backgroundColor,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor,
        }}
        className="w-full px-6 sm:px-12 lg:px-24 py-4 flex items-center justify-between gap-4"
      >
        {/* Logo */}
        <a href="#" aria-label="W4Digital — Voltar ao topo" className="shrink-0">
          <Image
            src="/images/logo-w4d-cropped.png"
            alt="W4Digital"
            width={736}
            height={139}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
        </a>

        {/* CTA */}
        <a
          href="#formulario"
          className="group inline-flex items-center justify-center shrink-0 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-primary bg-cta rounded-full hover:bg-cta-hover transition-colors duration-300 ease-out tracking-[-0.01em] whitespace-nowrap"
        >
          <span className="hidden sm:inline">Solicitar diagnóstico</span>
          <span className="sm:hidden">Diagnóstico</span>
          <span className="ml-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5">&#8594;</span>
        </a>
      </motion.div>
    </motion.header>
  );
}
