import React from 'react';
import { soundEffects } from '../utils/audio';
import { FileText, ShieldAlert, BookOpen, ExternalLink, Download } from 'lucide-react';

export const RegulationsSection: React.FC = () => {
  const regulations = [
    {
      code: 'PP NO. 21 / 2021',
      title: 'Penyelenggaraan Penataan Ruang',
      desc: 'Landasan operasional pelaksanaan perencanaan tata ruang, pemanfaatan ruang, dan pengendalian pemanfaatan ruang terpadu nasional.',
      category: 'Peraturan Pemerintah',
      tag: 'Mandat Utama'
    },
    {
      code: 'PERMEN ATR/BPN NO. 13 / 2021',
      title: 'Pelaksanaan KKPR & Sinkronisasi RDTR',
      desc: 'Pedoman teknis penerbitan Konfirmasi Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR) dan Persetujuan KKPR berbasis RDTR digital.',
      category: 'Peraturan Menteri',
      tag: 'Standar Teknis'
    },
    {
      code: 'PERDA NO. 5 / 2021',
      title: 'Rencana Tata Ruang Wilayah (RTRW 2021–2041)',
      desc: 'Dokumen spasial induk daerah yang mengatur pola ruang budi daya, kawasan lindung, hierarki pusat kegiatan, dan jaringan transportasi.',
      category: 'Peraturan Daerah',
      tag: 'Hukum Lokal'
    },
    {
      code: 'PP NO. 16 / 2021',
      title: 'Persetujuan Bangunan Gedung (PBG) & SLF',
      desc: 'Standar teknis konstruksi, intensitas KDB/KLB, dan sertifikat laik fungsi bangunan yang mensyaratkan kelulusan verifikasi KKPR.',
      category: 'Bangunan Gedung',
      tag: 'Teknis Arsitektur'
    }
  ];

  return (
    <section id="regulasi" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38ef7d]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#38ef7d] font-semibold">
              DASAR HUKUM & STANDAR TEKNIS
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            REGULASI TATA RUANG
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-white/60 text-sm max-w-md font-light leading-relaxed">
          Kompilasi peraturan perundang-undangan resmi yang menjadi rujukan verifikasi sistem dan pertimbangan teknis persetujuan izin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regulations.map((reg, idx) => (
          <div
            key={idx}
            className="bg-[#090c14] border border-white/15 rounded-3xl p-6 sm:p-8 hover:border-[#38ef7d]/50 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-xs">
                <span className="text-[#38ef7d] font-bold">{reg.code}</span>
                <span className="text-white/40 uppercase bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                  {reg.tag}
                </span>
              </div>

              <h3 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-[#38ef7d] transition-colors">
                {reg.title}
              </h3>

              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                {reg.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-white/40">{reg.category}</span>
              <button
                onClick={() => soundEffects.playClick()}
                className="flex items-center gap-1.5 text-white/80 hover:text-[#38ef7d] transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Salinan Peraturan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
