"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: string
  name: string
  price: number
  image: string
  slug: string
  category?: {
    id: number
    name: string
    slug: string
  }
  isNew?: boolean
  isSale?: boolean
  sku: string
  stock: number
  brand: {
    id: number
    name: string
    slug: string
  }
  images: string[]
  description: string
  specifications: Record<string, string>
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)

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
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
      sku: product.sku,
    })

    toast({
      title: "Adăugat în coș",
      description: `${product.name} a fost adăugat în coșul tău.`,
    })
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Eliminat din favorite" : "Adăugat în favorite",
      description: `${product.name} a fost ${isWishlisted ? "eliminat din" : "adăugat în"} favoritele tale.`,
    })
  }

  return (
    <Card className="overflow-hidden group">
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm ${
              isWishlisted ? "text-red-500" : "text-muted-foreground"
            }`}
            onClick={toggleWishlist}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            <span className="sr-only">Adaugă în favorite</span>
          </Button>
          {product.isNew && <Badge className="absolute top-2 left-2">Nou</Badge>}
          {product.isSale && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Reducere
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="translate-y-4 group-hover:translate-y-0 transition-transform"
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? "Stoc epuizat" : "Adaugă în coș"}
            </Button>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        {product.category && (
          <div className="text-xs text-muted-foreground mb-1">{product.category.name}</div>
        )}
        <Link href={`/products/${product.slug}`} className="font-medium hover:underline line-clamp-1">
          {product.name}
        </Link>
        <div className="mt-2 font-semibold">{formatPrice(product.price)}</div>
      </CardContent>
    </Card>
  )
}
