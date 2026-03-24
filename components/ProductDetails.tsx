'use client'

import React, { useState } from 'react'
import { Product } from '@/lib/products'

interface ProductDetailsProps {
  product: Product | null
  detailsRef: React.RefObject<HTMLDivElement>
  thumbRef: React.RefObject<HTMLDivElement>
  onClose: () => void
}

export const ProductDetails = React.forwardRef<HTMLDivElement, ProductDetailsProps>(
  ({ product, detailsRef, thumbRef, onClose }, ref) => {
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (delta: number) => {
      setQuantity((prev) => Math.max(1, prev + delta))
    }

    return (
      <div
        ref={detailsRef}
        className="details"
        onClick={(e) => {
          if (e.target === detailsRef.current) {
            onClose()
          }
        }}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 0,
          left: 0,
          width: '50vw',
          height: '100vh',
          padding: '2vw 0.5vw',
          backgroundColor: '#ccc8c8',
          transform: 'translate3d(50vw, 0, 0)',
        }}
      >
        <div className="details_info"></div>
        <div
          className="details_body"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2vw',
            paddingTop: '5em',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          <div
            ref={thumbRef}
            className="details_thumb"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1',
              zIndex: 3,
              willChange: 'transform',
            }}
          ></div>

          <div
            className="details_texts"
            style={{
              maxWidth: '15rem',
              position: 'relative',
              zIndex: 3,
              marginBottom: '5vh',
            }}
          >
            <h1
              className="details_title"
              style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              {product?.title || 'Product'}
            </h1>
            <p
              style={{
                marginBottom: '1rem',
                lineHeight: '1.5',
              }}
            >
              {product?.description}
            </p>
            <p
              className="details_price"
              style={{
                fontSize: '1.5rem',
                fontWeight: 500,
                color: '#4CAF50',
                marginBottom: '1.5rem',
              }}
            >
              $ {product?.price.toFixed(2) || '0.00'}
            </p>

            <div
              className="details_quantity"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <button
                className="quantity-btn minus"
                onClick={() => handleQuantityChange(-1)}
                style={{
                  backgroundColor: '#e0e0e0',
                  border: 'none',
                  padding: '0.2rem 0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s',
                }}
              >
                -
              </button>
              <span
                className="quantity-display"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                {quantity}
              </span>
              <button
                className="quantity-btn plus"
                onClick={() => handleQuantityChange(1)}
                style={{
                  backgroundColor: '#e0e0e0',
                  border: 'none',
                  padding: '0.2rem 0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s',
                }}
              >
                +
              </button>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => {
                console.log(`Added ${quantity} of ${product?.title} to cart`)
              }}
              style={{
                backgroundColor: '#2a2a2a',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                fontSize: '1.2rem',
                cursor: 'pointer',
                borderRadius: '5px',
                marginTop: '1rem',
                transition: 'background-color 0.3s',
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
)

ProductDetails.displayName = 'ProductDetails'
