import React from 'react';
import { Zap, ShieldCheck, Database, Layers } from 'lucide-react';

export const MkFeatures: React.FC = () => {
  const features = [
    {
      num: '01',
      title: '> 60% Kawasan Lindung & Hutan Konservasi',
      desc: 'Melindungi bentang alam Taman Nasional Bogani Nani Wartabone dan hulu DAS Bone sebagai jantung ekologis Gorontalo.',
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: 'Perlindungan Mutlak Sawah Abadi LP2B',
      desc: 'Mencegah alih fungsi lahan sawah produktif di wilayah Suwawa, Kabila, dan Tapa demi ketahanan pangan daerah.',
      icon: Database,
    },
    {
      num: '03',
      title: 'Pariwisata Bahari Berkelanjutan',
      desc: 'Penataan koridor pesisir pantai Botutonuo dan sanctuary Hiu Paus Botubarani dengan sempadan pantai minimal 35 meter.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Peta Spasial Terpadu 18 Kecamatan',
      desc: 'Menjangkau seluruh wilayah dari Suwawa, Kabila, Tapa, Bulango, hingga pedalaman Pinogu dan pesisir Bonepantai.',
      icon: Zap,
    },
  ];

  return (
    <section id="keunggulan" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#F8FAF5] border-t border-[#0A2129]/10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5d6f76] block mb-3 font-semibold">
            KARAKTERISTIK RTRW BONE BOLANGO
          </span>
          <h2 className="font-onest font-black text-3xl sm:text-5xl text-[#0A2129] leading-tight">
            Prioritas penataan ruang wilayah Kabupaten Bone Bolango
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.num}
                className="bg-white border border-[#0A2129]/10 hover:border-[#00FFAF] p-8 sm:p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono font-bold text-lg text-[#0A2129]/40 group-hover:text-[#00a874] transition-colors">
                      /{feat.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#0A2129]/5 group-hover:bg-[#00FFAF]/20 flex items-center justify-center text-[#0A2129] group-hover:text-[#00a874] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-onest font-bold text-2xl text-[#0A2129] mb-3 group-hover:text-[#00a874] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5d6f76] font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
