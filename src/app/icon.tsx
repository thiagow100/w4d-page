import { ImageResponse } from 'next/og';

/**
 * Favicon W4D — texto "W4D" branco sobre fundo vermelho saturado.
 *
 * Iteração 3 depois de "ficou escuro" do user: invertemos as cores.
 * Pattern Apple/Netflix/Pinterest — cor solid forte de fundo + letra
 * contrastante. Em meio à barra de favicons, a maioria dos sites
 * populares (Gmail, Facebook, Instagram, LinkedIn, X) usa cor saturada
 * de fundo. Fundo preto afundava visualmente; fundo vermelho destaca
 * como marker em qualquer tab background.
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
          background: '#EC0000',
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
