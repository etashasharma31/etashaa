import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
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
      const success = login(email, password);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface pt-20 pb-12 px-4">
      <div className="max-w-[380px] w-full px-8 py-8 bg-white shadow-2xl reveal">
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-12 object-contain" />
          </Link>
        </div>
        <div className="text-center mb-6">
          <span className="font-jakarta-sans text-[8px] uppercase tracking-[0.4em] text-primary font-bold mb-1 block">Welcome to the Atelier</span>
          <h1 className="text-2xl font-noto-serif mb-1">Sign In</h1>
          <p className="text-[10px] text-outline/60 tracking-wide font-light">Access your curated selection</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[8px] uppercase tracking-widest text-outline/50 font-bold">Email Address</label>
            <input 
              type="email" 
              placeholder="hello@etashaa.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-transparent border-b ${errors.email ? 'border-secondary' : 'border-outline/10'} py-1.5 focus:border-primary focus:ring-0 outline-none text-xs tracking-wide transition-all`}
            />
            {errors.email && <p className="text-[8px] text-secondary uppercase tracking-widest mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[8px] uppercase tracking-widest text-outline/50 font-bold">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-transparent border-b ${errors.password ? 'border-secondary' : 'border-outline/10'} py-1.5 focus:border-primary focus:ring-0 outline-none text-xs tracking-wide transition-all`}
            />
            {errors.password && <p className="text-[8px] text-secondary uppercase tracking-widest mt-1">{errors.password}</p>}
          </div>

          <div className="pt-2 space-y-3">
            <button type="submit" className="w-full bg-[#1c1c1a] text-white py-3 font-jakarta-sans uppercase tracking-[0.2em] text-[9px] font-bold hover:bg-primary transition-all duration-500 shadow-lg">
              Sign In
            </button>

            <div className="relative flex items-center justify-center py-1">
              <div className="border-t border-outline/10 w-full"></div>
              <span className="bg-white px-3 text-[7px] uppercase tracking-widest text-outline/30 font-bold absolute">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 border border-outline/10 py-2.5 hover:bg-surface transition-all group">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-3.5 w-3.5" />
                <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface/60 group-hover:text-on-surface">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 border border-outline/10 py-2.5 hover:bg-surface transition-all group">
                <svg className="h-3.5 w-3.5 fill-on-surface/60 group-hover:fill-on-surface" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-31.4-57.3-114.3-13.7-152.9zM216 94.4c15-18.1 24.3-43 21.4-67.4-20.9 1.1-45.6 13.9-59.4 30.5-12.7 15-23.2 40.3-19.6 63.7 23.5 1.9 44.6-10.7 57.6-26.8z"/></svg>
                <span className="text-[8px] uppercase tracking-widest font-bold text-on-surface/60 group-hover:text-on-surface">Apple</span>
              </button>
            </div>
            
            <div className="text-center space-y-2 pt-1">
              <p className="text-[8px] uppercase tracking-widest text-outline/50">
                New to Etashaa?
                <Link to="/signup" className="ml-2 text-primary font-bold hover:underline">Join Now</Link>
              </p>
              <button type="button" className="text-[8px] uppercase tracking-widest text-outline/30 hover:text-primary transition-colors underline underline-offset-4">Forgot password?</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
