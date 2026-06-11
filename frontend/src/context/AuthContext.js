import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) fetchProfile();
    else setLoading(false);
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/auth/profile/');
      setUser(res.data);
    } catch {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const res = await API.post('/auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    await fetchProfile();
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout/', { refresh: localStorage.getItem('refresh_token') });
    } catch {}
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);