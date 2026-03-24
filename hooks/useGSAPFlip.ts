'use client'

import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

interface UseFlipProps {
  onFlipComplete?: () => void
}

export function useGSAPFlip({ onFlipComplete }: UseFlipProps = {}) {
  const stateRef = useRef<any>(null)
  const originalParentRef = useRef<HTMLElement | null>(null)
  const currentProductRef = useRef<HTMLElement | null>(null)

  const flipProduct = useCallback((product: HTMLElement, target: HTMLElement) => {
    currentProductRef.current = product
    originalParentRef.current = product.parentNode as HTMLElement

    stateRef.current = Flip.getState(product)
    target.appendChild(product)

    Flip.from(stateRef.current, {
      absolute: true,
      duration: 1.2,
      ease: 'power3.inOut',
      scale: true,
    })

    if (onFlipComplete) onFlipComplete()
  }, [onFlipComplete])

  const reverseFlip = useCallback(() => {
    if (!currentProductRef.current || !originalParentRef.current || !stateRef.current) {
      return
    }

    const state = Flip.getState(currentProductRef.current)
    originalParentRef.current.appendChild(currentProductRef.current)

    Flip.from(state, {
      absolute: true,
      duration: 1.2,
      ease: 'power3.inOut',
      scale: true,
      onStart: () => {
        currentProductRef.current!.style.visibility = 'visible'
      },
    })

    currentProductRef.current = null
    originalParentRef.current = null
    stateRef.current = null
  }, [])

  return {
    flipProduct,
    reverseFlip,
    currentProduct: currentProductRef,
  }
}
