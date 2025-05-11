import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { ChevronRight } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "Care sunt metodele de plată acceptate?",
      answer:
        "Acceptăm plata cu cardul (Visa, Mastercard), plata prin transfer bancar și plata ramburs la livrare. Pentru comenzile online, puteți plăti în siguranță folosind sistemul nostru securizat de procesare a plăților.",
    },
    {
      question: "Cât durează livrarea?",
      answer:
        "Livrarea durează în general între 1-3 zile lucrătoare pentru localitățile urbane și 2-5 zile lucrătoare pentru localitățile rurale. Timpul exact de livrare depinde de adresa de livrare și de disponibilitatea produselor.",
    },
    {
      question: "Cum pot returna un produs?",
      answer:
        "Puteți returna produsele în termen de 14 zile de la primire. Pentru a iniția un retur, vă rugăm să ne contactați prin e-mail la anoan.business@gmail.com sau prin telefon la 0733262911. Produsele trebuie să fie în starea lor originală, nefolosite și cu toate etichetele atașate.",
    },
    {
      question: "Oferiți garanție pentru produse?",
      answer:
        "Da, toate produsele noastre beneficiază de garanția legală de conformitate de 2 ani. Pentru anumite produse, producătorii pot oferi garanții extinse. Detaliile despre garanție sunt specificate în descrierea fiecărui produs.",
    },
    {
      question: "Cum pot urmări comanda mea?",
      answer:
        "După plasarea comenzii, veți primi un e-mail de confirmare cu un număr de comandă. Puteți urmări statusul comenzii dvs. logându-vă în contul dvs. de pe site-ul nostru sau contactându-ne direct cu numărul comenzii.",
    },
    {
      question: "Livrați și în afara României?",
      answer:
        "În prezent, livrăm doar pe teritoriul României. Lucrăm la extinderea serviciilor noastre de livrare și în alte țări. Vă rugăm să ne contactați pentru informații suplimentare dacă doriți o livrare internațională.",
    },
    {
      question: "Pot modifica sau anula o comandă după ce a fost plasată?",
      answer:
        "Puteți modifica sau anula o comandă în primele 24 de ore după plasare, cu condiția ca aceasta să nu fi intrat deja în procesul de expediere. Pentru a modifica sau anula o comandă, vă rugăm să ne contactați cât mai curând posibil.",
    },
    {
      question: "Cum pot crea un cont pe site-ul vostru?",
      answer:
        "Puteți crea un cont accesând butonul 'Contul meu' din partea de sus a paginii și selectând opțiunea 'Înregistrare'. Va trebui să completați un formular cu informațiile dvs. personale și să alegeți o parolă. După înregistrare, veți putea accesa istoricul comenzilor și veți putea salva adresele de livrare pentru comenzi viitoare.",
    },
    {
      question: "Ce fac dacă am primit un produs defect?",
      answer:
        "Dacă ați primit un produs defect, vă rugăm să ne contactați în termen de 48 de ore de la primirea coletului. Vă rugăm să includeți fotografii ale produsului defect și o descriere a problemei. Vom aranja înlocuirea produsului sau rambursarea banilor, în funcție de preferințele dvs.",
    },
    {
      question: "Oferiți reduceri pentru comenzi mari?",
      answer:
        "Da, oferim reduceri pentru comenzi care depășesc anumite sume. De asemenea, organizăm periodic promoții și oferte speciale. Vă recomandăm să vă abonați la newsletter-ul nostru pentru a fi la curent cu toate ofertele și reducerile.",
    },
  ]

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
            <span className="font-medium">Întrebări Frecvente</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh] force-black-text">
        <div className="bg-gradient-to-r from-pink-500 to-violet-500 text-white p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Întrebări Frecvente</h1>
          <p className="text-lg">
            Găsiți răspunsuri la cele mai frecvente întrebări despre produsele, comenzile și serviciile noastre.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Nu ați găsit răspunsul la întrebarea dvs.?
          </h2>
          <p className="mb-6">
            Contactați-ne direct și vă vom răspunde cât mai curând posibil. Suntem aici pentru a vă ajuta!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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
      </main>
    </MainLayout>
  )
}
