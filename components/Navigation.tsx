'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Navigation() {
  const navRef = useRef<HTMLNavElement>(null)

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GP</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">GSAP Products</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-foreground transition-colors">
              Search
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                  d="M4.16 6.693L12 1l7.84 5.693M4.16 6.693L12 13l7.84-6.307M4.16 6.693v10.614L12 24l7.84-6.693V6.693"
                />
              </svg>
              <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
