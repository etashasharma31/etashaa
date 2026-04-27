import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1a] text-[#fcf9f6] pt-24 pb-12 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-surface-container-highest/10 pb-16 mb-12">
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-xl font-noto-serif tracking-[0.15em] text-[#fcf9f6] mb-6 uppercase">ETASHAA</h4>
          <p className="font-jakarta-sans text-xs text-[#fcf9f6]/60 leading-relaxed mb-6">
            Redefining traditional luxury for the modern bride. Every stitch tells a story of heritage and craftsmanship.
          </p>
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-[#c8a96a] hover:scale-110 transition-all cursor-pointer">social_leaderboard</span>
            <span className="material-symbols-outlined text-[#c8a96a] hover:scale-110 transition-all cursor-pointer">camera</span>
            <span className="material-symbols-outlined text-[#c8a96a] hover:scale-110 transition-all cursor-pointer">mail</span>
          </div>
        </div>
        <div>
          <h4 className="font-jakarta-sans text-xs tracking-wider uppercase text-[#c8a96a] mb-8">Client Care</h4>
          <ul className="space-y-4 font-jakarta-sans text-xs tracking-wider uppercase text-[#fcf9f6]/60">
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Shipping Policy</li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Returns & Exchanges</li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Size Guide</li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Track Your Order</li>
          </ul>
        </div>
        <div>
          <h4 className="font-jakarta-sans text-xs tracking-wider uppercase text-[#c8a96a] mb-8">Company</h4>
          <ul className="space-y-4 font-jakarta-sans text-xs tracking-wider uppercase text-[#fcf9f6]/60">
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Our Atelier</li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Sustainability</li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Privacy</li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer">Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-jakarta-sans text-xs tracking-wider uppercase text-[#c8a96a] mb-8">Newsletter</h4>
          <p className="font-jakarta-sans text-xs text-[#fcf9f6]/60 mb-6 uppercase">Sign up for early access to new collections.</p>
          <div className="relative">
            <input 
              className="bg-transparent border-b border-[#fcf9f6]/20 w-full pb-3 text-xs focus:outline-none focus:border-[#c8a96a] transition-colors placeholder:text-[#fcf9f6]/30" 
              placeholder="YOUR EMAIL" 
              type="email"
            />
            <button className="absolute right-0 bottom-3">
              <span className="material-symbols-outlined text-[#c8a96a]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-jakarta-sans text-[10px] tracking-widest text-[#fcf9f6]/40 uppercase">© 2024 ETASHAA HERITAGE. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-8 text-[10px] tracking-widest text-[#fcf9f6]/40 uppercase font-jakarta-sans">
          <Link className="hover:text-[#fcf9f6] transition-colors" to="#">Terms of Use</Link>
          <Link className="hover:text-[#fcf9f6] transition-colors" to="#">Accessibility</Link>
          <Link className="hover:text-[#fcf9f6] transition-colors" to="#">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
