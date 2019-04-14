import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import FormInput from '../shared/form/FormInput'

class ChangeUsername extends Component {
  state = { oldPassword: '', newPassword: '', newPassword2: '', errors: {} }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = () => console.log('update password submit')

  render() {
    const { errors } = this.state
    return (
      <Form onSubmit={this.handleSubmit} error noValidate>
        <FormInput
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          value={this.state.oldPassword}
          onChange={this.handleChange}
          disabled={false}
          error={errors.password}
        />
        <FormInput
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={this.state.newPassword}
          onChange={this.handleChange}
          disabled={false}
          error={errors.password}
        />
        <FormInput
          name="newPassword2"
          type="password"
          placeholder="Confirm new Password"
          value={this.state.newPassword2}
          onChange={this.handleChange}
          disabled={false}
          error={errors.password}
        />
        <Form.Button
          primary
          compact
          content="Update your password"
          type="submit"
        />
      </Form>
    )
  }
}

export default ChangeUsername
