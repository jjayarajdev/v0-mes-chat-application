import { type NextRequest, NextResponse } from "next/server"
import { listUsers, createUser, removeUser } from "@/lib/actions/users"

export async function GET() {
  const result = await listUsers()
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  if (!data.name || !data.email || !data.role) {
    return NextResponse.json({ success: false, message: "Name, email, and role are required" }, { status: 400 })
  }

  const result = await createUser(data)
  return NextResponse.json(result)
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  if (!id) {
    return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 })
  }

  const result = await removeUser(id)
  return NextResponse.json(result)
}
