'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductDetails } from '@/components/ProductDetails'
import { generateGridProducts, GridProduct, products } from '@/lib/products'
import { useGSAPDraggable } from '@/hooks/useGSAPDraggable'
import { useGSAPFlip } from '@/hooks/useGSAPFlip'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const [gridProducts] = useState<GridProduct[]>(generateGridProducts())
  const [selectedProduct, setSelectedProduct] = useState<GridProduct | null>(null)
  const [productElements, setProductElements] = useState<HTMLElement[]>([])

  const { flipProduct, reverseFlip } = useGSAPFlip()
  useGSAPDraggable({ gridRef, containerRef })

  // Setup product elements observation
  useEffect(() => {
    if (!gridRef.current) return
    const products = Array.from(gridRef.current.querySelectorAll('.product'))
    setProductElements(products as HTMLElement[])
  }, [])

  // Intersection observer for fade in/out
  useIntersectionObserver({
    elements: productElements,
    threshold: 0.1,
    excludeElement: null,
  })

  // Center grid on mount
  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return

    const grid = gridRef.current
    const container = containerRef.current

    const centerGrid = () => {
      const gridWidth = grid.offsetWidth
      const gridHeight = grid.offsetHeight
      const windowWidth = container.offsetWidth
      const windowHeight = container.offsetHeight

      const centerX = (windowWidth - gridWidth) / 2
      const centerY = (windowHeight - gridHeight) / 2

      gsap.set(grid, {
        x: centerX,
        y: centerY,
      })
    }

    centerGrid()

    // Handle details panel position
    if (detailsRef.current) {
      gsap.set(detailsRef.current, {
        x: window.innerWidth + 50,
      })
    }
  }, [])

  const handleProductClick = (product: GridProduct, element: HTMLElement) => {
    setSelectedProduct(product)
    
    // Animate container shift
    gsap.to(containerRef.current, {
      x: '-50vw',
      duration: 1.2,
      ease: 'power3.inOut',
    })

    // Animate details panel slide in
    gsap.to(detailsRef.current, {
      x: '50vw',
      duration: 1.2,
      ease: 'power3.inOut',
    })

    // Flip product animation
    if (thumbRef.current) {
      flipProduct(element, thumbRef.current)

      // Animate text in
      gsap.from('.details_texts', {
        y: 200,
        opacity: 0,
        duration: 1.1,
        delay: 0.4,
        ease: 'power3.out',
      })
    }
  }

  const handleDetailsClose = () => {
    if (!selectedProduct) return

    setSelectedProduct(null)

    // Animate container back
    gsap.to(containerRef.current, {
      x: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    })

    // Animate details panel out
    gsap.to(detailsRef.current, {
      x: window.innerWidth + 50,
      duration: 1.2,
      ease: 'power3.inOut',
    })

    // Reverse flip animation
    reverseFlip()
  }

  const handleGridClick = () => {
    if (selectedProduct) {
      handleDetailsClose()
    }
  }

  return (
    <div
      ref={containerRef}
      className="container"
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
      onClick={handleGridClick}
    >
      <ProductGrid
        ref={gridRef}
        products={gridProducts}
        onProductClick={handleProductClick}
        gridRef={gridRef}
      />

      <ProductDetails
        ref={detailsRef}
        product={selectedProduct}
        detailsRef={detailsRef}
        thumbRef={thumbRef}
        onClose={handleDetailsClose}
      />
    </div>
  )
}
