import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';
import { Volume2, VolumeX, Layers, Compass, FileCheck2, Calculator, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenKkprCalc: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenKkprCalc }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundEffects.setMuted(nextState);
    if (!nextState) {
      soundEffects.playClick();
    }
  };

  const navLinks = [
    { label: 'Zonasi Pola Ruang', href: '#zonasi' },
    { label: 'Simulasi GIS Kaveling', href: '#gis-map' },
    { label: 'Alur Perizinan', href: '#alur' },
    { label: 'Regulasi & Standar', href: '#regulasi' },
    { label: 'FAQ Penataan Ruang', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 rounded-full px-5 py-2.5 ${
          scrolled
            ? 'bg-[#090b11]/90 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
            : 'bg-[#07090e]/60 backdrop-blur-sm border border-white/10'
        }`}
      >
        {/* Brand identity */}
        <a
          href="#"
          onClick={() => soundEffects.playClick()}
          className="flex items-center gap-3 group cursor-pointer"
          data-cursor="HOME"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38ef7d] to-[#11998e] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(56,239,125,0.4)]">
            <div className="w-full h-full bg-[#07090e] rounded-[6px] flex items-center justify-center">
              <Compass className="w-4 h-4 text-[#38ef7d] group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne font-extrabold text-sm tracking-wider uppercase text-white">
                SITARU<span className="text-[#38ef7d]">.</span>VISION
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-[#38ef7d] border border-[#38ef7d]/30 px-1.5 py-0.2 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38ef7d] animate-pulse" />
                RTRW 2024–2044
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => soundEffects.playHover()}
              onClick={() => soundEffects.playClick()}
              className="text-xs uppercase tracking-wider font-medium text-white/70 hover:text-white transition-colors relative py-1 group"
              data-cursor="GO"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#38ef7d] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-[#38ef7d]/50 bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            title={isMuted ? 'Aktifkan Efek Suara' : 'Senyapkan Efek Suara'}
            data-cursor="SOUND"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/50" /> : <Volume2 className="w-3.5 h-3.5 text-[#38ef7d]" />}
          </button>

          {/* KKPR Calculator trigger button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenKkprCalc();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38ef7d] hover:bg-[#2ecc71] text-[#06080b] font-medium text-xs tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(56,239,125,0.3)] hover:shadow-[0_0_25px_rgba(56,239,125,0.5)] cursor-pointer"
            data-cursor="SIMULATE"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="font-semibold">Simulasi KKPR</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto bg-[#0a0d14]/95 border border-white/15 rounded-2xl p-5 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  soundEffects.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-white/80 hover:text-[#38ef7d] py-2 border-b border-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                soundEffects.playClick();
                setMobileMenuOpen(false);
                onOpenKkprCalc();
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#38ef7d] text-[#06080b] font-bold text-xs uppercase tracking-wider"
            >
              <Calculator className="w-4 h-4" />
              Buka Kalkulator KKPR
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
