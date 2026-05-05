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
    <div className="bg-[#FCF9F6] min-h-screen pt-4 pb-40">
      {/* Editorial Header - Centered */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-24 relative text-center">
        <div className="flex flex-col items-center gap-10">
          <div className="space-y-6">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.8em] text-primary/60 font-bold">Etashaa Heritage • The Muse</p>
            <h1 className="font-noto-serif text-6xl md:text-[7rem] tracking-tighter text-on-surface leading-[0.9]">Real Stories,<br />Real Grace.</h1>
          </div>
          <div className="max-w-lg">
            <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>
            <p className="font-jakarta-sans text-sm text-on-surface/50 leading-relaxed italic">
              "A celebration of the women who bring our heritage to life. From the palaces of Rajasthan to the global stage, discover the legacy of our muses."
            </p>
          </div>
        </div>
        <div className="absolute top-[-20px] right-1/2 translate-x-1/2 opacity-[0.03] pointer-events-none select-none">
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
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-2000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>

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

      {/* Cinematic Reels Section */}
      <section className="mb-32 px-6 md:px-12 max-w-7xl mx-auto mt-24">
        <div className="text-center mb-16">
          <p className="font-jakarta-sans text-[10px] uppercase tracking-[1em] text-primary mb-6 font-bold">Grace in Motion</p>
          <h2 className="font-noto-serif text-4xl md:text-6xl mb-8">The Cinematic Muse</h2>
          <p className="max-w-xl mx-auto text-on-surface/50 font-jakarta-sans text-sm leading-relaxed">
            Witness the fluidity of our heritage fabrics and the sparkle of our hand-embroidery in these exclusive campaign films.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 1, src: '/videos/muse_reel_1.mp4', label: 'The Royal Entrance' },
            { id: 2, src: 'https://v1.pinimg.com/videos/mc/720p/2d/b4/82/2db482bf85e8b3bd1a8885401bed9ec8.mp4', label: 'Artisanal Elegance' },
            { id: 3, src: '/videos/muse_reel_3.mp4', label: 'Heritage Glow' }
          ].map((reel) => (
            <div key={reel.id} className="relative group aspect-[9/16] overflow-hidden bg-black shadow-2xl">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="none"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              >
                <source src={reel.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white font-jakarta-sans text-[10px] uppercase tracking-[0.4em] mb-2">{reel.label}</span>
                <div className="w-8 h-px bg-primary/60"></div>
              </div>
            </div>
          ))}
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
            <Link to="/contact" className="btn-premium px-16 py-5!">
              <span>Share Your Story</span>
            </Link>
            <Link to="/bridal-collection" className="btn-premium-outline px-16 py-5!">
              <span>View Collections</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EtashaaMuse;
