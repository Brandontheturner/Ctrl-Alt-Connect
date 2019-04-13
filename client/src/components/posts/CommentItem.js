import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  deleteComment,
  likeComment,
  unlikeComment
} from '../../actions/postActions'
import LikeButton from './LikeButton'
import TrashButton from '../shared/buttons/TrashButton'

class CommentItem extends Component {
  handleDeleteClick = (postId, commentId) =>
    this.props.deleteComment(postId, commentId)
  handleLikeClick = (postId, commentId) =>
    this.props.likeComment(postId, commentId)
  handleUnlikeClick = (postId, commentId) =>
    this.props.unlikeComment(postId, commentId)

  render() {
    const { comment, postId, auth } = this.props
    return (
      <Item>
        <Item.Image src={comment.avatar} circular size="tiny" />
        <Item.Content>
          {comment.user === auth.user.id && (
            <TrashButton
              handleClick={() => this.handleDeleteClick(postId, comment._id)}
            />
          )}
          <Item.Header>{comment.name}</Item.Header>
          <Item.Description>{comment.text}</Item.Description>

          <Item.Extra>
            <LikeButton
              likes={comment.likes}
              like={() => this.handleLikeClick(postId, comment._id)}
              unlike={() => this.handleUnlikeClick(postId, comment._id)}
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { deleteComment, likeComment, unlikeComment }
)(CommentItem)
