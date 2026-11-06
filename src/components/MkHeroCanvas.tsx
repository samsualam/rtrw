import React, { useEffect, useRef } from 'react';

export const MkHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with easing
    const mouse = { x: width * 0.5, y: height * 0.5, tx: width * 0.5, ty: height * 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.015;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient radiant glow matching MKVision --studio-a (#00FFAF) and --studio-b (#147A86)
      const glowGrad = ctx.createRadialGradient(
        width * 0.7 + (mouse.x - width * 0.5) * 0.15,
        height * 0.35 + (mouse.y - height * 0.5) * 0.15,
        40,
        width * 0.65,
        height * 0.4,
        width * 0.55
      );
      glowGrad.addColorStop(0, 'rgba(0, 255, 175, 0.22)');
      glowGrad.addColorStop(0.5, 'rgba(20, 122, 134, 0.12)');
      glowGrad.addColorStop(1, 'rgba(248, 250, 245, 0)');

      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw the iconic 3D Torus / Wireframe spatial geometric mesh
      const centerX = width * 0.65 + (mouse.x - width * 0.5) * 0.08;
      const centerY = height * 0.45 + (mouse.y - height * 0.5) * 0.08;

      const rings = 18;
      const pointsPerRing = 32;
      const R = Math.min(width, height) * 0.28; // Major radius
      const r = Math.min(width, height) * 0.11; // Minor radius

      const rotX = time * 0.4 + (mouse.y / height - 0.5) * 0.8;
      const rotY = time * 0.6 + (mouse.x / width - 0.5) * 0.8;

      // Calculate 3D points
      const points: { x: number; y: number; z: number; u: number; v: number }[][] = [];

      for (let i = 0; i < rings; i++) {
        const u = (i / rings) * Math.PI * 2;
        const ringPoints = [];
        for (let j = 0; j < pointsPerRing; j++) {
          const v = (j / pointsPerRing) * Math.PI * 2;

          // Torus formula
          let x0 = (R + r * Math.cos(v)) * Math.cos(u);
          let y0 = (R + r * Math.cos(v)) * Math.sin(u);
          let z0 = r * Math.sin(v);

          // Rotate X
          const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
          const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);

          // Rotate Y
          const x2 = x0 * Math.cos(rotY) + z1 * Math.sin(rotY);
          const z2 = -x0 * Math.sin(rotY) + z1 * Math.cos(rotY);

          // Perspective projection
          const fov = 650;
          const scale = fov / (fov + z2 + 200);

          ringPoints.push({
            x: centerX + x2 * scale,
            y: centerY + y1 * scale,
            z: z2,
            u: i / rings,
            v: j / pointsPerRing,
          });
        }
        points.push(ringPoints);
      }

      // Draw wireframe lines
      for (let i = 0; i < rings; i++) {
        for (let j = 0; j < pointsPerRing; j++) {
          const p1 = points[i][j];
          const p2 = points[(i + 1) % rings][j];
          const p3 = points[i][(j + 1) % pointsPerRing];

          const depthAlpha = Math.max(0.08, Math.min(0.55, (p1.z + 150) / 300));

          // Draw longitudinal lines
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(20, 122, 134, ${depthAlpha * 0.45})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Draw latitudinal rings with occasional mint accent
          if (j % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.strokeStyle =
              i % 4 === 0
                ? `rgba(0, 255, 175, ${depthAlpha * 0.75})`
                : `rgba(10, 33, 41, ${depthAlpha * 0.25})`;
            ctx.lineWidth = i % 4 === 0 ? 1.4 : 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Prism reflections matching MKVision .mkv-studio-prism */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[#00FFAF]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/6 w-96 h-96 rounded-full bg-[#147A86]/10 blur-3xl pointer-events-none" />
    </div>
  );
};
