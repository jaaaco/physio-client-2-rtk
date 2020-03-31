import React from 'react'
import { Icon, Message } from 'semantic-ui-react'
import './index.css'

const removeFlashMessage = () => {}

const Flash = () => {
  // const flashes = useSelector(getFlashes);
  const flashes = false
  if (!flashes) {
    return null
  }

  const types = {
    info: { label: 'Informacja', icon: 'info' },
    success: { label: 'Sukces!', icon: 'check' },
    error: { label: 'Błąd!', icon: 'times' },
    warning: { label: 'Ostrzeżenie', icon: 'warning' }
  }

  return (
    <div className="Flash">
      {flashes.map(({ id, type, text }) => (
        <Message
          onDismiss={
            () => removeFlashMessage(id)
          }
          icon
          key={id}
          floating
          {...{ [type]: true }}
        >
          <Icon name={types[type].icon} />
          <Message.Content>
            <Message.Header>{types[type].label}</Message.Header>
            {text}
          </Message.Content>
        </Message>
      ))}
    </div>
  )
}

export default Flash
