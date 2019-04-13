import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import CommentItem from './CommentItem'

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props
    return comments.length > 0 ? (
      <Item.Group divided>
        {comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))}
      </Item.Group>
    ) : (
      <Item.Group>Be the first to comment!</Item.Group>
    )
  }
}

export default CommentFeed
