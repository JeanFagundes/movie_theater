import React, { createContext, useState, ReactNode, FC } from 'react';

// Defina a interface para o contexto de autenticação
export interface AuthContextData {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Crie o contexto de autenticação
export const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Crie um provedor de autenticação para envolver sua aplicação
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
