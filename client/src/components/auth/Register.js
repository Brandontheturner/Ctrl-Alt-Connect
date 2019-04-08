import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { Form, Container, Header } from 'semantic-ui-react'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = () => {
    const { name, email, password, password2 } = this.state
    const newUser = { name, email, password, password2 }
    this.props.registerUser(newUser)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard')
  }

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors })
  }

  render() {
    const { errors } = this.state
    return (
      <Container text>
        <Header as="h1" textAlign="center">
          Sign Up
          <Header.Subheader>Create your DevConnector account</Header.Subheader>
        </Header>
        <Form onSubmit={this.handleSubmit} error noValidate>
          <Form.Input
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            disabled={false}
            error={errors.name}
          />
          <Form.Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            disabled={false}
            error={errors.email}
          />
          <Form.Input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            disabled={false}
            error={errors.password}
          />
          <Form.Input
            name="password2"
            type="password"
            placeholder="Confirm Password"
            value={this.state.password2}
            onChange={this.handleChange}
            disabled={false}
            error={errors.password2}
          />
          <Form.Button fluid primary content="Submit" type="submit" />
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
  { registerUser }
)(Register)
