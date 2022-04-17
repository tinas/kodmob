import { createSlice } from "@reduxjs/toolkit"
import { PERIODS } from '../helpers/constants'

const initialState = {
  periodMenu: PERIODS.daily
}

export const periodMenuSlice = createSlice({
  name: "periodMenu",
  initialState,
  reducers: {
    setActivePeriod: (state, action) => {
      state.periodMenu = action.payload
    }
  }
})

export const { setActivePeriod } = periodMenuSlice.actions

export default periodMenuSlice.reducer