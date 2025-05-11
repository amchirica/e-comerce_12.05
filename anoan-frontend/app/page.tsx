import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Package, Truck, CreditCard, Clock } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-muted pt-32 py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <Badge className="mb-2">Colecție Nouă</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Magazinul lui NOA
              </h1>
              <p className="text-xl text-muted-foreground">
                Tot ce ai nevoie pentru tine și bebelușul tău: hainuțe, jucării, scutece și produse de îngrijire de calitate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">Cumpără Acum</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/categories">Explorează Categoriile</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-lg">
              <Image
                src="/noa.png?height=800&width=800"
                alt="Hero image"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Cumpărați după categorie</h2>
              <p className="mt-2 text-muted-foreground">
                Răsfoiți colecția noastră de produse pentru bebeluși și copii
              </p>
            </div>
            <Link
              href="/categories"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Vezi toate categoriile
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Categories will be mapped here from API data */}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Produse recomandate</h2>
              <p className="mt-2 text-muted-foreground">Descoperiți selecția noastră de produse pentru bebeluși și copii</p>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Vezi toate produsele
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured products will be mapped here from API data */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Livrare Rapidă</h3>
                <p className="text-sm text-muted-foreground">Livrare în toată țara în 1-3 zile lucrătoare</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Livrare Gratuită</h3>
                <p className="text-sm text-muted-foreground">Pentru comenzi peste 200 lei</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Plată Sigură</h3>
                <p className="text-sm text-muted-foreground">Plăți securizate prin card sau ramburs</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Suport 24/7</h3>
                <p className="text-sm text-muted-foreground">Asistență tehnică și suport pentru clienți</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
