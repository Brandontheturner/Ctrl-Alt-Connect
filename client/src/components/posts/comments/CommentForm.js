import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../../actions/postActions'
import { Segment, Header, Form } from 'semantic-ui-react'
import FormTextArea from '../../shared/form/FormTextArea'

class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    const { user } = this.props.auth
    const { postId } = this.props

    this.props.addComment(postId, {
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
        <Header content="Post a Comment" attached="top" inverted />
        <Segment attached="bottom">
          <Form onSubmit={this.handleSubmit} error>
            <FormTextArea
              name="text"
              placeholder="Share your thoughts..."
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
  { addComment }
)(CommentForm)
