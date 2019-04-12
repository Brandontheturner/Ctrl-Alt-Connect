import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'
import { Segment, Header, Form } from 'semantic-ui-react'
import FormTextArea from '../shared/form/FormTextArea'

class PostForm extends Component {
  state = {
    text: '',
    errors: {}
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    const { user } = this.props.auth

    this.props.createPost({
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    })
  }

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors })
  }

  render() {
    return (
      <>
        <Header content="Create a Post" attached="top" inverted />
        <Segment attached="bottom">
          <Form onSubmit={this.handleSubmit} error>
            <FormTextArea
              name="text"
              placeholder="Say something..."
              value={this.state.text}
              onChange={this.handleChange}
              error={this.state.errors.text}
            />
            <Form.Button primary type="submit" content="Submit" />
          </Form>
        </Segment>
      </>
    )
  }
}

const mapStateToProps = ({ errors, auth }) => ({ errors, auth })

export default connect(
  mapStateToProps,
  { createPost }
)(PostForm)
