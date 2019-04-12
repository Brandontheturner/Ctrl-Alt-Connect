import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { getCurrentProfile } from '../../actions/profileActions'
import PageHeader from '../shared/pages/PageHeader'
import DeleteAccountButton from './DeleteAccountButton'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { profile, loading } = this.props.profile

    return (
      <>
        <PageHeader content="Account Settings" />
        <Segment attached="bottom" loading={profile === null || loading}>
          <Header content="Danger Zone" attached="top" inverted />
          <Segment attached="bottom">
            <DeleteAccountButton />
          </Segment>
        </Segment>
      </>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => ({ auth, profile })

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
