"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useMedusaCart } from "@/hooks/use-medusa-cart"

type MedusaCartContextType = ReturnType<typeof useMedusaCart>

const MedusaCartContext = createContext<MedusaCartContextType | undefined>(undefined)

export function MedusaCartProvider({ children }: { children: ReactNode }) {
  const cart = useMedusaCart()

  return <MedusaCartContext.Provider value={cart}>{children}</MedusaCartContext.Provider>
}

export function useMedusaCartContext() {
  const context = useContext(MedusaCartContext)
  if (context === undefined) {
    throw new Error("useMedusaCartContext must be used within a MedusaCartProvider")
  }
  return context
}
