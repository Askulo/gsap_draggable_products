'use client'

import React from 'react'

interface ProductCardProps {
  gridId: string
  image: string
  onClick: () => void
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ gridId, image, onClick }, ref) => {
    return (
      <div
        ref={ref}
        className="product cursor-pointer"
        onClick={onClick}
        style={{
          position: 'relative',
          width: '18.5vw',
          aspectRatio: '1 / 1',
        }}
      >
        <div
          data-id={gridId}
          style={{
            width: '18.5vw',
            aspectRatio: '1 / 1',
          }}
        >
          <img
            src={image}
            alt={`Product ${gridId}`}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    )
  }
)

ProductCard.displayName = 'ProductCard'
