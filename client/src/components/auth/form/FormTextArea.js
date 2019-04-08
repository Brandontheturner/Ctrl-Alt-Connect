import React from 'react'
import { Form, Label, Message } from 'semantic-ui-react'

const FormInput = ({
  name,
  type,
  placeholder,
  label,
  value,
  onChange,
  error
}) => {
  return (
    <>
      <Form.TextArea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={!!error}
      />
      {error && <Message error content={error} size="mini" />}
      {label && (
        <Label basic size="small">
          {label}
        </Label>
      )}
    </>
  )
}

export default FormInput
