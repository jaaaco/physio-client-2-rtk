import { configureStore } from '@reduxjs/toolkit'
import navigation from './features/navigation/slice'
import patients from './features/patients/slice'

export default configureStore({
  reducer: {
    navigation,
    patients
  }
})
