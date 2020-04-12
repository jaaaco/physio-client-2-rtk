import { add, remove } from '../features/flash/slice'

let nextFlashMessageId = 1

const flash = ({ dispatch }) => next => async action => {
  if (action.meta && action.meta.flash) {
    const { type, text, duration } = action.meta.flash
    const id = nextFlashMessageId
    nextFlashMessageId += 1
    dispatch(add(`${id}`, type, text, duration))
    if (duration) {
      setTimeout(() => {
        dispatch(remove(`${id}`))
      }, duration)
    }
  }
  return next(action)
}

export default flash
