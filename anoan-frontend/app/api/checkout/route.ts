import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  try {
    const body = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token.value}` }),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json()
      return new NextResponse(error.message || "Checkout failed", { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 