"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, CreateUserInput } from "@/core/domain/entities/User";
import { useUseCases } from "@/presentation/providers/usecases-context";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (input: CreateUserInput) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loginUseCase, registerUseCase, logoutUseCase, getCurrentUserUseCase } = useUseCases();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUserUseCase.execute();
        setUser(currentUser);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const user = await loginUseCase.execute({ email, password });
      setUser(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, [loginUseCase]);

  const register = useCallback(async (input: CreateUserInput): Promise<User> => {
    setIsLoading(true);
    try {
      const user = await registerUseCase.execute(input);
      setUser(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, [registerUseCase]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutUseCase.execute();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [logoutUseCase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
