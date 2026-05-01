import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  return (
    <>
      <nav id="main-nav" className={`sticky top-0 w-full z-50 bg-[#FCF9F6]/80 backdrop-blur-xl border-b border-outline-variant/10 transition-all duration-500 ${isScrolled ? 'h-16 md:h-16 shadow-sm' : 'h-16 md:h-24'}`}>
        <div className="flex items-center max-w-custom mx-auto h-full px-6 md:px-12 relative">

          {/* Left: Logo Container */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className={`shrink-0 transition-all duration-500 ${isSearchExpanded ? 'opacity-0 scale-95 pointer-events-none md:opacity-100 md:scale-100' : 'opacity-100 scale-100'}`}>
              <img
                src="/images/logo_etashaa.png"
                alt="Etashaa Logo"
                className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-20'}`}
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className={`hidden lg:flex items-center justify-center space-x-10 font-jakarta-sans tracking-[0.2em] uppercase text-[10px] font-bold transition-all duration-500 ${isSearchExpanded ? 'opacity-0 pointer-events-none -translate-y-2 w-0 overflow-hidden' : 'opacity-100 translate-y-0 w-auto'}`}>
            <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1 whitespace-nowrap relative group" to="/bridal-collection">
              Bridal Lehengas
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1 whitespace-nowrap relative group" to="/non-bridal-collection">
              Non-Bridal Lehengas
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1 whitespace-nowrap relative group" to="/saree-collection">
              Heritage Sarees
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1 whitespace-nowrap relative group" to="/etashaa-muse">
              The Muse
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right: Action Icons & Inline Search */}
          <div className={`flex items-center justify-end gap-4 md:gap-8 text-[#1c1c1a] transition-all duration-500 ${isSearchExpanded ? 'flex-6' : 'flex-1'}`}>
            {/* Expanding Search Bar */}
            <div className={`relative flex items-center transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isSearchExpanded ? 'w-full md:max-w-[700px]' : 'w-12'}`}>
              <button
                onClick={() => setIsSearchExpanded(true)}
                className={`flex items-center justify-center hover:text-primary transition-all duration-500 z-10 ${isSearchExpanded ? 'absolute left-6 pointer-events-none text-primary scale-110' : 'w-12 h-12'}`}
              >
                <span className="material-symbols-outlined text-[24px] font-light">search</span>
              </button>

              <input
                ref={searchInputRef}
                type="text"
                placeholder="Seek a masterpiece..."
                className={`bg-surface-bright border border-outline-variant/20 py-4 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] font-noto-serif text-sm italic outline-none rounded-full focus:border-primary/40 focus:bg-white ${isSearchExpanded ? 'w-full pl-16 pr-16 opacity-100 shadow-none' : 'w-0 opacity-0 pointer-events-none border-none'}`}
                onBlur={() => { if (!searchInputRef.current?.value) setIsSearchExpanded(false); }}
                onKeyDown={(e) => { if (e.key === 'Escape') setIsSearchExpanded(false); }}
              />

              {isSearchExpanded && (
                <button
                  onClick={() => {
                    setIsSearchExpanded(false);
                    if (searchInputRef.current) searchInputRef.current.value = '';
                  }}
                  className="absolute right-6 hover:text-primary transition-all duration-500 flex items-center justify-center text-outline/30 hover:rotate-180"
                >
                  <span className="material-symbols-outlined text-[20px] font-light">close</span>
                </button>
              )}
            </div>

            {/* Account, Wishlist & Cart Icons */}
            <div className={`flex items-center gap-4 md:gap-8 transition-all duration-500 ${isSearchExpanded ? 'opacity-0 scale-90 w-0 overflow-hidden pointer-events-none md:opacity-100 md:scale-100 md:w-auto md:pointer-events-auto' : 'opacity-100 w-auto'}`}>
              <Link to="/wishlist" className="hover:text-primary transition-all duration-300 flex items-center justify-center relative group">
                <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">favorite</span>
              </Link>
              <Link to="/login" className="hover:text-primary transition-all duration-300 hidden md:flex items-center justify-center group">
                <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">person</span>
              </Link>
              <Link to="/cart" className="relative flex items-center justify-center hover:text-primary transition-all duration-300 group">
                <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="cart-count absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-[9px] flex items-center justify-center rounded-full font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                id="hamburger"
                className="lg:hidden flex items-center justify-center hover:text-primary transition-all duration-300"
                aria-label="Open menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="material-symbols-outlined text-[28px]">{isMenuOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[90] transition-all duration-700 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-[450px] z-[100] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden shadow-[20px_0_100px_rgba(0,0,0,0.3)] flex flex-col ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: '#FCF9F6' }}
      >
        {/* Header */}
        <div className="p-8 flex justify-between items-center border-b border-outline-variant/10 sticky top-0 z-10" style={{ backgroundColor: '#FCF9F6' }}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-12 object-contain" />
          </Link>
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:rotate-90 transition-transform duration-500 shadow-sm"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Links Content */}
        <div className="flex-1 overflow-y-auto px-10 pt-8 pb-20 space-y-16 scrollbar-hide">
          {/* Main Collections */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-primary/30"></span>
              <p className="font-jakarta-sans text-[11px] uppercase tracking-[0.6em] text-primary font-bold">Collections</p>
            </div>
            <div className="flex flex-col gap-10">
              {[
                { label: 'Bridal Lehengas', to: '/bridal-collection', sub: 'The Signature Series' },
                { label: 'Non-Bridal', to: '/non-bridal-collection', sub: 'Contemporary Grace' },
                { label: 'Heritage Sarees', to: '/saree-collection', sub: 'Timeless Weaves' },
                { label: 'The Muse', to: '/etashaa-muse', sub: 'Our Brides' }
              ].map((item, index) => (
                <div 
                  key={item.label}
                  className={`group transition-all duration-1000 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150 + 100}ms` }}
                >
                  <Link 
                    to={item.to} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="block font-jakarta-sans text-[9px] uppercase tracking-[0.4em] text-primary/40 font-bold">{item.sub}</span>
                      <div className="flex items-center gap-4">
                        <span className="block font-noto-serif text-3xl tracking-tight text-on-surface group-hover:text-primary transition-colors duration-500">{item.label}</span>
                        <span className="h-px flex-1 bg-outline-variant/10 group-hover:bg-primary/20 transition-colors"></span>
                        <span className="material-symbols-outlined text-primary/0 group-hover:text-primary/100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 text-lg">north_east</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Explore */}
          <div className="pt-16 border-t border-outline-variant/10 space-y-12">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-primary/30"></span>
              <p className="font-jakarta-sans text-[11px] uppercase tracking-[0.6em] text-primary font-bold">Explore</p>
            </div>
            <div className="grid grid-cols-1 gap-10">
              {[
                { label: 'Track Order', to: '/order-tracking', icon: 'local_shipping' }
              ].map((item, index) => (
                <Link 
                  key={item.label}
                  className={`flex items-center gap-6 font-jakarta-sans text-[11px] uppercase tracking-[0.3em] text-on-surface/70 hover:text-primary transition-all duration-700 group ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                  to={item.to} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-9 h-9 rounded-full bg-surface-container/50 border border-outline-variant/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-[18px] font-light text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all">{item.icon}</span>
                  </div>
                  <span className="font-semibold">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Assistance & CTA */}
          <div className={`pt-12 space-y-10 transition-all duration-1000 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
            <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10 space-y-6">
              <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Personal Styling</p>
              <h4 className="font-noto-serif text-2xl text-on-surface">Book a Digital Consultation</h4>
              <p className="font-jakarta-sans text-xs text-on-surface/60 leading-relaxed">Experience our atelier from the comfort of your home with a curated walkthrough.</p>
              <Link 
                to="/book-appointment" 
                onClick={() => setIsMenuOpen(false)}
                className="btn-premium w-full !py-4 !text-[11px]"
              >
                <span>Book Appointment</span>
                <span className="material-symbols-outlined text-sm ml-2">calendar_month</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-4 pl-4">
              <p className="font-jakarta-sans text-[9px] uppercase tracking-[0.2em] text-outline italic">Direct Assistance</p>
              <a href="tel:+919999999999" className="font-noto-serif text-xl text-on-surface hover:text-primary transition-colors flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">call</span>
                +91 999 999 9999
              </a>
            </div>
          </div>
        </div>

        {/* Footer Socials */}
        <div className="p-10 border-t border-outline-variant/10" style={{ backgroundColor: '#f6f3f0' }}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-10">
              {['instagram', 'facebook', 'pinterest'].map((social) => (
                <a key={social} href="#" className="text-on-surface/40 hover:text-primary transition-colors">
                  <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] font-bold">{social}</span>
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-jakarta-sans text-[9px] uppercase tracking-[0.5em] text-outline/50 font-bold">© 2024 ETASHAA HERITAGE</p>
              <div className="w-12 h-px bg-outline-variant/20"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
