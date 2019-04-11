import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteComment } from '../../../actions/postActions'

class CommentItem extends Component {
  handleDeleteClick = (postId, commentId) =>
    this.props.deleteComment(postId, commentId)

  render() {
    const { comment, postId, auth } = this.props
    return (
      <Item>
        <Item.Image src={comment.avatar} circular size="tiny" />
        <Item.Content>
          {comment.user === auth.user.id && (
            <Button
              basic
              color="red"
              icon="times"
              compact
              circular
              size="tiny"
              floated="right"
              onClick={() => this.handleDeleteClick(postId, comment._id)}
            />
          )}
          <Item.Header>{comment.name}</Item.Header>
          <Item.Description>{comment.text}</Item.Description>
        </Item.Content>
      </Item>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem)
