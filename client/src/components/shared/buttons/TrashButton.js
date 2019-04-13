import React from 'react'
import { Button } from 'semantic-ui-react'

const TrashButton = ({ handleClick }) => {
  return (
    <Button
      icon="trash alternate outline"
      basic
      negative
      compact
      circular
      size="tiny"
      floated="right"
      onClick={handleClick}
    />
  )
}

export default TrashButton
