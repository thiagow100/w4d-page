'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function TechGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];

    const initNodes = () => {
      // Canvas sempre sized ao viewport (position:fixed cobre a tela inteira)
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const isMobile = window.innerWidth < 768;
      const nodeCount = isMobile ? 25 : Math.floor(random(40, 60));

      nodes = Array.from({ length: nodeCount }).map(() => ({
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        vx: random(0.2, 0.4) * (Math.random() > 0.5 ? 1 : -1),
        vy: random(0.2, 0.4) * (Math.random() > 0.5 ? 1 : -1),
        radius: random(0.5, 1.5)
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Pontos: #7A0000, opacity 0.4
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(122, 0, 0, 0.4)';
        ctx.fill();

        // Linhas: #EC0000, opacity proporcional à distância, max 0.12
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = 0.12 * (1 - dist / 150);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(236, 0, 0, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    initNodes();
    draw();

    const handleResize = () => initNodes();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // REMOVIDO mix-blend-screen: cancela tudo sobre fundo preto.
      // opacity: 0.35 como CSS puro — simples e consistente.
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.35 }}
    />
  );
}
