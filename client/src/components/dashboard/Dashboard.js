import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import { getCurrentProfile } from '../../actions/profileActions'
import ProfileControl from './ProfileControl'
import Experience from './Experience'
import Education from './Education'
import PageHeader from '../shared/pages/PageHeader'
import UserPosts from './UserPosts'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, profileLoading } = this.props.profile

    let dashboardContent

    if (profile === null || profileLoading) {
      dashboardContent = null
    } else {
      // Check for empty profile before attempting to render
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <>
            <Header
              as={Link}
              to={`/profile/handle/${profile.handle}`}
              content={`Welcome ${user.name}!`}
              color="blue"
              subheader="Click your name to view your profile or any of the buttons below to edit it"
            />
            <ProfileControl />

            <Header inverted attached="top" content="Experience" />
            <Experience experience={profile.experience} />

            <Header inverted attached="top" content="Education" />
            <Education education={profile.education} />
          </>
        )
      } else {
        dashboardContent = (
          <>
            <Header
              content={`Welcome ${user.name}!`}
              subheader="You have not yet setup a profile, click the button below to
                share some info!"
            />
            <Button
              primary
              as={Link}
              to="/create-profile"
              content="Create Profile"
            />
          </>
        )
      }
    }

    return (
      <>
        <PageHeader content="Dashboard" />
        <Segment attached="bottom" loading={profile === null || profileLoading}>
          {dashboardContent}
          <Header inverted attached="top" content="My Recent Posts" />
          <UserPosts />
        </Segment>
      </>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => ({ auth, profile })

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
