import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment, List } from 'semantic-ui-react'
import { getCurrentProfile } from '../../actions/profileActions'
import PageHeader from '../shared/pages/PageHeader'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
import './css/overrides.css'

class AccountSettings extends Component {
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

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors
})

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(AccountSettings)
