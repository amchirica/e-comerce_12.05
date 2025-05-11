import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch account data")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Failed to update account")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 