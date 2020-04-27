import { createSlice } from '@reduxjs/toolkit'
import { remove, add, update, list } from '../patients/slice'

const slice = createSlice({
  name: 'navigation',
  initialState: 'PATIENT',
  reducers: {
    navigate (state, { payload: screen }) {
      return screen
    }
  },
  extraReducers: {
    [remove.fulfilled]: () => 'PATIENT',
    [update.fulfilled]: () => 'PATIENT_DETAILS',
    [add.fulfilled]: () => 'PATIENT_DETAILS',
    [list.fulfilled]: () => 'PATIENT'
  }
})

export const {
  navigate
} = slice.actions

const getNavigation = state => state.navigation

export { getNavigation }

export default slice.reducer
