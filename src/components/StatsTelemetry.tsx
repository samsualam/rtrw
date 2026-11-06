import React from 'react';
import { Compass, ShieldCheck, Zap, Database } from 'lucide-react';

export const StatsTelemetry: React.FC = () => {
  const stats = [
    {
      value: '1.28M',
      unit: 'HEKTAR',
      label: 'Luas Pola Ruang Terpetakan',
      desc: 'Cakupan seluruh daratan, pesisir, dan koridor infrastruktur terpadu.',
      icon: Database,
    },
    {
      value: '99.8%',
      unit: 'PRESISI',
      label: 'Akurasi Koordinat Geospasial',
      desc: 'Standar referensi geodetik SRGI 2013 toleransi di bawah 5 centimeter.',
      icon: ShieldCheck,
    },
    {
      value: '14,320+',
      unit: 'DOKUMEN',
      label: 'Penerbitan KKPR Terotomasi',
      desc: 'Tervalidasi secara instan terhubung portal OSS-RBA dan Ditjen Tata Ruang.',
      icon: Zap,
    },
    {
      value: '< 15m',
      unit: 'SPEED',
      label: 'Kecepatan Verifikasi Berkas',
      desc: 'Dari unggah poligon batas kaveling hingga penerbitan surat rekomendasi.',
      icon: Compass,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-[#090b12] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[#38ef7d]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-[#38ef7d]" />
                <span className="font-mono text-[10px] text-white/40 tracking-wider">
                  [{s.unit}]
                </span>
              </div>

              <div className="font-syne font-black text-4xl sm:text-5xl text-white mb-2 group-hover:text-[#38ef7d] transition-colors">
                {s.value}
              </div>

              <h4 className="font-syne font-bold text-sm text-white/90 mb-1">
                {s.label}
              </h4>

              <p className="text-xs text-white/50 leading-relaxed font-light">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
