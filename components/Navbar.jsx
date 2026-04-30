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

  return (
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-55 transition-all duration-700 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-surface z-60 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-white/50 backdrop-blur-md">
          <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-10 object-contain" />
          <button onClick={() => setIsMenuOpen(false)} className="text-on-surface hover:rotate-90 transition-transform duration-300">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 bg-linear-to-b from-white to-surface">
          <div className="space-y-8">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Collections</p>
            <div className="space-y-6">
              <Link className="block font-noto-serif text-3xl tracking-tight text-on-surface hover:text-primary transition-colors" to="/bridal-collection" onClick={() => setIsMenuOpen(false)}>Bridal Lehengas</Link>
              <Link className="block font-noto-serif text-3xl tracking-tight text-on-surface hover:text-primary transition-colors" to="/non-bridal-collection" onClick={() => setIsMenuOpen(false)}>Non-Bridal Lehengas</Link>
              <Link className="block font-noto-serif text-3xl tracking-tight text-on-surface hover:text-primary transition-colors" to="/saree-collection" onClick={() => setIsMenuOpen(false)}>Heritage Sarees</Link>
            </div>
          </div>

          <div className="pt-10 border-t border-outline-variant/10 space-y-8">
            <Link className="flex items-center gap-6 font-jakarta-sans text-xs uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-all group" to="/wishlist" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">favorite</span> Wishlist
            </Link>
            <Link className="flex items-center gap-6 font-jakarta-sans text-xs uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-all group" to="/login" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">person</span> Account
            </Link>
            <Link className="flex items-center gap-6 font-jakarta-sans text-xs uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-all group" to="/order-tracking" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">local_shipping</span> Track Order
            </Link>
          </div>
        </div>

        <div className="p-10 bg-surface-container-low/50 backdrop-blur-md border-t border-outline-variant/10">
          <p className="font-jakarta-sans text-[9px] uppercase tracking-[0.3em] text-outline/40 text-center font-bold">© 2024 ETASHAA HERITAGE</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
