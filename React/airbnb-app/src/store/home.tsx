import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getGoodPriceData, getHighScoreData, type IHomeSection } from '@/api/home'

/** 异步 action：请求高性价比房源 */
export const fetchGoodPriceAction = createAsyncThunk(
  'home/fetchGoodPrice',
  () => getGoodPriceData()
)

export const fetchHighScoreAction = createAsyncThunk(
  'home/fetchHighScore',
  () => getHighScoreData()
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    goodPrice: {} as IHomeSection,
    highScore: {} as IHomeSection,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoodPriceAction.fulfilled, (state, { payload }) => {
      state.goodPrice = payload
    })
    builder.addCase(fetchHighScoreAction.fulfilled, (state, { payload }) => {
      state.highScore = payload
    })
  }
})

export default homeSlice.reducer
