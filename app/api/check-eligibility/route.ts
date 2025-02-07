import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const wallet = searchParams.get("wallet")

  if (!wallet) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://mini-waitlist.rek3000.workers.dev/waitlist/${wallet}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to check eligibility")
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to check eligibility" }, { status: 500 })
  }
}

