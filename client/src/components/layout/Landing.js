import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'

const Landing = ({ auth, history }) => {
  if (auth.isAuthenticated) history.push('/dashboard')
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner">
        <Container textAlign="center">
          <h1>Developer Connector</h1>
          <p>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <Button as={Link} to="/register" primary>
            Sign Up
          </Button>
          <Button as={Link} to="/login">
            Login
          </Button>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)
