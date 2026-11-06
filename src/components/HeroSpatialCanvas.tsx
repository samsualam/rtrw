import React, { useEffect, useRef } from 'react';

interface HeroSpatialCanvasProps {
  scrollProgress?: number;
}

export const HeroSpatialCanvas: React.FC<HeroSpatialCanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 3D Spatial tunnel & terrain rings
    const ringsCount = 28;
    let speedOffset = 0;

    // Spatial coordinate beacons
    const beacons = Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 800,
      z: Math.random() * 1000 + 100,
      zone: ['K.1', 'R.2', 'I.1', 'RTH', 'SPU'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const normX = (mouse.x - width / 2) / (width / 2);
      const normY = (mouse.y - height / 2) / (height / 2);

      // Scroll offset factor
      const scrollY = window.scrollY || 0;
      speedOffset += 0.8 + Math.min(scrollY * 0.005, 3.0);

      // Deep dark clear with slight trail
      ctx.fillStyle = '#050608';
      ctx.fillRect(0, 0, width, height);

      // Radial ambient glow matching MKVision aesthetic
      const gradient = ctx.createRadialGradient(
        width / 2 + normX * 80,
        height / 2 + normY * 80,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.07)'); // Emerald spatial glow
      gradient.addColorStop(0.4, 'rgba(59, 130, 246, 0.04)'); // Blue spatial glow
      gradient.addColorStop(1, 'rgba(5, 6, 8, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const fov = 340;
      const centerX = width / 2 + normX * 50;
      const centerY = height / 2 + normY * 40;

      // Draw spatial wireframe tunnel polygons (MKVision tunnel effect)
      for (let i = 0; i < ringsCount; i++) {
        // Perspective depth calculation
        let z = ((i * 45 - (speedOffset % 45) + 1000) % 1000);
        if (z < 10) z += 1000;

        const scale = fov / (fov + z);
        const radiusX = (width * 0.45) * scale;
        const radiusY = (height * 0.45) * scale;
        const alpha = Math.max(0, Math.min(1, (1 - z / 950) * 0.65));

        ctx.beginPath();
        const segments = 16;
        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          // Add topography elevation wave
          const wave = Math.sin(theta * 4 + z * 0.015) * 8 * scale;
          const px = centerX + Math.cos(theta) * (radiusX + wave);
          const py = centerY + Math.sin(theta) * (radiusY + wave);

          if (s === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        // Color variation based on depth
        if (i % 4 === 0) {
          ctx.strokeStyle = `rgba(56, 239, 125, ${alpha * 0.8})`; // Neon emerald line
          ctx.lineWidth = 1.2;
        } else if (i % 2 === 0) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.4})`; // Cyan blue line
          ctx.lineWidth = 0.8;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.15})`; // Subtle white grid
          ctx.lineWidth = 0.5;
        }
        ctx.stroke();

        // Connect tunnel longitudinal perspective ribs
        if (i === 0) {
          for (let s = 0; s < segments; s += 2) {
            const theta = (s / segments) * Math.PI * 2;
            const startX = centerX + Math.cos(theta) * 20;
            const startY = centerY + Math.sin(theta) * 20;
            const endX = centerX + Math.cos(theta) * (width * 0.65);
            const endY = centerY + Math.sin(theta) * (height * 0.65);

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Render spatial coordinate beacons (Zonasi Points)
      beacons.forEach((b) => {
        b.z -= 1.2;
        if (b.z <= 20) {
          b.z = 1000;
          b.x = (Math.random() - 0.5) * 1200;
          b.y = (Math.random() - 0.5) * 800;
        }
        b.pulse += 0.05;

        const scale = fov / (fov + b.z);
        const bx = centerX + b.x * scale;
        const by = centerY + b.y * scale;

        if (bx > 0 && bx < width && by > 0 && by < height) {
          const bAlpha = (1 - b.z / 1000) * 0.85;

          // Glowing node
          ctx.beginPath();
          ctx.arc(bx, by, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
          ctx.fillStyle = b.zone === 'K.1' ? '#f59e0b' : b.zone === 'RTH' ? '#10b981' : '#38ef7d';
          ctx.shadowColor = '#38ef7d';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Spatial tag line
          if (b.z < 650 && scale > 0.45) {
            ctx.font = `${Math.floor(9 * scale + 6)}px 'JetBrains Mono', monospace`;
            ctx.fillStyle = `rgba(255, 255, 255, ${bAlpha * 0.6})`;
            ctx.fillText(`${b.zone} [${(bx / 100).toFixed(1)}, ${(by / 100).toFixed(1)}]`, bx + 6, by - 4);
          }
        }
      });

      // Digital crosshair indicator in the center
      const crossSize = 14;
      ctx.strokeStyle = 'rgba(56, 239, 125, 0.35)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(centerX - crossSize, centerY);
      ctx.lineTo(centerX + crossSize, centerY);
      ctx.moveTo(centerX, centerY - crossSize);
      ctx.lineTo(centerX, centerY + crossSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, crossSize + 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Vignette & bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#050608]/40 to-[#050608] pointer-events-none" />
    </div>
  );
};
