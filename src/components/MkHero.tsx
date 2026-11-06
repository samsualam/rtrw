import React, { useState, useEffect } from 'react';
import { MkHeroCanvas } from './MkHeroCanvas';
import { soundEffects } from '../utils/audio';

interface MkHeroProps {
  onOpenKkprCalc: () => void;
  onOpenGisMap: () => void;
}

export const MkHero: React.FC<MkHeroProps> = ({ onOpenKkprCalc, onOpenGisMap }) => {
  const [rotIndex, setRotIndex] = useState(0);

  const rotations = [
    { num: '15', label: 'Pola Ruang RTRW' },
    { num: '48', label: 'Sub-Zona RDTR Presisi' },
    { num: '100%', label: 'Terintegrasi OSS-RBA' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRotIndex((i) => (i + 1) % rotations.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [rotations.length]);

  return (
    <section
      id="mkh"
      aria-label="Introductie"
      className="relative min-h-screen pt-32 sm:pt-40 pb-20 px-4 sm:px-8 overflow-hidden bg-[#F8FAF5]"
    >
      {/* 3D WebGL Torus/Tunnel Canvas matching MKVision #mkhGl */}
      <MkHeroCanvas />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between min-h-[75vh]">
        {/* Main Hero Copy matching MKVision .hero-copy */}
        <div className="max-w-4xl">
          <h1 className="font-onest font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#0A2129] leading-[0.92] tracking-tighter mb-10 sm:mb-14">
            <span className="block">
              <span className="accent font-extrabold">Tata Ruang</span>
            </span>
            <span className="block font-bold mt-1">
              pasti &amp; <em className="font-light italic text-[#147A86]">terarah</em>
            </span>
          </h1>

          {/* Hero Bottom Row matching MKVision .hero-bottom-row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-[#0A2129]/10 pt-8 sm:pt-10">
            {/* Rotating Circle Counter matching MKVision .circle-count */}
            <div className="md:col-span-5 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0A2129] text-white flex flex-col items-center justify-center font-mono font-bold text-lg sm:text-xl shadow-lg shrink-0 border border-white/10">
                <span className="text-[#00FFAF] transition-all duration-300">
                  {rotations[rotIndex].num}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#5d6f76] block">
                  INDIKATOR AKTIF
                </span>
                <span className="font-onest font-bold text-base sm:text-lg text-[#0A2129]">
                  {rotations[rotIndex].label}
                </span>
              </div>
            </div>

            {/* Right Hero Description & Action matching MKVision .hero-right */}
            <div className="md:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="font-onest text-sm sm:text-base text-[#5d6f76] max-w-sm leading-relaxed">
                Sistem informasi spasial, validasi intensitas kaveling, dan perizinan berusaha KKPR yang cepat, akurat, dan transparan.
              </p>

              <a
                href="#projecten"
                onClick={() => soundEffects.playClick()}
                className="mkv-btn mkv-btn-fill shrink-0"
              >
                <span className="btn-text">
                  Lihat Pola Ruang
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 47 47" fill="none">
                    <path
                      d="M18.97 40.29l5.98-5.99c3.72-3.72 5.58-5.58 6.28-7.73a9.1 9.1 0 000-5.81c-.7-2.15-2.56-4.01-6.28-7.73l-5.98-5.98"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="btn-text-hover" aria-hidden="true">
                  Lihat Pola Ruang
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 47 47" fill="none">
                    <path
                      d="M18.97 40.29l5.98-5.99c3.72-3.72 5.58-5.58 6.28-7.73a9.1 9.1 0 000-5.81c-.7-2.15-2.56-4.01-6.28-7.73l-5.98-5.98"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Narrative Block matching MKVision .mkh-intro */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[#0A2129]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <p className="lg:col-span-8 font-onest text-base sm:text-xl text-[#0A2129]/80 leading-relaxed font-normal">
            Kami mengintegrasikan perencanaan tata ruang wilayah (RTRW &amp; RDTR), analisis intensitas kaveling (KDB, KLB, KDH, GSB), dan perizinan KKPR ke dalam platform satu pintu yang transparan dan berkepastian hukum.
          </p>

          <div className="lg:col-span-4 flex flex-wrap gap-3">
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenKkprCalc();
              }}
              className="mkv-btn mkv-btn-green"
            >
              <span className="btn-text">Simulasi Mandiri KKPR</span>
              <span className="btn-text-hover" aria-hidden="true">Simulasi Mandiri KKPR</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenGisMap();
              }}
              className="mkv-btn"
            >
              <span className="btn-text">Eksplorasi Peta GIS</span>
              <span className="btn-text-hover" aria-hidden="true">Eksplorasi Peta GIS</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
