import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import FormTextField from '../shared/FormTextField'

class CreateProfile extends Component {
  state = {
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {},
    displaySocial: false
  }

  render() {
    const { errors } = this.state
    return (
      <Container text>
        <Header as="h1" textAlign="center">
          Create Profile
          <Header.Subheader>
            Let's get some information to make your profile stand out
          </Header.Subheader>
        </Header>

        <Form onSubmit={this.handleSubmit} error noValidate>
          <FormTextField
            name="email"
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            disabled={false}
            error={errors.email}
          />
          <Button fluid primary type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = ({ profile, errors }) => ({ profile, errors })

export default connect(null)(CreateProfile)
