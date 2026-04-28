import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Welcome to the Atelier</span>
          <h1 className="text-4xl font-noto-serif mb-2">Sign In</h1>
          <p className="text-xs text-outline tracking-wide">Enter your details to access your curated selection.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-outline">Email Address</label>
            <input 
              type="email" 
              placeholder="HELLO@ETASHAA.COM" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-transparent border-b ${errors.email ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
            />
            {errors.email && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-outline">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-transparent border-b ${errors.password ? 'border-secondary' : 'border-outline/20'} py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all`}
            />
            {errors.password && <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">{errors.password}</p>}
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-[#1c1c1a] text-white py-4 font-jakarta-sans uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-primary transition-all duration-500 mb-6 shadow-xl">
              Sign In to Account
            </button>
            
            <div className="text-center space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-outline">
                Don't have an account?
                <Link to="/signup" className="ml-2 text-primary font-bold hover:underline">Join Now</Link>
              </p>
              <button type="button" className="text-[9px] uppercase tracking-widest text-outline/60 hover:text-primary transition-colors italic">Forgot your password?</button>
            </div>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-outline/10 text-center">
            <div className="flex justify-center gap-6 opacity-30 grayscale mb-6">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
                <span className="material-symbols-outlined text-2xl">security</span>
                <span className="material-symbols-outlined text-2xl">lock</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-outline/40">Secure & Encrypted Connection</p>
        </div>
      </div>
    </main>
  );
};

export default Login;
