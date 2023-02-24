import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { newNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return dispatch => {
    dispatch(newNotification(content))
    // clearTimeout(timeoutId)
    // setTimeoutId(
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout*1000)
    // )
  }
}

export default notificationSlice.reducer