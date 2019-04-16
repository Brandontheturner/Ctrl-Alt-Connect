import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../actions/postActions'
import { Segment, Header, Form, Button } from 'semantic-ui-react'
import FormTextArea from '../shared/form/FormTextArea'

class PostForm extends Component {
  state = {
    text: '',
    errors: {},
    insertCodeClicked: false
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

  handleInsertCodeClick = e => {
    e.preventDefault()
    this.setState({ insertCodeClicked: true })
    this.state.text.length
      ? this.setState({
          text: this.state.text + '\n```\n<Insert Code Here>\n```'
        })
      : this.setState({
          text: '```\n<Insert Code Here>\n```'
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
            <Button
              content="Insert code block"
              compact
              basic
              icon="code"
              labelPosition="right"
              onClick={this.handleInsertCodeClick}
            />
            <FormTextArea
              name="text"
              placeholder="Say something..."
              value={this.state.text}
              onChange={this.handleChange}
              error={this.state.errors.text}
              info={
                this.state.insertCodeClicked
                  ? 'Keep code blocks between the backticks'
                  : null
              }
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
