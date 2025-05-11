"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface AccountData {
  name: string
  email: string
  phone: string
}

export default function AccountPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading, logout } = useAuth()
  const [formData, setFormData] = useState<AccountData>({
    name: "",
    email: "",
    phone: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch("/api/account")
        if (!response.ok) throw new Error("Failed to fetch account data")
        const data = await response.json()
        setFormData(data)
      } catch (error) {
        toast({
          title: "Eroare",
          description: "Nu am putut încărca datele contului. Vă rugăm să încercați din nou.",
          variant: "destructive",
        })
      }
    }

    if (user) {
      fetchAccountData()
    }
  }, [user, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch("/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update account")

      toast({
        title: "Succes",
        description: "Datele contului au fost actualizate cu succes.",
      })
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut actualiza datele contului. Vă rugăm să încercați din nou.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/login")
    toast({
      title: "Succes",
      description: "V-ați deconectat cu succes.",
    })
  }

  if (isLoading || !user) {
    return null
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <div className="hidden md:block">
            <Card>
            <CardHeader>
              <CardTitle>Contul meu</CardTitle>
                <CardDescription>Gestionează contul și comenzile tale</CardDescription>
            </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                    </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Comenzi
                    </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorite
                  </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Setări
                  </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Deconectare
                  </Button>
              </CardContent>
            </Card>
          </div>

            {/* Main Content */}
          <div className="space-y-6">
                  <Card>
                    <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>Actualizează informațiile contului tău</CardDescription>
                    </CardHeader>
                    <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                            <Label htmlFor="name">Nume complet</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                          </div>
                    <div>
                            <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                          </div>
                    <div>
                            <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                          </div>
                        </div>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Se salvează..." : "Salvează modificările"}
                  </Button>
                </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                <CardTitle>Schimbă parola</CardTitle>
                <CardDescription>Actualizează parola contului tău</CardDescription>
                    </CardHeader>
                    <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Parola actuală</Label>
                    <Input id="current-password" type="password" />
                        </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Parola nouă</Label>
                    <Input id="new-password" type="password" />
                                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmă parola nouă</Label>
                    <Input id="confirm-password" type="password" />
                                    </div>
                  <Button>Schimbă parola</Button>
                                </div>
                              </CardContent>
                            </Card>
          </div>
        </div>
    </div>
    </MainLayout>
  )
}
