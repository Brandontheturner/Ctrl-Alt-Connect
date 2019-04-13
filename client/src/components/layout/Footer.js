import React from 'react'
import { Segment } from 'semantic-ui-react'

const Footer = () => {
  return (
    <div>
      <Segment attached="bottom" inverted textAlign="center">
        Copyright &copy; {new Date().getFullYear()} Ctrl+Alt+Connect
      </Segment>
    </div>
  )
}

export default Footer
