"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useChat } from "ai/react"
import ChatSidebar from "@/components/chat-sidebar"
import ProtectedRoute from "@/components/protected-route"
import ChatInterface from "@/components/chat-interface"
import { Loader2, AlertTriangle } from "lucide-react"
import { fetchChatById, getMockResponse } from "@/lib/services/chat-service"
import { Button } from "@/components/ui/button"

export default function ChatDetailPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.chatId as string
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chatData, setChatData] = useState<any>(null)

  const { messages, input, handleInputChange, isLoading, append, setInput, setMessages } = useChat({
    id: chatId,
    initialMessages: [],
  })

  useEffect(() => {
    const loadChatData = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchChatById(chatId)
        setChatData(data)

        // Initialize the chat with historical messages
        setMessages(data.messages)
        setLoading(false)
      } catch (error) {
        console.error("Error loading chat:", error)
        setError("Failed to load chat history. The chat may not exist or you may not have permission to access it.")
        setLoading(false)
      }
    }

    loadChatData()
  }, [chatId, setMessages])

  // Custom submit handler to add mock responses
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    append({
      id: Date.now().toString(),
      content: input,
      role: "user",
    })

    // Simulate loading
    setTimeout(() => {
      // Get mock response
      const mockResponse = getMockResponse(input)

      // Add assistant message with mock response
      append({
        id: (Date.now() + 1).toString(),
        content: mockResponse.content + `\n\nSource: ${mockResponse.source}, Page: ${mockResponse.page}`,
        role: "assistant",
      })

      // Clear input
      setInput("")
    }, 1000)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex h-screen overflow-hidden">
          <ChatSidebar />
          <div className="flex flex-col flex-1 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Loading chat history...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="flex h-screen overflow-hidden">
          <ChatSidebar />
          <div className="flex flex-col flex-1 items-center justify-center p-4">
            <div className="text-center max-w-md">
              <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Error Loading Chat</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => router.push("/chat")}>Return to New Chat</Button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <ChatSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="border-b py-2 px-4">
            <h1 className="text-lg font-medium">{chatData?.title || "Chat"}</h1>
          </div>

          <ChatInterface
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleCustomSubmit}
            isLoading={isLoading}
            append={append}
            setInput={setInput}
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}
