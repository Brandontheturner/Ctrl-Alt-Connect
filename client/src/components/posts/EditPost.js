import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPost } from '../../actions/postActions'
import { Segment, Header, Form, Button } from 'semantic-ui-react'
import FormInput from '../shared/form/FormInput'
import FormTextArea from '../shared/form/FormTextArea'

class EditPost extends Component {
  state = {
    text: '',
    subject: '',
    errors: {},
    insertCodeClicked: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    this.props.editPost(this.props.post._id, {
      text: this.state.text,
      subject: this.state.subject
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

  componentDidMount() {
    this.setState({
      subject: this.props.post.subject,
      text: this.props.post.text
    })
  }

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors })
  }

  render() {
    return (
      <>
        <Header content="Edit Post" attached="top" inverted />
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
            <FormInput
              name="subject"
              type="text"
              placeholder="Subject"
              value={this.state.subject}
              onChange={this.handleChange}
              error={this.state.errors.subject}
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

const mapStateToProps = ({ errors }) => ({ errors })

export default connect(
  mapStateToProps,
  { editPost }
)(EditPost)
