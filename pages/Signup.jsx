import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    <main className="min-h-screen flex items-center justify-center bg-surface pt-24 pb-16 px-4">
      <div className="max-w-[420px] w-full px-10 py-10 bg-white shadow-2xl reveal">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-16 md:h-18 object-contain" />
          </Link>
        </div>
        <div className="text-center mb-8">
          <span className="font-jakarta-sans text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-primary font-bold mb-2 block">Join the Atelier</span>
          <h1 className="text-2xl md:text-3xl font-noto-serif mb-1">Create Account</h1>
          <p className="text-[10px] text-outline/70 tracking-wide font-light">Become part of the Etashaa heritage</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-[8px] uppercase tracking-widest text-outline/60 font-bold">Full Name</label>
            <input 
              type="text" 
              placeholder="ETASHAA BRIDE" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full bg-transparent border-b ${errors.name ? 'border-secondary' : 'border-outline/10'} py-2 focus:border-primary focus:ring-0 outline-none text-xs tracking-wide transition-all`}
            />
            {errors.name && <p className="text-[8px] text-secondary uppercase tracking-widest mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[8px] uppercase tracking-widest text-outline/60 font-bold">Email Address</label>
            <input 
              type="email" 
              placeholder="HELLO@ETASHAA.COM" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full bg-transparent border-b ${errors.email ? 'border-secondary' : 'border-outline/10'} py-2 focus:border-primary focus:ring-0 outline-none text-xs tracking-wide transition-all`}
            />
            {errors.email && <p className="text-[8px] text-secondary uppercase tracking-widest mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[8px] uppercase tracking-widest text-outline/60 font-bold">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full bg-transparent border-b ${errors.password ? 'border-secondary' : 'border-outline/10'} py-2 focus:border-primary focus:ring-0 outline-none text-xs tracking-wide transition-all`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[8px] uppercase tracking-widest text-outline/60 font-bold">Confirm</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`w-full bg-transparent border-b ${errors.confirmPassword ? 'border-secondary' : 'border-outline/10'} py-2 focus:border-primary focus:ring-0 outline-none text-xs tracking-wide transition-all`}
              />
            </div>
          </div>
          {(errors.password || errors.confirmPassword) && <p className="text-[8px] text-secondary uppercase tracking-widest mt-1">{errors.password || errors.confirmPassword}</p>}

          <div className="pt-2 space-y-4">
            <button type="submit" className="w-full bg-[#1c1c1a] text-white py-3.5 font-jakarta-sans uppercase tracking-[0.2em] text-[9px] font-bold hover:bg-primary transition-all duration-500 shadow-lg">
              Create Account
            </button>
            
            <div className="relative flex items-center justify-center py-2">
              <div className="border-t border-outline/10 w-full"></div>
              <span className="bg-white px-4 text-[8px] uppercase tracking-widest text-outline/40 font-bold absolute">Or join with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 border border-outline/10 py-3 hover:bg-surface transition-all group">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-4 w-4" />
                <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface/70 group-hover:text-on-surface">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-3 border border-outline/10 py-3 hover:bg-surface transition-all group">
                <svg className="h-4 w-4 fill-on-surface/70 group-hover:fill-on-surface" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-31.4-57.3-114.3-13.7-152.9zM216 94.4c15-18.1 24.3-43 21.4-67.4-20.9 1.1-45.6 13.9-59.4 30.5-12.7 15-23.2 40.3-19.6 63.7 23.5 1.9 44.6-10.7 57.6-26.8z"/></svg>
                <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface/70 group-hover:text-on-surface">Apple</span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-[9px] uppercase tracking-widest text-outline/60">
                Already part of heritage?
                <Link to="/login" className="ml-2 text-primary font-bold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-outline/5 text-center">
            <p className="text-[8px] uppercase tracking-widest text-outline/30 leading-loose">By creating an account, you agree to our <br/> <span className="underline cursor-pointer hover:text-primary">Terms</span> and <span className="underline cursor-pointer hover:text-primary">Privacy Policy</span></p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
