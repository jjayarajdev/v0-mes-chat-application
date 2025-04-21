import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function ChatNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Chat Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The chat you're looking for doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <Link href="/chat">Return to Chat</Link>
        </Button>
      </div>
    </div>
  )
}
