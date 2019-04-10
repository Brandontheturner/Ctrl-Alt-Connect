import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

const Landing = ({ auth, history }) => {
  if (auth.isAuthenticated) history.push('/dashboard')
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner">
        <Container textAlign="center">
          <Header inverted style={{ fontSize: '4rem', fontWeight: '200' }}>
            Developer Connector
          </Header>
          <p style={{ fontSize: '1.2rem' }}>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>

          <Button
            as={Link}
            to="/register"
            primary
            content="Sign Up"
            size="large"
            style={{ margin: '0 1rem 0 1rem' }}
          />
          <Button as={Link} to="/login" content="Login" size="large" />
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)
