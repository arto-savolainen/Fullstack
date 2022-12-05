import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let notificationTimeoutId = null

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, clearNotification } = slice.actions

export const showNotification = (message, timeout) => {
  return dispatch => {
    const timeoutms = timeout * 1000

    dispatch(setNotification(message))

    //Clear any possible timeout from a previous notification so it won't clear current notification prematurely
    if (notificationTimeoutId !== null) {
      clearTimeout(notificationTimeoutId)
    }

    notificationTimeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutms)
  }
}

export default slice.reducer