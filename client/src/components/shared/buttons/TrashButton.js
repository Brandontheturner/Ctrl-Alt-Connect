import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class TrashButton extends Component {
  state = { open: false, confirmed: false }

  show = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ confirmed: true, open: false })
  handleCancel = () => this.setState({ open: false })

  render() {
    const { open, confirmed } = this.state
    const { action, item } = this.props

    if (confirmed) action()

    return (
      <>
        <Button
          icon="trash alternate outline"
          basic
          negative
          compact
          circular
          size="tiny"
          floated="right"
          onClick={this.show}
        />
        <Confirm
          open={open}
          size="mini"
          header={`Delete ${item}`}
          content={`Are you sure?`}
          cancelButton={{ content: 'Never mind', compact: true }}
          confirmButton={{ content: 'Yes', compact: true }}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </>
    )
  }
}

export default TrashButton
