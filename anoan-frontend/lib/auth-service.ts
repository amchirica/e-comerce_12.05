// Serviciu simplu de autentificare folosind localStorage
export interface AdminCredentials {
  username: string
  password: string
}

const ADMIN_CREDENTIALS: AdminCredentials = {
  username: "admin",
  password: "abcd12!!",
}

const AUTH_KEY = "admin_auth"

export const authService = {
  login: (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, username }))
      return true
    }
    return false
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY)
  },

  isAuthenticated: (): boolean => {
    const auth = localStorage.getItem(AUTH_KEY)
    if (!auth) return false

    try {
      const authData = JSON.parse(auth)
      return authData.isAuthenticated === true
    } catch {
      return false
    }
  },

  getUsername: (): string | null => {
    const auth = localStorage.getItem(AUTH_KEY)
    if (!auth) return null

    try {
      const authData = JSON.parse(auth)
      return authData.username || null
    } catch {
      return null
    }
  },
}
