import React from 'react'

import Flash from './features/flash'
import { Navigation, NavigationSwitch } from './features/navigation'
import { PatientDetails, PatientEdit, PatientList } from './features/patients'
import { AppointmentList, AppointmentEdit } from './features/appointments'

const App = () => (
  <>
    <Navigation />
    <div style={{ margin: '2em' }}>
      <NavigationSwitch map={{
        ADD_PATIENT: <PatientEdit />,
        ADD_APPOINTMENT: <AppointmentEdit />,
        PATIENT_DETAILS: <PatientDetails />,
        PATIENT: <PatientList />,
        APPOINTMENT: <AppointmentList />,
        _default: <p>_default</p>
      }} />
    </div>
    <Flash />
  </>
)

export default App
