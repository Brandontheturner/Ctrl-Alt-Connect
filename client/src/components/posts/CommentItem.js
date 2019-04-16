import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  deleteComment,
  likeComment,
  unlikeComment
} from '../../actions/postActions'
import LikeButton from './buttons/Like'
import TrashButton from '../shared/buttons/TrashButton'
import ProfileImage from '../profiles/ProfileImage'
import CodeBlocks from '../shared/CodeBlocks'

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
        <ProfileImage
          to={`/profile/user/${comment.user}`}
          src={comment.avatar}
        />
        <Item.Content>
          {comment.user === auth.user.id && (
            <TrashButton
              item="Comment"
              action={() => this.handleDeleteClick(postId, comment._id)}
            />
          )}
          <Item.Header>{comment.name}</Item.Header>
          <Item.Description>
            <CodeBlocks text={comment.text} />
          </Item.Description>

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
