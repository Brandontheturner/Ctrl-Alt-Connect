import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, List, Icon } from 'semantic-ui-react'
import isEmpty from '../../utils/isEmpty'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    return (
      <Item>
        <Item.Image src={profile.user.avatar} circular bordered size="tiny" />
        <Item.Content>
          <Item.Description>
            <List floated="right" relaxed divided>
              <List.Item>
                <List.Header>Skill Set</List.Header>
              </List.Item>
              {profile.skills.slice(0, 4).map((skill, index) => (
                <List.Item key={index}>
                  <Icon name="check" color="green" />
                  <List.Content>
                    <List.Description>{skill}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Item.Description>
          <Item.Header>{profile.user.name}</Item.Header>
          <Item.Meta>
            {profile.status}{' '}
            {isEmpty(profile.company) ? null : (
              <span> at {profile.company}</span>
            )}
          </Item.Meta>
          <Item.Extra>
            <Button
              as={Link}
              to={`/profile/${profile.handle}`}
              primary
              content="View Profile"
              compact
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default ProfileItem
