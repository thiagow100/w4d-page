import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso | W4D',
  description: 'Termos de uso do site da W4D.',
};

export default function Termos() {
  return (
    <main className="min-h-screen bg-primary text-primary px-6 sm:px-12 lg:px-24 py-32">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-secondary hover:text-primary transition-colors mb-8 inline-block">
          &larr; Voltar
        </Link>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-1px] mb-8">Termos de Uso</h1>
        <p className="font-mono text-[11px] text-secondary uppercase tracking-[2px] mb-12">Última atualização: abril de 2026</p>

        <div className="space-y-8 text-body font-normal leading-[1.8] text-base">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">1. Aceitação</h2>
            <p>Ao utilizar este site, você concorda com os presentes termos de uso.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">2. Serviços</h2>
            <p>Este site apresenta os serviços da W4D. As informações aqui descritas são de caráter informativo e não constituem oferta vinculante.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">3. Propriedade intelectual</h2>
            <p>Todo o conteúdo deste site, incluindo textos, imagens, logotipos e design, é propriedade da W4D e está protegido por leis de propriedade intelectual.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">4. Limitação de responsabilidade</h2>
            <p>A W4D não se responsabiliza por decisões tomadas com base nas informações apresentadas neste site.</p>
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
