import { ImageResponse } from 'next/og';

/**
 * Apple touch icon (180×180) — exibido quando user adiciona à home screen iOS.
 * Mesma identidade visual do favicon: "W4D" branco em #0A0A0A.
 * Apple não suporta transparência, então fundo opaco é mandatório.
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
          color: '#FFFFFF',
          fontSize: 76,
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
