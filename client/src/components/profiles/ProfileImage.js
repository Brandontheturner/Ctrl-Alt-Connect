import React from 'react'
import { Link } from 'react-router-dom'
import { Item } from 'semantic-ui-react'

const ProfileImage = ({ to, src }) => {
  return <Item.Image as={Link} to={to} src={src} circular size="tiny" />
}

export default ProfileImage
