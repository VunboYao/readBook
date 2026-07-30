import { useEffect, useState, type RefObject } from "react"

type Target = HTMLElement|Window|null
export default function useScrollPosition(targetRef?: RefObject<HTMLElement|null>) {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const el: Target = targetRef?.current || window
        if (!el) return

        let raf = 0
        const read = () => {
            if (el instanceof Window) {
                setPosition({ x: window.scrollX, y: window.scrollY })
            } else {
                setPosition({ x: el.scrollLeft, y: el.scrollTop })
            }
        }
        const handleScroll = () => {
           if (raf) return
           raf = requestAnimationFrame(() => {
            raf = 0
            read()
           })
        }

        read()
        el.addEventListener('scroll', handleScroll, {passive: true})
        return () => {
            el.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(raf)
        }
    }, [targetRef])

    return position
}