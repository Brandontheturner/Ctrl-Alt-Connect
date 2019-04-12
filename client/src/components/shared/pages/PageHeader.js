import React from 'react'
import { Header } from 'semantic-ui-react'

const PageHeader = ({ content, subheader }) => {
  return (
    <Header
      as={'h1'}
      content={content}
      subheader={subheader}
      attached="top"
      inverted
    />
  )
}

export default PageHeader
