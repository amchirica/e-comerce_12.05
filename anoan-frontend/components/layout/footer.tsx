import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">Magazinul lui NOA</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Descoperiți colecția noastră premium de produse pentru bebeluși și copii, concepute pentru a aduce bucurie
              și confort în viața familiei dumneavoastră.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">Magazin</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                  Toate Produsele
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                  Categorii
                </Link>
              </li>
              <li>
                <Link href="/products/best-sellers" className="text-sm text-muted-foreground hover:text-foreground">
                  Cele mai vândute
                </Link>
              </li>
              <li>
                <Link href="/products/new-arrivals" className="text-sm text-muted-foreground hover:text-foreground">
                  Noutăți
                </Link>
              </li>
              <li>
                <Link href="/products/sale" className="text-sm text-muted-foreground hover:text-foreground">
                  Reduceri
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">Companie</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  Întrebări Frecvente
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Abonați-vă la newsletter-ul nostru pentru a primi actualizări și oferte exclusive.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row lg:flex-col gap-2">
              <Input type="email" placeholder="Adresa dvs. de email" className="flex-1" required />
              <Button type="submit" className="shrink-0">
                Abonare
              </Button>
            </form>
            <div className="mt-6 space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">anoan.business@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">0733262911</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">Iasi, Strada Veche, nr. 95A</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Magazinul lui NOA. Toate drepturile rezervate.
          </p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <img src="/visa.png" alt="Visa" className="h-8" />
            <img src="/mastercard.png" alt="Mastercard" className="h-8" />
            <img src="/paypal.png" alt="PayPal" className="h-8" />
            <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer"><img src="/anpc.png" alt="ANPC" className="h-8" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
