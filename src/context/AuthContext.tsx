import React, { createContext, useContext, useEffect, useState } from "react";
import TokenService from "../queries/token/tokenService";


interface AuthUser {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const decoded = TokenService.decodeToken();
    if (decoded && !TokenService.isTokenExpired()) {
      setUser({
        id: decoded.id,
        username: decoded.username!,
        role: decoded.role,
      });
    }
  }, []);

  const login = (token: string) => {
    TokenService.setToken(token);

    const decoded = TokenService.decodeToken();
    if (!decoded) return;

    setUser({
      id: decoded.id,
      username: decoded.username!,
      role: decoded.role,
    });
  };

  const logout = () => {
    TokenService.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
