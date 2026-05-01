import React from 'react';
import { Link } from 'react-router-dom';

const EtashaaMuse = () => {
  const muses = [
    {
      id: 1,
      name: "The Royal Union",
      location: "Udaipur • Palace of Winds",
      image: "/images/muse_luxury_1_1777614334511.png",
      story: "A celebration of timeless heritage. Our signature maroon velvet lehenga, hand-embroidered with antique gold zardosi, worn by a muse who embodies regal grace.",
      colSpan: "md:col-span-2",
      height: "h-[700px]"
    },
    {
      id: 2,
      name: "Minimalist Grace",
      location: "London • Contemporary Courtyard",
      image: "/images/muse_luxury_2_1777614348516.png",
      story: "Blending heritage with a global aesthetic. The champagne tissue silk saree, draped with effortless sophistication for the modern Etashaa woman.",
      colSpan: "md:col-span-1",
      height: "h-[800px]"
    },
    {
      id: 3,
      name: "The Detail of Craft",
      location: "Varanasi • The Weaving Studio",
      image: "/images/muse_luxury_3_1777614364792.png",
      story: "Every thread tells a story of generations. A close-up look at the intricate hand-embroidery that defines the Etashaa masterpiece.",
      colSpan: "md:col-span-1",
      height: "h-[500px]"
    },
    {
      id: 4,
      name: "The Sisterhood",
      location: "New Delhi • The Grand Hall",
      image: "/images/muse_luxury_4_1777614380643.png",
      story: "A collective celebration of beauty and bonds. Custom ensembles designed for the bridal party, creating a harmonious palette of heritage colors.",
      colSpan: "md:col-span-2",
      height: "h-[500px]"
    }
  ];

  return (
    <div className="bg-[#FCF9F6] min-h-screen pt-32 pb-40">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 relative">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="max-w-2xl">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.8em] text-primary/60 font-bold mb-8">Etashaa Heritage • The Muse</p>
            <h1 className="font-noto-serif text-6xl md:text-8xl tracking-tighter text-on-surface leading-[0.9]">Real Stories,<br/>Real Grace.</h1>
          </div>
          <div className="max-w-md text-right md:text-left">
            <p className="font-jakarta-sans text-sm text-on-surface/50 leading-relaxed italic border-l-2 border-primary/20 pl-6 py-2">
              "A celebration of the women who bring our heritage to life. From the palaces of Rajasthan to the global stage, discover the legacy of our muses."
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-12 opacity-[0.03] pointer-events-none select-none">
          <span className="font-noto-serif text-[250px] leading-none uppercase">Muse</span>
        </div>
      </section>

      {/* Asymmetric Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {muses.map((muse, index) => (
            <div 
              key={muse.id} 
              className={`${muse.colSpan} relative group overflow-hidden bg-white reveal`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`relative w-full ${muse.height} overflow-hidden shadow-2xl`}>
                <img 
                  src={muse.image} 
                  alt={muse.name} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-12 text-white">
                  <div className="overflow-hidden mb-4">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">{muse.location}</p>
                  </div>
                  <h3 className="font-noto-serif text-4xl mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{muse.name}</h3>
                  <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-1000 ease-in-out">
                    <p className="text-xs font-jakarta-sans opacity-0 group-hover:opacity-80 transition-opacity duration-700 delay-200 max-w-md leading-relaxed mb-8">
                      {muse.story}
                    </p>
                    <Link to="/bridal-collection" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-primary transition-colors">
                      Explore the Look
                      <span className="material-symbols-outlined text-sm">east</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cinematic Spotlight */}
      <section className="mt-56 mb-56 bg-[#131311] text-white overflow-hidden py-40 px-6 md:px-12 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_#9B7E4B_0%,_transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.8em] text-primary mb-8 font-bold">The Heritage Film</p>
              <h2 className="font-noto-serif text-6xl md:text-8xl mb-12 leading-[0.9]">Grace<br/><span className="italic italic-serif pl-12 text-primary/80">in Motion</span></h2>
              <p className="font-jakarta-sans text-sm text-white/40 leading-relaxed max-w-md mb-12">
                Step inside the world of Etashaa. Experience the movement of silk, the whisper of zardosi, and the soulful journey of our muses.
              </p>
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-primary transition-all duration-500">
                  <span className="material-symbols-outlined text-2xl ml-1">play_arrow</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.4em] font-bold group-hover:text-primary transition-colors">Play the Film</span>
              </div>
            </div>
            
            <div className="relative group aspect-[4/5] md:aspect-video bg-black/40 rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <iframe 
                className="w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                src="https://www.youtube.com/embed/S2qYm6L22L4?autoplay=0&mute=1&controls=0&loop=1&playlist=S2qYm6L22L4"
                title="Etashaa Bridal Film"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-white/10 m-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div className="reveal">
          <h2 className="font-noto-serif text-5xl md:text-7xl mb-12 text-on-surface">Become a Muse</h2>
          <p className="font-jakarta-sans text-sm text-on-surface/40 mb-16 max-w-xl mx-auto leading-relaxed">
            Every bride is an inspiration. Share your special moments with us and let your story be etched into our heritage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link to="/contact" className="btn-premium px-16 !py-5">
              <span>Share Your Story</span>
            </Link>
            <Link to="/bridal-collection" className="btn-premium-outline px-16 !py-5">
              <span>View Collections</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EtashaaMuse;
