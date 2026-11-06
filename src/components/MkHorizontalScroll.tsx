import React, { useRef, useEffect, useState } from 'react';
import { SPATIAL_ZONES } from '../data/zoningData';
import { SpatialZone } from '../types/spatial';
import { soundEffects } from '../utils/audio';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface MkHorizontalScrollProps {
  onSelectZone: (zone: SpatialZone) => void;
  onOpenKkprForZone: (zoneCode: string) => void;
}

export const MkHorizontalScroll: React.FC<MkHorizontalScrollProps> = ({
  onSelectZone,
  onOpenKkprForZone,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress between 0 and 1 while the section is in view
      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute translateX percentage for the track
  // 5 cards + 1 intro box. The track needs to shift from 0% to approximately -60%
  const translateX = scrollProgress * 62;

  const scrollLeft = () => {
    soundEffects.playClick();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    soundEffects.playClick();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="projecten"
      className="relative bg-[#F8FAF5] min-h-[260vh] z-10"
      style={{ isolation: 'isolate' }}
    >
      {/* Marquee Banner top of section matching MKVision */}
      <div className="py-5 border-b border-[#0A2129]/10 overflow-hidden whitespace-nowrap bg-[#F8FAF5] select-none">
        <div
          className="inline-flex items-center gap-10 animate-marquee"
          style={{
            animation: 'marqueeFwd 30s linear infinite',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="inline-flex items-center gap-10">
              <span className="font-onest font-semibold text-base uppercase tracking-wider text-[#0A2129]">
                Katalog Pola Ruang <span className="accent font-bold"><em>Unggulan</em></span>
              </span>
              <svg className="w-5 h-5 text-[#00FFAF] fill-current" viewBox="0 0 24 24">
                <path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-8">
        {/* Navigation arrows for direct manual scroll */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between mb-4 z-20">
          <span className="text-xs font-mono text-[#0A2129]/50 uppercase tracking-widest font-semibold">
            [GESER / SCROLL HORIZONTAL]
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-[#0A2129]/20 hover:border-[#0A2129] bg-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-[#0A2129]" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-[#0A2129]/20 hover:border-[#0A2129] bg-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-[#0A2129]" />
            </button>
          </div>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 transition-transform duration-100 ease-out will-change-transform pb-4 overflow-x-auto lg:overflow-visible no-scrollbar"
          style={{
            transform: `translate3d(-${translateX}%, 0, 0)`,
          }}
        >
          {/* Intro Box matching MKVision .hbox-intro */}
          <div className="w-[340px] sm:w-[420px] shrink-0 bg-[#0A2129] text-white rounded-[28px] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#00FFAF] block mb-3 font-semibold">
                RTRW BONE BOLANGO 2021–2041
              </span>
              <h2 className="font-onest font-black text-3xl sm:text-4xl text-white mb-2 leading-tight">
                Pola Ruang <span className="text-[#00FFAF]"><em>Wilayah</em></span>{' '}
                <span className="inline-block align-middle font-mono text-xs font-bold text-[#0A2129] bg-[#00FFAF] px-2.5 py-0.5 rounded-full ml-1">
                  KABUPATEN
                </span>
              </h2>
              <p className="text-sm text-white/70 font-light leading-relaxed mt-4">
                Distribusi resmi peruntukan ruang daratan, kawasan lindung taman nasional, lahan pangan abadi (LP2B), dan wisata bahari se-Kabupaten Bone Bolango.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onSelectZone(SPATIAL_ZONES[0]);
                }}
                className="mkv-btn mkv-btn-green w-full justify-between"
              >
                <span className="btn-text">
                  Katalog Lengkap Zonasi
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 47 47" fill="none">
                    <path d="M18.97 40.29l5.98-5.99c3.72-3.72 5.58-5.58 6.28-7.73a9.1 9.1 0 000-5.81c-.7-2.15-2.56-4.01-6.28-7.73l-5.98-5.98" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="btn-text-hover" aria-hidden="true">
                  Katalog Lengkap Zonasi
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 47 47" fill="none">
                    <path d="M18.97 40.29l5.98-5.99c3.72-3.72 5.58-5.58 6.28-7.73a9.1 9.1 0 000-5.81c-.7-2.15-2.56-4.01-6.28-7.73l-5.98-5.98" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Individual Spatial Zone Project Cards matching MKVision .hbox-card */}
          {SPATIAL_ZONES.map((zone, idx) => (
            <div
              key={zone.id}
              onClick={() => {
                soundEffects.playClick();
                onSelectZone(zone);
              }}
              className="w-[320px] sm:w-[390px] shrink-0 bg-white border border-[#0A2129]/10 hover:border-[#00FFAF] rounded-[28px] overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden bg-[#0A2129]">
                <img
                  src={zone.imageUrl}
                  alt={zone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Code Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-[#0A2129]/80 backdrop-blur-md text-[#00FFAF] font-mono text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                    {zone.code}
                  </span>
                  <span className="bg-white/90 backdrop-blur-md text-[#0A2129] font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {zone.categoryLabel}
                  </span>
                </div>

                {/* Bottom Intensity Pill */}
                <div className="absolute bottom-3 left-4 right-4 bg-black/70 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 flex items-center justify-between text-white font-mono text-xs">
                  <div>
                    <span className="text-white/50 text-[9px] block">KDB</span>
                    <span className="font-bold text-[#00FFAF]">{zone.kdbMax}%</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-[9px] block">KLB</span>
                    <span className="font-bold">{zone.klbMax}</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-[9px] block">KDH</span>
                    <span className="font-bold">{zone.kdhMin}%</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-[9px] block">GSB</span>
                    <span className="font-bold">{zone.gsbMin}m</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#0A2129]/40 uppercase tracking-wider block mb-1">
                    PROJECT #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-onest font-bold text-xl text-[#0A2129] group-hover:text-[#00a874] transition-colors mb-2">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-[#5d6f76] line-clamp-2 leading-relaxed">
                    {zone.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#0A2129]/10 flex items-center justify-between text-xs font-semibold text-[#0A2129]">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Detail Regulasi
                    <ArrowRight className="w-3.5 h-3.5 text-[#00a874]" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playClick();
                      onOpenKkprForZone(zone.code);
                    }}
                    className="px-3 py-1 rounded-full bg-[#0A2129] hover:bg-[#00FFAF] text-white hover:text-[#0A2129] font-mono text-[11px] transition-colors cursor-pointer"
                  >
                    Uji Izin
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
