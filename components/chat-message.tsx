import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import CitationCard from "./citation-card"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  // Function to extract citations from the assistant's message
  const processCitations = (text: string) => {
    // Regular expression to find citation patterns like [Source: Document Name, Page: X]
    const citationRegex = /\[Source: ([^,]+), Page: (\d+)\]/g

    // Replace citations with markers and collect citation data
    const citations: Array<{ source: string; page: number; text: string }> = []
    let lastIndex = 0
    let match
    let processedText = ""

    while ((match = citationRegex.exec(text)) !== null) {
      // Add text before the citation
      processedText += text.substring(lastIndex, match.index)

      // Add a citation marker
      const citationIndex = citations.length
      processedText += `[${citationIndex + 1}]`

      // Extract citation details
      const source = match[1].trim()
      const page = Number.parseInt(match[2], 10)

      // Find the context (text before the citation)
      const contextStart = Math.max(0, match.index - 100)
      const context = text.substring(contextStart, match.index).trim()

      citations.push({
        source,
        page,
        text: context,
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    processedText += text.substring(lastIndex)

    return { processedText, citations }
  }

  const { processedText, citations } =
    role === "assistant" ? processCitations(content) : { processedText: content, citations: [] }

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg",
        role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
      )}
      style={{ maxWidth: "80%" }}
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback>{role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <div className="prose prose-sm">{processedText}</div>

        {citations.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground">Sources:</h4>
            {citations.map((citation, index) => (
              <CitationCard
                key={index}
                source={citation.source}
                page={citation.page}
                text={citation.text}
                onViewSource={() => {}}
              />
            ))}
          </div>
        )}

        {role === "assistant" && citations.length === 0 && (
          <div className="text-xs text-muted-foreground mt-2 flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            <span>Building Plan Documentation</span>
          </div>
        )}
      </div>
    </div>
  )
}
