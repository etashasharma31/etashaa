import React from 'react';
import { Link } from 'react-router-dom';

const Maintenance = ({ settings }) => {
  const maintenanceImg = settings?.maintenanceImage || '/images/auth/slide1.png';
  const title = settings?.maintenanceTitle || 'Perfecting the Digital Atelier.';
  const subtitle = settings?.maintenanceSubtitle || 'Exquisite Craftsmanship';
  const description = settings?.maintenanceDescription || 'The Etashaa Digital Atelier is currently undergoing a scheduled transformation. We are refining our collections to bring you the pinnacle of Indian heritage couture.';
  const notice = settings?.maintenanceNotice || 'Our artisans are curating a new digital experience for you. Returning shortly.';
  const email = settings?.contactEmail || 'atelier@etashaa.com';
  const phone = settings?.contactPhone || '+91 9999 888 777';

  return (
    <main className="min-h-screen flex bg-surface overflow-hidden relative">
      {/* Background Animated SVG Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#c4a484" className="animate-pulse" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating SVG Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <svg key={i} className={`absolute animate-float-slow opacity-10`} style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            width: `${20 + Math.random() * 40}px`
          }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#c4a484" strokeWidth="0.5" strokeDasharray="5,5" />
          </svg>
        ))}
      </div>

      {/* Left side: Dramatic Maintenance Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden z-10">
        <img 
          src={maintenanceImg} 
          alt="Under Maintenance" 
          className="w-full h-full object-cover animate-ken-burns scale-110"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-24 left-24 right-24 text-white space-y-8 reveal">
          <div className="space-y-4">
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.8em] font-bold text-white/60 italic">{subtitle}</p>
            <h2 className="font-noto-serif text-6xl leading-tight tracking-tighter" dangerouslySetInnerHTML={{ __html: title.replace('. ', '.<br/>') }}></h2>
          </div>
          <div className="w-20 h-px bg-primary/80"></div>
          <p className="text-xs font-light tracking-widest text-white/40 max-w-sm uppercase italic">{notice}</p>
        </div>
      </div>

      {/* Right side: Information */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 relative bg-surface z-10">
        <div className="max-w-md w-full text-center space-y-12 reveal">
          <div className="flex flex-col items-center">
            <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-16 object-contain mb-12 opacity-80" />
            
            <div className="space-y-6 mb-12 flex flex-col items-center">
              {/* Animated Needle and Thread SVG */}
              <div className="relative w-24 h-24 mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                  {/* Needle */}
                  <path 
                    d="M30,70 L70,30" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    className="animate-needle"
                  />
                  {/* Thread */}
                  <path 
                    d="M70,30 C80,20 90,40 80,50 C70,60 50,40 40,50 C30,60 40,80 50,70" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    strokeDasharray="200"
                    strokeDashoffset="200"
                    className="animate-thread"
                  />
                </svg>
                <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping -z-10 scale-75"></div>
              </div>

              <h1 className="text-3xl md:text-4xl font-noto-serif tracking-tight text-on-surface">Momentarily Unavailable</h1>
              <p className="text-xs text-outline/60 tracking-widest font-light leading-relaxed max-w-sm mx-auto">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full border-t border-outline-variant/10 pt-12">
              <div className="text-center md:text-left">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Inquiries</h4>
                <p className="text-[11px] text-outline italic">{email}</p>
              </div>
              <div className="text-center md:text-right">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Concierge</h4>
                <p className="text-[11px] text-outline italic">{phone}</p>
              </div>
            </div>
          </div>

          <div className="pt-12">
             <div className="flex justify-center gap-8 items-center text-outline/30">
                <span className="text-[9px] uppercase tracking-widest font-bold hover:text-primary transition-colors cursor-pointer">Instagram</span>
                <span className="text-[9px] uppercase tracking-widest font-bold hover:text-primary transition-colors cursor-pointer">Pinterest</span>
                <span className="text-[9px] uppercase tracking-widest font-bold hover:text-primary transition-colors cursor-pointer">WhatsApp</span>
             </div>
          </div>
        </div>
        
        {/* Admin Link */}
        <Link to="/admin" className="absolute bottom-8 right-8 text-[8px] uppercase tracking-widest text-outline/20 hover:text-primary transition-colors">Admin Access</Link>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        @keyframes needle {
          0%, 100% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
        }
        .animate-needle {
          animation: needle 3s ease-in-out infinite;
        }
        @keyframes thread {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-thread {
          animation: thread 4s linear infinite;
        }
      `}} />
    </main>
  );
};

export default Maintenance;
