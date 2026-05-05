import React from 'react';

const EditorialHero = ({ tagline, title, description, bgText }) => {
  return (
    <section className="bg-[#FCF9F6] pt-8 pb-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-6">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.8em] text-primary/60 font-bold">
              {tagline || "Etashaa Heritage"}
            </p>
            <h2 className="font-noto-serif text-5xl md:text-6xl tracking-tight text-on-surface leading-tight">
              {title}
            </h2>
          </div>
          <div className="max-w-lg">
            <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>
            <p className="font-jakarta-sans text-sm text-on-surface/50 leading-relaxed italic">
              {description}
            </p>
          </div>
        </div>
        {bgText && (
          <div className="absolute top-[-20px] right-1/2 translate-x-1/2 opacity-[0.03] pointer-events-none select-none">
            <span className="font-noto-serif text-[180px] md:text-[250px] leading-none uppercase">
              {bgText}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditorialHero;
