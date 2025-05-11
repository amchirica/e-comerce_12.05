import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { ChevronRight } from "lucide-react"

export default function TermsPage() {
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
            <span className="font-medium">Termeni și Condiții</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh] force-black-text">
        <div className="bg-gradient-to-r from-pink-500 to-violet-500 text-white p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Termeni și Condiții</h1>
          <p className="text-lg">
            Vă rugăm să citiți cu atenție termenii și condițiile înainte de a utiliza site-ul nostru.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              1. Acceptarea Termenilor
            </h2>
            <p className="mb-4">
              Prin accesarea și utilizarea site-ului Magazinul lui NOA, acceptați să respectați acești termeni și condiții de
              utilizare. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați site-ul
              nostru.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              2. Utilizarea Site-ului
            </h2>
            <p className="mb-4">
              Sunteți responsabil pentru menținerea confidențialității contului și parolei dvs. și pentru
              restricționarea accesului la computer. Sunteți de acord să acceptați responsabilitatea pentru toate
              activitățile care au loc sub contul sau parola dvs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              3. Produse și Prețuri
            </h2>
            <p className="mb-4">
              Ne rezervăm dreptul de a modifica prețurile produselor în orice moment. Toate prețurile afișate pe site
              includ TVA. Ne străduim să oferim informații exacte despre produse, dar nu garantăm că descrierile
              produselor sau alte conținuturi ale site-ului sunt 100% exacte, complete, fiabile, actuale sau fără erori.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              4. Comenzi și Livrare
            </h2>
            <p className="mb-4">
              După plasarea unei comenzi, veți primi un e-mail de confirmare cu detaliile comenzii. Livrarea se face
              prin curier în toată România. Timpul de livrare poate varia în funcție de adresa de livrare și
              disponibilitatea produselor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              5. Returnări și Rambursări
            </h2>
            <p className="mb-4">
              Aveți dreptul de a returna produsele în termen de 14 zile de la primire, fără a specifica motivul.
              Produsele trebuie să fie în starea lor originală, nefolosite și cu toate etichetele atașate. Costul
              returnării este suportat de client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              6. Confidențialitate
            </h2>
            <p className="mb-4">
              Informațiile personale furnizate de dvs. vor fi utilizate conform Politicii noastre de Confidențialitate.
              Prin utilizarea site-ului nostru, sunteți de acord cu colectarea și utilizarea informațiilor dvs. conform
              descrierii din Politica de Confidențialitate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              7. Modificări ale Termenilor
            </h2>
            <p className="mb-4">
              Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Modificările vor intra în
              vigoare imediat după publicarea lor pe site. Este responsabilitatea dvs. să verificați periodic acești
              termeni pentru a vă asigura că sunteți la curent cu modificările.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              8. Contact
            </h2>
            <p className="mb-4">
              Pentru orice întrebări sau nelămuriri legate de acești termeni și condiții, vă rugăm să ne contactați la:
              <br />
              Email: anoan.business@gmail.com
              <br />
              Telefon: 0733262911
              <br />
              Adresa: Iasi, Strada Veche, nr. 95A
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Înapoi la pagina principală</Button>
          </Link>
        </div>
      </main>
    </MainLayout>
  )
}
