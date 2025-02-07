import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    const response = await fetch("https://mini-waitlist.rek3000.workers.dev/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error("Failed to join waitlist")
    }

    return NextResponse.json({ message: "Successfully joined waitlist" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 })
  }
}

