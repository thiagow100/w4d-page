'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Eyebrow from '@/components/Eyebrow';

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
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="flex flex-col items-center w-full"
        >
          <Eyebrow className="mb-10">Confiança de operações exigentes</Eyebrow>

          <div className="marquee-mask marquee-pause w-full overflow-hidden">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
