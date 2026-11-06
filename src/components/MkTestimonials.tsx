import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const MkTestimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      quote:
        'Peta pola ruang RTRW digital ini sangat membantu melindungi sawah irigasi teknis kami di Kabila dari desakan alih fungsi perumahan liar.',
      author: 'Mansur Daud',
      role: 'Ketua Gabungan Kelompok Tani',
      org: 'Sentra Pangan Kabila - Alale',
      location: 'Kab. Bone Bolango',
    },
    {
      quote:
        'Lebih dari 60% wilayah Bone Bolango adalah kawasan konservasi taman nasional. Platform ini memastikan batas TNBNW dan DAS Bone terjaga tanpa kompromi.',
      author: 'Ir. Rusli Mohamad, M.Si.',
      role: 'Pemerhati Lingkungan & Kehutanan',
      org: 'Sahabat Taman Nasional TNBNW',
      location: 'Suwawa',
    },
    {
      quote:
        'Investor wisata pesisir di Botutonuo dan Botubarani kini mendapat kepastian hukum mengenai sempadan pantai 35 meter dan arahan zonasi bahari.',
      author: 'Fahri Pomalingo',
      role: 'Pengelola Homestay & Ekowisata',
      org: 'Asosiasi Wisata Bahari Bonepantai',
      location: 'Kabila Bone',
    },
  ];

  const current = testimonials[activeIdx];

  const handlePrev = () => {
    soundEffects.playClick();
    setActiveIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    soundEffects.playClick();
    setActiveIdx((i) => (i + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#0A2129] text-white py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden theme-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00FFAF] block mb-3 font-semibold">
              TESTIMONI PENGGUNA
            </span>
            <h2 className="font-onest font-black text-3xl sm:text-5xl text-white leading-tight">
              Pengalaman pemohon &amp; instansi mitra
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-[#00FFAF] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-[#00FFAF] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Big Testimonial Display matching MKVision */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-1.5 mb-8 text-[#00FFAF]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <p className="font-onest font-medium text-2xl sm:text-3xl md:text-4xl text-white leading-snug tracking-tight mb-10">
            "{current.quote}"
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00FFAF] text-[#0A2129] flex items-center justify-center font-bold text-lg font-onest">
              {current.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-onest font-bold text-lg text-white">
                {current.author}
              </h4>
              <p className="text-sm font-mono text-white/50">
                {current.role} · {current.org} ({current.location})
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
