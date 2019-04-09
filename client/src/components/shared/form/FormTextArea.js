import React from 'react'
import { Form, Label, Message } from 'semantic-ui-react'
import '../css/Forms.css'

const FormInput = ({
  name,
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
      <Form.TextArea
        name={name}
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
