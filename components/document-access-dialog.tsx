"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface DocumentAccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentId: number | null
  documentName: string
}

export function DocumentAccessDialog({ open, onOpenChange, documentId, documentName }: DocumentAccessDialogProps) {
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [assignedUsers, setAssignedUsers] = useState<User[]>([
    { id: "user-1", name: "Admin User", email: "admin@mes.com", role: "admin" },
    { id: "user-3", name: "Engineering User", email: "engineer@mes.com", role: "user" },
  ])

  const [availableUsers, setAvailableUsers] = useState<User[]>([
    { id: "user-1", name: "Admin User", email: "admin@mes.com", role: "admin" },
    { id: "user-2", name: "Standard User", email: "user@mes.com", role: "user" },
    { id: "user-3", name: "Engineering User", email: "engineer@mes.com", role: "user" },
    { id: "user-4", name: "Plan Reviewer", email: "reviewer@mes.com", role: "user" },
    { id: "user-5", name: "Super Admin", email: "superadmin@mes.com", role: "admin" },
  ])

  // Filter out already assigned users from available users
  const filteredAvailableUsers = availableUsers.filter(
    (user) => !assignedUsers.some((assignedUser) => assignedUser.id === user.id),
  )

  const handleAddUser = () => {
    if (!selectedUser) return

    const userToAdd = availableUsers.find((user) => user.id === selectedUser)
    if (!userToAdd) return

    setAssignedUsers([...assignedUsers, userToAdd])
    setSelectedUser("")
  }

  const handleRemoveUser = (userId: string) => {
    setAssignedUsers(assignedUsers.filter((user) => user.id !== userId))
  }

  const handleSave = () => {
    // In a real app, you would save the assigned users to the backend
    toast({
      title: "Access permissions updated",
      description: `Updated access for ${documentName}`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Document Access</DialogTitle>
          <DialogDescription>Assign users who can access {documentName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Add User Access</Label>
            <div className="flex space-x-2">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAvailableUsers.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">All users have been assigned</div>
                  ) : (
                    filteredAvailableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddUser} disabled={!selectedUser}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Currently Assigned Users</Label>
            {assignedUsers.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground border rounded-md">
                No users assigned to this document
              </div>
            ) : (
              <div className="border rounded-md">
                <div className="p-2 space-y-2">
                  {assignedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{user.name}</span>
                        <Badge variant={user.role === "admin" ? "secondary" : "outline"}>{user.role}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive h-8 w-8 p-0"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Permissions</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
