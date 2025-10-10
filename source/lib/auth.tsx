"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiClient } from "../../lib/apiClient"

interface User {
  id: string
  email: string
  name: string
  role?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Wait for client-side mount before accessing localStorage
  useEffect(() => {
    setMounted(true)
  }, [])

  // Verify token on mount (only on client side)
  useEffect(() => {
    if (!mounted) return

    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          const response = await apiClient.verifyToken()
          setUser(response.user)
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        localStorage.removeItem('auth_token')
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [mounted])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true)
      const response = await apiClient.login({ email, password })
      setUser(response.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setLoading(true)
      const response = await apiClient.register({ email, password, name })
      setUser(response.user)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
      }
    }
  }


  if (!mounted) {
    return null
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}