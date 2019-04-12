import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Accordion } from 'semantic-ui-react'
import isEmpty from '../../utils/isEmpty'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    const skills = profile.skills
      .slice(0, 4)
      .map((skill, index) => ({ key: index, text: skill, value: skill }))
    return (
      <Item>
        <Item.Image src={profile.user.avatar} circular bordered size="tiny" />
        <Item.Content>
          <Item.Header>{profile.user.name}</Item.Header>
          <Item.Meta>
            {profile.status}{' '}
            {isEmpty(profile.company) ? null : (
              <span> at {profile.company}</span>
            )}
          </Item.Meta>
          <Item.Description>
            {/* <Accordion content={skills} icon="dropdown" /> */}
          </Item.Description>
          <Item.Extra>
            <Button
              as={Link}
              to={`/profile/${profile.handle}`}
              primary
              content="View Profile"
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default ProfileItem
