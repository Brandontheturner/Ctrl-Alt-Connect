import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container, Segment, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogoutClick = () => {
    this.props.logoutUser()
    this.props.clearCurrentProfile()
  }

  render() {
    const { activeItem } = this.state
    const { isAuthenticated, user } = this.props.auth

    const adminLinks = (
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/login"
          name="logout"
          active={activeItem === 'logout'}
          onClick={this.handleLogoutClick}
        >
          <Image src={user.avatar} style={{ marginRight: '10px' }} avatar />
          Logout
        </Menu.Item>
      </Menu.Menu>
    )
    const guestLinks = (
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
    )

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

            {isAuthenticated ? adminLinks : guestLinks}
          </Container>
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar)
