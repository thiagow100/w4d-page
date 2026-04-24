import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade | W4D',
  description: 'Política de privacidade e tratamento de dados pessoais da W4D.',
};

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-primary text-primary px-6 sm:px-12 lg:px-24 py-32">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-secondary hover:text-primary transition-colors mb-8 inline-block">
          &larr; Voltar
        </Link>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-1px] mb-8">Política de Privacidade</h1>
        <p className="font-mono text-[11px] text-secondary uppercase tracking-[2px] mb-12">Última atualização: abril de 2026</p>

        <div className="space-y-8 text-body font-normal leading-[1.8] text-base">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">1. Dados que coletamos</h2>
            <p>Coletamos apenas os dados fornecidos voluntariamente pelo formulário de contato: nome completo, telefone, e-mail, nome da empresa e segmento de atuação.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">2. Como usamos seus dados</h2>
            <p>Os dados coletados são utilizados exclusivamente para entrar em contato sobre os serviços da W4D. Não compartilhamos, vendemos ou cedemos dados pessoais a terceiros.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">3. Armazenamento</h2>
            <p>Seus dados são armazenados em servidores seguros via Supabase, com criptografia em trânsito e em repouso.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">4. Seus direitos</h2>
            <p>Você pode solicitar a qualquer momento a exclusão, correção ou acesso aos seus dados pessoais enviando um e-mail para sales@w4d.com.br.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">5. Contato</h2>
            <p>W4D Negócios Digitais Ltda<br />CNPJ: 49.383.275/0001-40<br />E-mail: sales@w4d.com.br</p>
          </section>
        </div>
      </div>
    </main>
  );
}
