import React, { Component } from 'react'
import { Form, Message } from 'semantic-ui-react'
import FormInput from '../shared/form/FormInput'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/authActions'

class ChangeUsername extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    errors: {},
    success: false
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = () => {
    this.props.changePassword({
      userId: this.props.auth.user.id,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2
    })
    this.setState({
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      success: true
    })
  }

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors })
  }

  render() {
    const { errors } = this.state
    return (
      <Form onSubmit={this.handleSubmit} error success>
        <FormInput
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          value={this.state.oldPassword}
          onChange={this.handleChange}
          disabled={false}
          error={errors.oldPassword}
        />
        <FormInput
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={this.state.newPassword}
          onChange={this.handleChange}
          disabled={false}
          error={errors.newPassword}
        />
        <FormInput
          name="newPassword2"
          type="password"
          placeholder="Confirm new Password"
          value={this.state.newPassword2}
          onChange={this.handleChange}
          disabled={false}
          error={errors.newPassword2}
        />
        {this.state.success && (
          <Message success content="Password changed successfully" />
        )}
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

const mapStateToProps = ({ auth, errors }) => ({ auth, errors })

export default connect(
  mapStateToProps,
  { changePassword }
)(ChangeUsername)
