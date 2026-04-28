import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface pt-10 pb-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-custom mx-auto bg-[#111111] border border-white/10 p-8 md:p-16 lg:p-20 relative">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8 pb-16 border-b border-white/10 mb-12">
          
          {/* Logo & Description - Full width on mobile */}
          <div className="col-span-2 lg:col-span-2 space-y-8">
            <Link to="/" className="inline-block">
              <img src="/images/logo_etashaa.png" alt="Etashaa Heritage" className="h-14 md:h-24 object-contain brightness-110" />
            </Link>
            <p className="font-jakarta-sans text-[10px] md:text-xs text-white/40 leading-relaxed max-w-sm tracking-wide">
              Redefining traditional luxury for the modern bride. Every stitch tells a story of heritage and craftsmanship.
            </p>
          </div>

          {/* Client Care */}
          <div className="col-span-1 space-y-8">
            <h4 className="font-jakarta-sans text-[9px] md:text-xs tracking-[0.3em] uppercase text-primary font-bold">Client Care</h4>
            <ul className="space-y-4 font-jakarta-sans text-[9px] md:text-xs tracking-[0.1em] uppercase text-white/50">
              <li className="hover:text-primary transition-all duration-300"><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li className="hover:text-primary transition-all duration-300"><Link to="/returns-exchanges">Returns & Exchanges</Link></li>
              <li className="hover:text-primary transition-all duration-300"><Link to="/size-guide">Size Guide</Link></li>
              <li className="hover:text-primary transition-all duration-300"><Link to="/track-order">Track Your Order</Link></li>
              <li className="hover:text-primary transition-all duration-300"><Link to="/faqs">FAQs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 space-y-8">
            <h4 className="font-jakarta-sans text-[9px] md:text-xs tracking-[0.3em] uppercase text-primary font-bold">Company</h4>
            <ul className="space-y-4 font-jakarta-sans text-[9px] md:text-xs tracking-[0.1em] uppercase text-white/50">
              <li className="hover:text-primary transition-all duration-300"><Link to="/our-story">Our Story</Link></li>
              <li className="hover:text-primary transition-all duration-300"><Link to="/privacy">Privacy</Link></li>
              <li className="hover:text-primary transition-all duration-300"><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 space-y-8">
            <h4 className="font-jakarta-sans text-[9px] md:text-xs tracking-[0.3em] uppercase text-primary font-bold">Newsletter</h4>
            <div className="space-y-6">
              <p className="font-jakarta-sans text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed">
                Sign up for early access to new collections.
              </p>
              <div className="relative pt-4">
                <input 
                  className="bg-transparent border-b border-white/10 w-full pb-4 text-[10px] md:text-xs focus:outline-none focus:border-primary transition-all duration-700 placeholder:text-white/20 uppercase tracking-[0.2em] text-white" 
                  placeholder="Your Email" 
                  type="email"
                />
                <button className="absolute right-0 bottom-4 text-primary hover:translate-x-2 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[18px]">trending_flat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="order-2 md:order-1">
            <p className="font-jakarta-sans text-[9px] md:text-[10px] tracking-[0.3em] text-white/20 uppercase">
              © 2024 ETASHAA HERITAGE. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 order-1 md:order-2">
            <Link className="font-jakarta-sans text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 hover:text-primary uppercase transition-colors" to="/terms">Terms of Use</Link>
            <Link className="font-jakarta-sans text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 hover:text-primary uppercase transition-colors" to="/privacy">Privacy</Link>
            <Link className="font-jakarta-sans text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 hover:text-primary uppercase transition-colors" to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
