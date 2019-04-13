import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import BackToDevelopers from '../shared/buttons/BackToDevelopers'
import {
  getProfileByHandle,
  getProfileByUserId
} from '../../actions/profileActions'
import { Container, Segment } from 'semantic-ui-react'

class Profile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params
    const { userId } = this.props.match.params
    if (handle) {
      this.props.getProfileByHandle(handle)
    } else if (userId) {
      this.props.getProfileByUserId(userId)
    }
  }

  componentWillReceiveProps({ profile: { profile } }) {
    if (profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found')
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
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </>
      )
    }

    return (
      <Container>
        <BackToDevelopers />
        <Segment loading={profile === null || loading}>
          {profileContent}
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ({ profile }) => ({ profile })

export default connect(
  mapStateToProps,
  { getProfileByHandle, getProfileByUserId }
)(Profile)
