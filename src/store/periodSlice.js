import { createSlice } from "@reduxjs/toolkit"
import { PERIODS } from "../helpers/constants"

const initialState = {
  daily: [],
  weekly: [],
  monthly: [],
  all: [],
  featured: []
}

export const periodSlice = createSlice({
  name: "periods",
  initialState,
  reducers: {
    setPeriod: (state, action) => {
      switch (action.payload.period) {
        case PERIODS.daily.slug:
          state.daily = action.payload.jobs
          break
        case PERIODS.weekly.slug:
          state.weekly = action.payload.jobs
          break
        case PERIODS.monthly.slug:
          state.monthly = action.payload.jobs
          break
        case PERIODS.all.slug:
          state.all = action.payload.jobs
          break
        case PERIODS.featured.slug:
          state.featured = action.payload.jobs
          break
      }
    }
  }
})

export const { setPeriod } = periodSlice.actions

export default periodSlice.reducer