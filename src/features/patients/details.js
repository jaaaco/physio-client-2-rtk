import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Grid,
  Button,
  Dropdown,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react'
import { actions, selectors } from './_redux'
import { actions as appointmentActions } from '../appointments/_redux'
import { AppointmentList } from '../appointments'
import { ScanView } from '../scans'

const PatientDetails = () => {
  const patient = useSelector(selectors.current)
  const dispatch = useDispatch()

  if (!patient) {
    return null
  }

  return (
    <Container>
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>
              <Icon name='user circle' />
              <Header.Content data-cy='patient-header-content'>
                {patient.name} {patient.surname}
                <Header.Subheader>Szczegóły Pacjenta</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button.Group
              primary
              floated='right'
              onClick={() => dispatch(appointmentActions.newAppointment())}
            >
              <Button primary data-cy='new-appointment'>
                <Icon name='add to calendar' />
                Nowa wizyta
              </Button>
              <Dropdown
                floating
                data-cy='dropdown-button-icon'
                onChange={() => {
                  dispatch(actions.editPatient(patient._id))
                }}
                className='button icon'
                options={[
                  {
                    key: 'edit',
                    icon: 'edit',
                    text: 'Modyfikuj',
                    value: 'edit'
                  }
                ]}
                trigger={<></>}
              />
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid divided style={{ paddingTop: '0.5em' }}>
        <Grid.Row>
          <Grid.Column width={7} style={{ padding: '0 2em 3em 0' }}>
            <p>
              <strong>Data urodzenia: </strong>
              {patient.birthDate}
            </p>
            <p>
              <strong>Ostatnia wizyta: </strong> {patient.lastAppointment ? patient.lastAppointment.visitDate : '(brak)'}
            </p>
            <Header as='h4'>Inne informacje:</Header>
            <Segment>
              {patient.comment.split('\n').map((line, key) => (
                <p key={key}>{line}</p>
              ))}
            </Segment>
            <Header as='h3' style={{ margin: '2em 0 1em 0' }}>
              Ostatnie wizyty
            </Header>
            <AppointmentList />
          </Grid.Column>
          <Grid.Column width={9} style={{ padding: '0 0 3em 2em' }}>
            <Header as='h4'>Ostatnie badanie - {patient.lastScan ? patient.lastScan.date : '(brak)'}</Header>
            {patient.lastScan &&
              <Segment>
                <ScanView scan={patient.lastScan} />
              </Segment>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button
        data-cy='back-button'
        onClick={() => dispatch(actions.list())}
        basic
      >
        <Icon name='arrow left' /> Wróć
      </Button>
    </Container>
  )
}

export default PatientDetails
