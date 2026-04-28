import React, { useEffect } from 'react';

const SizeGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sizeData = [
    { size: 'XS', bust: '32"', waist: '26"', hips: '36"', shoulder: '13.5"' },
    { size: 'S', bust: '34"', waist: '28"', hips: '38"', shoulder: '14"' },
    { size: 'M', bust: '36"', waist: '30"', hips: '40"', shoulder: '14.5"' },
    { size: 'L', bust: '38"', waist: '32"', hips: '42"', shoulder: '15"' },
    { size: 'XL', bust: '40"', waist: '34"', hips: '44"', shoulder: '15.5"' },
    { size: 'XXL', bust: '42"', waist: '36"', hips: '46"', shoulder: '16"' },
  ];

  const measurementTips = [
    { label: 'Bust', desc: 'Measure around the fullest part of your bust while wearing a well-fitting bra.' },
    { label: 'Waist', desc: 'Measure around your natural waistline, typically the narrowest part of your torso.' },
    { label: 'Hips', desc: 'Measure around the fullest part of your hips, approximately 8 inches below your waist.' },
    { label: 'Length', desc: 'Measure from the highest point of your shoulder down to the desired hemline.' },
  ];

  return (
    <main className="min-h-screen pt-40 pb-32 bg-[#fcf9f6]">
      <div className="max-w-custom">
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-6 block">Precision in Couture</span>
          <h1 className="text-6xl md:text-8xl font-noto-serif italic mb-8">Size Guide</h1>
          <p className="text-on-surface-variant font-jakarta-sans text-sm md:text-base leading-relaxed font-light">
            Each Etashaa piece is a labor of love, designed to grace your silhouette with absolute perfection. 
            Follow our guide to find your ideal fit or opt for our bespoke measurement service.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          {/* Table Section */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-noto-serif mb-12 italic border-b border-outline-variant/20 pb-6">Standard Sizing (Inches)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-jakarta-sans border-collapse">
                <thead>
                  <tr className="border-b border-on-surface/10">
                    <th className="py-6 text-[10px] uppercase tracking-widest font-bold text-outline">Size</th>
                    <th className="py-6 text-[10px] uppercase tracking-widest font-bold text-outline">Bust</th>
                    <th className="py-6 text-[10px] uppercase tracking-widest font-bold text-outline">Waist</th>
                    <th className="py-6 text-[10px] uppercase tracking-widest font-bold text-outline">Hips</th>
                    <th className="py-6 text-[10px] uppercase tracking-widest font-bold text-outline">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {sizeData.map((row) => (
                    <tr key={row.size} className="hover:bg-primary-container/5 transition-colors">
                      <td className="py-6 font-bold text-primary">{row.size}</td>
                      <td className="py-6 text-on-surface-variant/80">{row.bust}</td>
                      <td className="py-6 text-on-surface-variant/80">{row.waist}</td>
                      <td className="py-6 text-on-surface-variant/80">{row.hips}</td>
                      <td className="py-6 text-on-surface-variant/80">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 p-6 bg-surface-container-low border border-outline-variant/10 rounded-sm">
              <p className="text-[11px] text-outline leading-relaxed italic">
                * Please note: These are body measurements, not garment measurements. Our master tailors add appropriate ease based on the silhouette of each design.
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="lg:col-span-5 space-y-16">
            <section>
              <h2 className="text-3xl font-noto-serif mb-8 italic">How to Measure</h2>
              <div className="space-y-8">
                {measurementTips.map((tip, i) => (
                  <div key={tip.label} className="flex gap-6 group">
                    <span className="font-noto-serif text-primary/30 text-xl italic pt-1 group-hover:text-primary transition-colors">0{i+1}</span>
                    <div>
                      <h3 className="font-jakarta-sans text-xs uppercase tracking-widest font-bold mb-2">{tip.label}</h3>
                      <p className="text-on-surface-variant text-sm font-light leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 p-10 rounded-sm border border-primary/10">
              <h2 className="text-2xl font-noto-serif mb-6 italic">Signature Fit Service</h2>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-8">
                For our bridal and high-couture collections, we recommend a personalized measurement session via video consultation with our senior designers.
              </p>
              <button className="btn-premium w-full">
                <span>Book a Consultation</span>
              </button>
            </section>
          </div>
        </div>

      </div>
    </main>
  );
};

export default SizeGuide;
