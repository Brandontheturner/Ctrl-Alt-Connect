import React, { Component } from 'react'
import { Header, Segment, Image, Icon, Container } from 'semantic-ui-react'
import isEmpty from '../../validation/is-empty'
import './css/Profile.css'

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props
    return (
      <Segment
        inverted
        color="blue"
        textAlign="center"
        className="profile-header"
      >
        <Image src={profile.user.avatar} circular centered size="small" />
        <Header inverted size="huge" style={{ fontWeight: '200' }}>
          {profile.user.name}
          <Header.Subheader>
            {profile.status}{' '}
            {isEmpty(profile.company) ? null : (
              <span> at {profile.company}</span>
            )}
          </Header.Subheader>
          <Header.Subheader>
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </Header.Subheader>
        </Header>
        <Container className="social-links">
          {isEmpty(profile.website) ? null : (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              <Icon name="globe" />
            </a>
          )}
          {isEmpty(profile.social && profile.social.twitter) ? null : (
            <a
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="twitter" />
            </a>
          )}
          {isEmpty(profile.social && profile.social.facebook) ? null : (
            <a
              href={profile.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="facebook" />
            </a>
          )}
          {isEmpty(profile.social && profile.social.instagram) ? null : (
            <a
              href={profile.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" />
            </a>
          )}
          {isEmpty(profile.social && profile.social.linkedin) ? null : (
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="linkedin" />
            </a>
          )}
          {isEmpty(profile.social && profile.social.youtube) ? null : (
            <a
              href={profile.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="youtube" />
            </a>
          )}
        </Container>
      </Segment>
    )
  }
}

export default ProfileHeader
