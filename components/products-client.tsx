"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/types"
import ProductCard from "./product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductsClientProps {
  initialProducts: Product[]
  initialCategory: string
  initialSort: string
}

function sortProducts(products: Product[], sort: string): Product[] {
  const sortedProducts = [...products]

  switch (sort) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price)
    case "name":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    case "newest":
    default:
      return sortedProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
}

export default function ProductsClient({ initialProducts, initialCategory, initialSort }: ProductsClientProps) {
  const [products, setProducts] = useState(initialProducts)
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState(initialSort)

  useEffect(() => {
    const sortedProducts = sortProducts(initialProducts, sort)
    setProducts(sortedProducts)
  }, [initialProducts, sort])

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    // Update URL without page reload
    const url = new URL(window.location.href)
    if (newCategory === "all") {
      url.searchParams.delete("category")
    } else {
      url.searchParams.set("category", newCategory)
    }
    window.history.pushState({}, "", url.toString())

    // In a real app, you'd refetch data here or use the router
    window.location.href = url.toString()
  }

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
    const sortedProducts = sortProducts(products, newSort)
    setProducts(sortedProducts)

    // Update URL
    const url = new URL(window.location.href)
    if (newSort === "newest") {
      url.searchParams.delete("sort")
    } else {
      url.searchParams.set("sort", newSort)
    }
    window.history.pushState({}, "", url.toString())
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Showing {products.length} products</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">No products found</h2>
          <p className="text-muted-foreground">Try adjusting your filters or check back later for new products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
