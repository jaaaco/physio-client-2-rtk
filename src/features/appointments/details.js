import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Header, Icon, Segment } from 'semantic-ui-react'
import { actions, selectors as appointmentSelectors } from './_redux'

import { actions as patientActions, selectors as patientSelectors } from '../patients/_redux'

// import Scanner from '../../lib/scanner'
// import ScanList from '../Scan/ScanList'

const AppointmentDetails = () => {
  const patient = useSelector(patientSelectors.current)
  const appointment = useSelector(appointmentSelectors.current)
  const dispatch = useDispatch()
  const [busy, setBusy] = useState(false)
  const scans = [] // useSelector(getScansWithPatients)
  const serverHost = 'localhost' // useSelector(getSettingByKey)('serverHost')

  useEffect(() => {
    // dispatch(actions.list())
    // dispatch(loadSettingsRequest())
  }, [dispatch])

  if (!patient || !appointment) {
    return null
  }

  return (
    <>
      <Button.Group floated="right">
        <Button
          disabled={busy}
          primary
          onClick={() => {
            setBusy(true)
            // const scanner = new Scanner({ serverHost })
            // TODO: Add fake progressbar here for 15 sec.
            // scanner.scan((error: any, data: any) => {
            // TODO: Hide progressbar here
            // setBusy(false)
            // dispatch(
            //   createRequest('scans', {
            //     comment: '',
            //     order: scans.length + 1,
            //     appointmentId: appointment._id,
            //     patientId: patient._id,
            //     mesh: data,
            //     date: moment().format('YYYY-MM-DD @ HH:mm')
            //   })
            // )
            // })
          }}
        >
          <Icon name="video camera" />
          Nowe badanie
        </Button>
        <Dropdown
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
        <Header.Content>
          Wizyta {appointment.visitDate}
          <Header.Subheader>
            {patient.name} {patient.surname}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Segment>
        {appointment.interview.split('\n').map((line, key) => (
          <p key={key}>{line}</p>
        ))}
      </Segment>
      {/* <ScanList /> */}
      <Button onClick={() => dispatch(patientActions.details(patient._id))} basic>
        <Icon name="arrow left" /> wróć do szczegółów pacjenta
      </Button>
    </>
  )
}

export default AppointmentDetails
