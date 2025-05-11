"use server"

import { medusaClient } from "@/lib/medusa/client"

export async function createOrder(cartId: string, customerInfo: any) {
  try {
    // Adaugă informațiile clientului la coș
    await medusaClient.carts.update(cartId, {
      email: customerInfo.email,
      shipping_address: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        address_1: customerInfo.address,
        address_2: customerInfo.apartment || "",
        city: customerInfo.city,
        province: customerInfo.state,
        postal_code: customerInfo.zip,
        country_code: customerInfo.country,
        phone: customerInfo.phone,
      },
      billing_address: {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        address_1: customerInfo.address,
        address_2: customerInfo.apartment || "",
        city: customerInfo.city,
        province: customerInfo.state,
        postal_code: customerInfo.zip,
        country_code: customerInfo.country,
        phone: customerInfo.phone,
      },
    })

    // Completează coșul pentru a crea comanda
    const { cart } = await medusaClient.carts.complete(cartId)

    return {
      success: true,
      order: cart,
    }
  } catch (error) {
    console.error("Eroare la crearea comenzii:", error)
    return {
      success: false,
      error: "A apărut o eroare la procesarea comenzii.",
    }
  }
}
