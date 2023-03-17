import { useEffect, useState } from 'react'

export default function useScrollY() {
  // state数据的初始化
  const [scrollY, setScrollY] = useState(0)

  // 副作用的封装
  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }
    // 监听滚动
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  // !只执行一次
  }, [])

  return scrollY
}
