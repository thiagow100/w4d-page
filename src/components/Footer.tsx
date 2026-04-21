import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative w-full bg-primary pt-16 md:pt-24 pb-12 px-6 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col">

        {/* Assinatura de marca — tipografia grande como encerramento */}
        <div className="mb-20 md:mb-24 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.05em] text-white/95 leading-[1.1] text-balance">
            Performance marketing com régua de receita.
          </h2>
          <p className="mt-6 text-base md:text-lg text-body font-normal leading-[1.7] max-w-2xl">
            Aqui na W4Digital, trabalhamos com empresas que já entenderam que aquisição de clientes exige estrutura. Sede no Brasil e nos Estados Unidos. Atuação pelo mundo.
          </p>
        </div>

        {/* 3 colunas: Contato · Escritórios · Legal */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 md:gap-16 pb-12 border-b border-white/5">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo-w4d-cropped.png"
              alt="W4Digital"
              width={736}
              height={139}
              className="h-9 w-auto object-contain opacity-90"
            />
            <span className="font-mono text-xs text-body tracking-[0.18em] uppercase">
              Performance Marketing
            </span>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase mb-1">
              Contato
            </span>
            <a
              href="tel:+16892638133"
              className="text-primary hover:text-cta transition-colors duration-200 text-base font-normal"
            >
              +1 (689) 263-8133
            </a>
            <a
              href="mailto:sales@w4d.com.br"
              className="text-primary hover:text-cta transition-colors duration-200 text-base font-normal"
            >
              sales@w4d.com.br
            </a>
          </div>

          {/* Escritórios */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase mb-1">
              Escritórios
            </span>
            <span className="text-body text-sm font-normal leading-relaxed">
              Orlando, FL<br />
              Estados Unidos
            </span>
            <span className="text-body text-sm font-normal leading-relaxed">
              Palhoça, SC<br />
              Brasil
            </span>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-secondary tracking-[0.18em] uppercase mb-1">
              Legal
            </span>
            <a
              href="/privacidade"
              className="text-body hover:text-primary transition-colors duration-200 text-sm font-normal"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos"
              className="text-body hover:text-primary transition-colors duration-200 text-sm font-normal"
            >
              Termos de Uso
            </a>
          </div>

        </div>

        {/* Copyright + CNPJ */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-secondary font-normal">
          <div className="flex flex-col md:flex-row gap-1 md:gap-6">
            <span>W4D Negócios Digitais Ltda &middot; CNPJ 49.383.275/0001-40</span>
            <span>W4Digital LLC &middot; Orlando, FL</span>
          </div>
          <span>&copy; 2026 W4Digital. Todos os direitos reservados.</span>
        </div>

      </div>
    </footer>
  );
}
