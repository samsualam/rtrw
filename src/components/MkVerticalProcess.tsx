import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';
import { CheckCircle2, ChevronRight, FileText, Calculator, ShieldCheck, ArrowRight } from 'lucide-react';

interface MkVerticalProcessProps {
  onOpenKkprCalc?: () => void;
}

export const MkVerticalProcess: React.FC<MkVerticalProcessProps> = ({ onOpenKkprCalc }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const steps = [
    {
      num: '01',
      sideSub: 'Batas 18 Kecamatan',
      sideTitle: 'Geotagging Kaveling',
      lead: 'Ekstraksi koordinat poligon bidang tanah di wilayah Kabupaten Bone Bolango.',
      sub: 'Memetakan lokasi kaveling pemohon ke dalam basis data geospasial resmi Perda RTRW 2021–2041 di tingkat kecamatan dan desa.',
      bullets: ['Ekstraksi koordinat geografis WGS84', 'Identifikasi batas administrasi desa/kecamatan', 'Pemeriksaan status kepemilikan tanah'],
    },
    {
      num: '02',
      sideSub: 'Hutan Konservasi & Sungai',
      sideTitle: 'Audit Kawasan Lindung',
      lead: 'Pengecekan irisan kaveling terhadap TN Bogani Nani Wartabone & sempadan sungai.',
      sub: 'Memastikan kaveling tidak merambah zona inti taman nasional, sempadan Danau Perintis, atau bantaran Sungai Bone.',
      bullets: ['Cek tumpang tindih batas TNBNW', 'Pemeriksaan sempadan danau & sungai (50m)', 'Audit kawasan rawan bencana banjir & longsor'],
    },
    {
      num: '03',
      sideSub: 'Pertanian Berkelanjutan',
      sideTitle: 'Proteksi Sawah LP2B',
      lead: 'Validasi kepatuhan terhadap kawasan sawah irigasi teknis pangan abadi.',
      sub: 'Menjamin lahan sawah produktif di sentra Suwawa, Kabila, dan Tapa terlindungi dari konversi perumahan komersial.',
      bullets: ['Cek delineasi sawah irigasi teknis', 'Perlindungan ketahanan pangan daerah', 'Verifikasi izin usaha tani terpadu'],
    },
    {
      num: '04',
      sideSub: 'Bappeda & Dinas PUPR',
      sideTitle: 'Rekomendasi KKPR & PBG',
      lead: 'Penerbitan surat keterangan kesesuaian ruang RTRW Kabupaten Bone Bolango.',
      sub: 'Surat rekomendasi digital resmi sebagai dasar legalitas perizinan berusaha OSS-RBA dan persetujuan bangunan gedung (PBG).',
      bullets: ['Penerbitan naskah telaah spasial RTRW', 'Sinkronisasi ke sistem perizinan daerah', 'Panduan teknis intensitas bangunan (KDB/KLB)'],
    },
  ];

  const requirements = [
    'Kartu Tanda Penduduk (KTP) / NIB Pelaku Usaha',
    'Sertifikat Tanah / Bukti Penguasaan Hak Atas Lahan',
    'Titik Koordinat Poligon Batas Bidang Kaveling (WGS84)',
    'Rencana Teknis Tata Letak & Luas Bangunan (KDB & KLB)',
    'Surat Pernyataan Kesanggupan Mematuhi Garis Sempadan',
  ];

  return (
    <section
      id="perizinan"
      className="bg-[#0A2129] text-white py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden theme-dark border-t border-white/10 scroll-mt-10"
    >
      <div id="werkwijze" className="absolute -top-10 left-0" />
      <div className="max-w-7xl mx-auto">
        {/* Intro Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#00FFAF]/10 border border-[#00FFAF]/30 px-3 py-1 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4 text-[#00FFAF]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#00FFAF] font-bold">
              MODUL INFORMASI PERIZINAN SPASIAL
            </span>
          </div>
          <h2 className="font-onest font-black text-3xl sm:text-5xl md:text-6xl text-white leading-tight mb-4">
            Alur perizinan &amp; persetujuan <span className="accent"><em>kesesuaian ruang</em></span>{' '}
            <span className="text-[#00FFAF]">Bone Bolango.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Panduan lengkap penerbitan Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR) dan rekomendasi Persetujuan Bangunan Gedung (PBG) berbasis data RTRW resmi.
          </p>
        </div>

        {/* Requirements & Simulator Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Requirements Box */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[28px] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#00FFAF]" />
              <h3 className="font-onest font-bold text-lg text-white">
                Syarat Pengajuan Rekomendasi KKPR di Bone Bolango
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-mono text-white/80">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFAF] shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Calculator Action Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#123640] to-[#0A2129] border border-[#00FFAF]/30 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#00FFAF] font-bold block mb-1">
                SIMULASI MANDIRI
              </span>
              <h3 className="font-onest font-bold text-xl text-white mb-2">
                Uji Kelayakan Izin Kaveling Anda
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                Hitung batas intensitas tapak kaveling (KDB), volume lantai (KLB), dan ruang hijau (KDH) secara instan.
              </p>
            </div>

            {onOpenKkprCalc && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenKkprCalc();
                }}
                className="mkv-btn mkv-btn-green w-full justify-between"
              >
                <span className="btn-text">
                  Buka Kalkulator KKPR
                  <Calculator className="w-4 h-4 ml-1" />
                </span>
                <span className="btn-text-hover" aria-hidden="true">
                  Buka Kalkulator KKPR
                  <Calculator className="w-4 h-4 ml-1" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Vertical Pipeline Items with Sticky Side Title matching MKVision .op-item */}
        <div className="space-y-16 sm:space-y-20 border-t border-white/10 pt-12">
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00FFAF] font-bold">
              4 TAHAPAN PROSEDUR PERIZINAN SPASIAL:
            </span>
          </div>

          {steps.map((item, idx) => (
            <div
              key={item.num}
              onClick={() => {
                soundEffects.playClick();
                setActiveIdx(idx);
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-white/10 pt-10 group cursor-pointer"
            >
              {/* Sticky Side Label (.op-side) */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#00FFAF]">
                  <span className="font-bold text-sm">{item.num}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-white/60 uppercase">{item.sideSub}</span>
                </div>
                <h3 className="font-onest font-black text-3xl sm:text-4xl text-white group-hover:text-[#00FFAF] transition-colors">
                  {item.sideTitle}
                </h3>
              </div>

              {/* Main Content Body (.op-content) */}
              <div className="lg:col-span-7 space-y-5">
                <p className="font-onest font-medium text-lg sm:text-xl text-white leading-snug">
                  {item.lead}
                </p>
                <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                  {item.sub}
                </p>

                {/* Bullets */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2.5 mt-4">
                  {item.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3 text-xs sm:text-sm font-mono text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#00FFAF] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
