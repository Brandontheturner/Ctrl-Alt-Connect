import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Image } from 'semantic-ui-react'

class DropdownImageTriggerExample extends Component {
  render() {
    const { user } = this.props
    const trigger = (
      <span>
        <Image avatar src={user.avatar} /> {user.name}
      </span>
    )
    return (
      <Dropdown trigger={trigger} pointing="top right">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            text="Sign Out"
            icon="log out"
            onClick={this.props.logout}
          />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default DropdownImageTriggerExample
