import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { ScannerController } from '@dev3dbody/scanner-controller'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../settings/_redux'
import { add as flash } from '../../middlewares/flash'

const ScanButton = ({ patient }) => {
  const { serverHost, serverPort } = useSelector(selectors.all)
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()
  const scannerController = new ScannerController(serverHost, serverPort, false)
  scannerController.getStatus().then(result => {
    if (result.arduino_ready) {
      setBusy(false)
    }
  }, errors => {
    errors.forEach(error => {
      flash(dispatch, 'Błąd połączenia ze skanerem: ' + error.msg, 'error')
    })
  })

  return (
    <Button
      disabled={busy}
      primary
      onClick={() => {
        setBusy(true)

        const scanId = ScannerController.prepareStandardScanId(patient.surname + patient.name)
        scannerController.scan(scanId).then(mesh => {
          setBusy(false)
          console.info(mesh)
          flash(dispatch, 'Skan OK')
          // mesh is an ArrayBuffer, ready to pass to MeshViewer component
        }, errors => {
          setBusy(false)
          errors.forEach(error => {
            flash(dispatch, 'Błąd skanowania: ' + error.msg, 'error')
          })
        })
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
      <Icon name="video camera"/>
      Nowe badanie
    </Button>
  )
}

export default ScanButton
