'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ProductCard } from './ProductCard'
import { ProductDetails } from './ProductDetails'
import { products } from '@/lib/products'
import { Product } from '@/lib/types'

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (gridRef.current && titleRef.current) {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
      )

      // Stagger product cards
      const cards = gridRef.current.querySelectorAll('[class*="group"]')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: 'power2.out',
        }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Product Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center opacity-0"
          >
            Explore Our{' '}
            <span className="text-primary">Collection</span>
          </h1>
          
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Sidebar */}
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
