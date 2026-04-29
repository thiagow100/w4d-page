import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

/**
 * OG image programática — gerada no build pelo Next.
 * Aparece em previews de WhatsApp, LinkedIn, Slack, X/Twitter, iMessage.
 *
 * Layout: bg #0A0A0A (consistente com a página) + logo W4D + headline +
 * mono stamp. Sem auroras (mais legível em thumbnail pequeno).
 */

export const alt = 'W4D — Marketing medido pelo que vende.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Logo W4D — lido do filesystem e convertido pra base64 inline (ImageResponse
  // não baixa URLs externas em runtime de build).
  const logoPath = path.join(process.cwd(), 'public/images/logo-w4d-only.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background: '#0A0A0A',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle red atmospheric glow no canto direito — eco do design system
            sem competir com o texto. */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '60%',
            height: '80%',
            background:
              'radial-gradient(ellipse at center, rgba(236, 0, 0, 0.18) 0%, rgba(236, 0, 0, 0.04) 40%, transparent 70%)',
            filter: 'blur(40px)',
            display: 'flex',
          }}
        />

        {/* Top: logo W4D */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logoSrc}
            alt="W4D"
            width={240}
            height={71}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              maxWidth: '85%',
              display: 'flex',
            }}
          >
            Marketing medido pelo que vende.
          </div>
          {/* Red accent rule */}
          <div
            style={{
              width: '64px',
              height: '3px',
              background: '#EC0000',
              display: 'flex',
            }}
          />
        </div>

        {/* Bottom: mono stamp */}
        <div
          style={{
            fontSize: 22,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            color: '#737373',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Performance Marketing · Brasil & USA
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
