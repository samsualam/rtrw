import React from 'react';

export const MkRunningText: React.FC = () => {
  return (
    <section className="py-6 border-y border-[#0A2129]/10 bg-[#F8FAF5] overflow-hidden whitespace-nowrap select-none">
      <div
        className="inline-flex items-center gap-10 animate-marquee"
        style={{
          animation: 'marqueeFwd 28s linear infinite',
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="inline-flex items-center gap-10">
            <span className="font-onest font-medium text-lg text-[#5d6f76]">
              PERDA NO. 5 TAHUN 2021 · RTRW BONE BOLANGO 2021–2041 · TN BOGANI NANI WARTABONE · SAWAH ABADI LP2B · DANAU PERINTIS
            </span>
            <span className="font-onest font-black text-2xl text-[#0A2129]">
              Bone Bolango <span className="text-grad font-black">Lestari &amp; Terarah</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00FFAF]" />
          </div>
        ))}
      </div>
    </section>
  );
};
