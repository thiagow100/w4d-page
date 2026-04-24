'use client';

import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Lock body scroll enquanto o drawer estiver aberto
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Escape fecha o drawer
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);
  const openMobile = () => setIsMobileOpen(true);

  return (
    <>
      {/* HEADER ABSOLUTO NO TOPO (Some ao rolar a página) */}
      <header className="absolute top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 lg:px-24 py-8 flex items-center justify-between gap-4 pointer-events-auto">
        <a href="#" aria-label="Voltar ao topo" className="shrink-0">
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
          <a href="#metodo" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Método W4D</a>
          <a href="#quem-somos" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Quem somos</a>
          <a href="#faq" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">FAQ</a>
        </nav>
        {/* Hamburger mobile — visível só no mobile, substitui o placeholder desktop */}
        <button
          type="button"
          onClick={openMobile}
          aria-label="Abrir menu"
          aria-expanded={isMobileOpen}
          className="md:hidden w-10 h-10 flex items-center justify-center text-primary hover:opacity-80 transition-opacity"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
        {/* Placeholder desktop: mantém a logo alinhada à esquerda com os links centrados */}
        <div className="w-[140px] hidden md:block" aria-hidden></div>
      </header>

      {/* HEADER FIXO QUE DESCE DEPOIS DO HERO */}
      <motion.header
        initial={{ y: '-100%' }}
        animate={{ y: isScrolled ? '0%' : '-100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-auto bg-primary/85 backdrop-blur-[20px] border-b border-white/10"
      >
        <div className="w-full px-6 sm:px-12 lg:px-24 py-3 flex items-center justify-between gap-4">
          <a href="#" aria-label="Voltar ao topo" className="shrink-0">
            <Image
              src="/images/logo-w4d-only.png"
              alt="W4D"
              width={1182}
              height={348}
              className="h-7 md:h-8 w-auto object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-2" aria-label="Navegação principal">
            <a href="#metodo" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Método W4D</a>
            <a href="#quem-somos" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">Quem somos</a>
            <a href="#faq" className="px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors duration-200">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Hamburger no sticky, antes do CTA, só mobile */}
            <button
              type="button"
              onClick={openMobile}
              aria-label="Abrir menu"
              aria-expanded={isMobileOpen}
              className="md:hidden w-9 h-9 flex items-center justify-center text-primary hover:opacity-80 transition-opacity"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            <a
              href="#formulario"
              className="group inline-flex items-center justify-center shrink-0 px-4 md:px-5 py-2 md:py-2 text-xs md:text-sm font-medium text-primary shadow-border-dark rounded-full hover:bg-white/[0.04] transition-all duration-200 ease-out whitespace-nowrap"
            >
              Falar com a W4D
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">&#8594;</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* DRAWER MOBILE — overlay full-screen */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as any }}
            className="md:hidden fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex flex-col"
          >
            {/* Top bar: logo + close */}
            <div className="w-full px-6 py-8 flex items-center justify-between shrink-0">
              <a href="#" onClick={closeMobile} aria-label="Voltar ao topo" className="shrink-0">
                <Image
                  src="/images/logo-w4d-only.png"
                  alt="W4D"
                  width={1182}
                  height={348}
                  className="h-8 w-auto object-contain"
                />
              </a>
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Fechar menu"
                className="w-10 h-10 flex items-center justify-center text-primary hover:opacity-80 transition-opacity"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Links centralizados + CTA */}
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
              className="flex-1 flex flex-col items-center justify-center gap-8 px-6"
              aria-label="Navegação mobile"
            >
              <a
                href="#metodo"
                onClick={closeMobile}
                className="text-3xl font-semibold tracking-[-0.03em] text-primary hover:text-cta transition-colors duration-200"
              >
                Método W4D
              </a>
              <a
                href="#quem-somos"
                onClick={closeMobile}
                className="text-3xl font-semibold tracking-[-0.03em] text-primary hover:text-cta transition-colors duration-200"
              >
                Quem somos
              </a>
              <a
                href="#faq"
                onClick={closeMobile}
                className="text-3xl font-semibold tracking-[-0.03em] text-primary hover:text-cta transition-colors duration-200"
              >
                FAQ
              </a>

              <div aria-hidden className="w-16 h-px bg-white/10 my-4" />

              <a
                href="#formulario"
                onClick={closeMobile}
                className="group inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-primary bg-cta rounded-full hover:bg-cta-hover transition-colors duration-200 glow-cta"
              >
                Falar com a W4D
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
              </a>
            </motion.nav>

            {/* Bottom stamp — assinatura binacional */}
            <div className="px-6 py-6 flex justify-center shrink-0">
              <span className="font-mono text-[11px] text-secondary tracking-[0.15em] uppercase">
                Operação ativa · BR · USA
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
