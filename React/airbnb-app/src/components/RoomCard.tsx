import { Rating } from '@mui/material'
import type { IHomeSectionItem } from '@/api/home'
import { memo } from 'react'

/** 房源卡片：视觉样式关在组件内，动态色走 style + theme fallback */
export const RoomCard = memo(({ item }: { item: IHomeSectionItem }) => {
  const verifyColor = item.verify_info?.text_color ?? 'var(--color-verify)'

  return (
    <article>
      <div className="relative aspect-square cursor-pointer overflow-hidden rounded-xl">
        <img
          className="absolute inset-0 size-full object-cover transition-transform duration-300 hover:scale-110"
          src={item.picture_url}
          alt={item.name}
        />
      </div>
      <p
        className="my-2.5 ml-1.25 text-xs font-bold"
        style={{ color: verifyColor }}
      >
        {item.verify_info?.messages?.join(' · ')}
      </p>
      <h3 className="line-clamp-2 text-base font-bold">{item.name}</h3>
      <p className="my-2">{item.price_format}/晚</p>
      <div className="flex items-center text-xs font-semibold text-text">
        <Rating
          value={item.star_rating ?? 5}
          precision={0.1}
          readOnly
          sx={{ fontSize: '12px', color: 'var(--color-rating)', marginRight: '-1px' }}
        />
        <span className="mr-0.5 ml-1">{item.reviews_count}</span>
        {item.bottom_info?.content && (
          <span className="mx-0.5">{item.bottom_info.content}</span>
        )}
      </div>
    </article>
  )
})
