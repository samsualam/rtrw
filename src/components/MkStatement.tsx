import React from 'react';
import { soundEffects } from '../utils/audio';

export const MkStatement: React.FC = () => {
  return (
    <section id="rtrw" className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#F8FAF5] border-t border-[#0A2129]/10 overflow-hidden">
      {/* Official Kabupaten Bone Bolango Emblem in background with iconic colors visible as watermark */}
      <div className="absolute right-0 sm:right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        {/* Soft ambient backlight accentuating the iconic merah jambu and gold colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FE1592]/12 via-[#00FFAF]/8 to-transparent rounded-full blur-3xl transform scale-125 pointer-events-none" />
        <img
          src="/logo-bone-bolango.png"
          alt="Lambang Kabupaten Bone Bolango"
          className="relative w-64 sm:w-80 md:w-[420px] lg:w-[500px] xl:w-[560px] max-w-none opacity-[0.30] sm:opacity-[0.34] md:opacity-[0.38] lg:opacity-[0.40] object-contain filter saturate-[1.2] contrast-[1.05] pointer-events-none transition-all duration-700"
          loading="lazy"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#5d6f76] block mb-6 font-semibold">
          RENCANA TATA RUANG WILAYAH
        </span>

        <p className="font-onest font-medium text-3xl sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] text-[#0A2129] leading-[1.2] sm:leading-[1.22] md:leading-[1.22] tracking-tight max-w-4xl lg:max-w-5xl">
          Berdasarkan Perda Nomor 5 Tahun 2021 tentang RTRW Kabupaten Bone Bolango 2021–2041, pemanfaatan ruang di 18 kecamatan diarahkan untuk menjaga kawasan konservasi seluas 55,5% wilayah serta melindungi lahan pangan produktif demi{' '}
          <span className="accent font-bold">pembangunan berkelanjutan</span>.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-12 sm:mt-16">
          <a
            href="#diensten"
            onClick={() => soundEffects.playClick()}
            className="mkv-btn mkv-btn-fill"
          >
            <span className="btn-text">
              Lihat Layanan Tata Ruang
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
              Lihat Layanan Tata Ruang
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

          <a
            href="#regulasi"
            onClick={() => soundEffects.playClick()}
            className="mkv-btn"
          >
            <span className="btn-text">
              Dasar Regulasi &amp; Standar
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
              Dasar Regulasi &amp; Standar
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
    </section>
  );
};
