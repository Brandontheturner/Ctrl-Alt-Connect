import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Item } from 'semantic-ui-react'
import PostPreview from '../posts/PostPreview'
import { connect } from 'react-redux'
import { getUserPosts } from '../../actions/postActions'

class UserPosts extends Component {
  componentDidMount() {
    this.props.getUserPosts(this.props.auth.user.id)
  }

  render() {
    const { posts, loading } = this.props.posts
    return posts.length ? (
      <Segment attached="bottom" loading={posts === null || loading}>
        <Item.Group divided>
          {posts.map(post => (
            <PostPreview key={post._id} post={post} />
          ))}
        </Item.Group>
      </Segment>
    ) : (
      <Segment
        attached="bottom"
        content={
          <>
            You haven't created any posts yet. Head over to the{' '}
            <Link to="/feed">feed</Link> and interact!
          </>
        }
      />
    )
  }
}

const mapStateToProps = ({ auth, posts }) => ({ auth, posts })

export default connect(
  mapStateToProps,
  { getUserPosts }
)(UserPosts)
