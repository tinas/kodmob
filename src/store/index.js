import { configureStore } from '@reduxjs/toolkit'
import periodMenuReducer from './periodMenuSlice'
import periodSlice from './periodSlice'
import mentorSlice from './mentorSlice'

export const store = configureStore({
  reducer: {
    period: periodMenuReducer
    periods: periodSlice,
    mentors: mentorSlice
  },
})