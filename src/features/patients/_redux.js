import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'
import DataLoader from 'dataloader'

const db = new PouchDb('patients')

async function loadPatients (keys) {
  const result = await db.allDocs({ include_docs: true, attachments: false, keys })
  return keys.map(id => result.rows.map(row => row.doc).find(({ _id }) => id === _id))
}

export const patientLoader = new DataLoader(loadPatients)

const destroy = createAsyncThunk(
  'patients/destroy',
  async () => db.destroy()
)

const list = createAsyncThunk(
  'patients/list',
  async () => {
    const response = await db.allDocs({
      include_docs: true,
      attachments: false
    })
    return response.rows.map(({ doc }) => doc)
  }
)

const add = createAsyncThunk(
  'patients/add',
  async payload => {
    const { id } = await db.post(payload)
    return { ...payload, _id: id }
  }
)

const update = createAsyncThunk(
  'patients/update',
  async payload => {
    await db.put(payload)
    patientLoader.clear(payload._id)
    return payload
  }
)

const details = createAsyncThunk(
  'patients/details',
  async id => {
    return db.get(id, {
      attachments: false
    })
  }
)

const set = createAsyncThunk(
  'patients/set',
  async id => {
    return db.get(id, {
      attachments: false
    })
  }
)

const editPatient = createAsyncThunk(
  'patients/edit',
  async id => {
    return db.get(id, {
      attachments: false
    })
  }
)

const remove = createAsyncThunk(
  'patients/remove',
  async payload => {
    patientLoader.clear(payload._id)
    return db.remove(payload)
  }
)

const adapter = createEntityAdapter({
  sortComparer: (a, b) => a.surname.localeCompare(b.surname),
  selectId: ({ _id }) => _id
})

const slice = createSlice({
  name: 'patients',
  initialState: adapter.getInitialState({
    loading: false,
    current: undefined,
    error: null
  }),
  reducers: {
    reset: state => { state.current = undefined },
    newPatient: state => { state.current = undefined },
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
      state.current = undefined
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
    [set.fulfilled]: (state, { payload }) => { state.current = payload },
    [update.fulfilled]: (state, { payload }) => {
      state.current = payload
    },
    [remove.fulfilled]: (state, { payload }) => {
      state.current = undefined
    }
  }
})

const { newPatient, reset } = slice.actions
// export named actions + thunk-generated actions
export const actions = { reset, set, update, add, remove, list, details, editPatient, newPatient, destroy }

export const selectors = {
  current: state => state.patients.current,
  loading: state => state.patients.loading,
  ...adapter.getSelectors(state => state.patients)
}

export default slice.reducer
