'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
      )
    }
  }, [])

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-background via-background to-transparent py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl font-bold text-foreground mb-4 opacity-0"
        >
          Draggable{' '}
          <span className="text-primary">Products</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto opacity-0"
        >
          Drag items around to explore our collection. Click on any product to view details.
        </p>
      </div>
    </header>
  )
}
