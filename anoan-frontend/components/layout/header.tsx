"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, Menu, X, User } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"


const navigation = [
  { name: "Acasă", href: "/" },
  { name: "Produse", href: "/products" },
  { name: "Categorii", href: "/categories" },
  { name: "Despre Noi", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const { toggleCart, cartCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <img src="/noa.png" alt="Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold tracking-tight">Magazinul lui NOA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Caută produse..."
                className="w-full bg-background pl-8 sm:w-[120px] md:w-[180px] lg:w-[300px]"
              />
            </div>

            <ModeToggle />

            <Button variant="ghost" size="icon" aria-label="Cont" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" aria-label="Coș" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button + Cart */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Cart Button on Mobile */}
            <Button variant="ghost" size="icon" className="relative" aria-label="Coș" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Meniu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] sm:w-[300px] md:w-[350px]">
                <SheetTitle>Meniu</SheetTitle>
                <div className="flex flex-col h-full">
                  <nav className="flex flex-col space-y-4 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "text-base font-medium transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto space-y-4 border-t py-6">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Caută produse..." className="w-full pl-8" />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/account">
                          <User className="mr-2 h-4 w-4" />
                          Cont
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Link href="/cart" className="w-full">
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => {
                            toggleCart()
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Coș ({cartCount})
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2"
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            const html = document.documentElement;
                            if (html.classList.contains('dark')) {
                              html.classList.remove('dark');
                              localStorage.setItem('theme', 'light');
                            } else {
                              html.classList.add('dark');
                              localStorage.setItem('theme', 'dark');
                            }
                          }
                        }}
                      >
                        <span role="img" aria-label="Tema">🌗</span>
                        Schimbă tema
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
