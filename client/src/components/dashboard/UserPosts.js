import React, { Component } from 'react'
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
    return (
      <Segment attached="bottom" loading={posts === null || loading}>
        <Item.Group divided>
          {posts.map(post => (
            <PostPreview key={post._id} post={post} />
          ))}
        </Item.Group>
      </Segment>
    )
  }
}

const mapStateToProps = ({ auth, posts }) => ({ auth, posts })

export default connect(
  mapStateToProps,
  { getUserPosts }
)(UserPosts)
