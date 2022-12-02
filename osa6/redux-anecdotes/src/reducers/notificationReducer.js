import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  forceRenderHack: true
}

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload
      //If voting for the same anecdote consecutively, state.message remains the same so notification is not re-rendered
      //This forces a re-render every time showNotification is dispatched, thus refreshing the timeout appropriately 
      state.forceRenderHack = !state.forceRenderHack
    },
    clearNotification(state, action) {
      state.message = null
    }
  }
})

export const { showNotification, clearNotification } = slice.actions
export default slice.reducer