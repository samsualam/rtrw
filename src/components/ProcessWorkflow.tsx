import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/zoningData';
import { soundEffects } from '../utils/audio';
import { CheckCircle2, ChevronRight, Clock, Scale, ArrowUpRight } from 'lucide-react';

export const ProcessWorkflow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="alur" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#38ef7d]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#38ef7d] font-semibold">
              ALUR PERIZINAN DIGITAL
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            PROSEDUR PENERBITAN KKPR & PBG
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-white/60 text-sm max-w-md font-light leading-relaxed">
          Tahapan verifikasi berkas perizinan berusaha dan non-berusaha berbasis kesesuaian ruang terintegrasi Sistem OSS RBA & SIMBG.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <div
                key={step.step}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveStepIndex(idx);
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-white/10 border-[#38ef7d] shadow-[0_0_25px_rgba(56,239,125,0.15)] translate-x-2'
                    : 'bg-[#0a0d16] border-white/10 hover:border-white/20 text-white/60 hover:text-white'
                }`}
                data-cursor="STEP"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-lg font-black transition-colors ${
                      isActive ? 'text-[#38ef7d]' : 'text-white/30'
                    }`}
                  >
                    {step.step}
                  </span>
                  <div>
                    <h4
                      className={`font-syne text-sm font-bold transition-colors ${
                        isActive ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] font-mono text-white/40 mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isActive ? 'text-[#38ef7d] translate-x-1' : 'text-white/20'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Detailed Active Step Focus View */}
        <div className="lg:col-span-7 bg-[#0b0e18] border border-white/15 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38ef7d]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Step Meta Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-8 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#38ef7d] font-bold text-base">STEP {activeStep.step}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/60">05 TOTAL FASE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/70">
                <Clock className="w-3.5 h-3.5 text-[#38ef7d]" />
                <span>{activeStep.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70">
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                <span className="line-clamp-1 max-w-[200px]">{activeStep.legalBasis}</span>
              </div>
            </div>
          </div>

          {/* Step Main Title & Narrative */}
          <h3 className="font-syne font-black text-2xl sm:text-3xl text-white mb-4">
            {activeStep.title}
          </h3>

          <p className="text-white/80 text-base leading-relaxed font-light mb-8">
            {activeStep.desc}
          </p>

          {/* Key Checklist Milestones */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-6 mb-8">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
              Luaran & Validasi Sistem:
            </h5>
            <div className="space-y-3">
              {activeStep.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#38ef7d] mt-0.5 shrink-0" />
                  <span className="text-xs font-mono text-white/90">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => {
                soundEffects.playClick();
                setActiveStepIndex((i) => Math.max(0, i - 1));
              }}
              className="px-4 py-2 rounded-lg border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors cursor-pointer text-white"
            >
              ← Langkah Sebelumnya
            </button>

            <button
              disabled={activeStepIndex === PROCESS_STEPS.length - 1}
              onClick={() => {
                soundEffects.playClick();
                setActiveStepIndex((i) => Math.min(PROCESS_STEPS.length - 1, i + 1));
              }}
              className="px-4 py-2 rounded-lg bg-[#38ef7d] hover:bg-[#2ecc71] disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Langkah Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
