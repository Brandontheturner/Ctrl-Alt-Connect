import React, { Component } from 'react'
import { Button, Form, Container, Message, Header } from 'semantic-ui-react'
import db from '../../api/db'

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
    db.post('/api/users/login', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    const { errors } = this.state
    return (
      <Container text style={{ padding: '2rem' }}>
        <Header textAlign="center">
          <h1>Login</h1>
          <p>Sign in your DevConnector account</p>
        </Header>
        <Form onSubmit={this.handleSubmit} error>
          <Form.Field>
            <Form.Input
              error={!!errors.email}
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Message error content={errors.email} />
          </Form.Field>
          <Form.Field>
            <Form.Input
              error={!!errors.password}
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Message error content={errors.password} />
          </Form.Field>
          <Button fluid primary type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

export default Login
