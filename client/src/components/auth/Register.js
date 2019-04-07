import React, { Component } from 'react'
import { Button, Form, Container, Message, Header } from 'semantic-ui-react'
import db from '../../api/db'

class Login extends Component {
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
    db.post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    const { errors } = this.state
    return (
      <Container text style={{ padding: '2rem' }}>
        <Header textAlign="center">
          <h1>Sign Up</h1>
          <p>Create your DevConnector account</p>
        </Header>
        <Form onSubmit={this.handleSubmit} error>
          <Form.Field>
            <Form.Input
              error={!!errors.name}
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Message error content={errors.name} />
          </Form.Field>
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
          <Form.Field>
            <Form.Input
              error={!!errors.password2}
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.handleChange}
            />
            <Message error content={errors.password2} />
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
