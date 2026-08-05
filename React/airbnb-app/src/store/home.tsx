import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import request from '@/api'
import type { RoomItem } from '@/components/RoomCard'

/** 异步 action：请求高性价比房源 */
export const fetchGoodPriceAction = createAsyncThunk(
  'home/fetchGoodPrice',
  async () => {
    const res = await request.get<IGoodPrice>('/home/goodPrice')
    return res
  },
)

interface IGoodPrice {
  title: string
  subtitle: string
  list: RoomItem[]
}

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    goodPrice: {} as IGoodPrice,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoodPriceAction.fulfilled, (state, { payload }) => {
      state.goodPrice = payload
    })
  },
})

export default homeSlice.reducer
