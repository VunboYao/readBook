import cover from '@/assets/img/cover_01.jpeg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import {
  fetchGoodPriceAction,
  fetchHighScoreAction,
  fetchHomeDiscountAction,
  fetchHomeRecommendAction,
  fetchHomePlansAction,
  fetchHomeLongforAction,
} from '@/store/home'
import { HomeSectionV1 } from './components/home-section-v1'
import { isEmpty } from '@/utils'
import { HomeSectionV2 } from './components/home-section-v2'
import { HomeSectionV3 } from './components/home-section-v3'
import { HomeLongFor } from './components/home-long-for'
import { HomeSectionSkeleton } from './components/home-section-skeleton'

export function Component() {
  const dispatch = useDispatch<AppDispatch>()
  const goodPrice = useSelector((state: RootState) => state.home.goodPrice)
  const highScore = useSelector((state: RootState) => state.home.highScore)
  const homeDiscount = useSelector((state: RootState) => state.home.homeDiscount)
  const homeRecommend = useSelector((state: RootState) => state.home.homeRecommend)
  const homePlans = useSelector((state: RootState) => state.home.homePlans)
  const homeLongfor = useSelector((state: RootState) => state.home.homeLongfor)

  useEffect(() => {
    dispatch(fetchGoodPriceAction())
    dispatch(fetchHighScoreAction())
    dispatch(fetchHomeDiscountAction())
    dispatch(fetchHomeRecommendAction())
    dispatch(fetchHomePlansAction())
    dispatch(fetchHomeLongforAction())
  }, [dispatch])

  return (
    <div>
      <div
        className="h-132.25 w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="mx-auto w-258">
        {!isEmpty(homeDiscount) ? (
          <HomeSectionV2 initData={homeDiscount} />
        ) : (
          <HomeSectionSkeleton cols={3} count={6} showTabs />
        )}
        {!isEmpty(homeRecommend) ? (
          <HomeSectionV2 initData={homeRecommend} />
        ) : (
          <HomeSectionSkeleton cols={3} count={6} showTabs />
        )}
        {!isEmpty(goodPrice) ? (
          <HomeSectionV1 initData={goodPrice} />
        ) : (
          <HomeSectionSkeleton cols={4} count={8} />
        )}
        {!isEmpty(highScore) ? (
          <HomeSectionV1 initData={highScore} />
        ) : (
          <HomeSectionSkeleton cols={4} count={8} />
        )}
        {!isEmpty(homePlans) ? (
          <HomeSectionV3 initData={homePlans} />
        ) : (
          <HomeSectionSkeleton cols={5} count={10} />
        )}
        {!isEmpty(homeLongfor) ? (
          <HomeLongFor initData={homeLongfor} />
        ) : (
          <HomeSectionSkeleton longfor />
        )}
      </div>
    </div>
  )
}
