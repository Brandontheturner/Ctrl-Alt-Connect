import React, { Component } from 'react'
import { Segment, Header, List, Icon } from 'semantic-ui-react'
import isEmpty from '../../validation/is-empty'

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props

    const firstName = profile.user.name.split(' ')[0]

    return (
      <Segment>
        <Segment vertical>
          <Header
            size="large"
            color="blue"
            textAlign="center"
            content={`${firstName}'s Bio`}
          />
          <Header.Subheader
            content={
              isEmpty(profile.bio)
                ? `${firstName} does not have a bio yet`
                : profile.bio
            }
            className="profile-bio"
          />
        </Segment>
        <Segment vertical>
          <Header
            size="large"
            color="blue"
            textAlign="center"
            content={`Skill Set`}
          />
          <List horizontal relaxed divided>
            {profile.skills.map((skill, index) => (
              <List.Item key={index}>
                <Icon name="check" color="green" /> {skill}
              </List.Item>
            ))}
          </List>
        </Segment>
      </Segment>
    )
  }
}

export default ProfileAbout
