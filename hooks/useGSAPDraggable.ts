'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

interface UseDraggableProps {
  gridRef: React.RefObject<HTMLDivElement>
  containerRef: React.RefObject<HTMLDivElement>
}

export function useGSAPDraggable({ gridRef, containerRef }: UseDraggableProps) {
  const draggableRef = useRef<InstanceType<typeof Draggable> | null>(null)

  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return

    const grid = gridRef.current
    const container = containerRef.current

    const gridWidth = grid.offsetWidth
    const gridHeight = grid.offsetHeight
    const windowWidth = container.offsetWidth
    const windowHeight = container.offsetHeight

    draggableRef.current = Draggable.create(grid, {
      type: 'x,y',
      bounds: {
        minX: -(gridWidth - windowWidth) - 200,
        maxX: 200,
        minY: -(gridHeight - windowHeight) - 100,
        maxY: 100,
      },
      inertia: true,
      allowEventDefault: true,
      edgeResistance: 0.9,
    })[0]

    // Wheel scroll handling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const deltaX = -e.deltaX * 7
      const deltaY = -e.deltaY * 7

      const currentX = gsap.getProperty(grid, 'x') as number
      const currentY = gsap.getProperty(grid, 'y') as number

      const newX = currentX + deltaX
      const newY = currentY + deltaY

      const bounds = draggableRef.current?.vars?.bounds as any
      const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, newX))
      const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, newY))

      gsap.to(grid, {
        x: clampedX,
        y: clampedY,
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      draggableRef.current?.kill()
    }
  }, [gridRef, containerRef])

  return draggableRef
}
