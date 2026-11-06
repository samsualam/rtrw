import React from 'react';
import { soundEffects } from '../utils/audio';
import { ArrowUp, Plus, ArrowUpRight, Activity } from 'lucide-react';

interface MkFooterProps {
  onOpenKkprCalc: () => void;
  onOpenGisMap: () => void;
  onOpenCekItr?: () => void;
}

export const MkFooter: React.FC<MkFooterProps> = ({ onOpenKkprCalc, onOpenGisMap, onOpenCekItr }) => {
  const scrollToTop = () => {
    soundEffects.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A2129] text-white pt-20 pb-12 px-4 sm:px-8 relative overflow-hidden theme-dark">
      <div className="max-w-7xl mx-auto">
        {/* Giant Logo matching MKVision .rf-logo */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="font-onest font-black text-[8vw] sm:text-[6.5vw] leading-none text-white tracking-tighter uppercase select-none hover:text-[#00FFAF] transition-colors">
            SITARU BONE BOLANGO
          </div>
        </div>

        {/* 3 Footer Cards matching MKVision .rf-cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Navigation (.rf-nav) */}
          <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-[28px] p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#00FFAF] block mb-4 font-semibold">
                RTRW 18 KECAMATAN
              </span>
              <ul className="space-y-3 font-onest font-medium text-base text-white/80">
                {onOpenCekItr && (
                  <li>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        onOpenCekItr();
                      }}
                      className="text-[#00FFAF] font-bold hover:underline flex items-center gap-2 cursor-pointer"
                    >
                      <span>Cek ITR (Peta Spasial Leaflet)</span>
                      <span className="text-[10px] font-mono bg-[#00FFAF] text-[#0A2129] px-2 py-0.5 rounded-full">BARU</span>
                    </button>
                  </li>
                )}
                <li><a href="#mkh" className="hover:text-[#00FFAF] transition-colors">Beranda</a></li>
                <li><a href="#projecten" className="hover:text-[#00FFAF] transition-colors">Katalog Pola Ruang Wilayah</a></li>
                <li><a href="#diensten" className="hover:text-[#00FFAF] transition-colors">Pilar Penataan Ruang</a></li>
                <li><a href="#perizinan" className="hover:text-[#00FFAF] transition-colors">Alur Perizinan KKPR &amp; PBG</a></li>
                <li><a href="#faq" className="hover:text-[#00FFAF] transition-colors">Pertanyaan Umum RTRW</a></li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/40">
              <span className="hover:text-white transition-colors cursor-pointer">Perda RTRW 2021–2041</span>
              <span className="hover:text-white transition-colors cursor-pointer">Data Geospasial</span>
            </div>
          </div>

          {/* Card 2: Contact & Uptime (.rf-mid) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <a
              href="mailto:tataruang@bonebolangokab.go.id"
              className="bg-white/5 border border-white/10 hover:border-[#00FFAF] rounded-[24px] p-6 flex items-center justify-between text-white font-mono text-sm transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-4 h-4 text-[#00FFAF]" />
                <span>tataruang@bonebolangokab.go.id</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#00FFAF] transition-colors" />
            </a>

            <a
              href="tel:0435821234"
              className="bg-white/5 border border-white/10 hover:border-[#00FFAF] rounded-[24px] p-6 flex items-center justify-between text-white font-mono text-sm transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-4 h-4 text-[#00FFAF]" />
                <span>(0435) 821-234 (Dinas PUPR)</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#00FFAF] transition-colors" />
            </a>

            {/* Uptime Box matching MKVision .rf-start */}
            <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-[#00FFAF] flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FFAF] animate-pulse" />
                  Sistem Aktif &amp; Terhubung OSS
                </p>
                <p className="font-onest font-bold text-lg text-white">
                  Geodatabase <span className="text-grad">live 24/7</span>
                </p>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenGisMap();
                }}
                className="mt-6 flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-colors cursor-pointer border border-white/10"
              >
                <span>Buka Radar Spasial GIS</span>
                <Activity className="w-4 h-4 text-[#00FFAF]" />
              </button>
            </div>
          </div>

          {/* Card 3: Social, Copyright & Back to Top (.rf-eco) */}
          <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-[28px] p-8 flex flex-col justify-between">
            <div>
              <p className="font-onest font-bold text-xl text-white mb-2">
                SITARU Vision Studio
              </p>
              <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                Platform intelijen geospasial satu pintu untuk validasi Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR) dan Persetujuan Bangunan Gedung (PBG).
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/40">
              <span>SITARU © 2026</span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#00FFAF] flex items-center justify-center text-white cursor-pointer hover:bg-white/5 transition-all"
                aria-label="Kembali ke atas"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
