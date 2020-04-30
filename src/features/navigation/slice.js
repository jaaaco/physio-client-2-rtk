import { createSlice } from '@reduxjs/toolkit'
import { actions as patients } from '../patients/slice'

const slice = createSlice({
  name: 'navigation',
  initialState: 'PATIENT',
  reducers: {
    navigate (state, { payload: screen }) {
      return screen
    }
  },
  extraReducers: {
    [patients.newPatient]: () => 'ADD_PATIENT',
    [patients.editPatient.fulfilled]: () => 'ADD_PATIENT',
    [patients.remove.fulfilled]: () => 'PATIENT',
    [patients.update.fulfilled]: () => 'PATIENT_DETAILS',
    [patients.add.fulfilled]: () => 'PATIENT_DETAILS',
    [patients.list.fulfilled]: () => 'PATIENT',
    [patients.details.pending]: () => 'PATIENT_DETAILS'
  }
})

export const {
  navigate
} = slice.actions

const getNavigation = state => state.navigation

export { getNavigation }

export default slice.reducer
