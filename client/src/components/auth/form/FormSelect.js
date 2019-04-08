import React from 'react'
import { Form, Label, Message } from 'semantic-ui-react'

const FormInput = ({
  name,
  type,
  placeholder,
  label,
  value,
  options,
  onChange,
  error
}) => {
  return (
    <>
      <Form.Select
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
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
