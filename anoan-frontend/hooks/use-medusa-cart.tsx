"use client"

import { useState, useEffect, useCallback } from "react"
import { medusaClient } from "@/lib/medusa/client"

export function useMedusaCart() {
  const [cartId, setCartId] = useState<string | null>(null)
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Inițializează sau încarcă coșul existent
  const initCart = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Verifică dacă există un ID de coș în localStorage
      const existingCartId = localStorage.getItem("medusa_cart_id")

      if (existingCartId) {
        // Încearcă să încarce coșul existent
        try {
          const { cart } = await medusaClient.carts.retrieve(existingCartId)
          setCart(cart)
          setCartId(existingCartId)
        } catch (err) {
          // Dacă coșul nu mai există, creează unul nou
          const { cart } = await medusaClient.carts.create({})
          setCart(cart)
          setCartId(cart.id)
          localStorage.setItem("medusa_cart_id", cart.id)
        }
      } else {
        // Creează un coș nou
        const { cart } = await medusaClient.carts.create({})
        setCart(cart)
        setCartId(cart.id)
        localStorage.setItem("medusa_cart_id", cart.id)
      }
    } catch (err) {
      setError("Eroare la inițializarea coșului")
      console.error("Eroare la inițializarea coșului:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Adaugă un produs în coș
  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      if (!cartId) {
        await initCart()
      }

      setLoading(true)
      setError(null)

      try {
        const { cart } = await medusaClient.carts.lineItems.create(cartId!, {
          variant_id: variantId,
          quantity,
        })
        setCart(cart)
        return cart
      } catch (err) {
        setError("Eroare la adăugarea produsului în coș")
        console.error("Eroare la adăugarea produsului în coș:", err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [cartId, initCart],
  )

  // Actualizează cantitatea unui produs din coș
  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return null

      setLoading(true)
      setError(null)

      try {
        const { cart } = await medusaClient.carts.lineItems.update(cartId, lineId, {
          quantity,
        })
        setCart(cart)
        return cart
      } catch (err) {
        setError("Eroare la actualizarea produsului din coș")
        console.error("Eroare la actualizarea produsului din coș:", err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [cartId],
  )

  // Șterge un produs din coș
  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return null

      setLoading(true)
      setError(null)

      try {
        const { cart } = await medusaClient.carts.lineItems.delete(cartId, lineId)
        setCart(cart)
        return cart
      } catch (err) {
        setError("Eroare la ștergerea produsului din coș")
        console.error("Eroare la ștergerea produsului din coș:", err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [cartId],
  )

  // Golește coșul
  const clearCart = useCallback(async () => {
    if (!cartId) return

    setLoading(true)
    setError(null)

    try {
      // Medusa nu are o metodă directă pentru a goli coșul,
      // așa că vom șterge fiecare element individual
      const promises = cart.items.map((item: any) => removeItem(item.id))
      await Promise.all(promises)
    } catch (err) {
      setError("Eroare la golirea coșului")
      console.error("Eroare la golirea coșului:", err)
    } finally {
      setLoading(false)
    }
  }, [cartId, cart, removeItem])

  // Completează coșul pentru checkout
  const completeCart = useCallback(async () => {
    if (!cartId) return null

    setLoading(true)
    setError(null)

    try {
      const { cart } = await medusaClient.carts.complete(cartId)
      setCart(null)
      setCartId(null)
      localStorage.removeItem("medusa_cart_id")
      return cart
    } catch (err) {
      setError("Eroare la finalizarea comenzii")
      console.error("Eroare la finalizarea comenzii:", err)
      return null
    } finally {
      setLoading(false)
    }
  }, [cartId])

  // Inițializează coșul la încărcarea paginii
  useEffect(() => {
    initCart()
  }, [initCart])

  return {
    cart,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    completeCart,
    items: cart?.items || [],
    cartTotal: cart?.total || 0,
  }
}
