'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * SmoothScroll — Lenis com lazy init pra ficar fora do critical path.
 *
 * Antes: ReactLenis wrapper iniciava Lenis (RAF loop contínuo) no mount,
 * competindo com render do Hero em CPU lenta (mobile Lighthouse 4× slowdown).
 * LCP ficava em 8.5s.
 *
 * Agora: children renderizam imediatamente (zero overhead pre-LCP).
 * Lenis inicia via requestIdleCallback após o paint estabilizar, em chunk
 * dynamic (não vai no bundle inicial).
 *
 * Trade-off: ~1-2s de scroll nativo sem inertia momentum logo após chegada.
 * Aceitável — usuário ainda está orientando-se na página. CSS fallback
 * (scroll-behavior: smooth + scroll-margin-top) cobre anchors nesse gap.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let rafId = 0;

    const initLenis = () => {
      import('lenis').then((mod) => {
        const Lenis = mod.default;
        lenis = new Lenis({
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
        });

        const tick = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      });
    };

    // requestIdleCallback: browser inicia Lenis quando estiver ocioso
    // (após FCP/LCP, render estabilizado). Timeout 2s garante que mesmo em
    // sessão muito ativa o Lenis ativa antes do user começar a scrollar muito.
    const idleSupported = typeof window !== 'undefined' && 'requestIdleCallback' in window;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    if (idleSupported) {
      idleId = (window as unknown as {
        requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback(initLenis, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(initLenis, 1500);
    }

    return () => {
      if (idleId !== undefined) {
        (window as unknown as {
          cancelIdleCallback: (id: number) => void;
        }).cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
