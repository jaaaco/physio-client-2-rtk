import React from 'react'
import { useSelector } from 'react-redux'
import { getNavigation } from '../navigation/slice'
import { PatientEdit, PatientList, PatientDetails } from '../patients'
// import PatientList from './Patient/PatientList'
// import AppointmentList from './Appointment/AppointmentList'
// import ScanList from './Scan/ScanList'
// import ScanDetails from './Scan/ScanDetails'
// import PatientEdit from './Patient/PatientEdit'
// import Scanner from './Scanner/Scanner'
// import { getCurrentPatient, getScreen } from '../redux/reducers'
// import AppointmentDetails from './Appointment/AppointmentDetails'
// import AppointmentEdit from './Appointment/AppointmentEdit'
// import Settings from './Settings'
// import Compare from './Compare'

const Switch = () => {
  const navigation = useSelector(getNavigation)
  console.info({ navigation })
  switch (navigation) {
    case 'ADD_PATIENT':
      return <PatientEdit />
    case 'PATIENT_DETAILS':
      return <PatientDetails/>
    case 'PATIENT':
      return <PatientList />
    default:
      return <p>Patient list (default)</p>
  }
}

export default Switch
