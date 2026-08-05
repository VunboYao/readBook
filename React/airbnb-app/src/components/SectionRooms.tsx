import { memo } from "react"
import { Rating } from '@mui/material'

export const SectionRooms = memo(({ roomList = [] }: { roomList: Record<string, any>[] }) => {
  return (
    <div className="grid xl:grid-cols-5 grid-cols-4 gap-4">
      {roomList.map((item) => (
        <div key={item.id}>
          <div className="pt-[100%] relative overflow-hidden rounded-xl cursor-pointer">
            <img className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110" src={item.picture_url} alt={item.name} />
          </div>
          <div className='my-2.5 ml-1.25 text-xs font-bold' style={{ color: item?.verify_info?.text_color || '#39576a' }}>{item?.verify_info?.messages?.join(' · ')}</div>
          <div className="text-base font-bold overflow-hidden text-ellipsis line-clamp-2">{item.name}</div>
          <div className="my-2">{item.price_format}/晚</div>
          <div className="flex items-center text-xs font-semibold text-[#484848]">
            <span className="flex items-center">
              <Rating value={item.star_rating ?? 5} precision={0.1} readOnly sx={{ fontSize: '12px', color: '#00848A', marginRight: '-1px' }} />
            </span>
            <span className="mr-0.5 ml-1">{item.reviews_count}</span>
            {item.bottom_info && <span className="mx-0.5">{item.bottom_info?.content}</span>}
          </div>
        </div>
      ))}
    </div>
  )
})