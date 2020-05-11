import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'

const db = new PouchDb('appointments')

const list = createAsyncThunk(
  'appointments/list',
  async ({ patientId }) => {
    const response = await db.find({
      selector: {
        patientId
      }
    })
    return response.rows.map(({ doc }) => doc)
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
  async id => {
    return db.get(id, {
      attachments: false
    })
  }
)

const editPatient = createAsyncThunk(
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
  sortComparer: (a, b) => a.surname.localeCompare(b.surname),
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
    [editPatient.pending]: state => {
      state.current = undefined
      state.loading = true
    },
    [editPatient.fulfilled]: (state, { payload }) => {
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
export const actions = { update, add, remove, list, details, editPatient, newAppointment }

export const selectors = {
  current: state => state.appointments.current,
  loading: state => state.appointments.loading,
  ...adapter.getSelectors(state => state.appointments)
}

export default slice.reducer