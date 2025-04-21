"use client"

import type React from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import ChatSidebar from "@/components/chat-sidebar"
import { buildingPlanQA } from "@/lib/data/building-plan-qa"
import ProtectedRoute from "@/components/protected-route"
import { Building, HardHat } from "lucide-react"
import ChatInterface from "@/components/chat-interface"
import { getMockResponse } from "@/lib/services/chat-service"

export default function ChatPage() {
  const { messages, input, handleInputChange, isLoading, append, setInput } = useChat({
    api: "/api/chat",
    onResponse: (response) => {
      // Handle streaming response
      console.log("Chat response received")
    },
  })

  const handleExampleQuestion = (question: string) => {
    // Add user message
    append({
      id: Date.now().toString(),
      content: question,
      role: "user",
    })

    // Simulate loading
    setTimeout(() => {
      // Get mock response
      const mockResponse = getMockResponse(question)

      // Add assistant message with mock response
      append({
        id: (Date.now() + 1).toString(),
        content: mockResponse.content + `\n\nSource: ${mockResponse.source}, Page: ${mockResponse.page}`,
        role: "assistant",
      })
    }, 1000)
  }

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

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <ChatSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="border-b py-2 px-4">
            <h1 className="text-lg font-medium">New Chat</h1>
          </div>

          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                <Building className="h-16 w-16 mx-auto text-primary" />
                <h3 className="text-xl font-medium">Building Plan Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Ask questions about building plans, specifications, and compliance requirements.
                </p>

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Try asking about:</h4>
                  <div className="grid gap-2">
                    {buildingPlanQA.slice(0, 3).map((qa, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto py-2 px-3 text-left"
                        onClick={() => handleExampleQuestion(qa.question)}
                      >
                        <HardHat className="h-3 w-3 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-xs">{qa.question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ChatInterface
              messages={messages}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleCustomSubmit}
              isLoading={isLoading}
              append={append}
              setInput={setInput}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
