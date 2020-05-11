import React from 'react'

import Flash from './features/flash'
import { Navigation, NavigationSwitch } from './features/navigation'
import { PatientDetails, PatientEdit, PatientList } from './features/patients'

const App = () => (
  <>
    <Navigation />
    <div style={{ margin: '2em' }}>
      <NavigationSwitch map={{
        ADD_PATIENT: <PatientEdit />,
        PATIENT_DETAILS: <PatientDetails />,
        PATIENT: <PatientList />,
        _default: <p>_default</p>
      }} />
    </div>
    <Flash />
  </>
)

export default App
