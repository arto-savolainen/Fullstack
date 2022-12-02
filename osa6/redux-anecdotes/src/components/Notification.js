import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

let notificationTimeoutId = null

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const hack = useSelector(state => state.notification.forceRenderHack)
  const dispatch = useDispatch()
  const timeout = 5000

  if (notification === null) { return null }

  //if previous notification was still showing, clear its timeout so it won't clear current notification prematurely
  if (notificationTimeoutId !== null) {
    clearTimeout(notificationTimeoutId)
  }

  notificationTimeoutId = setTimeout(() => {
    dispatch(clearNotification())
  }, timeout)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification