import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'
import PouchDbFind from 'pouchdb-find'

PouchDb.plugin(PouchDbFind)

const db = new PouchDb('scans')

const list = createAsyncThunk(
  'scans/list',
  async ({ appointmentId, patientId }) => {
    const response = await db.find({
      selector: appointmentId ? {
        patientId,
        appointmentId
      } : {
        patientId
      }
    })
    return response.docs
  }
)

const add = createAsyncThunk(
  'scans/add',
  async payload => {
    const { id } = await db.post(payload)
    return { ...payload, _id: id }
  }
)

const update = createAsyncThunk(
  'scans/update',
  async payload => {
    await db.put(payload)
    return payload
  }
)

const details = createAsyncThunk(
  'scans/details',
  async (id, { dispatch }) => {
    const scan = await db.get(id, {
      attachments: false
    })
    return scan
  }
)

const editScan = createAsyncThunk(
  'scans/edit',
  async id => {
    return db.get(id, {
      attachments: false
    })
  }
)

const remove = createAsyncThunk(
  'scans/remove',
  async payload => {
    return db.remove(payload)
  }
)

const adapter = createEntityAdapter({
  selectId: ({ _id }) => _id
})

const slice = createSlice({
  name: 'scans',
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
    [editScan.pending]: state => {
      state.current = undefined
      state.loading = true
    },
    [editScan.fulfilled]: (state, { payload }) => {
      state.current = payload
      state.loading = false
    },
    [add.fulfilled]: (state, { payload }) => {
      state.current = payload
    },
    [update.fulfilled]: (state, { payload }) => {
      state.current = payload
    },
    [remove.fulfilled]: state => {
      state.current = undefined
    }
  }
})

export const actions = { update, add, remove, list, details, editScan }

export const selectors = {
  current: state => state.scans.current,
  loading: state => state.scans.loading,
  ...adapter.getSelectors(state => state.scans)
}

export default slice.reducer
