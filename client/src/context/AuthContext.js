import React, { createContext, useContext, useState, useEffect } from 'react';
import userData from '../data/UserData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(
    JSON.parse(localStorage.getItem('authenticatedUser')) || null
  );

  useEffect(() => {
    if (authenticatedUser) {
      localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
    } else {
      localStorage.removeItem('authenticatedUser');
    }
  }, [authenticatedUser]);

  const login = (user) => {
    const foundUser = userData.find(
      (u) => u.email === user.email && u.password === user.password
    );
    if (foundUser) {
      setAuthenticatedUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAuthenticatedUser(null);
    localStorage.removeItem('authenticatedUser');
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;