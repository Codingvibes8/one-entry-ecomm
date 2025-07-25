import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stride & Style - Premium Shoes & Men's Clothing",
  description:
    "Discover premium shoes and men's clothing at Stride & Style. Shop the latest trends in footwear and fashion with fast shipping and secure checkout.",
  keywords: "shoes, men's clothing, fashion, footwear, style, premium, online shopping",
  authors: [{ name: "Stride & Style" }],
  creator: "Stride & Style",
  publisher: "Stride & Style",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stride-style.com",
    title: "Stride & Style - Premium Shoes & Men's Clothing",
    description: "Discover premium shoes and men's clothing at Stride & Style.",
    siteName: "Stride & Style",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stride & Style - Premium Shoes & Men's Clothing",
    description: "Discover premium shoes and men's clothing at Stride & Style.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey="pk_test_ZXhhY3QtbGVtdXItMzguY2xlcmsuYWNjb3VudHMuZGV2JA">
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
