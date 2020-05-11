import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'flash',
  initialState: [],
  reducers: {
    add: {
      // prepare: payload => ({ payload: { ...payload, id: lastId++, duration: payload.duration || 3000 } }),
      reducer: (state, { payload }) => [...state, payload]
    },
    remove (state, { payload: idToRemove }) {
      return state.filter(({ id }) => id !== idToRemove)
    }
  }
})

export const actions = slice.actions

export default slice.reducer

export const selectors = {
  flashes: state => state.flash
}
