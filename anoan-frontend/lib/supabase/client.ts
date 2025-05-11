import { createClient } from "@supabase/supabase-js"

// Aceste valori ar trebui să fie în variabile de mediu într-un proiect real
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Funcții helper pentru autentificare
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabaseClient.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data, error } = await supabaseClient.auth.getUser()
  return { user: data.user, error }
}

export const updateUserProfile = async (userId: string, profile: any) => {
  const { data, error } = await supabaseClient.from("profiles").update(profile).eq("id", userId)

  return { data, error }
}

export const createUserProfile = async (userId: string, profile: any) => {
  const { data, error } = await supabaseClient.from("profiles").insert([{ id: userId, ...profile }])

  return { data, error }
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabaseClient.from("profiles").select("*").eq("id", userId).single()

  return { profile: data, error }
}
