import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { Form, Container, Segment, Divider } from 'semantic-ui-react'
import Google from './Google'
import FormInput from '../shared/form/FormInput'
import FormHeader from '../shared/form/FormHeader'

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
        <FormHeader
          content="Sign Up"
          subheader="Register an account with Ctrl+Alt+Connect"
        />
        <Segment attached="bottom">
          <Google />
          <Divider horizontal>or</Divider>
          <Form onSubmit={this.handleSubmit} error noValidate>
            <FormInput
              name="name"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
              disabled={false}
              error={errors.name}
            />
            <FormInput
              name="email"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleChange}
              disabled={false}
              error={errors.email}
            />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              disabled={false}
              error={errors.password}
            />
            <FormInput
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
          <Divider />
          <>
            Already have an account?
            <Link to="/login" style={{ fontWeight: 'bold' }}>
              {' '}
              Log In
            </Link>
          </>
        </Segment>
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
