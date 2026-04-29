import { ImageResponse } from 'next/og';

/**
 * Favicon W4D — texto "W4D" vermelho sobre fundo preto.
 *
 * Decisão de design depois de feedback "ficou merda" do user com a versão
 * baseada em logo MARCA-20 PNG redimensionada: tipografia detalhada da logo
 * vira borrão em 32×32. ImageResponse com texto rendered direto pelo browser
 * é pixel-friendly em qualquer tamanho.
 *
 * Cor vermelha #EC0000 sobre off-black #0A0A0A: contraste alto, chama atenção
 * em meio a outras abas (favicons da maioria dos sites são claros — preto+vermelho
 * destaca).
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
          color: '#EC0000',
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
