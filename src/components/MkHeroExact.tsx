import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';
import { ChevronRight, Settings, Check } from 'lucide-react';

interface MkHeroExactProps {
  onOpenKkprCalc: () => void;
  onOpenGisMap: () => void;
  onOpenCekItr: () => void;
}

export const MkHeroExact: React.FC<MkHeroExactProps> = ({
  onOpenKkprCalc,
  onOpenGisMap,
  onOpenCekItr,
}) => {
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#F8FAF5] text-[#0A2129] flex flex-col justify-between px-6 sm:px-12 pt-8 pb-10 overflow-hidden select-none">
      {/* Subtle background geometric prism wireframes matching MKVision */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft atmospheric radial glows */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#00FFAF]/10 blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-[#147A86]/10 blur-[150px]" />

        {/* Angled rounded rectangle wireframes in background matching screenshot */}
        <div
          className="absolute right-[-10%] top-[6%] w-[720px] h-[720px] rounded-[75px] border border-[#147A86]/12 pointer-events-none"
          style={{ transform: 'rotate(-18deg)' }}
        />
        <div
          className="absolute right-[-5%] top-[12%] w-[620px] h-[620px] rounded-[65px] border border-[#00DF8F]/20 pointer-events-none"
          style={{ transform: 'rotate(-26deg)' }}
        />
        <div
          className="absolute right-[6%] top-[2%] w-[500px] h-[500px] rounded-[55px] border border-[#147A86]/10 pointer-events-none"
          style={{ transform: 'rotate(-12deg)' }}
        />
      </div>

      {/* Fixed Right Edge Ribbon Badge ("W. Nominee" / "RTRW 2024") */}
      <a
        href="#regulasi"
        onClick={() => soundEffects.playClick()}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#35a89c] hover:bg-[#2b9489] text-white py-5 px-3 rounded-l-xl flex flex-col items-center gap-3 shadow-md transition-colors cursor-pointer group"
      >
        <span className="font-onest font-black text-base tracking-tighter">W.</span>
        <span
          className="font-onest text-[11px] font-semibold tracking-wider uppercase text-white/95"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          RTRW 2024
        </span>
      </a>

      {/* TOP NAVIGATION BAR MATCHING SCREENSHOT EXACTLY */}
      <header className="relative z-20 flex items-center justify-between w-full">
        {/* Left: /Sitaru.bonebolango */}
        <a
          href="#"
          onClick={() => soundEffects.playClick()}
          className="flex items-center font-onest font-black text-2xl sm:text-3xl tracking-tight text-[#0A2129] group cursor-pointer"
        >
          <span className="text-[#00DF8F] font-black text-3xl sm:text-4xl mr-1">/</span>
          <span>Sitaru</span>
          <span className="font-normal text-[#5d6f76]">.bonebolango</span>
        </a>

        {/* Right Action Buttons matching screenshot */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Direct Menu Button: CEK ITR (PETA BONE BOLANGO) */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenCekItr();
            }}
            className="inline-flex items-center gap-2 bg-[#00FFAF] hover:bg-[#00e59d] text-[#0A2129] font-onest font-black text-xs sm:text-xs tracking-wider uppercase px-4 sm:px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer group hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="w-2 h-2 rounded-full bg-[#0A2129] animate-pulse" />
            <span>CEK ITR</span>
            <span className="hidden md:inline text-[10px] font-mono font-bold bg-[#0A2129]/15 px-1.5 py-0.5 rounded text-[#0A2129]">
              PETA
            </span>
          </button>

          {/* Button: MENU (dark pill with two dots) */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMenuOpen(!menuOpen);
            }}
            className="inline-flex items-center gap-2.5 bg-[#0A2129] hover:bg-[#12313b] text-white font-onest font-bold text-xs tracking-wider uppercase pl-5 pr-2 py-2 rounded-full shadow-md transition-all cursor-pointer"
          >
            <span>MENU</span>
            <div className="w-7 h-7 rounded-full bg-[#16363f] flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Dropdown */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A2129] text-white flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center font-onest font-black text-2xl sm:text-3xl text-white">
              <span className="text-[#00DF8F] mr-1">/</span>
              <span>Sitaruvision</span>
              <span className="font-light text-white/50">.studio</span>
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                setMenuOpen(false);
              }}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          <nav className="my-auto py-6">
            <ul className="space-y-4 sm:space-y-5">
              {[
                { label: 'Cek ITR (Peta Spasial Bone Bolango)', isCekItr: true, badge: 'PETA LEAFLET', highlight: true },
                { label: 'Beranda (Home)', href: '#mkh' },
                { label: 'Pola Ruang (Projecten)', href: '#projecten', badge: '15' },
                { label: 'Pilar RTRW (Diensten)', href: '#diensten' },
                { label: 'Perizinan KKPR & PBG (Werkwijze)', href: '#perizinan' },
                { label: 'Karakteristik RTRW', href: '#keunggulan' },
                { label: 'Konsultasi & Kontak', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  {item.isCekItr ? (
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setMenuOpen(false);
                        onOpenCekItr();
                      }}
                      className="font-onest font-black text-3xl sm:text-5xl text-[#00FFAF] hover:text-[#00e59d] transition-colors inline-flex items-center gap-4 text-left cursor-pointer"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="font-mono text-xs text-[#0A2129] bg-[#00FFAF] px-2.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => {
                        soundEffects.playClick();
                        setMenuOpen(false);
                      }}
                      className="font-onest font-black text-3xl sm:text-5xl hover:text-[#00DF8F] transition-colors inline-flex items-center gap-4"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="font-mono text-xs text-[#0A2129] bg-[#00DF8F] px-2.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
            <span>SISTEM INFORMASI ZONASI RTRW &amp; PERIZINAN SPASIAL</span>
            <button
              onClick={() => {
                soundEffects.playClick();
                setMenuOpen(false);
                onOpenGisMap();
              }}
              className="text-[#00DF8F] hover:underline"
            >
              Buka Radar GIS Kaveling →
            </button>
          </div>
        </div>
      )}

      {/* HERO MAIN TITLE & ICONIC DIAGONAL GREEN PILLAR */}
      <div className="relative z-10 my-auto pt-8 sm:pt-12 pb-6 sm:pb-8 max-w-7xl w-full mx-auto">
        {/* THE GIANT VIVID GREEN DIAGONAL PILLAR / SLASH ELEMENT IN THE BACKGROUND - SHIFTED TO ANCHOR BONE BOLANGO */}
        <div
          className="absolute z-0 pointer-events-none rounded-[40px] bg-gradient-to-b from-[#00FFAF] to-[#00DF8F] shadow-[0_15px_60px_rgba(0,223,143,0.35)]"
          style={{
            width: 'clamp(80px, 8vw, 130px)',
            height: 'clamp(360px, 55vh, 600px)',
            left: 'clamp(42%, 48vw, 58%)',
            top: 'clamp(40px, 7vh, 85px)',
            transform: 'skewX(-22deg)',
          }}
        />

        {/* BARIS 1: Sistem Informasi (Warna hijau neon) */}
        <h1 className="relative z-10 font-onest font-bold tracking-[-0.03em] text-[#00DF8F] text-[clamp(32px,5.4vw,80px)] leading-[1.05] select-text">
          Sistem Informasi
        </h1>

        {/* BARIS 2: tata ruang dan perizinan (Bold black sans-serif) */}
        <h1 className="relative z-10 font-onest font-black tracking-[-0.03em] text-[#0A2129] text-[clamp(32px,5.4vw,80px)] leading-[1.05] mt-1 sm:mt-2">
          tata ruang dan perizinan
        </h1>

        {/* BARIS 3: kab. Bone Bolango (Sans-serif + Serif Italic anggun) */}
        <h1 className="relative z-10 font-onest font-black tracking-[-0.03em] text-[#0A2129] text-[clamp(32px,5.4vw,80px)] leading-[1.05] flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 mt-1 sm:mt-2">
          <span>kab.</span>
          <span
            className="font-spectral italic font-normal tracking-[-0.03em] text-[#0A2129]"
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            Bone Bolango
          </span>
        </h1>
      </div>

      {/* BOTTOM ROW MATCHING SCREENSHOT EXACTLY */}
      <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-4">
        {/* Left: 15 Pola Ruang live */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#0A2129] text-white flex items-center justify-center font-onest font-bold text-base shadow-sm shrink-0">
            15
          </div>
          <span className="font-onest font-medium text-sm sm:text-base text-[#0A2129]">
            Pola Ruang Bone Bolango
          </span>
        </div>

        {/* Center: Floating Cookie/System Status Notification matching screenshot */}
        {!cookieAccepted && (
          <div className="hidden lg:flex items-center gap-3 bg-[#0A2129] text-white py-2 pl-4 pr-3 rounded-full text-xs shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="font-onest text-white/90">
              RTRW &amp; RDTR Kab. Bone Bolango Terverifikasi
            </span>
            <div className="w-7 h-7 rounded-full bg-[#16363f] flex items-center justify-center text-[#00DF8F]">
              <Settings className="w-3.5 h-3.5" />
            </div>
            <button
              onClick={() => {
                soundEffects.playClick();
                setCookieAccepted(true);
              }}
              className="text-[#00DF8F] hover:text-[#00FFAF] font-bold font-onest transition-colors cursor-pointer pl-1"
            >
              Terverifikasi
            </button>
          </div>
        )}

        {/* Right: Subtitle paragraph & Bekijk projecten green button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          <p className="font-onest font-normal text-xs sm:text-sm text-[#0A2129] max-w-xs leading-relaxed">
            Sistem informasi spasial tata ruang dan perizinan terpadu Kabupaten Bone Bolango
          </p>

          <a
            href="#projecten"
            onClick={() => soundEffects.playClick()}
            className="inline-flex items-center gap-2.5 bg-[#00DF8F] hover:bg-[#00FFAF] text-[#0A2129] font-onest font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-[0_4px_20px_rgba(0,223,143,0.35)] hover:shadow-[0_4px_25px_rgba(0,223,143,0.5)] transition-all cursor-pointer shrink-0"
          >
            <span>Bekijk projecten</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  );
};
