import React, { useState } from 'react'
import _ from 'lodash'
import { Button, Container, Dropdown, Header, Icon, Divider } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import ScanComment from './comment'

import { actions as appointmentActions, selectors as appointmentSelectors } from '../appointments/_redux'
import { selectors as patientSelectors } from '../patients/_redux'
import { actions, selectors } from './_redux'
import { selectors as compareSelectors, actions as compareActions } from '../compare/_redux'
import { MeshViewer } from '@dev3dbody/mesh-viewer'

const StanDetails = () => {
  const scan = useSelector(selectors.current)
  const appointment = useSelector(appointmentSelectors.current)
  const patient = useSelector(patientSelectors.current)
  const isCompared = false // TODO: useSelector(compareSelectors.isCompared)
  const dispatch = useDispatch()

  if (!scan || !patient || !appointment) {
    return null
  }

  function base64ToArrayBuffer (base64) {
    var binaryString = window.atob(base64)
    var len = binaryString.length
    var bytes = new Uint8Array(len)
    for (var i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  return (
    <Container>
      <Button.Group floated='right'>
        <Button
          positive={!isCompared}
          negative={isCompared}
          onClick={() => {
            dispatch(
              isCompared ? compareActions.remove(scan._id) : compareActions.add(scan._id)
            )
          }}
        >
          <Icon name={isCompared ? 'trash' : 'plus circle'} />
          {isCompared ? 'Usuń z porównania' : 'Dodaj do porównania'}
        </Button>
        <Dropdown
          onChange={() => {
            dispatch(actions.remove(scan))
            dispatch(appointmentActions.details(appointment._id))
          }}
          className='button icon'
          options={[
            { key: 'edit', icon: 'delete', text: 'Usuń', value: 'edit' }
          ]}
          trigger={<></>}
        />
      </Button.Group>
      <Header as='h2'>
        <Icon name='user circle' />
        <Header.Content>
          Badanie nr {scan.order}
          <Header.Subheader>
            {patient.name} {patient.surname} z dnia {scan.date}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <MeshViewer mesh={base64ToArrayBuffer(scan._attachments['scan.ply'].data)} />
      <Divider section />
      <ScanComment scan={scan} />
      <Divider section />
      <Button
        onClick={() => dispatch(appointmentActions.details(appointment._id))}
        basic
      >
        <Icon name='arrow left' /> wróć do wizyty
      </Button>
    </Container>
  )
}

export default StanDetails
