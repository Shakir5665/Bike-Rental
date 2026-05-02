import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5237/api'; // Updated to match launchSettings.json

  useEffect(() => {
    const savedUserId = localStorage.getItem('bikeRentalUserId');
    const savedUserName = localStorage.getItem('bikeRentalUserName');
    if (savedUserId) {
      setUser({ id: parseInt(savedUserId), name: savedUserName });
    }
    setLoading(false);
  }, []);

  const login = async (name, email, phone) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, { name, email, phone });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('bikeRentalUserId', userData.id);
      localStorage.setItem('bikeRentalUserName', userData.name);
      return userData;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bikeRentalUserId');
    localStorage.removeItem('bikeRentalUserName');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
