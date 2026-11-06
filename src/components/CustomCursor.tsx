import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target with data-cursor
      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const clickable = (e.target as HTMLElement)?.closest('button, a, input, select');
        if (clickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: -16,
        top: -16,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-200 border ${
          isHovered
            ? 'w-14 h-14 -translate-x-3 -translate-y-3 bg-[#38ef7d]/20 border-[#38ef7d] backdrop-blur-[2px] shadow-[0_0_20px_rgba(56,239,125,0.4)]'
            : 'w-8 h-8 bg-white/10 border-white/30 backdrop-blur-[1px]'
        }`}
      >
        {cursorText ? (
          <span className="text-[9px] font-mono tracking-wider uppercase font-bold text-white whitespace-nowrap px-1">
            {cursorText}
          </span>
        ) : (
          <span
            className={`w-1.5 h-1.5 rounded-full transition-transform ${
              isHovered ? 'scale-150 bg-[#38ef7d]' : 'bg-white'
            }`}
          />
        )}
      </div>
    </div>
  );
};
