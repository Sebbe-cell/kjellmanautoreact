
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a type for the context value
type TokenContextType = {
  token: string;
  updateToken: (newToken: string) => void;
};

type TokenProviderProps = {
  children: ReactNode;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);

  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }

  return context;
};

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, updateToken }}>
      {children}
    </TokenContext.Provider>
  );
};