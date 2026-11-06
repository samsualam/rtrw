import React, { useState } from 'react';
import { SPATIAL_ZONES } from '../data/zoningData';
import { SpatialZone, ZoneCategory } from '../types/spatial';
import { soundEffects } from '../utils/audio';
import { ArrowUpRight, Check, AlertCircle, Ban, Maximize2, Shield } from 'lucide-react';

interface ZoningShowcaseProps {
  onSelectZone: (zone: SpatialZone) => void;
  onOpenKkprForZone: (zoneCode: string) => void;
}

export const ZoningShowcase: React.FC<ZoningShowcaseProps> = ({
  onSelectZone,
  onOpenKkprForZone,
}) => {
  const [activeCategory, setActiveCategory] = useState<ZoneCategory | 'all'>('all');

  const categories = [
    { id: 'all', label: 'Semua Zona RTRW' },
    { id: 'komersial', label: 'Komersial & Bisnis (K)' },
    { id: 'hunian', label: 'Hunian Permukiman (R)' },
    { id: 'industri', label: 'Industri & Logistik (I)' },
    { id: 'lindung', label: 'Kawasan Lindung (RTH & L)' },
    { id: 'publik', label: 'Fasilitas Publik & TOD' },
  ];

  const filteredZones =
    activeCategory === 'all'
      ? SPATIAL_ZONES
      : SPATIAL_ZONES.filter((z) => z.category === activeCategory);

  return (
    <section id="zonasi" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38ef7d]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#38ef7d] font-semibold">
              KATALOG POLA RUANG & KETENTUAN KHUSUS
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
            MATRIKS ZONASI WILAYAH
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-white/60 text-sm max-w-md font-light leading-relaxed">
          Standar pemanfaatan ruang, ambang batas intensitas bangunan, dan arahan perizinan sesuai lampiran Rencana Detail Tata Ruang (RDTR) tingkat presisi tinggi.
        </p>
      </div>

      {/* Filter Tabs (Functional segmented controls adhering to Frontend Design Constitution) */}
      <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              soundEffects.playClick();
              setActiveCategory(cat.id as ZoneCategory | 'all');
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
            data-cursor="FILTER"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Showcase Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredZones.map((zone, idx) => (
          <div
            key={zone.id}
            className="group relative bg-[#0a0d16] border border-white/15 rounded-3xl overflow-hidden hover:border-[#38ef7d]/60 transition-all duration-300 flex flex-col justify-between"
            data-cursor="INSPECT"
          >
            {/* Card Visual Hero Image with dark gradient overlay */}
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={zone.imageUrl}
                alt={zone.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-[#0a0d16]/60 to-transparent" />

              {/* Card top badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <span className="font-mono text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {zone.code}
                </span>
                <span className="font-mono text-xs text-white/70 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase">
                  {zone.categoryLabel}
                </span>
              </div>

              {/* Floating Intensity HUD Badge */}
              <div className="absolute bottom-4 left-5 right-5 grid grid-cols-3 gap-2">
                <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                  <span className="block font-mono text-[10px] text-white/50 uppercase">KDB Maks</span>
                  <span className="font-mono font-bold text-sm text-[#38ef7d]">{zone.kdbMax}%</span>
                </div>
                <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                  <span className="block font-mono text-[10px] text-white/50 uppercase">KLB Maks</span>
                  <span className="font-mono font-bold text-sm text-cyan-400">{zone.klbMax}</span>
                </div>
                <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                  <span className="block font-mono text-[10px] text-white/50 uppercase">KDH Min</span>
                  <span className="font-mono font-bold text-sm text-emerald-400">{zone.kdhMin}%</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-2">
                  <span>INDEX #{String(idx + 1).padStart(2, '0')}</span>
                  <span>·</span>
                  <span>GSB MIN {zone.gsbMin} METER</span>
                  <span>·</span>
                  <span>MAKS {zone.maxHeight} LANTAI</span>
                </div>

                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-[#38ef7d] transition-colors">
                  {zone.name}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                  {zone.description}
                </p>

                {/* Micro ITBX indicators */}
                <div className="space-y-2 mb-6 text-xs">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-white/80 line-clamp-1">
                      <strong className="text-white font-medium">Diizinkan:</strong> {zone.allowedUses.slice(0, 2).join(', ')}...
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span className="text-white/80 line-clamp-1">
                      <strong className="text-white font-medium">Bersyarat:</strong> {zone.conditionalUses.slice(0, 2).join(', ')}...
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Ban className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                    <span className="text-white/80 line-clamp-1">
                      <strong className="text-white font-medium">Dilarang:</strong> {zone.prohibitedUses.slice(0, 2).join(', ')}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectZone(zone);
                  }}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#38ef7d] transition-colors cursor-pointer py-2"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#38ef7d]" />
                  <span>Detail Sub-Zona & Aturan</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onOpenKkprForZone(zone.code);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#38ef7d] text-white hover:text-black font-mono text-xs font-medium transition-all cursor-pointer"
                >
                  <span>Simulasi Izin</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
