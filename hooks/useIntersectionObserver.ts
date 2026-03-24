import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useIntersectionObserver(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    ScrollTrigger.create({
      trigger: element,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      },
      onEnterBack: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      },
      onLeave: () => {
        gsap.to(element, {
          opacity: 0.5,
          y: 20,
          duration: 0.4,
          ease: 'power2.in',
          overwrite: 'auto',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [ref])
}
