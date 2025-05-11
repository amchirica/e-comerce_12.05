import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GuestData {
  name: string
  email: string
  phone: string
}

interface GuestCheckoutState {
  guestData: GuestData | null
  setGuestData: (data: GuestData) => void
  clearGuestData: () => void
}

export const useGuestCheckout = create<GuestCheckoutState>()(
  persist(
    (set) => ({
      guestData: null,
      setGuestData: (data) => set({ guestData: data }),
      clearGuestData: () => set({ guestData: null }),
    }),
    {
      name: "guest-checkout",
    }
  )
) 