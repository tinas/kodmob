import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mentors: []
}

export const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {
    setMentors: (state, action) => {
      state.mentors = action.payload
    }
  }
})

export const { setMentors } = mentorSlice.actions

export default mentorSlice.reducer