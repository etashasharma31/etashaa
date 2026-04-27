import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Policies = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getContent = () => {
    if (pathname.includes('terms')) {
      return {
        title: 'Terms of Use',
        subtitle: 'Last updated: April 2024',
        content: [
          { h: 'Acceptance of Terms', p: 'By accessing and using the Etashaa website, you agree to be bound by these Terms of Use and all applicable laws and regulations.' },
          { h: 'Intellectual Property', p: 'All content on this site, including designs, text, graphics, and logos, is the exclusive property of Etashaa Heritage and is protected by copyright laws.' },
          { h: 'Product Accuracy', p: 'We strive to display our products as accurately as possible. However, due to the handcrafted nature of our couture, slight variations in color and embroidery may occur.' }
        ]
      };
    }
    if (pathname.includes('privacy')) {
      return {
        title: 'Privacy Policy',
        subtitle: 'Your security is our priority',
        content: [
          { h: 'Data Collection', p: 'We collect only the necessary information to process your orders and provide a personalized atelier experience.' },
          { h: 'Information Usage', p: 'Your data is used solely for order fulfillment, customer support, and, with your consent, exclusive brand updates.' },
          { h: 'Secure Transactions', p: 'All payments are processed through encrypted, industry-leading payment gateways to ensure your financial security.' }
        ]
      };
    }
    if (pathname.includes('shipping-policy')) {
      return {
        title: 'Shipping Policy',
        subtitle: 'Global Luxury Logistics',
        content: [
          { h: 'Domestic Shipping', p: 'We offer complimentary insured shipping on all orders within India. Bridal orders are typically dispatched within 4-6 weeks.' },
          { h: 'International Shipping', p: 'Etashaa ships to over 50 countries. Shipping costs and duties are calculated at checkout based on your location.' },
          { h: 'Secure Transit', p: 'Every piece is packaged in our signature luxury trunks and shipped via high-security premium couriers.' }
        ]
      };
    }
    if (pathname.includes('returns-exchanges')) {
      return {
        title: 'Returns & Exchanges',
        subtitle: 'Our Commitment to Perfection',
        content: [
          { h: 'Made-to-Order Policy', p: 'As each piece is handcrafted to your specific measurements, we do not offer returns. However, we provide one complimentary alteration.' },
          { h: 'Damaged Items', p: 'In the rare event of transit damage, please notify us within 24 hours of delivery for an immediate restoration or replacement.' },
          { h: 'Cancellation', p: 'Orders can be cancelled within 48 hours of placement for a full refund before work begins in our atelier.' }
        ]
      };
    }
    if (pathname.includes('size-guide')) {
      return {
        title: 'Size Guide',
        subtitle: 'Find Your Perfect Silhouette',
        content: [
          { h: 'Standard Sizing', p: 'Our size chart ranges from XS to XXL. Please refer to the specific measurements on each product page for the best fit.' },
          { h: 'Custom Measurements', p: 'For bridal and heavy couture, we recommend our "Signature Fit" service where we guide you through professional measurement.' },
          { h: 'Virtual Fitting', p: 'Book a video consultation with our master tailors for a personalized fitting session from the comfort of your home.' }
        ]
      };
    }
    if (pathname.includes('faqs')) {
      return {
        title: 'Frequently Asked Questions',
        subtitle: 'Atelier Concierge',
        content: [
          { h: 'Bespoke Services', p: 'Yes, we offer complete customization of colors, silhouettes, and embroidery patterns for all bridal collections.' },
          { h: 'Store Visits', p: 'You can visit our flagship atelier in New Delhi. We recommend booking an appointment 48 hours in advance.' },
          { h: 'Order Timeline', p: 'Festive wear typically takes 2-3 weeks, while bridal couture requires 8-12 weeks for the finest hand-embroidery.' }
        ]
      };
    }
    if (pathname.includes('our-story')) {
      return {
        title: 'Our Story',
        subtitle: 'Heritage Since 1984',
        content: [
          { h: 'The Atelier', p: 'Born from a passion for traditional Indian textiles, Etashaa has been a sanctuary for master craftsmen and weavers for four decades.' },
          { h: 'Our Vision', p: 'We believe in slow fashion—creating pieces that are not just garments, but heirlooms passed down through generations.' },
          { h: 'Craftsmanship', p: 'Every Zardosi stitch and every weave is a tribute to the timeless beauty of Indian artisanal heritage.' }
        ]
      };
    }
    if (pathname.includes('contact')) {
      return {
        title: 'Contact Us',
        subtitle: 'Connect with the Atelier',
        content: [
          { h: 'Concierge Service', p: 'Email: concierge@etashaa.com | WhatsApp: +91 99999 88888. Our team is available 10 AM - 7 PM IST.' },
          { h: 'Flagship Store', p: 'Plot 42, DLF Emporio, Vasant Kunj, New Delhi. Visit us for a private bridal consultation.' },
          { h: 'Press & Media', p: 'For editorial inquiries and collaborations, please reach out to press@etashaa.com.' }
        ]
      };
    }
    return {
      title: 'Policies & Cookies',
      subtitle: 'A seamless experience for everyone',
      content: [
        { h: 'Accessibility Commitment', p: 'Etashaa is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability.' },
        { h: 'Cookie Usage', p: 'We use cookies to enhance your browsing experience, analyze site traffic, and serve personalized content.' }
      ]
    };
  };

  const data = getContent();

  return (
    <main className="min-h-screen pt-40 pb-32 relative overflow-hidden bg-[#fcf9f6]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Breadcrumb-style indicator */}
        <div className="flex justify-center mb-8 reveal">
          <div className="h-[1px] w-12 bg-primary/30 self-center"></div>
          <span className="mx-4 font-jakarta-sans text-[9px] uppercase tracking-[0.5em] text-primary font-bold">Atelier Archives</span>
          <div className="h-[1px] w-12 bg-primary/30 self-center"></div>
        </div>

        <header className="mb-24 text-center">
          <h1 className="text-6xl md:text-8xl font-noto-serif tracking-tighter mb-8 reveal text-on-surface leading-tight">
            {data.title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4 italic last:not-italic">{word}</span>
            ))}
          </h1>
          <div className="inline-flex items-center gap-4 reveal" style={{ animationDelay: '0.2s' }}>
            <span className="h-[1px] w-8 bg-outline/20"></span>
            <p className="font-jakarta-sans text-[10px] text-outline tracking-[0.2em] uppercase">{data.subtitle}</p>
            <span className="h-[1px] w-8 bg-outline/20"></span>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Side Navigation for longer reading */}
          <aside className="hidden md:block md:col-span-3 sticky top-40 h-fit space-y-6 border-l border-outline-variant/10 pl-6">
            {data.content.map((item, i) => (
              <a 
                key={i} 
                href={`#section-${i}`}
                className="block font-jakarta-sans text-[9px] uppercase tracking-widest text-outline hover:text-primary transition-colors duration-500"
              >
                {item.h}
              </a>
            ))}
          </aside>

          {/* Main Content */}
          <div className="md:col-span-9 space-y-24">
            {data.content.map((item, i) => (
              <section key={i} id={`section-${i}`} className="reveal group" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex items-start gap-6 mb-6">
                  <span className="font-noto-serif text-sm italic text-primary/40 pt-1">0{i + 1}</span>
                  <h2 className="font-noto-serif text-3xl md:text-4xl tracking-tight text-on-surface group-hover:text-primary transition-colors duration-700">{item.h}</h2>
                </div>
                <div className="pl-12 border-l border-outline-variant/5 group-hover:border-primary/20 transition-colors duration-700">
                  <p className="font-jakarta-sans text-sm md:text-base text-on-surface-variant leading-relaxed tracking-wide font-light">
                    {item.p}
                  </p>
                  <p className="mt-6 font-jakarta-sans text-[11px] text-on-surface-variant/70 leading-relaxed italic">
                    For further clarification regarding this clause, please reach out to our dedicated client care team who can provide detailed documentation and personalized assistance.
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Policies;
