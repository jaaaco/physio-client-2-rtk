import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'navigation',
  initialState: 'PATIENT',
  reducers: {
    navigate (state, { payload: screen }) {
      return screen
    }
  }
})

export const {
  navigate
} = slice.actions

const getNavigation = state => state.navigation

export { getNavigation }

export default slice.reducer
