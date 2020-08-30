import React, { useEffect } from 'react'

import Flash from './features/flash'
import { Navigation, NavigationSwitch } from './features/navigation'
import { PatientDetails, PatientEdit, PatientList } from './features/patients'
import { AppointmentDetails, AppointmentEdit, AppointmentList } from './features/appointments'
import { ScanDetails } from './features/scans'
import Settings from './features/settings'
import { useDispatch } from 'react-redux'
import { actions } from './features/settings/_redux'
import { ComparePage } from './features/compare'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.list())
  }, [dispatch])
  return (
    <>
      <Navigation />
      <div style={{ margin: '2em' }}>
        <NavigationSwitch map={{
          ADD_PATIENT: <PatientEdit />,
          ADD_APPOINTMENT: <AppointmentEdit />,
          PATIENT_DETAILS: <PatientDetails />,
          APPOINTMENT_DETAILS: <AppointmentDetails />,
          SCAN_DETAILS: <ScanDetails />,
          COMPARE: <ComparePage />,
          PATIENT: <PatientList />,
          APPOINTMENT: <AppointmentList />,
          SETTINGS: <Settings />,
          _default: <p>_default</p>
        }}
        />
      </div>
      <Flash />
    </>
  )
}

export default App
