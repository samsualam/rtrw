import React from 'react';
import { soundEffects } from '../utils/audio';
import { Calculator, MessageSquare, ShieldCheck } from 'lucide-react';

interface MkCtaProps {
  onOpenKkprCalc: () => void;
}

export const MkCta: React.FC<MkCtaProps> = ({ onOpenKkprCalc }) => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F8FAF5]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0A2129] text-white rounded-[36px] p-8 sm:p-16 lg:p-20 relative overflow-hidden shadow-2xl theme-dark">
          {/* Radiant decorative background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FFAF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            {/* Live Indicator matching MKVision .cta-live */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-8 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00FFAF] animate-pulse" />
              <span className="text-[#00FFAF] font-bold">Layanan Verifikasi Aktif</span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">08:00 - 18:00 WIB</span>
            </div>

            {/* Title matching MKVision */}
            <h2 className="font-onest font-black text-4xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight mb-6">
              Kesesuaian ruang <span className="accent font-extrabold"><em>Bone Bolango</em></span>.
            </h2>

            <p className="font-onest text-base sm:text-lg text-white/70 font-light leading-relaxed mb-10">
              Pengecekan mandiri peruntukan kaveling Anda di 18 kecamatan Kabupaten Bone Bolango berdasarkan peta pola ruang resmi Perda RTRW 2021–2041.
            </p>

            {/* Action Button matching MKVision .cta-btn */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenKkprCalc();
                }}
                className="mkv-btn mkv-btn-green text-sm sm:text-base py-4 px-8"
              >
                <span className="btn-text">
                  Uji Kesesuaian Pola Ruang RTRW
                  <Calculator className="w-4 h-4 ml-1" />
                </span>
                <span className="btn-text-hover" aria-hidden="true">
                  Uji Kesesuaian Pola Ruang RTRW
                  <Calculator className="w-4 h-4 ml-1" />
                </span>
              </button>
            </div>

            <p className="font-mono text-xs text-white/40 mt-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00FFAF]" />
              <span>Hasil telaah instan · Sesuai ketentuan RDTR &amp; PP No. 21 Tahun 2021</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
