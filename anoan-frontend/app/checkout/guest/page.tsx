"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, ChevronRight, CreditCard, Truck, ArrowLeft } from "lucide-react"

// Tipul pentru un produs din coș
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function GuestCheckoutPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [saveInfo, setSaveInfo] = useState(false)
  const [email, setEmail] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Simulăm încărcarea produselor din coș
  useEffect(() => {
    // În mod normal, am încărca datele din localStorage sau din API
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        name: "Body bebe din bumbac organic",
        price: 79.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 5,
        name: "Lampă de veghe cu proiecție stele",
        price: 119.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ]
    setCartItems(mockCartItems)
  }, [])

  // Calculăm totalul coșului
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 499 ? 0 : 19.99
  const total = subtotal + shipping

  // Funcție pentru validarea formularului
  const validateForm = (formData: FormData) => {
    const errors: Record<string, string> = {}

    // Validare email
    const emailValue = formData.get("email") as string
    if (!emailValue) {
      errors.email = "Emailul este obligatoriu"
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      errors.email = "Adresa de email nu este validă"
    }

    // Validare nume
    const nameValue = formData.get("name") as string
    if (!nameValue) {
      errors.name = "Numele este obligatoriu"
    }

    // Validare telefon
    const phoneValue = formData.get("phone") as string
    if (!phoneValue) {
      errors.phone = "Telefonul este obligatoriu"
    }

    // Validare adresă
    const addressValue = formData.get("address") as string
    if (!addressValue) {
      errors.address = "Adresa este obligatorie"
    }

    // Validare oraș
    const cityValue = formData.get("city") as string
    if (!cityValue) {
      errors.city = "Orașul este obligatoriu"
    }

    // Validare județ
    const countyValue = formData.get("county") as string
    if (!countyValue) {
      errors.county = "Județul este obligatoriu"
    }

    return errors
  }

  // Funcție pentru procesarea comenzii
  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const errors = validateForm(formData)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsLoading(false)
      return
    }

    // Simulăm procesarea comenzii
    setTimeout(() => {
      toast({
        title: "Comandă plasată cu succes!",
        description: "Vei primi un email cu detaliile comenzii tale.",
      })

      // Redirecționăm către pagina de confirmare
      router.push("/checkout/success")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold">Magazinul lui NOA</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="font-medium text-white hover:text-pink-100">
              Acasă
            </Link>
            <Link href="/products" className="font-medium text-white hover:text-pink-100">
              Produse
            </Link>
            <Link href="/categories" className="font-medium text-white hover:text-pink-100">
              Categorii
            </Link>
            <Link href="/contact" className="font-medium text-white hover:text-pink-100">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Checkout Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary">
            Acasă
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/cart" className="hover:text-primary">
            Coș
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-primary font-medium">Finalizare comandă</span>
        </div>

        <div className="flex items-center mb-6">
          <Link href="/cart" className="flex items-center text-gray-500 hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi la coș
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Finalizare comandă
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Informații de contact</CardTitle>
                  <CardDescription>Introduceți datele dvs. de contact pentru această comandă</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nume@exemplu.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nume complet</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nume și prenume"
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Număr de telefon"
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Adresa de livrare</CardTitle>
                  <CardDescription>Introduceți adresa unde doriți să primiți comanda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresă</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Strada, număr, bloc, apartament"
                      className={formErrors.address ? "border-red-500" : ""}
                    />
                    {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Oraș</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Oraș"
                        className={formErrors.city ? "border-red-500" : ""}
                      />
                      {formErrors.city && <p className="text-red-500 text-xs">{formErrors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="county">Județ</Label>
                      <Input
                        id="county"
                        name="county"
                        placeholder="Județ"
                        className={formErrors.county ? "border-red-500" : ""}
                      />
                      {formErrors.county && <p className="text-red-500 text-xs">{formErrors.county}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Cod poștal (opțional)</Label>
                    <Input id="postalCode" name="postalCode" placeholder="Cod poștal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Note comandă (opțional)</Label>
                    <Input id="notes" name="notes" placeholder="Instrucțiuni speciale pentru livrare" />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Metodă de plată</CardTitle>
                  <CardDescription>Alegeți metoda preferată de plată</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Card de credit/debit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="cursor-pointer">
                        Plată la livrare
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Număr card</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Data expirării</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex items-center space-x-2 mb-6">
                <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(!!checked)} />
                <Label htmlFor="saveInfo" className="text-sm">
                  Salvează aceste informații pentru comenzi viitoare
                </Label>
              </div>

              <div className="flex justify-between items-center">
                <Link href="/cart">
                  <Button variant="outline" type="button">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Înapoi la coș
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none hover:from-pink-600 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Se procesează..." : "Plasează comanda"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Sumar comandă</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded overflow-hidden mr-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Cantitate: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">{(item.price * item.quantity).toFixed(2)} RON</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" /> Transport
                    </span>
                    <span>{shipping === 0 ? "Gratuit" : `${shipping.toFixed(2)} RON`}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(2)} RON</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>* Prețurile includ TVA</p>
                  <p>* Livrare gratuită pentru comenzi peste 499 RON</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Magazinul lui NOA</h3>
              <p className="text-gray-400">
                Magazin online cu produse pentru bebeluși și copii de calitate la prețuri competitive. Livrare rapidă în
                toată țara.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Link-uri Rapide</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Acasă
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white">
                    Produse
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-400 hover:text-white">
                    Categorii
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                <p>Strada Exemplu, Nr. 123</p>
                <p>București, România</p>
                <p className="mt-2">Email: contact@Magazinul lui NOA.ro</p>
                <p>Telefon: 0712345678</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Magazinul lui NOA. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
