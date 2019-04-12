import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AnimatedText from './AnimatedText'
import './css/landing.css'

const Landing = ({ auth, history }) => {
  if (auth.isAuthenticated) history.push('/dashboard')
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner">
        <Container textAlign="center">
          <Header
            className="font-major-mono landing-header animated-fade-in"
            inverted
          >
            <span className="font-source-code-pro">Ctrl + Alt + </span>
            <AnimatedText strings={['coNnect']} />
            <Header.Subheader className="landing-subheader animated-fade-in-delayed font-source-code-pro">
              A social network for software developers
            </Header.Subheader>
          </Header>

          <Container className="animated-fade-in-delayed">
            <Button
              as={Link}
              to="/register"
              primary
              content="Sign Up"
              size="large"
              compact
              style={{ margin: '0 1rem 0 1rem' }}
            />
            <Button
              as={Link}
              to="/login"
              content="Login"
              size="large"
              compact
            />
          </Container>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)
