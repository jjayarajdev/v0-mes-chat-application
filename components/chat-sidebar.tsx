"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Menu, X, PlusCircle, Clock, LogOut, Settings } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/lib/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { chatHistory } from "@/lib/services/chat-service"

export default function ChatSidebar() {
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleNewChat = () => {
    router.push("/chat")
  }

  const Sidebar = () => (
    <div
      className={cn(
        "h-screen flex flex-col bg-muted/40 border-r w-64 transition-all duration-300",
        isMobile && !open && "hidden",
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <div className="font-semibold flex items-center">MES Building Plans</div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {user && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role} Account</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <Button variant="default" className="w-full justify-start" onClick={handleNewChat}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <h4 className="text-sm font-medium">Chat History</h4>
            </div>

            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant={pathname === `/chat/${chat.id}` ? "secondary" : "ghost"}
                className="w-full justify-start flex-col items-start h-auto py-3 px-3"
                asChild
              >
                <Link href={`/chat/${chat.id}`}>
                  <div className="flex flex-col items-start gap-1 w-full">
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium truncate max-w-[160px]">{chat.title}</span>
                      <span className="text-xs text-muted-foreground">{format(chat.timestamp, "MMM d")}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left truncate w-full">{chat.preview}</p>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-2">
        {user?.role === "admin" && (
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin">
              <Settings className="mr-2 h-4 w-4" />
              Admin Panel
            </Link>
          </Button>
        )}
        <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
      )}
      <Sidebar />
    </>
  )
}
