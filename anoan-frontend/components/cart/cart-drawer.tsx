"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart, type CartItem } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { formatPrice } from "@/lib/utils"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isCartOpen, closeCart, cartTotal } = useCart()

  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [closeCart])

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
            </div>
            <Button onClick={closeCart} asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-1">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 px-1">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <Button variant="outline" onClick={closeCart} asChild className="w-full">
                  <Link href="/cart">View Cart</Link>
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function CartItemCard({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex items-start gap-4">
      <div className="relative aspect-square h-16 w-16 min-w-[4rem] overflow-hidden rounded-lg bg-muted">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <Link
            href={`/products/${item.slug}`}
            className="line-clamp-1 text-sm font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {item.name}
          </Link>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Remove one</span>
            </Button>
            <span className="text-xs tabular-nums">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Add one</span>
            </Button>
          </div>
          <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
        </div>
      </div>
    </div>
  )
}
