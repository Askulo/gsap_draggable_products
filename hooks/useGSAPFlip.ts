import { useEffect } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

export function useGSAPFlip(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    let state = Flip.getState(element)

    const handleMouseEnter = () => {
      Flip.to(state, {
        duration: 0.4,
        ease: 'power2.out',
      })
      state = Flip.getState(element)

      gsap.to(element, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])
}
