import React, { useState } from 'react';
import { SAMPLE_PARCELS, GIS_LAYERS } from '../data/zoningData';
import { ParcelInfo, GisLayer } from '../types/spatial';
import { soundEffects } from '../utils/audio';
import {
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  EyeOff,
  Crosshair,
  Sliders,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  ArrowRight
} from 'lucide-react';

interface InteractiveGisSimulatorProps {
  selectedParcel: ParcelInfo | null;
  onSelectParcel: (parcel: ParcelInfo) => void;
  onOpenKkprForParcel: (parcel: ParcelInfo) => void;
}

export const InteractiveGisSimulator: React.FC<InteractiveGisSimulatorProps> = ({
  selectedParcel,
  onSelectParcel,
  onOpenKkprForParcel,
}) => {
  const [layers, setLayers] = useState<GisLayer[]>(GIS_LAYERS);
  const [activeParcel, setActiveParcel] = useState<ParcelInfo>(selectedParcel || SAMPLE_PARCELS[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showContours, setShowContours] = useState(true);
  const [customCoord, setCustomCoord] = useState<{ lat: number; lng: number } | null>(null);

  const toggleLayer = (layerId: string) => {
    soundEffects.playClick();
    setLayers((prev) =>
      prev.map((l) => (l.id === layerId ? { ...l, active: !l.active } : l))
    );
  };

  const handleParcelClick = (p: ParcelInfo) => {
    soundEffects.playClick();
    setActiveParcel(p);
    setCustomCoord(null);
    onSelectParcel(p);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    // Synthetic coordinates around Jakarta / Metropolitan area
    const lat = -6.2088 + (yRatio - 0.5) * 0.08;
    const lng = 106.8456 + (xRatio - 0.5) * 0.12;

    soundEffects.playHover();
    setCustomCoord({ lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) });
  };

  return (
    <section id="gis-map" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38ef7d]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#38ef7d] font-semibold">
              SIMULATOR GEOSPASIAL INTERAKTIF
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            PETA TEMATIK & RADAR KAVELING
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-white/60 text-sm max-w-md font-light leading-relaxed">
          Eksplorasi lapisan vektor spasial RTRW, identifikasi bidang tanah (NIB), dan verifikasi ambang batas intensitas kaveling secara real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Map Canvas Viewport */}
        <div className="lg:col-span-8 bg-[#090b12] border border-white/15 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col">
          {/* Map Controls Header */}
          <div className="p-4 bg-[#0d101a] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs z-20">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#38ef7d] animate-spin" style={{ animationDuration: '20s' }} />
              <span className="text-white/80 font-bold">RADAR SPASIAL RDTR</span>
              <span className="text-white/40">|</span>
              <span className="text-[#38ef7d]">
                {customCoord
                  ? `TITIK KURSOR: ${customCoord.lat}, ${customCoord.lng}`
                  : `KAVELING: ${activeParcel.parcelNo}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.0))}
                className="w-7 h-7 rounded bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="w-7 h-7 rounded bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setCustomCoord(null);
                }}
                className="w-7 h-7 rounded bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowContours(!showContours)}
                className={`px-2.5 py-1 rounded text-[10px] border transition-colors ${
                  showContours
                    ? 'bg-[#38ef7d]/20 border-[#38ef7d] text-[#38ef7d]'
                    : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                Kontur {showContours ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Interactive Map Visual Area */}
          <div
            onClick={handleMapClick}
            className="relative h-[480px] sm:h-[540px] w-full overflow-hidden cursor-crosshair select-none bg-[#05070c]"
            data-cursor="CLICK MAP"
          >
            {/* Grid Pattern representing geodetic coordinate mesh */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-300"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #38ef7d 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px, 60px 60px, 60px 60px',
                transform: `scale(${zoomLevel})`,
              }}
            />

            {/* Topography Contours */}
            {showContours && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
                viewBox="0 0 800 600"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,200 Q200,120 400,240 T800,180"
                  fill="none"
                  stroke="#38ef7d"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <path
                  d="M0,350 Q250,420 500,310 T800,380"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                />
                <path
                  d="M0,500 Q300,450 600,540 T800,480"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="0.8"
                />
              </svg>
            )}

            {/* Polygons representing Real-time RTRW Zones */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              viewBox="0 0 800 600"
            >
              {/* Commercial Zone Polygon */}
              <polygon
                points="120,80 320,60 360,220 180,260 90,190"
                fill="rgba(245, 158, 11, 0.15)"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text x="200" y="150" fill="#f59e0b" fontSize="12" fontFamily="JetBrains Mono" opacity="0.8">
                ZONA K.1 (KOMERSIAL)
              </text>

              {/* Residential Zone Polygon */}
              <polygon
                points="380,80 620,90 680,260 420,290"
                fill="rgba(16, 185, 129, 0.12)"
                stroke="#10b981"
                strokeWidth="1.5"
              />
              <text x="480" y="180" fill="#10b981" fontSize="12" fontFamily="JetBrains Mono" opacity="0.8">
                ZONA R.2 (RESIDENSIAL)
              </text>

              {/* Industrial Zone Polygon */}
              <polygon
                points="100,320 340,300 380,520 140,550"
                fill="rgba(59, 130, 246, 0.15)"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
              <text x="180" y="420" fill="#3b82f6" fontSize="12" fontFamily="JetBrains Mono" opacity="0.8">
                ZONA I.1 (INDUSTRI & LOGISTIK)
              </text>

              {/* River & Green Buffer Zone */}
              <path
                d="M 380,310 Q 420,380 480,410 T 600,550"
                fill="none"
                stroke="#10b981"
                strokeWidth="28"
                opacity="0.2"
              />
              <path
                d="M 380,310 Q 420,380 480,410 T 600,550"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="8"
                opacity="0.6"
              />
              <text x="490" y="460" fill="#34d399" fontSize="11" fontFamily="JetBrains Mono" opacity="0.9">
                SEMPADAN SUNGAI (RTH & L.1)
              </text>

              {/* TOD Zone Polygon */}
              <circle
                cx="660"
                cy="380"
                r="70"
                fill="rgba(168, 85, 247, 0.15)"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <text x="610" y="380" fill="#c084fc" fontSize="11" fontFamily="JetBrains Mono" opacity="0.9">
                SIMPUL TOD / SPU
              </text>
            </svg>

            {/* Interactive Pin Markers for Sample Parcels */}
            {SAMPLE_PARCELS.map((p, idx) => {
              const positions = [
                { top: '22%', left: '26%' },
                { top: '26%', left: '62%' },
                { top: '65%', left: '28%' },
                { top: '72%', left: '58%' },
                { top: '62%', left: '80%' },
              ];
              const pos = positions[idx] || { top: '50%', left: '50%' };
              const isSelected = activeParcel.id === p.id;

              return (
                <div
                  key={p.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleParcelClick(p);
                  }}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                  data-cursor="SELECT"
                >
                  <div
                    className={`relative flex items-center justify-center transition-all ${
                      isSelected ? 'scale-125' : 'hover:scale-110'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-black shadow-lg transition-transform ${
                        isSelected
                          ? 'bg-[#38ef7d] ring-4 ring-[#38ef7d]/40 shadow-[0_0_20px_#38ef7d]'
                          : 'bg-white text-black hover:bg-[#38ef7d]'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    {/* Hover tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#090b12] border border-white/20 px-3 py-1.5 rounded-lg text-white font-mono text-[10px] whitespace-nowrap shadow-xl z-40 pointer-events-none">
                      <p className="font-bold text-[#38ef7d]">{p.currentZoneCode}</p>
                      <p className="text-white/80">{p.address}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Custom Click Coordinates Marker */}
            {customCoord && (
              <div
                style={{ top: '50%', left: '50%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center"
              >
                <div className="w-8 h-8 rounded-full border-2 border-[#38ef7d] flex items-center justify-center animate-ping" />
                <div className="bg-black/90 border border-[#38ef7d] px-2 py-1 rounded text-[10px] font-mono text-[#38ef7d] mt-1 shadow-lg whitespace-nowrap">
                  TITIK INSPEKSI: {customCoord.lat}, {customCoord.lng}
                </div>
              </div>
            )}

            {/* Floating Live Legend */}
            <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md border border-white/10 rounded-xl p-3 font-mono text-[10px] space-y-1.5 z-20">
              <span className="text-white/40 uppercase block mb-1">Legenda Pola Ruang:</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
                <span className="text-white/80">Komersial & Jasa (K.1-K.2)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]" />
                <span className="text-white/80">Perumahan & Permukiman (R)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3b82f6]" />
                <span className="text-white/80">Industri & Logistik (I)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#06b6d4]" />
                <span className="text-white/80">Kawasan Lindung / RTH (L)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Layer Management & Selected Parcel Specification */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Parcel Inspector Box */}
          <div className="bg-[#0b0e18] border border-white/15 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#38ef7d]" />
                <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Data Teknis Kaveling
                </span>
              </div>
              <span
                className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  activeParcel.statusKesesuaian === 'Sesuai'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : activeParcel.statusKesesuaian === 'Bersyarat'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {activeParcel.statusKesesuaian}
              </span>
            </div>

            <div className="space-y-3 mb-6 font-mono text-xs">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Nomor Induk Bidang (NIB)</span>
                <span className="text-white font-semibold">{activeParcel.nib}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Alamat & Lokasi</span>
                <span className="text-white">{activeParcel.address}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase">Zonasi RDTR Terpetakan</span>
                <span className="text-[#38ef7d] font-bold">{activeParcel.currentZoneCode} — {activeParcel.zoneName}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-white/40 block text-[9px] uppercase">Luas Lahan</span>
                  <span className="text-white font-bold">{activeParcel.areaM2.toLocaleString('id-ID')} m²</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-white/40 block text-[9px] uppercase">Kepemilikan</span>
                  <span className="text-white font-bold">{activeParcel.ownerType}</span>
                </div>
              </div>
            </div>

            {/* Intensity Metrics Bars */}
            <div className="space-y-2.5 pt-3 border-t border-white/10 font-mono text-[11px] mb-6">
              <div className="flex justify-between text-white/70">
                <span>KDB Maksimal:</span>
                <strong className="text-white">{activeParcel.kdbMax}%</strong>
              </div>
              <div className="flex justify-between text-white/70">
                <span>KLB Maksimal:</span>
                <strong className="text-white">{activeParcel.klbMax}</strong>
              </div>
              <div className="flex justify-between text-white/70">
                <span>KDH Minimal:</span>
                <strong className="text-white">{activeParcel.kdhMin}%</strong>
              </div>
              <div className="flex justify-between text-white/70">
                <span>GSB Minimal:</span>
                <strong className="text-white">{activeParcel.gsbMin} Meter</strong>
              </div>
            </div>

            {/* Quick Action Button to prefill calculator */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenKkprForParcel(activeParcel);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#38ef7d] hover:bg-[#2ecc71] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(56,239,125,0.3)] cursor-pointer"
              data-cursor="TEST"
            >
              <span>Uji Kelayakan Izin Kaveling Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* GIS Layer Switcher Box */}
          <div className="bg-[#0b0e18] border border-white/15 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-4">
              <Layers className="w-4 h-4 text-[#38ef7d]" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                Lapisan Spasial Aktif
              </h3>
            </div>

            <div className="space-y-3">
              {layers.map((l) => (
                <div
                  key={l.id}
                  onClick={() => toggleLayer(l.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    l.active
                      ? 'bg-white/10 border-[#38ef7d]/50 text-white'
                      : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'
                  }`}
                >
                  <div className="pr-3">
                    <p className="font-mono text-xs font-semibold leading-tight">{l.name}</p>
                    <p className="text-[10px] text-white/50 line-clamp-1 mt-0.5">{l.description}</p>
                  </div>
                  <button className="shrink-0 p-1">
                    {l.active ? (
                      <Eye className="w-4 h-4 text-[#38ef7d]" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-white/30" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
