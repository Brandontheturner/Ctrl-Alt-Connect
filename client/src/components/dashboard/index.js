import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader, Button } from 'semantic-ui-react'
import { getCurrentProfile } from '../../actions/profileActions'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Loader active inline="centered" content="Loading" />
    } else {
      // Check for empty profile before attempting to render
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h3>TODO: DISPLAY PROFILE</h3>
      } else {
        dashboardContent = (
          <>
            <h3>Welcome {user.name}!</h3>
            <p>You have not yet setup a profile, please add some info.</p>
            <Button primary as={Link} to="/create-profile">
              Create Profile
            </Button>
          </>
        )
      }
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {dashboardContent}
      </div>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => ({ auth, profile })

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
