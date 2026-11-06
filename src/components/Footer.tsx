import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';
import { ArrowUp, Compass, Shield, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  onOpenKkprCalc: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenKkprCalc }) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundEffects.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050608] relative z-10 pt-20 pb-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top interactive CTA section inside footer */}
        <div className="bg-gradient-to-r from-[#0d121f] via-[#090b12] to-[#0d121f] border border-white/15 rounded-3xl p-8 sm:p-14 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#38ef7d] animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#38ef7d] font-bold">
                LAYANAN KONSULTASI SPASIAL
              </span>
            </div>
            <h3 className="font-syne font-black text-2xl sm:text-4xl text-white mb-3">
              Verifikasi Kaveling Anda Sekarang
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Dapatkan rekomendasi intensitas ruang, kelayakan izin berusaha KKPR, dan pra-kajian Persetujuan Bangunan Gedung (PBG) dalam hitungan menit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenKkprCalc();
              }}
              className="px-6 py-3.5 rounded-full bg-[#38ef7d] hover:bg-[#2ecc71] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(56,239,125,0.4)] cursor-pointer"
              data-cursor="CALC"
            >
              Mulai Simulasi Mandiri
            </button>
            <a
              href="#gis-map"
              onClick={() => soundEffects.playClick()}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Lihat Peta Spasial
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#38ef7d] flex items-center justify-center text-black">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-syne font-black text-base uppercase text-white tracking-wider">
                SITARU.VISION
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-light mb-4">
              Sistem Informasi Spasial Zonasi RTRW & Validasi Kelayakan Pemanfaatan Ruang Terintegrasi Berbasis Geodatabase Presisi Tinggi.
            </p>
            <div className="font-mono text-xs text-[#38ef7d] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38ef7d] animate-pulse" />
              <span>JAKARTA: {timeStr || 'LIVE'}</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4">
              Modul Sistem
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-mono">
              <li><a href="#zonasi" className="hover:text-white transition-colors">Katalog Pola Ruang</a></li>
              <li><a href="#gis-map" className="hover:text-white transition-colors">Peta Radar Kaveling</a></li>
              <li><a href="#alur" className="hover:text-white transition-colors">Alur Perizinan KKPR</a></li>
              <li><a href="#regulasi" className="hover:text-white transition-colors">Regulasi RTRW 2024–2044</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Pusat Bantuan & FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4">
              Integrasi Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-mono">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span>OSS-RBA BKPM</span>
                <ExternalLink className="w-3 h-3 text-white/30" />
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span>SIMBG PUPR</span>
                <ExternalLink className="w-3 h-3 text-white/30" />
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span>Gistaru Kementerian ATR/BPN</span>
                <ExternalLink className="w-3 h-3 text-white/30" />
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span>Ina-Geoportal BIG</span>
                <ExternalLink className="w-3 h-3 text-white/30" />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4">
              Geodetic Metadata
            </h4>
            <div className="space-y-2 text-xs font-mono text-white/50">
              <p>CRS: EPSG:3857 / WGS84</p>
              <p>PROYEKSI: UTM Zone 49S</p>
              <p>DATUM VERTIKAL: MSL Geoid EGM2008</p>
              <p>SKALA DASAR: 1:5.000 RDTR</p>
            </div>
          </div>
        </div>

        {/* Massive MKVision Signature Brand Text at Bottom */}
        <div className="pt-12 pb-6">
          <div className="font-syne font-black text-[12vw] sm:text-[10vw] leading-[0.8] text-white/5 select-none tracking-tighter uppercase text-center hover:text-white/10 transition-colors">
            SITARU VISION
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40">
          <p>© 2026 SITARU VISION. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#38ef7d] transition-colors cursor-pointer"
            data-cursor="TOP"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
