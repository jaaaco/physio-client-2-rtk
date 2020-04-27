import { createSlice } from '@reduxjs/toolkit'
import * as patient from '../patients/slice'

let lastId = 1

const slice = createSlice({
  name: 'flash',
  initialState: [],
  reducers: {
    add: {
      prepare: payload => ({ payload: { ...payload, id: lastId++, duration: payload.duration || 3000 } }),
      reducer: (state, { payload }) => [...state, payload]
    },
    remove (state, { payload }) {
      return state.filter(({ id }) => id !== payload.id)
    }
  }
  // extraReducers: {
  //   [patient.add.fulfilled]: state => [...state, { type: 'success', message: 'Pacjent został dodany' }],
  //   [patient.add.rejected]: state => [...state, { type: 'error', message: 'Nie udało się zapisać danych pacjenta' }],
  //   [patient.update.fulfilled]: state => [...state, { type: 'success', message: 'Dane pacjenta zostały zaktualizoane' }],
  //   [patient.update.rejected]: state => [...state, { type: 'error', message: 'Nie udało się zaktualizować danych pacjenta' }],
  //   [patient.remove.fulfilled]: state => [...state, { type: 'success', message: 'Dane pacjetna zostały usunięte' }],
  //   [patient.remove.rejected]: state => [...state, { type: 'error', message: 'Nie udało się usunąć danych pacjenta' }]
  // }
})

export const {
  add,
  remove
} = slice.actions

export default slice.reducer

export const selectors = {
  flashes: state => state.flashes
}
