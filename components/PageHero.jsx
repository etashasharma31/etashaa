import React from 'react';

const PageHero = ({ title, subtitle, tagline, image, opacity = 'opacity-30' }) => {
  return (
    <section className="relative h-[450px] md:h-[400px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className={`w-full h-full object-cover ${opacity} grayscale-20 scale-110 transition-transform duration-10000 hover:scale-125`} 
          alt={title} 
          src={image}
        />
        <div className="absolute inset-0 bg-linear-to-b from-surface/20 to-surface"></div>
      </div>
      <div className="relative z-10 text-center space-y-3 px-4">
        {tagline && (
          <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-primary opacity-80 animate-fadeUp">
            {tagline}
          </p>
        )}
        <h1 className="animate-fadeUp font-headline text-4xl md:text-5xl leading-tight" style={{ animationDelay: '0.2s' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="font-jakarta-sans text-xs text-on-surface-variant mt-1 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
