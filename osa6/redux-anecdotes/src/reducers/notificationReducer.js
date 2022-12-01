import { createSlice } from '@reduxjs/toolkit'

const initialState = 'this is a default notification'

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export default slice.reducer