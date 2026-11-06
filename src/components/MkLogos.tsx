import React from 'react';
import { Shield, Building2, Landmark, Compass, Award, CheckCircle2 } from 'lucide-react';

export const MkLogos: React.FC = () => {
  const partners = [
    {
      name: 'Bappeda-Litbang Kab. Bone Bolango',
      role: 'Badan Perencanaan Pembangunan & Penataan Ruang Daerah',
      badge: 'Penyusun RTRW',
      icon: Landmark,
    },
    {
      name: 'Dinas PUPR & Perkim Kab. Bone Bolango',
      role: 'Pelaksana Penataan Ruang & Pengendalian Bangunan',
      badge: 'Rekomendasi Teknis',
      icon: Building2,
    },
    {
      name: 'Balai Taman Nasional (TNBNW)',
      role: 'Pengelola Kawasan Konservasi Bogani Nani Wartabone',
      badge: 'Zona Konservasi',
      icon: Shield,
    },
    {
      name: 'Kantor Pertanahan ATR/BPN Bone Bolango',
      role: 'Sinkronisasi Batas Bidang Tanah & Peta Pola Ruang',
      badge: 'Geodatabase NIB',
      icon: Compass,
    },
    {
      name: 'Dinas Pertanian & Ketahanan Pangan',
      role: 'Pengawasan Kawasan Pertanian Pangan Abadi (LP2B)',
      badge: 'Sawah Abadi',
      icon: Award,
    },
    {
      name: 'Dinas Pariwisata Kab. Bone Bolango',
      role: 'Pengembangan Koridor Wisata Bahari Pesisir Selatan',
      badge: 'Wisata Pesisir',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 bg-[#F8FAF5] border-t border-[#0A2129]/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-onest font-black text-3xl sm:text-5xl md:text-6xl text-[#0A2129] leading-tight max-w-4xl mb-16">
          Sinergi kelembagaan penataan ruang{' '}
          <span className="accent font-extrabold"><em>Kabupaten Bone Bolango</em></span> dari pegunungan hingga pesisir.
        </h2>

        {/* 6 Logo / Partner Boxes matching MKVision .brands */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#0A2129]/10 hover:border-[#00FFAF] p-8 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A2129]/5 group-hover:bg-[#00FFAF]/20 flex items-center justify-center text-[#0A2129] group-hover:text-[#00a874] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[11px] text-[#5d6f76] bg-[#0A2129]/5 px-3 py-1 rounded-full font-semibold">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="font-onest font-bold text-xl text-[#0A2129] mb-2 group-hover:text-[#00a874] transition-colors">
                    {p.name}
                  </h3>

                  <p className="text-xs text-[#5d6f76] font-light leading-relaxed">
                    {p.role}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#0A2129]/5 flex items-center justify-between font-mono text-xs text-[#0A2129]/40">
                  <span>TERHUBUNG SECARA REAL-TIME</span>
                  <span className="w-2 h-2 rounded-full bg-[#00FFAF] animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
