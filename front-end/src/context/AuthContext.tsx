/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, ReactNode } from "react";

import { User } from "../types/user.types";
import { authService } from "../services/authService";
import { storage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  mockLogin: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = storage.getToken();
      if (storedToken) {
        if (storedToken === 'mock-token') {
          // Bypass JWT and service check for mock user
          setUser({ id: 'mock-id', name: 'Admin Test', email: 'admin@test.com', role: 'admin' } as User);
          setToken(storedToken);
          setIsLoading(false);
          return;
        }

        try {
          const decoded: { exp: number } = jwtDecode(storedToken);
          // Check exp
          if (decoded.exp * 1000 < Date.now()) {
            throw new Error("Token expired");
          }
          const profile = await authService.getProfile();
          setUser(profile);
          setToken(storedToken);
        } catch {
          storage.removeToken();
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();

    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = async (data: any) => {
    const { user, token } = await authService.login(data);
    storage.setToken(token);
    setToken(token);
    setUser(user);
  };

  const register = async (data: any) => {
    const { user, token } = await authService.register(data);
    storage.setToken(token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    storage.removeToken();
    setToken(null);
    setUser(null);
  };

  const mockLogin = () => {
    const mockToken = 'mock-token';
    const mockUser = { id: 'mock-id', name: 'Admin Test', email: 'admin@test.com', role: 'admin' } as User;
    storage.setToken(mockToken);
    setToken(mockToken);
    setUser(mockUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, mockLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
