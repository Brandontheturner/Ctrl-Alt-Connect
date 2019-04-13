import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, List, Icon } from 'semantic-ui-react'
import ProfileImage from './ProfileImage'
import isEmpty from '../../utils/isEmpty'
import './css/overrides.css'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    return (
      <Item>
        <ProfileImage
          to={`/profile/handle/${profile.handle}`}
          src={profile.user.avatar}
        />
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
              to={`/profile/handle/${profile.handle}`}
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
