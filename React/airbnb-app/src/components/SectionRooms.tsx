import { RoomCard, type RoomItem } from '@/components/RoomCard'

/** 房源网格：只负责布局编排，卡片视觉交给 RoomCard */
export function SectionRooms({ roomList = [] }: { roomList?: RoomItem[] }) {
  return (
    <div className="grid grid-cols-4 gap-4 xl:grid-cols-5">
      {roomList.map((item) => (
        <RoomCard key={item.id} item={item} />
      ))}
    </div>
  )
}
