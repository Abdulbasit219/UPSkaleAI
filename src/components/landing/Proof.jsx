import React from "react";

const Proof = ({ isDark }) => {
  return (
    <div className="mt-24 flex flex-col items-center gap-10">
      <div className="text-sm font-bold opacity-40 uppercase tracking-[0.3em] text-center">
        Trusted by 10,000+ top-tier professionals
      </div>

      <div
        className={`relative w-full max-w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 md:before:w-20 before:bg-gradient-to-r ${isDark ? "before:from-slate-950" : "before:from-gray-50"} before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-10 md:after:w-20 after:bg-gradient-to-l ${isDark ? "after:from-slate-950" : "after:from-gray-50"} after:to-transparent`}
      >
        <div className="flex animate-marquee gap-8 md:gap-16 items-center whitespace-nowrap">
          {[1, 2].map((set) => (
            <div
              key={set}
              className="flex gap-8 md:gap-16 items-center shrink-0"
            >
              <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                VORTEX
              </div>
              <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                AETHER
              </div>
              <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                QUANTUM
              </div>
              <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                NEON
              </div>
              <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                PULSE
              </div>
              <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                ZIGMA
              </div>
              <div className="font-black italic text-2xl md:text-4xl opacity-20 hover:opacity-100 transition-opacity cursor-default">
                ORBIT
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proof;
