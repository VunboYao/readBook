import type { IHomeSectionItem } from "@/api/home"
import { memo } from "react"

export const LongForItem = memo(({ item }: { item: IHomeSectionItem }) => {
  return (
    <div className="w-[20%] shrink-0">
      <div className="p-2">
        {/* aspect 固定占位，避免图片加载前后高度跳变 */}
        <div className="relative aspect-3/4 overflow-hidden rounded-sm">
          <img
            className="absolute inset-0 size-full object-cover"
            src={item.picture_url}
            alt={item.name}
          />
          <div className="absolute right-0 bottom-0 left-0 h-[60%] bg-linear-to-b from-transparent from-3% to-black" />
          <div className="absolute right-2 bottom-0 left-2 flex flex-col items-center justify-center px-6 pb-8 text-white">
            <span className="text-sm font-semibold text-white">{item.city}</span>
            <span className="mt-1.5 text-sm text-white">{item.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
})