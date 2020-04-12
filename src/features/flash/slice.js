import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'flash',
  initialState: [],
  reducers: {
    add (state, { payload }) {
      return [...state, payload]
    },
    remove (state, { payload }) {
      return state.filter(({ id }) => id !== payload.id)
    }
  }
})

export const {
  add,
  remove
} = slice.actions

const getNavigation = state => state.navigation

export { getNavigation }

export default slice.reducer

export const selectors = {
  flashes: state => state.flashes
}
