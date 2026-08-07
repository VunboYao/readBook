import cover from '@/assets/img/cover_01.jpeg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { fetchGoodPriceAction, fetchHighScoreAction } from '@/store/home'
import { HomeSectionV1 } from './components/home-section-v1'
import { isEmpty } from '@/utils'

export function Component() {
  const dispatch = useDispatch<AppDispatch>()
  const goodPrice = useSelector((state: RootState) => state.home.goodPrice)
  const highScore = useSelector((state: RootState) => state.home.highScore)

  useEffect(() => {
    dispatch(fetchGoodPriceAction())
    dispatch(fetchHighScoreAction())
  }, [dispatch])

  return (
    <div>
      <div className="w-full h-132.25 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${cover})` }}></div>
      <div className="w-300 mx-auto">
        {!isEmpty(goodPrice) && <HomeSectionV1 initData={goodPrice} />}
        {!isEmpty(highScore) && <HomeSectionV1 initData={highScore} />}
      </div>
    </div>
  )
}
