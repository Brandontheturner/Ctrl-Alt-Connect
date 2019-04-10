import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Header,
  Image,
  Grid,
  List,
  Segment,
  Icon
} from 'semantic-ui-react'
import isEmpty from '../../validation/is-empty'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    return (
      <Segment>
        <Grid columns={3} stackable>
          <Grid.Column width={2}>
            <Image src={profile.user.avatar} circular bordered size="tiny" />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as={'h2'}>
              {profile.user.name}
              <Header.Subheader>
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span> at {profile.company}</span>
                )}
              </Header.Subheader>
              <Header.Subheader>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </Header.Subheader>
            </Header>
            <Button
              as={Link}
              to={`/profile/${profile.handle}`}
              primary
              content="View Profile"
            />
          </Grid.Column>
          <Grid.Column width={4} only="computer tablet">
            <Header as={'h2'}>Skill Set</Header>
            <List relaxed divided size="large">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <List.Item key={index}>
                  <Icon name="check" color="green" />
                  <List.Content>{skill}</List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default ProfileItem
