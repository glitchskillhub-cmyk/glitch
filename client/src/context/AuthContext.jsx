import React, { createContext, useState, useEffect, useContext, useRef, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 1 hour in milliseconds
const SESSION_DURATION = 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef(null);

  // Clear any existing auto-logout timer
  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearLogoutTimer();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginTimestamp');
  }, [clearLogoutTimer]);

  // Start auto-logout timer for students
  const startAutoLogoutTimer = useCallback((remainingMs) => {
    clearLogoutTimer();
    if (remainingMs <= 0) {
      // Session already expired
      logout();
      toast.error('Your session has expired. Please log in again.');
      return;
    }
    logoutTimerRef.current = setTimeout(() => {
      logout();
      toast('Your session has expired. Please log in again.', {
        icon: '⏰',
        duration: 5000,
      });
    }, remainingMs);
  }, [clearLogoutTimer, logout]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const normalizedRole = parsedUser.role === 'customer' ? 'student' : parsedUser.role;

      // For students, check if session has expired
      if (normalizedRole === 'student') {
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        if (loginTimestamp) {
          const elapsed = Date.now() - parseInt(loginTimestamp, 10);
          const remaining = SESSION_DURATION - elapsed;
          if (remaining <= 0) {
            // Session expired — clear everything
            localStorage.removeItem('user');
            localStorage.removeItem('loginTimestamp');
            setLoading(false);
            return;
          }
          // Session still valid — restore user and start timer for remaining time
          setUser(parsedUser);
          startAutoLogoutTimer(remaining);
        } else {
          // No login timestamp (old session before this feature) — log out
          localStorage.removeItem('user');
          setLoading(false);
          return;
        }
      } else {
        // Non-student users (admin, mentor) — no auto-logout
        setUser(parsedUser);
      }
    }
    setLoading(false);
    
    // Ping the backend to wake it up if it's sleeping (useful for free hosting like Render)
    api.get('/courses').catch(() => {
      // Silently ignore errors from the ping
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const userData = res.data;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    const normalizedRole = userData.role === 'customer' ? 'student' : userData.role;
    if (normalizedRole === 'student') {
      // Save login timestamp and start auto-logout timer
      localStorage.setItem('loginTimestamp', Date.now().toString());
      startAutoLogoutTimer(SESSION_DURATION);
    }

    return userData;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    const registeredUser = res.data;
    setUser(registeredUser);
    localStorage.setItem('user', JSON.stringify(registeredUser));

    const normalizedRole = registeredUser.role === 'customer' ? 'student' : registeredUser.role;
    if (normalizedRole === 'student') {
      localStorage.setItem('loginTimestamp', Date.now().toString());
      startAutoLogoutTimer(SESSION_DURATION);
    }

    return registeredUser;
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearLogoutTimer();
  }, [clearLogoutTimer]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
