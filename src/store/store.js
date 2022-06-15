import { configureStore } from '@reduxjs/toolkit'
import loadingModalReducer from './slices/loadingModalSlice'
import usersSliceReducer from './slices/usersSlice'
export const store = configureStore({
  reducer: {
    loadingModal : loadingModalReducer,
    usersSlice : usersSliceReducer,
  },
})