import { Suspense } from "react"
import ProductsClient from "@/components/products-client"
import ProductsLoading from "@/components/products-loading"
import { getAllProducts, getProductsByCategory } from "@/lib/products"

interface ProductsPageProps {
  searchParams: {
    category?: string
    sort?: string
    page?: string
  }
}

async function getProducts(category?: string) {
  if (category && category !== "all") {
    return await getProductsByCategory(category)
  }
  return await getAllProducts()
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams.category || "all"
  const sort = searchParams.sort || "newest"

  const products = await getProducts(category)

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductsLoading />}>
        <ProductsClient initialProducts={products} initialCategory={category} initialSort={sort} />
      </Suspense>
    </div>
  )
}

export const metadata = {
  title: "All Products - Stride & Style",
  description:
    "Browse our complete collection of premium shoes and men's clothing. Find the perfect style for every occasion.",
}
