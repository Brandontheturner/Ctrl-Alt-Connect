import React, { Component } from 'react'
import { Segment, Item } from 'semantic-ui-react'
import CommentItem from './CommentItem'

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props
    console.log('TCL: CommentFeed -> render -> comments', comments)
    return (
      <Segment>
        <Item.Group divided>
          {comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={postId} />
          ))}
        </Item.Group>
      </Segment>
    )
  }
}

export default CommentFeed
