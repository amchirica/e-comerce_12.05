import { NextResponse } from "next/server"
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
  stock: z.number().min(0),
})

// GET /api/products
export async function GET() {
  try {
    // TODO: Replace with actual database query
    const products = [
      {
        id: "1",
        name: "Sample Product",
        description: "A sample product description",
        price: 99.99,
        category: "electronics",
        stock: 10,
      },
    ]
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

    // TODO: Replace with actual database insert
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid product data", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
} 