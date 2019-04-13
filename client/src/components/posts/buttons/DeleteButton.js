import React from 'react'
import { Button } from 'semantic-ui-react'

const LikeButton = ({ deleteItem }) => (
  <Button
    basic
    color="red"
    icon="times"
    compact
    circular
    size="tiny"
    floated="right"
    onClick={deleteItem}
  />
)

export default LikeButton
