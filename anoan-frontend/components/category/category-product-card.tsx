"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/cart/cart-provider"
import { useState } from "react"
import { Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: number | string
  name: string
  price: number
  image: string
  description?: string
  slug?: string
  sku?: string
  stock?: number
  brand?: {
    id: number
    name: string
    slug: string
  }
  category?: {
    id: number
    name: string
    slug: string
  }
}

interface CategoryProductCardProps {
  product: Product
}

export function CategoryProductCard({ product }: CategoryProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast({
        title: "Stoc epuizat",
        description: "Acest produs nu mai este disponibil în stoc.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      slug: product.slug || product.id.toString(),
      sku: product.sku,
    })

    toast({
      title: "Adăugat în coș",
      description: `${product.name} a fost adăugat în coșul tău.`,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{product.description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            className={`transition-all duration-300 ${
              isAdded
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
            }`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Adăugat
              </>
            ) : product.stock === 0 ? (
              "Stoc epuizat"
            ) : (
              "Adaugă în coș"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
