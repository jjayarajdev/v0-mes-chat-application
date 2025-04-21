"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"

interface DocumentCardProps {
  title: string
  date: string
  type: string
  onView?: () => void
  onDownload?: () => void
}

export default function DocumentCard({ title, date, type, onView, onDownload }: DocumentCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted relative flex items-center justify-center">
        <FileText className="h-16 w-16 text-muted-foreground/50" />
        <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{type}</div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <p className="text-xs text-muted-foreground">Added on {date}</p>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="w-full" onClick={onView}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={onDownload}>
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
