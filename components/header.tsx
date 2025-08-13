"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, User, X, Euro } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { UserButton, useUser, SignInButton } from "@clerk/nextjs"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const { getTotalItems } = useCart()
  const { isSignedIn, isLoaded } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const totalItems = getTotalItems()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: "Men's Shoes", href: "/products?category=shoes" },
    { name: "Men's Clothing", href: "/products?category=clothing" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Sale", href: "/products?sale=true" },
  ]

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Euro className="h-8 w-8 text-blue-800" />
              <span className="font-bold text-xl font-sans text-blue-800">Stride & Style</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Euro className="h-8 w-8 text-blue-800" />
            <span className="font-bold text-lg font-sans text-blue-800">Stride & Style</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on mobile */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* User Account */}
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8",
                      },
                    }}
                  />
                ) : (
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </SignInButton>
                )}
              </>
            )}

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile menu header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center space-x-2">
                      <Euro className="h-8 w-8 text-blue-800" />
                      <span className="font-bold text-xl font-sans text-blue-800">Stride & Style</span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-lg font-medium transition-colors hover:text-primary py-2 border-b border-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    {/* Mobile-specific links */}
                    <div className="mt-8 pt-6 border-t space-y-4">
                      <Link
                        href="/search"
                        className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Search className="h-5 w-5" />
                        <span>Search</span>
                      </Link>

                      {isLoaded && (
                        <>
                          {isSignedIn ? (
                            <Link
                              href="/dashboard"
                              className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary py-2"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <User className="h-5 w-5" />
                              <span>Dashboard</span>
                            </Link>
                          ) : (
                            <SignInButton mode="modal">
                              <button className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary py-2 text-left w-full">
                                <User className="h-5 w-5" />
                                <span>Sign In</span>
                              </button>
                            </SignInButton>
                          )}
                        </>
                      )}
                    </div>
                  </nav>

                  {/* Mobile menu footer */}
                  <div className="p-6 border-t bg-gray-50">
                    <p className="text-sm text-gray-600 text-center">Premium shoes & men's clothing</p>
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
