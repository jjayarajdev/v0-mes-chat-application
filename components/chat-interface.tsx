"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, FileUp, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, HardHat } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  messages: any[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  append: (message: any) => void
  setInput: (input: string) => void
}

export default function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  append,
  setInput,
}: ChatInterfaceProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleFileUpload = async () => {
    if (files.length === 0) return

    // Simulate file upload
    const fileNames = files.map((file) => file.name).join(", ")
    append({
      id: Date.now().toString(),
      content: `I've uploaded the following files: ${fileNames}`,
      role: "user",
    })

    // Reset files
    setFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <>
      <div className="flex-1 overflow-auto space-y-4 pb-4 px-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-4 p-4 rounded-lg max-w-3xl",
              message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-card border shadow-sm",
            )}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback
                className={message.role === "user" ? "bg-primary-foreground text-primary" : "bg-primary/10"}
              >
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 overflow-hidden">
              <div className={cn("prose prose-sm max-w-none", message.role === "user" ? "prose-invert" : "")}>
                {message.content.split("\n\nSource:")[0]}
              </div>

              {message.role === "assistant" && message.content.includes("Source:") && (
                <div className="text-xs text-muted-foreground mt-2 flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-2">
                    <HardHat className="h-3 w-3 text-primary" />
                  </div>
                  <span>{message.content.split("\n\nSource:")[1]}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept="application/pdf,image/*,.doc,.docx,.txt"
            />
            <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
              <FileUp className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question about building plans..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || input.trim() === ""}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          {files.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground flex-1">{files.length} file(s) selected</div>
              <Button type="button" size="sm" onClick={handleFileUpload}>
                Upload & Process
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  )
}
