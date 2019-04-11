import React from 'react'
import { Segment, Header, Icon } from 'semantic-ui-react'
import BackToDashboard from '../buttons/BackToDashboard'

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="meh outline" />
        Page not found
      </Header>
      <Segment.Inline>
        <BackToDashboard />
      </Segment.Inline>
    </Segment>
  )
}

export default NotFound
