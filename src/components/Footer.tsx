export default function Footer() {
  return (
    <footer className="w-full bg-transparent pt-24 pb-12 px-6 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Closing Statement */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
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
          <span className="text-secondary text-sm font-light mt-1">Orlando, FL, USA | Palhoça, SC, Brasil</span>
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
