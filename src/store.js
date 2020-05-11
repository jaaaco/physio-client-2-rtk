import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import navigation from './features/navigation/_redux'
import patients from './features/patients/_redux'
import appointments from './features/appointments/_redux'
import flash from './features/flash/_redux'
import flashMiddleware from './middlewares/flash'

export default configureStore({
  reducer: {
    navigation,
    patients,
    appointments,
    flash
  },
  middleware: [...getDefaultMiddleware(), flashMiddleware]
})
