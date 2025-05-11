"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)

    // Simulate a delay to show loading state
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images?.[0] || "/placeholder.svg",
        slug: product.slug,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })

      setIsLoading(false)
    }, 600)
  }

  return (
    <Button size="lg" className={className} onClick={handleAddToCart} disabled={isLoading}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
