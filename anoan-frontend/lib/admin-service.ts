// Serviciu pentru administrarea produselor și categoriilor
import { authService } from "./auth-service"

// Tipuri pentru produse și categorii
export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  categoryId: number
  image: string
  stock: number
  featured?: boolean
  createdAt: string
}

export interface Category {
  id: number
  name: string
  description: string
  slug: string
  productCount: number
}

// Categoriile pentru bebeluși și copii
const categories: Category[] = [
  {
    id: 1,
    name: "Îmbrăcăminte pentru bebeluși și copii",
    description: "Hăinuțe confortabile și adorabile pentru cei mici",
    slug: "imbracaminte-bebelusi-copii",
    productCount: 24,
  },
  {
    id: 2,
    name: "Jucării",
    description: "Jucării educative și distractive pentru toate vârstele",
    slug: "jucarii",
    productCount: 36,
  },
  {
    id: 3,
    name: "Produse de îngrijire",
    description: "Produse pentru îngrijirea delicată a pielii bebelușilor",
    slug: "produse-ingrijire",
    productCount: 18,
  },
  {
    id: 4,
    name: "Accesorii utile",
    description: "Accesorii practice pentru părinți și copii",
    slug: "accesorii-utile",
    productCount: 42,
  },
  {
    id: 5,
    name: "Decorațiuni pentru camera copilului",
    description: "Decorațiuni adorabile pentru camera bebelușului",
    slug: "decoratiuni-camera",
    productCount: 15,
  },
  {
    id: 6,
    name: "Produse pentru mămici",
    description: "Produse special concepute pentru nevoile mămicilor",
    slug: "produse-mamici",
    productCount: 27,
  },
  {
    id: 7,
    name: "Alte produse",
    description: "Diverse produse pentru bebeluși și copii",
    slug: "alte-produse",
    productCount: 19,
  },
]

// Produse pentru bebeluși și copii
const products: Product[] = [
  {
    id: 1,
    name: "Body bebe din bumbac organic",
    description: "Set de 3 body-uri pentru bebeluși, material 100% bumbac organic",
    price: 79.99,
    category: "Îmbrăcăminte pentru bebeluși și copii",
    categoryId: 1,
    image: "/placeholder.svg?height=200&width=200",
    stock: 50,
    featured: true,
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Jucărie educativă Montessori",
    description: "Jucărie din lemn pentru dezvoltarea abilităților motorii fine",
    price: 129.99,
    category: "Jucării",
    categoryId: 2,
    image: "/placeholder.svg?height=200&width=200",
    stock: 30,
    featured: true,
    createdAt: "2023-02-10",
  },
  {
    id: 3,
    name: "Set îngrijire bebeluș",
    description: "Include perie, pieptăn și foarfecă pentru îngrijirea bebelușului",
    price: 69.99,
    category: "Produse de îngrijire",
    categoryId: 3,
    image: "/placeholder.svg?height=200&width=200",
    stock: 25,
    createdAt: "2023-03-05",
  },
  {
    id: 4,
    name: "Pătură moale pentru bebeluși",
    description: "Pătură din material hipoalergenic și confortabil pentru bebeluși",
    price: 89.99,
    category: "Accesorii utile",
    categoryId: 4,
    image: "/placeholder.svg?height=200&width=200",
    stock: 40,
    createdAt: "2023-03-20",
  },
  {
    id: 5,
    name: "Lampă de veghe cu proiecție stele",
    description: "Lampă de veghe cu proiecție de stele pentru camera copilului",
    price: 119.99,
    category: "Decorațiuni pentru camera copilului",
    categoryId: 5,
    image: "/placeholder.svg?height=200&width=200",
    stock: 15,
    featured: true,
    createdAt: "2023-04-12",
  },
  {
    id: 6,
    name: "Geantă pentru mămici multifuncțională",
    description: "Geantă spațioasă cu multiple compartimente pentru toate necesitățile bebelușului",
    price: 149.99,
    category: "Produse pentru mămici",
    categoryId: 6,
    image: "/placeholder.svg?height=200&width=200",
    stock: 20,
    createdAt: "2023-05-08",
  },
  {
    id: 7,
    name: "Cărucior 3 în 1",
    description: "Cărucior multifuncțional 3 în 1 pentru bebeluși și copii mici",
    price: 1299.99,
    category: "Alte produse",
    categoryId: 7,
    image: "/placeholder.svg?height=200&width=200",
    stock: 10,
    featured: true,
    createdAt: "2023-06-15",
  },
  {
    id: 8,
    name: "Salopetă bebeluș din bumbac",
    description: "Salopetă confortabilă pentru bebeluși din bumbac moale",
    price: 99.99,
    category: "Îmbrăcăminte pentru bebeluși și copii",
    categoryId: 1,
    image: "/placeholder.svg?height=200&width=200",
    stock: 35,
    createdAt: "2023-07-20",
  },
]

