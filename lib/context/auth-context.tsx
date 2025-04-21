"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Import the mock users
import { mockUsers } from "@/lib/data/mock-users"

export type UserRole = "admin" | "user" | null
export type AuthStatus = "authenticated" | "unauthenticated" | "loading"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions?: string[]
}

interface AuthContextType {
  user: User | null
  status: AuthStatus
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthStatus>("loading")

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("mes_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setStatus("authenticated")
    } else {
      setStatus("unauthenticated")
    }
  }, [])

  // Update the login function to use the mock users without requiring role
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find the user with matching credentials
    const foundUser = mockUsers.find((user) => user.email === email && user.password === password)

    if (foundUser) {
      const newUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role as UserRole,
        permissions: foundUser.permissions,
      }

      setUser(newUser)
      setStatus("authenticated")
      localStorage.setItem("mes_user", JSON.stringify(newUser))
      return true
    }

    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setStatus("unauthenticated")
    localStorage.removeItem("mes_user")
  }

  return <AuthContext.Provider value={{ user, status, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
