import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Load regular user
    const storedUser = localStorage.getItem('etashaa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Cleanup old persistent admin session to force new login
    localStorage.removeItem('etashaa_admin');

    // Load admin user from session
    const storedAdmin = sessionStorage.getItem('etashaa_admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    
    setInitialLoading(false);
  }, []);

  const login = (email, password) => {
    // Regular customer login
    const userData = { email, name: 'Guest User', role: 'user' };
    setUser(userData);
    localStorage.setItem('etashaa_user', JSON.stringify(userData));
    return true;
  };

  const adminLogin = (email, password) => {
    // Separate admin login
    if (email === 'admin@etashaa.com' && password === 'admin123') {
      const adminData = { email, name: 'Master Admin', role: 'admin' };
      setAdmin(adminData);
      sessionStorage.setItem('etashaa_admin', JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('etashaa_user');
  };

  const adminLogout = () => {
    setAdmin(null);
    sessionStorage.removeItem('etashaa_admin');
  };

  return (
    <AuthContext.Provider value={{ user, admin, initialLoading, login, adminLogin, logout, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
