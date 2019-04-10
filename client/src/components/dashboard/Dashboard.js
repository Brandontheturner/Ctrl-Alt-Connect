import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import { getCurrentProfile } from '../../actions/profileActions'
import ProfileControl from './ProfileControl'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = null
    } else {
      // Check for empty profile before attempting to render
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <>
            <Header as={'h4'}>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              !
            </Header>
            <ProfileControl />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
          </>
        )
      } else {
        dashboardContent = (
          <>
            <Header as={'h4'}>
              Welcome {user.name}!
              <Header.Subheader>
                You have not yet setup a profile, click the button below to
                share some info!
              </Header.Subheader>
            </Header>
            <Button primary as={Link} to="/create-profile">
              Create Profile
            </Button>
          </>
        )
      }
    }

    return (
      <Segment loading={profile === null || loading}>
        <Header as={'h1'}>Dashboard</Header>
        {dashboardContent}
      </Segment>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => ({ auth, profile })

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
