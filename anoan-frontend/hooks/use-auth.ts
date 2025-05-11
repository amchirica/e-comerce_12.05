import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: async () => {
        try {
          await fetch("/api/logout", { method: "POST" })
        } catch (error) {
          console.error("Logout error:", error)
        } finally {
          set({ user: null, isLoading: false })
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
) 