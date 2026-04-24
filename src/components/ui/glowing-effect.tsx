'use client';

/**
 * GlowingEffect — W4D single-red version.
 * Baseado no padrão Aceternity UI, adaptado para:
 *   - Single accent vermelho (oklch 62% 0.26 27) — não multi-color default
 *   - CSS custom properties para performance (evita re-render React)
 *   - Proximity detection via raf + pointermove no document.body
 *   - Conic-gradient com mask rotacionada que simula "arc de luz" na borda
 *
 * Quando o cursor está dentro do proximity radius, o arc aparece e segue
 * o ângulo do cursor em relação ao centro do elemento (com spring easing).
 * Quando fora, opacity → 0 em 300ms.
 */

import { memo, useCallback, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface GlowingEffectProps {
  /** Raio em px fora da borda onde o efeito ativa. Maior = ativa mais cedo. */
  proximity?: number;
  /** Largura angular do arc de luz em graus. Maior = arc mais longo. */
  spread?: number;
  /** Raio interno inativo (0 a 1). Maior = zona "morta" maior no centro. */
  inactiveZone?: number;
  /** Duração da rotação do arc ao seguir cursor (segundos). */
  movementDuration?: number;
  /** Espessura do arc em px. */
  borderWidth?: number;
  /** Desabilita o efeito (ex: mobile). */
  disabled?: boolean;
  className?: string;
}

export const GlowingEffect = memo(({
  proximity = 64,
  spread = 40,
  inactiveZone = 0.3,
  movementDuration = 2,
  borderWidth = 1,
  disabled = false,
  className = '',
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMove = useCallback(
    (e?: { clientX: number; clientY: number }) => {
      if (!containerRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const element = containerRef.current;
        if (!element) return;

        const { left, top, width, height } = element.getBoundingClientRect();
        const mouseX = e?.clientX ?? lastPosition.current.x;
        const mouseY = e?.clientY ?? lastPosition.current.y;

        if (e) lastPosition.current = { x: mouseX, y: mouseY };

        const centerX = left + width * 0.5;
        const centerY = top + height * 0.5;
        const distFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distFromCenter < inactiveRadius) {
          element.style.setProperty('--active', '0');
          return;
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        element.style.setProperty('--active', isActive ? '1' : '0');
        if (!isActive) return;

        const currentAngle =
          parseFloat(element.style.getPropertyValue('--start')) || 0;
        const targetAngle =
          (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;
        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        const newAngle = currentAngle + angleDiff;

        animate(currentAngle, newAngle, {
          duration: movementDuration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (value) => {
            element.style.setProperty('--start', String(value));
          },
        });
      });
    },
    [inactiveZone, proximity, movementDuration]
  );

  useEffect(() => {
    if (disabled) return;

    const handlePointerMove = (e: PointerEvent) =>
      handleMove({ clientX: e.clientX, clientY: e.clientY });
    const handleScroll = () => handleMove();

    document.body.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMove, disabled]);

  if (disabled) return null;

  return (
    <div
      ref={containerRef}
      style={
        {
          '--blur': '0px',
          '--spread': spread,
          '--start': '0',
          '--active': '0',
          '--glowingeffect-border-width': `${borderWidth}px`,
          '--gradient': `conic-gradient(
            from calc(var(--start) * 1deg) at 50% 50%,
            oklch(62% 0.26 27 / 0) 0deg,
            oklch(62% 0.26 27 / 0.95) calc(var(--spread) * 0.6deg),
            oklch(72% 0.22 27 / 0.85) calc(var(--spread) * 1.0deg),
            oklch(55% 0.24 27 / 0.65) calc(var(--spread) * 1.4deg),
            oklch(62% 0.26 27 / 0) calc(var(--spread) * 2deg)
          )`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 ${className}`}
    >
      <div
        className="glow rounded-[inherit] h-full w-full
          after:content-[''] after:rounded-[inherit]
          after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]
          after:[border:var(--glowingeffect-border-width)_solid_transparent]
          after:[background:var(--gradient)]
          after:[background-attachment:fixed]
          after:opacity-[var(--active)]
          after:transition-opacity after:duration-300
          after:[mask-clip:padding-box,border-box]
          after:[mask-composite:intersect]
          after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
      />
    </div>
  );
});

GlowingEffect.displayName = 'GlowingEffect';
