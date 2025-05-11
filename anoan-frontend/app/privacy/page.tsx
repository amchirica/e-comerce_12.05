import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { ChevronRight } from "lucide-react"

export default function PrivacyPage() {
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
            <span className="font-medium">Politica de Confidențialitate</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh] force-black-text">
        <div className="bg-gradient-to-r from-pink-500 to-violet-500 text-white p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Politica de Confidențialitate</h1>
          <p className="text-lg">
            Protejarea datelor dumneavoastră personale este o prioritate pentru noi. Vă rugăm să citiți cu atenție
            această politică de confidențialitate.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              1. Informații Colectate
            </h2>
            <p className="mb-4">
              Colectăm informații personale precum numele, adresa, adresa de e-mail, numărul de telefon și informații de
              plată atunci când plasați o comandă. De asemenea, colectăm automat informații despre dispozitivul dvs. și
              interacțiunea cu site-ul nostru.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              2. Utilizarea Informațiilor
            </h2>
            <p className="mb-4">
              Utilizăm informațiile colectate pentru a procesa comenzile, a gestiona contul dvs., a vă oferi asistență
              pentru clienți, a personaliza experiența dvs. de cumpărături și a vă trimite comunicări de marketing (dacă
              v-ați abonat).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              3. Partajarea Informațiilor
            </h2>
            <p className="mb-4">
              Nu vindem sau închiriem informațiile dvs. personale unor terțe părți. Putem partaja informațiile dvs. cu
              furnizorii de servicii care ne ajută să operăm site-ul și să procesăm comenzile (de exemplu, procesatori
              de plăți, servicii de livrare).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              4. Cookie-uri
            </h2>
            <p className="mb-4">
              Site-ul nostru utilizează cookie-uri pentru a îmbunătăți experiența dvs. de navigare. Puteți seta
              browserul dvs. să refuze toate cookie-urile sau să vă avertizeze când un cookie este trimis. Cu toate
              acestea, unele funcții ale site-ului nostru pot să nu funcționeze corect fără cookie-uri.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              5. Drepturile Dumneavoastră
            </h2>
            <p className="mb-4">
              Aveți dreptul de a accesa, corecta sau șterge informațiile personale pe care le deținem despre dvs. De
              asemenea, aveți dreptul de a restricționa sau de a vă opune prelucrării datelor dvs. personale și dreptul
              la portabilitatea datelor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              6. Securitatea Datelor
            </h2>
            <p className="mb-4">
              Implementăm măsuri de securitate adecvate pentru a proteja informațiile dvs. personale împotriva accesului
              neautorizat, modificării, dezvăluirii sau distrugerii.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              7. Modificări ale Politicii de Confidențialitate
            </h2>
            <p className="mb-4">
              Ne rezervăm dreptul de a modifica această politică de confidențialitate în orice moment. Modificările vor
              fi publicate pe această pagină și, dacă sunt semnificative, vă vom notifica prin e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              8. Contact
            </h2>
            <p className="mb-4">
              Pentru orice întrebări sau nelămuriri legate de această politică de confidențialitate sau de datele dvs.
              personale, vă rugăm să ne contactați la:
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
