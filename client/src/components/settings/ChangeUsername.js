import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import FormInput from '../shared/form/FormInput'

class ChangeUsername extends Component {
  state = { newUsername: '', errors: {} }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = () => console.log('update password submit')

  render() {
    const { errors } = this.state
    return (
      <Form onSubmit={this.handleSubmit} error noValidate>
        <FormInput
          name="newUsername"
          type="text"
          placeholder="New User Handle"
          value={this.state.newUsername}
          onChange={this.handleChange}
          disabled={false}
          error={errors.password}
        />

        <Form.Button
          primary
          compact
          content="Change your handle"
          type="submit"
        />
      </Form>
    )
  }
}

export default ChangeUsername
