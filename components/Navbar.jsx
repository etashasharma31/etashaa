import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="main-nav" className={`sticky top-0 w-full z-50 bg-[#FCF9F6] border-b border-[#D0C5B5]/20 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
      <div className="flex justify-between items-center max-w-custom mx-auto h-full px-6">
        <Link to="/" className="text-3xl font-bold tracking-[0.25em] text-[#1c1c1a] font-noto-serif flex-shrink-0">ETASHAA</Link>
        
        <div className="hidden md:flex space-x-10 font-noto-serif tracking-[0.1em] uppercase text-[11px]">
          <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1" to="/bridal-collection">Bridal Lehengas</Link>
          <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1" to="/non-bridal-collection">Non-Bridal Lehengas</Link>
          <Link className="text-[#1c1c1a] hover:text-[#9B7E4B] transition-colors duration-300 pb-1" to="/saree-collection">Heritage Sarees</Link>
        </div>

        <div className="flex items-center space-x-5 text-[#1c1c1a]">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-[#9B7E4B] transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          <Link to="/cart" className="relative hover:text-[#9B7E4B] transition-colors duration-300">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="cart-count absolute -top-1 -right-1 w-4 h-4 bg-[#842029] text-white text-[9px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="hover:text-[#9B7E4B] transition-colors duration-300 hidden md:block">
            <span className="material-symbols-outlined text-[22px]">person</span>
          </Link>
          <button 
            id="hamburger" 
            className="md:hidden hover:text-[#9B7E4B] transition-colors duration-300" 
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-[26px]">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`${isMenuOpen ? 'open' : 'closed'} absolute top-full left-0 w-full bg-[#fcf9f6]/97 backdrop-blur-xl border-t border-[#d0c5b5]/30 py-8 px-8 space-y-6 md:hidden shadow-lg`}>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#735b24] border-b border-[#d0c5b5]/20 pb-4" to="/bridal-collection" onClick={() => setIsMenuOpen(false)}>Bridal Lehengas</Link>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#1c1c1a] border-b border-[#d0c5b5]/20 pb-4" to="/non-bridal-collection" onClick={() => setIsMenuOpen(false)}>Non-Bridal Lehengas</Link>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#1c1c1a] border-b border-[#d0c5b5]/20 pb-4" to="/saree-collection" onClick={() => setIsMenuOpen(false)}>Heritage Sarees</Link>
        <Link className="block font-noto-serif text-lg uppercase tracking-widest text-[#1c1c1a]" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
