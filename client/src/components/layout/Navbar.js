import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container, Segment } from 'semantic-ui-react'

class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment attached inverted>
        <Menu inverted pointing secondary>
          <Container>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            >
              DevConnector
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/profiles"
              name="developers"
              active={activeItem === 'developers'}
              onClick={this.handleItemClick}
            >
              Developers
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/register"
                name="signup"
                active={activeItem === 'signup'}
                onClick={this.handleItemClick}
              >
                Sign Up
              </Menu.Item>

              <Menu.Item
                as={Link}
                to="/login"
                name="login"
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
              >
                Login
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    )
  }
}

export default Navbar
