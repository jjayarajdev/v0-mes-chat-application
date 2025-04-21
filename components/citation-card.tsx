"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CitationCardProps {
  source: string
  page?: number
  text: string
  onViewSource?: () => void
}

export default function CitationCard({ source, page, text, onViewSource }: CitationCardProps) {
  return (
    <Card className="not-prose my-2">
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 rounded-md p-2 flex-shrink-0">
            <HardHat className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{source}</p>
              {page !== undefined && <span className="text-xs text-muted-foreground">Page {page}</span>}
            </div>
            <p className="text-xs text-muted-foreground">{text}</p>
            <Button variant="link" size="sm" className="p-0 h-auto" onClick={onViewSource}>
              <ExternalLink className="h-3 w-3 mr-1" />
              View source document
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
