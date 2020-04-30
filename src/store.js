import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import navigation from './features/navigation/slice'
import patients from './features/patients/slice'
import flash from './features/flash/slice'
import flashMiddleware from './middlewares/flash'

export default configureStore({
  reducer: {
    navigation,
    patients,
    flash
  },
  middleware: [...getDefaultMiddleware(), flashMiddleware]
})
