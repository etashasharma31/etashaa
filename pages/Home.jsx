import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { categories, occasions } from '../data';

const slides = [
  {
    image: '/images/hero-1.png',
    tag: 'Bridal Heritage',
    title: 'Grace in Tradition',
    sub: 'Timeless craftsmanship that honors the past while celebrating your future.',
    link: '/bridal-collection'
  },
  {
    image: '/images/hero-2.png',
    tag: 'Bridal Heritage',
    title: 'Grace in Tradition',
    sub: 'Timeless craftsmanship that honors the past while celebrating your future.',
    link: '/bridal-collection'
  },
  {
    image: '/images/hero-3.png',
    tag: 'Bridal Heritage',
    title: 'Grace in Tradition',
    sub: 'Timeless craftsmanship that honors the past while celebrating your future.',
    link: '/bridal-collection'
  },
  {
    image: '/images/hero-4.png',
    tag: 'Bridal Heritage',
    title: 'Grace in Tradition',
    sub: 'Timeless craftsmanship that honors the past while celebrating your future.',
    link: '/bridal-collection'
  }
];

const promoBanners = [
  {
    image: '/images/spotlight_lehenga_gold.png',
    tagline: 'Timeless Elegance',
    title: 'Lehengas',
    subtitle: 'Heritage Couture',
    link: '/bridal-collection'
  },
  {
    image: '/images/spotlight_saree_new.png',
    tagline: 'Ethereal Grace',
    title: 'Sarees',
    subtitle: 'Handwoven Legacy',
    link: '/saree-collection'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPromoSlide, setCurrentPromoSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCurrentPromoSlide(0);
    const promoTimer = setInterval(() => {
      setCurrentPromoSlide((prev) => (prev + 1) % promoBanners.length);
    }, 5000);
    return () => clearInterval(promoTimer);
  }, [promoBanners.length]);

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative h-[60vh] md:h-[800px] w-full overflow-hidden bg-surface-variant">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="absolute inset-0 z-0 after:content-[''] after:absolute after:inset-0 after:bg-linear-to-r after:from-black/80 after:via-black/40 after:to-transparent">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`w-full h-full object-cover transition-transform duration-8000 ease-linear ${index === currentSlide ? 'scale-110 translate-y-0' : 'scale-100'}`}
                  style={{ objectPosition: '50% 5%' }}
                />
              </div>

              {/* Text & Button Overlay - Centered */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 text-center">
                <div className={`transition-all duration-1000 delay-300 transform flex flex-col items-center max-w-3xl ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

                  {/* Tagline with Editorial Ornament */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-[#d4af37]"></div>
                    <span className="block text-[#d4af37] font-jakarta-sans text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-bold drop-shadow-md">
                      {slide.tag}
                    </span>
                    <div className="w-12 h-px bg-[#d4af37]"></div>
                  </div>

                  {/* Main Title */}
                  <h2 className="text-white text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] font-noto-serif mb-8 tracking-[-0.02em] drop-shadow-2xl">
                    {slide.title}
                  </h2>

                  {/* Subtitle - Centered */}
                  <div className="mb-12">
                    <p className="text-white/80 font-jakarta-sans text-xs md:text-base max-w-xl leading-relaxed drop-shadow-md font-light italic">
                      {slide.sub}
                    </p>
                  </div>

                  {/* Premium Editorial Button */}
                  <button
                    onClick={() => navigate(slide.link)}
                    className="group flex items-center justify-between gap-6 px-8 py-4 border border-white/40 bg-white/5 backdrop-blur-md text-white font-jakarta-sans text-[9px] md:text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700"
                  >
                    <span className="font-semibold">Discover Collection</span>
                    <svg className="w-4 h-4 transform transition-transform duration-700 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <div className="absolute bottom-8 right-6 md:right-12 z-30 flex items-center gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 transition-all duration-500 ${i === currentSlide ? 'w-12 bg-white shadow-lg' : 'w-4 bg-white/30'}`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 opacity-60">
            <span className="font-jakarta-sans text-[8px] uppercase tracking-[0.3em] text-white font-bold">Discover</span>
            <div className="w-px h-8 bg-white animate-bounce"></div>
          </div>
        </div>
      </section>

      <section className="bg-surface -mt-4 -mb-6 md:-mt-8 md:-mb-12 relative z-10 pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-4 md:px-0">
          <div className="relative w-full flex justify-center items-center">
            <div
              className="w-full max-w-[300px]"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
              }}
            >
              <img
                src="/images/dark_vidai_illustration.png"
                alt="Dark Vidai Illustration"
                className="w-full h-auto object-contain mix-blend-darken opacity-100 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="pt-4 pb-24 md:pt-8 md:pb-24 bg-surface relative z-20">
        <div className="max-w-custom reveal">
          <div className="flex flex-col items-center mb-16 space-y-3">
            <h3 className="text-on-surface text-center tracking-tight">Shop by Category</h3>
            <div className="w-12 h-px bg-primary-container"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-6 pb-6 md:pb-0">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative aspect-3/5 overflow-hidden bg-surface-container-high cursor-pointer rounded-[3rem]"
                onClick={() => navigate(category.link)}
              >
                <img alt={category.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={category.image} />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 text-white pr-4">
                  <h4 className="text-[10px] md:text-2xl mb-1 md:mb-2 tracking-tight font-noto-serif uppercase md:normal-case">{category.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner Slider - Refined Spotlight */}
      <section className="py-12 bg-surface overflow-hidden">
        <div className="max-w-custom px-4 md:px-0">
          <div className="flex flex-col items-center mb-8 space-y-3">
            <h3 className="text-center tracking-[0.2em] uppercase font-jakarta-sans text-[10px] font-bold text-primary">In the Spotlight</h3>
          </div>
          <div className="relative aspect-video md:aspect-2.5/1 overflow-hidden bg-surface-variant shadow-2xl rounded-4xl group">
            {promoBanners.map((banner, i) => (
              <div
                key={i}
                onClick={() => navigate(banner.link)}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer overflow-hidden ${i === currentPromoSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                  onError={(e) => {
                    console.error("Image failed to load:", banner.image);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Cinematic Heritage Section - The Muse Reels */}
      <section className="mb-24 px-6 md:px-12 max-w-custom mx-auto mt-24">
        <div className="text-center mb-12">
          <p className="font-jakarta-sans text-[10px] uppercase tracking-[1em] text-primary mb-6 font-bold uppercase">Grace in Motion</p>
          <h2 className="font-noto-serif text-3xl md:text-5xl mb-6">The Cinematic Muse</h2>
          <p className="max-w-xl mx-auto text-on-surface/50 font-jakarta-sans text-[11px] leading-relaxed italic">
            "Witness the fluidity of our heritage fabrics and the sparkle of our hand-embroidery in motion."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 1, src: '/videos/muse_reel_1.mp4', label: 'The Royal Entrance' },
            { id: 2, src: 'https://v1.pinimg.com/videos/mc/720p/2d/b4/82/2db482bf85e8b3bd1a8885401bed9ec8.mp4', label: 'Artisanal Elegance' },
            { id: 3, src: '/videos/muse_reel_3.mp4', label: 'Heritage Glow' }
          ].map((reel) => (
            <div key={reel.id} className="relative group aspect-[9/16] overflow-hidden bg-surface-container-highest rounded-4xl shadow-2xl">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="none"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
              >
                <source src={reel.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 opacity-100 group-hover:opacity-90 transition-opacity">
                <span className="text-white font-jakarta-sans text-[9px] uppercase tracking-[0.5em] mb-3 font-bold">{reel.label}</span>
                <div className="w-10 h-px bg-primary/80 transform origin-left transition-transform duration-700 group-hover:scale-x-150"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <Link to="/etashaa-muse" className="inline-flex items-center gap-4 text-on-surface font-jakarta-sans text-[10px] uppercase tracking-[0.4em] font-bold border-b border-primary/30 pb-2 hover:text-primary transition-all">
            Watch All Muse Stories
            <span className="material-symbols-outlined text-sm">east</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
