import { type NextRequest, NextResponse } from "next/server"
import { listDocuments, uploadDocument, removeDocument } from "@/lib/actions/documents"

export async function GET() {
  const result = await listDocuments()
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const result = await uploadDocument(formData)
  return NextResponse.json(result)
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  if (!id) {
    return NextResponse.json({ success: false, message: "Document ID is required" }, { status: 400 })
  }

  const result = await removeDocument(id)
  return NextResponse.json(result)
}
