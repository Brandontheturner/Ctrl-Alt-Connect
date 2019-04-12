import React from 'react'
import { Button } from 'semantic-ui-react'

const TrashButton = ({ size, handleClick }) => {
  return (
    <Button
      icon="trash alternate outline"
      basic
      negative
      compact
      circular
      size={size}
      onClick={handleClick}
    />
  )
}

export default TrashButton
