import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'

const db = new PouchDb('patients')

const list = createAsyncThunk(
  'patients/list',
  async (_, { dispatch }) => {
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
    const { id } = await db.post(payload)
    return { ...payload, id }
  }
)

const update = createAsyncThunk(
  'patients/update',
  async (payload, { dispatch }) => {
    await db.put(payload)
    return payload
  }
)

const remove = createAsyncThunk(
  'patients/remove',
  async (payload, { dispatch }) => {
    await db.put(payload)
    return payload
  }
)

const details = createAsyncThunk(
  'patients/details',
  async (id, { dispatch }) => {
    return db.get(id, {
      attachments: false
    })
  }
)

const editPatient = createAsyncThunk(
  'patients/edit',
  async (id, { dispatch }) => {
    return db.get(id, {
      attachments: false
    })
  }
)

const removePatient = createAsyncThunk(
  'patients/remove',
  async (resource, { dispatch }) => {
    return db.remove(resource)
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
    [add.fulfilled]: {
      prepare: payload => ({
        payload,
        meta: {
          flash: {
            type: 'success',
            message: 'Dane nowego pacjenta zostały zapisane'
          }
        }
      }),
      reducer: (state, { payload }) => {
        state.current = payload
      }
    },
    [add.rejected]: {
      prepare: payload => ({
        payload,
        meta: {
          flash: {
            type: 'error',
            message: 'Nie udało się zapisać nowego pacjenta'
          }
        }
      })
    },
    [update.fulfilled]: {
      prepare: payload => ({
        payload,
        meta: {
          flash: {
            type: 'success',
            message: 'Dane pacjenta zostały zaktualizowane'
          }
        }
      }),
      reducer: (state, { payload }) => {
        state.current = payload
      }
    },
    [update.rejected]: {
      prepare: payload => ({
        payload,
        meta: {
          flash: {
            type: 'error',
            message: 'Nie udało się zaktualizować danych pacjenta'
          }
        }
      })
    },
    [removePatient.fulfilled]: {
      prepare: payload => ({
        payload,
        meta: {
          flash: {
            type: 'success',
            message: 'Dane pacjenta zostały zaktualizowane'
          }
        }
      }),
      reducer: state => {
        state.current = undefined
      }
    }
  }
})

const { newPatient } = slice.actions
// export named actions + thunk-generated actions
export const actions = { update, add, remove, list, details, editPatient, newPatient }

export const selectors = {
  current: state => state.patients.current,
  loading: state => state.patients.loading,
  ...adapter.getSelectors(state => state.patients)
}

export default slice.reducer
