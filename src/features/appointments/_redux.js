import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'
import PouchDbFind from 'pouchdb-find'
import { patientLoader, actions as patientActions } from '../patients/_redux'

PouchDb.plugin(PouchDbFind)

const db = new PouchDb('appointments')

const list = createAsyncThunk(
  'appointments/list',
  async ({ patientId }) => {
    const response = await db.find({
      selector: {
        patientId
      }
    })

    if (patientId) {
      return response.docs
    }

    const result = []
    for (const doc of response.docs) {
      result.push({ ...doc, patient: await patientLoader.load(doc.patientId) })
    }
    return result
  }
)

const add = createAsyncThunk(
  'appointments/add',
  async payload => {
    const { id } = await db.post(payload)
    return { ...payload, _id: id }
  }
)

const update = createAsyncThunk(
  'appointments/update',
  async payload => {
    await db.put(payload)
    return payload
  }
)

const details = createAsyncThunk(
  'appointments/details',
  async (id, { dispatch }) => {
    const appointment = await db.get(id, {
      attachments: false
    })
    dispatch(patientActions.set(appointment.patientId))
    return appointment
  }
)

const editAppointment = createAsyncThunk(
  'appointments/edit',
  async id => {
    return db.get(id, {
      attachments: false
    })
  }
)

const remove = createAsyncThunk(
  'appointments/remove',
  async payload => {
    return db.remove(payload)
  }
)

const adapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return b.visitDate.localeCompare(a.visitDate)
  },
  selectId: ({ _id }) => _id
})

const slice = createSlice({
  name: 'appointments',
  initialState: adapter.getInitialState({
    loading: false,
    current: undefined,
    error: null
  }),
  reducers: {
    newAppointment: state => { state.current = undefined },
    add: adapter.addOne,
    update: adapter.updateOne,
    remove: adapter.removeOne
  },
  extraReducers: {
    [list.pending]: state => {
      state.loading = true
    },
    [list.fulfilled]: (state, { payload }) => {
      adapter.setAll(state, payload)
      state.loading = false
    },
    [details.pending]: state => {
      state.current = undefined
      state.loading = true
    },
    [details.fulfilled]: (state, { payload }) => {
      state.current = payload
      state.loading = false
    },
    [editAppointment.pending]: state => {
      state.current = undefined
      state.loading = true
    },
    [editAppointment.fulfilled]: (state, { payload }) => {
      state.current = payload
      state.loading = false
    },
    [add.fulfilled]: (state, { payload }) => {
      state.current = payload
    },
    [update.fulfilled]: (state, { payload }) => {
      state.current = payload
    },
    [remove.fulfilled]: (state, { payload }) => {
      state.current = undefined
    }
  }
})

const { newAppointment } = slice.actions
// export named actions + thunk-generated actions
export const actions = { update, add, remove, list, details, editAppointment, newAppointment }

export const selectors = {
  current: state => state.appointments.current,
  loading: state => state.appointments.loading,
  ...adapter.getSelectors(state => state.appointments)
}

export default slice.reducer
