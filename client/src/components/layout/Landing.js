import React from 'react'
import { Button, Container } from 'semantic-ui-react'

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner">
        <Container textAlign="center">
          <h1>Developer Connector</h1>
          <p>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <Button primary>Sign Up</Button>
          <Button>Login</Button>
        </Container>
      </div>
    </div>
  )
}

export default Landing
