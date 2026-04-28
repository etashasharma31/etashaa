import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1a] text-[#fcf9f6] pt-24 pb-12 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-surface-container-highest/10 pb-16 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/">
            <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-20 object-contain mb-6" />
          </Link>
          <p className="font-jakarta-sans text-xs text-[#fcf9f6]/60 leading-relaxed mb-6">
            Redefining traditional luxury for the modern bride. Every stitch tells a story of heritage and craftsmanship.
          </p>
        </div>
        <div>
          <h4 className="font-jakarta-sans text-xs tracking-wider uppercase text-primary-container mb-8">Client Care</h4>
          <ul className="space-y-4 font-jakarta-sans text-xs tracking-wider uppercase text-[#fcf9f6]/60">
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/returns-exchanges">Returns & Exchanges</Link></li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/size-guide">Size Guide</Link></li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/faqs">Track Your Order</Link></li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-jakarta-sans text-xs tracking-wider uppercase text-primary-container mb-8">Company</h4>
          <ul className="space-y-4 font-jakarta-sans text-xs tracking-wider uppercase text-[#fcf9f6]/60">
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/our-story">Our Story</Link></li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/privacy">Privacy</Link></li>
            <li className="hover:text-[#fcf9f6] transition-all cursor-pointer"><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-jakarta-sans text-xs tracking-wider uppercase text-primary-container mb-8">Newsletter</h4>
          <p className="font-jakarta-sans text-xs text-[#fcf9f6]/60 mb-6 uppercase">Sign up for early access to new collections.</p>
          <div className="relative">
            <input 
              className="bg-transparent border-b border-[#fcf9f6]/20 w-full pb-3 text-xs focus:outline-none focus:border-primary-container transition-colors placeholder:text-[#fcf9f6]/30" 
              placeholder="YOUR EMAIL" 
              type="email"
            />
            <button className="absolute right-0 bottom-3">
              <span className="material-symbols-outlined text-primary-container">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-jakarta-sans text-[10px] tracking-widest text-[#fcf9f6]/40 uppercase">© 2024 ETASHAA HERITAGE. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-4">
          <Link className="link-premium text-[#fcf9f6]/40! hover:text-[#fcf9f6]!" to="/terms">Terms of Use</Link>
          <Link className="link-premium text-[#fcf9f6]/40! hover:text-[#fcf9f6]!" to="/accessibility">Accessibility</Link>
          <Link className="link-premium text-[#fcf9f6]/40! hover:text-[#fcf9f6]!" to="/accessibility">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
