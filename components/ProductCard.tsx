'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { useGSAPFlip } from '@/hooks/useGSAPFlip'
import { useGSAPDraggable } from '@/hooks/useGSAPDraggable'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAPFlip(cardRef)
  useGSAPDraggable(cardRef)

  const handleClick = () => {
    onSelect(product)
  }

  return (
    <div
      ref={cardRef}
      className="group relative cursor-grab active:cursor-grabbing touch-none hover:z-20"
      onClick={handleClick}
    >
      <div
        ref={imageRef}
        className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 shadow-md group-hover:shadow-2xl"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick view badge */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-white/95 backdrop-blur-sm text-foreground py-2 rounded-lg font-semibold hover:bg-white transition-colors">
            Quick View
          </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
        <div className="flex items-baseline justify-between">
          <p className="text-base font-bold text-accent">{product.price}</p>
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Drag or click
          </span>
        </div>
      </div>
    </div>
  )
}
