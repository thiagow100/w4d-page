'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedW4() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Opacidade da imagem conforme o scroll
  // 0-15%: quase invisível (0.02)
  // 15-30%: começa a aparecer borrada
  // 30-45%: forma reconhecível
  // 45-55%: quase nítida
  // 55-62%: EXPLOSÃO - máxima visibilidade (0.25)
  // 62-100%: dissolve de volta ao nada
  const opacity = useTransform(
    scrollYProgress,
    [0,    0.05, 0.15, 0.30, 0.45, 0.55, 0.62, 0.72, 1.0],
    [0.02, 0.02, 0.05, 0.10, 0.08, 0.25, 0.25, 0.06, 0  ]
  );

  // Blur: começa como mancha irreconhecível, clarea na explosão, volta a borrar
  const blurPx = useTransform(
    scrollYProgress,
    [0,   0.15, 0.30, 0.45, 0.55, 0.62, 0.72, 1.0],
    [20,  12,   8,    3,    1,    0,    8,    20  ]
  );
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  // Scale sobe levemente na explosão
  const scale = useTransform(
    scrollYProgress,
    [0,   0.48, 0.62, 1.0],
    [1.0, 1.0,  1.06, 1.08]
  );

  // z-index: sobe para 30 apenas durante a explosão (a logo passa por cima das seções)
  const zIndex = useTransform(scrollYProgress, (v) =>
    v >= 0.48 && v <= 0.70 ? 30 : 2
  );

  if (!mounted) return null;

  return (
    <motion.div
      style={{ zIndex }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.img
        src="/images/w4d-icon-only.png"
        alt=""
        aria-hidden="true"
        style={{
          opacity,
          filter,
          scale,
          // Fundo preto da imagem se funde com o body preto nativamente.
          // mix-blend-mode: screen apaga o preto e preserva o vermelho — dupla garantia.
          mixBlendMode: 'screen',
        }}
        className="
          w-[70vw] sm:w-[60vw] md:w-[55vw] lg:w-[45vw]
          max-w-2xl
          object-contain
          select-none
        "
        draggable={false}
      />
    </motion.div>
  );
}
