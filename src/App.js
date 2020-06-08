import React from 'react'

import Flash from './features/flash'
import { Navigation, NavigationSwitch } from './features/navigation'
import { PatientDetails, PatientEdit, PatientList } from './features/patients'
import { AppointmentDetails, AppointmentEdit, AppointmentList } from './features/appointments'
import Settings from './features/settings'

const App = () => (
  <>
    <Navigation />
    <div style={{ margin: '2em' }}>
      <NavigationSwitch map={{
        ADD_PATIENT: <PatientEdit />,
        ADD_APPOINTMENT: <AppointmentEdit />,
        PATIENT_DETAILS: <PatientDetails />,
        APPOINTMENT_DETAILS: <AppointmentDetails />,
        PATIENT: <PatientList />,
        APPOINTMENT: <AppointmentList />,
        SETTINGS: <Settings />,
        _default: <p>_default</p>
      }} />
    </div>
    <Flash />
  </>
)

export default App
