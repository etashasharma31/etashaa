import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, occasions } from '../data';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
      image: '/images/banners_05_naaz.jpg',
      tag: 'New Collection',
      title: 'Naaz : The Pride',
      sub: 'Timeless elegance meets modern silhouettes in our latest masterpiece series.',
      link: '/non-bridal-collection'
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#E2E1DF]">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
            </div>
            
            <div className="relative z-20 h-full flex items-center px-6 md:px-24 max-w-custom mx-auto">
              <div className={`max-w-2xl transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <span className="font-jakarta-sans text-[10px] tracking-[0.4em] uppercase mb-4 block font-bold text-primary">{slide.tag}</span>
                <h1 className="text-5xl md:text-7xl mb-6 font-noto-serif italic tracking-tight text-on-surface">{slide.title}</h1>
                <p className="font-jakarta-sans text-sm md:text-lg tracking-wide mb-10 opacity-80 text-on-surface-variant max-w-lg">{slide.sub}</p>
                <div className="flex gap-6">
                  <button 
                    className="btn-premium group"
                    onClick={() => navigate(slide.link)}
                  >
                    <span>Explore Now</span>
                    <span className="arrow">→</span>
                  </button>
                  <button 
                    className="btn-premium-outline group"
                    onClick={() => navigate('/saree-collection')}
                  >
                    <span>View All</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-12 right-12 z-30 flex items-center gap-4">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 transition-all duration-500 ${i === currentSlide ? 'w-12 bg-primary' : 'w-4 bg-outline/20'}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 opacity-40">
          <div className="w-px h-12 bg-on-surface animate-bounce"></div>
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
                  <span className="link-premium">View Collection</span>
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
