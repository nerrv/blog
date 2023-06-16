import { configureStore } from '@reduxjs/toolkit'

import listSlice from './listSlice'
import articleSlice from './articleSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    list: listSlice,
    article: articleSlice,
    user: userSlice,
  },
})

export default store
