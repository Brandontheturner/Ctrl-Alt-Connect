import React from 'react'
import { Form, Label } from 'semantic-ui-react'

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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
      />
      {label && (
        <Label basic size="small">
          {label}
        </Label>
      )}
    </>
  )
}

export default FormInput
