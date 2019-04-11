import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import { Segment, Item } from 'semantic-ui-react'
import isEmpty from '../../utils/isEmpty'
import PostItem from './PostItem'
import CommentForm from './comments/CommentForm'
import CommentFeed from './comments/CommentFeed'
import BackToFeed from '../shared/buttons/BackToFeed'

class Post extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id)
    this.props.getPost(this.props.match.params.id)
  }

  render() {
    const { post, loading } = this.props.posts
    return (
      <>
        <BackToFeed />
        <Segment loading={post === null || loading}>
          <Item.Group>
            {!isEmpty(post) && <PostItem post={post} showActions={false} />}
          </Item.Group>
          <CommentForm postId={post._id} />
          {!isEmpty(post) && (
            <CommentFeed postId={post._id} comments={post.comments} />
          )}
        </Segment>
      </>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
