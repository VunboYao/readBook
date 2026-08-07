import { RoomCard } from '@/components/RoomCard'
import type { IHomeSectionItem } from '@/api/home'
import { memo } from 'react'


/** 房源网格：只负责布局编排，卡片视觉交给 RoomCard */
export const SectionRooms = memo(({ roomList = [] }: { roomList?: IHomeSectionItem[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 xl:grid-cols-5">
      {roomList.map((item) => (
        <RoomCard key={item.id} item={item} />
      ))}
    </div>
  )
})
