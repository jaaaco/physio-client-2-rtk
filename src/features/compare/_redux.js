import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'
import PouchDbFind from 'pouchdb-find'
PouchDb.plugin(PouchDbFind)

const db = new PouchDb('comparsions')

db.createIndex({ index: { fields: ['scanId'] } })

const list = createAsyncThunk(
  'compare/list',
  async () => {
    const response = await db.allDocs({
      include_docs: true,
      attachments: false
    })
    return response.rows.map(({ doc }) => doc)
  }
)

const add = createAsyncThunk(
  'compare/add',
  async ({ scanId }) => {
    const found = await db.find({ selector: { scanId }, limit: 1 })
    if (!found.docs[0]) {
      const { id } = await db.post({ scanId })
      return { scanId, _id: id }
    }
  }
)

const remove = createAsyncThunk(
  'compare/remove',
  async ({ scanId }) => {
    const found = await db.find({ selector: { scanId }, limit: 1 })
    if (found.docs[0]) {
      return db.remove({ _id: found.docs[0]._id })
    }
  }
)

const adapter = createEntityAdapter({
  selectId: ({ _id }) => _id
})

const slice = createSlice({
  name: 'compare',
  initialState: adapter.getInitialState({
    loading: false,
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
    }
  }
})

export const actions = { add, remove, list }

export const selectors = {
  loading: state => state.appointments.loading,
  ...adapter.getSelectors(state => state.appointments)
}

export default slice.reducer
