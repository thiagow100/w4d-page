'use client';

/**
 * ProgressiveBlur — backdrop-filter blur progressivo em camadas, mascarado direcionalmente.
 * Substitui o linear-gradient mask tradicional por blur real, criando o efeito iOS-like
 * onde as bordas do conteúdo desfocam em direção à transparência.
 *
 * Uso típico: overlays absolutos nas laterais de marquees ou edges de hero sections.
 *
 * Adaptado do padrão MCP 21st.dev (aceternity/mtnvncnt) com:
 *   - TypeScript estrito
 *   - Cleanup de animation logic (não precisamos da motion lib aqui)
 *   - Integração Tailwind v4
 */

import { HTMLAttributes } from 'react';

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

type Direction = keyof typeof GRADIENT_ANGLES;

export type ProgressiveBlurProps = {
  /** Direção do desfoque progressivo. Default 'bottom'. */
  direction?: Direction;
  /** Quantas camadas de blur (mais camadas = transição mais suave, mais GPU). Default 8. */
  blurLayers?: number;
  /** Intensidade base do blur por camada (px). Default 0.25 = blur 0/0.25/0.5...px sequencial. */
  blurIntensity?: number;
} & HTMLAttributes<HTMLDivElement>;

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  blurIntensity = 0.25,
  className = '',
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <div className={`relative ${className}`} {...props}>
      {Array.from({ length: layers }).map((_, index) => {
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`;

        return (
          <div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${index * blurIntensity}px)`,
            }}
          />
        );
      })}
    </div>
  );
}
