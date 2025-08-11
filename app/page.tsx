import Link from "next/link"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import { getFeaturedProducts } from "@/lib/products"
import { isSupabaseConfigured } from "@/lib/supabase"

export default async function HomePage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen">
        <HeroSection />
        <div className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Database Setup Required</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Please run the database setup scripts to see featured products.
            </p>
            <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
              <p className="text-left text-sm text-gray-400">
                1. Run the SQL scripts in the /scripts folder
                <br />
                2. Make sure your Supabase integration is properly configured
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Shop by Category</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find exactly what you are looking for in our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link href="/products?category=shoes">
              <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4">Premium Shoes</h3>
                    <p className="text-amber-100 text-lg">Step up your style game</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=clothing">
              <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4">Men's Clothing</h3>
                    <p className="text-slate-300 text-lg">Elevate your wardrobe</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
