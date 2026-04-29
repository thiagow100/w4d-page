import { ImageResponse } from 'next/og';

/**
 * Apple touch icon (180×180) — "W4D" vermelho saturado sobre #0A0A0A.
 * Mesma identidade do favicon. Apple não suporta transparência, fundo opaco mandatório.
 */

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 78,
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
