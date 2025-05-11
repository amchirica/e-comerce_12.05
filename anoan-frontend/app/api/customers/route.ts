import { NextResponse } from "next/server"
import { z } from "zod"

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
})

// GET /api/customers
export async function GET() {
  try {
    // TODO: Replace with actual database query
    const customers = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
      },
    ]
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    )
  }
}

// POST /api/customers
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = customerSchema.parse(body)

    // TODO: Replace with actual database insert
    const newCustomer = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
    }

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid customer data", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    )
  }
} 