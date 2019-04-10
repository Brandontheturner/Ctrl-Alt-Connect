import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { getCurrentProfile } from '../../actions/profileActions'
import DeleteAccountButton from './DeleteAccountButton'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { profile, loading } = this.props.profile

    return (
      <Segment loading={profile === null || loading}>
        <Header as={'h1'}>Account Settings</Header>
        <DeleteAccountButton />
      </Segment>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => ({ auth, profile })

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
