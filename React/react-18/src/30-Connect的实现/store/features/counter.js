import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 888,
  },
  reducers: {
    addNumber(state, { payload }) {
      state.value = state.value + payload
    },
    subNumber(state, { payload }) {
      state.value = state.value - payload
    },
  },
})

// 默认导出 reducer
export default counterSlice.reducer

// 导出actions
export const { addNumber, subNumber } = counterSlice.actions
