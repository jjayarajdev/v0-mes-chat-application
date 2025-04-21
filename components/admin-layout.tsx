"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  // Determine active tab based on the current path
  const getActiveTab = () => {
    if (pathname.includes("/admin/documents")) return "documents"
    if (pathname.includes("/admin/users")) return "users"
    if (pathname.includes("/admin/settings") || pathname === "/admin") return "settings"
    return "settings" // Default tab
  }

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>

      <Tabs value={getActiveTab()} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents" asChild>
            <Link href="/admin/documents" className="flex items-center justify-center">
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </Link>
          </TabsTrigger>
          <TabsTrigger value="users" asChild>
            <Link href="/admin/users" className="flex items-center justify-center">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Link>
          </TabsTrigger>
          <TabsTrigger value="settings" asChild>
            <Link href="/admin/settings" className="flex items-center justify-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </TabsTrigger>
        </TabsList>

        <div>{children}</div>
      </Tabs>
    </div>
  )
}
