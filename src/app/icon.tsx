import { ImageResponse } from 'next/og';

/**
 * Favicon W4D — "W4D" branco em fundo off-black #0A0A0A.
 * Foco em legibilidade no tamanho de aba do browser (16-32px).
 *
 * Tentativa anterior usava logo-icon.png (símbolo) redimensionado em 32x32
 * que virava borrão. Texto "W4D" puro funciona melhor em qualquer tamanho.
 */

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          color: '#FFFFFF',
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: '-0.05em',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        W4D
      </div>
    ),
    { ...size },
  );
}
