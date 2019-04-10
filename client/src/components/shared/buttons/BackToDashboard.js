import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const GoBack = () => {
  return (
    <Button
      as={Link}
      to="/dashboard"
      content="Dashboard"
      icon="angle left"
      labelPosition="left"
      compact
    />
  )
}

export default GoBack
