import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
  const { id } = await request.json()

  try {
    const response = await fetch(`https://mini-waitlist.rek3000.workers.dev/entries/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete entry")
    }

    return NextResponse.json({ message: "Successfully deleted entry" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 })
  }
}

