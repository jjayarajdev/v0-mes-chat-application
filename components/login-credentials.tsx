import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "lucide-react"

export function LoginCredentials() {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3 text-muted-foreground">
          <InfoIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Demo Credentials</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Badge variant="secondary">Admin</Badge>
              </TableCell>
              <TableCell>admin@mes.com</TableCell>
              <TableCell>admin123</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Badge variant="outline">User</Badge>
              </TableCell>
              <TableCell>user@mes.com</TableCell>
              <TableCell>user123</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
