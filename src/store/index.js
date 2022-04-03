import { configureStore } from '@reduxjs/toolkit'
import periodMenuReducer from './periodMenuSlice'

export const store = configureStore({
  reducer: {
    period: periodMenuReducer
  },
})