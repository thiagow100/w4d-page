'use client';

import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Revela o nav fixo quando passar de 400px de scroll
    if (latest > 400) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      {/* HEADER ABSOLUTO NO TOPO (Some ao rolar a página) */}
      <header className="absolute top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 lg:px-24 py-8 flex items-center justify-between gap-4 pointer-events-auto">
        <a href="#" aria-label="W4D — Voltar ao topo" className="shrink-0">
          <Image
            src="/images/logo-w4d-only.png"
            alt="W4D"
            width={1182}
            height={348}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
        </a>
        <nav className="hidden md:flex items-center gap-2" aria-label="Navegação principal">
          <a href="#servicos" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Serviços</a>
          <a href="#metodo" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Método</a>
          <a href="#faq" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">FAQ</a>
        </nav>
        {/* Placeholder vazio apenas para manter a logo na esquerda e links centralizados/alinhados */}
        <div className="w-[140px] hidden md:block" aria-hidden></div>
      </header>

      {/* HEADER FIXO QUE DESCE DEPOIS DO HERO */}
      <motion.header
        initial={{ y: '-100%' }}
        animate={{ y: isScrolled ? '0%' : '-100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-auto bg-[#171717]/85 backdrop-blur-[20px] border-b border-white/10"
      >
        <div className="w-full px-6 sm:px-12 lg:px-24 py-3 flex items-center justify-between gap-4">
          <a href="#" aria-label="W4D — Voltar ao topo" className="shrink-0">
            <Image
              src="/images/logo-w4d-only.png"
              alt="W4D"
              width={1182}
              height={348}
              className="h-7 md:h-8 w-auto object-contain"
            />
          </a>
          
          <nav className="hidden md:flex items-center gap-2" aria-label="Navegação principal">
            <a href="#servicos" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Serviços</a>
            <a href="#metodo" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Método</a>
            <a href="#faq" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">FAQ</a>
          </nav>

          {/* CTA Fantasma / Contido - Só aparece na rolagem */}
          <a
            href="#formulario"
            className="group inline-flex items-center justify-center shrink-0 px-4 md:px-5 py-2 md:py-2 text-xs md:text-sm font-medium text-primary shadow-border-dark rounded-full hover:bg-white/[0.04] transition-all duration-200 ease-out whitespace-nowrap"
          >
            <span className="hidden sm:inline">Solicitar proposta</span>
            <span className="sm:hidden">Proposta</span>
            <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">&#8594;</span>
          </a>
        </div>
      </motion.header>
    </>
  );
}
