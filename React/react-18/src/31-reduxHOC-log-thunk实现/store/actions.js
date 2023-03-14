import axios from 'axios'
import { ADD_NUMBER, CHANGE_AGE, CHANGE_BANNERS, CHANGE_RECOMMENDS, SUB_NUMBER } from './constant'

export const actionAdd = data => ({ type: ADD_NUMBER, data })
export const actionSub = data => ({ type: SUB_NUMBER, data })

export const actionBanner = data => ({ type: CHANGE_BANNERS, data })
export const actionRecommend = data => ({ type: CHANGE_RECOMMENDS, data })

export const actionAge = data => ({ type: CHANGE_AGE, data })

// !异步 action
export const actionAsync = () => {
  return function(dispatch, getState) {
    getState()
    // console.log('异步action的默认参数：', dispatch, getState())

    // 异步操作: 网络请求
    axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      dispatch(actionBanner({ banners }))
      dispatch(actionRecommend({ recommends }))
    })
  }
}
