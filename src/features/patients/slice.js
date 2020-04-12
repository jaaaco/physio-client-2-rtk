import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'
import { navigate } from '../navigation/slice'

const adapter = createEntityAdapter({
  sortComparer: (a, b) => a.surname.localeCompare(b.surname),
  selectId: ({ _id }) => _id
})

const db = new PouchDb('patients')

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
  async (payload, { dispatch }) => {
    dispatch(navigate('PATIENT_DETAILS'))
    const { id } = await db.post(payload)
    return { ...payload, id }
  }
)

const update = createAsyncThunk(
  'patients/update',
  async (payload, { dispatch }) => {
    dispatch(navigate('PATIENT_DETAILS'))
    await db.put(payload)
    return payload
  }
)

const details = createAsyncThunk(
  'patients/details',
  async (id, { dispatch }) => {
    dispatch(navigate('PATIENT_DETAILS'))
    return db.get(id, {
      attachments: false
    })
  }
)

const newPatient = createAsyncThunk(
  'patients/new',
  async (_, { dispatch }) => {
    dispatch(navigate('ADD_PATIENT'))
  }
)

const editPatient = createAsyncThunk(
  'patients/edit',
  async (id, { dispatch }) => {
    dispatch(navigate('ADD_PATIENT'))
    return db.get(id, {
      attachments: false
    })
  }
)

const slice = createSlice({
  name: 'patients',
  initialState: adapter.getInitialState({
    loading: false,
    current: undefined,
    error: null
  }),
  reducers: {
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
    [newPatient.fulfilled]: state => {
      state.current = undefined
    },
    [editPatient.fulfilled]: (state, { payload }) => {
      state.current = payload
    },
    [add.fulfilled]: (state, { payload }) => {
      state.current = payload
    },
    [update.fulfilled]: (state, { payload }) => {
      state.current = payload
    }
  }
})

export const {
  remove
} = slice.actions

// export thunk-generated actions
export { update, add, list, details, newPatient, editPatient }

export default slice.reducer
export const selectors = {
  current: state => state.patients.current,
  loading: state => state.patients.loading,
  ...adapter.getSelectors(state => state.patients)
}
