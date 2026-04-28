import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, occasions } from '../data';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [currentPromoSlide, setCurrentPromoSlide] = React.useState(0);

  const slides = [
    {
      image: '/images/banners_01_draped_in_time.jpg',
      tag: 'Heritage Couture',
      title: 'Draped in Time',
      sub: 'A collection that celebrates the eternal beauty of traditional craftsmanship.',
      link: '/bridal-collection'
    },
    {
      image: '/images/banners_03_wedding_edit.jpg',
      tag: 'The Wedding Edit',
      title: 'Bridal Grandeur',
      sub: 'Exquisite lehengas designed for the most memorable moments of your life.',
      link: '/bridal-collection'
    },
    {
      image: '/images/banners_02_ready_to_ship.jpg',
      tag: 'Express Luxury',
      title: 'Ready to Ship',
      sub: 'Fast dispatch nationwide. Handcrafted luxury delivered to your doorstep.',
      link: '/saree-collection'
    },
    {
      image: '/images/banners_06_bridesmaid.jpg',
      tag: 'The Entourage',
      title: 'Bridesmaid Edit',
      sub: 'Graceful styles for the sister of the bride and her entourage.',
      link: '/non-bridal-collection'
    }
  ];

  const promoBanners = [
    {
      image: '/images/spotlight_1.png',
      link: '/bridal-collection'
    },
    {
      image: '/images/spotlight_2.png',
      link: '/non-bridal-collection'
    },
    {
      image: '/images/spotlight_3.png',
      link: '/saree-collection'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const promoTimer = setInterval(() => {
      setCurrentPromoSlide((prev) => (prev + 1) % promoBanners.length);
    }, 5000);
    return () => clearInterval(promoTimer);
  }, [promoBanners.length]);

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto pt-6 px-4 md:px-0">
        <div className="relative h-[30vh] md:h-[400px] w-full overflow-hidden bg-[#E2E1DF] rounded-sm">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${index === currentSlide ? 'scale-110 translate-y-0' : 'scale-100'}`}
                  style={{ objectPosition: '50% 5%' }}
                />
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
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60 hidden md:flex">
            <span className="font-jakarta-sans text-[8px] uppercase tracking-[0.3em] text-white font-bold">Discover</span>
            <div className="w-px h-8 bg-white animate-bounce"></div>
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
          <div className="grid grid-cols-3 gap-2 md:gap-6 pb-6 md:pb-0">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="group relative aspect-[3/5] overflow-hidden bg-surface-container-high cursor-pointer" 
                onClick={() => navigate(category.link)}
              >
                <img alt={category.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={category.image}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 text-white pr-4">
                  <h4 className="text-[10px] md:text-2xl mb-1 md:mb-2 tracking-tight font-noto-serif uppercase md:normal-case">{category.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner Slider */}
      <section className="py-12 bg-[#FCF9F6] overflow-hidden">
        <div className="max-w-custom px-4 md:px-0">
          <div className="flex flex-col items-center mb-8 space-y-3">
            <h3 className="text-[#1c1c1a] text-center tracking-[0.2em] uppercase font-noto-serif text-lg md:text-xl">In the Spotlight</h3>
          </div>
          <div className="relative aspect-[16/9] md:aspect-[3/1] overflow-hidden bg-black shadow-lg rounded-sm group">
            {promoBanners.map((banner, i) => (
              <div 
                key={i} 
                onClick={() => navigate(banner.link)}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out cursor-pointer ${
                  i === currentPromoSlide ? 'opacity-100 translate-y-0 z-10' : 
                  i < currentPromoSlide ? 'opacity-0 -translate-y-full z-0' : 'opacity-0 translate-y-full z-0'
                }`}
              >
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-custom">
          <div className="flex flex-col items-center justify-center mb-12 space-y-4 text-center">
            <div>
              <span className="font-jakarta-sans text-[9px] uppercase tracking-widest text-primary mb-3 block font-bold">Curated Closets</span>
              <h2 className="text-2xl md:text-3xl mb-4">Shop by Occasion</h2>
              <div className="w-12 h-[1px] bg-[#c8a96a] mx-auto"></div>
            </div>
            <p className="text-on-surface/60 max-w-lg text-center text-xs italic mt-4">From vibrant haldi ceremonies to the grandeur of the wedding day, find the perfect silhouette for every ritual.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-10">
            {occasions.map((occasion, index) => (
              <div key={occasion.name} className={`flex flex-col gap-3 md:gap-5 ${index === 1 ? 'md:-mt-10' : ''}`}>
                <div className="aspect-[3/4] overflow-hidden bg-surface-container-highest">
                  <img className="w-full h-full object-cover" src={occasion.image} alt={occasion.name}/>
                </div>
                <div className="text-center px-1">
                  <h4 className="text-[10px] md:text-xl font-noto-serif mb-0.5">{occasion.name}</h4>
                  <p className="text-[6px] md:text-[9px] uppercase tracking-widest text-primary font-bold">{occasion.description}</p>
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
