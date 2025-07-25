"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { getProductUrl } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "")

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!selectedSize || !selectedColor) return

    setIsLoading(true)
    try {
      addItem(product, selectedSize, selectedColor, 1)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const productUrl = getProductUrl(product)

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
      <Link href={productUrl}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0] || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700 text-white">Featured</Badge>
          )}
          {product.stock < 50 && product.stock > 0 && (
            <Badge className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 text-white">Low Stock</Badge>
          )}
          {product.stock === 0 && (
            <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white">Out of Stock</Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-lg"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={productUrl}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-xl text-gray-900">{formatPrice(product.price)}</span>
          <Badge variant="secondary" className="text-xs capitalize">
            {product.subcategory}
          </Badge>
        </div>

        {product.sizes.length > 0 && (
          <div className="mb-3">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Size</label>
            <div className="flex gap-1 flex-wrap">
              {product.sizes.slice(0, 4).map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedSize(size)
                  }}
                >
                  {size}
                </Button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-xs text-muted-foreground self-center">+{product.sizes.length - 4} more</span>
              )}
            </div>
          </div>
        )}

        {product.colors.length > 0 && (
          <div className="mb-4">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Color</label>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedColor(color)
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground self-center ml-1">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>
        )}

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleAddToCart}
          disabled={isLoading || !selectedSize || !selectedColor || product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  )
}
