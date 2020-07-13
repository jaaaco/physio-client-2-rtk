import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Header, Icon, Segment } from 'semantic-ui-react'
import { actions, selectors as appointmentSelectors } from './_redux'

import { actions as patientActions, selectors as patientSelectors } from '../patients/_redux'
import ScanButton from '../scans/button'

// import Scanner from '../../lib/scanner'
// import ScanList from '../Scan/ScanList'

const AppointmentDetails = () => {
  const patient = useSelector(patientSelectors.current)
  const appointment = useSelector(appointmentSelectors.current)
  const dispatch = useDispatch()

  if (!patient || !appointment) {
    return null
  }

  return (
    <>
      <Button.Group floated="right">
        <ScanButton patient={patient} />
        <Dropdown
          data-cy="dropdown"
          onChange={() => {
            dispatch(actions.editAppointment(appointment._id))
          }}
          className="button icon"
          options={[
            { key: 'edit', icon: 'edit', text: 'Modyfikuj', value: 'edit' }
          ]}
          trigger={<React.Fragment />}
        />
      </Button.Group>
      <Header as="h2">
        <Icon name="user circle" />
        <Header.Content data-cy="appointment-details">
          Wizyta {appointment.visitDate}
          <Header.Subheader>
            {patient.name} {patient.surname}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Segment data-cy="appointment-description">
        {appointment.interview.split('\n').map((line, key) => (
          <p key={key}>{line}</p>
        ))}
      </Segment>
      {/* <ScanList /> */}
      <Button data-cy="navigate-back" onClick={() => dispatch(patientActions.details(patient._id))} basic>
        <Icon name="arrow left" /> wróć do szczegółów pacjenta
      </Button>
    </>
  )
}

export default AppointmentDetails
