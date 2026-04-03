import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define AuthStep type as per SDD
export type AuthStep = 'methods' | 'phone' | 'register' | 'pin' | 'biometric' | 'forgot-phone' | 'forgot-verify' | 'forgot-reset';

// Define AuthUser type (simplified for now)
export interface AuthUser {
  id: string;
  username: string;
  displayName?: string;
}

// Define the shape of the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  sessionToken: string | null;
  pinEnabled: boolean;
  biometricEnabled: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  setPinEnabled: (enabled: boolean) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  // Add other methods as needed for authentication flow
}

// Create the context with default (empty) values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthContextProvider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [pinEnabled, setPinEnabled] = useState<boolean>(false);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);

  const login = (token: string, userData: AuthUser) => {
    setIsAuthenticated(true);
    setSessionToken(token);
    setUser(userData);
    // In a real app, you'd store token/user in localStorage/sessionStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSessionToken(null);
    setUser(null);
    setPinEnabled(false);
    setBiometricEnabled(false);
    // Clear from storage
  };

  const value = {
    isAuthenticated,
    user,
    sessionToken,
    pinEnabled,
    biometricEnabled,
    login,
    logout,
    setPinEnabled,
    setBiometricEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
