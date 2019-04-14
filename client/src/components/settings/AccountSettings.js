import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment, List } from 'semantic-ui-react'
import { getCurrentProfile } from '../../actions/profileActions'
import PageHeader from '../shared/pages/PageHeader'
import ChangeUsername from './ChangeUsername'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
import './css/overrides.css'

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
          <List divided relaxed>
            {/* CHANGE USERNAME SECTION */}
            <Header content="Change User Handle" />
            <List.Item>
              <List.Content>
                <ChangeUsername />
              </List.Content>
            </List.Item>

            {/* UPDATE PASSWORD SECTION */}
            <Header content="Update Password" />
            <List.Item>
              <UpdatePassword />
            </List.Item>

            {/* DELETE ACCOUNT SECTION */}
            <Header content="Delete Account" color="red" />
            <List.Item>
              <List.Description>
                Deleting you're account cannot be undone. Please be certain
                before doing so.
              </List.Description>
              <List.Content>
                <DeleteAccount />
              </List.Content>
            </List.Item>
          </List>
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
