"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useGuestCheckout } from "@/hooks/use-guest-checkout"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GuestFormData {
  name: string
  email: string
  phone: string
}

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { guestData, setGuestData } = useGuestCheckout()
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [guestFormData, setGuestFormData] = useState<GuestFormData>({
    name: guestData?.name || "",
    email: guestData?.email || "",
    phone: guestData?.phone || "",
  })
  const { items, removeItem, updateQuantity, cartTotal } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const handleApplyPromo = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false)
      setPromoCode("")
      // Show toast or update UI based on result
    }, 1000)
  }

  const shipping = cartTotal > 499 ? 0 : 19.99
  const total = cartTotal + shipping

  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      setGuestData(guestFormData)
      setIsGuestDialogOpen(false)
      toast({
        title: "Succes",
        description: "Datele pentru comanda dvs. au fost salvate.",
      })
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut salva datele. Vă rugăm să încercați din nou.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = async () => {
    if (!user && !guestData) {
      setIsGuestDialogOpen(true)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user || guestData,
        }),
      })

      if (!response.ok) {
        throw new Error("Checkout failed")
      }

      const data = await response.json()
      toast({
        title: "Succes",
        description: "Comanda a fost plasată cu succes!",
      })
      router.push(`/orders/${data.orderId}`)
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut procesa comanda. Vă rugăm să încercați din nou.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout>
      {/* Breadcrumbs */}
      <div className="bg-muted/50">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Acasă
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Coșul de cumpărături</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Coșul de cumpărături</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Coșul tău este gol</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
            Se pare că încă nu ați adăugat nimic în coș. Răsfoiți produsele noastre și poate veți găsi ceea ce vă trebuie.
            </p>
            <Button asChild>
              <Link href="/products">Continuă cumpărăturile</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Produse în coș ({items.length})</h2>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative aspect-square h-24 w-24 min-w-[6rem] overflow-hidden rounded-md bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex justify-between">
                            <div>
                              <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                                {item.name}
                              </Link>
                              <div className="mt-1 text-sm text-muted-foreground">{formatPrice(item.price)} each</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Șterge</span>
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Scade cantitatea</span>
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Crește cantitatea</span>
                              </Button>
                            </div>
                            <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Sumarul comenzii</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livrare</span>
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex items-center">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        className="ml-2 whitespace-nowrap"
                        onClick={handleApplyPromo}
                        disabled={isApplyingPromo || !promoCode}
                      >
                        {isApplyingPromo ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">Finalizează cumpărăturile</Link>
                    </Button>
                    <div className="text-center">
                      <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                        Continuă cumpărăturile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!user && !guestData && (
        <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Continuă ca Guest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Date pentru comandă</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleGuestSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guest-name">Nume complet</Label>
                <Input
                  id="guest-name"
                  value={guestFormData.name}
                  onChange={(e) =>
                    setGuestFormData({ ...guestFormData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guest-email">Email</Label>
                <Input
                  id="guest-email"
                  type="email"
                  value={guestFormData.email}
                  onChange={(e) =>
                    setGuestFormData({ ...guestFormData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guest-phone">Telefon</Label>
                <Input
                  id="guest-phone"
                  type="tel"
                  value={guestFormData.phone}
                  onChange={(e) =>
                    setGuestFormData({ ...guestFormData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Se salvează..." : "Salvează și continuă"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  )
}
