import React, { useEffect } from 'react'
import { Button, Header, Icon, Segment, Table } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import truncate from 'lodash/truncate'

import { actions, selectors } from './_redux'
import { selectors as patientSelectors } from '../patients/_redux'
import { selectors as appointmentSelectors } from '../appointments/_redux'
import { actions as compareActions, selectors as compareSelectors } from '../compare/_redux'

const ScanList = () => {
  const dispatch = useDispatch()
  const selectedPatient = useSelector(patientSelectors.current)
  const selectedAppointment = useSelector(appointmentSelectors.current)
  const scans = useSelector(selectors.selectAll)
  const comparedScans = useSelector(compareSelectors.selectAll)

  useEffect(() => {
    dispatch(actions.list({ patientId: selectedPatient._id, appointmentId: selectedAppointment?._id }))
  }, [dispatch, selectedPatient, selectedAppointment])

  if (!scans.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='user md' />
          Jeszcze nie zarejestrowano żadnego badania
        </Header>
      </Segment>
    )
  }

  return (
    <>
      {!selectedPatient && (
        <Header as='h2'>
          <Icon name='group' />
          <Header.Content>
            Badania
            <Header.Subheader>{scans.length} rekordów</Header.Subheader>
          </Header.Content>
        </Header>
      )}
      <Table data-cy='appointment-list' padded selectable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nr badania</Table.HeaderCell>
            <Table.HeaderCell>Data i godzina</Table.HeaderCell>
            <Table.HeaderCell>Notatki</Table.HeaderCell>
            <Table.HeaderCell>Porównanie</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {scans.map(({ _id, date, comment, patientId, appointmentId, order }) => {
            const isCompared = !!comparedScans.find(id => id === _id)
            return (
              <Table.Row
                onClick={() => {
                  dispatch(actions.details(_id))
                }}
                key={_id}
              >
                <Table.Cell>{order}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{truncate(comment, { length: 32, separator: '...' })}</Table.Cell>
                <Table.Cell className=''>
                  {isCompared ? (
                    <Button
                      negative
                      onClick={e => {
                        e.stopPropagation()
                        dispatch(compareActions.remove(_id))
                      }}
                    >
                      <Icon name='trash' />
                      Usuń z porównania
                    </Button>
                  ) : (
                    <Button
                      positive
                      onClick={e => {
                        e.stopPropagation()
                        dispatch(compareActions.add(_id))
                      }}
                    >
                      <Icon name='plus circle' />
                      Dodaj do porównania
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default ScanList
