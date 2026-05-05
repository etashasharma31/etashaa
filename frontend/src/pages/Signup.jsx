import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    { image: '/images/auth/slide2.png', tag: 'Join the Atelier', title: 'A New Legacy Begins' },
    { image: '/images/auth/slide1.png', tag: 'Hand-Crafted Luxury', title: 'The Art of Zardosi' },
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
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters required';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Auto-login simulation
      navigate('/');
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

      {/* Right side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
        <div className="max-w-[420px] w-full reveal">
          <div className="flex flex-col mb-10">
            <Link to="/" className="mb-10 inline-block">
              <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-14 object-contain" />
            </Link>
            <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3">The Atelier Journey</p>
            <h1 className="text-4xl font-noto-serif mb-3 tracking-tight">Create Account</h1>
            <p className="text-xs text-outline/60 tracking-wide font-light italic">Join our world of timeless craftsmanship and bespoke elegance.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 group">
              <label className="text-[9px] uppercase tracking-widest text-outline/50 font-bold group-focus-within:text-primary transition-colors">Full Name</label>
              <input 
                type="text" 
                placeholder="ETASHAA BRIDE" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full bg-transparent border-b ${errors.name ? 'border-secondary' : 'border-outline/20'} py-2.5 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
              />
              {errors.name && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] uppercase tracking-widest text-outline/50 font-bold group-focus-within:text-primary transition-colors">Email Address</label>
              <input 
                type="email" 
                placeholder="HELLO@ETASHAA.COM" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full bg-transparent border-b ${errors.email ? 'border-secondary' : 'border-outline/20'} py-2.5 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
              />
              {errors.email && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[9px] uppercase tracking-widest text-outline/50 font-bold group-focus-within:text-primary transition-colors">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full bg-transparent border-b ${errors.password ? 'border-secondary' : 'border-outline/20'} py-2.5 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[9px] uppercase tracking-widest text-outline/50 font-bold group-focus-within:text-primary transition-colors">Confirm</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className={`w-full bg-transparent border-b ${errors.confirmPassword ? 'border-secondary' : 'border-outline/20'} py-2.5 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
                />
              </div>
            </div>
            {(errors.password || errors.confirmPassword) && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.password || errors.confirmPassword}</p>}

            <div className="pt-4 space-y-6">
              <button type="submit" className="w-full bg-[#1c1c1a] text-white py-5 font-jakarta-sans uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-primary transition-all duration-700 shadow-2xl">
                Create Account
              </button>
              
              <div className="relative flex items-center justify-center py-2">
                <div className="border-t border-outline/10 w-full"></div>
                <span className="bg-surface px-4 text-[8px] uppercase tracking-widest text-outline/40 font-bold absolute italic">Or join via</span>
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
                  Already have an account?
                  <Link to="/login" className="ml-2 text-primary font-bold hover:underline">Sign In</Link>
                </p>
              </div>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-outline/10 text-center">
              <p className="text-[8px] uppercase tracking-[0.2em] text-outline/40 leading-loose">By creating an account, you agree to our <br/> <span className="underline cursor-pointer hover:text-primary transition-colors">Terms of Service</span> and <span className="underline cursor-pointer hover:text-primary transition-colors">Privacy Policy</span></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
