import { configureStore } from '@reduxjs/toolkit'

import counter from './features/counter'
import home from './features/home'

export default configureStore({
  reducer: {
    counter,
    home,
  },
})
