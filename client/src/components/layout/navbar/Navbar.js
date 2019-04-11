import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/authActions'
import { clearCurrentProfile } from '../../../actions/profileActions'
import UserDropdown from './UserDropdown'
import './css/overrides.css'

class Navbar extends Component {
  handleLogoutClick = () => {
    this.props.logoutUser()
    this.props.clearCurrentProfile()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const adminLinks = (
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/dashboard"
          name="dashboard"
          content="Dashboard"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/feed"
          name="feed"
          content="Post Feed"
          onClick={this.handleItemClick}
        />
        <Menu.Item>
          <UserDropdown user={user} logout={this.handleLogoutClick} />
        </Menu.Item>
      </Menu.Menu>
    )
    const guestLinks = (
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/register"
          name="signup"
          onClick={this.handleItemClick}
        >
          Sign Up
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/login"
          name="login"
          onClick={this.handleItemClick}
        >
          Login
        </Menu.Item>
      </Menu.Menu>
    )

    return (
      <Menu inverted attached className="main-nav">
        <Container>
          <Menu.Item
            header
            as={Link}
            to="/"
            name="home"
            onClick={this.handleItemClick}
          >
            DevConnector
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/profiles"
            name="developers"
            onClick={this.handleItemClick}
          >
            Developers
          </Menu.Item>

          {isAuthenticated ? adminLinks : guestLinks}
        </Container>
      </Menu>
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
