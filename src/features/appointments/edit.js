import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Form, Button, Icon, Header } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react'
import moment from 'moment'

import { selectors, actions } from './_redux'
import { actions as patientActions, selectors as patientSelectors } from '../patients/_redux'

const AppointmentEdit = ({
  patientId
}) => {
  const dispatch = useDispatch()
  const appointment = useSelector(selectors.current)
  const patient = useSelector(patientSelectors.current)
  const dateFormat = 'YYYY-MM-DD @ HH:mm'

  let initValues = {
    patientId: patient._id,
    interview: '',
    visitDate: moment().format(dateFormat)
  }
  let _id = ''
  let _rev = ''

  if (appointment !== undefined) {
    ({ _id, _rev, ...initValues } = appointment)
  }

  const [fields, setFields] = useState({
    values: initValues
  })

  const handleChange = async (field, value) => {
    setFields(state => ({
      values: { ...state.values, [field]: value }
    }))
  }

  const handleSubmit = async () =>
    dispatch(
      appointment === undefined
        ? actions.add(fields.values)
        : actions.update({ _id, _rev, ...fields.values })
    )

  return (
    <>
      {patient && (
        <Header as="h2">
          <Icon name="user circle" />
          <Header.Content>
            {patient.name} {patient.surname}
            <Header.Subheader>Nowa wizyta</Header.Subheader>
          </Header.Content>
        </Header>
      )}
      <Form>
        <Form.Field>
          <label>Data wizyty</label>
          <DateTimeInput
            duration={0}
            closable
            closeOnMouseLeave
            dateFormat={dateFormat}
            localization="pl"
            placeholder="Data wizyty"
            value={fields.values.visitDate}
            iconPosition="right"
            popupPosition="bottom right"
            onChange={(e, { value }) => {
              if (value) {
                const date = moment(value, 'YYYY-MM-DD @ HH:mm')
                if (date.isValid()) {
                  handleChange('visitDate', date.format(dateFormat))
                } else {
                  handleChange('visitDate', '')
                }
              }
            }}
          />
        </Form.Field>
        <Form.TextArea
          autoFocus
          data-cy="description"
          value={fields.values.interview}
          label="Inne informacje"
          placeholder="Inne informacje"
          onChange={(_, data) => handleChange('interview', `${data.value}`)}
        />
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              <Button.Group>
                <Button onClick={handleSubmit} positive>
                  Zapisz
                </Button>
                <Button.Or text="lub" />
                <Button onClick={() => dispatch(patientActions.details(patientId))}>
                  Anuluj
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {appointment && (
                <Button
                  negative
                  onClick={() => {
                    dispatch(actions.remove(appointment))
                  }}
                >
                  <Icon name="trash" /> Usuń
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  )
}

export default AppointmentEdit
