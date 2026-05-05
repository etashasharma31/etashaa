import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const slides = [
    { image: '/images/auth/slide1.png', tag: 'Hand-Crafted Luxury', title: 'The Art of Zardosi' },
    { image: '/images/auth/slide2.png', tag: 'Bridal Heritage', title: 'Regal Ceremonies' },
    { image: '/images/auth/slide3.png', tag: 'Timeless Elegance', title: 'The Heritage Saree' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    let newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const success = login(email, password);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <main className="min-h-screen flex bg-surface">
      {/* Left side: Editorial Image Slider */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-surface-container-highest">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ${index === activeSlide ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className={`absolute bottom-20 left-20 right-20 text-white space-y-6 transition-all duration-1000 delay-500 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.6em] font-bold text-white/70 italic">{slide.tag}</p>
              <h2 className="font-noto-serif text-5xl leading-tight tracking-tight">{slide.title}</h2>
              <div className="w-12 h-px bg-primary/60"></div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-20 flex gap-4 z-20">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSlide(i)}
              className={`h-0.5 transition-all duration-500 ${i === activeSlide ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
        <div className="max-w-[420px] w-full reveal">
          <div className="flex flex-col mb-12">
            <Link to="/" className="mb-12 inline-block">
              <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-14 object-contain" />
            </Link>
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3">Welcome to the Atelier</p>
            <h1 className="text-4xl font-noto-serif mb-3 tracking-tight">Sign In</h1>
            <p className="text-xs text-outline/60 tracking-wide font-light italic">Enter your details to access your curated selection.</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2 group">
              <label className="text-[9px] uppercase tracking-widest text-outline/50 font-bold group-focus-within:text-primary transition-colors">Email Address</label>
              <input 
                type="email" 
                placeholder="hello@etashaa.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-transparent border-b ${errors.email ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
              />
              {errors.email && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label className="text-[9px] uppercase tracking-widest text-outline/50 font-bold group-focus-within:text-primary transition-colors">Password</label>
                <button type="button" className="text-[8px] uppercase tracking-widest text-outline/30 hover:text-primary transition-colors font-bold">Forgot?</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border-b ${errors.password ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
              />
              {errors.password && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.password}</p>}
            </div>

            <div className="pt-4 space-y-6">
              <button type="submit" className="w-full bg-[#1c1c1a] text-white py-5 font-jakarta-sans uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-primary transition-all duration-700 shadow-2xl">
                Sign In
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="border-t border-outline/10 w-full"></div>
                <span className="bg-surface px-4 text-[8px] uppercase tracking-widest text-outline/40 font-bold absolute italic">Or connect via</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-3 border border-outline/10 py-4 hover:bg-white hover:border-primary/20 transition-all group rounded-none">
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-4 w-4" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface/60 group-hover:text-on-surface">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-3 border border-outline/10 py-4 hover:bg-white hover:border-primary/20 transition-all group rounded-none">
                  <svg className="h-4 w-4 fill-on-surface/60 group-hover:fill-on-surface" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-31.4-57.3-114.3-13.7-152.9zM216 94.4c15-18.1 24.3-43 21.4-67.4-20.9 1.1-45.6 13.9-59.4 30.5-12.7 15-23.2 40.3-19.6 63.7 23.5 1.9 44.6-10.7 57.6-26.8z"/></svg>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface/60 group-hover:text-on-surface">Apple ID</span>
                </button>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-[10px] uppercase tracking-widest text-outline/50">
                  Don't have an account?
                  <Link to="/signup" className="ml-2 text-primary font-bold hover:underline">Create One</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
