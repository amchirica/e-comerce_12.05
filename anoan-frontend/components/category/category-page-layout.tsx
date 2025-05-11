import type { ReactNode } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { ChevronRight } from "lucide-react"

interface CategoryPageLayoutProps {
  title: string
  description: string
  categorySlug: string
  categoryName: string
  children: ReactNode
}

export function CategoryPageLayout({
  title,
  description,
  categorySlug,
  categoryName,
  children,
}: CategoryPageLayoutProps) {
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
            <Link href="/categories" className="text-muted-foreground hover:text-foreground">
              Categorii
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{categoryName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 sm:p-8 rounded-lg mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h1>
          <p className="text-base sm:text-lg">{description}</p>
        </div>

        {children}
      </div>
    </MainLayout>
  )
}
