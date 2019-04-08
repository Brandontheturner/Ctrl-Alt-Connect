import React from 'react'
import { Form, Label } from 'semantic-ui-react'

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
          error={error}
        />
      ) : (
        <Form.Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
        />
      )}
      {label && (
        <Label basic size="small">
          {label}
        </Label>
      )}
    </>
  )
}

export default FormInput
