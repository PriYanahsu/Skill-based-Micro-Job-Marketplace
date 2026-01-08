"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, UserRole } from "../lib/types";

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  loginAs: (name: string, role: UserRole) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("marketjob:user") : null;
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const setUser = (value: User | null) => {
    setUserState(value);
    if (typeof window !== "undefined") {
      if (value) {
        window.localStorage.setItem("marketjob:user", JSON.stringify(value));
      } else {
        window.localStorage.removeItem("marketjob:user");
      }
    }
  };

  const loginAs = (name: string, role: UserRole) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      role,
    };
    setUser(newUser);
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, loginAs, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
};


