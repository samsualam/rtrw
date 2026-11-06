import React from 'react';
import { InteractiveGisSimulator } from './InteractiveGisSimulator';
import { ParcelInfo } from '../types/spatial';
import { soundEffects } from '../utils/audio';
import { X, Compass } from 'lucide-react';

interface GisMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedParcel: ParcelInfo | null;
  onSelectParcel: (parcel: ParcelInfo) => void;
  onOpenKkprForParcel: (parcel: ParcelInfo) => void;
}

export const GisMapModal: React.FC<GisMapModalProps> = ({
  isOpen,
  onClose,
  selectedParcel,
  onSelectParcel,
  onOpenKkprForParcel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0A2129] border border-white/20 rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-y-auto p-4 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 theme-dark">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FFAF]/20 border border-[#00FFAF] flex items-center justify-center text-[#00FFAF]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-onest font-black text-xl text-white">
                Peta Tematik &amp; Radar Poligon Spasial RDTR
              </h3>
              <p className="font-mono text-xs text-white/50">
                Data Vektor Skala 1:5.000 Terhubung Server Geodatabase ATR/BPN
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Interactive GIS Simulator */}
        <InteractiveGisSimulator
          selectedParcel={selectedParcel}
          onSelectParcel={onSelectParcel}
          onOpenKkprForParcel={(p) => {
            onClose();
            onOpenKkprForParcel(p);
          }}
        />
      </div>
    </div>
  );
};
