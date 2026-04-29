import { ImageResponse } from 'next/og';

/**
 * Favicon W4D — "W4D" branco bold sobre fundo preto.
 *
 * Decisão final após 5 iterações: user preferiu branco sobre preto vs.
 * o "vermelho doidão" do fundo saturado. Mantém identidade dark da
 * marca, texto branco bold legível em qualquer tamanho de aba.
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
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: '-0.06em',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        W4D
      </div>
    ),
    { ...size },
  );
}
