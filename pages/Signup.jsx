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
    <main className="min-h-screen flex items-center justify-center bg-surface pt-20 pb-12">
      <div className="max-w-md w-full px-8 py-12 bg-white editorial-shadow reveal">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-28 object-contain" />
          </Link>
        </div>
        <div className="text-center mb-10">
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Join the Atelier</span>
          <h1 className="text-4xl font-noto-serif mb-2">Create Account</h1>
          <p className="text-xs text-outline tracking-wide">Become part of the Etashaa heritage.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-outline">Full Name</label>
            <input 
              type="text" 
              placeholder="ETASHAA BRIDE" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full bg-transparent border-b ${errors.name ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
            />
            {errors.name && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-outline">Email Address</label>
            <input 
              type="email" 
              placeholder="HELLO@ETASHAA.COM" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full bg-transparent border-b ${errors.email ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
            />
            {errors.email && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-outline">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full bg-transparent border-b ${errors.password ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
            />
            {errors.password && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.password}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-outline">Confirm Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className={`w-full bg-transparent border-b ${errors.confirmPassword ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
            />
            {errors.confirmPassword && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-[#1c1c1a] text-white py-4 font-jakarta-sans uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-primary transition-all duration-500 mb-6 shadow-xl">
              Create My Account
            </button>
            
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-outline">
                Already have an account?
                <Link to="/login" className="ml-2 text-primary font-bold hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-outline/10 text-center">
            <p className="text-[9px] uppercase tracking-widest text-outline/40 leading-loose">By creating an account, you agree to our <br/> <span className="underline cursor-pointer hover:text-primary">Terms of Service</span> and <span className="underline cursor-pointer hover:text-primary">Privacy Policy</span></p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
