'use client';

/**
 * LazyForm — wrapper que carrega FormularioLead via dynamic import sob demanda.
 *
 * Por quê: FormularioLead carrega Supabase + React Hook Form + Zod (~70 KiB)
 * que são únicos da seção do formulário. Pra empresário que abre a página
 * pra ler o Hero, esses ~70 KiB no bundle inicial atrasam o LCP.
 *
 * ssr:false: o componente NÃO renderiza no HTML inicial. Bot precisa executar
 * JS pra ver. Aceitável aqui pq o form é form (sem conteúdo SEO indexável).
 *
 * Skeleton placeholder com altura aproximada do form preserva layout (CLS 0)
 * enquanto o JS chega via chunk separado.
 */

import dynamic from 'next/dynamic';

const FormularioLead = dynamic(() => import('@/components/FormularioLead'), {
  ssr: false,
  loading: () => (
    <section
      id="formulario"
      aria-hidden
      className="relative w-full py-12 md:py-section px-6 sm:px-12 lg:px-24 bg-secondary noise-overlay min-h-[800px] md:min-h-[700px]"
    >
      {/* Top color fade — preserva continuidade visual com seção anterior */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-20 md:h-24 pointer-events-none z-[1] bg-gradient-to-b from-[#0A0A0A] to-transparent"
      />
    </section>
  ),
});

export default function LazyForm() {
  return <FormularioLead />;
}
