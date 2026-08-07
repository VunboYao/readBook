import { RoomCard } from '@/components/RoomCard'
import type { IHomeSectionItem } from '@/api/home'
import { memo } from 'react'

const colsMap: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
}
type Cols = keyof typeof colsMap

/** 房源网格：只负责布局编排，卡片视觉交给 RoomCard */
export const SectionRooms = memo(({ roomList = [], cols = 4 }: { roomList?: IHomeSectionItem[], cols?: Cols }) => {
  const colsClass = colsMap[cols]

  return (
    <div className={`grid ${colsClass} gap-4 mt-5`}>
      {roomList.map((item) => (
        <RoomCard key={item.id} item={item} />
      ))}
    </div>
  )
})
