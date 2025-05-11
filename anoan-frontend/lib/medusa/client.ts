import Medusa from "@medusajs/medusa-js"

// Inițializăm clientul Medusa
export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
})

// Funcție pentru a obține toate produsele
export async function getProducts(params = {}) {
  try {
    const { products } = await medusaClient.products.list(params)
    return products
  } catch (error) {
    console.error("Eroare la obținerea produselor:", error)
    return []
  }
}

// Funcție pentru a obține un produs după ID
export async function getProductById(id: string) {
  try {
    const { product } = await medusaClient.products.retrieve(id)
    return product
  } catch (error) {
    console.error(`Eroare la obținerea produsului cu ID ${id}:`, error)
    return null
  }
}

// Funcție pentru a obține toate categoriile
export async function getCategories() {
  try {
    const { product_collections } = await medusaClient.collections.list()
    return product_collections
  } catch (error) {
    console.error("Eroare la obținerea categoriilor:", error)
    return []
  }
}

// Funcție pentru a obține produsele dintr-o categorie
export async function getProductsByCategory(categoryId: string) {
  try {
    const { products } = await medusaClient.products.list({
      collection_id: [categoryId],
    })
    return products
  } catch (error) {
    console.error(`Eroare la obținerea produselor din categoria ${categoryId}:`, error)
    return []
  }
}
