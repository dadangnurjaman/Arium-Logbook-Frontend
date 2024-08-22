// src/context/NavigationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [current, setCurrent] = useState(() => {
    return localStorage.getItem('currentMenu') || '/';
  });

  useEffect(() => {
    localStorage.setItem('currentMenu', current);
  }, [current]);

  return (
    <NavigationContext.Provider value={{ current, setCurrent }}>
      {children}
    </NavigationContext.Provider>
  );
};
