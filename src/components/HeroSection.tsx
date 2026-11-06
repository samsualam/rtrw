import React, { useState } from 'react';
import { HeroSpatialCanvas } from './HeroSpatialCanvas';
import { soundEffects } from '../utils/audio';
import { SAMPLE_PARCELS } from '../data/zoningData';
import { ParcelInfo } from '../types/spatial';
import { Search, MapPin, ArrowUpRight, ShieldCheck, CheckCircle2, AlertTriangle, Building2, Layers } from 'lucide-react';

interface HeroSectionProps {
  onSelectParcel: (parcel: ParcelInfo) => void;
  onOpenKkprCalc: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectParcel, onOpenKkprCalc }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickResult, setQuickResult] = useState<ParcelInfo | null>(SAMPLE_PARCELS[0]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const matched = SAMPLE_PARCELS.find(
      (p) =>
        p.address.toLowerCase().includes(query.toLowerCase()) ||
        p.subdistrict.toLowerCase().includes(query.toLowerCase()) ||
        p.nib.includes(query) ||
        p.parcelNo.toLowerCase().includes(query.toLowerCase())
    );
    if (matched) {
      setQuickResult(matched);
    }
  };

  const handlePresetClick = (parcel: ParcelInfo) => {
    soundEffects.playClick();
    setQuickResult(parcel);
    setSearchQuery(parcel.address);
    onSelectParcel(parcel);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 overflow-hidden">
      {/* 3D WebGL / Canvas Spatial Mesh Background */}
      <HeroSpatialCanvas />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 sm:pt-14">
        {/* Top telemetry label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#38ef7d] animate-ping" />
          <p className="font-mono text-xs tracking-widest uppercase text-[#38ef7d] font-semibold">
            GEOSPATIAL INTELLIGENCE · RDTR SKALA 1:5.000 · INTEGRASI OSS-RBA
          </p>
        </div>

        {/* Big Architectural Title in MKVision Studio Typography Style */}
        <div className="space-y-1 sm:space-y-2 mb-8">
          <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]">
            SISTEM ZONASI
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight bg-gradient-to-r from-[#38ef7d] via-[#a8ff78] to-[#00f2fe] bg-clip-text text-transparent leading-[0.95]">
              RTRW & PERIZINAN
            </h1>
            <span className="hidden md:inline-flex items-center font-mono text-xs text-white/50 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
              KOTA METROPOLITAN
            </span>
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white/30 leading-[0.95]">
            WILAYAH TERPADU
          </h1>
        </div>

        {/* Sub-hero editorial description & actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl mb-8">
              Verifikasi seketika status kesesuaian ruang kaveling Anda berdasarkan peraturan Rencana Tata Ruang Wilayah (RTRW 2024–2044) & Rencana Detail Tata Ruang (RDTR). Dapatkan kepastian perizinan berusaha KKPR, batasan intensitas KDB/KLB/KDH, dan rekomendasi Persetujuan Bangunan Gedung (PBG).
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#gis-map"
                onClick={() => soundEffects.playClick()}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-[#050608] font-bold text-sm tracking-wide transition-all duration-200 hover:bg-[#38ef7d] hover:shadow-[0_0_30px_rgba(56,239,125,0.4)] cursor-pointer"
                data-cursor="MAP"
              >
                <span>Buka Peta Tematik GIS</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenKkprCalc();
                }}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer backdrop-blur-md"
                data-cursor="CALC"
              >
                <span>Uji Kelayakan Mandiri KKPR</span>
                <div className="w-2 h-2 rounded-full bg-[#38ef7d]" />
              </button>
            </div>
          </div>

          {/* Quick Spatial Parcel Inspector Card (Interactive Hero Widget) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b0e17]/80 border border-white/15 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#38ef7d]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#38ef7d]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white/90 font-semibold">
                    Radar Pengecekan Lokasi
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/50">WGS84 EPSG:4326</span>
              </div>

              {/* Search input */}
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Ketik alamat jalan, kelurahan, atau NIB kaveling..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38ef7d] transition-colors font-mono"
                />
              </div>

              {/* Preset quick test tags */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">
                  Contoh Titik Uji Spasial:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_PARCELS.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePresetClick(p)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all text-left cursor-pointer ${
                        quickResult?.id === p.id
                          ? 'bg-[#38ef7d]/20 border-[#38ef7d] text-[#38ef7d]'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {p.subdistrict} ({p.currentZoneCode})
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Quick Result preview */}
              {quickResult && (
                <div className="bg-black/50 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[10px] text-white/50">{quickResult.parcelNo}</p>
                      <h4 className="font-syne font-bold text-sm text-white line-clamp-1">
                        {quickResult.address}
                      </h4>
                      <p className="text-xs text-white/60">
                        Kec. {quickResult.district}, Kel. {quickResult.subdistrict}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wide ${
                        quickResult.statusKesesuaian === 'Sesuai'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : quickResult.statusKesesuaian === 'Bersyarat'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {quickResult.statusKesesuaian === 'Sesuai' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      <span>{quickResult.statusKesesuaian}</span>
                    </div>
                  </div>

                  {/* Technical intensity metrics */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center font-mono">
                    <div className="bg-white/5 p-2 rounded-lg">
                      <span className="block text-[9px] text-white/40 uppercase">Zona</span>
                      <span className="text-xs font-bold text-[#38ef7d]">{quickResult.currentZoneCode}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <span className="block text-[9px] text-white/40 uppercase">KDB Maks</span>
                      <span className="text-xs font-bold text-white">{quickResult.kdbMax}%</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <span className="block text-[9px] text-white/40 uppercase">KLB Maks</span>
                      <span className="text-xs font-bold text-white">{quickResult.klbMax}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <span className="block text-[9px] text-white/40 uppercase">KDH Min</span>
                      <span className="text-xs font-bold text-white">{quickResult.kdhMin}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectParcel(quickResult);
                      const el = document.getElementById('gis-map');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-[#38ef7d]/20 hover:border-[#38ef7d]/50 border border-white/10 text-xs font-medium text-white hover:text-[#38ef7d] transition-all cursor-pointer font-mono"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Inspeksi Lapisan Poligon Peta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Geodetic Telemetry Bar in MKVision Style */}
        <div className="border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-1">PROYEKSI RESMI</span>
            <span className="text-white font-medium">SRGI 2013 / UTM ZONE 49S</span>
          </div>
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-1">STATUS LEGALITAS</span>
            <span className="text-[#38ef7d] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38ef7d] animate-pulse" />
              PERDA NO. 1 TAHUN 2024
            </span>
          </div>
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-1">STANDAR KETENTUAN</span>
            <span className="text-white font-medium">PP NO. 21/2021 & PERMEN 13/2021</span>
          </div>
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-1">AUDIT REALISASI RUANG</span>
            <span className="text-white font-medium">99.4% TERINTEGRASI OSS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
