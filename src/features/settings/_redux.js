import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import clone from 'lodash/clone'
import PouchDb from 'pouchdb'

const db = new PouchDb('settings')

const initialState = {
  all: {
    serverHost: 'localhost',
    serverPort: 'localhost:8080'
  },
  loading: false
}

const list = createAsyncThunk(
  'settings/list',
  async () => {
    const response = clone(initialState.all)
    for (const name of Object.keys(initialState.all)) {
      const { docs } = await db.find({ selector: { name } })
      if (docs.length === 1) {
        response[name] = docs[0].value
      }
    }
    return response
  }
)

const update = createAsyncThunk(
  'settings/update',
  async ({ name, value }) => {
    const { docs } = await db.find({ selector: { name } })
    if (docs.length) {
      await db.put({ ...docs[0], value })
    } else {
      await db.post({ name, value })
    }
    return { name, value }
  }
)

const slice = createSlice({
  name: 'settings',
  initialState,
  extraReducers: {
    [list.fulfilled]: (state, { payload }) => {
      state.all = payload
    },
    [update.fulfilled]: (state, { payload }) => {
      state.all[payload.name] = payload.value
    },
    [list.rejected]: (state, data) => {
      console.error(data)
    }
  }
})

export const actions = { list, update }

export const selectors = {
  all: state => state.settings.all,
  loading: state => state.settings.loading
}

export default slice.reducer
