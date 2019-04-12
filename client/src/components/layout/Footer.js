import React from 'react'
import { Segment } from 'semantic-ui-react'

const Footer = () => {
  return (
    <div>
      <Segment attached="bottom" inverted textAlign="center">
        Copyright &copy; {new Date().getFullYear()} My App
      </Segment>
    </div>
  )
}

export default Footer
