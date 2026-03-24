'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/types'
import gsap from 'gsap'

interface ProductDetailsProps {
  product: Product | null
  onClose: () => void
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return

    if (product) {
      // Animate panel in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'auto',
      })
      gsap.to(panelRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    } else {
      // Animate panel out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none',
      })
      gsap.to(panelRef.current, {
        x: 512,
        duration: 0.4,
        ease: 'power2.in',
      })
    }
  }, [product])

  if (!product) return null

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 opacity-0 pointer-events-none z-40"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        ref={panelRef}
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white/95 backdrop-blur-sm shadow-2xl z-50 overflow-y-auto transform translate-x-full"
      >
        <div className="p-6 space-y-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Product Image */}
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mt-6">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-accent">
                {product.price}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.details}
            </p>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6">
              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Add to Cart
              </button>
              <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
