import React from 'react'
import { Form, Label, Message } from 'semantic-ui-react'

const FormInput = ({
  name,
  type,
  placeholder,
  icon,
  iconPosition,
  label,
  value,
  onChange,
  error
}) => {
  return (
    <>
      {icon ? (
        <Form.Input
          name={name}
          type={type}
          placeholder={placeholder}
          icon={icon}
          iconPosition={iconPosition}
          value={value}
          onChange={onChange}
          error={!!error}
        />
      ) : (
        <Form.Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={!!error}
        />
      )}
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
