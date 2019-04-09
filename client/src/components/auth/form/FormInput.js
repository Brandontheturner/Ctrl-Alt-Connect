import React from 'react'
import { Form, Label, Message } from 'semantic-ui-react'

const FormInput = ({
  name,
  type,
  placeholder,
  info,
  label,
  value,
  onChange,
  disabled,
  error
}) => {
  return (
    <>
      <Form.Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}
        error={!!error}
      />
      {error && <Message error content={error} size="mini" />}
      {info && (
        <Label basic size="small">
          {info}
        </Label>
      )}
    </>
  )
}

export default FormInput
