import { configureStore } from '@reduxjs/toolkit'
import counter from './modules/counter'

export default configureStore({
  reducer: {
    counter,
  },
})
