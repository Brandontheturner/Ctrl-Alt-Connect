import React, { Component } from 'react'
import { Segment, Item } from 'semantic-ui-react'
import CommentItem from './CommentItem'

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props
    return comments.length > 0 ? (
      <Segment>
        <Item.Group divided>
          {comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={postId} />
          ))}
        </Item.Group>
      </Segment>
    ) : (
      <Segment>Be the first to comment!</Segment>
    )
  }
}

export default CommentFeed
