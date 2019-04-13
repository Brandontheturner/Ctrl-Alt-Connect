import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import { Segment, Item } from 'semantic-ui-react'
import isEmpty from '../../utils/isEmpty'
import PostItem from './PostItem'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
import PageHeader from '../shared/pages/PageHeader'
import BackToFeed from '../shared/buttons/BackToFeed'

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  render() {
    const { post, loading } = this.props.posts
    return (
      <>
        <BackToFeed />
        {!isEmpty(post) && (
          <>
            <PageHeader content={`${post.name.split(' ')[0]}'s Post`} />
            <Segment attached="bottom" loading={post === null || loading}>
              <Item.Group>
                <PostItem post={post} showActions={false} />
              </Item.Group>
              <CommentForm postId={post._id} />
              <CommentFeed comments={post.comments} postId={post._id} />
            </Segment>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
