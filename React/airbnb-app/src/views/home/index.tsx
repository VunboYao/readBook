import cover from '@/assets/img/cover_01.jpeg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { fetchGoodPriceAction } from '@/store/home'
import { SectionHeader } from '@/components/SectionHeader'
import { SectionRooms } from '@/components/SectionRooms'

export function Component() {
  const dispatch = useDispatch<AppDispatch>()
  const goodPrice = useSelector((state: RootState) => state.home.goodPrice)

  useEffect(() => {
    dispatch(fetchGoodPriceAction())
  }, [dispatch])

  return (
    <div>
      <div className="w-full h-132.25 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${cover})` }}></div>
      <div className="w-300 mx-auto">
        <div className="mt-7.5">
          <SectionHeader title={goodPrice.title} />
          <SectionRooms roomList={goodPrice.list} />
        </div>
      </div>
    </div>
  )
}
