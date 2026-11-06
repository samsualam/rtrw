import React, { useState, useEffect } from 'react';
import { SPATIAL_ZONES, STANDARD_ACTIVITIES } from '../data/zoningData';
import { ParcelInfo, KKPRCalculationResult } from '../types/spatial';
import { soundEffects } from '../utils/audio';
import {
  X,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck2,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  TreePine
} from 'lucide-react';

interface KkprCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillParcel?: ParcelInfo | null;
  prefillZoneCode?: string;
}

export const KkprCalculatorModal: React.FC<KkprCalculatorModalProps> = ({
  isOpen,
  onClose,
  prefillParcel,
  prefillZoneCode,
}) => {
  const [selectedZoneCode, setSelectedZoneCode] = useState(
    prefillParcel?.currentZoneCode || prefillZoneCode || SPATIAL_ZONES[0].code
  );
  const [selectedActivity, setSelectedActivity] = useState(STANDARD_ACTIVITIES[0].name);
  const [landAreaM2, setLandAreaM2] = useState<number>(prefillParcel ? prefillParcel.areaM2 : 1000);
  const [footprintM2, setFootprintM2] = useState<number>(550);
  const [totalFloorAreaM2, setTotalFloorAreaM2] = useState<number>(1800);
  const [greenSpaceM2, setGreenSpaceM2] = useState<number>(200);
  const [frontSetbackM, setFrontSetbackM] = useState<number>(8);
  const [buildingFloors, setBuildingFloors] = useState<number>(4);

  useEffect(() => {
    if (prefillParcel) {
      setSelectedZoneCode(prefillParcel.currentZoneCode);
      setLandAreaM2(prefillParcel.areaM2);
      setFootprintM2(Math.round(prefillParcel.areaM2 * 0.5));
      setTotalFloorAreaM2(Math.round(prefillParcel.areaM2 * 1.5));
      setGreenSpaceM2(Math.round(prefillParcel.areaM2 * 0.2));
      setFrontSetbackM(prefillParcel.gsbMin);
    } else if (prefillZoneCode) {
      setSelectedZoneCode(prefillZoneCode);
    }
  }, [prefillParcel, prefillZoneCode, isOpen]);

  if (!isOpen) return null;

  const currentZone =
    SPATIAL_ZONES.find((z) => z.code === selectedZoneCode) || SPATIAL_ZONES[0];

  // Calculation logic
  const safeLandArea = landAreaM2 > 0 ? landAreaM2 : 1;
  const kdbAchieved = Number(((footprintM2 / safeLandArea) * 100).toFixed(1));
  const klbAchieved = Number((totalFloorAreaM2 / safeLandArea).toFixed(2));
  const kdhAchieved = Number(((greenSpaceM2 / safeLandArea) * 100).toFixed(1));

  const isKdbValid = kdbAchieved <= currentZone.kdbMax;
  const isKlbValid = klbAchieved <= currentZone.klbMax;
  const isKdhValid = kdhAchieved >= currentZone.kdhMin;
  const isGsbValid = frontSetbackM >= currentZone.gsbMin;

  // Check activity permission
  const isProhibited = currentZone.prohibitedUses.some((p) =>
    selectedActivity.toLowerCase().includes(p.toLowerCase()) ||
    p.toLowerCase().includes(selectedActivity.toLowerCase())
  );
  const isConditional = currentZone.conditionalUses.some((c) =>
    selectedActivity.toLowerCase().includes(c.toLowerCase()) ||
    c.toLowerCase().includes(selectedActivity.toLowerCase())
  );

  let status: 'SESUAI' | 'BERSYARAT' | 'TIDAK_SESUAI' = 'SESUAI';
  const notes: string[] = [];
  const requiredStudies: string[] = [];

  if (isProhibited || !isKdbValid || !isKlbValid) {
    status = 'TIDAK_SESUAI';
    if (!isKdbValid) notes.push(`Luas tapak bangunan melebihi KDB maksimum (${kdbAchieved}% > ${currentZone.kdbMax}%). Kurangi luas lantai dasar.`);
    if (!isKlbValid) notes.push(`Koefisien Lantai Bangunan melebihi batas batas (${klbAchieved} > ${currentZone.klbMax}). Kurangi total lantai.`);
    if (isProhibited) notes.push(`Kegiatan '${selectedActivity}' dilarang pada peruntukan ${currentZone.name}.`);
  } else if (isConditional || !isKdhValid || !isGsbValid) {
    status = 'BERSYARAT';
    if (!isKdhValid) notes.push(`Area hijau berpori kurang dari batas minimum (${kdhAchieved}% < ${currentZone.kdhMin}%). Tambahkan area taman resapan.`);
    if (!isGsbValid) notes.push(`Jarak sempadan depan kurang dari standar (${frontSetbackM}m < ${currentZone.gsbMin}m).`);
    if (isConditional) notes.push(`Kegiatan masuk kategori bersyarat (B). Wajib melampirkan persetujuan lingkungan atau kajian teknis khusus.`);
    requiredStudies.push('Kajian Pengelolaan Air Larian (Zero Run-Off)', 'Analisis Bangunan Hijau (BGH)');
  } else {
    status = 'SESUAI';
    notes.push('Seluruh indikator intensitas dan pola pemanfaatan ruang memenuhi standar RDTR.');
    requiredStudies.push('Dokumen Standar SPPL / UKL-UPL', 'Pengajuan Persetujuan Bangunan Gedung (PBG)');
  }

  const result: KKPRCalculationResult = {
    isFeasible: status !== 'TIDAK_SESUAI',
    status,
    kdbAchieved,
    kdbStatus: isKdbValid,
    klbAchieved,
    klbStatus: isKlbValid,
    kdhAchieved,
    kdhStatus: isKdhValid,
    gsbStatus: isGsbValid,
    notes,
    requiredStudies,
    recommendationCode: `KKPR-REC-${Math.floor(100000 + Math.random() * 900000)}/2026`,
  };

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b0e18] border border-white/20 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#38ef7d]/20 border border-[#38ef7d] flex items-center justify-center text-[#38ef7d]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-lg sm:text-xl text-white">
                Kalkulator Kelayakan Spasial KKPR & PBG
              </h3>
              <p className="font-mono text-xs text-white/50">
                Simulasi Kepatuhan Intensitas Tata Ruang Berbasis RDTR 1:5.000
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Parameter Inputs */}
          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            <div>
              <label className="block text-white/70 mb-1.5 font-semibold">
                1. Pilih Peruntukan Zona RTRW
              </label>
              <select
                value={selectedZoneCode}
                onChange={(e) => {
                  soundEffects.playClick();
                  setSelectedZoneCode(e.target.value);
                }}
                className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#38ef7d] transition-colors"
              >
                {SPATIAL_ZONES.map((z) => (
                  <option key={z.id} value={z.code}>
                    {z.code} — {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/70 mb-1.5 font-semibold">
                2. Rencana Kegiatan Pemanfaatan Ruang
              </label>
              <select
                value={selectedActivity}
                onChange={(e) => {
                  soundEffects.playClick();
                  setSelectedActivity(e.target.value);
                }}
                className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#38ef7d] transition-colors"
              >
                {STANDARD_ACTIVITIES.map((act) => (
                  <option key={act.id} value={act.name}>
                    {act.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 mb-1">Luas Lahan (m²)</label>
                <input
                  type="number"
                  value={landAreaM2}
                  onChange={(e) => setLandAreaM2(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38ef7d]"
                />
              </div>
              <div>
                <label className="block text-white/60 mb-1">Luas Tapak Dasar (m²)</label>
                <input
                  type="number"
                  value={footprintM2}
                  onChange={(e) => setFootprintM2(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38ef7d]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 mb-1">Total Luas Lantai (m²)</label>
                <input
                  type="number"
                  value={totalFloorAreaM2}
                  onChange={(e) => setTotalFloorAreaM2(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38ef7d]"
                />
              </div>
              <div>
                <label className="block text-white/60 mb-1">Area Hijau / Resapan (m²)</label>
                <input
                  type="number"
                  value={greenSpaceM2}
                  onChange={(e) => setGreenSpaceM2(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38ef7d]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 mb-1">Sempadan Depan / GSB (m)</label>
                <input
                  type="number"
                  value={frontSetbackM}
                  onChange={(e) => setFrontSetbackM(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38ef7d]"
                />
              </div>
              <div>
                <label className="block text-white/60 mb-1">Jumlah Lantai Bangunan</label>
                <input
                  type="number"
                  value={buildingFloors}
                  onChange={(e) => setBuildingFloors(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#131722] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#38ef7d]"
                />
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-white/60">
              <span className="text-[#38ef7d] font-bold block mb-1">Pedoman Zonasi Terpilih:</span>
              KDB Maks: {currentZone.kdbMax}% · KLB Maks: {currentZone.klbMax} · KDH Min: {currentZone.kdhMin}% · GSB Min: {currentZone.gsbMin}m · Maks Ketinggian: {currentZone.maxHeight} Lantai
            </div>
          </div>

          {/* Right Panel: Live Assessment & Verification Output */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-black/60 border border-white/15 rounded-2xl p-5 font-mono">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs uppercase text-white/50 tracking-wider">
                  Hasil Uji Intensitas Ruang
                </span>
                <span
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    result.status === 'SESUAI'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : result.status === 'BERSYARAT'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {result.status === 'SESUAI' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {result.status === 'BERSYARAT' && <AlertTriangle className="w-3.5 h-3.5" />}
                  {result.status === 'TIDAK_SESUAI' && <XCircle className="w-3.5 h-3.5" />}
                  {result.status.replace('_', ' ')}
                </span>
              </div>

              {/* Intensity Parameter Checklist */}
              <div className="space-y-3 mb-6">
                {/* KDB */}
                <div className="bg-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px]">KDB (Koefisien Dasar Bangunan)</span>
                    <span className="text-white font-bold">{result.kdbAchieved}%</span>
                    <span className="text-white/40 text-[10px]"> (Maks {currentZone.kdbMax}%)</span>
                  </div>
                  <span className={`font-bold ${result.kdbStatus ? 'text-[#38ef7d]' : 'text-rose-400'}`}>
                    {result.kdbStatus ? 'MEMENUHI' : 'MELEBIHI'}
                  </span>
                </div>

                {/* KLB */}
                <div className="bg-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px]">KLB (Koefisien Lantai Bangunan)</span>
                    <span className="text-white font-bold">{result.klbAchieved}</span>
                    <span className="text-white/40 text-[10px]"> (Maks {currentZone.klbMax})</span>
                  </div>
                  <span className={`font-bold ${result.klbStatus ? 'text-[#38ef7d]' : 'text-rose-400'}`}>
                    {result.klbStatus ? 'MEMENUHI' : 'MELEBIHI'}
                  </span>
                </div>

                {/* KDH */}
                <div className="bg-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px]">KDH (Koefisien Dasar Hijau)</span>
                    <span className="text-white font-bold">{result.kdhAchieved}%</span>
                    <span className="text-white/40 text-[10px]"> (Min {currentZone.kdhMin}%)</span>
                  </div>
                  <span className={`font-bold ${result.kdhStatus ? 'text-[#38ef7d]' : 'text-amber-400'}`}>
                    {result.kdhStatus ? 'MEMENUHI' : 'KURANG'}
                  </span>
                </div>

                {/* GSB */}
                <div className="bg-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px]">GSB (Sempadan Bangunan)</span>
                    <span className="text-white font-bold">{frontSetbackM} Meter</span>
                    <span className="text-white/40 text-[10px]"> (Min {currentZone.gsbMin}m)</span>
                  </div>
                  <span className={`font-bold ${result.gsbStatus ? 'text-[#38ef7d]' : 'text-amber-400'}`}>
                    {result.gsbStatus ? 'MEMENUHI' : 'KURANG'}
                  </span>
                </div>
              </div>

              {/* Notes & Recommendations */}
              <div className="space-y-2 mb-4 text-[11px]">
                <span className="text-white/40 uppercase block">Catatan Rekomendasi Spasial:</span>
                {result.notes.map((note, i) => (
                  <p key={i} className="text-white/80 bg-white/5 p-2 rounded-lg border border-white/5">
                    • {note}
                  </p>
                ))}
              </div>
            </div>

            {/* Document Verification Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-[10px] text-white/40">
                <span>KODE RESMI SIMULASI:</span>
                <span className="block text-white font-mono">{result.recommendationCode}</span>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar Kajian</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
