'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ProductCard } from './ProductCard'
import { GridProduct } from '@/lib/products'

interface ProductGridProps {
  products: GridProduct[]
  onProductClick: (product: GridProduct, element: HTMLElement) => void
  gridRef: React.RefObject<HTMLDivElement>
}

export const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ products, onProductClick, gridRef }, ref) => {
    const productRefs = useRef<(HTMLDivElement | null)[]>([])

    // Intro animation on mount
    useEffect(() => {
      const productElements = productRefs.current.filter((el) => el !== null)
      
      const timeline = gsap.timeline()
      
      gsap.set(productElements, {
        scale: 0.5,
        opacity: 0,
      })

      timeline.to(productElements, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: { amount: 1.2, from: 'random' },
      })

      return () => {
        timeline.kill()
      }
    }, [])

    // Organize products into columns (12 columns, 5 rows)
    const columns: GridProduct[][] = []
    for (let col = 0; col < 12; col++) {
      columns[col] = products.slice(col * 5, (col + 1) * 5)
    }

    return (
      <div
        ref={gridRef}
        className="grid"
        style={{
          position: 'absolute',
          display: 'flex',
          gap: '5vw',
          cursor: 'grab',
        }}
      >
        {columns.map((column, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className="column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5vw',
              marginTop: colIndex % 2 === 1 ? '10vw' : '0',
            }}
          >
            {column.map((product, rowIndex) => {
              const index = colIndex * 5 + rowIndex
              return (
                <ProductCard
                  key={product.gridId}
                  ref={(el) => {
                    if (el) productRefs.current[index] = el
                  }}
                  gridId={product.gridId}
                  image={product.image}
                  onClick={() => {
                    const element = productRefs.current[index]
                    if (element) {
                      onProductClick(product, element)
                    }
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  }
)

ProductGrid.displayName = 'ProductGrid'
