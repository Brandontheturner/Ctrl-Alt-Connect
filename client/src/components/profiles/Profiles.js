import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import { getProfiles } from '../../actions/profileActions'
import Spinner from '../shared/loaders/Standard'

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles()
  }

  render() {
    const { profiles, loading } = this.props.profile
    let profileItems

    if (profiles === null || loading) {
      profileItems = <Spinner />
    } else {
      if (profiles.length) {
        profileItems = <Header>PROFILES HERE</Header>
      } else {
        profileItems = <Header>There are currently no profiles...</Header>
      }
    }

    return (
      <Container text>
        <Header as="h1" textAlign="center">
          Developer Profiles
          <Header.Subheader>
            Browse and connect with other developers!
          </Header.Subheader>
        </Header>
        {profileItems}
      </Container>
    )
  }
}

const mapStateToProps = ({ profile }) => ({ profile })

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles)
