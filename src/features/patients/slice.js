import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'

const adapter = createEntityAdapter({
  sortComparer: (a, b) => a.surname.localeCompare(b.title),
  selectId: row => row._id
})

const db = new PouchDb('patients')

const list = createAsyncThunk(
  'patients/list',
  async () => {
    console.info('readibng')
    const response = await db.allDocs({
      include_docs: true,
      attachments: false
    })
    return response.rows.map(({ doc }) => doc)
  }
)

const detailsRequest = createAsyncThunk(
  'patients/details',
  async (id) => db.get(id, {
    attachments: false
  })
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
    [list.pending]: (state, action) => {
      state.loading = true
    },
    [list.fulfilled]: (state, action) => {
      adapter.setAll(state, action.payload)
      state.loading = false
    },
    [detailsRequest.fulfilled]: (state, action) => {
      state.current = action.payload
    }
  }
})

export const {
  add,
  loading,
  loaded,
  update,
  remove,
  details
} = slice.actions

export { list }

export default slice.reducer
export const selectors = {
  current: state => state.patients.current,
  loading: state => state.patients.loading,
  ...adapter.getSelectors(state => state.patients)
}
