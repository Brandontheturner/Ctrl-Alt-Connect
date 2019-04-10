import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import BackToDevelopers from '../shared/buttons/BackToDevelopers'
import { getProfileByHandle } from '../../actions/profileActions'
import { Container, Segment } from 'semantic-ui-react'

class Profile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params
    if (handle) {
      this.props.getProfileByHandle(handle)
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    let profileContent
    if (profile === null || loading) {
      profileContent = null
    } else {
      profileContent = (
        <>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          <ProfileGithub profile={profile} />
        </>
      )
    }

    return (
      <Container>
        <BackToDevelopers />
        <Segment basic loading={profile === null || loading}>
          {profileContent}
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ({ profile }) => ({ profile })

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile)
