import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api/v1';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          await fetchUserProfile();
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const fetchUserProfile = async () => {
    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    
    const data = await response.json();
    if (data.success) {
      setUser(data.data);
    }
  };

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to login');
    }

    const newToken = data.data.token;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    
    // Fetch user profile after login
    const profileResponse = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${newToken}`
      }
    });
    const profileData = await profileResponse.json();
    if (profileData.success) {
      setUser(profileData.data);
    }
    
    return data;
  };

  const signup = async (name, email, password) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to create account');
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
