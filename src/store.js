import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from './middlewares/logger'
import navigation from './features/navigation/slice'
import patients from './features/patients/slice'

export default configureStore({
  reducer: {
    navigation,
    patients
  },
  middleware: [...getDefaultMiddleware(), logger]
})
