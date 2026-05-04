import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeritageJournal = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      category: "Couture Stories",
      title: "The Alchemy of Gold: A Journey into Zardosi",
      excerpt: "Discover the ancient secrets of metallic embroidery that has adorned royalty for centuries. We explore the hands that weave magic into every stitch.",
      image: "/images/journal_fabric_detail_1777616265059.png",
      date: "May 2026",
      readTime: "8 min read",
      colSpan: "md:col-span-2",
      content: `
        <p className="mb-8">Zardosi, derived from the Persian words 'Zar' (gold) and 'Dozi' (embroidery), is more than just a technique; it is a legacy of luxury. For centuries, this intricate art form was used to adorn the attire of kings and queens, signifying power, prestige, and unparalleled craftsmanship.</p>
        <p className="mb-8">At Etashaa, we believe in preserving the purity of this art. Our artisans use genuine metallic threads, meticulously hand-stitched onto rich silks and velvets. The process is slow, often taking hundreds of hours for a single lehenga, but the result is a masterpiece that can be passed down through generations.</p>
        <div className="my-12 aspect-video overflow-hidden">
          <img src="/images/craft_embroidery_1777614908468.png" className="w-full h-full object-cover" alt="Embroidery Detail" />
        </div>
        <h3 className="font-noto-serif text-3xl mb-6">The Artisan's Touch</h3>
        <p className="mb-8">Each motif in our Zardosi work is inspired by historical architecture and nature. From the delicate paisleys of the Mughal era to the bold floral patterns of the Rajputana courts, our designs are a bridge between the past and the present.</p>
        <p>When you wear an Etashaa Zardosi piece, you aren't just wearing an outfit; you are wearing a piece of history, crafted with love and devotion.</p>
      `
    },
    {
      id: 2,
      category: "Style File",
      title: "Summer in the Palace",
      excerpt: "Light-weight heritage fabrics meet contemporary silhouettes for the modern destination wedding.",
      image: "/images/journal_editorial_1_1777616245042.png",
      date: "April 2026",
      readTime: "5 min read",
      colSpan: "md:col-span-1",
      content: `
        <p className="mb-8">As destination weddings move toward sun-drenched palaces and coastal retreats, the demand for 'light luxury' has never been higher. The modern bride seeks the grandeur of heritage without the weight of traditional couture.</p>
        <p className="mb-8">Our latest collection focuses on 'Tissue Silks' and 'Organza Chanderi'—fabrics that catch the light beautifully while remaining breathable. These pieces are designed for the bride who wants to dance from the Haldi ceremony to the late-night reception with ease.</p>
        <h3 className="font-noto-serif text-3xl mb-6">The Palette of the Sun</h3>
        <p className="mb-8">Think champagne golds, dusty roses, and pale mints. These colors reflect the soft light of a palace courtyard at sunset, creating a look that is both ethereal and regal.</p>
        <p>Style your summer lehenga with minimal jewelry and fresh flowers to complete the look of a modern Etashaa muse.</p>
      `
    },
    {
      id: 3,
      category: "Artisans",
      title: "The Rhythm of the Loom",
      excerpt: "An intimate look at the lives of the master weavers of Varanasi and their timeless contribution to Indian fashion.",
      image: "/images/craft_loom_1777614959397.png",
      date: "March 2026",
      readTime: "12 min read",
      colSpan: "md:col-span-1",
      content: `
        <p className="mb-8">In the narrow lanes of Varanasi, a rhythmic clicking sound fills the air. It is the sound of the 'Kadwa' loom, where master weavers are creating some of the finest silk sarees in the world. This is where every Etashaa Banarasi saree begins its journey.</p>
        <p className="mb-8">The weavers of Varanasi have passed down their skills for over ten generations. It is a slow, meditative process, where only 2 to 3 inches of fabric are woven in a single day. The precision required is immense—one wrong thread can ruin weeks of work.</p>
        <div className="my-12 aspect-video overflow-hidden">
          <img src="/images/craft_threads_1777614925635.png" className="w-full h-full object-cover" alt="Silk Threads" />
        </div>
        <h3 className="font-noto-serif text-3xl mb-6">A Dying Art?</h3>
        <p className="mb-8">Despite the rise of power-looms, the true connoisseur knows that a hand-woven saree has a soul. The subtle imperfections, the richness of the zari, and the way the fabric drapes are unmatched.</p>
        <p>Etashaa is committed to supporting these artisan communities, ensuring that the rhythm of the loom continues for centuries to come.</p>
      `
    },
    {
      id: 4,
      category: "The Muse",
      title: "The Modern Matriarch",
      excerpt: "Redefining power and grace through the lens of heritage couture.",
      image: "/images/muse_luxury_1_1777614334511.png",
      date: "February 2026",
      readTime: "6 min read",
      colSpan: "md:col-span-2",
      content: `
        <p className="mb-8">Heritage is not just about the past; it is a tool for the present. Our latest editorial, 'The Modern Matriarch,' celebrates women who lead with grace and strength, choosing outfits that reflect their depth of character.</p>
        <p className="mb-8">We chose heavy velvets and dark, jewel-toned silks for this series. These are 'power garments'—they command attention while maintaining a sense of quiet dignity. The intricate gold work acts as an armor of heritage, shielding and celebrating the woman within.</p>
        <h3 className="font-noto-serif text-3xl mb-6">Strength in Tradition</h3>
        <p className="mb-8">A matriarch is a guardian of stories. By wearing heritage couture, she signals her respect for the craft while making a bold statement about her own identity in the modern world.</p>
        <p>Discover the pieces that define the modern Etashaa muse—where every lehenga is a legacy.</p>
      `
    }
  ];

  return (
    <div className="bg-[#FCF9F6] min-h-screen pt-32 pb-40">
      {/* Journal Header - Centered Editorial */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-32 relative pt-20">
        <div className="flex flex-col items-center text-center gap-8 border-b border-outline-variant/10 pb-20">
          <div className="space-y-6">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.8em] text-primary/60 font-bold">Etashaa Gazette</p>
            <h1 className="font-noto-serif text-5xl md:text-8xl tracking-tighter text-on-surface leading-[0.9]">
              The Heritage<br/>
              <span className="italic italic-serif text-primary/80">Journal</span>
            </h1>
          </div>
          <div className="max-w-md">
            <div className="w-12 h-px bg-primary/30 mx-auto mb-6"></div>
            <p className="font-jakarta-sans text-[11px] text-on-surface/50 leading-relaxed uppercase tracking-[0.2em] italic">
              "A curated anthology of craftsmanship, culture, and the cinematic beauty of Indian couture."
            </p>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {articles.map((article, index) => (
            <div 
              key={article.id} 
              className={`${article.colSpan} group cursor-pointer reveal`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative overflow-hidden mb-8 aspect-[16/10] bg-surface-container shadow-sm">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-[9px] uppercase tracking-widest text-white font-bold border border-white/20">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-primary/60 font-bold">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-primary/30"></span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-noto-serif text-4xl group-hover:text-primary transition-colors duration-500 leading-tight">
                  {article.title}
                </h2>
                <p className="font-jakarta-sans text-sm text-on-surface/50 leading-relaxed max-w-2xl">
                  {article.excerpt}
                </p>
                <button className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface border-b border-on-surface/10 pb-2 group-hover:border-primary transition-all">
                  Read Full Article
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">east</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Overlay */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-white transition-all duration-700 animate-in fade-in slide-in-from-bottom-10">
          {/* Article Header Nav */}
          <div className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-10 px-6 py-6 border-b border-outline-variant/10 flex justify-between items-center">
            <span className="font-jakarta-sans text-[10px] uppercase tracking-widest font-bold text-primary">{selectedArticle.category}</span>
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 font-jakarta-sans text-[10px] uppercase tracking-widest hover:text-primary transition-colors"
            >
              Close
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-24">
            <div className="text-center mb-20">
              <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-6">{selectedArticle.date} • {selectedArticle.readTime}</p>
              <h1 className="font-noto-serif text-5xl md:text-7xl mb-12 leading-tight">{selectedArticle.title}</h1>
              <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>
            </div>

            <div className="aspect-[16/9] mb-20 overflow-hidden shadow-2xl">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="font-jakarta-sans text-lg text-on-surface/70 leading-[1.8] article-content prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: selectedArticle.content }}>
            </div>

            <div className="mt-32 pt-20 border-t border-outline-variant/10 text-center">
              <p className="font-noto-serif text-2xl mb-8 text-on-surface">Experience the Etashaa Heritage</p>
              <Link to="/bridal-collection" className="btn-premium px-12" onClick={() => setSelectedArticle(null)}>
                <span>Explore Collections</span>
              </Link>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default HeritageJournal;
