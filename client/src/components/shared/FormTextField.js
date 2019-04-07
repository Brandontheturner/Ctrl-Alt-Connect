import React from 'react'
import { Form, Message } from 'semantic-ui-react'

const FormTextField = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled
}) => {
  return (
    <Form.Field>
      <Form.Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={!!error}
      />
      <Message error content={error} />
    </Form.Field>
  )
}

export default FormTextField
