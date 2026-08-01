import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    currentPage: 1,
  },
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.currentPage += action.payload
    },
    subtract: (state, action: PayloadAction<number>) => {
      state.currentPage -= action.payload
    },
  },
})

export const { add, subtract } = homeSlice.actions

export default homeSlice.reducer