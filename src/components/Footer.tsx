import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-primary pt-16 md:pt-24 pb-8 px-6 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col">

        {/* Assinatura de marca */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.05em] text-white/95 leading-[1.1] text-balance">
            Performance marketing com régua de receita.
          </h2>
          <p className="mt-6 text-base md:text-lg text-body font-normal leading-[1.7] max-w-2xl">
            Estrutura, operação e acompanhamento diário. Sem camada intermediária entre o diagnóstico e a entrega.
          </p>
        </div>

        {/* 3 colunas: Contato · Palhoça · Orlando */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-white/10">

          {/* Contato */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Contato
            </span>
            <div className="flex flex-col gap-4">
              <a href="tel:+16892638133" className="flex items-center gap-3 text-primary hover:text-cta transition-colors duration-200 text-sm font-medium">
                <Phone size={16} strokeWidth={2.5} className="text-secondary" />
                +1 689 263-8133
              </a>
              <a href="mailto:sales@w4d.com.br" className="flex items-center gap-3 text-primary hover:text-cta transition-colors duration-200 text-sm font-medium">
                <Mail size={16} strokeWidth={2.5} className="text-secondary" />
                sales@w4d.com.br
              </a>
            </div>
          </div>

          {/* Palhoça */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Palhoça, SC
            </span>
            <div className="flex items-start gap-3 text-body text-sm font-normal leading-relaxed">
              <MapPin size={16} strokeWidth={2.5} className="text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-primary font-medium">W4D Negócios Digitais LTDA</span>
                <span>Palhoça · Santa Catarina · Brasil</span>
              </div>
            </div>
          </div>

          {/* Orlando */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Orlando, FL
            </span>
            <div className="flex items-start gap-3 text-body text-sm font-normal leading-relaxed">
              <MapPin size={16} strokeWidth={2.5} className="text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-primary font-medium">W4Digital LLC</span>
                <span>Orlando · Florida · USA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright + Slogan */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <a href="#" aria-label="Voltar ao topo" className="shrink-0 hover:opacity-70 transition-opacity duration-200">
              <Image
                src="/images/logo-w4d-only.png"
                alt="W4D"
                width={120}
                height={35}
                className="h-6 md:h-7 w-auto object-contain opacity-90"
              />
            </a>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] md:text-xs text-secondary tracking-[0.12em] lowercase">
                © 2026 · all rights reserved
              </span>
              <span className="text-white/10 hidden md:block">|</span>
              <div className="flex items-center gap-4">
                <a href="/privacidade" className="font-mono text-[11px] md:text-xs text-secondary hover:text-primary transition-colors duration-200 tracking-[0.12em] lowercase">
                  política de privacidade
                </a>
                <a href="/termos" className="font-mono text-[11px] md:text-xs text-secondary hover:text-primary transition-colors duration-200 tracking-[0.12em] lowercase">
                  termos de uso
                </a>
              </div>
            </div>
          </div>
          <span className="font-mono text-[11px] md:text-xs text-secondary tracking-[0.12em] uppercase">
            BUILT WITH DISCIPLINE, NOT HYPE.
          </span>
        </div>

      </div>
    </footer>
  );
}
