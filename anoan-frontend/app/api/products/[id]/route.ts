import { NextResponse } from "next/server"
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
  stock: z.number().min(0),
})

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Replace with actual database query
    const product = {
      id: params.id,
      name: "Sample Product",
      description: "A sample product description",
      price: 99.99,
      category: "electronics",
      stock: 10,
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

    // TODO: Replace with actual database update
    const updatedProduct = {
      id: params.id,
      ...validatedData,
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid product data", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Replace with actual database delete
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
} 