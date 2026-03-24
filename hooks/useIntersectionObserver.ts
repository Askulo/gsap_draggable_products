'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface UseIntersectionObserverProps {
  elements: HTMLElement[]
  threshold?: number
  excludeElement?: HTMLElement | null
}

export function useIntersectionObserver({
  elements,
  threshold = 0.1,
  excludeElement,
}: UseIntersectionObserverProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!elements || elements.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === excludeElement) return

          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
            })
          } else {
            gsap.to(entry.target, {
              opacity: 0,
              scale: 0.8,
              duration: 0.6,
              ease: 'power2.in',
            })
          }
        })
      },
      { root: null, threshold }
    )

    elements.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [elements, threshold, excludeElement])

  return observerRef
}
