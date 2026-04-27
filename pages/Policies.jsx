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
          {
            h: 'Acceptance of Terms',
            p: 'By accessing and using the Etashaa website, you agree to be bound by these Terms of Use and all applicable laws and regulations.'
          },
          {
            h: 'Intellectual Property',
            p: 'All content on this site, including designs, text, graphics, and logos, is the exclusive property of Etashaa Heritage and is protected by copyright laws.'
          },
          {
            h: 'Product Accuracy',
            p: 'We strive to display our products as accurately as possible. However, due to the handcrafted nature of our couture, slight variations in color and embroidery may occur.'
          }
        ]
      };
    }
    if (pathname.includes('privacy')) {
      return {
        title: 'Privacy Policy',
        subtitle: 'Your security is our priority',
        content: [
          {
            h: 'Data Collection',
            p: 'We collect only the necessary information to process your orders and provide a personalized atelier experience.'
          },
          {
            h: 'Information Usage',
            p: 'Your data is used solely for order fulfillment, customer support, and, with your consent, exclusive brand updates.'
          },
          {
            h: 'Secure Transactions',
            p: 'All payments are processed through encrypted, industry-leading payment gateways to ensure your financial security.'
          }
        ]
      };
    }
    return {
      title: 'Accessibility & Cookies',
      subtitle: 'A seamless experience for everyone',
      content: [
        {
          h: 'Accessibility Commitment',
          p: 'Etashaa is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability.'
        },
        {
          h: 'Cookie Usage',
          p: 'We use cookies to enhance your browsing experience, analyze site traffic, and serve personalized content. By continuing to use our site, you consent to our use of cookies.'
        }
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

        <div className="mt-40 pt-16 border-t border-outline-variant/10 text-center reveal">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary/30 text-4xl">verified_user</span>
          </div>
          <p className="font-jakarta-sans text-[10px] text-outline tracking-[0.3em] uppercase max-w-sm mx-auto leading-loose">
            Questions? Contact our couture concierge <br/>
            <span className="text-primary hover:text-secondary cursor-pointer transition-colors duration-500 border-b border-primary/20">concierge@etashaa.com</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Policies;
