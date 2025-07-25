import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative h-[100vh] sm:h-[90vh] md:h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Premium men's fashion and shoes arranged on wooden floor"
          fill
          className="object-cover object-center sm:object-center md:object-center"
          priority
          quality={100}
          sizes="100vw"
        />

        {/* Lighter overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 sm:bg-gradient-to-r sm:from-black/30 sm:via-black/15 sm:to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 sm:from-black/25 sm:to-black/15" />

        {/* Lighter content background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full sm:max-w-4xl sm:h-auto mx-auto px-4 py-8 sm:py-16 bg-black/15 sm:bg-black/10 backdrop-blur-[1px] sm:backdrop-blur-[0.5px] sm:rounded-lg flex items-center" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Enhanced text shadows for readability */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-shadow-xl">
            <span className="block text-blue-100 mb-1 sm:mb-2 font-sans drop-shadow-lg">Step </span>
            <span className="block bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
              Into Style
            </span>
          </h1>

          {/* Enhanced subtitle with better shadow */}
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-100 font-light leading-relaxed max-w-xs sm:max-w-3xl mx-auto px-2 sm:px-0 drop-shadow-lg">
            <span className="block sm:inline">Discover premium shoes</span>
            <span className="block sm:inline"> and men's clothing</span>
            <span className="block sm:inline"> that define your stride</span>
          </p>

          {/* Mobile-optimized buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center pt-4 sm:pt-6 w-full max-w-sm sm:max-w-none mx-auto">
            <Link href="/products?category=shoes" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-auto bg-orange-600 text-black hover:bg-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold rounded-lg  hover:text-white "
              >
                Shop Shoes
              </Button>
            </Link>

            <Link href="/products?category=clothing" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold backdrop-blur-sm rounded-lg"
              >
                Shop Clothing
              </Button>
            </Link>
          </div>

          {/* Mobile-specific features indicator */}
          <div className="flex justify-center items-center gap-4 pt-6 sm:pt-8 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-optimized scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile navigation hint */}
      <div className="absolute top-20 right-4 z-10 sm:hidden">
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-2 text-white text-xs animate-pulse">
          <span>☰</span>
        </div>
      </div>
    </section>
  )
}
