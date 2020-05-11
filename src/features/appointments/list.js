import React, { useEffect } from 'react'
import { Header, Icon, Segment, Table } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

import { actions, selectors } from './_redux'

import { selectors as patientSelectors } from '../patients/_redux'

const AppointmentList = () => {
  const dispatch = useDispatch()
  const selectedPatient = useSelector(patientSelectors.current)
  const appointments = useSelector(selectors.selectAll)

  useEffect(() => {
    dispatch(actions.list({ patientId: selectedPatient?._id }))
  }, [dispatch, selectedPatient])

  if (!appointments.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="user md" />
          Jeszcze nie zarejestrowano żadnej wizyty
        </Header>
      </Segment>
    )
  }

  return (
    <>
      {!selectedPatient && (
        <Header as="h2">
          <Icon name="group" />
          <Header.Content>
            Wizyty
            <Header.Subheader>{appointments.length} rekordów</Header.Subheader>
          </Header.Content>
        </Header>
      )}
      <Table padded selectable fixed>
        <Table.Header>
          <Table.Row>
            {!selectedPatient && <Table.HeaderCell>Pacjent</Table.HeaderCell>}
            <Table.HeaderCell width={5}>Data i godzina wizyty</Table.HeaderCell>
            <Table.HeaderCell width={7}>Inne informacje</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {appointments.map(
            ({ _id, interview, visitDate, patient }) => (
              <Table.Row
                onClick={() => {
                  dispatch(actions.details(_id))
                }}
                key={_id}
              >
                {!selectedPatient && (
                  <Table.Cell verticalAlign="top">
                    {patient && `${patient.name} ${patient.surname}`}
                  </Table.Cell>
                )}
                <Table.Cell verticalAlign="top">
                  {visitDate}
                </Table.Cell>
                <Table.Cell>{interview}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </>
  )
}

export default AppointmentList
