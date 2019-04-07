import React from 'react'
import { Form, Message } from 'semantic-ui-react'

const FormTextArea = ({ name, placeholder, value, error, onChange }) => {
  return (
    <Form.Field>
      <Form.TextArea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={!!error}
      />
      <Message error content={error} />
    </Form.Field>
  )
}

export default FormTextArea
