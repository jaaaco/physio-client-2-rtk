import React, { useEffect, useState } from 'react'
import { Button, Form, Header, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from './_redux'

const SettingsEdit = ({ serverHost, serverPort }) => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    values: {
      serverHost,
      serverPort
    }
  })

  useEffect(() => {
    setFields({ values: { serverHost, serverPort } })
  }, [serverHost, serverPort])

  const handleChange = async (field, value) => {
    setFields(state => ({
      values: { ...state.values, [field]: value }
    }))
  }
  return (
    <Form>
      <Form.Input
        data-cy="setting-value"
        value={fields.values.serverHost}
        fluid
        label="Adres serwera obsługującego skaner"
        onChange={(__, { value }) => handleChange('serverHost', value)}
      />
      <Form.Input
        data-cy="setting-value"
        value={fields.values.serverPort}
        fluid
        label="Port"
        onChange={(__, { value }) => handleChange('serverPort', value)}
      />
      <Button
        data-cy="setting-save"
        onClick={() => {
          dispatch(
            actions.update({ name: 'serverHost', value: fields.values.serverHost })
          )
          dispatch(
            actions.update({ name: 'serverPort', value: fields.values.serverPort })
          )
        }}
        positive
      >
        Zapisz
      </Button>
    </Form>
  )
}

const Settings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.list())
  }, [dispatch])

  const { serverHost, serverPort } = useSelector(selectors.all)

  return (
    <>
      <Header data-cy="settings-list" as="h2">
        <Icon name="group" />
        <Header.Content>
          Ustawienia
          <Header.Subheader>Konfiguracja systemu</Header.Subheader>
        </Header.Content>
      </Header>
      {serverHost && <SettingsEdit {...{ serverHost, serverPort }} />}
    </>
  )
}

export default Settings
