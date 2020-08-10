import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { ScannerController } from '@dev3dbody/scanner-controller'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../settings/_redux'
import { actions } from './_redux'
import { add as flash } from '../../middlewares/flash'
import isArray from 'lodash/isArray'

const ScanButton = ({ appointment, patient }) => {
  const buttonLabels = {
    checking: 'Łączenie ze skanerem...',
    ready: 'Nowe badanie',
    error: 'Błąd skanowania',
    'connection-error': 'Brak połączenia',
    busy: 'Skanuję...'
  }
  const [status, setStatus] = useState('checking')
  const { serverHost, serverPort } = useSelector(selectors.all)
  const dispatch = useDispatch()
  const scannerController = new ScannerController(serverHost, serverPort, false)

  scannerController.getStatus().then(result => {
    if (result.arduino_ready) {
      setStatus('ready')
    }
  }, errors => {
    isArray(errors) && errors.forEach(error => {
      flash(dispatch, 'Błąd połączenia ze skanerem: ' + error.msg, 'error')
      setStatus('connection-error')
    })
  })

  return (
    <Button
      disabled={status === 'checking' || status === 'busy'}
      primary={status === 'ready' || status === 'busy'}
      negative={status === 'connection-error'}
      onClick={() => {
        setStatus('busy')
        const scanId = ScannerController.prepareStandardScanId(patient.surname + patient.name)
        scannerController.scan(scanId).then(mesh => {
          setStatus('busy')
          dispatch(
            actions.add({
              patientId: patient._id,
              appointmentId: appointment._id,
              mesh,
            })
          )
          flash(dispatch, 'Skan OK')

        }, errors => {
          setStatus('error')
          isArray(errors) && errors.forEach(error => {
            flash(dispatch, 'Błąd skanowania: ' + error.msg, 'warning')
          })
        })
      }}
    >
      <Icon name="video camera" />
      {buttonLabels[status]}
    </Button>
  )
}

export default ScanButton
