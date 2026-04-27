import React, { useState, useEffect } from 'react';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for newsletter signup would go here
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative max-w-sm w-full bg-[#1c1c1a] overflow-hidden reveal shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {/* Background Image Container */}
        <div className="absolute inset-0 opacity-40">
          <img src="/images/bridal_new_4.jpg" alt="Etashaa Bridal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a] via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 py-12 text-center">
          <button onClick={handleClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          <span className="font-jakarta-sans text-[9px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Exclusive Invitation</span>
          <h2 className="text-2xl font-noto-serif text-white mb-3 leading-tight">Grab 10% OFF Your First Purchase!</h2>
          <p className="text-white/70 text-[10px] font-jakarta-sans tracking-wide mb-8 px-4">Be the first to discover our new collections & enjoy special atelier access.</p>

          <form onSubmit={handleSubmit} className="space-y-3 max-w-xs mx-auto">
            <div className="relative">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white text-[#1c1c1a] px-5 py-3 text-[9px] tracking-widest outline-none font-bold"
              />
            </div>
            <button type="submit" className="w-full bg-[#c8a96a] hover:bg-[#b8995a] text-white py-3 font-jakarta-sans uppercase tracking-[0.2em] text-[9px] font-bold transition-all duration-500 shadow-xl">
              Get My Private Discount
            </button>
            <button type="button" onClick={handleClose} className="text-white/40 text-[8px] uppercase tracking-widest hover:text-white transition-colors pt-2">No, thank you</button>
          </form>

          <p className="text-[7px] uppercase tracking-widest text-white/20 mt-8 leading-loose">
            By signing up, you agree to receive marketing communications via email. <br/>You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
