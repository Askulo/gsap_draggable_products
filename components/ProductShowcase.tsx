'use client'

import { ProductGrid } from './ProductGrid'
import { Header } from './Header'
import { Navigation } from './Navigation'

export function ProductShowcase() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <ProductGrid />
    </div>
  )
}
