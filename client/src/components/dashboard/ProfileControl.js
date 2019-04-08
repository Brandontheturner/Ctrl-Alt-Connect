import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import DeleteAccountButton from './DeleteAccountButton'

const ProfileControl = () => {
  return (
    <>
      <Button.Group>
        <Button
          as={Link}
          to="/edit-profile"
          content="Edit Profile"
          icon="user circle"
          labelPosition="left"
        />
        <Button
          as={Link}
          to="/add-experience"
          content="Add Experience"
          icon="briefcase"
          labelPosition="left"
        />
        <Button
          as={Link}
          to="/add-education"
          content="Add Education"
          icon="graduation cap"
          labelPosition="left"
        />
      </Button.Group>
      {/* TODO EXP & EDU SECTIONS */}
      <DeleteAccountButton />
    </>
  )
}

export default ProfileControl
