"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, MessageSquare } from "lucide-react"

export default function ModerationPage() {
  const [conversations, setConversations] = useState([
    {
      id: "conv-1",
      user: "john.doe@example.com",
      date: "2023-06-15",
      status: "flagged",
      reason: "Potential sensitive information",
    },
    {
      id: "conv-2",
      user: "jane.smith@example.com",
      date: "2023-06-14",
      status: "approved",
      reason: "",
    },
    {
      id: "conv-3",
      user: "robert.johnson@example.com",
      date: "2023-06-13",
      status: "rejected",
      reason: "Inappropriate content",
    },
    {
      id: "conv-4",
      user: "sarah.williams@example.com",
      date: "2023-06-12",
      status: "pending",
      reason: "",
    },
    {
      id: "conv-5",
      user: "michael.brown@example.com",
      date: "2023-06-11",
      status: "flagged",
      reason: "Potential security concern",
    },
  ])

  const handleApprove = (id: string) => {
    setConversations(conversations.map((conv) => (conv.id === id ? { ...conv, status: "approved", reason: "" } : conv)))
  }

  const handleReject = (id: string) => {
    setConversations(
      conversations.map((conv) =>
        conv.id === id ? { ...conv, status: "rejected", reason: "Rejected by moderator" } : conv,
      ),
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Moderation</h1>
        <Button>Refresh</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversation Moderation</CardTitle>
          <CardDescription>Review and moderate user conversations for compliance and safety</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversations.map((conv) => (
                <TableRow key={conv.id}>
                  <TableCell>{conv.user}</TableCell>
                  <TableCell>{conv.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        conv.status === "approved"
                          ? "outline"
                          : conv.status === "rejected"
                            ? "destructive"
                            : conv.status === "flagged"
                              ? "secondary"
                              : "default"
                      }
                    >
                      {conv.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{conv.reason}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="#view">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600"
                        onClick={() => handleApprove(conv.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleReject(conv.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flagged Content</CardTitle>
          <CardDescription>Content that has been automatically flagged for review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Potential sensitive information detected</h3>
                  <p className="text-sm text-muted-foreground mt-1">User: john.doe@example.com | Date: 2023-06-15</p>
                  <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                    <p>
                      "I need information about the structural weaknesses in the building located at 123 Main Street..."
                    </p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" className="text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Potential security concern detected</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    User: michael.brown@example.com | Date: 2023-06-11
                  </p>
                  <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                    <p>
                      "Can you tell me how to bypass the fire safety systems in the building? I need to know for..."
                    </p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" className="text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
