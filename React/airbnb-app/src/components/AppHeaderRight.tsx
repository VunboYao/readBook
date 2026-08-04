import Avatar from "@/assets/svg/avatar"
import Global from "@/assets/svg/global"
import Menu from "@/assets/svg/menu"
import { useEffect, useRef, useState } from "react"
import styles from "./AppHeaderRight.module.css"

export default function AppHeaderRight() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    function handleClick(e: MouseEvent) {
      const el = menuRef.current
      if (el && !el.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [isMenuOpen])


  return (
    <div className="flex items-center">
      <span className="cursor-pointer px-3.75 py-3 hover:bg-[#f5f5f5] rounded-[22px]">登录</span>
      <span className="cursor-pointer px-3.75 py-3 hover:bg-[#f5f5f5] rounded-[22px]">注册</span>
      <span className="cursor-pointer px-3.75 py-3 hover:bg-[#f5f5f5] rounded-[22px]"><Global /></span>
      <div className="box-shadow flex items-center w-20 h-10 border border-solid rounded-3xl border-[#ccc] cursor-pointer justify-evenly relative mr-6"
        ref={menuRef}
        onClick={() => {
          setIsMenuOpen((prev) => !prev)
        }}
      >
        <Menu />
        <Avatar />

        {
          isMenuOpen && (
            <div className="absolute top-13 w-60 right-0 text-[#666] bg-white rounded-lg shadow-md">
              <div className="border-b border-solid border-[#ddd]">
                <button className={styles.items}>登录</button>
                <button className={styles.items}>注册</button>
              </div>
              <div className="py-2.5">
                <button className={styles.items}>我的账户</button>
                <button className={styles.items}>我的订单</button>
                <button className={styles.items}>我的收藏</button>
                <button className={styles.items}>我的消息</button>
                <button className={styles.items}>我的评价</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}