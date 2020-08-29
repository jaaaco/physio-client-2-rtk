import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import {
  actions
} from './_redux'

const ScanComment = ({ scan }) => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    values: scan
  })
  const [changed, setChanged] = useState(false)

  const handleChange = async (field, value) => {
    setFields(state => ({
      values: { ...state.values, [field]: value }
    }))
  }

  useEffect(() => {
    if (fields.values.comment !== scan.comment) {
      setChanged(true)
    }
  }, [fields])

  const handleSubmit = () => {
    dispatch(
      actions.update(fields.values)
    )
    setChanged(false)
  }

  return (
    <Form>
      <Form.TextArea
        data-cy='comment'
        value={fields.values.comment}
        label=''
        placeholder='Zapisz notatkę do badania'
        onChange={(__, data) => handleChange('comment', data.value)}
      />
      {changed &&
      (
        <Button.Group>
          <Button onClick={handleSubmit} positive>
            Zapisz
          </Button>
          <Button.Or text='lub' />
          <Button onClick={() => {
            setFields({ values: { ...fields.values, comment: scan.comment } })
            setChanged(false)
          }}
          >
            Anuluj
          </Button>
        </Button.Group>
      )}
    </Form>
  )
}

export default ScanComment
