'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

/**
 * Smooth scroll via Lenis.
 * - smoothWheel: suaviza apenas mouse/trackpad (desktop).
 * - Em touch (iPhone 14+), o scroll nativo iOS passa sem interferência — melhor performance.
 * - anchors: true faz o Lenis interceptar links #hash e animar o salto.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1,
        lerp: 0.08,
        touchMultiplier: 1.5,
        anchors: {
          offset: -80,
          duration: 1.4,
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
