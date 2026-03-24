import { useEffect } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export function useGSAPDraggable(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return

    const draggable = Draggable.create(ref.current, {
      type: 'x,y',
      edgeResistance: 0.65,
      onDrag() {
        gsap.to(ref.current, {
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          duration: 0.1,
          overwrite: 'auto',
        })
      },
      onDragEnd() {
        gsap.to(ref.current, {
          boxShadow: 'none',
          duration: 0.3,
          overwrite: 'auto',
        })
      },
      inertia: true,
    })[0]

    return () => {
      draggable.kill()
    }
  }, [ref])
}