// Serviciu pentru administrarea produselor și categoriilor
export const adminService = {
  // Funcții pentru produse
  getProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      if (authService.isAuthenticated()) {
        setTimeout(() => resolve(products), 500)
      } else {
        resolve([])
      }
    })
  },

  getProductById: (id: number): Promise<Product | null> => {
    return new Promise((resolve) => {
      if (authService.isAuthenticated()) {
        const product = products.find((p) => p.id === id) || null
        setTimeout(() => resolve(product), 300)
      } else {
        resolve(null)
      }
    })
  },

  addProduct: (product: Omit<Product, "id" | "createdAt">): Promise<Product> => {
    return new Promise((resolve) => {
      if (authService.isAuthenticated()) {
        const newProduct: Product = {
          ...product,
          id: Math.max(...products.map((p) => p.id)) + 1,
          createdAt: new Date().toISOString().split("T")[0],
        }
        products.push(newProduct)
        setTimeout(() => resolve(newProduct), 500)
      } else {
        throw new Error("Unauthorized")
      }
    })
  },

  updateProduct: (id: number, product: Partial<Product>): Promise<Product> => {
    return new Promise((resolve, reject) => {
      if (authService.isAuthenticated()) {
        const index = products.findIndex((p) => p.id === id)
        if (index !== -1) {
          products[index] = { ...products[index], ...product }
          setTimeout(() => resolve(products[index]), 500)
        } else {
          reject(new Error("Product not found"))
        }
      } else {
        reject(new Error("Unauthorized"))
      }
    })
  },

  deleteProduct: (id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (authService.isAuthenticated()) {
        const index = products.findIndex((p) => p.id === id)
        if (index !== -1) {
          products.splice(index, 1)
          setTimeout(() => resolve(true), 500)
        } else {
          reject(new Error("Product not found"))
        }
      } else {
        reject(new Error("Unauthorized"))
      }
    })
  },

  // Funcții pentru categorii
  getCategories: (): Promise<Category[]> => {
    return new Promise((resolve) => {
      if (authService.isAuthenticated()) {
        setTimeout(() => resolve(categories), 500)
      } else {
        resolve([])
      }
    })
  },

  getCategoryById: (id: number): Promise<Category | null> => {
    return new Promise((resolve) => {
      if (authService.isAuthenticated()) {
        const category = categories.find((c) => c.id === id) || null
        setTimeout(() => resolve(category), 300)
      } else {
        resolve(null)
      }
    })
  },

  addCategory: (category: Omit<Category, "id">): Promise<Category> => {
    return new Promise((resolve) => {
      if (authService.isAuthenticated()) {
        const newCategory: Category = {
          ...category,
          id: Math.max(...categories.map((c) => c.id)) + 1,
        }
        categories.push(newCategory)
        setTimeout(() => resolve(newCategory), 500)
      } else {
        throw new Error("Unauthorized")
      }
    })
  },

  updateCategory: (id: number, category: Partial<Category>): Promise<Category> => {
    return new Promise((resolve, reject) => {
      if (authService.isAuthenticated()) {
        const index = categories.findIndex((c) => c.id === id)
        if (index !== -1) {
          categories[index] = { ...categories[index], ...category }
          setTimeout(() => resolve(categories[index]), 500)
        } else {
          reject(new Error("Category not found"))
        }
      } else {
        reject(new Error("Unauthorized"))
      }
    })
  },

  deleteCategory: (id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (authService.isAuthenticated()) {
        const index = categories.findIndex((c) => c.id === id)
        if (index !== -1) {
          categories.splice(index, 1)
          setTimeout(() => resolve(true), 500)
        } else {
          reject(new Error("Category not found"))
        }
      } else {
        reject(new Error("Unauthorized"))
      }
    })
  },
}
