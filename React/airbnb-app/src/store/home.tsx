import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getGoodPriceData, getHighScoreData, getHomeDiscountData, getHomeRecommendData, getHomePlansData, type IHomeSection, type IHomeSectionV2 } from '@/api/home'

/** 异步 action：请求高性价比房源 */
export const fetchGoodPriceAction = createAsyncThunk(
  'home/fetchGoodPrice',
  () => getGoodPriceData()
)

export const fetchHighScoreAction = createAsyncThunk(
  'home/fetchHighScore',
  () => getHighScoreData()
)

export const fetchHomeDiscountAction = createAsyncThunk(
  'home/fetchHomeDiscount',
  () => getHomeDiscountData()
)

export const fetchHomeRecommendAction = createAsyncThunk(
  'home/fetchHomeRecommend',
  () => getHomeRecommendData()
)

export const fetchHomePlansAction = createAsyncThunk(
  'home/fetchHomePlans',
  () => getHomePlansData()
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    goodPrice: {} as IHomeSection,
    highScore: {} as IHomeSection,
    homeDiscount: {} as IHomeSectionV2,
    homeRecommend: {} as IHomeSectionV2,
    homePlans: {} as IHomeSection,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoodPriceAction.fulfilled, (state, { payload }) => {
      state.goodPrice = payload
    })
    builder.addCase(fetchHighScoreAction.fulfilled, (state, { payload }) => {
      state.highScore = payload
    })
    builder.addCase(fetchHomeDiscountAction.fulfilled, (state, { payload }) => {
      state.homeDiscount = payload
    })
    builder.addCase(fetchHomeRecommendAction.fulfilled, (state, { payload }) => {
      state.homeRecommend = payload
    })
    builder.addCase(fetchHomePlansAction.fulfilled, (state, { payload }) => {
      state.homePlans = payload
    })
  }
})

export default homeSlice.reducer
