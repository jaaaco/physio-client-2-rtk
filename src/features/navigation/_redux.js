import { createSlice } from '@reduxjs/toolkit'
import { actions as patients } from '../patients/_redux'
import { actions as appointments } from '../appointments/_redux'

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
    [appointments.newAppointment]: () => 'ADD_APPOINTMENT',
    [patients.editPatient.fulfilled]: () => 'ADD_PATIENT',
    [appointments.editAppointment.fulfilled]: () => 'ADD_APPOINTMENT',
    [patients.remove.fulfilled]: () => 'PATIENT',
    [appointments.remove.fulfilled]: () => 'PATIENT_DETAILS',
    [patients.update.fulfilled]: () => 'PATIENT_DETAILS',
    [appointments.update.fulfilled]: () => 'APPOINTMENT_DETAILS',
    [patients.add.fulfilled]: () => 'PATIENT_DETAILS',
    [appointments.add.fulfilled]: () => 'APPOINTMENT_DETAILS',
    [appointments.details.pending]: () => 'APPOINTMENT_DETAILS',
    [patients.list.fulfilled]: () => 'PATIENT',
    [patients.details.pending]: () => 'PATIENT_DETAILS'
  }
})

const {
  navigate
} = slice.actions

export const actions = { navigate }

export const selectors = {
  getNavigation: state => state.navigation
}

export default slice.reducer
