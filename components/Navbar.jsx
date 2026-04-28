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
          <div className={`relative flex items-center transition-all duration-700 ease-in-out ${isSearchExpanded ? 'w-full max-w-[700px]' : 'w-[40px]'}`}>
            <button 
              onClick={() => setIsSearchExpanded(true)}
              className={`flex items-center justify-center hover:text-[#9B7E4B] transition-colors duration-300 z-10 ${isSearchExpanded ? 'absolute left-4 pointer-events-none text-primary' : ''}`}
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search our atelier..."
              className={`w-full bg-surface-container-high/50 border border-outline-variant/30 py-2.5 transition-all duration-700 ease-in-out font-jakarta-sans text-xs outline-none rounded-full focus:border-primary/50 focus:ring-4 focus:ring-primary/5 ${isSearchExpanded ? 'pl-12 pr-12 opacity-100' : 'w-0 opacity-0 pointer-events-none border-none'}`}
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

          {/* Account & Cart Icons */}
          <div className="flex items-center gap-4 md:gap-6">
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
      
      {/* Mobile Menu */}
      <div id="mobile-menu" className={`${isMenuOpen ? 'open' : 'closed'} absolute top-full left-0 w-full bg-[#fcf9f6]/97 backdrop-blur-xl border-t border-outline-variant/30 py-8 px-8 space-y-6 md:hidden shadow-lg`}>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#735b24] border-b border-outline-variant/20 pb-4" to="/bridal-collection" onClick={() => setIsMenuOpen(false)}>Bridal Lehengas</Link>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#1c1c1a] border-b border-outline-variant/20 pb-4" to="/non-bridal-collection" onClick={() => setIsMenuOpen(false)}>Non-Bridal Lehengas</Link>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#1c1c1a] border-b border-outline-variant/20 pb-4" to="/saree-collection" onClick={() => setIsMenuOpen(false)}>Heritage Sarees</Link>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#1c1c1a]" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
