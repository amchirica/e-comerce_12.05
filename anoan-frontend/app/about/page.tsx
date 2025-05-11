import Link from "next/link"
import Image from "next/image"
import { MainLayout } from "@/components/layout/main-layout"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
            <span className="font-medium">Despre Noi</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="bg-gradient-to-r from-pink-500 to-violet-500 text-white p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Despre Noi</h1>
          <p className="text-lg">
            Aflați povestea noastră și misiunea noastră de a oferi produse de calitate pentru bebeluși, copii și
            mămici.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Magazinul lui NOA" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Povestea Noastră
            </h2>
            <p className="mb-4 text-gray-700">
              Magazinul lui NOA a fost înființat în 2024 din dorința de a oferi părinților produse de calitate pentru copiii lor.
              Fiind părinți noi, fondatorii noștri au observat lipsa produselor de calitate la prețuri accesibile pe
              piața din România.
            </p>
            <p className="mb-4 text-gray-700">
              Am început ca un mic magazin online, dar am crescut rapid datorită feedback-ului pozitiv și loialității
              clienților noștri. Astăzi, suntem mândri să oferim o gamă largă de produse pentru bebeluși, copii și
              mămici, toate selectate cu grijă pentru a asigura calitate și siguranță.
            </p>
            <p className="text-gray-700">
              Misiunea noastră este să facem viața părinților mai ușoară, oferind produse de calitate, servicii
              excepționale și sfaturi utile pentru îngrijirea și dezvoltarea copiilor.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Valorile Noastre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calitate</h3>
              <p className="text-gray-600">
                Selectăm cu grijă fiecare produs pentru a asigura cele mai înalte standarde de calitate și siguranță.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accesibilitate</h3>
              <p className="text-gray-600">
                Credem că produsele de calitate ar trebui să fie accesibile tuturor părinților, indiferent de buget.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Suport</h3>
              <p className="text-gray-600">
                Oferim asistență și suport pentru clienții noștri în fiecare etapă a procesului de cumpărare și după
                aceea. Suntem mereu disponibili pentru a răspunde întrebărilor și a oferi sfaturi.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Echipa Noastră
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Fondator"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Ioana</h3>
              <p className="text-gray-500 mb-2">Fondator & CEO</p>
              <p className="text-gray-600 text-sm">
                Mamă, Ioana a fondat Magazinul lui NOA din dorința de a oferi produse de calitate pentru toți copiii.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Co-fondator"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Andrei</h3>
              <p className="text-gray-500 mb-2">Co-fondator & Director Operațional</p>
              <p className="text-gray-600 text-sm">
                Cu o experiență de peste 10 ani în servicii, Andrei se asigură că toate operațiunile funcționează perfect.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Contactați-ne
          </h2>
          <p className="text-center mb-6 text-gray-700">
            Suntem aici pentru a vă ajuta. Nu ezitați să ne contactați pentru orice întrebare sau nelămurire.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
                Contactați-ne
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Înapoi la pagina principală
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
