'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Eyebrow from '@/components/Eyebrow';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const brands = [
  { name: 'iFood', logo: '/logos/ifood.svg' },
  { name: 'Santander', logo: '/logos/santander.svg' },
  { name: 'Cyrela', logo: '/logos/cyrela.svg' },
  { name: 'CBA', logo: '/logos/cba.svg' },
  { name: 'A6 Inc', logo: '/logos/a6inc.svg' },
  { name: 'Sidesc', logo: '/logos/sidesc.svg' },
];

export default function BandaMarcas() {
  return (
    <section
      aria-label="Marcas que já operaram com a W4D"
      className="relative w-full py-10 md:py-20 px-6 sm:px-12 lg:px-24 bg-primary border-y border-white/5 noise-overlay"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="flex flex-col items-center md:flex-row md:items-center md:gap-10 lg:gap-12"
        >
          {/* Text block — Logo Cloud 4 pattern. Mobile: eyebrow expandido centralizado.
              Desktop md+: eyebrow curto + headline + border-r vertical sutil separando do marquee. */}
          <div className="flex flex-col items-center md:items-start md:shrink-0 md:max-w-[260px] md:border-r md:border-white/5 md:pr-8 lg:pr-12 mb-10 md:mb-0">
            <Eyebrow className="mb-0 md:mb-3">
              <span className="md:hidden">Confiança de operações exigentes</span>
              <span className="hidden md:inline">Confiança</span>
            </Eyebrow>
            <p className="hidden md:block text-base text-body font-normal leading-snug">
              Operações exigentes já confiaram no método W4D.
            </p>
          </div>

          {/* Marquee — full-width em mobile, flex-1 em desktop. min-w-0 evita overflow do flex item. */}
          <div className="marquee-pause relative w-full md:flex-1 md:min-w-0 overflow-hidden">
            <div className="marquee-track gap-16 md:gap-24 py-2">
              {[...brands, ...brands].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="shrink-0 flex items-center justify-center"
                  aria-hidden={i >= brands.length}
                >
                  <Image
                    src={brand.logo}
                    alt={i < brands.length ? brand.name : ''}
                    width={140}
                    height={48}
                    className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-100 brightness-0 invert transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Progressive blur lateral — reduzido em desktop pq o marquee agora ocupa menos largura */}
            <ProgressiveBlur
              direction="left"
              blurIntensity={0.6}
              className="absolute top-0 left-0 h-full w-[80px] md:w-[100px]"
            />
            <ProgressiveBlur
              direction="right"
              blurIntensity={0.6}
              className="absolute top-0 right-0 h-full w-[80px] md:w-[100px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
