import { createSlice } from '@reduxjs/toolkit'

const counterReducer = createSlice({
  name: 'counter',
  initialState: {
    value: 12,
    message: 'Hello World',
  },
  reducers: {
    addNumber(state, { payload }) {
      state.value = state.value + payload
    },
    subNumber(state, { payload }) {
      state.value = state.value - payload
    },
    changeMessage(state, { payload }) {
      state.message = payload
    },
  },
})

export const { addNumber, subNumber, changeMessage } = counterReducer.actions
export default counterReducer.reducer
