import React, { Component } from 'react'
import { Segment, Header, List, Icon } from 'semantic-ui-react'
import isEmpty from '../../utils/isEmpty'

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props

    const firstName = profile.user.name.split(' ')[0]

    return (
      <>
        <Header
          content={`About ${firstName}`}
          color="blue"
          textAlign="center"
          size="large"
        />
        <Header content="Bio" attached="top" inverted />
        <Segment attached="bottom">
          <Header.Subheader
            content={
              isEmpty(profile.bio)
                ? `${firstName} does not have a bio yet`
                : profile.bio
            }
          />
        </Segment>

        <Header content="Skill Set" attached="top" inverted />
        <Segment attached="bottom">
          <List horizontal relaxed divided>
            {profile.skills.map((skill, index) => (
              <List.Item key={index}>
                <Icon name="check" color="green" /> {skill}
              </List.Item>
            ))}
          </List>
        </Segment>
      </>
    )
  }
}

export default ProfileAbout
