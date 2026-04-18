import Image from 'next/image';
import { Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-transparent pt-24 pb-12 px-6 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Logo e Closing Statement */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="mb-2">
            <Image
              src="/images/W4D MARCA-16.png"
              alt="W4Digital"
              width={200}
              height={56}
              className="h-12 w-auto object-contain logo-blend"
            />
          </div>

          <p className="text-secondary text-base font-normal max-w-xl leading-relaxed">
            Aqui na W4Digital, trabalhamos com empresas que já entenderam que aquisição de clientes exige estrutura.
            Sede no Brasil e nos Estados Unidos. Atuação pelo mundo.
          </p>
        </div>

        {/* Contato */}
        <div className="flex flex-col items-center gap-2 mb-16 text-center">
          <a
            href="tel:+16892638133"
            className="text-primary hover:text-cta transition-colors duration-300 text-lg font-normal tracking-wide"
          >
            +1 (689) 263-8133
          </a>
          <a
            href="mailto:sales@w4d.com.br"
            className="text-primary hover:text-cta transition-colors duration-300 text-lg font-normal tracking-wide"
          >
            sales@w4d.com.br
          </a>
          <span className="font-mono text-secondary text-xs tracking-[1px] uppercase mt-1">Orlando, Florida &middot; Palhoça, Brasil</span>
        </div>

        {/* Sobre o fundador */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="font-mono text-[11px] text-secondary uppercase tracking-[2px]">Sobre o fundador</span>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/thiagoweirich/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Thiago Weirich"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-300"
            >
              <Linkedin size={18} strokeWidth={1.5} />
              <span className="text-sm font-normal">Thiago Weirich</span>
            </a>
            <a
              href="https://www.instagram.com/thiagoweirich/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Thiago Weirich"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-300"
            >
              <Instagram size={18} strokeWidth={1.5} />
              <span className="text-sm font-normal">@thiagoweirich</span>
            </a>
          </div>
        </div>

        {/* Legal e Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-secondary gap-6">
          <div className="flex items-center gap-8">
            <a href="/privacidade" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="/termos" className="hover:text-primary transition-colors">Termos de Uso</a>
          </div>

          <div className="text-center md:text-right font-normal">
            <p>W4D Negócios Digitais Ltda | CNPJ 49.383.275/0001-40</p>
            <p className="mt-1">W4Digital LLC | Orlando, FL</p>
            <p className="mt-2">&copy; 2026 W4Digital. Todos os direitos reservados.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
