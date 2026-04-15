import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-transparent pt-24 pb-12 px-6 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Logo and Contact */}
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          {/* Logo Real */}
          <div className="mb-6">
            <Image
              src="/images/W4D MARCA-16.png"
              alt="W4Digital"
              width={200}
              height={56}
              className="h-12 w-auto object-contain"
            />
          </div>
          
          <a href="tel:+16892638133" className="text-2xl md:text-4xl font-light text-primary hover:text-cta transition-colors duration-300 tracking-wide">
            +1 (689) 263-8133
          </a>
          
          <a href="mailto:contato@w4d.com.br" className="text-secondary hover:text-primary transition-colors text-lg tracking-wide">
            contato@w4d.com.br
          </a>
        </div>

        {/* Legal & Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-secondary gap-6">
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
          </div>
          
          <div className="text-center md:text-right font-light">
            <p>W4D NEGÓCIOS DIGITAIS LTDA | CNPJ 49.383.275/0001-40</p>
            <p className="mt-2">© 2026 W4Digital. Todos os direitos reservados.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
