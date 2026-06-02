import React, { createContext, useState, useEffect, useContext, useRef, useCallback } from 'react';
import api, { setGlobalLogout } from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 1 hour in milliseconds
const SESSION_DURATION = 60 * 60 * 1000;

// Helper: normalize role so 'customer' is always treated as 'student'
const normalizeRole = (role) => (role === 'customer' ? 'student' : role);

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
      return;
    }
    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, remainingMs);
  }, [clearLogoutTimer, logout]);

  // Check if the student session is still valid, returns remaining ms or -1 if expired
  const checkSessionValidity = useCallback(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return -1;
    const parsedUser = JSON.parse(savedUser);
    const role = normalizeRole(parsedUser.role);
    if (role !== 'student') return Infinity; // non-students don't expire
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (!loginTimestamp) return -1; // old session without timestamp
    const elapsed = Date.now() - parseInt(loginTimestamp, 10);
    return SESSION_DURATION - elapsed;
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Normalize the role in-memory
      parsedUser.role = normalizeRole(parsedUser.role);

      // For students, check if session has expired
      if (parsedUser.role === 'student') {
        const remaining = checkSessionValidity();
        if (remaining <= 0) {
          // Session expired — clear everything
          localStorage.removeItem('user');
          localStorage.removeItem('loginTimestamp');
          setUser(null);
          setLoading(false);
          return;
        }
        // Session still valid — restore user and start timer for remaining time
        setUser(parsedUser);
        startAutoLogoutTimer(remaining);
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

  // Re-validate session when the browser tab regains focus (catches suspended timers)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const remaining = checkSessionValidity();
        if (remaining !== Infinity && remaining <= 0) {
          // Session expired while tab was hidden/suspended
          logout();
        } else if (remaining > 0 && remaining !== Infinity) {
          // Recalibrate the auto-logout timer with accurate remaining time
          startAutoLogoutTimer(remaining);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [checkSessionValidity, logout, startAutoLogoutTimer]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const userData = res.data;
    // Normalize role before storing
    userData.role = normalizeRole(userData.role);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    if (userData.role === 'student') {
      // Save login timestamp and start auto-logout timer
      localStorage.setItem('loginTimestamp', Date.now().toString());
      startAutoLogoutTimer(SESSION_DURATION);
    }

    return userData;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    const registeredUser = res.data;
    // Normalize role before storing
    registeredUser.role = normalizeRole(registeredUser.role);
    setUser(registeredUser);
    localStorage.setItem('user', JSON.stringify(registeredUser));

    if (registeredUser.role === 'student') {
      localStorage.setItem('loginTimestamp', Date.now().toString());
      startAutoLogoutTimer(SESSION_DURATION);
    }

    return registeredUser;
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Register global logout so the API interceptor can clear React state
  useEffect(() => {
    setGlobalLogout(logout);
    return () => {
      clearLogoutTimer();
      setGlobalLogout(null);
    };
  }, [clearLogoutTimer, logout]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
