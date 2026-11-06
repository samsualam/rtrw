import React from 'react';
import { SpatialZone } from '../types/spatial';
import { soundEffects } from '../utils/audio';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Ban,
  Layers,
  Building2,
  TreePine,
  ArrowRight,
  ShieldAlert,
  FileCheck2
} from 'lucide-react';

interface ZoneDetailModalProps {
  zone: SpatialZone | null;
  onClose: () => void;
  onOpenKkpr: (zoneCode: string) => void;
}

export const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({
  zone,
  onClose,
  onOpenKkpr,
}) => {
  if (!zone) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b0e18] border border-white/20 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="bg-[#38ef7d]/20 text-[#38ef7d] border border-[#38ef7d]/40 px-2.5 py-0.5 rounded-full font-bold">
                KODE: {zone.code}
              </span>
              <span className="text-white/50 uppercase">{zone.categoryLabel}</span>
            </div>
            <h3 className="font-syne font-black text-2xl sm:text-3xl text-white">
              {zone.name}
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intensity Parameters Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 font-mono">
          <div className="bg-[#121624] border border-white/10 rounded-2xl p-4 text-center">
            <span className="text-[10px] text-white/40 uppercase block mb-1">KDB Maksimum</span>
            <span className="font-bold text-xl text-[#38ef7d]">{zone.kdbMax}%</span>
            <span className="text-[10px] text-white/50 block mt-1">Tapak Dasar</span>
          </div>
          <div className="bg-[#121624] border border-white/10 rounded-2xl p-4 text-center">
            <span className="text-[10px] text-white/40 uppercase block mb-1">KLB Maksimum</span>
            <span className="font-bold text-xl text-cyan-400">{zone.klbMax}</span>
            <span className="text-[10px] text-white/50 block mt-1">Koefisien Lantai</span>
          </div>
          <div className="bg-[#121624] border border-white/10 rounded-2xl p-4 text-center">
            <span className="text-[10px] text-white/40 uppercase block mb-1">KDH Minimum</span>
            <span className="font-bold text-xl text-emerald-400">{zone.kdhMin}%</span>
            <span className="text-[10px] text-white/50 block mt-1">Resapan Hijau</span>
          </div>
          <div className="bg-[#121624] border border-white/10 rounded-2xl p-4 text-center">
            <span className="text-[10px] text-white/40 uppercase block mb-1">GSB Minimal</span>
            <span className="font-bold text-xl text-purple-400">{zone.gsbMin}m</span>
            <span className="text-[10px] text-white/50 block mt-1">Sempadan Jalan</span>
          </div>
        </div>

        {/* Activity Matrix (ITBX) */}
        <div className="space-y-4 mb-8">
          <h4 className="font-syne font-bold text-sm uppercase tracking-wider text-white">
            Matriks Ketentuan Kegiatan (Tabel ITBX Resmi)
          </h4>

          {/* Diizinkan */}
          <div className="bg-[#0e141a] border border-emerald-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wide">
                Kegiatan Diizinkan (I)
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
              {zone.allowedUses.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bersyarat */}
          <div className="bg-[#16140e] border border-amber-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wide">
                Kegiatan Terbatas & Bersyarat (T / B)
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
              {zone.conditionalUses.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dilarang */}
          <div className="bg-[#190f11] border border-rose-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ban className="w-4 h-4 text-rose-400" />
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wide">
                Kegiatan Dilarang Keras (X)
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
              {zone.prohibitedUses.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sub-Zones Section */}
        {zone.subZones && zone.subZones.length > 0 && (
          <div className="mb-8">
            <h4 className="font-syne font-bold text-sm uppercase tracking-wider text-white mb-3">
              Rincian Sub-Zona Detail RDTR
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {zone.subZones.map((sub, i) => (
                <div key={i} className="p-3.5 bg-white/5 border border-white/10 rounded-2xl font-mono text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#38ef7d] font-bold">{sub.code}</span>
                    <span className="text-white/60 text-[10px]">{sub.name}</span>
                  </div>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    {sub.specificRules}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/40">
            Dasar Hukum: Lampiran Perda RDTR & RTRW 2024–2044
          </p>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
              onOpenKkpr(zone.code);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#38ef7d] hover:bg-[#2ecc71] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(56,239,125,0.4)]"
          >
            <span>Uji Kesesuaian Kaveling untuk {zone.code}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
