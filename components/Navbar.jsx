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
    <nav id="main-nav" className={`sticky top-0 w-full z-50 bg-[#FCF9F6] border-b border-outline-variant/20 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
      <div className="flex items-center max-w-custom mx-auto h-full px-6 md:px-12 relative">
        
        {/* Left: Logo Container */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className={`shrink-0 transition-opacity duration-300 ${isSearchExpanded ? 'opacity-0 pointer-events-none md:opacity-100' : 'opacity-100'}`}>
            <img 
              src="/images/logo_etashaa.png" 
              alt="Etashaa Logo" 
              className={`transition-all duration-300 object-contain ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-20'}`} 
            />
          </Link>
        </div>
        
        {/* Center: Navigation Links */}
        <div className={`hidden lg:flex items-center justify-center space-x-10 font-noto-serif tracking-widest uppercase text-[11px] transition-all duration-500 ${isSearchExpanded ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1 whitespace-nowrap" to="/bridal-collection">Bridal Lehengas</Link>
          <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1 whitespace-nowrap" to="/non-bridal-collection">Non-Bridal Lehengas</Link>
          <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1 whitespace-nowrap" to="/saree-collection">Heritage Sarees</Link>
        </div>

        {/* Right: Action Icons & Inline Search */}
        <div className="flex-1 flex items-center justify-end gap-4 md:gap-6 text-[#1c1c1a]">
          {/* Expanding Search Bar */}
          <div className={`relative flex items-center transition-all duration-700 ease-in-out ${isSearchExpanded ? 'w-full max-w-[1000px]' : 'w-[32px]'}`}>
            <button 
              onClick={() => setIsSearchExpanded(true)}
              className={`flex items-center justify-center hover:text-primary transition-colors duration-300 z-10 ${isSearchExpanded ? 'absolute left-5 pointer-events-none text-primary' : ''}`}
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search our atelier heritage..."
              className={`w-full bg-surface-container-high/40 border border-outline-variant/20 py-3 transition-all duration-700 ease-in-out font-jakarta-sans text-xs outline-none rounded-full focus:border-primary/40 focus:ring-4 focus:ring-primary/5 ${isSearchExpanded ? 'pl-14 pr-12 opacity-100 shadow-lg translate-x-0' : 'w-0 opacity-0 pointer-events-none border-none translate-x-4'}`}
              onBlur={() => { if (!searchInputRef.current?.value) setIsSearchExpanded(false); }}
              onKeyDown={(e) => { if (e.key === 'Escape') setIsSearchExpanded(false); }}
            />

            {isSearchExpanded && (
              <button 
                onClick={() => {
                  setIsSearchExpanded(false);
                  if (searchInputRef.current) searchInputRef.current.value = '';
                }}
                className="absolute right-4 hover:text-primary transition-colors flex items-center justify-center text-outline/50"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Account, Wishlist & Cart Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/wishlist" className="hover:text-[#9B7E4B] transition-colors duration-300 hidden md:flex items-center justify-center relative">
              <span className="material-symbols-outlined text-[21px]">favorite</span>
            </Link>
            <Link to="/login" className="hover:text-[#9B7E4B] transition-colors duration-300 hidden md:flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </Link>
            <Link to="/cart" className="relative flex items-center justify-center hover:text-[#9B7E4B] transition-colors duration-300">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="cart-count absolute -top-1 -right-1 w-4 h-4 bg-[#842029] text-white text-[9px] flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              id="hamburger" 
              className="lg:hidden flex items-center justify-center hover:text-[#9B7E4B] transition-colors duration-300" 
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined text-[26px]">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity duration-500 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#FCF9F6] z-[60] transition-transform duration-500 ease-out lg:hidden shadow-2xl flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-outline-variant/20 flex justify-between items-center">
          <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-10 object-contain" />
          <button onClick={() => setIsMenuOpen(false)} className="text-[#1c1c1a]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="space-y-6">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Collections</p>
            <Link className="block font-noto-serif text-2xl tracking-tight text-[#1c1c1a]" to="/bridal-collection" onClick={() => setIsMenuOpen(false)}>Bridal Lehengas</Link>
            <Link className="block font-noto-serif text-2xl tracking-tight text-[#1c1c1a]" to="/non-bridal-collection" onClick={() => setIsMenuOpen(false)}>Non-Bridal Lehengas</Link>
            <Link className="block font-noto-serif text-2xl tracking-tight text-[#1c1c1a]" to="/saree-collection" onClick={() => setIsMenuOpen(false)}>Heritage Sarees</Link>
          </div>
          
          <div className="pt-8 border-t border-outline-variant/20 space-y-6">
            <Link className="flex items-center gap-4 font-jakarta-sans text-xs uppercase tracking-widest text-[#1c1c1a]" to="/wishlist" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined text-[20px]">favorite</span> Wishlist
            </Link>
            <Link className="flex items-center gap-4 font-jakarta-sans text-xs uppercase tracking-widest text-[#1c1c1a]" to="/login" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined text-[20px]">person</span> Account
            </Link>
            <Link className="flex items-center gap-4 font-jakarta-sans text-xs uppercase tracking-widest text-[#1c1c1a]" to="/order-tracking" onClick={() => setIsMenuOpen(false)}>
              <span className="material-symbols-outlined text-[20px]">local_shipping</span> Track Order
            </Link>
          </div>
        </div>

        <div className="p-8 bg-[#f6f3f0]">
          <p className="font-jakarta-sans text-[9px] uppercase tracking-[0.2em] text-outline/60 text-center">© 2024 ETASHAA HERITAGE</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
