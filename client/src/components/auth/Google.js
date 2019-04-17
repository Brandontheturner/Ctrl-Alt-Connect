import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

const googleClientId =
  '287701446117-vff8h0nn0gaabm9514qoanb8s9049huc.apps.googleusercontent.com'

class Google extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: googleClientId,
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          let user = this.auth.currentUser.get()
          let profile = user.getBasicProfile()
        })
    })
  }

  render() {
    return (
      <Form>
        <Form.Button
          onClick={() => this.auth.signIn()}
          fluid
          content="Continue with Google"
          color="google plus"
          icon="google"
        />
      </Form>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Google)
