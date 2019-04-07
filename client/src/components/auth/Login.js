import React, { Component } from 'react'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import FormTextField from '../shared/FormTextField'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = () => {
    const { email, password } = this.state
    const user = { email, password }
    this.props.loginUser(user)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard')
  }

  componentWillReceiveProps({ errors, auth }) {
    if (auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
    if (errors) this.setState({ errors })
  }

  render() {
    const { errors } = this.state
    return (
      <Container text>
        <Header textAlign="center">
          <h1>Login</h1>
          <p>Sign in your DevConnector account</p>
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
          <FormTextField
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            disabled={false}
            error={errors.password}
          />
          <Button fluid primary type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)
