const logger = store => next => action => {
  console.group(action.type)
  const oldState = store.getState()
  console.log('current state', oldState)
  console.info('dispatching', action)
  const result = next(action)
  const newState = store.getState()
  console.log('next state', newState)
  console.groupEnd()
  return result
}
export default logger
