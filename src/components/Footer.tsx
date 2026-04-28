import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-primary pt-16 md:pt-24 pb-8 px-6 sm:px-12 lg:px-24 border-t border-white/5 noise-overlay">

      {/* Aurora W4D soft — continuidade atmosférica cross-section */}
      <div aria-hidden className="aurora-w4d-soft" />

      <div className="max-w-6xl mx-auto flex flex-col relative z-10">

        {/* Closing scene — h2 com presença equivalente às demais seções, subtítulo de apoio e CTA único */}
        <div className="mb-16 md:mb-20 w-full flex flex-col items-start">
          <h2 className="h2-section font-semibold tracking-[-0.05em] text-white/95 leading-[1.08]">
            Marketing medido pelo que vende.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-body font-normal leading-[1.7] max-w-2xl">
            Estrutura completa de marketing, do anúncio à agenda do seu comercial.
          </p>
          <a
            href="#formulario"
            className="mt-10 group inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-primary transition-colors duration-200 ease-out bg-cta rounded-full hover:bg-cta-hover active:scale-[0.98] glow-cta"
          >
            Começar a parceria
            <span className="ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1">&#8594;</span>
          </a>
        </div>

        {/* 4 colunas: Navegação · Contato · Palhoça · Orlando.
            Mobile (<sm) → stack vertical 1-col.
            Tablet (sm-lg) → 2×2.
            Desktop (lg+) → 4×1. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">

          {/* Navegação — links âncora pra seções da página */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Navegação
            </span>
            <nav className="flex flex-col gap-3" aria-label="Navegação rodapé">
              <a href="#metodo" className="text-sm font-medium text-body hover:text-primary transition-colors duration-200">
                Método W4D
              </a>
              <a href="#quem-somos" className="text-sm font-medium text-body hover:text-primary transition-colors duration-200">
                Quem somos
              </a>
              <a href="#faq" className="text-sm font-medium text-body hover:text-primary transition-colors duration-200">
                FAQ
              </a>
              <a href="#formulario" className="text-sm font-medium text-body hover:text-primary transition-colors duration-200">
                Falar com a W4D
              </a>
            </nav>
          </div>

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

          {/* Palhoça — cidade primary (decision-info), razão social mono small (legal-info) */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Palhoça, SC
            </span>
            <div className="flex items-start gap-3 text-sm font-normal leading-relaxed">
              <MapPin size={16} strokeWidth={2.5} className="text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <span className="text-primary font-medium">Palhoça · Santa Catarina · Brasil</span>
                <span className="font-mono text-[11px] text-secondary uppercase tracking-wider">
                  W4D Negócios Digitais LTDA
                </span>
              </div>
            </div>
          </div>

          {/* Orlando — mesma hierarquia: cidade primary, razão social mono small */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase">
              Orlando, FL
            </span>
            <div className="flex items-start gap-3 text-sm font-normal leading-relaxed">
              <MapPin size={16} strokeWidth={2.5} className="text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <span className="text-primary font-medium">Orlando · Florida · USA</span>
                <span className="font-mono text-[11px] text-secondary uppercase tracking-wider">
                  W4Digital LLC
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Linha Divisória de Gradiente — oklch evita passagem por marrom no fade */}
        <div className="w-full h-[1px] bg-[linear-gradient(to_right_in_oklch,transparent,rgba(255,59,59,0.55),transparent)] my-8 opacity-70"></div>

        {/* Bottom row: logo + copyright + legal · stamp + voltar ao topo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
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
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
              <span className="font-mono text-[11px] md:text-xs text-muted tracking-[0.12em] lowercase">
                © 2026 · W4D
              </span>
              <span className="text-white/10 hidden md:block">|</span>
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
                <a href="/privacidade" className="font-mono text-[11px] md:text-xs text-muted hover:text-primary transition-colors duration-200 tracking-[0.12em] lowercase">
                  política de privacidade
                </a>
                <a href="/termos" className="font-mono text-[11px] md:text-xs text-muted hover:text-primary transition-colors duration-200 tracking-[0.12em] lowercase">
                  termos de uso
                </a>
              </div>
            </div>
          </div>

          {/* Stamp + botão circular "Voltar ao topo" (pattern Vercel/21st.dev) */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] md:text-xs text-secondary tracking-[0.12em] uppercase">
              BUILT WITH DISCIPLINE, NOT HYPE.
            </span>
            <a
              href="#"
              aria-label="Voltar ao topo da página"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-secondary hover:text-primary hover:border-white/30 transition-all duration-200 ease-out shrink-0"
            >
              <ArrowUp size={14} strokeWidth={2} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
