import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/zoningData';
import { soundEffects } from '../utils/audio';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    soundEffects.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38ef7d]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#38ef7d] font-semibold">
              KONSULTASI & INFORMASI UMUM
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            PERTANYAAN SERING DIAJUKAN
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-white/60 text-sm max-w-md font-light leading-relaxed">
          Jawaban komprehensif mengenai interpretasi zonasi RTRW, teknis perizinan KKPR, dan batasan intensitas pemanfaatan ruang.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {FAQ_ITEMS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#0d101a] border-[#38ef7d]/40 shadow-[0_0_20px_rgba(56,239,125,0.08)]'
                  : 'bg-[#080a10] border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                onMouseEnter={() => soundEffects.playHover()}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                data-cursor="FAQ"
              >
                <span className="font-syne font-bold text-base sm:text-lg text-white">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#38ef7d] text-black border-[#38ef7d]' : 'text-white/60 bg-white/5'
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm text-white/70 font-light leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
