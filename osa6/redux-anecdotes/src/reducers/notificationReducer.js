import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  timeoutId: null
}

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log('action.payload: ', action.payload)
      state.message = action.payload[0]
      state.timeoutId = action.payload[1]
    },
    clearNotification(state, action) {
      state.message = null
    }
  }
})

export const { showNotification, clearNotification } = slice.actions
export default slice.reducer