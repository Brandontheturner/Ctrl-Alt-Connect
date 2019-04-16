import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, likePost, unlikePost } from '../../actions/postActions'
import LikeButton from './buttons/Like'
import TrashButton from '../shared/buttons/TrashButton'
import ProfileImage from '../profiles/ProfileImage'
import CodeBlocks from '../shared/CodeBlocks'
import './css/overrides.css'

class PostItem extends Component {
  handleDeleteClick = id => this.props.deletePost(id)
  handleLikeClick = id => this.props.likePost(id)
  handleUnlikeClick = id => this.props.unlikePost(id)

  render() {
    const { post, auth, showActions } = this.props

    return (
      <Item>
        <ProfileImage to={`/profile/user/${post.user}`} src={post.avatar} />
        <Item.Content>
          {post.user === auth.user.id && showActions && (
            <TrashButton
              item="Post"
              action={() => this.handleDeleteClick(post._id)}
            />
          )}
          <Item.Header>{post.name}</Item.Header>
          <Item.Description>
            <CodeBlocks text={post.text} />
          </Item.Description>
          {showActions && (
            <Item.Extra>
              <LikeButton
                likes={post.likes}
                like={() => this.handleLikeClick(post._id)}
                unlike={() => this.handleUnlikeClick(post._id)}
              />
              <Button
                as={Link}
                to={`/post/${post._id}`}
                primary
                content={`Comments ${post.comments.length}`}
                compact
              />
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost }
)(PostItem)
