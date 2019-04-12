import React from 'react'
import { Header } from 'semantic-ui-react'

const FormHeader = ({ content, subheader }) => {
  return (
    <Header
      as="h1"
      textAlign="center"
      content={content}
      subheader={subheader}
      inverted
      attached="top"
    />
  )
}

export default FormHeader
