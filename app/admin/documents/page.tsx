"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileUp, Trash2, Search, Users, Eye, Download } from "lucide-react"
import { DocumentAccessDialog } from "@/components/document-access-dialog"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: number
  name: string
  type: string
  dateAdded: string
  size: string
  assignedUsers: number
}

export default function DocumentsPage() {
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "MES Technical Document 1",
      type: "PDF",
      dateAdded: "2023-06-15",
      size: "2.4 MB",
      assignedUsers: 2,
    },
    {
      id: 2,
      name: "MES Technical Document 2",
      type: "PDF",
      dateAdded: "2023-06-14",
      size: "1.8 MB",
      assignedUsers: 1,
    },
    {
      id: 3,
      name: "MES Technical Document 3",
      type: "DOCX",
      dateAdded: "2023-06-12",
      size: "3.2 MB",
      assignedUsers: 3,
    },
    {
      id: 4,
      name: "MES Technical Document 4",
      type: "PDF",
      dateAdded: "2023-06-10",
      size: "4.5 MB",
      assignedUsers: 0,
    },
    {
      id: 5,
      name: "MES Technical Document 5",
      type: "XLSX",
      dateAdded: "2023-06-08",
      size: "1.2 MB",
      assignedUsers: 2,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [activeDocument, setActiveDocument] = useState<number | null>(null)
  const [documentAccessOpen, setDocumentAccessOpen] = useState(false)

  // Filter documents based on search query
  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id))

    toast({
      title: "Document deleted",
      description: "The document has been removed from the system.",
    })
  }

  const handleManageAccess = (documentId: number) => {
    setActiveDocument(documentId)
    setDocumentAccessOpen(true)
  }

  const getDocumentName = (id: number | null) => {
    if (!id) return ""
    const doc = documents.find((d) => d.id === id)
    return doc ? doc.name : ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Library</CardTitle>
        <CardDescription>Manage documents and control user access</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <FileUp className="mr-2 h-4 w-4" />
            Upload Documents
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Assigned Users</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No documents found matching your search criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.type}</Badge>
                  </TableCell>
                  <TableCell>{doc.dateAdded}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageAccess(doc.id)}
                      className="flex items-center"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      {doc.assignedUsers > 0 ? `${doc.assignedUsers} Users` : "Assign Users"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DocumentAccessDialog
          open={documentAccessOpen}
          onOpenChange={setDocumentAccessOpen}
          documentId={activeDocument}
          documentName={getDocumentName(activeDocument)}
        />
      </CardContent>
    </Card>
  )
}
