import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import type { AuthUser } from '@/lib/auth';
import { authService } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    console.log('🔐 AuthProvider - Loading user from localStorage:', currentUser);
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = (user: AuthUser) => {
    console.log('🔐 AuthProvider - Login called with user:', user);
    authService.setCurrentUser(user);
    setUser(user);
    console.log('🔐 AuthProvider - User set in state');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Log pour débogage
  console.log('🔐 useAuth - Current user:', context.user ? {
    id: context.user.id,
    email: context.user.email,
    name: context.user.name
  } : 'null');

  return context;
}