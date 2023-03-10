import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// !define async func
export const asyncData = createAsyncThunk('home/asyncData', async() => {
  const res = await axios.get('http://123.207.32.32:8000/home/multidata')
  return res.data
})

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    banners: [],
    recommends: [],
  },
  reducers: {
    changeBanners(state, action) {
      state.banners = action.payload
    },
    changeRecommends(state, { payload }) {
      state.recommends = payload
    },
  },
  // !2. async reducer define
  extraReducers: {
    /* [asyncData.pending](state, action) {
      console.log('pending', state, action)
    }, */
    [asyncData.fulfilled](state, action) {
      state.banners = action.payload.data.banner.list
      state.recommends = action.payload.data.recommend.list
    },
    /*  [asyncData.rejected](state, action) {
      console.log('rejected', state, action)
    }, */
  },
  // 链式调用
  /*  extraReducers: (builder) => {
    builder.addCase(asyncData.pending, (state, action) => {
      console.log('asyncData pending', action, state)
    }).addCase(asyncData.fulfilled, (state, { payload }) => {
      state.banners = payload.data.banner.list
      state.recommends = payload.data.recommend.list
    })
  }, */
})

export default homeReducer.reducer
export const { changeBanners, changeRecommends } = homeReducer.actions

// !func 内部提交
/* export const asyncData = createAsyncThunk('home/asyncData', async(extraInfo, { dispatch }) => {
  console.log(extraInfo)
  const res = await axios.get('http://123.207.32.32:8000/home/multidata')
  const banners = res.data.data.banner.list
  const recommends = res.data.data.recommend.list

  dispatch(changeBanners(banners))
  dispatch(changeRecommends(recommends))
}) */
