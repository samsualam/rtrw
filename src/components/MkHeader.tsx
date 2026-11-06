import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';
import { Compass, X, ArrowUpRight } from 'lucide-react';

interface MkHeaderProps {
  onOpenKkprCalc: () => void;
  onOpenGisMap: () => void;
  onOpenCekItr?: () => void;
}

export const MkHeader: React.FC<MkHeaderProps> = ({ onOpenKkprCalc, onOpenGisMap, onOpenCekItr }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-4 sm:py-6 ${
          scrolled
            ? 'bg-[#F8FAF5]/90 backdrop-blur-md border-b border-[#0A2129]/10 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo matching MKVision Studio */}
          <a
            href="#"
            onClick={() => soundEffects.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-full bg-[#0A2129] flex items-center justify-center text-[#00FFAF] shadow-sm">
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-onest font-black text-lg sm:text-xl tracking-tight text-[#0A2129]">
                SITARU <span className="font-normal text-[#5d6f76]">Vision Studio</span>
              </span>
            </div>
          </a>

          {/* Header Action Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Cek ITR Direct Button */}
            {onOpenCekItr && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenCekItr();
                }}
                className="inline-flex items-center gap-1.5 bg-[#00FFAF] hover:bg-[#00e59d] text-[#0A2129] font-onest font-black text-xs px-4 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#0A2129] animate-pulse" />
                <span>CEK ITR</span>
              </button>
            )}

            {/* Direct action button matching MKVision .btn.btn--fill.hb */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenKkprCalc();
              }}
              className="mkv-btn mkv-btn-fill text-xs sm:text-sm font-semibold"
            >
              <span className="btn-text">
                Uji Kaveling KKPR
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
                Uji Kaveling KKPR
                <svg className="w-4 h-4 ml-1" viewBox="0 0 47 47" fill="none">
                  <path
                    d="M18.97 40.29l5.98-5.99c3.72-3.72 5.58-5.58 6.28-7.73a9.1 9.1 0 000-5.81c-.7-2.15-2.56-4.01-6.28-7.73l-5.98-5.98"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            {/* Hamburger Button matching MKVision 2-bar menu button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setMenuOpen(!menuOpen);
              }}
              className="w-11 h-11 rounded-full border border-[#0A2129]/20 hover:border-[#0A2129] bg-white flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              aria-label="Toggle menu"
            >
              <span className="w-5 h-[2px] bg-[#0A2129] rounded-full transition-transform duration-300" />
              <span className="w-3.5 h-[2px] bg-[#0A2129] rounded-full transition-transform duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay matching MKVision */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A2129] text-white flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-onest font-black text-xl text-white">
              SITARU <span className="text-[#00FFAF]">Vision Studio</span>
            </span>
            <button
              onClick={() => {
                soundEffects.playClick();
                setMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-[#00FFAF] flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="my-auto py-8">
            <ul className="space-y-4 sm:space-y-6">
              {onOpenCekItr && (
                <li>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setMenuOpen(false);
                      onOpenCekItr();
                    }}
                    className="font-onest font-black text-3xl sm:text-5xl text-[#00FFAF] hover:text-[#00e59d] transition-colors inline-flex items-center gap-4 text-left cursor-pointer"
                  >
                    <span>Cek ITR (Peta Spasial Bone Bolango)</span>
                    <span className="font-mono text-xs text-[#0A2129] bg-[#00FFAF] px-2.5 py-0.5 rounded-full font-bold">
                      LEAFLET PETA
                    </span>
                  </button>
                </li>
              )}
              {[
                { label: 'Beranda', href: '#mkh' },
                { label: 'Pola Ruang RTRW', href: '#projecten', badge: '15' },
                { label: 'Layanan Zonasi & RDTR', href: '#diensten' },
                { label: 'Alur Perizinan KKPR', href: '#werkwijze' },
                { label: 'Keunggulan Sistem', href: '#keunggulan' },
                { label: 'Mitra & Regulasi', href: '#regulasi' },
                { label: 'FAQ Penataan Ruang', href: '#faq' },
                { label: 'Kontak & Konsultasi', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => {
                      soundEffects.playClick();
                      setMenuOpen(false);
                    }}
                    className="font-onest font-black text-3xl sm:text-5xl hover:text-[#00FFAF] transition-colors inline-flex items-center gap-4"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="font-mono text-xs text-[#0A2129] bg-[#00FFAF] px-2.5 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/50">
            <span>SISTEM INFORMASI TATA RUANG &amp; PERIZINAN 2021–2041</span>
            <button
              onClick={() => {
                soundEffects.playClick();
                setMenuOpen(false);
                onOpenGisMap();
              }}
              className="text-[#00FFAF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Peta Tematik GIS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
