import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteAccount } from '../../actions/profileActions'

class DeleteAccountButton extends Component {
  state = { open: false, confirmed: false }

  show = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ confirmed: true, open: false })
  handleCancel = () => this.setState({ open: false })

  render() {
    const { open, confirmed } = this.state
    if (confirmed) {
      this.props.deleteAccount()
    }

    return (
      <div>
        <Button negative content="Delete Account" onClick={this.show} />
        <Confirm
          open={open}
          content="Are you sure you want to delete your account? This CANNOT be undone!"
          cancelButton="Never Mind"
          confirmButton="Confirm"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { deleteAccount }
)(DeleteAccountButton)
