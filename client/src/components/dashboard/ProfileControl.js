import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

const ProfileControl = () => {
  return (
    <>
      <Button.Group compact basic style={{ marginTop: '10px' }}>
        <Button as={Link} to="/edit-profile" icon labelPosition="left">
          <Icon name="user" color="blue" />
          Edit Profile
        </Button>
        <Button as={Link} to="/add-experience" icon labelPosition="left">
          <Icon name="briefcase" color="blue" />
          Add Experience
        </Button>
        <Button as={Link} to="/add-education" icon labelPosition="left">
          <Icon name="graduation" color="blue" />
          Add Education
        </Button>
      </Button.Group>
    </>
  )
}

export default ProfileControl
