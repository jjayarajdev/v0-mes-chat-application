"use server"

// This is a placeholder for actual user management functionality
// In a real implementation, this would interact with a database

export type UserRole = "admin" | "reviewer" | "user"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  lastLogin: string
}

export async function createUser(data: { name: string; email: string; role: UserRole }) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    message: "User created successfully",
    user: {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      lastLogin: new Date().toISOString(),
    },
  }
}

export async function removeUser(id: string) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: "User removed successfully",
  }
}

export async function listUsers() {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return mock user list
  return {
    success: true,
    users: [
      {
        id: "user-1",
        name: "Admin User",
        email: "admin@mes.com",
        role: "admin" as UserRole,
        lastLogin: new Date().toISOString(),
      },
      {
        id: "user-2",
        name: "Reviewer User",
        email: "reviewer@mes.com",
        role: "reviewer" as UserRole,
        lastLogin: new Date().toISOString(),
      },
      {
        id: "user-3",
        name: "End User",
        email: "user@mes.com",
        role: "user" as UserRole,
        lastLogin: new Date().toISOString(),
      },
    ],
  }
}
