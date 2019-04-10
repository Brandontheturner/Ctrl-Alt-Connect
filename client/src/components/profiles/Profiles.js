import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Item, Header, Segment } from 'semantic-ui-react'
import { getProfiles } from '../../actions/profileActions'
import ProfileItem from './ProfileItem'

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles()
  }

  render() {
    const { profiles, loading } = this.props.profile
    let profileItems

    if (profiles === null || loading) {
      profileItems = null
    } else {
      if (profiles.length) {
        profileItems = (
          <Item.Group>
            {profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </Item.Group>
        )
      } else {
        profileItems = <Header>There are currently no profiles...</Header>
      }
    }

    return (
      <Container>
        <Segment loading={profiles === null || loading}>
          <Header as="h1" textAlign="center">
            Developer Profiles
            <Header.Subheader>
              Browse and connect with other developers!
            </Header.Subheader>
          </Header>
          {profileItems}
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ({ profile }) => ({ profile })

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles)
