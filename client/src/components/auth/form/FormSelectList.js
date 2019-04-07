import React from 'react'
import { Form, Message } from 'semantic-ui-react'

const FormSelectList = ({ name, value, options, error, onChange }) => {
  const selectOptions = options.map(option => ({
    key: option.label,
    text: option.value,
    value: option.value
  }))
  return (
    <Form.Field>
      <Form.Select
        name={name}
        value={value}
        option={selectOptions}
        onChange={onChange}
        error={!!error}
      />
      <Message error content={error} />
    </Form.Field>
  )
}

export default FormSelectList
