"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"

interface CartItemComponentProps {
  item: CartItem
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  if (!item.product) return null

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
        <Image
          src={item.product.images[0] || "/placeholder.svg?height=80&width=80"}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2">{item.product.name}</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
          <span>Size: {item.size}</span>
          <span>•</span>
          <span>Color: {item.color}</span>
        </div>
        <p className="font-semibold mt-2">{formatPrice(item.product.price)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={handleRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
