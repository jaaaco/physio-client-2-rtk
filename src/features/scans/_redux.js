import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import PouchDb from 'pouchdb'
import PouchDbFind from 'pouchdb-find'
import moment from 'moment'
import omit from 'lodash/omit'

PouchDb.plugin(PouchDbFind)

const db = new PouchDb('scans')

db.createIndex({ index: { fields: ['order'] } })
db.createIndex({ index: { fields: ['patientId'] } })

const list = createAsyncThunk(
  'scans/list',
  async ({ appointmentId, patientId }) => {
    const response = await db.find({
      sort: [{ order: 'desc' }],
      selector: appointmentId ? {
        patientId,
        appointmentId,
        order: { $exists: true }
      } : {
        patientId,
        order: { $exists: true }
      }
    })
    return response.docs
  }
)

const add = createAsyncThunk(
  'scans/add',
  async payload => {
    const newScan = {
      order: (await db.info()).doc_count,
      date: moment().format('YYYY-MM-DD @ HH:mm'),
      ...omit(payload, ['mesh'])
    }
    const { id, rev } = await db.post(newScan)
    await db.putAttachment(
      id,
      'scan.ply',
      rev,
      // eslint-disable-next-line no-undef
      new Blob([payload.mesh], { type: 'application/octet-stream' }),
      'application/octet-stream'
    )

    return {
      ...newScan,
      _id: id
    }
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
    try {
      const scan = await db.get(id, {
        attachments: true
      })
      return scan
    } catch (e)
    {
      console.error(e)
    }
  }
)

export async function getLastScan (patientId) {
  const lastScan = await db.find({
    limit: 1,
    sort: [{ order: 'desc' }],
    selector: {
      patientId,
      order: { $exists: true }
    }
  })
  if (lastScan.docs[0]) {
    return db.get(lastScan.docs[0]._id, {
      attachments: true
    })
  }
  return null
}

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
      state.loading = false
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
