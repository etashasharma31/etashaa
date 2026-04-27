import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface pt-20 pb-12">
      <div className="max-w-md w-full px-8 py-12 bg-white editorial-shadow reveal">
        <div className="text-center mb-10">
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Welcome to the Atelier</span>
          <h1 className="text-4xl font-noto-serif mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p className="text-xs text-outline tracking-wide">Enter your details to access your curated selection.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/profile'); }}>
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-outline">Full Name</label>
              <input 
                type="text" 
                placeholder="ETASHAA BRIDE" 
                className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all"
                required 
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-outline">Email Address</label>
            <input 
              type="email" 
              placeholder="HELLO@ETASHAA.COM" 
              className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-outline">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-transparent border-b border-outline/20 py-3 focus:border-primary focus:ring-0 outline-none text-sm tracking-wide transition-all"
              required 
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-[#1c1c1a] text-white py-4 font-jakarta-sans uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-primary transition-all duration-500 mb-6">
              {isLogin ? 'Sign In to Account' : 'Create My Account'}
            </button>
            
            <div className="text-center space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-outline">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-primary font-bold hover:underline"
                >
                  {isLogin ? 'Join Now' : 'Sign In'}
                </button>
              </p>
              {isLogin && (
                <button type="button" className="text-[9px] uppercase tracking-widest text-outline/60 hover:text-primary transition-colors italic">Forgot your password?</button>
              )}
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
