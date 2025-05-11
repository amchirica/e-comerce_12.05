"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, CreditCard, ShieldCheck, Truck } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, cartTotal, clearCart } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [saveInfo, setSaveInfo] = useState(false)

  const shipping = cartTotal > 499 ? 0 : 19.99
  const total = cartTotal + shipping

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Comandă plasată cu succes!",
        description: "Vă mulțumim pentru achiziție. Comanda dvs. este în curs de procesare.",
      })
      clearCart()
      router.push("/checkout/success")
    }, 1500)
  }

  if (items.length === 0) {
    return null
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
            <Link href="/cart" className="text-muted-foreground hover:text-foreground">
              Coș
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Finalizare comandă</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Finalizare comandă</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Informații de contact</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Prenume</Label>
                        <Input id="first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Nume</Label>
                        <Input id="last-name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Adresa de livrare</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresă</Label>
                      <Input id="address" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apartament, suite, etc. (opțional)</Label>
                      <Input id="apartment" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Oraș</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Județ</Label>
                        <Select required>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Selectează" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="is">Iași</SelectItem>
                            <SelectItem value="b">București</SelectItem>
                            <SelectItem value="cj">Cluj</SelectItem>
                            <SelectItem value="ct">Constanța</SelectItem>
                            <SelectItem value="tm">Timiș</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Cod poștal</Label>
                        <Input id="zip" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Țară</Label>
                      <Select defaultValue="ro" required>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Selectează" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ro">România</SelectItem>
                          <SelectItem value="md">Moldova</SelectItem>
                          <SelectItem value="hu">Ungaria</SelectItem>
                          <SelectItem value="bg">Bulgaria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Note comandă (opțional)</Label>
                      <Textarea id="notes" placeholder="Instrucțiuni speciale pentru livrare" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Metodă de plată</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex flex-1 items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <span>Card de credit / debit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Image src="/public/visa.png" alt="Visa" width={32} height={20} />
                          <Image src="/public/mastercard.png" alt="Mastercard" width={32} height={20} />
                          <Image src="/public/paypal.png" alt="PayPal" width={32} height={20} />
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                      <Label
                        htmlFor="cash-on-delivery"
                        className="flex flex-1 items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <span>Plata la destinație</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex flex-1 items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span>PayPal</span>
                        </div>
                        <Image src="/payment/paypal.svg" alt="PayPal" width={64} height={20} />
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "credit-card" && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Număr card</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Data expirării</Label>
                          <Input id="expiry" placeholder="LL/AA" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Nume pe card</Label>
                        <Input id="name-on-card" required />
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center space-x-2">
                    <Checkbox id="save-info" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(!!checked)} />
                    <Label htmlFor="save-info" className="text-sm cursor-pointer">
                      Salvează informațiile pentru o finalizare mai rapidă data viitoare
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="rounded-lg border shadow-sm sticky top-24">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Sumar comandă</h2>
                  <div className="space-y-4">
                    <Accordion type="single" collapsible defaultValue="items">
                      <AccordionItem value="items" className="border-none">
                        <AccordionTrigger className="py-2">
                          {items.length} {items.length === 1 ? "produs" : "produse"} în coș
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 py-2">
                            {items.map((item) => (
                              <div key={item.id} className="flex gap-3">
                                <div className="relative aspect-square h-16 w-16 min-w-[4rem] overflow-hidden rounded-md bg-muted">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex flex-1 flex-col justify-center">
                                  <div className="flex justify-between">
                                    <div>
                                      <div className="font-medium line-clamp-1">{item.name}</div>
                                      <div className="text-sm text-muted-foreground">Cantitate: {item.quantity}</div>
                                    </div>
                                    <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Livrare</span>
                        <span>{shipping === 0 ? "Gratuită" : formatPrice(shipping)}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Plată securizată prin Stripe</span>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Se procesează..." : "Plasează comanda"}
                    </Button>
                    <div className="text-center">
                      <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground">
                        Înapoi la coș
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}
