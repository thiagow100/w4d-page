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
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor,
        }}
        className="w-full px-6 sm:px-12 lg:px-24 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <a href="#" aria-label="W4Digital -- Voltar ao topo">
          <Image
            src="/images/W4D MARCA-16.png"
            alt="W4Digital"
            width={200}
            height={56}
            className="h-12 md:h-14 w-auto object-contain logo-blend"
            priority
          />
        </a>

        {/* CTA Direito */}
        <a
          href="#formulario"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-primary border border-white/10 hover:border-cta hover:text-cta transition-all duration-300 ease-out px-3 py-2 md:px-5 md:py-2.5 rounded-full"
        >
          <span className="hidden sm:inline">Solicitar diagnóstico</span>
          <span className="sm:hidden">Diagnóstico</span>
          <span>&#8594;</span>
        </a>
      </motion.div>
    </motion.header>
  );
}
