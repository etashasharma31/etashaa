import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const success = adminLogin(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Access denied.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a0a00] px-4">
      <div className="max-w-[420px] w-full px-10 py-12 bg-white shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        
        <div className="text-center mb-10">
          <Link to="/">
            <img src="/images/logo_etashaa.png" alt="Etashaa Logo" className="h-12 object-contain mx-auto mb-6" />
          </Link>
          <h1 className="font-noto-serif text-3xl italic mb-2">Admin Portal</h1>
          <p className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-outline/60 font-bold">Secure Access Required</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-secondary/5 border border-secondary/10 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-lg">warning</span>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-outline font-bold block ml-1">Admin Email</label>
            <input 
              type="email" 
              placeholder="" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-outline-variant/20 px-5 py-4 focus:border-primary outline-none text-sm font-jakarta-sans transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-outline font-bold block ml-1">Secret Key</label>
            <input 
              type="password" 
              placeholder="" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-outline-variant/20 px-5 py-4 focus:border-primary outline-none text-sm font-jakarta-sans transition-all"
              required
            />
          </div>

          <button type="submit" className="w-full btn-premium !py-5 mt-4">
            <span>Authorize Access</span>
            <span className="material-symbols-outlined text-sm ml-2">verified_user</span>
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
          <Link to="/" className="text-[9px] uppercase tracking-[0.3em] text-outline/50 hover:text-primary transition-all font-bold">
            Return to Public Site
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
