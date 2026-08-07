import ArrowLeft from "@/assets/svg/arrowLeft"
import ArrowRight from "@/assets/svg/arrowRight"
import { Children, memo, useEffect, useRef, useState, type ReactNode } from "react"

type ScrollViewProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
  /** 子项内容/尺寸变化时传入，用于重新测量（勿传每次渲染都变的引用） */
  deps?: unknown
}

export const ScrollView = memo(({ children, className = "", contentClassName = "", deps }: ScrollViewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [posIndex, setPosIndex] = useState(0)

  const totalDistanceRef = useRef(0)
  const childCount = Children.count(children)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    totalDistanceRef.current = el.scrollWidth - el.clientWidth
    el.style.transform = "translateX(0)"
    setPosIndex(0)
    setShowLeft(false)
    setShowRight(totalDistanceRef.current > 0)
  }, [childCount])

  const handleScroll = (direction: number) => {
    const el = scrollRef.current
    if (!el) return

    const nextIndex = posIndex + direction
    if (nextIndex < 0 || nextIndex >= childCount) return

    const nextEl = el.children[nextIndex] as HTMLElement
    const nextElLeft = nextEl.offsetLeft
    el.style.transform = `translateX(-${nextElLeft}px)`

    setPosIndex(nextIndex)
    setShowRight(totalDistanceRef.current > nextElLeft)
    setShowLeft(nextElLeft > 0)
  }

  return (
    <div className={`relative ${className}`}>
      {showLeft && (
        <button
          className="absolute flex items-center justify-center cursor-pointer w-7 h-7 rounded-full border-2 border-solid border-white box-shadow top-1/2 -translate-y-1/2 -left-1 z-9 bg-gray-100"
          onClick={() => handleScroll(-1)}
        >
          <ArrowLeft />
        </button>
      )}

      {showRight && (
        <button
          className="absolute flex items-center justify-center cursor-pointer w-7 h-7 rounded-full border-2 border-solid border-white box-shadow top-1/2 -translate-y-1/2 -right-1 z-9 bg-gray-100"
          onClick={() => handleScroll(1)}
        >
          <ArrowRight />
        </button>
      )}

      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className={`relative flex transition-all duration-300 ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
})
