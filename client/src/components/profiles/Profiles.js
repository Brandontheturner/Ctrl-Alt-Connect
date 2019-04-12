import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Item, Header, Segment } from 'semantic-ui-react'
import { getProfiles } from '../../actions/profileActions'
import ProfileItem from './ProfileItem'
import PageHeader from '../shared/pages/PageHeader'

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
          <Item.Group divided>
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
        <PageHeader
          content="Developer Profiles"
          subheader="Browse and connect with other developers!"
        />
        <Segment attached="bottom" loading={profiles === null || loading}>
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
