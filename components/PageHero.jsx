import React from 'react';

const PageHero = ({ title, subtitle, tagline, footerText, image }) => {
  return (
    <section className="relative w-full bg-[#F5E6D3] min-h-[350px] md:min-h-[400px] flex items-center">
      {/* Background patterns/texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#735b24 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
      
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center gap-12 relative z-10 py-20">
        {/* Left Side: Text Content */}
        <div className="flex-1 text-center space-y-8 flex flex-col items-center px-4">
          
          {/* Top Ornament & Tagline */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-[1px] bg-primary/30 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5E6D3] px-2 text-[10px] text-primary">✧</div>
            </div>
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary/80 font-bold">
              {tagline || "Timeless Elegance"}
            </p>
          </div>

          {/* Main Title */}
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-primary leading-tight tracking-normal uppercase break-words w-full px-2">
            {title}
          </h1>

          {/* Bottom Tagline & Ornament */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-jakarta-sans text-[11px] md:text-xs uppercase tracking-[0.5em] text-on-surface font-medium italic">
              {subtitle || "Tradition. Grace. You."}
            </p>
            <div className="w-32 h-[1px] bg-primary/30 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5E6D3] px-2 text-[10px] text-primary">❦</div>
            </div>
          </div>

          {/* Footer Text */}
          {footerText && (
            <p className="font-jakarta-sans text-[10px] md:text-[11px] text-on-surface/60 max-w-sm leading-relaxed italic">
              {footerText}
            </p>
          )}
        </div>

        {/* Right Side: Featured Image */}
        {image && (
          <div className="flex-1 w-full md:max-w-md h-[400px] md:h-[500px] relative reveal">
            <div className="absolute inset-0 border border-primary/20 -m-4 translate-x-2 translate-y-2 z-0"></div>
            <div className="w-full h-full relative z-10 overflow-hidden shadow-2xl">
              <img 
                className="w-full h-full object-cover grayscale-[20%] hover:scale-110 transition-transform duration-[10s]" 
                src={image} 
                alt={title} 
              />
            </div>
            {/* Leaf Ornaments */}
            <div className="absolute -top-10 -left-10 text-primary/20 pointer-events-none hidden lg:block">
              <span className="material-symbols-outlined text-8xl rotate-12">eco</span>
            </div>
            <div className="absolute -bottom-10 -right-10 text-primary/20 pointer-events-none hidden lg:block">
              <span className="material-symbols-outlined text-8xl -rotate-45">eco</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
