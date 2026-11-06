import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';
import { Layers, MapPin, Calculator, FileCheck2, ArrowUpRight } from 'lucide-react';

interface MkServicesDarkProps {
  onOpenKkprCalc: () => void;
  onOpenGisMap: () => void;
}

export const MkServicesDark: React.FC<MkServicesDarkProps> = ({
  onOpenKkprCalc,
  onOpenGisMap,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const services = [
    {
      title: 'Peta Pola Ruang Kabupaten Bone Bolango',
      caseLabel: 'Kawasan Lindung & Budi Daya',
      caseName: 'Perda RTRW 2021–2041',
      desc: 'Penetapan batas peruntukan kawasan lindung konservasi hutan TNBNW dan kawasan budi daya pertanian, permukiman, serta pariwisata.',
      icon: Layers,
      action: onOpenGisMap,
    },
    {
      title: 'Struktur Ruang & Jaringan Infrastruktur',
      caseLabel: 'Konektivitas Wilayah',
      caseName: 'Arteri, GORR & Irigasi',
      desc: 'Rencana hierarki pusat pelayanan (Suwawa, Kabila, Tapa, Bonepantai) dan jaringan transportasi jalan lingkar luar serta irigasi Lomaya.',
      icon: MapPin,
      action: onOpenGisMap,
    },
    {
      title: 'Kawasan Strategis Kabupaten (KSK)',
      caseLabel: 'Prioritas Pembangunan',
      caseName: 'Konservasi & Pangan Abadi',
      desc: 'Perlindungan khusus ekologis TN Bogani Nani Wartabone, lahan sawah abadi LP2B, dan koridor wisata bahari pesisir selatan.',
      icon: Calculator,
      action: onOpenKkprCalc,
    },
    {
      title: 'Arahan Pengendalian Pemanfaatan Ruang',
      caseLabel: 'Ketentuan Zonasi',
      caseName: 'Kepastian Pemanfaatan Lahan',
      desc: 'Pedoman umum peraturan zonasi, insentif, disinsentif, dan sanksi penataan ruang demi mencegah alih fungsi kawasan lindung.',
      icon: FileCheck2,
      action: onOpenKkprCalc,
    },
  ];

  return (
    <section
      id="diensten"
      className="bg-[#0A2129] text-white py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden theme-dark"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00FFAF] block mb-3 font-semibold">
            INSTRUMEN UTAMA RTRW
          </span>
          <h2 className="font-onest font-black text-3xl sm:text-5xl text-white leading-tight">
            Pilar penataan <span className="accent"><em>ruang wilayah</em></span> Kabupaten Bone Bolango
          </h2>
        </div>

        {/* Services Rows matching MKVision .services */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={svc.title}
                onMouseEnter={() => {
                  soundEffects.playHover();
                  setHoveredIdx(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  soundEffects.playClick();
                  svc.action();
                }}
                className="py-8 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group cursor-pointer transition-colors hover:bg-white/[0.02] px-2 rounded-2xl"
              >
                {/* Title */}
                <div className="max-w-xl">
                  <span className="font-mono text-xs text-[#00FFAF] block mb-2 font-bold">
                    [0{idx + 1}]
                  </span>
                  <h3 className="font-onest font-bold text-2xl sm:text-3xl text-white group-hover:text-[#00FFAF] transition-colors mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                {/* Case Info & Action Preview matching MKVision .services-info */}
                <div className="flex items-center gap-6 sm:gap-10 shrink-0">
                  <div className="text-left sm:text-right hidden sm:block">
                    <span className="font-mono text-xs text-white/40 block">
                      {svc.caseLabel}
                    </span>
                    <span className="font-onest font-semibold text-sm text-white">
                      {svc.caseName}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/15 group-hover:border-[#00FFAF] group-hover:bg-[#00FFAF]/10 flex items-center justify-center transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#00FFAF]" />
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#00FFAF] flex items-center justify-center text-white/50 group-hover:text-[#00FFAF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
