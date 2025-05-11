import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-muted-foreground">Momentan nu există articole publicate.</p>
      </main>
      <Footer />
    </>
  )
} 