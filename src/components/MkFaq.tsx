import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/zoningData';
import { soundEffects } from '../utils/audio';
import { Plus, Minus } from 'lucide-react';

export const MkFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    soundEffects.playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#F8FAF5] border-t border-[#0A2129]/10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5d6f76] block mb-3 font-semibold">
            INFORMASI &amp; KONSULTASI
          </span>
          <h2 className="font-onest font-black text-3xl sm:text-5xl text-[#0A2129] leading-tight">
            Pertanyaan yang sering <span className="accent font-extrabold"><em>diajukan</em></span>.
          </h2>
        </div>

        <div className="max-w-4xl border-t border-[#0A2129]/10 divide-y divide-[#0A2129]/10">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                >
                  <span className="font-onest font-bold text-lg sm:text-2xl text-[#0A2129] group-hover:text-[#00a874] transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full border border-[#0A2129]/20 flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#0A2129] text-[#00FFAF]' : 'bg-white text-[#0A2129]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-12 text-sm sm:text-base text-[#5d6f76] font-light leading-relaxed animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
