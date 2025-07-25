import { supabase, createServerClient } from "@/lib/supabase"
import type { Product } from "@/lib/types"

// Server-side product functions (for static generation and server components)
export async function getAllProducts(): Promise<Product[]> {
  const serverClient = createServerClient()

  const { data, error } = await serverClient.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) {
    console.error("Invalid UUID format:", id)
    return null
  }

  const serverClient = createServerClient()

  const { data, error } = await serverClient.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Extract UUID from slug using regex pattern
  // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const match = slug.match(uuidRegex)

  if (!match) {
    console.error("No valid UUID found in slug:", slug)
    return null
  }

  const id = match[0]
  return getProductById(id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const serverClient = createServerClient()

  const { data, error } = await serverClient
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products by category:", error)
    return []
  }

  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const serverClient = createServerClient()

  const { data, error } = await serverClient
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(8)

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return data || []
}

export async function getRelatedProducts(
  currentProductId: string,
  category: string,
  subcategory: string,
): Promise<Product[]> {
  const serverClient = createServerClient()

  // First try to get products from the same subcategory
  let { data, error } = await serverClient
    .from("products")
    .select("*")
    .eq("subcategory", subcategory)
    .neq("id", currentProductId)
    .limit(4)

  if (error) {
    console.error("Error fetching related products:", error)
    return []
  }

  // If we don't have enough products from the same subcategory, fill with products from the same category
  if (data && data.length < 4) {
    const { data: categoryData, error: categoryError } = await serverClient
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("id", currentProductId)
      .not("id", "in", `(${data.map((p) => p.id).join(",")})`)
      .limit(4 - data.length)

    if (!categoryError && categoryData) {
      data = [...data, ...categoryData]
    }
  }

  return data || []
}

export async function searchProducts(query: string): Promise<Product[]> {
  const serverClient = createServerClient()

  const { data, error } = await serverClient
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching products:", error)
    return []
  }

  return data || []
}

// Client-side product functions (for client components)
export async function getProductsClient(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getProductByIdClient(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

// Utility functions
export function generateProductSlug(product: Product): string {
  const nameSlug = product.name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens

  return `${nameSlug}-${product.id}`
}

export function getProductUrlFromSlug(slug: string): string {
  return `/products/${slug}`
}

export function getProductUrl(product: Product): string {
  const slug = generateProductSlug(product)
  return getProductUrlFromSlug(slug)
}
