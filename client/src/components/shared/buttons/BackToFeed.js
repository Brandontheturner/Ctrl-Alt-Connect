import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const GoBack = () => {
  return (
    <Button
      as={Link}
      to="/feed"
      content="Feed"
      icon="angle left"
      labelPosition="left"
      basic
      compact
    />
  )
}

export default GoBack
