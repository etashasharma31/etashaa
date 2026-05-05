import React, { useState, useEffect } from 'react';

const AtelierPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-1000">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl transition-opacity duration-1000"
        onClick={closePopup}
      />

      {/* Popup Content */}
      <div className="relative w-full max-w-5xl aspect-[1.8/1] md:aspect-2/1 bg-white shadow-[0_50px_150px_-30px_rgba(0,0,0,0.7)] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-1000 ease-out">
        <button
          onClick={closePopup}
          className="absolute top-6 right-6 z-30 text-on-surface/40 hover:text-primary transition-all hover:rotate-90 duration-500"
        >
          <span className="material-symbols-outlined text-2xl font-light">close</span>
        </button>

        {/* Left: Majestic Image Column */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
          <img
            src="/images/bridal_new_1.png"
            alt="Etashaa Heritage Couture"
            className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-12 left-12 right-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary"></span>
              <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.6em] font-bold text-primary">New Masterpiece</p>
            </div>
            <h3 className="font-noto-serif text-4xl md:text-6xl text-white italic leading-tight drop-shadow-2xl">
              The Heritage <br />Signature Series
            </h3>
          </div>
        </div>

        {/* Right: Refined Content Column */}
        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-surface relative">
          {/* Subtle Branding Watermark */}
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.04] pointer-events-none select-none">
            <img src="/images/vidai_illustration.png" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="space-y-12 relative z-10">
            <div className="space-y-6">
              <div className="inline-block border-b border-primary/20 pb-2">
                <span className="text-primary font-jakarta-sans text-[11px] uppercase tracking-[0.5em] font-bold">Atelier Early Access</span>
              </div>
              <h2 className="font-noto-serif text-4xl md:text-5xl leading-[1.15] text-on-surface">
                A Private <br />Showcase Awaits
              </h2>
              <p className="text-on-surface/50 font-jakarta-sans text-sm leading-relaxed italic max-w-sm">
                Be the first to witness our upcoming festive curation. We invite you to an exclusive digital preview of our latest hand-embroidered marvels.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); closePopup(); }} className="space-y-8">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Atelier Guest Email"
                  required
                  className="w-full bg-transparent border-b border-outline-variant/30 py-5 text-sm font-jakarta-sans outline-none focus:border-primary transition-all pr-12 placeholder:text-outline/30"
                />
                <span className="material-symbols-outlined absolute right-0 top-5 text-outline/30 group-focus-within:text-primary transition-colors">mail</span>
              </div>

              <div className="space-y-4">
                <button className="btn-premium w-full py-6! text-[11px]!">
                  <span>Request Private Invitation</span>
                </button>
                <p className="text-center text-[10px] text-outline/50 uppercase tracking-[0.3em] font-bold">
                  Exclusive • Handcrafted • Heritage
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtelierPopup;

