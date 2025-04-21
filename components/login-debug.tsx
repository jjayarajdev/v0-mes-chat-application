"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUsers } from "@/lib/data/mock-users"

export function LoginDebug() {
  const [showDebug, setShowDebug] = useState(false)

  return (
    <div className="mt-4 w-full max-w-md">
      <Button variant="outline" size="sm" onClick={() => setShowDebug(!showDebug)} className="w-full">
        {showDebug ? "Hide" : "Show"} Debug Info
      </Button>

      {showDebug && (
        <Card className="mt-2">
          <CardHeader className="py-2">
            <CardTitle className="text-sm">Available Mock Users</CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <pre className="overflow-auto max-h-40">{JSON.stringify(mockUsers, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
