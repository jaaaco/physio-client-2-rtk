import React, { useEffect, useState } from 'react'
import { Button, Form, Header, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from './_redux'

const SettingsEdit = ({ serverHost }) => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    values: {
      serverHost
    }
  })

  useEffect(() => {
    setFields({ values: { serverHost } })
  }, [serverHost])

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
      <Button
        data-cy="setting-save"
        onClick={() =>
          dispatch(
            actions.update({ name: 'serverHost', value: fields.values.serverHost })
          )
        }
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

  const { serverHost } = useSelector(selectors.all)

  return (
    <>
      <Header data-cy="settings-list" as="h2">
        <Icon name="group" />
        <Header.Content>
          Ustawienia
          <Header.Subheader>Konfiguracja systemu</Header.Subheader>
        </Header.Content>
      </Header>
      {serverHost && <SettingsEdit {...{ serverHost }} />}
    </>
  )
}

export default Settings
