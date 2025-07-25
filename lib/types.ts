export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: "shoes" | "clothing"
  subcategory: string
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  user_id: string
  quantity: number
  size: string
  color: string
  created_at: string
  product?: Product
}

export interface User {
  id: string
  clerk_id: string
  email: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  size: string
  color: string
}
