
import { createContext, useContext } from 'react';

export type AuthUser = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
