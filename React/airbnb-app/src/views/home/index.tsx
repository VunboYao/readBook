import cover from '@/assets/img/cover_01.jpeg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { fetchGoodPriceAction, fetchHighScoreAction, fetchHomeDiscountAction, fetchHomeRecommendAction, fetchHomePlansAction } from '@/store/home'
import { HomeSectionV1 } from './components/home-section-v1'
import { isEmpty } from '@/utils'
import { HomeSectionV2 } from './components/home-section-v2'
import { HomeSectionV3 } from './components/home-section-v3'

export function Component() {
  const dispatch = useDispatch<AppDispatch>()
  const goodPrice = useSelector((state: RootState) => state.home.goodPrice)
  const highScore = useSelector((state: RootState) => state.home.highScore)
  const homeDiscount = useSelector((state: RootState) => state.home.homeDiscount)
  const homeRecommend = useSelector((state: RootState) => state.home.homeRecommend)
  const homePlans = useSelector((state: RootState) => state.home.homePlans)

  useEffect(() => {
    dispatch(fetchGoodPriceAction())
    dispatch(fetchHighScoreAction())
    dispatch(fetchHomeDiscountAction())
    dispatch(fetchHomeRecommendAction())
    dispatch(fetchHomePlansAction())
  }, [dispatch])

  return (
    <div>
      <div className="w-full h-132.25 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${cover})` }}></div>
      <div className="w-258 mx-auto">
        {!isEmpty(homeDiscount) && <HomeSectionV2 initData={homeDiscount} />}
        {!isEmpty(goodPrice) && <HomeSectionV1 initData={goodPrice} />}
        {!isEmpty(highScore) && <HomeSectionV1 initData={highScore} />}
        {!isEmpty(homeRecommend) && <HomeSectionV2 initData={homeRecommend} />}
        {!isEmpty(homePlans) && <HomeSectionV3 initData={homePlans} />}
      </div>
    </div>
  )
}
