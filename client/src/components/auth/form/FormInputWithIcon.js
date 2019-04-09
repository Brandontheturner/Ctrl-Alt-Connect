import React from 'react'
import { Form, Label, Message } from 'semantic-ui-react'

const FormInput = ({
  name,
  type,
  placeholder,
  icon,
  iconPosition,
  info,
  label,
  value,
  disabled,
  onChange,
  error
}) => {
  return (
    <>
      <Form.Input
        name={name}
        type={type}
        placeholder={placeholder}
        icon={icon}
        iconPosition={iconPosition}
        value={value}
        label={label}
        disabled={disabled}
        onChange={onChange}
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
