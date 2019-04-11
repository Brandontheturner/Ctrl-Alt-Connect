import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'
import './css/overrides.css'

class PostItem extends Component {
  handleDeleteClick = id => this.props.deletePost(id)
  handleLikeClick = id => this.props.addLike(id)
  handleUnlikeClick = id => this.props.removeLike(id)

  render() {
    const { post, auth } = this.props
    console.log('TCL: PostItem -> render -> post', post)
    const likeButton = (
      <Button
        icon="heart outline"
        basic
        compact
        onClick={() => this.handleLikeClick(post._id)}
      />
    )
    const unlikeButton = (
      <Button
        icon="heart"
        color="red"
        basic
        compact
        onClick={() => this.handleUnlikeClick(post._id)}
      />
    )
    return (
      <Item>
        <Item.Image src={post.avatar} circular size="tiny" />
        <Item.Content>
          {post.user === auth.user.id && (
            <Button
              basic
              color="red"
              icon="times"
              compact
              circular
              size="tiny"
              floated="right"
              onClick={() => this.handleDeleteClick(post._id)}
            />
          )}
          <Item.Header>{post.name}</Item.Header>
          <Item.Meta>{`${post.likes.length} Likes`}</Item.Meta>
          <Item.Description>{post.text}</Item.Description>
          <Item.Extra>
            {/* CONDITIONAL RENDERING FOR LIKE BUTTON */}
            {post.likes.find(item => item.user === auth.user.id)
              ? unlikeButton
              : likeButton}
            <Button
              as={Link}
              to={`/post/${post._id}`}
              primary
              content="Comments"
              compact
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
  { deletePost, addLike, removeLike }
)(PostItem)
