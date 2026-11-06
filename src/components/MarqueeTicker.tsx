import React from 'react';

interface MarqueeTickerProps {
  reverse?: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ reverse = false }) => {
  const items = [
    'RENCANA TATA RUANG WILAYAH 2024–2044',
    'KESESUAIAN KEGIATAN PEMANFAATAN RUANG (KKPR)',
    'KOEFISIEN DASAR BANGUNAN (KDB)',
    'KOEFISIEN LANTAI BANGUNAN (KLB)',
    'GARIS SEMPADAN BANGUNAN (GSB)',
    'PERSETUJUAN BANGUNAN GEDUNG (PBG)',
    'INTEGRASI OSS-RBA & ATR/BPN',
    'ANALISIS RISIKO RAWAN BENCANA (KRB)',
    'RENCANA DETAIL TATA RUANG (RDTR 1:5.000)',
    'INTENSITAS RUANG & KOEFISIEN DAERAH HIJAU (KDH)'
  ];

  return (
    <div className="py-4 border-y border-white/10 bg-[#07090f] overflow-hidden whitespace-nowrap select-none relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050608] to-transparent z-10 pointer-events-none" />

      <div
        className={`inline-flex items-center gap-8 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{
          display: 'inline-flex',
          animation: `${reverse ? 'marqueeRev' : 'marqueeFwd'} 35s linear infinite`,
        }}
      >
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="inline-flex items-center gap-8">
            <span className="font-syne font-bold text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38ef7d]" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeFwd {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};
