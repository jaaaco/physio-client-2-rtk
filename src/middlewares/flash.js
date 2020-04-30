import { actions } from '../features/flash/slice'

let nextId = 1
const duration = 3000

const messageMap = {
  fulfilled: {
    type: 'success',
    add: 'Nowy wpis został zapisany',
    update: 'Zmiany zostały zapisane',
    remove: 'Wpis został usunięty',
    patients: {
      add: 'Dane nowego pacjenta zostały zapisane'
    }
  },
  rejected: {
    type: 'error',
    add: 'Nie udało się zapisać danych',
    update: 'Nie udało się zapisać zmian',
    remove: 'Nie udało się usunąć wpisu',
    list: 'Nie udało się pobrać listy'
  }
}

const flash = ({ dispatch }) => next => async action => {
  const matches = action.type.match(/^([a-z]+)\/([a-z]+)\/([a-z]+)$/)

  if (!matches) {
    return next(action)
  }

  const add = (text, type = 'success') => {
    if (!text) {
      throw new Error()
    }
    dispatch(actions.add({ id: nextId, type, text }))
    setTimeout(id => {
      dispatch(actions.remove(id))
    }, duration, nextId)
    nextId++
  }

  // eslint-disable-next-line no-unused-vars
  const [_, module, verb, result] = matches

  try {
    add(messageMap[result][module][verb], messageMap[result].type)
  } catch (e) {
    try {
      add(messageMap[result][verb], messageMap[result].type)
    } catch (e) {}
  }

  return next(action)
}

export default flash
