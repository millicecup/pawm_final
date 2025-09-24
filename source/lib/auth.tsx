"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  register: (email: string, password: string, name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = (email: string, password: string): void => {
    // Simple frontend validation - just check if fields are filled
    if (email.trim() && password.trim()) {
      const user = {
        id: Date.now().toString(), // Simple ID generation
        email: email.trim(),
        name: email.split("@")[0] || "User",
      }
      setUser(user)
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  const register = (email: string, password: string, name: string): void => {
    // Simple frontend validation - just check if fields are filled
    if (email.trim() && password.trim() && name.trim()) {
      const user = {
        id: Date.now().toString(), // Simple ID generation
        email: email.trim(),
        name: name.trim(),
      }
      setUser(user)
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
