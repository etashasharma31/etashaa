import React, { useState, useEffect } from 'react';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const hasSeenNewsletter = sessionStorage.getItem('etashaa_newsletter_seen');
    if (!hasSeenNewsletter) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('etashaa_newsletter_seen', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for newsletter signup would go here
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-700">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={handleClose}></div>

      <div className="relative max-w-5xl w-full bg-white shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-1000 ease-out">

        {/* Left: Visual Column */}
        <div className="w-full md:w-5/12 h-48 md:h-auto relative overflow-hidden group">
          <img
            src="/images/bridal_new_4.jpg"
            alt="Etashaa Bridal Heritage"
            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Subtle branding on image */}
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white font-jakarta-sans text-[8px] uppercase tracking-[0.6em] font-bold opacity-80 mb-2">Heritage Couture</p>
            <div className="h-px w-12 bg-white/40"></div>
          </div>
        </div>

        {/* Right: Content Column */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-surface relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-on-surface/40 hover:text-primary transition-all hover:rotate-90 duration-500 z-20"
          >
            <span className="material-symbols-outlined text-2xl font-light">close</span>
          </button>

          {/* Decorative Pattern Background */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] pointer-events-none">
            <img src="/images/vidai_illustration.png" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-primary/40"></span>
                <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.5em] text-primary font-bold">Exclusive Invitation</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-noto-serif text-on-surface leading-[1.1] tracking-tight">
                Join the <span className="italic">Etashaa</span> Inner Circle
              </h2>

              <p className="text-on-surface/60 text-xs md:text-sm font-jakarta-sans leading-relaxed max-w-md italic">
                Experience the pinnacle of Indian craftsmanship. Subscribe to receive an exclusive 10% privilege on your first curation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-outline-variant/30 py-4 text-xs font-jakarta-sans outline-none focus:border-primary transition-colors pr-10"
                />
                <span className="material-symbols-outlined absolute right-0 top-4 text-outline/30 group-focus-within:text-primary transition-colors text-lg">mail</span>
              </div>

              <div className="flex flex-col gap-4">
                <button type="submit" className="btn-premium w-full py-5! text-[11px]!">
                  <span>Unlock My Privilege</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-on-surface/30 text-[9px] uppercase tracking-[0.3em] hover:text-primary transition-colors font-bold text-center"
                >
                  Continue without offer
                </button>
              </div>
            </form>

            <div className="pt-8 border-t border-outline-variant/10">
              <p className="text-[8px] uppercase tracking-[0.2em] text-outline/40 leading-loose">
                By subscribing, you agree to our <span className="text-on-surface/60">Privacy Policy</span>. <br />
                Private Access • Limited Seasonal Offers • Artisan Stories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;

