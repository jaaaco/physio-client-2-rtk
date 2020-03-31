import { Message } from 'semantic-ui-react'
import React from 'react'
import _ from 'lodash'
import validator from 'validator'

class Validator {
  constructor (schema) {
    this.schema = schema
  }

  async validate (data) {
    const errors = {}
    const keys = _.keys(this.schema)
    for (let i = 0; i < keys.length; i++) {
      const testResults = []
      for (let t = 0; t < this.schema[keys[i]].length; t++) {
        const testResult = await this.test(
          this.schema[keys[i]][t].test,
          data[keys[i]],
          data
        )
        if (!testResult || (_.isObject(testResult) && !testResult.result)) {
          testResults.push(
            _.isObject(testResult) && testResult.message
              ? testResult.message
              : this.schema[keys[i]][t].message
          )
        }
      }
      if (testResults.length) {
        errors[keys[i]] = testResults[0]
      }
    }
    return errors
  }

  async test (
    test,
    value,
    data
  ) {
    if (_.isFunction(test)) {
      const result = await test(value, data)
      return result
    }
    return (validator[test])(value)
  }
}

const ValidatorMessage = ({ errors }) => (
  <>
    {!!Object.keys(errors).length && (
      <Message negative>
        <Message.Header data-cy="validation-error-message">
          Formularz zawiera błędy
        </Message.Header>
        <ul>
          {Object.values(errors).map(error => (
            <li>{error}</li>
          ))}
        </ul>
      </Message>
    )}
  </>
)

export { Validator, ValidatorMessage }
