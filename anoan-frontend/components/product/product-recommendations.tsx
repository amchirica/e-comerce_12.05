import { ProductCard } from "@/components/product/product-card"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  image: string
  slug: string
  category?: string
  isNew?: boolean
  isSale?: boolean
}

interface ProductRecommendationsProps {
  title: string
  products: Product[]
  className?: string
}

export function ProductRecommendations({ title, products, className }: ProductRecommendationsProps) {
  return (
    <section className={cn("", className)}>
      <h2 className="text-2xl font-bold tracking-tight mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
