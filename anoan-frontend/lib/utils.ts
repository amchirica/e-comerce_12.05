import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number,
  options: {
    currency?: string
    notation?: Intl.NumberFormatOptions["notation"]
  } = {},
) {
  const { currency = "RON", notation = "standard" } = options

  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency,
    notation,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}
