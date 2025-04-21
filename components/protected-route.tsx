"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user" | null // null means any authenticated user
}

export default function ProtectedRoute({ children, requiredRole = null }: ProtectedRouteProps) {
  const { user, status } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && requiredRole && user?.role !== requiredRole) {
      // Redirect if user doesn't have required role
      router.push("/unauthorized")
    }
  }, [status, user, router, requiredRole])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "authenticated") {
    if (!requiredRole || user?.role === requiredRole) {
      return <>{children}</>
    }
  }

  // Don't render anything while redirecting
  return null
}
