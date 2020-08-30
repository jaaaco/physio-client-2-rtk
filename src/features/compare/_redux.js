import { createSlice } from '@reduxjs/toolkit'
import union from 'lodash/union'
import without from 'lodash/without'

const slice = createSlice({
  name: 'compare',
  initialState: {
    items: []
  },
  reducers: {
    add: (state, { payload }) => {
      state.items = union(state.items, [payload])
    },
    remove: (state, { payload }) => {
      state.items = without(state.items, payload)
    },
    clear: (state, { payload }) => {
      state.items = []
    }
  }
})

export const actions = slice.actions

export const selectors = {
  selectAll: state => state.compare.items,
  count: state => state.compare.items.length
}

export default slice.reducer
