import { NextResponse } from "next/server"
import { z } from "zod"

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
})

// GET /api/customers/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Replace with actual database query
    const customer = {
      id: params.id,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    }
    return NextResponse.json(customer)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customer" },
      { status: 500 }
    )
  }
}

// PUT /api/customers/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = customerSchema.parse(body)

    // TODO: Replace with actual database update
    const updatedCustomer = {
      id: params.id,
      ...validatedData,
    }

    return NextResponse.json(updatedCustomer)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid customer data", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    )
  }
}

// DELETE /api/customers/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Replace with actual database delete
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    )
  }
} 