import React from 'react'
import { Label, Table, Button, Header, Icon, Segment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { actions, selectors } from './slice'

const PatientList = () => {
  const dispatch = useDispatch()
  const patients = useSelector(selectors.selectAll)
  const loading = useSelector(selectors.loading)

  if (!patients.length) {
    return (
      <Segment placeholder loading={loading}>
        <Header icon>
          <Icon name="user md" />
          Jeszcze nie zarejestrowano żadnego pacjenta
        </Header>
        <Button
          data-cy="new-patient-hero"
          primary
          onClick={() => dispatch(actions.newPatient())}
        >
          <Icon name="add user" /> Dodaj pacjenta
        </Button>
      </Segment>
    )
  }

  let currentLetter = ''
  let ribbon

  return (
    <>
      <Button
        data-cy="new-patient"
        floated="right"
        primary
        onClick={() => dispatch(actions.newPatient())}
      >
        <Icon name="add user" /> Dodaj pacjenta
      </Button>
      <Header as="h2">
        <Icon name="group" />
        <Header.Content>
          Pacjenci
          <Header.Subheader>{patients.length} rekordów</Header.Subheader>
        </Header.Content>
      </Header>
      <Table singleLine selectable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Imię i Nazwisko</Table.HeaderCell>
            <Table.HeaderCell>Data urodzenia</Table.HeaderCell>
            <Table.HeaderCell>Inne informacje</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {patients.map(({ _id, name, surname, birthDate, comment }) => {
            if (surname && currentLetter !== surname[0].toUpperCase()) {
              currentLetter = surname[0].toUpperCase()
              ribbon = <Label ribbon>{surname[0].toUpperCase()}</Label>
            } else {
              ribbon = null
            }
            return (
              <Table.Row
                data-cy="data-name-cell"
                onClick={() => dispatch(actions.details(_id))}
                key={_id}
              >
                <Table.Cell>
                  {ribbon}
                  <span>
                    {name} {surname}
                  </span>
                </Table.Cell>
                <Table.Cell>{birthDate}</Table.Cell>
                <Table.Cell>{comment}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default PatientList
