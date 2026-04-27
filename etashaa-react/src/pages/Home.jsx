import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, occasions } from '../data';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parallax hero
    const handleScroll = () => {
      const heroImg = document.getElementById('hero-img');
      if (heroImg) { 
        heroImg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.25}px)`; 
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#E2E1DF]">
        <div className="absolute inset-0 z-0">
          <img 
            id="hero-img" 
            src="/images/hero_bridal_elegance.png" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10"></div>
        </div>
        <div className="relative z-10 px-6 md:px-12 max-w-custom text-center text-[#1c1c1a]">
          <span className="hero-tagline font-jakarta-sans text-[10px] tracking-[0.4em] uppercase mb-6 block font-medium opacity-70">✦ &nbsp; Handcrafted Heritage &nbsp; ✦</span>
          <h1 className="hero-title mb-8">Bridal & <br/>Designer Lehengas</h1>
          <p className="hero-sub font-jakarta-sans text-sm md:text-base tracking-wide mb-10 opacity-80 max-w-xl mx-auto">Starting from ₹5,000 | Custom Stitching | Nationwide Delivery</p>
          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <button 
              className="bg-[#735b24] text-white px-10 py-4 font-jakarta-sans uppercase tracking-widest text-[10px] font-bold hover:bg-[#5a430e] transition-all duration-500 active:scale-95 shadow-lg"
              onClick={() => navigate('/bridal-collection')}
            >
              Shop Bridal &nbsp; →
            </button>
            <button 
              className="border border-[#1c1c1a]/30 text-[#1c1c1a] px-10 py-4 font-jakarta-sans uppercase tracking-widest text-[10px] font-bold hover:bg-[#1c1c1a]/5 transition-all duration-300"
              onClick={() => navigate('/saree-collection')}
            >
              View Collection
            </button>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-40">
          <span className="font-jakarta-sans text-[#1c1c1a] text-[10px] uppercase tracking-[0.4em] font-medium">Scroll</span>
          <div className="w-px h-16 bg-[#1c1c1a]"></div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-[#1c1c1a] py-12">
        <div className="max-w-custom grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="material-symbols-outlined text-[#c8a96a] text-4xl font-light">payments</span>
            <span className="font-jakarta-sans text-[10px] tracking-[0.2em] uppercase font-bold text-white/90">COD Available</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="material-symbols-outlined text-[#c8a96a] text-4xl font-light">local_shipping</span>
            <span className="font-jakarta-sans text-[10px] tracking-[0.2em] uppercase font-bold text-white/90">Free Shipping ₹5k+</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="material-symbols-outlined text-[#c8a96a] text-4xl font-light">straighten</span>
            <span className="font-jakarta-sans text-[10px] tracking-[0.2em] uppercase font-bold text-white/90">Custom Fit</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="material-symbols-outlined text-[#c8a96a] text-4xl font-light">assignment_return</span>
            <span className="font-jakarta-sans text-[10px] tracking-[0.2em] uppercase font-bold text-white/90">Easy Returns</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-[#F6F6F6] border-b border-[#d0c5b5]/10">
        <div className="max-w-custom grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div className="reveal reveal-delay-1">
            <p className="font-noto-serif text-3xl font-bold text-[#735b24] mb-2">1984</p>
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.2em] text-[#7f7668] font-semibold">Est. Year</p>
          </div>
          <div className="reveal reveal-delay-2">
            <p className="font-noto-serif text-3xl font-bold text-[#735b24] mb-2">12,000+</p>
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.2em] text-[#7f7668] font-semibold">Happy Brides</p>
          </div>
          <div className="reveal reveal-delay-3">
            <p className="font-noto-serif text-3xl font-bold text-[#735b24] mb-2">500+</p>
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.2em] text-[#7f7668] font-semibold">Designs</p>
          </div>
          <div className="reveal reveal-delay-4">
            <p className="font-noto-serif text-3xl font-bold text-[#735b24] mb-2">4.9 ★</p>
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.2em] text-[#7f7668] font-semibold">Avg Rating</p>
          </div>
        </div>
      </section>

      {/* Atelier Highlights - NEW SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-custom">
          <div className="text-center mb-16">
            <span className="font-jakarta-sans text-[9px] uppercase tracking-[0.5em] text-[#735b24] font-bold mb-3 block">The Digital Atelier</span>
            <h2 className="tracking-tight">Couture Highlights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[600px]">
            <div className="relative group overflow-hidden cursor-pointer h-full" onClick={() => navigate('/bridal-collection')}>
              <img src="/images/bridal_new_2.png" alt="Bridal Highlight" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[9px] uppercase tracking-widest block mb-1 font-bold">The Wedding Edit</span>
                <h3 className="text-3xl font-noto-serif">Bridal Lehengas</h3>
              </div>
            </div>
            
            <div className="relative group overflow-hidden cursor-pointer h-full" onClick={() => navigate('/non-bridal-collection')}>
              <img src="/images/non_bridal_2.png" alt="Non-Bridal Highlight" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[9px] uppercase tracking-widest block mb-1 font-bold">Seasonal Soirée</span>
                <h3 className="text-3xl font-noto-serif">Festive Couture</h3>
              </div>
            </div>
            
            <div className="relative group overflow-hidden cursor-pointer h-full" onClick={() => navigate('/saree-collection')}>
              <img src="/images/jimmy_choo_saree.png" alt="Saree Highlight" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[9px] uppercase tracking-widest block mb-1 font-bold">Heritage Weaves</span>
                <h3 className="text-3xl font-noto-serif">Designer Sarees</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-white">
        <div className="max-w-custom reveal">
          <div className="flex flex-col items-center mb-16 space-y-3">
            <h3 className="text-[#1c1c1a] text-center tracking-tight">Shop by Category</h3>
            <div className="w-12 h-[1px] bg-[#c8a96a]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="group relative aspect-[3/5] overflow-hidden bg-surface-container-high cursor-pointer" 
                onClick={() => navigate(category.link)}
              >
                <img alt={category.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={category.image}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <h4 className="text-2xl mb-2 tracking-tight font-noto-serif">{category.name}</h4>
                  <span className="font-jakarta-sans text-[9px] uppercase tracking-[0.2em] border-b border-white/40 pb-1 hover:border-white transition-colors">View Collection</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="font-jakarta-sans text-[9px] uppercase tracking-widest text-primary mb-3 block font-bold">Curated Closets</span>
              <h2 className="text-3xl">Shop by Occasion</h2>
            </div>
            <p className="text-on-surface/60 max-w-sm text-right hidden md:block text-xs italic">From vibrant haldi ceremonies to the grandeur of the wedding day, find the perfect silhouette for every ritual.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {occasions.map((occasion, index) => (
              <div key={occasion.name} className={`flex flex-col gap-5 ${index === 1 ? 'md:-mt-10' : ''}`}>
                <div className="aspect-[3/4] overflow-hidden bg-surface-container-highest">
                  <img className="w-full h-full object-cover" src={occasion.image} alt={occasion.name}/>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-noto-serif mb-1">{occasion.name}</h4>
                  <p className="text-[9px] uppercase tracking-widest text-primary font-bold">{occasion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
