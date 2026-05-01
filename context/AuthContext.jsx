import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Load regular user
    const storedUser = localStorage.getItem('etashaa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load admin user
    const storedAdmin = localStorage.getItem('etashaa_admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
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
      localStorage.setItem('etashaa_admin', JSON.stringify(adminData));
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
    localStorage.removeItem('etashaa_admin');
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, adminLogin, logout, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
